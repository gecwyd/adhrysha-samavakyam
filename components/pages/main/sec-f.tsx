"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect } from "react"
import { resolveAsset } from "@/lib/asset-registry"
import { preload } from "@/lib/preload"
import { YouTubePlayer, extractYouTubeId } from "@/components/ui/youtube-player"
import { cn } from "@/lib/utils"
import { Film, ArrowUpRight } from "lucide-react"

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

export type SecFProps = React.HTMLAttributes<HTMLElement>

export function SecF({ className, ...props }: SecFProps) {
    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        preload(UNION_VIDEO_URL, "youtube")
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const smooth = useSpring(scrollYProgress, { stiffness: 85, damping: 26 })

    const bgGlowScale = useTransform(smooth, [0, 0.5, 1], [0.85, 1.2, 1.1])
    const bgGlowOpacity = useTransform(smooth, [0, 0.4, 0.8], [0.15, 0.35, 0.25])
    const watermarkY = useTransform(smooth, [0, 1], [30, -50])
    const watermarkOpacity = useTransform(smooth, [0, 0.3, 0.7, 1], [0.03, 0.07, 0.07, 0.04])

    const heroTitleY = useTransform(smooth, [0, 0.28], [0, -80])
    const heroTitleScale = useTransform(smooth, [0, 0.28], [1, 0.88])
    const heroTitleOpacity = useTransform(smooth, [0, 0.22], [1, 0])

    const miniHudOpacity = useTransform(smooth, [0.22, 0.38], [0, 1])
    const miniHudY = useTransform(smooth, [0.22, 0.38], [-20, 0])

    const videoY = useTransform(smooth, [0, 0.38], [130, 0])
    const videoScale = useTransform(smooth, [0, 0.38], [0.88, 1])
    const videoGlowOpacity = useTransform(smooth, [0.2, 0.5], [0.2, 0.65])

    const creditsOpacity = useTransform(smooth, [0.35, 0.55], [0, 1])
    const creditsY = useTransform(smooth, [0.35, 0.55], [50, 0])

    const isYouTube = Boolean(extractYouTubeId(UNION_VIDEO_URL))

    return (
        <section
            ref={containerRef}
            id="sec-f"
            className={cn("relative h-[250vh] w-full bg-[#050505] text-[#d9d4c7] z-20", className)}
            {...props}
        >
            <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#050505] px-4 sm:px-8 py-5 sm:py-7 select-none">
                <motion.div
                    style={{ scale: bgGlowScale, opacity: bgGlowOpacity }}
                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(217,212,199,0.22)_0%,_rgba(217,212,199,0.05)_40%,_transparent_75%)] blur-3xl"
                />

                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#d9d4c7_1px,transparent_1px),linear-gradient(to_bottom,#d9d4c7_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                    <motion.span
                        style={{ y: watermarkY, opacity: watermarkOpacity }}
                        className="font-heading font-black text-[30vw] tracking-tighter text-[#d9d4c7] leading-none whitespace-nowrap select-none"
                    >
                        SATHVA
                    </motion.span>
                </div>

                <div className="absolute top-5 left-5 right-5 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-center pointer-events-none z-30 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#d9d4c7]/40 font-semibold">
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
                        <span>REEL 01 // SATHVA UNION</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                        <span>GEC WAYANAD</span>
                        <span>·</span>
                        <span>2025–26</span>
                    </div>
                </div>

                <div className="relative w-full flex flex-col items-center pt-8 sm:pt-4 z-20">
                    <motion.div
                        style={{ y: heroTitleY, scale: heroTitleScale, opacity: heroTitleOpacity }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="flex items-center gap-3 mb-2 sm:mb-3">
                            <span className="h-px w-8 sm:w-12 bg-[#d9d4c7]/30" />
                            <span className="text-[#d9d4c7]/70 font-mono text-[9px] sm:text-[11px] tracking-[0.45em] uppercase font-bold">
                                Official Union Film
                            </span>
                            <span className="h-px w-8 sm:w-12 bg-[#d9d4c7]/30" />
                        </div>
                        <h2 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-[#d9d4c7] tracking-tight leading-[0.85] drop-shadow-2xl">
                            Sathva Union
                        </h2>
                    </motion.div>

                    <motion.div
                        style={{ opacity: miniHudOpacity, y: miniHudY }}
                        className="absolute top-2 flex items-center gap-3 px-4 sm:px-6 py-1.5 rounded-full border border-[#d9d4c7]/20 bg-[#050505]/80 backdrop-blur-md shadow-lg"
                    >
                        <Film className="w-3.5 h-3.5 text-[#d9d4c7]/70" />
                        <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-[#d9d4c7]">
                            Sathva Union Film 2025–26
                        </span>
                        <span className="text-xs text-[#d9d4c7]/40">|</span>
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#d9d4c7]/60">
                            Monochrome GECW
                        </span>
                    </motion.div>
                </div>

                <motion.div
                    style={{ scale: videoScale, y: videoY }}
                    className="relative w-full max-w-4xl lg:max-w-5xl z-20 my-auto"
                >
                    <motion.div
                        style={{ opacity: videoGlowOpacity }}
                        className="absolute -inset-2 bg-gradient-to-r from-[#d9d4c7]/15 via-[#d9d4c7]/25 to-[#d9d4c7]/15 rounded-2xl blur-xl pointer-events-none"
                    />

                    <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/95 border border-[#d9d4c7]/20 shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#d9d4c7]/40 pointer-events-none z-30" />
                        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#d9d4c7]/40 pointer-events-none z-30" />
                        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#d9d4c7]/40 pointer-events-none z-30" />
                        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#d9d4c7]/40 pointer-events-none z-30" />

                        {isYouTube ? (
                            <YouTubePlayer
                                url={UNION_VIDEO_URL}
                                showFloatingMute={false}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <video
                                src={resolveAsset(UNION_VIDEO_URL)}
                                className="w-full h-full object-cover"
                                controls
                                playsInline
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        )}
                    </div>
                </motion.div>

                <motion.div
                    style={{ opacity: creditsOpacity, y: creditsY }}
                    className="relative w-full max-w-6xl flex flex-col items-center gap-3 sm:gap-4 z-20"
                >
                    <div className="w-full relative overflow-hidden py-2.5 sm:py-3 border-y border-[#d9d4c7]/15 bg-[#d9d4c7]/[0.03] backdrop-blur-md">
                        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 36, repeat: Infinity }}
                            className="flex items-center gap-10 sm:gap-16 w-max px-6"
                        >
                            {[...UNION_CREW, ...UNION_CREW].map((member, idx) => (
                                <div key={idx} className="flex items-center gap-3 shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#d9d4c7]/40" />
                                    <div className="flex flex-col">
                                        <span className="text-[#d9d4c7] font-heading text-base sm:text-xl tracking-wider uppercase leading-tight">
                                            {member.name}
                                        </span>
                                        <span className="text-[#d9d4c7]/50 font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-bold">
                                            {member.role}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href={UNION_VIDEO_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-[#d9d4c7]/30 hover:border-[#d9d4c7] bg-[#d9d4c7]/10 hover:bg-[#d9d4c7] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(217,212,199,0.35)]"
                        >
                            <svg className="w-4 h-4 text-red-500 group-hover:text-[#050505] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-[#d9d4c7] group-hover:text-[#050505] transition-colors duration-300">
                                Watch on YouTube
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#d9d4c7] group-hover:text-[#050505] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export const SecG = SecF
export default SecF
