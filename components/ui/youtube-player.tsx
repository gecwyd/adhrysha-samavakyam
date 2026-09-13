"use client"

import * as React from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  Loader2,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getDriveThumbnailUrl } from "./drive-image"
export interface YTPlayerEvent {
  target: YTPlayerInstance
  data: number
}

export interface YTPlayerOptions {
  width?: number | string
  height?: number | string
  videoId?: string
  playerVars?: YTPlayerVars
  events?: {
    onReady?: (event: YTPlayerEvent) => void
    onStateChange?: (event: YTPlayerEvent) => void
  }
}

export interface YTPlayerVars {
  autoplay?: 0 | 1
  controls?: 0 | 1
  loop?: 0 | 1
  playlist?: string
  playsinline?: 0 | 1
  modestbranding?: 0 | 1
  rel?: 0 | 1
  iv_load_policy?: 1 | 3
  disablekb?: 0 | 1
  fs?: 0 | 1
  [key: string]: unknown
}

export interface YTPlayerInstance {
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  setVolume: (volume: number) => void
  getVolume: () => number
  getCurrentTime: () => number
  getDuration: () => number
  getVideoLoadedFraction: () => number
  getPlayerState: () => number
  setPlaybackQuality: (suggestedQuality: string) => void
  getPlaybackQuality: () => string
  getAvailableQualityLevels: () => string[]
  loadVideoById: (
    videoId:
      | string
      | { videoId: string; startSeconds?: number; endSeconds?: number; suggestedQuality?: string }
  ) => void
  cueVideoById: (
    videoId:
      | string
      | { videoId: string; startSeconds?: number; endSeconds?: number; suggestedQuality?: string }
  ) => void
  destroy: () => void
}

export interface YTNamespace {
  Player: new (element: HTMLElement | string, options: YTPlayerOptions) => YTPlayerInstance
  PlayerState: {
    UNSTARTED: number
    ENDED: number
    PLAYING: number
    PAUSED: number
    BUFFERING: number
    CUED: number
  }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

export interface YouTubePlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPlay" | "onPause"> {
  link?: string
  url?: string
  videoId?: string
  thumbnail?: string
  poster?: string
  quality?: string
  resolution?: string
  showQualitySelector?: boolean
  width?: number | string
  height?: number | string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  showFloatingMute?: boolean
  cropYouTubeHeader?: boolean
  hideControls?: boolean
  statusLabel?: string
  onReady?: (event: YTPlayerEvent) => void
  onStateChange?: (event: YTPlayerEvent) => void
  onEnd?: (event: YTPlayerEvent) => void
  onPlay?: (event: YTPlayerEvent) => void
  onPause?: (event: YTPlayerEvent) => void
  priority?: boolean
  playerVars?: YTPlayerVars
}

let ytApiPromise: Promise<YTNamespace> | null = null

export function loadYouTubeIframeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Window is not defined"))
  }
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT)
  }
  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve) => {
      const checkYT = () => {
        if (window.YT && window.YT.Player) {
          resolve(window.YT)
          return true
        }
        return false
      }

      if (checkYT()) return

      const previousOnReady = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (previousOnReady) {
          try {
            previousOnReady()
          } catch {}
        }
        if (window.YT) {
          resolve(window.YT)
        }
      }

      const existingScript =
        document.getElementById("youtube-iframe-api") ||
        document.getElementById("youtube-iframe-api-preload")
      if (!existingScript) {
        const tag = document.createElement("script")
        tag.id = "youtube-iframe-api"
        tag.src = "https://www.youtube.com/iframe_api"
        const firstScriptTag = document.getElementsByTagName("script")[0]
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        } else {
          document.head.appendChild(tag)
        }
      }
    })
  }
  return ytApiPromise
}

export function extractYouTubeId(urlOrId?: string): string | null {
  if (!urlOrId) return null
  const trimmed = urlOrId.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+?&v=))([a-zA-Z0-9_-]{11})/
  )
  if (match && match[1]) {
    return match[1]
  }
  try {
    const parsed = new URL(trimmed)
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v")
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v
    }
  } catch {}
  return null
}

function mapQuality(q?: string): string {
  if (!q) return "default"
  const normalized = q.toLowerCase().trim()
  if (normalized === "4k" || normalized === "2160p") return "hd2160"
  if (normalized === "2k" || normalized === "1440p") return "hd1440"
  if (
    normalized === "1080p" ||
    normalized === "fullhd" ||
    normalized === "fhd"
  )
    return "hd1080"
  if (normalized === "720p" || normalized === "hd") return "hd720"
  if (normalized === "480p" || normalized === "sd") return "large"
  if (normalized === "360p") return "medium"
  if (normalized === "240p") return "small"
  if (normalized === "144p") return "tiny"
  return normalized
}

function qualityToLabel(q: string): string {
  const map: Record<string, string> = {
    hd2160: "4K",
    hd1440: "1440p",
    hd1080: "1080p",
    hd720: "720p",
    large: "480p",
    medium: "360p",
    small: "240p",
    tiny: "144p",
    auto: "AUTO",
    default: "AUTO",
  }
  return map[q.toLowerCase()] || q.toUpperCase()
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00"
  const totalSeconds = Math.floor(seconds)
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}

function formatDimension(dim?: number | string): string | undefined {
  if (dim === undefined) return undefined
  return typeof dim === "number" ? `${dim}px` : dim
}

const QUALITY_OPTIONS = [
  { label: "Auto", value: "default" },
  { label: "1080p", value: "hd1080" },
  { label: "720p", value: "hd720" },
  { label: "480p", value: "large" },
  { label: "360p", value: "medium" },
]

export function YouTubePlayer({
  link,
  url,
  videoId,
  thumbnail,
  poster,
  quality,
  resolution,
  showQualitySelector = true,
  width,
  height,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = true,
  showFloatingMute = true,
  cropYouTubeHeader = true,
  hideControls = false,
  statusLabel,
  onReady,
  onStateChange,
  onEnd,
  onPlay,
  onPause,
  priority = true,
  playerVars,
  className,
  style,
  ...props
}: YouTubePlayerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const progressBarRef = React.useRef<HTMLDivElement>(null)
  const playerRef = React.useRef<YTPlayerInstance | null>(null)
  const hideControlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const rawVideoId = extractYouTubeId(link || url || videoId)
  const serializedPlayerVars = playerVars ? JSON.stringify(playerVars) : ""
  const initialQuality = quality || resolution

  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isBuffering, setIsBuffering] = React.useState(false)
  const [isEnded, setIsEnded] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(muted)
  const [volume, setVolume] = React.useState(100)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [buffered, setBuffered] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)
  const [isHovered, setIsHovered] = React.useState(false)
  const [hasStarted, setHasStarted] = React.useState(false)

  React.useEffect(() => {
    if (playerRef.current) {
      if (muted) {
        playerRef.current.mute()
      } else {
        playerRef.current.unMute()
        playerRef.current.setVolume(100)
      }
    }
  }, [muted])
  const [hoverTime, setHoverTime] = React.useState<number | null>(null)
  const [hoverPos, setHoverPos] = React.useState<number | null>(null)
  const [currentQuality, setCurrentQuality] = React.useState(
    initialQuality ? mapQuality(initialQuality) : "default"
  )
  const [showSettingsMenu, setShowSettingsMenu] = React.useState(false)
  const [thumbnailError, setThumbnailError] = React.useState(false)

  const defaultThumbnailUrl = rawVideoId
    ? `https://img.youtube.com/vi/${rawVideoId}/maxresdefault.jpg`
    : undefined
  const defaultFallbackThumbnailUrl = rawVideoId
    ? `https://img.youtube.com/vi/${rawVideoId}/hqdefault.jpg`
    : undefined
  const customOrProvidedThumbnail = thumbnail || poster
  const activeThumbnailSrc = getDriveThumbnailUrl(
    customOrProvidedThumbnail ||
    (thumbnailError ? defaultFallbackThumbnailUrl : defaultThumbnailUrl)
  )

  const callbacksRef = React.useRef({
    onReady,
    onStateChange,
    onEnd,
    onPlay,
    onPause,
    muted,
    initialQuality,
  })

  React.useEffect(() => {
    callbacksRef.current = {
      onReady,
      onStateChange,
      onEnd,
      onPlay,
      onPause,
      muted,
      initialQuality,
    }
  })

  const resetHideTimer = React.useCallback(() => {
    setShowControls(true)
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }
    if (isPlaying && !showSettingsMenu) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }
  }, [isPlaying, showSettingsMenu])

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  React.useEffect(() => {
    const container = containerRef.current
    if (!rawVideoId || !container) return

    let isMounted = true
    const mountElement = document.createElement("div")
    container.innerHTML = ""
    container.appendChild(mountElement)

    const parsedVars: YTPlayerVars = serializedPlayerVars
      ? (JSON.parse(serializedPlayerVars) as YTPlayerVars)
      : {}

    loadYouTubeIframeApi().then((YT) => {
      if (!isMounted) return

      playerRef.current = new YT.Player(mountElement, {
        width: "100%",
        height: "100%",
        videoId: rawVideoId,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          loop: loop ? 1 : 0,
          playlist: loop ? rawVideoId : undefined,
          playsinline: playsInline ? 1 : 0,
          ...parsedVars,
        },
        events: {
          onReady: (event: YTPlayerEvent) => {
            if (!isMounted) return
            if (callbacksRef.current.muted) {
              event.target.mute()
              setIsMuted(true)
            } else {
              event.target.unMute()
              event.target.setVolume(100)
              setIsMuted(false)
            }
            setVolume(event.target.getVolume())
            setDuration(event.target.getDuration())

            if (callbacksRef.current.initialQuality) {
              try {
                const targetQ = mapQuality(callbacksRef.current.initialQuality)
                event.target.setPlaybackQuality(targetQ)
                setCurrentQuality(targetQ)
              } catch {}
            }

            if (autoPlay) {
              try {
                event.target.playVideo()
              } catch {}
            }

            callbacksRef.current.onReady?.(event)
          },
          onStateChange: (event: YTPlayerEvent) => {
            if (!isMounted) return
            callbacksRef.current.onStateChange?.(event)

            if (window.YT && window.YT.PlayerState) {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true)
                setIsBuffering(false)
                setIsEnded(false)
                setHasStarted(true)
                try {
                  const q = event.target.getPlaybackQuality()
                  if (q) setCurrentQuality(q)
                } catch {}
                callbacksRef.current.onPlay?.(event)
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false)
                setIsBuffering(false)
                setShowControls(true)
                callbacksRef.current.onPause?.(event)
              } else if (event.data === window.YT.PlayerState.BUFFERING) {
                setIsBuffering(true)
              } else if (event.data === window.YT.PlayerState.ENDED) {
                if (loop) {
                  try {
                    event.target.seekTo(0)
                    event.target.playVideo()
                  } catch {}
                }
                setIsPlaying(false)
                setIsBuffering(false)
                setIsEnded(true)
                setShowControls(true)
                callbacksRef.current.onEnd?.(event)
              }
            }
          },
        },
      })
    })

    return () => {
      isMounted = false
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch {}
        playerRef.current = null
      }
      container.innerHTML = ""
    }
  }, [
    rawVideoId,
    autoPlay,
    loop,
    playsInline,
    serializedPlayerVars,
  ])

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        if (!playerRef.current) return
        try {
          const cur = playerRef.current.getCurrentTime() || 0
          const dur = playerRef.current.getDuration() || 0
          const frac = playerRef.current.getVideoLoadedFraction() || 0
          setCurrentTime(cur)
          if (dur > 0) setDuration(dur)
          setBuffered(frac * dur)
        } catch {}
      }, 250)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (!playerRef.current) return
    if (isEnded) {
      playerRef.current.seekTo(0, true)
      playerRef.current.playVideo()
      setIsEnded(false)
      setIsPlaying(true)
      return
    }
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
      setHasStarted(true)
    }
    resetHideTimer()
  }

  const toggleMute = () => {
    if (!playerRef.current) return
    if (isMuted) {
      playerRef.current.unMute()
      setIsMuted(false)
      if (volume === 0) {
        setVolume(50)
        playerRef.current.setVolume(50)
      }
    } else {
      playerRef.current.mute()
      setIsMuted(true)
    }
    resetHideTimer()
  }

  const handleVolumeChange = (newVolume: number) => {
    if (!playerRef.current) return
    setVolume(newVolume)
    playerRef.current.setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      playerRef.current.unMute()
      setIsMuted(false)
    } else if (newVolume === 0 && !isMuted) {
      playerRef.current.mute()
      setIsMuted(true)
    }
    resetHideTimer()
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !playerRef.current || duration <= 0) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const target = pos * duration
    setCurrentTime(target)
    playerRef.current.seekTo(target, true)
    resetHideTimer()
  }

  const handleMouseMoveProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || duration <= 0) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setHoverPos(pos * 100)
    setHoverTime(pos * duration)
  }

  const handleMouseLeaveProgress = () => {
    setHoverTime(null)
    setHoverPos(null)
  }

  const handleQualityChange = (qVal: string) => {
    setCurrentQuality(qVal)
    setShowSettingsMenu(false)
    if (!playerRef.current) return
    try {
      playerRef.current.setPlaybackQuality(qVal)
      const currentPos = playerRef.current.getCurrentTime() || 0
      if (rawVideoId) {
        playerRef.current.loadVideoById({
          videoId: rawVideoId,
          startSeconds: currentPos,
          suggestedQuality: qVal
        })
      }
    } catch {}
    resetHideTimer()
  }

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
    resetHideTimer()
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const bufferPercent = duration > 0 ? (buffered / duration) * 100 : 0

  const resolvedStatusLabel =
    statusLabel ||
    (isEnded ? "REPLAY" : isPlaying ? "PLAYING" : "PRESS PLAY")

  const hasCustomHeight = Boolean(height)
  const computedWidth = formatDimension(width)
  const computedHeight = formatDimension(height)

  return (
    <>
      <div
        ref={wrapperRef}
        onMouseMove={() => {
          setIsHovered(true)
          resetHideTimer()
        }}
        onMouseEnter={() => {
          setIsHovered(true)
          resetHideTimer()
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          if (isPlaying && !showSettingsMenu) {
            setShowControls(false)
          }
        }}
        style={{
          width: computedWidth,
          height: computedHeight,
          ...style,
        }}
        className={cn(
          "group/player relative overflow-hidden bg-black select-none",
          !hasCustomHeight && "w-full",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden bg-black",
            hasCustomHeight ? "h-full" : "aspect-video"
          )}
        >
          <div
            ref={containerRef}
            className={cn(
              "pointer-events-none absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full",
              cropYouTubeHeader
                ? "-top-[25%] -left-[10%] h-[150%] w-[120%] sm:-top-[14%] sm:-left-[3%] sm:h-[128%] sm:w-[106%]"
                : "h-full w-full"
            )}
          />

          {!hasStarted && activeThumbnailSrc && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 z-15 cursor-pointer overflow-hidden bg-black"
            >
              <Image
                key={activeThumbnailSrc}
                src={activeThumbnailSrc}
                alt="Video thumbnail"
                referrerPolicy="no-referrer"
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setThumbnailError(true)}
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
            </div>
          )}

          {!hideControls && (
            <div
              onClick={togglePlay}
              onDoubleClick={toggleFullscreen}
              className="absolute inset-0 z-10 cursor-pointer bg-transparent"
            />
          )}

          {isBuffering && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <Loader2 className="size-10 animate-spin text-[#ded8cb]" />
            </div>
          )}

          {!hideControls && !hasStarted && !isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer bg-black/30 backdrop-blur-[1px] transition-all hover:bg-black/20"
            >
              <button
                type="button"
                aria-label="Play video"
                className="group/btn flex size-16 sm:size-20 items-center justify-center rounded-full border border-white/25 bg-black/60 text-[#eae4d7] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-black/80 active:scale-95"
              >
                <Play className="ml-1 size-7 sm:size-8 fill-current" />
              </button>
              <span className="mt-3 text-[11px] font-mono uppercase tracking-[0.3em] text-[#dcd6c8]/90 font-medium">
                {resolvedStatusLabel}
              </span>
            </div>
          )}

          {!hideControls && (
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-3 pb-3 pt-10 transition-all duration-300 sm:px-4",
                showControls || !isPlaying || isHovered || showSettingsMenu
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              )}
            >
            <div
              ref={progressBarRef}
              onClick={handleSeek}
              onMouseMove={handleMouseMoveProgress}
              onMouseLeave={handleMouseLeaveProgress}
              className="group/progress relative flex h-2 w-full cursor-pointer items-center py-1"
            >
              <div className="relative h-1 w-full rounded-full bg-white/20 transition-all duration-150 group-hover/progress:h-1.5">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-white/30"
                  style={{ width: `${Math.min(100, bufferPercent)}%` }}
                />
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-[#e8e2d5]"
                  style={{ width: `${Math.min(100, progressPercent)}%` }}
                />
                <div
                  className="absolute top-1/2 size-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#f4eee1] shadow-md transition-transform scale-0 group-hover/progress:scale-100"
                  style={{ left: `${Math.min(100, progressPercent)}%` }}
                />
              </div>

              {hoverTime !== null && hoverPos !== null && (
                <div
                  className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded border border-white/15 bg-black/90 px-1.5 py-0.5 text-[10px] font-mono text-[#eae4d7] shadow"
                  style={{ left: `${hoverPos}%` }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex size-8 items-center justify-center rounded-lg text-[#ded8cb] transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isEnded ? (
                    <RotateCcw className="size-4" />
                  ) : isPlaying ? (
                    <Pause className="size-4 fill-current" />
                  ) : (
                    <Play className="ml-0.5 size-4 fill-current" />
                  )}
                </button>

                <div className="group/vol flex items-center gap-1">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex size-8 items-center justify-center rounded-lg text-[#ded8cb] transition-colors hover:bg-white/10 hover:text-white"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="size-4" />
                    ) : volume < 50 ? (
                      <Volume1 className="size-4" />
                    ) : (
                      <Volume2 className="size-4" />
                    )}
                  </button>

                  <div className="flex w-0 overflow-hidden transition-all duration-200 group-hover/vol:w-16 items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="h-1 w-14 cursor-pointer accent-[#eae4d7] bg-white/20 rounded-full"
                    />
                  </div>
                </div>

                <div className="ml-1 text-[11px] font-mono font-medium tracking-wider text-[#d0cac0] select-none">
                  {formatTime(currentTime)}
                  <span className="mx-1 text-white/30">/</span>
                  {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-[#9e988d] select-none font-semibold">
                  {resolvedStatusLabel}
                </span>

                {showQualitySelector && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowSettingsMenu((prev) => !prev)}
                      className="flex h-8 items-center gap-1 rounded-lg px-2 text-[11px] font-mono font-medium text-[#ded8cb] transition-colors hover:bg-white/10 hover:text-white"
                      aria-label="Quality settings"
                    >
                      <Settings className="size-3.5" />
                      <span className="uppercase text-[10px] tracking-wider">
                        {qualityToLabel(currentQuality)}
                      </span>
                    </button>

                    {showSettingsMenu && (
                      <div className="absolute bottom-10 right-0 z-50 min-w-28 rounded-xl border border-white/15 bg-[#181818]/95 p-1.5 shadow-2xl backdrop-blur-md">
                        <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#9e988d]">
                          Quality
                        </div>
                        {QUALITY_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleQualityChange(opt.value)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-mono transition-colors",
                              currentQuality === opt.value
                                ? "bg-white/15 text-[#f4eee1] font-semibold"
                                : "text-[#cac4b7] hover:bg-white/10 hover:text-white"
                            )}
                          >
                            <span>{opt.label}</span>
                            {currentQuality === opt.value && (
                              <span className="size-1.5 rounded-full bg-[#eae4d7]" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex size-8 items-center justify-center rounded-lg text-[#ded8cb] transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize className="size-4" />
                  ) : (
                    <Maximize className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {showFloatingMute && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          className="fixed bottom-6 right-6 z-50 flex size-12 sm:size-14 items-center justify-center rounded-full bg-[#1b1b1b] text-[#eae4d7] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/15 transition-all duration-300 hover:scale-105 hover:bg-[#262626] hover:text-white active:scale-95"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="size-5 sm:size-6" />
          ) : (
            <Volume2 className="size-5 sm:size-6" />
          )}
        </button>
      )}
    </>
  )
}

export { YouTubePlayer as YoutubePlayer }
export default YouTubePlayer
