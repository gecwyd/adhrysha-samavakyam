"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { DriveImage } from "@/components/ui/drive-image"
import { cn } from "@/lib/utils"
import { preload } from "@/lib/preload"

const UNION_LOGO_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/union-logo.webp"
const LETTERS = ["S", "A", "T", "H", "V", "A"]
const MARQUEE_TEXT = "SATHVA · COLLEGE UNION · GECWYD · 2025–26 · "

function GridLines() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
            {[...Array(7)].map((_, i) => (
                <div
                    key={`h-${i}`}
                    style={{
                        top: `${14 + i * 12}%`,
                        left: 0,
                        right: 0,
                        position: "absolute",
                        height: "1px",
                        background: "rgba(0,0,0,0.35)",
                    }}
                />
            ))}
            {[...Array(5)].map((_, i) => (
                <div
                    key={`v-${i}`}
                    style={{
                        left: `${10 + i * 20}%`,
                        top: 0,
                        bottom: 0,
                        position: "absolute",
                        width: "1px",
                        background: "rgba(0,0,0,0.25)",
                    }}
                />
            ))}
        </div>
    )
}

export interface SecBProps extends React.HTMLAttributes<HTMLElement> { }

export function SecB({ className, ...props }: SecBProps) {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.6])
    const containerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const lettersY = useTransform(scrollYProgress, [0, 1], [0, -150])
    const bottomY = useTransform(scrollYProgress, [0, 1], [0, 150])

    return (
        <section
            ref={containerRef}
            id="sec-b"
            className={cn("relative h-[150vh] w-full bg-[#d9d4c7] text-black z-10", className)}
            {...props}
        >
            <div className="sticky top-0 w-full h-[100svh] flex flex-col justify-between pt-12 sm:pt-16 pb-0 overflow-hidden">
                <GridLines />

                <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-black/15 z-10" />
                <div className="absolute right-6 sm:right-10 top-0 bottom-0 w-px bg-black/15 z-10" />

                <motion.div style={{ opacity: containerOpacity }} className="relative z-20 flex-1 flex flex-col items-center justify-center px-14 sm:px-20 py-8 gap-0">
                    <motion.div style={{ y: lettersY }} className="w-full flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-end justify-center gap-[0.04em] mb-2 overflow-visible"
                        >
                            {LETTERS.map((letter, i) => (
                                <span
                                    key={i}
                                    className="font-heading font-black text-[19vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8.5rem] leading-none text-black select-none inline-block"
                                >
                                    {letter}
                                </span>
                            ))}
                        </motion.div>
                        <div className="h-[2px] w-full max-w-2xl bg-black/80 my-2" />
                    </motion.div>

                    <motion.div style={{ scale: logoScale }} className="shrink-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 drop-shadow-xl my-2 shrink-0"
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
                    </motion.div>

                    <motion.div style={{ y: bottomY }} className="w-full flex flex-col items-center">
                        <div className="h-[2px] w-full max-w-2xl bg-black/80 mb-3" />
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center"
                        >
                            <h2 className="font-heading uppercase tracking-[0.5em] text-sm sm:text-base md:text-lg lg:text-xl text-black/80 pl-[0.5em]">
                                College Union
                            </h2>
                            <p className="font-sans text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase text-black/45 mt-1 sm:mt-2">
                                Govt. Engineering College, Wayanad · 2025 – 26
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <div className="w-full border-t border-b border-black/15 py-3 overflow-hidden flex bg-black/[0.02]">
                    <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap">
                        {[...Array(4)].map((_, i) => (
                            <span
                                key={i}
                                className="font-heading text-xs sm:text-sm tracking-[0.3em] uppercase text-black/35 mr-0"
                            >
                                {MARQUEE_TEXT}
                            </span>
                        ))}
                    </div>
                    <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap" aria-hidden>
                        {[...Array(4)].map((_, i) => (
                            <span
                                key={i}
                                className="font-heading text-xs sm:text-sm tracking-[0.3em] uppercase text-black/35"
                            >
                                {MARQUEE_TEXT}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecB
