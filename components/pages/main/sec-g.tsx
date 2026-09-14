"use client"

import * as React from "react"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"
import { useAudio } from "@/context/audio.context"
import { resolveAsset } from "@/lib/asset-registry"
import { preload } from "@/lib/preload"
import { cn } from "@/lib/utils"
import { Play, Pause, RotateCcw, Volume2, VolumeX, SkipForward } from "lucide-react"

const MISS_MINUTES_VIDEO_URL = "miss-minute-intro.webm"

export type SecGProps = React.HTMLAttributes<HTMLElement>

export function SecG({ className, ...props }: SecGProps) {
    const { pauseBg, playbg } = useAudio()
    const containerRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const hasEnteredRef = useRef(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [hasVideoEnded, setHasVideoEnded] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120, mass: 0.8 })
    const rotateX = useTransform(smoothProgress, [0, 1], [3, -3])
    const rotateY = useTransform(smoothProgress, [0, 1], [-2, 2])
    const contentScale = useTransform(smoothProgress, [0, 0.85, 1], [1, 1, 0.96])
    const contentOpacity = useTransform(smoothProgress, [0.85, 1], [1, 0.2])

    useEffect(() => {
        preload(MISS_MINUTES_VIDEO_URL, "video")
    }, [])

    const isInView = useInView(containerRef, { amount: "some", margin: "150px 0px" })

    useEffect(() => {
        if (isInView) {
            pauseBg?.(0)
            if (videoRef.current && !hasEnteredRef.current) {
                hasEnteredRef.current = true
                videoRef.current.muted = false
                setIsMuted(false)
                videoRef.current.play().then(() => {
                    setIsVideoPlaying(true)
                    setHasVideoEnded(false)
                }).catch(() => {
                    setIsVideoPlaying(false)
                })
            }
        } else if (hasEnteredRef.current) {
            if (videoRef.current && !videoRef.current.paused && !hasVideoEnded) {
                videoRef.current.pause()
                setIsVideoPlaying(false)
            }
        }
    }, [isInView, hasVideoEnded, pauseBg])

    const handleVideoEnd = useCallback(() => {
        setIsVideoPlaying(false)
        setHasVideoEnded(true)
        playbg?.(resolveAsset("bg-piano.mp3"), { loop: true, volume: 0.35 })

        setTimeout(() => {
            const nextEl = containerRef.current?.nextElementSibling
            if (nextEl) {
                nextEl.scrollIntoView({ behavior: "smooth", block: "start" })
            } else {
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
            }
        }, 200)
    }, [playbg])

    const handleSkip = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.pause()
        }
        setIsVideoPlaying(false)
        setHasVideoEnded(true)
        playbg?.(resolveAsset("bg-piano.mp3"), { loop: true, volume: 0.35 })

        setTimeout(() => {
            const nextEl = containerRef.current?.nextElementSibling
            if (nextEl) {
                nextEl.scrollIntoView({ behavior: "smooth", block: "start" })
            } else {
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
            }
        }, 100)
    }, [playbg])

    const togglePlay = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        if (!videoRef.current) return
        if (hasVideoEnded) {
            videoRef.current.currentTime = 0
            pauseBg?.(0)
            videoRef.current.play().then(() => {
                setIsVideoPlaying(true)
                setHasVideoEnded(false)
            }).catch(() => {})
            return
        }
        if (videoRef.current.paused) {
            pauseBg?.(0)
            videoRef.current.play().then(() => {
                setIsVideoPlaying(true)
                setHasVideoEnded(false)
            }).catch(() => {})
        } else {
            videoRef.current.pause()
            setIsVideoPlaying(false)
            playbg?.(resolveAsset("bg-piano.mp3"), { loop: true, volume: 0.35 })
        }
    }, [hasVideoEnded, pauseBg, playbg])

    const toggleMute = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        if (!videoRef.current) return
        const nextMuted = !videoRef.current.muted
        videoRef.current.muted = nextMuted
        setIsMuted(nextMuted)
    }, [])

    return (
        <section
            ref={containerRef}
            id="sec-g"
            className={cn("relative h-[100dvh] w-full bg-black text-[#d9d4c7] z-20", className)}
            {...props}
        >
            <div
                onClick={togglePlay}
                className="relative h-full w-full overflow-hidden bg-black flex items-center justify-center select-none cursor-pointer [perspective:1000px]"
            >
                <style>{`
                    @keyframes crt-flicker {
                        0%, 100% { opacity: 1; }
                        92% { opacity: 0.96; }
                        93% { opacity: 1; }
                        95% { opacity: 0.98; }
                        96% { opacity: 1; }
                    }
                    @keyframes crt-scanline {
                        0% { transform: translateY(-100%); }
                        100% { transform: translateY(200%); }
                    }
                    .crt-flicker { animation: crt-flicker 5s infinite; }
                    .crt-grid {
                        background: 
                            linear-gradient(rgba(0,0,0,0.16) 50%, transparent 50%),
                            linear-gradient(90deg, rgba(255,0,0,0.05), rgba(0,255,0,0.02), rgba(0,0,255,0.05));
                        background-size: 100% 3px, 5px 100%;
                        pointer-events: none;
                    }
                    .crt-scan-bar {
                        height: 18%;
                        background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent);
                        animation: crt-scanline 7s linear infinite;
                        pointer-events: none;
                    }
                `}</style>

                <motion.div
                    style={{
                        scale: contentScale,
                        opacity: contentOpacity,
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="absolute inset-0 w-full h-full overflow-hidden crt-flicker"
                >
                    <video
                        ref={videoRef}
                        src={preload(resolveAsset(MISS_MINUTES_VIDEO_URL))}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            filter: "contrast(1.15) saturate(1.2) brightness(0.96)",
                            transform: "scale(1.03)"
                        }}
                        controls={false}
                        muted={isMuted}
                        playsInline
                        onContextMenu={(e) => e.preventDefault()}
                        onPlay={() => { setIsVideoPlaying(true); pauseBg?.(0); setHasVideoEnded(false); }}
                        onPause={() => setIsVideoPlaying(false)}
                        onEnded={handleVideoEnd}
                    />

                    <div className="absolute inset-0 crt-grid pointer-events-none" />
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="crt-scan-bar w-full" />
                    </div>
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 120% 120% at 50% 0%, rgba(255,255,255,0.14) 0%, transparent 45%)"
                        }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            boxShadow: "inset 0 0 60px rgba(0,0,0,0.85), inset 0 0 140px rgba(0,0,0,0.95)"
                        }}
                    />
                </motion.div>

                {!isVideoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/30 shadow-2xl text-white transition-transform hover:scale-110">
                            {hasVideoEnded ? (
                                <RotateCcw className="w-7 h-7 md:w-8 md:h-8" />
                            ) : (
                                <Play className="w-7 h-7 md:w-8 md:h-8 ml-1 fill-white" />
                            )}
                        </div>
                    </div>
                )}

                <div className="absolute bottom-5 right-5 z-20 flex items-center gap-3">
                    <button
                        onClick={handleSkip}
                        aria-label="Skip video"
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider shadow-lg"
                    >
                        <SkipForward className="w-3.5 h-3.5" />
                        <span>Skip</span>
                    </button>
                    <button
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-colors shadow-lg"
                    >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={togglePlay}
                        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                        className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-colors shadow-lg"
                    >
                        {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SecG
