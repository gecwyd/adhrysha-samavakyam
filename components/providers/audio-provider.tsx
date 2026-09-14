"use client"

import * as React from "react"
import { getDriveAudioUrl } from "@/components/ui/drive-image"
import {
  extractYouTubeId,
  loadYouTubeIframeApi,
  type YTPlayerInstance,
} from "@/components/ui/youtube-player"

interface AudioPlayOptions {
  volume?: number
  loop?: boolean
  fadeDuration?: number
  startSeconds?: number
  seek?: number
}

interface AudioContextValue {
  playbg: (url: string, options?: AudioPlayOptions | number) => void
  playBg: (url: string, options?: AudioPlayOptions | number) => void
  playAudio: (url: string, options?: any) => void
  prebufferbg: (url: string) => void
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
  const [volume, setVolumeState] = React.useState<number>(0.35)

  const activeAudioRef = React.useRef<HTMLAudioElement | null>(null)
  const activeYouTubeRef = React.useRef<YTPlayerInstance | null>(null)
  const activeYouTubeIdRef = React.useRef<string | null>(null)
  const youtubeContainerRef = React.useRef<HTMLDivElement | null>(null)
  const youtubeSetupRef = React.useRef<Promise<YTPlayerInstance> | null>(null)
  const youtubeFadeRef = React.useRef<number | null>(null)
  const youtubeOptionsRef = React.useRef({ loop: true, volume: 0.35, fadeDuration: 800 })
  const activeUrlRef = React.useRef<string | null>(null)
  const prebufferContainerRef = React.useRef<HTMLDivElement | null>(null)
  const prebufferPlayerRef = React.useRef<YTPlayerInstance | null>(null)
  const prebufferVideoIdRef = React.useRef<string | null>(null)
  const prebufferSetupRef = React.useRef<Promise<YTPlayerInstance> | null>(null)
  const activeAudiosRef = React.useRef<Set<HTMLAudioElement>>(new Set())
  const activeFadesRef = React.useRef<Map<HTMLAudioElement, number>>(new Map())
  const pendingPlayRef = React.useRef<(() => void) | null>(null)
  const volumeRef = React.useRef<number>(0.35)
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

  React.useEffect(() => {
    loadYouTubeIframeApi().catch(() => {})
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
    if (youtubeFadeRef.current !== null) {
      cancelAnimationFrame(youtubeFadeRef.current)
      youtubeFadeRef.current = null
    }
  }, [])

  const destroyYouTubePlayer = React.useCallback(() => {
    if (activeYouTubeRef.current) {
      try {
        activeYouTubeRef.current.stopVideo()
        activeYouTubeRef.current.destroy()
      } catch {}
    }
    activeYouTubeRef.current = null
    activeYouTubeIdRef.current = null
    youtubeSetupRef.current = null
    if (youtubeContainerRef.current) {
      youtubeContainerRef.current.innerHTML = ""
    }
  }, [])

  const fadeYouTube = React.useCallback((
    player: YTPlayerInstance,
    from: number,
    to: number,
    durationMs: number,
    onComplete?: () => void,
  ) => {
    if (youtubeFadeRef.current !== null) {
      cancelAnimationFrame(youtubeFadeRef.current)
      youtubeFadeRef.current = null
    }

    const startVolume = Math.max(0, Math.min(1, from))
    const targetVolume = Math.max(0, Math.min(1, to))
    if (durationMs <= 0) {
      player.setVolume(Math.round(targetVolume * 100))
      setIsTransitioning(false)
      onComplete?.()
      return
    }

    const start = performance.now()
    setIsTransitioning(true)
    const step = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start) / durationMs))
      const nextVolume = startVolume + (targetVolume - startVolume) * progress
      try {
        player.setVolume(Math.round((isMutedRef.current ? 0 : nextVolume) * 100))
      } catch {}

      if (progress < 1) {
        youtubeFadeRef.current = requestAnimationFrame(step)
      } else {
        youtubeFadeRef.current = null
        setIsTransitioning(false)
        onComplete?.()
      }
    }
    youtubeFadeRef.current = requestAnimationFrame(step)
  }, [])

  const prebufferbg = React.useCallback((url: string) => {
    if (!url || typeof window === "undefined") return
    const videoId = extractYouTubeId(url)
    if (!videoId) return
    if (activeYouTubeIdRef.current === videoId && activeYouTubeRef.current) return
    if (prebufferVideoIdRef.current === videoId) return
    if (!prebufferContainerRef.current) return

    if (prebufferPlayerRef.current) {
      try {
        prebufferPlayerRef.current.stopVideo()
        prebufferPlayerRef.current.destroy()
      } catch {}
      prebufferPlayerRef.current = null
    }
    prebufferVideoIdRef.current = videoId

    const mountElement = document.createElement("div")
    prebufferContainerRef.current.appendChild(mountElement)

    const setup = loadYouTubeIframeApi().then((YT) => new Promise<YTPlayerInstance>((resolve) => {
      const player = new YT.Player(mountElement, {
        width: "1",
        height: "1",
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          mute: 1,
        },
        events: {
          onReady: (event) => {
            prebufferPlayerRef.current = event.target
            event.target.mute()
            event.target.setVolume(0)
            try {
              event.target.playVideo()
            } catch {}
            resolve(event.target)
          },
        },
      })
      prebufferPlayerRef.current = player
    }))
    prebufferSetupRef.current = setup
    setup.catch(() => {
      prebufferVideoIdRef.current = null
    })
  }, [])

  const createYouTubePlayer = React.useCallback((videoId: string, loop: boolean, startSeconds?: number) => {
    if (!youtubeContainerRef.current) {
      return Promise.reject(new Error("YouTube background player is not mounted"))
    }

    if (activeYouTubeRef.current && activeYouTubeIdRef.current === videoId) {
      return Promise.resolve(activeYouTubeRef.current)
    }

    destroyYouTubePlayer()
    const mountElement = document.createElement("div")
    youtubeContainerRef.current.appendChild(mountElement)

    const setup = loadYouTubeIframeApi().then((YT) => new Promise<YTPlayerInstance>((resolve) => {
      const player = new YT.Player(mountElement, {
        width: "1",
        height: "1",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          loop: loop ? 1 : 0,
          playlist: loop ? videoId : undefined,
          playsinline: 1,
          start: startSeconds !== undefined ? Math.round(startSeconds) : undefined,
        },
        events: {
          onReady: (event) => {
            activeYouTubeRef.current = event.target
            activeYouTubeIdRef.current = videoId
            setIsLoading(false)
            setIsLoaded(true)
            if (!isIntentionallyPausedRef.current) {
              if (isMutedRef.current) {
                event.target.mute()
              } else {
                event.target.unMute()
                event.target.setVolume(Math.round(youtubeOptionsRef.current.volume * 100))
              }
              try {
                event.target.playVideo()
              } catch {}
            }
            resolve(event.target)
          },
          onStateChange: (event) => {
            if (activeYouTubeRef.current !== event.target) return
            if (window.YT?.PlayerState) {
              if (event.data === window.YT.PlayerState.PLAYING) {
                pendingPlayRef.current = null
                setIsPlaying(true)
                setIsLoading(false)
                setIsLoaded(true)
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false)
              }
            }
          },
        },
      })
      activeYouTubeRef.current = player
      activeYouTubeIdRef.current = videoId
    }))

    youtubeSetupRef.current = setup
    return setup
  }, [destroyYouTubePlayer])

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
    const youtubeId = extractYouTubeId(url)
    const opts = typeof options === "number" ? { fadeDuration: options > 50 ? options : options * 1000 } : options
    const targetVol = opts?.volume !== undefined ? opts.volume : volumeRef.current
    const loop = opts?.loop !== undefined ? opts.loop : true
    const fadeDuration = opts?.fadeDuration !== undefined ? opts.fadeDuration : 800
    const startSeconds = opts?.startSeconds ?? opts?.seek

    youtubeOptionsRef.current = { loop, volume: targetVol, fadeDuration }

    isIntentionallyPausedRef.current = false
    pendingPlayRef.current = null

    if (youtubeId) {
      const previousAudio = activeAudioRef.current
      if (previousAudio) {
        cancelAudioFade(previousAudio)
        previousAudio.pause()
        activeAudiosRef.current.delete(previousAudio)
        activeAudioRef.current = null
      }

      const isSameYouTubeTrack = activeUrlRef.current === url && Boolean(activeYouTubeRef.current)
      const isNewTrack = !isSameYouTubeTrack
      if (!isSameYouTubeTrack) {
        setIsLoading(true)
        setIsLoaded(false)
        setCurrentTrack(url)
        activeUrlRef.current = url
      }

      const startYouTube = () => {
        const player = activeYouTubeRef.current
        if (!player || activeUrlRef.current !== url) return
        try {
          if (isNewTrack) {
            if (activeYouTubeIdRef.current !== youtubeId) {
              activeYouTubeIdRef.current = youtubeId
              player.loadVideoById({
                videoId: youtubeId,
                startSeconds: startSeconds !== undefined ? Math.round(startSeconds) : 0,
              })
            } else if (startSeconds !== undefined) {
              player.seekTo(startSeconds, true)
            }
          }
          if (isMutedRef.current) {
            player.mute()
          } else {
            player.unMute()
            player.setVolume(Math.round(targetVol * 100))
          }
          player.playVideo()
          fadeYouTube(player, isMutedRef.current ? 0 : player.getVolume() / 100, targetVol, Math.min(300, fadeDuration))
        } catch {
          pendingPlayRef.current = startYouTube
        }
      }

      const promotePrebuffer = () => {
        if (
          prebufferVideoIdRef.current === youtubeId &&
          prebufferPlayerRef.current &&
          !activeYouTubeRef.current
        ) {
          const promoted = prebufferPlayerRef.current
          prebufferPlayerRef.current = null
          prebufferVideoIdRef.current = null
          prebufferSetupRef.current = null
          if (prebufferContainerRef.current) {
            prebufferContainerRef.current.innerHTML = ""
          }
          if (youtubeContainerRef.current) {
            try {
              const iframe = (promoted as any).getIframe?.() as HTMLElement | undefined
              if (iframe && iframe.parentElement !== youtubeContainerRef.current) {
                youtubeContainerRef.current.appendChild(iframe)
              }
            } catch {}
          }
          activeYouTubeRef.current = promoted
          activeYouTubeIdRef.current = youtubeId
          youtubeSetupRef.current = Promise.resolve(promoted)
          return true
        }
        return false
      }

      if (activeYouTubeRef.current) {
        startYouTube()
      } else if (promotePrebuffer()) {
        startYouTube()
      } else {
        pendingPlayRef.current = startYouTube
        createYouTubePlayer(youtubeId, loop, startSeconds).then(() => {
          if (!isIntentionallyPausedRef.current) startYouTube()
        }).catch(() => {
          setIsLoading(false)
          setIsTransitioning(false)
        })
      }
      return
    }

    if (activeYouTubeRef.current || activeYouTubeIdRef.current) {
      destroyYouTubePlayer()
    }

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
    if (startSeconds !== undefined) {
      newAudio.currentTime = startSeconds
    }
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
    if (activeYouTubeRef.current) {
      const player = activeYouTubeRef.current
      const currentVolume = isMutedRef.current ? 0 : player.getVolume() / 100
      if (fadeDuration <= 0) {
        player.pauseVideo()
      } else {
        fadeYouTube(player, currentVolume, 0, fadeDuration, () => player.pauseVideo())
      }
    }
    setIsPlaying(false)
  }, [cancelAllFades, fadeAudio, fadeYouTube])

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
    destroyYouTubePlayer()
    activeAudiosRef.current.clear()
    activeAudioRef.current = null
    activeUrlRef.current = null
    setCurrentTrack(null)
    setIsPlaying(false)
    setIsLoaded(false)
    setIsLoading(false)
    setIsTransitioning(false)
  }, [cancelAllFades, destroyYouTubePlayer, fadeAudio])

  const toggleMute = React.useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      if (activeAudioRef.current) {
        activeAudioRef.current.volume = next ? 0 : volumeRef.current
      }
      if (activeYouTubeRef.current) {
        if (next) activeYouTubeRef.current.mute()
        else {
          activeYouTubeRef.current.unMute()
          activeYouTubeRef.current.setVolume(Math.round(volumeRef.current * 100))
        }
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
    if (activeYouTubeRef.current && !isMutedRef.current) {
      activeYouTubeRef.current.setVolume(Math.round(clamped * 100))
    }
  }, [])

  const unlockAudio = React.useCallback(() => {
    if (pendingPlayRef.current) {
      const fn = pendingPlayRef.current
      pendingPlayRef.current = null
      fn()
    } else if (activeYouTubeRef.current) {
      isIntentionallyPausedRef.current = false
      const player = activeYouTubeRef.current
      try {
        if (isMutedRef.current) player.mute()
        else {
          player.unMute()
          player.setVolume(Math.round(volumeRef.current * 100))
        }
        player.playVideo()
        setIsPlaying(true)
      } catch {}
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

  React.useEffect(() => {
    return () => {
      cancelAllFades()
      destroyYouTubePlayer()
    }
  }, [cancelAllFades, destroyYouTubePlayer])

  return (
    <AudioContext.Provider
      value={{
        playbg,
        playBg: playbg,
        playAudio: playbg,
        prebufferbg,
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
      <div
        ref={youtubeContainerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          left: -1,
          top: -1,
        }}
      />
      <div
        ref={prebufferContainerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          left: -2,
          top: -2,
        }}
      />
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
