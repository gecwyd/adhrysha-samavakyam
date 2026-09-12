"use client"

import * as React from "react"
import { motion, useInView, useSpring, useTransform, useScroll } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"
import { useAudio } from "@/context/audio.context"
import { resolveAsset } from "@/lib/asset-registry"
import { preload } from "@/lib/preload"
import { cn } from "@/lib/utils"

const MISS_MINUTES_VIDEO_URL = "miss-minute-intro.webm"
const DESK_BG_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/desk-bg.png" // The realistic desk scene

export type SecGProps = React.HTMLAttributes<HTMLElement>

export function SecG({ className, ...props }: SecGProps) {
    const { pauseBg, playbg } = useAudio()
    const containerRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const hasEnteredRef = useRef(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [hasVideoEnded, setHasVideoEnded] = useState(false)

    // Scroll-based interactions (can be applied to the TV container for parallax)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const rotateX = useTransform(scrollYProgress, [0, 1], [4, -4])
    const rotateY = useTransform(scrollYProgress, [0, 1], [-2, 2])

    const springConfig = { damping: 25, stiffness: 120, mass: 0.8 }
    const springRotateX = useSpring(rotateX, springConfig)
    const springRotateY = useSpring(rotateY, springConfig)

    useEffect(() => {
        preload(MISS_MINUTES_VIDEO_URL, "video")
    }, [])

    const isInView = useInView(containerRef, { amount: 0.3 })

    useEffect(() => {
        if (isInView) {
            hasEnteredRef.current = true
            pauseBg?.(0)
            if (videoRef.current) {
                videoRef.current.play().then(() => {
                    setIsVideoPlaying(true)
                    setHasVideoEnded(false)
                }).catch(() => {
                    setIsVideoPlaying(false)
                })
            }
        } else if (hasEnteredRef.current) {
            if (videoRef.current) {
                videoRef.current.pause()
            }
            setIsVideoPlaying(false)
        }
    }, [isInView, pauseBg])

    const handleVideoEnd = useCallback(() => {
        setIsVideoPlaying(false)
        setHasVideoEnded(true)
        playbg?.(resolveAsset("bg-piano.mp3"), { loop: true, volume: 0.5 })
    }, [playbg])

    const togglePlay = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        if (!videoRef.current) return
        if (videoRef.current.paused) {
            pauseBg?.(0)
            videoRef.current.play().then(() => {
                setIsVideoPlaying(true)
                setHasVideoEnded(false)
            }).catch(() => {})
        } else {
            videoRef.current.pause()
            setIsVideoPlaying(false)
            playbg?.(resolveAsset("bg-piano.mp3"), { loop: true, volume: 0.5 })
        }
    }, [pauseBg, playbg])

    return (
        <section
            ref={containerRef}
            className={cn("relative w-full h-screen overflow-hidden bg-black select-none", className)}
            {...props}
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
                        linear-gradient(rgba(0,0,0,0.08) 50%, transparent 50%),
                        linear-gradient(90deg, rgba(255,0,0,0.04), rgba(0,255,0,0.01), rgba(0,0,255,0.04));
                    background-size: 100% 3px, 4px 100%;
                    pointer-events: none;
                }
                .crt-scan-bar {
                    height: 15%;
                    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
                    animation: crt-scanline 8s linear infinite;
                    pointer-events: none;
                }
            `}</style>

            {/* 
                This container ensures the 16:9 aspect ratio is perfectly maintained 
                while always covering the screen. This allows us to use % based 
                absolute positioning to pin the TV perfectly to the desk in the image.
            */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full md:w-[100vw] md:h-[100vh] md:min-w-[177.78vh] md:min-h-[56.25vw]"
            >
                {/* The Realistic Desk Background Image */}
                <img
                    src={DESK_BG_URL}
                    alt="Desk Background"
                    className="absolute inset-0 w-full h-full object-cover md:object-fill"
                />

                {/* The TV positioned on the desk */}
                <motion.div 
                    className="absolute z-10 flex flex-col items-center w-[85%] max-w-[360px] left-1/2 top-[55%] md:w-[28%] md:max-w-none md:left-[48%] md:top-[50%]"
                    style={{ 
                        transform: 'translate(-50%, -50%)',
                        rotateX: springRotateX,
                        rotateY: springRotateY,
                        transformStyle: "preserve-3d",
                        perspective: "1000px"
                    }}
                >
                    {/* Shadow on desk */}
                    <div className="absolute -bottom-6 w-[110%] h-12 bg-black/50 blur-xl rounded-full" />
                    <div className="absolute -bottom-2 w-[90%] h-6 bg-black/60 blur-md rounded-full" />

                    {/* TV Main Body */}
                    <div 
                        className="w-full relative rounded-[2.5rem] p-3 sm:p-4 md:p-6 flex gap-3 md:gap-5"
                        style={{
                            background: 'linear-gradient(135deg, #dfdcd4 0%, #bcb6aa 100%)',
                            boxShadow: `
                                inset 0 2px 5px rgba(255,255,255,0.9), 
                                inset 0 -4px 10px rgba(0,0,0,0.25),
                                0 10px 25px rgba(0,0,0,0.6),
                                0 0 0 2px #a8a395
                            `,
                        }}
                    >
                        {/* Left: Screen Area */}
                        <div 
                            className="flex-1 rounded-[1.5rem] p-2 sm:p-3 md:p-5"
                            style={{
                                background: 'linear-gradient(135deg, #222 0%, #0a0a0a 100%)',
                                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9), 0 2px 4px rgba(255,255,255,0.3)',
                                border: '1px solid #111'
                            }}
                        >
                            {/* CRT Screen */}
                            <div 
                                className="w-full aspect-[4/3] rounded-2xl bg-black relative overflow-hidden crt-flicker group cursor-pointer"
                                onClick={togglePlay}
                                style={{
                                    boxShadow: isVideoPlaying 
                                        ? 'inset 0 0 40px rgba(0,0,0,0.9), 0 0 20px rgba(200,160,80,0.1)'
                                        : 'inset 0 0 40px rgba(0,0,0,1)'
                                }}
                            >
                                <video
                                    ref={videoRef}
                                    src={preload(resolveAsset(MISS_MINUTES_VIDEO_URL))}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{ 
                                        filter: "contrast(1.1) saturate(1.1) brightness(0.95)",
                                        transform: "scale(1.02)",
                                    }}
                                    controls={false}
                                    muted={false}
                                    playsInline
                                    onContextMenu={(e) => e.preventDefault()}
                                    onPlay={() => { setIsVideoPlaying(true); pauseBg?.(0); setHasVideoEnded(false); }}
                                    onPause={() => setIsVideoPlaying(false)}
                                    onEnded={handleVideoEnd}
                                />

                                {/* CRT Overlay Effects */}
                                <div className="absolute inset-0 crt-grid" />
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="crt-scan-bar w-full" />
                                </div>
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: "radial-gradient(ellipse 120% 120% at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 40%)",
                                    }}
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        boxShadow: "inset 0 0 40px rgba(0,0,0,0.9)",
                                        borderRadius: "16px",
                                    }}
                                />

                                {/* Play Button Overlay */}
                                {!isVideoPlaying && !hasVideoEnded && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div 
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                            style={{
                                                background: "rgba(255,255,255,0.15)",
                                                backdropFilter: "blur(4px)",
                                                border: "2px solid rgba(255,255,255,0.4)",
                                                boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                                            }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="white" className="ml-1">
                                                <polygon points="6,3 17,10 6,17" />
                                            </svg>
                                        </div>
                                    </div>
                                )}

                                {/* Thank You Overlay */}
                                {hasVideoEnded && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 pointer-events-none crt-flicker"
                                    >
                                        <h2 
                                            className="font-mono text-xl md:text-3xl lg:text-4xl tracking-[0.25em] font-bold text-center"
                                            style={{ 
                                                color: "#e8d5b5", 
                                                textShadow: "0 0 15px rgba(232,213,181,0.6), 0 0 30px rgba(232,213,181,0.3)" 
                                            }}
                                        >
                                            THANK YOU
                                        </h2>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Right: Controls Panel */}
                        <div className="w-[22%] sm:w-[20%] flex flex-col justify-between py-2 sm:py-4">
                            {/* Speaker Grille */}
                            <div className="w-full flex flex-col gap-[3px] sm:gap-[5px]">
                                {[...Array(9)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className="w-full h-[3px] sm:h-[4px] rounded-full"
                                        style={{
                                            background: '#8a8475',
                                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.4)'
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Rotary Knobs */}
                            <div className="flex flex-col gap-4 sm:gap-6 items-center mt-auto pb-2">
                                {[
                                    { label: "V-HOLD", rotate: isVideoPlaying ? 45 : 0 },
                                    { label: "UHF", rotate: isVideoPlaying ? 90 : -20 }
                                ].map((knob, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={togglePlay}>
                                        <div 
                                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full relative"
                                            style={{
                                                background: 'conic-gradient(from 180deg, #d4cfc4, #fff, #a39f94, #fff, #d4cfc4)',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.8)',
                                                border: '1px solid #888',
                                                transform: `rotate(${knob.rotate}deg)`,
                                                transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
                                            }}
                                        >
                                            <div 
                                                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-1 sm:w-1.5 h-[30%] rounded-full"
                                                style={{
                                                    background: '#555',
                                                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Power Jewel */}
                                <div className="mt-2 flex flex-col items-center cursor-pointer" onClick={togglePlay}>
                                    <div
                                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                                        style={{
                                            background: isVideoPlaying
                                                ? "radial-gradient(circle at 30% 30%, #4ade80, #15803d)"
                                                : "radial-gradient(circle at 30% 30%, #ef4444, #991b1b)",
                                            boxShadow: isVideoPlaying
                                                ? "0 0 10px rgba(74,222,128,0.5), inset 0 1px 2px rgba(255,255,255,0.6)"
                                                : "0 0 5px rgba(239,68,68,0.3), inset 0 1px 2px rgba(255,255,255,0.4)",
                                            border: "1px solid #777",
                                            transition: "all 0.3s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TV Legs */}
                    <div className="flex justify-between w-[75%] mt-[-2px] z-[-1]">
                        <div 
                            className="w-4 h-6 sm:w-6 sm:h-8 rounded-b-lg"
                            style={{
                                background: 'linear-gradient(to right, #111, #333, #111)',
                                border: '1px solid #000'
                            }}
                        />
                        <div 
                            className="w-4 h-6 sm:w-6 sm:h-8 rounded-b-lg"
                            style={{
                                background: 'linear-gradient(to right, #111, #333, #111)',
                                border: '1px solid #000'
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default SecG
