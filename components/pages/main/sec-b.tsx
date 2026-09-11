"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { DriveImage } from "@/components/ui/drive-image"
import { cn } from "@/lib/utils"

const UNION_LOGO_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/union-logo.webp"

export interface SecBProps extends React.HTMLAttributes<HTMLElement> {}

export function SecB({ className, ...props }: SecBProps) {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

    const logoY = useTransform(smoothProgress, [0, 0.3, 0.65], ["10vh", "10vh", "0vh"])
    const logoScale = useTransform(smoothProgress, [0, 0.3, 0.65], [1.18, 1.18, 1])
    const logoOpacity = useTransform(smoothProgress, [0, 0.08], [0.4, 1])

    const textY = useTransform(smoothProgress, [0.3, 0.65], [100, 0])
    const textOpacity = useTransform(smoothProgress, [0.3, 0.55], [0, 1])
    const textScale = useTransform(smoothProgress, [0.3, 0.65], [0.92, 1])
    const letterSpacing = useTransform(smoothProgress, [0.3, 0.65], ["0.1em", "-0.03em"])

    const unionY = useTransform(smoothProgress, [0.38, 0.68], [40, 0])
    const unionOpacity = useTransform(smoothProgress, [0.38, 0.62], [0, 1])

    const indicatorOpacity = useTransform(smoothProgress, [0, 0.2, 0.7, 0.9], [0.8, 1, 1, 0])
    const indicatorLineY = useTransform(smoothProgress, [0, 0.5], ["-100%", "100%"])

    return (
        <section
            ref={containerRef}
            id="sec-b"
            className={cn(
                "relative h-[300vh] w-full bg-transparent text-black z-10",
                className
            )}
            {...props}
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
                <div className="flex flex-col items-center justify-center relative z-20 select-none">
                    <motion.div
                        style={{
                            y: logoY,
                            scale: logoScale,
                            opacity: logoOpacity
                        }}
                        className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-xl z-20"
                    >
                        <DriveImage
                            src={UNION_LOGO_URL}
                            alt="Sathva College Union Logo"
                            fill
                            sz="w1200"
                            priority
                            className="object-contain"
                        />
                    </motion.div>

                    <motion.div
                        style={{
                            y: textY,
                            opacity: textOpacity,
                            scale: textScale
                        }}
                        className="flex flex-col items-center text-center mt-6 sm:mt-10 md:mt-14 z-10"
                    >
                        <motion.h1
                            style={{ letterSpacing }}
                            className="text-[14vw] sm:text-[12vw] md:text-[8rem] lg:text-[10rem] xl:text-[11.5rem] font-heading font-black leading-[0.8] uppercase text-black tracking-tight"
                        >
                            SATHVA
                        </motion.h1>

                        <motion.div
                            style={{
                                y: unionY,
                                opacity: unionOpacity
                            }}
                            className="mt-3 sm:mt-4 md:mt-6 overflow-hidden flex items-center justify-center"
                        >
                            <h2 className="font-heading font-bold uppercase text-sm sm:text-lg md:text-3xl lg:text-4xl tracking-[0.4em] md:tracking-[0.6em] text-black/85 pl-[0.4em] md:pl-[0.6em]">
                                COLLEGE UNION
                            </h2>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    style={{ opacity: indicatorOpacity }}
                    className="absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-3 z-30 pointer-events-none"
                >
                    <span className="font-mono text-[9px] tracking-[0.35em] uppercase opacity-40 text-black">Scroll</span>
                    <div className="h-[40px] w-px bg-black/20 overflow-hidden relative">
                        <motion.div
                            style={{
                                height: "100%",
                                y: indicatorLineY
                            }}
                            className="w-full bg-black absolute inset-0"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default SecB
