"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useAudio } from "@/context/audio.context"
import { resolveAsset } from "@/lib/asset-registry"
import { preload } from "@/lib/preload"
import { YouTubePlayer, extractYouTubeId } from "@/components/ui/youtube-player"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

const UNION_VIDEO_URL = "https://www.youtube.com/watch?v=yZ-_k0RcZq0"

const UNION_CREW = [
    { name: "Monochrome GECW", role: "Film Club of GECW" },
    { name: "Abhinand U", role: "Chairperson" },
    { name: "Adithya Krishna MK", role: "Vice Chairperson" },
    { name: "Jaseem Akber A", role: "General Secretary" },
    { name: "Adhil Muhammed K", role: "Magazine Editor" },
    { name: "Muhammed Sinan M", role: "Arts Secretary" },
    { name: "Mohammed Shamlal KP", role: "University Union Councillor" },
    { name: "Nishad NM", role: "University Union Councillor" },
    { name: "Gargi Nambiar", role: "Women Representative" },
    { name: "Shafna", role: "Women Representative" },
    { name: "Snehananda", role: "SC/ST Representative" },
    { name: "Mohammed Shibin", role: "Sports Secretary" },
    { name: "Abhinav S", role: "CSE Dept Representative" },
    { name: "Anand V", role: "ME Dept Representative" },
    { name: "Avin Jose", role: "CEE Dept Representative" },
    { name: "Aasil Kareem", role: "ECE Dept Representative" },
    { name: "Rahil Rafeeque", role: "EEE Dept Representative" },
    { name: "Dr. Brijmohan K", role: "Staff Advisor" }
]

export type SecEProps = React.HTMLAttributes<HTMLElement>

export function SecE({ className, ...props }: SecEProps) {
    const { pauseBg, playbg } = useAudio()
    const containerRef = useRef<HTMLElement>(null)
    const hasEnteredRef = useRef(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        preload(UNION_VIDEO_URL, "youtube")
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check, { passive: true })
        return () => window.removeEventListener("resize", check)
    }, [])

    const isInView = useInView(containerRef, { amount: "some", margin: "150px 0px" })

    useEffect(() => {
        if (isInView) {
            hasEnteredRef.current = true
            if (isVideoPlaying) {
                pauseBg?.(300)
            } else {
                playbg?.(resolveAsset("bg-piano.mp3"), { loop: true, volume: 0.35 })
            }
        }
    }, [isInView, isVideoPlaying, playbg, pauseBg])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const bgGlowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.2, 1.1])
    const bgGlowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.15, 0.35, 0.25])
    const watermarkY = useTransform(scrollYProgress, [0, 1], [30, -50])
    const watermarkOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.03, 0.07, 0.07, 0.04])

    const heroTitleY = useTransform(scrollYProgress, [0, 0.28], isMobile ? [0, -25] : [0, -70])
    const heroTitleScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.92])
    const heroTitleOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.15])

    const videoY = useTransform(scrollYProgress, [0, 0.35], isMobile ? [35, 0] : [90, 0])
    const videoScale = useTransform(scrollYProgress, [0, 0.35], isMobile ? [0.96, 1] : [0.9, 1])

    const creditsOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0.4, 1])
    const creditsY = useTransform(scrollYProgress, [0.15, 0.35], isMobile ? [15, 0] : [35, 0])

    const isYouTube = Boolean(extractYouTubeId(UNION_VIDEO_URL))

    return (
        <section
            ref={containerRef}
            id="sec-e"
            className={cn("relative h-[250vh] w-full bg-[#050505] text-[#d9d4c7] z-20", className)}
            {...props}
        >
            <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#050505] px-4 sm:px-8 pt-7 sm:pt-8 pb-5 sm:pb-7 select-none [transform:translateZ(0)]">
                <div className="hidden md:block">
                    <motion.div
                        style={{ scale: bgGlowScale, opacity: bgGlowOpacity, willChange: "transform, opacity" }}
                        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(217,212,199,0.15)_0%,_transparent_60%)] blur-3xl"
                    />
                </div>
                <div className="md:hidden absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_center,_rgba(217,212,199,0.12)_0%,_transparent_65%)]" />

                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#d9d4c7_1px,transparent_1px),linear-gradient(to_bottom,#d9d4c7_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

                <div className="hidden sm:flex absolute inset-0 pointer-events-none items-center justify-center overflow-hidden">
                    <motion.span
                        style={{ y: watermarkY, opacity: watermarkOpacity, willChange: "transform, opacity" }}
                        className="font-heading font-black text-[30vw] tracking-tighter text-[#d9d4c7] leading-none whitespace-nowrap select-none"
                    >
                        SATHVA
                    </motion.span>
                </div>

                <div className="relative w-full flex flex-col items-center z-20 shrink-0">
                    <motion.div
                        style={{ y: heroTitleY, scale: heroTitleScale, opacity: heroTitleOpacity, willChange: "transform, opacity" }}
                        className="flex flex-col items-center text-center max-w-xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d9d4c7]/20 bg-[#d9d4c7]/[0.06] backdrop-blur-md mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[#d9d4c7]/80 font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-semibold">
                                REEL 01 // UNION FILM 2025–26
                            </span>
                        </div>

                        <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase text-[#d9d4c7] tracking-tight leading-[0.88] drop-shadow-xl">
                            Sathva Union
                        </h2>

                        <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#d9d4c7]/50 font-semibold mt-1.5">
                            Monochrome GECW · Govt Engineering College Wayanad
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    style={{ scale: videoScale, y: videoY, willChange: "transform" }}
                    className="relative w-full max-w-3xl lg:max-w-5xl z-20 my-auto px-1 sm:px-4"
                >
                    <div className="hidden md:block">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#d9d4c7]/15 via-[#d9d4c7]/25 to-[#d9d4c7]/15 rounded-2xl blur-xl pointer-events-none" />
                    </div>

                    <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#050505] border border-[#d9d4c7]/25 shadow-2xl md:shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
                        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 w-3 h-3 border-t-2 border-l-2 border-[#d9d4c7]/60 pointer-events-none z-30" />
                        <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-3 h-3 border-t-2 border-r-2 border-[#d9d4c7]/60 pointer-events-none z-30" />
                        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 w-3 h-3 border-b-2 border-l-2 border-[#d9d4c7]/60 pointer-events-none z-30" />
                        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 w-3 h-3 border-b-2 border-r-2 border-[#d9d4c7]/60 pointer-events-none z-30" />

                        <div className="absolute top-3 left-8 pointer-events-none z-30 flex items-center gap-2">
                            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[#d9d4c7]/60 uppercase">
                                REC ● 24 FPS
                            </span>
                        </div>

                        <div className="absolute top-3 right-8 pointer-events-none z-30 hidden sm:flex items-center gap-2">
                            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[#d9d4c7]/60 uppercase">
                                4K CINEMA // 16:9
                            </span>
                        </div>

                        {isYouTube ? (
                            <YouTubePlayer
                                url={UNION_VIDEO_URL}
                                showFloatingMute={false}
                                className="w-full h-full object-cover"
                                onPlay={() => setIsVideoPlaying(true)}
                                onPause={() => setIsVideoPlaying(false)}
                                onEnd={() => setIsVideoPlaying(false)}
                            />
                        ) : (
                            <video
                                src={resolveAsset(UNION_VIDEO_URL)}
                                className="w-full h-full object-cover"
                                controls
                                playsInline
                                onContextMenu={(e) => e.preventDefault()}
                                onPlay={() => setIsVideoPlaying(true)}
                                onPause={() => setIsVideoPlaying(false)}
                                onEnded={() => setIsVideoPlaying(false)}
                            />
                        )}
                    </div>
                </motion.div>

                <motion.div
                    style={{ opacity: creditsOpacity, y: creditsY, willChange: "transform, opacity" }}
                    className="relative w-full max-w-6xl flex flex-col items-center gap-3 sm:gap-4 z-20 shrink-0 pb-2 sm:pb-0"
                >
                    <div className="w-full relative overflow-hidden py-2 sm:py-2.5 border-y border-[#d9d4c7]/15 bg-[#050505]">
                        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                        <div className="flex items-center gap-8 sm:gap-14 w-max px-4 animate-[marquee_34s_linear_infinite] will-change-transform">
                            {[...UNION_CREW, ...UNION_CREW].map((member, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#d9d4c7]/40" />
                                    <div className="flex flex-col">
                                        <span className="text-[#d9d4c7] font-heading text-sm sm:text-lg tracking-wider uppercase leading-tight">
                                            {member.name}
                                        </span>
                                        <span className="text-[#d9d4c7]/50 font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase font-bold">
                                            {member.role}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={UNION_VIDEO_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative inline-flex items-center gap-2.5 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full border border-[#d9d4c7]/30 hover:border-[#d9d4c7] bg-[#d9d4c7]/10 hover:bg-[#d9d4c7] transition-all duration-300 shadow-md active:scale-95"
                        >
                            <svg className="w-3.5 h-3.5 text-red-500 group-hover:text-[#050505] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-[#d9d4c7] group-hover:text-[#050505] transition-colors duration-300">
                                Watch on YouTube
                            </span>
                            <ArrowUpRight className="w-3 h-3 text-[#d9d4c7] group-hover:text-[#050505] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export const SecG = SecE
export default SecE
