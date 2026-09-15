"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { DriveImage } from "@/components/ui/drive-image"
import { cn } from "@/lib/utils"
import { preload } from "@/lib/preload"
import { useAudio } from "@/context/audio.context"
import { resolveAsset } from "@/lib/asset-registry"

const UNION_LOGO_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/union-logo.webp"
const LETTERS = ["S", "A", "T", "H", "V", "A"]
const MARQUEE_TEXT = "SATHVA · COLLEGE UNION · GECWYD · 2025–26 · "

function LetterReveal({ letter, index }: { letter: string; index: number }) {
    return (
        <div style={{ perspective: "800px", display: "inline-block", overflow: "hidden" }}>
            <motion.span
                initial={{ opacity: 0, y: "3rem", rotateX: 45 }}
                whileInView={{ opacity: 1, y: "0rem", rotateX: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    transformOrigin: "bottom center",
                    display: "inline-block",
                    willChange: "transform",
                }}
                className="font-heading font-black text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[9rem] leading-none text-black select-none"
            >
                {letter}
            </motion.span>
        </div>
    )
}

function GridLines() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.12 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
            {[...Array(7)].map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    style={{
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
                    key={`v-${i}`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    style={{
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

export interface SecBProps extends React.HTMLAttributes<HTMLElement> {}

export function SecB({ className, ...props }: SecBProps) {
    const containerRef = useRef<HTMLElement>(null)
    const { playbg } = useAudio()

    const isInView = useInView(containerRef, { amount: "some", margin: "150px 0px" })

    React.useEffect(() => {
        if (isInView) {
            playbg?.(resolveAsset("intro.mp3"), { loop: true })
        }
    }, [isInView, playbg])

    return (
        <section
            ref={containerRef}
            id="sec-b"
            className={cn("relative min-h-[100dvh] w-full bg-transparent text-black z-10 py-10", className)}
            {...props}
        >
            <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
                <GridLines />

                <motion.div
                    initial={{ height: "0%", opacity: 0 }}
                    whileInView={{ height: "100%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-black/60 origin-top z-10"
                />
                
                <motion.div
                    initial={{ height: "0%", opacity: 0 }}
                    whileInView={{ height: "100%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-6 sm:right-10 top-0 bottom-0 w-px bg-black/60 origin-top z-10"
                />

                <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-8 sm:px-20 pt-16 pb-12 gap-0">
                    <div className="flex items-end justify-center gap-[0.03em] mb-4 sm:mb-6 overflow-hidden">
                        {LETTERS.map((letter, i) => (
                            <LetterReveal
                                key={i}
                                letter={letter}
                                index={i}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-[2px] sm:h-[3px] w-full max-w-2xl bg-black origin-left"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 drop-shadow-2xl my-6 sm:my-8 shrink-0"
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
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="h-[2px] sm:h-[3px] w-full max-w-2xl bg-black mb-4 origin-right"
                    />

                    <div className="overflow-hidden">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                        >
                            <h2 className="font-heading uppercase tracking-[0.4em] sm:tracking-[0.5em] text-xs sm:text-base md:text-lg lg:text-xl text-black/70 pl-[0.4em] text-center">
                                College Union
                            </h2>
                        </motion.div>
                    </div>

                    <div className="overflow-hidden mt-2 sm:mt-4">
                        <motion.div 
                            initial={{ x: 15, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        >
                            <p className="font-sans text-[0.6rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black/40 text-center">
                                Govt. Engineering College, Wayanad · 2025 – 26
                            </p>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                    className="relative z-20 w-full border-t border-b border-black/15 py-2.5 overflow-hidden flex"
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
        </section>
    )
}

export default SecB
