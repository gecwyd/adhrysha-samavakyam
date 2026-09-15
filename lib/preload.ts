"use client"

import * as React from "react"
import { getDriveAudioUrl } from "@/components/ui/drive-image"

export type PreloadStatus = "pending" | "loading" | "loaded" | "error"

export interface PreloadItem {
  id: string
  url: string
  type: "youtube" | "drive-image" | "image" | "audio" | "script" | "video" | "other"
  status: PreloadStatus
}

export interface PreloadStoreState {
  items: Map<string, PreloadItem>
  isComplete: boolean
  progress: number
  total: number
  loaded: number
}

type Subscriber = (state: PreloadStoreState) => void

class PreloadStore {
  private items = new Map<string, PreloadItem>()
  private subscribers = new Set<Subscriber>()
  private cache = new Set<string>()

  subscribe(callback: Subscriber) {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  private notifyScheduled = false

  private notify() {
    if (this.notifyScheduled) return
    this.notifyScheduled = true
    const schedule = typeof queueMicrotask === "function" ? queueMicrotask : (fn: () => void) => Promise.resolve().then(fn)
    schedule(() => {
      this.notifyScheduled = false
      const state = this.getState()
      this.subscribers.forEach((cb) => {
        try {
          cb(state)
        } catch {}
      })
    })
  }

  getState(): PreloadStoreState {
    const itemsArr = Array.from(this.items.values())
    const total = itemsArr.length
    const loaded = itemsArr.filter((i) => i.status === "loaded" || i.status === "error").length
    const isComplete = total > 0 && total === loaded
    const progress = total === 0 ? 100 : Math.round((loaded / total) * 100)

    return {
      items: this.items,
      isComplete,
      progress,
      total,
      loaded,
    }
  }

  add(url: string, explicitType?: PreloadItem["type"]) {
    if (!url || typeof window === "undefined") return
    if (this.items.has(url)) return

    const type = explicitType || this.determineType(url)
    this.items.set(url, { id: url, url, type, status: "pending" })
    this.notify()
    this.startPreload(url, type)
  }

  private determineType(url: string): PreloadItem["type"] {
    if (/\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i.test(url) || url.startsWith("/audio/")) return "audio"
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube"
    if (url.includes("drive.google.com")) return "drive-image"
    if (/\.(jpeg|jpg|gif|png|webp|avif|svg)(\?.*)?$/i.test(url)) return "image"
    if (/\.(mp4|webm|mov)(\?.*)?$/i.test(url)) return "video"
    return "other"
  }

  private async startPreload(url: string, type: PreloadItem["type"]) {
    const item = this.items.get(url)
    if (!item) return
    
    item.status = "loading"
    this.notify()

    try {
      if (type === "youtube") {
        await this.preloadYouTube(url)
      } else if (type === "drive-image") {
        await this.preloadDrive(url)
      } else if (type === "image") {
        await this.preloadImage(url)
      } else if (type === "audio") {
        await this.preloadAudio(url)
      } else if (type === "video") {
        await this.preloadVideo(url)
      } else {
        await this.preloadOther(url)
      }
      item.status = "loaded"
    } catch (err) {
      item.status = "error"
    }
    
    this.items.set(url, { ...item })
    this.notify()
  }

  private extractYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+?&v=))([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : null
  }

  private extractDriveFileId(url: string): string | null {
    const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (fileDMatch) return fileDMatch[1]
    const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idParamMatch) return idParamMatch[1]
    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (dMatch) return dMatch[1]
    return null
  }

  private preloadYouTube(url: string): Promise<void> {
    return new Promise((resolve) => {
      let resolvedCount = 0
      const totalToResolve = 2 // Iframe API + Thumbnail

      const checkDone = () => {
        resolvedCount++
        if (resolvedCount >= totalToResolve) resolve()
      }

      // Preload Iframe API
      if (!document.getElementById("youtube-iframe-api-preload")) {
        const script = document.createElement("script")
        script.id = "youtube-iframe-api-preload"
        script.src = "https://www.youtube.com/iframe_api"
        script.async = true
        script.onload = checkDone
        script.onerror = checkDone
        document.head.appendChild(script)
      } else {
        checkDone()
      }

      // Preload Thumbnail
      const videoId = this.extractYouTubeId(url)
      if (videoId) {
        const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        this.preloadImage(thumbUrl).finally(checkDone)
      } else {
        checkDone()
      }
    })
  }

  private async preloadDrive(url: string): Promise<void> {
    const fileId = this.extractDriveFileId(url)
    if (!fileId) return Promise.resolve()

    const thumbUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`
    try {
      await this.preloadImage(thumbUrl)
    } catch {
      await this.preloadAudio(url)
    }
  }

  private preloadImage(url: string): Promise<void> {
    if (this.cache.has(url)) return Promise.resolve()
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.cache.add(url)
        resolve()
      }
      img.onerror = reject
      img.src = url
    })
  }

  private preloadAudio(url: string): Promise<void> {
    const streamUrl = getDriveAudioUrl(url)
    if (this.cache.has(streamUrl) || this.cache.has(url)) return Promise.resolve()

    return new Promise((resolve) => {
      const audio = new Audio()
      audio.preload = "auto"
      const onDone = () => {
        this.cache.add(streamUrl)
        this.cache.add(url)
        audio.removeEventListener("canplay", onDone)
        audio.removeEventListener("canplaythrough", onDone)
        audio.removeEventListener("error", onDone)
        resolve()
      }
      audio.addEventListener("canplay", onDone, { once: true })
      audio.addEventListener("canplaythrough", onDone, { once: true })
      audio.addEventListener("error", onDone, { once: true })
      audio.src = streamUrl
      audio.load()
    })
  }

  private preloadVideo(url: string): Promise<void> {
    if (this.cache.has(url)) return Promise.resolve()

    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.preload = "auto"
      const onDone = () => {
        this.cache.add(url)
        video.removeEventListener("canplay", onDone)
        video.removeEventListener("canplaythrough", onDone)
        video.removeEventListener("error", onDone)
        resolve()
      }
      video.addEventListener("canplay", onDone, { once: true })
      video.addEventListener("canplaythrough", onDone, { once: true })
      video.addEventListener("error", onDone, { once: true })
      video.src = url
      video.load()
    })
  }

  private preloadOther(url: string): Promise<void> {
    if (this.cache.has(url)) return Promise.resolve()
    return fetch(url, { mode: "no-cors", cache: "force-cache" })
      .then(() => {
        this.cache.add(url)
      })
      .catch(() => {})
  }
}

const preloadStore = new PreloadStore()

export function preload(url: string, type?: PreloadItem["type"]): string {
  if (typeof window !== "undefined") {
    preloadStore.add(url, type)
  }
  return url
}

export function usePreloadStore() {
  const [state, setState] = React.useState<PreloadStoreState>(preloadStore.getState())

  React.useEffect(() => {
    return preloadStore.subscribe(setState)
  }, [])

  return state
}
