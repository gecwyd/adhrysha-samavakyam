"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { DriveImage } from "@/components/ui/drive-image"
import { cn } from "@/lib/utils"
import { preload } from "@/lib/preload"

const UNION_LOGO_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/union-logo.webp"

export interface ComingSoonProps extends React.HTMLAttributes<HTMLElement> {
    timeLeft?: { h: number; m: number; s: number } | null;
}

export function ComingSoon({ className, ...props }: ComingSoonProps) {
    return (
        <section
            id="coming-soon"
            aria-label="Sathva Union presents Magazine 26"
            className={cn("relative h-screen w-full bg-[#d9d4c7] text-black z-10 overflow-hidden flex flex-col", className)}
            {...props}
        >
            <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-black/12 z-10 pointer-events-none" />
            <div className="absolute right-6 sm:right-10 top-0 bottom-0 w-px bg-black/12 z-10 pointer-events-none" />

            <div className="absolute left-8 sm:left-12 top-6 text-black/30 font-mono text-xs select-none pointer-events-none">+</div>
            <div className="absolute right-8 sm:right-12 top-6 text-black/30 font-mono text-xs select-none pointer-events-none">+</div>
            <div className="absolute left-8 sm:left-12 bottom-12 text-black/30 font-mono text-xs select-none pointer-events-none">+</div>
            <div className="absolute right-8 sm:right-12 bottom-12 text-black/30 font-mono text-xs select-none pointer-events-none">+</div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-16 relative z-20 gap-0">
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col items-center gap-3 mb-6 sm:mb-8 z-30"
                >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0">
                        <DriveImage
                            src={preload(UNION_LOGO_URL)}
                            alt="Sathva College Union Logo"
                            fill
                            sz="w800"
                            className="object-contain drop-shadow-xl"
                        />
                    </div>
                    <span className="font-heading text-base sm:text-lg md:text-xl tracking-[0.35em] uppercase text-black/80 pl-[0.35em] text-center">
                        Sathva Union Presents
                    </span>
                </motion.div>

                <div className="flex flex-col items-center w-full">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="overflow-hidden w-full text-center"
                    >
                        <p className="font-heading text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] xl:text-[3.8rem] leading-none tracking-[0.2em] text-black/75 uppercase select-none pl-[0.2em]">
                            First
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        style={{ perspective: "1200px" }} 
                        className="overflow-visible w-full text-center -mt-1 sm:-mt-2"
                    >
                        <h1 className="font-heading font-black text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8.5rem] leading-[0.9] text-black select-none whitespace-nowrap">
                            Web Magazine
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        className="mt-6 sm:mt-8 relative flex items-center justify-center select-none"
                    >
                        <div className="relative p-1.5 sm:p-2 rounded-full border border-black/15 bg-black/[0.02]">
                            {props.timeLeft ? (
                                <div className="flex items-center gap-4 sm:gap-6 font-mono text-2xl sm:text-4xl px-8 py-6">
                                    <div className="flex flex-col items-center">
                                        <span className="font-heading font-black">{String(props.timeLeft.h).padStart(2, '0')}</span>
                                        <span className="text-[0.45rem] tracking-[0.2em] uppercase mt-1 opacity-60">Hours</span>
                                    </div>
                                    <span className="opacity-30 mt-1 mb-3">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="font-heading font-black">{String(props.timeLeft.m).padStart(2, '0')}</span>
                                        <span className="text-[0.45rem] tracking-[0.2em] uppercase mt-1 opacity-60">Mins</span>
                                    </div>
                                    <span className="opacity-30 mt-1 mb-3">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="font-heading font-black">{String(props.timeLeft.s).padStart(2, '0')}</span>
                                        <span className="text-[0.45rem] tracking-[0.2em] uppercase mt-1 opacity-60">Secs</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <svg
                                        viewBox="0 0 120 120"
                                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 animate-[spin_20s_linear_infinite] select-none pointer-events-none"
                                    >
                                        <path
                                            id="coming-soon-seal-path"
                                            d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                                            fill="none"
                                        />
                                        <text className="text-[9px] uppercase font-heading tracking-[0.26em] fill-black/85">
                                            <textPath href="#coming-soon-seal-path" startOffset="0%">
                                                ✦ COMING SOON ✦ FIRST WEB MAGAZINE ✦
                                            </textPath>
                                        </text>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="font-heading text-lg sm:text-xl font-black text-black leading-none">26</span>
                                        <span className="text-[0.42rem] sm:text-[0.48rem] tracking-[0.25em] uppercase font-sans text-black/60 mt-0.5 font-bold pl-[0.25em]">
                                            ISSUE 01
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-full border-t border-black/10 py-3 px-8 sm:px-16 flex items-center justify-between z-20 shrink-0"
            >
                <span className="font-sans text-[0.5rem] sm:text-[0.55rem] tracking-[0.4em] uppercase text-black/30">
                    Govt. Engineering College, Wayanad
                </span>
                <span className="font-sans text-[0.5rem] sm:text-[0.55rem] tracking-[0.4em] uppercase text-black/30">
                    2025 – 26
                </span>
            </motion.div>
        </section>
    )
}

export default ComingSoon
