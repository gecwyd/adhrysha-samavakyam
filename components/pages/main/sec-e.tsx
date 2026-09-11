"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import { useAudio } from "@/context/audio.context"
import { resolveAsset } from "@/lib/asset-registry"
import { preload } from "@/lib/preload"
import { YouTubePlayer, extractYouTubeId } from "@/components/ui/youtube-player"
import { cn } from "@/lib/utils"

const UNION_VIDEO_URL = "https://www.youtube.com/watch?v=yZ-_k0RcZq0"

const UNION_CREW = [
    { name: "Monochrome GECW", role: "Film Club of GECW" },
    { name: "Abhinand U", role: "Chairperson" },
    { name: "Adithya Krishna MK", role: "Vice Chairperson" },
    { name: "Jaseem Akber A", role: "General Secretary" },
    { name: "Adhil Muhammed K", role: "Magazine Editor" },
    { name: "Muhammed Sinan M", role: "Arts Secretary" },
    { name: "Mohammed Shibin", role: "Sports Secretary" },
    { name: "Mohammed Shamlal KP", role: "University Union Councillor" },
    { name: "Nishad NM", role: "University Union Councillor" },
    { name: "Gargi Nambiar", role: "Student Representative" },
    { name: "Shafna", role: "Student Representative" },
    { name: "Snehananda", role: "SC/ST Representative" },
    { name: "Dr. Brijmohan K", role: "Staff Advisor" }
]

export interface SecEProps extends React.HTMLAttributes<HTMLElement> { }

export function SecE({ className, ...props }: SecEProps) {
    const { pauseBg, playbg } = useAudio()
    const containerRef = useRef<HTMLElement>(null)
    const hasEnteredRef = useRef(false)

    useEffect(() => {
        preload(UNION_VIDEO_URL, "youtube")
    }, [])

    const isInView = useInView(containerRef, { amount: 0.15 })

    useEffect(() => {
        if (isInView) {
            hasEnteredRef.current = true
            pauseBg?.(300)
        } else if (hasEnteredRef.current) {
            playbg?.(resolveAsset("intro.mp3"), { loop: true })
        }
    }, [isInView, pauseBg, playbg])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

    const scale = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0.88, 1, 1, 0.92])
    const opacity = useTransform(smoothProgress, [0, 0.1, 0.82, 1], [0, 1, 1, 0.2])

    const isYouTube = Boolean(extractYouTubeId(UNION_VIDEO_URL))

    return (
        <section
            ref={containerRef}
            id="sec-e"
            className={cn("relative h-[300vh] w-full bg-[#d9d4c7] text-black z-20", className)}
            {...props}
        >
            <motion.div
                viewport={{ amount: 0.1 }}
                style={{ opacity }}
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-[#d9d4c7]"
            >
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        src={resolveAsset("college-draw.webp")}
                        alt="College sketch background"
                        className="w-full h-full object-cover opacity-10 grayscale contrast-125 mix-blend-multiply"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#d9d4c7]/80 via-transparent to-[#d9d4c7]" />
                </div>

                <div className="relative z-10 w-full max-w-6xl px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <span className="px-3.5 py-1 sm:px-5 sm:py-1 border border-black/15 bg-black/5 text-black/70 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-bold font-mono">
                                Sathva College Union · 2025–26
                            </span>
                            <span className="px-3.5 py-1 sm:px-5 sm:py-1 border border-black/20 bg-black text-[#d9d4c7] text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-bold font-mono">
                                Created by Monochrome · Film Club of GECW
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading text-black tracking-tight uppercase leading-[0.85]">
                                Union Intro
                            </h2>
                            <div className="w-20 sm:w-28 h-px bg-black/25 mt-1" />
                        </div>
                    </div>

                    <motion.div
                        style={{ scale }}
                        className="w-full max-w-4xl aspect-video bg-neutral-950 rounded-xl overflow-hidden shadow-2xl relative border border-black/20"
                    >
                        <div className="w-full h-full rounded-xl overflow-hidden bg-black relative">
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
                                    autoPlay
                                    muted
                                    playsInline
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            )}
                        </div>
                    </motion.div>

                    <div className="w-screen max-w-screen mt-8 sm:mt-12 relative select-none flex flex-col items-center">
                        <span className="text-black/40 text-[8px] sm:text-[10px] tracking-[0.45em] uppercase mb-3 sm:mb-5 font-bold font-mono">
                            Monochrome GECW & Sathva Visionaries
                        </span>

                        <div className="w-full relative overflow-hidden flex py-3.5 sm:py-5 border-y border-black/10 bg-black/[0.03] backdrop-blur-sm">
                            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 md:w-56 bg-gradient-to-r from-[#d9d4c7] to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 md:w-56 bg-gradient-to-l from-[#d9d4c7] to-transparent z-10 pointer-events-none" />

                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ ease: "linear", duration: 32, repeat: Infinity }}
                                className="flex gap-10 sm:gap-16 md:gap-24 w-max px-6 sm:px-8"
                            >
                                {[...UNION_CREW, ...UNION_CREW].map((member, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-0.5 sm:gap-1 shrink-0">
                                        <span className="text-black flex items-center gap-2 sm:gap-3 text-base sm:text-xl md:text-2xl font-heading tracking-wider uppercase">
                                            <div className="w-1.5 h-1.5 bg-black/30 rotate-45" />
                                            {member.name}
                                        </span>
                                        <span className="text-black/50 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-mono font-bold">
                                            {member.role}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3">
                        <a
                            href={UNION_VIDEO_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-4 sm:gap-6 px-7 sm:px-9 py-3 sm:py-3.5 border-2 border-black hover:bg-black hover:text-[#d9d4c7] transition-all duration-300 text-black shadow-lg"
                        >
                            <span className="text-[9px] sm:text-xs tracking-[0.35em] font-bold uppercase font-mono">
                                Watch on YouTube
                            </span>
                            <div className="w-6 sm:w-8 h-px bg-current group-hover:w-10 sm:group-hover:w-12 transition-all duration-300" />
                            <svg
                                className="w-3.5 h-3.5 text-current group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export const SecG = SecE
export default SecE
