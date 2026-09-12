"use client"

import * as React from "react"
import { getDriveAudioUrl } from "@/components/ui/drive-image"

interface AudioPlayOptions {
  volume?: number
  loop?: boolean
  fadeDuration?: number
}

interface AudioContextValue {
  playbg: (url: string, options?: AudioPlayOptions | number) => void
  playBg: (url: string, options?: AudioPlayOptions | number) => void
  playAudio: (url: string, options?: any) => void
  pauseBg: (fadeDuration?: number) => void
  stopBg: (fadeDuration?: number) => void
  currentTrack: string | null
  isPlaying: boolean
  isLoaded: boolean
  isLoading: boolean
  isTransitioning: boolean
  isMuted: boolean
  toggleMute: () => void
  unlockAudio: () => void
  setVolume: (volume: number) => void
  volume: number
}

const AudioContext = React.createContext<AudioContextValue | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = React.useState<string | null>(null)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isTransitioning, setIsTransitioning] = React.useState<boolean>(false)
  const [isMuted, setIsMuted] = React.useState<boolean>(false)
  const [volume, setVolumeState] = React.useState<number>(0.7)

  const activeAudioRef = React.useRef<HTMLAudioElement | null>(null)
  const activeUrlRef = React.useRef<string | null>(null)
  const activeAudiosRef = React.useRef<Set<HTMLAudioElement>>(new Set())
  const activeFadesRef = React.useRef<Map<HTMLAudioElement, number>>(new Map())
  const pendingPlayRef = React.useRef<(() => void) | null>(null)
  const volumeRef = React.useRef<number>(0.7)
  const isMutedRef = React.useRef<boolean>(false)
  const isIntentionallyPausedRef = React.useRef<boolean>(false)

  volumeRef.current = volume
  isMutedRef.current = isMuted

  React.useEffect(() => {
    const handleFirstInteraction = () => {
      if (pendingPlayRef.current) {
        const fn = pendingPlayRef.current
        pendingPlayRef.current = null
        fn()
      }
    }

    window.addEventListener("click", handleFirstInteraction, { passive: true })
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true })
    window.addEventListener("keydown", handleFirstInteraction, { passive: true })
    window.addEventListener("scroll", handleFirstInteraction, { passive: true })

    return () => {
      window.removeEventListener("click", handleFirstInteraction)
      window.removeEventListener("touchstart", handleFirstInteraction)
      window.removeEventListener("keydown", handleFirstInteraction)
      window.removeEventListener("scroll", handleFirstInteraction)
    }
  }, [])

  const cancelAudioFade = React.useCallback((audio: HTMLAudioElement) => {
    const animId = activeFadesRef.current.get(audio)
    if (animId !== undefined) {
      cancelAnimationFrame(animId)
      activeFadesRef.current.delete(audio)
    }
  }, [])

  const cancelAllFades = React.useCallback(() => {
    activeFadesRef.current.forEach((animId) => cancelAnimationFrame(animId))
    activeFadesRef.current.clear()
  }, [])

  const fadeAudio = React.useCallback((
    audio: HTMLAudioElement,
    from: number,
    to: number,
    durationMs: number,
    onComplete?: () => void
  ) => {
    cancelAudioFade(audio)

    if (durationMs <= 0) {
      audio.volume = isMutedRef.current ? 0 : Math.max(0, Math.min(1, to))
      setIsTransitioning(false)
      onComplete?.()
      return
    }

    const start = performance.now()
    const targetDiff = to - from
    setIsTransitioning(true)

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, Math.max(0, elapsed / durationMs))
      const currentVol = from + targetDiff * progress
      audio.volume = isMutedRef.current ? 0 : Math.max(0, Math.min(1, currentVol))

      if (progress < 1) {
        const animId = requestAnimationFrame(step)
        activeFadesRef.current.set(audio, animId)
      } else {
        activeFadesRef.current.delete(audio)
        setIsTransitioning(false)
        onComplete?.()
      }
    }

    const animId = requestAnimationFrame(step)
    activeFadesRef.current.set(audio, animId)
  }, [cancelAudioFade])

  const playbg = React.useCallback((url: string, options?: AudioPlayOptions | number) => {
    if (!url || typeof window === "undefined") return

    const resolvedUrl = getDriveAudioUrl(url)
    const opts = typeof options === "number" ? { fadeDuration: options > 50 ? options : options * 1000 } : options
    const targetVol = opts?.volume !== undefined ? opts.volume : volumeRef.current
    const loop = opts?.loop !== undefined ? opts.loop : true
    const fadeDuration = opts?.fadeDuration !== undefined ? opts.fadeDuration : 800

    isIntentionallyPausedRef.current = false
    pendingPlayRef.current = null

    if ((activeUrlRef.current === url || activeUrlRef.current === resolvedUrl) && activeAudioRef.current && !activeAudioRef.current.error) {
      const currentAudio = activeAudioRef.current
      currentAudio.loop = loop
      activeAudiosRef.current.add(currentAudio)

      cancelAudioFade(currentAudio)

      if (!currentAudio.paused) {
        fadeAudio(currentAudio, currentAudio.volume, targetVol, fadeDuration)
        setIsPlaying(true)
        return
      }

      currentAudio.play().then(() => {
        if (isIntentionallyPausedRef.current) {
          currentAudio.pause()
          setIsPlaying(false)
          return
        }
        setIsPlaying(true)
        fadeAudio(currentAudio, currentAudio.volume, targetVol, fadeDuration)
      }).catch(() => {
        if (!isIntentionallyPausedRef.current) {
          pendingPlayRef.current = () => playbg(url, options)
        }
      })
      return
    }

    const previousAudio = activeAudioRef.current
    if (previousAudio) {
      cancelAudioFade(previousAudio)
      previousAudio.pause()
      previousAudio.currentTime = 0
      activeAudiosRef.current.delete(previousAudio)
    }

    setIsLoading(true)
    setIsLoaded(false)

    const newAudio = new Audio(resolvedUrl)
    newAudio.preload = "auto"
    newAudio.loop = loop
    newAudio.volume = 0
    activeAudioRef.current = newAudio
    activeUrlRef.current = url
    activeAudiosRef.current.add(newAudio)
    setCurrentTrack(url)

    const onCanPlay = () => {
      setIsLoading(false)
      setIsLoaded(true)
    }

    const onPlay = () => {
      setIsPlaying(true)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    const onError = () => {
      setIsLoading(false)
      setIsTransitioning(false)
    }

    newAudio.addEventListener("canplay", onCanPlay, { once: true })
    newAudio.addEventListener("play", onPlay)
    newAudio.addEventListener("pause", onPause)
    newAudio.addEventListener("error", onError, { once: true })

    const startPlayback = () => {
      newAudio.play().then(() => {
        if (isIntentionallyPausedRef.current) {
          newAudio.pause()
          setIsPlaying(false)
          return
        }
        setIsPlaying(true)
        fadeAudio(newAudio, 0, targetVol, fadeDuration)
      }).catch(() => {
        if (!isIntentionallyPausedRef.current) {
          pendingPlayRef.current = startPlayback
        }
      })
    }

    startPlayback()
  }, [cancelAudioFade, fadeAudio])

  const pauseBg = React.useCallback((fadeDuration: number = 0) => {
    isIntentionallyPausedRef.current = true
    pendingPlayRef.current = null
    cancelAllFades()

    activeAudiosRef.current.forEach((audio) => {
      if (fadeDuration <= 0) {
        audio.pause()
      } else {
        fadeAudio(audio, audio.volume, 0, fadeDuration, () => {
          audio.pause()
        })
      }
    })
    setIsPlaying(false)
  }, [cancelAllFades, fadeAudio])

  const stopBg = React.useCallback((fadeDuration: number = 0) => {
    isIntentionallyPausedRef.current = true
    pendingPlayRef.current = null
    cancelAllFades()

    activeAudiosRef.current.forEach((audio) => {
      if (fadeDuration <= 0) {
        audio.pause()
        audio.currentTime = 0
        audio.src = ""
      } else {
        fadeAudio(audio, audio.volume, 0, fadeDuration, () => {
          audio.pause()
          audio.currentTime = 0
          audio.src = ""
        })
      }
    })
    activeAudiosRef.current.clear()
    activeAudioRef.current = null
    activeUrlRef.current = null
    setCurrentTrack(null)
    setIsPlaying(false)
    setIsLoaded(false)
    setIsLoading(false)
    setIsTransitioning(false)
  }, [cancelAllFades, fadeAudio])

  const toggleMute = React.useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      if (activeAudioRef.current) {
        activeAudioRef.current.volume = next ? 0 : volumeRef.current
      }
      return next
    })
  }, [])

  const setVolume = React.useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clamped)
    if (activeAudioRef.current && !isMutedRef.current) {
      activeAudioRef.current.volume = clamped
    }
  }, [])

  const unlockAudio = React.useCallback(() => {
    if (pendingPlayRef.current) {
      const fn = pendingPlayRef.current
      pendingPlayRef.current = null
      fn()
    } else if (activeAudioRef.current) {
      const audio = activeAudioRef.current
      isIntentionallyPausedRef.current = false
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true)
          fadeAudio(audio, audio.volume, volumeRef.current, 800)
        }).catch(() => {})
      } else {
        fadeAudio(audio, audio.volume, volumeRef.current, 800)
      }
    }
  }, [fadeAudio])

  return (
    <AudioContext.Provider
      value={{
        playbg,
        playBg: playbg,
        playAudio: playbg,
        pauseBg,
        stopBg,
        currentTrack,
        isPlaying,
        isLoaded,
        isLoading,
        isTransitioning,
        isMuted,
        toggleMute,
        unlockAudio,
        setVolume,
        volume,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio(): AudioContextValue {
  const context = React.useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

export const useBgAudio = useAudio
