"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion"
import { useRef } from "react"
import { DriveImage } from "@/components/ui/drive-image"
import { cn } from "@/lib/utils"
import { preload } from "@/lib/preload"

const UNION_LOGO_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/union-logo.webp"
const LETTERS = ["S", "A", "T", "H", "V", "A"]
const MARQUEE_TEXT = "SATHVA · COLLEGE UNION · GECWYD · 2025–26 · "



function GridLines({ progress }: { progress: MotionValue<number> }) {
    const opacity = useTransform(progress, [0, 0.15], [0, 0.12])
    const scaleX = useTransform(progress, [0.02, 0.2], [0, 1])
    return (
        <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(7)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        scaleX,
                        originX: i % 2 === 0 ? 0 : 1,
                        top: `${14 + i * 12}%`,
                        left: 0,
                        right: 0,
                        position: "absolute",
                        height: "1px",
                        background: "rgba(0,0,0,0.25)",
                    }}
                />
            ))}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        scaleY: scaleX,
                        originY: i % 2 === 0 ? 0 : 1,
                        left: `${10 + i * 20}%`,
                        top: 0,
                        bottom: 0,
                        position: "absolute",
                        width: "1px",
                        background: "rgba(0,0,0,0.18)",
                    }}
                />
            ))}
        </motion.div>
    )
}

function LetterReveal({
    letter,
    index,
    progress,
}: {
    letter: string
    index: number
    progress: MotionValue<number>
}) {
    const start = 0.12 + index * 0.045
    const end = start + 0.14

    const y = useTransform(progress, [start, end], [120, 0])
    const opacity = useTransform(progress, [start, end], [0, 1])
    const rotateX = useTransform(progress, [start, end], [90, 0])

    return (
        <div style={{ perspective: "800px", display: "inline-block", overflow: "hidden" }}>
            <motion.span
                style={{ y, opacity, rotateX, transformOrigin: "bottom center", display: "inline-block" }}
                className="font-heading font-black text-[19vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[9rem] leading-none text-black select-none"
            >
                {letter}
            </motion.span>
        </div>
    )
}

export interface SecBProps extends React.HTMLAttributes<HTMLElement> { }

export function SecB({ className, ...props }: SecBProps) {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 22 })

    const logoOpacity = useTransform(smoothProgress, [0.05, 0.25], [0, 1])
    const logoScale = useTransform(smoothProgress, [0.05, 0.3], [0.72, 1])
    const logoRotate = useTransform(smoothProgress, [0.05, 0.35], [-12, 0])

    const subtitleY = useTransform(smoothProgress, [0.38, 0.58], [60, 0])
    const subtitleOpacity = useTransform(smoothProgress, [0.38, 0.55], [0, 1])

    const dividerScaleX = useTransform(smoothProgress, [0.3, 0.5], [0, 1])
    const dividerOpacity = useTransform(smoothProgress, [0.3, 0.45], [0, 1])

    const sideLineH = useTransform(smoothProgress, [0.08, 0.3], ["0%", "100%"])
    const sideLineOpacity = useTransform(smoothProgress, [0.05, 0.2], [0, 1])

    const yearOpacity = useTransform(smoothProgress, [0.5, 0.68], [0, 1])
    const yearX = useTransform(smoothProgress, [0.5, 0.65], [40, 0])

    const marqueeOpacity = useTransform(smoothProgress, [0.6, 0.78], [0, 1])
    const marqueeY = useTransform(smoothProgress, [0.6, 0.78], [28, 0])

    return (
        <section
            ref={containerRef}
            id="sec-b"
            className={cn("relative h-[400vh] w-full bg-transparent text-black z-10", className)}
            {...props}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <GridLines progress={smoothProgress} />

                <motion.div
                    style={{ opacity: sideLineOpacity }}
                    className="absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-black/20 z-10"
                >
                    <motion.div
                        style={{ height: sideLineH }}
                        className="w-full bg-black/60 origin-top"
                    />
                </motion.div>
                <motion.div
                    style={{ opacity: sideLineOpacity }}
                    className="absolute right-6 sm:right-10 top-0 bottom-0 w-px bg-black/20 z-10"
                >
                    <motion.div
                        style={{ height: sideLineH }}
                        className="w-full bg-black/60 origin-top"
                    />
                </motion.div>

                <div className="relative z-20 h-full flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center px-14 sm:px-20 pt-10 pb-4 gap-0">
                        <div className="flex items-end justify-center gap-[0.04em] mb-2 overflow-visible">
                            {LETTERS.map((letter, i) => (
                                <LetterReveal
                                    key={i}
                                    letter={letter}
                                    index={i}
                                    progress={smoothProgress}
                                />
                            ))}
                        </div>

                        <motion.div
                            style={{ scaleX: dividerScaleX, opacity: dividerOpacity }}
                            className="h-[3px] w-full max-w-2xl bg-black origin-left"
                        />

                        <motion.div
                            style={{ opacity: logoOpacity, scale: logoScale, rotate: logoRotate }}
                            className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 drop-shadow-2xl my-2"
                        >
                            <DriveImage
                                src={preload(UNION_LOGO_URL)}
                                alt="Sathva College Union Logo"
                                fill
                                sz="w1200"
                                priority
                                className="object-contain"
                            />
                        </motion.div>

                        <motion.div
                            style={{ scaleX: dividerScaleX, opacity: dividerOpacity }}
                            className="h-[3px] w-full max-w-2xl bg-black origin-right mb-3"
                        />

                        <div className="overflow-hidden">
                            <motion.div style={{ y: subtitleY, opacity: subtitleOpacity }}>
                                <h2 className="font-heading uppercase tracking-[0.5em] text-sm sm:text-base md:text-lg lg:text-xl text-black/70 pl-[0.5em] text-center">
                                    College Union
                                </h2>
                            </motion.div>
                        </div>

                        <div className="overflow-hidden mt-1 sm:mt-2">
                            <motion.div style={{ x: yearX, opacity: yearOpacity }}>
                                <p className="font-sans text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase text-black/40 text-center">
                                    Govt. Engineering College, Wayanad · 2025 – 26
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        style={{ opacity: marqueeOpacity, y: marqueeY }}
                        className="w-full border-t border-b border-black/15 py-2.5 overflow-hidden flex"
                    >
                        <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap">
                            {[...Array(4)].map((_, i) => (
                                <span
                                    key={i}
                                    className="font-heading text-sm sm:text-base tracking-[0.3em] uppercase text-black/30 mr-0"
                                >
                                    {MARQUEE_TEXT}
                                </span>
                            ))}
                        </div>
                        <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap" aria-hidden>
                            {[...Array(4)].map((_, i) => (
                                <span
                                    key={i}
                                    className="font-heading text-sm sm:text-base tracking-[0.3em] uppercase text-black/30"
                                >
                                    {MARQUEE_TEXT}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default SecB
