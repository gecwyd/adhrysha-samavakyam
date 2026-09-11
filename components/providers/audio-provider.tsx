"use client"

import * as React from "react"
import { getDriveAudioUrl } from "@/components/ui/drive-image"

interface AudioPlayOptions {
  volume?: number
  loop?: boolean
  fadeDuration?: number
}

interface AudioContextValue {
  playbg: (url: string, options?: AudioPlayOptions) => void
  playBg: (url: string, options?: AudioPlayOptions) => void
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
  const fadeAnimationRef = React.useRef<number | null>(null)
  const pendingPlayRef = React.useRef<(() => void) | null>(null)
  const volumeRef = React.useRef<number>(0.7)
  const isMutedRef = React.useRef<boolean>(false)

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

  const cancelFades = React.useCallback(() => {
    if (fadeAnimationRef.current !== null) {
      cancelAnimationFrame(fadeAnimationRef.current)
      fadeAnimationRef.current = null
    }
  }, [])

  const fadeAudio = React.useCallback((
    audio: HTMLAudioElement,
    from: number,
    to: number,
    durationMs: number,
    onComplete?: () => void
  ) => {
    cancelFades()
    const start = performance.now()
    const targetDiff = to - from
    setIsTransitioning(true)

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, Math.max(0, elapsed / durationMs))
      const currentVol = from + targetDiff * progress
      audio.volume = isMutedRef.current ? 0 : Math.max(0, Math.min(1, currentVol))

      if (progress < 1) {
        fadeAnimationRef.current = requestAnimationFrame(step)
      } else {
        fadeAnimationRef.current = null
        setIsTransitioning(false)
        onComplete?.()
      }
    }

    fadeAnimationRef.current = requestAnimationFrame(step)
  }, [cancelFades])

  const playbg = React.useCallback((url: string, options?: AudioPlayOptions) => {
    if (!url || typeof window === "undefined") return

    const resolvedUrl = getDriveAudioUrl(url)
    const targetVol = options?.volume !== undefined ? options.volume : volumeRef.current
    const loop = options?.loop !== undefined ? options.loop : true
    const fadeDuration = options?.fadeDuration !== undefined ? options.fadeDuration : 1200

    if ((activeUrlRef.current === url || activeUrlRef.current === resolvedUrl) && activeAudioRef.current && !activeAudioRef.current.error) {
      const currentAudio = activeAudioRef.current
      if (!currentAudio.paused) {
        return
      }

      cancelFades()
      currentAudio.play().then(() => {
        setIsPlaying(true)
        fadeAudio(currentAudio, currentAudio.volume, targetVol, fadeDuration)
      }).catch(() => {
        pendingPlayRef.current = () => playbg(url, options)
      })
      return
    }

    const previousAudio = activeAudioRef.current
    cancelFades()

    if (previousAudio) {
      fadeAudio(previousAudio, previousAudio.volume, 0, fadeDuration, () => {
        previousAudio.pause()
        previousAudio.currentTime = 0
      })
    }

    setIsLoading(true)
    setIsLoaded(false)

    const newAudio = new Audio(resolvedUrl)
    newAudio.preload = "auto"
    newAudio.loop = loop
    newAudio.volume = 0
    activeAudioRef.current = newAudio
    activeUrlRef.current = url
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
        setIsPlaying(true)
        fadeAudio(newAudio, newAudio.volume, targetVol, fadeDuration)
      }).catch(() => {
        pendingPlayRef.current = startPlayback
      })
    }

    startPlayback()
  }, [cancelFades, fadeAudio])

  const pauseBg = React.useCallback((fadeDuration: number = 800) => {
    const currentAudio = activeAudioRef.current
    if (!currentAudio || currentAudio.paused) return

    cancelFades()
    fadeAudio(currentAudio, currentAudio.volume, 0, fadeDuration, () => {
      currentAudio.pause()
      setIsPlaying(false)
    })
  }, [cancelFades, fadeAudio])

  const stopBg = React.useCallback((fadeDuration: number = 800) => {
    const currentAudio = activeAudioRef.current
    if (!currentAudio) return

    cancelFades()
    fadeAudio(currentAudio, currentAudio.volume, 0, fadeDuration, () => {
      currentAudio.pause()
      currentAudio.currentTime = 0
      activeAudioRef.current = null
      activeUrlRef.current = null
      setCurrentTrack(null)
      setIsPlaying(false)
      setIsLoaded(false)
      setIsLoading(false)
      setIsTransitioning(false)
    })
  }, [cancelFades, fadeAudio])

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
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true)
          fadeAudio(audio, audio.volume, volumeRef.current, 1000)
        }).catch(() => {})
      } else {
        fadeAudio(audio, audio.volume, volumeRef.current, 1000)
      }
    }
  }, [fadeAudio])

  return (
    <AudioContext.Provider
      value={{
        playbg,
        playBg: playbg,
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
