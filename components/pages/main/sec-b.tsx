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

    const letterSpacing = useTransform(smoothProgress, [0.15, 0.45], ["0.35em", "-0.04em"])
    const textBlur = useTransform(smoothProgress, [0.15, 0.4], ["blur(20px)", "blur(0px)"])
    const rotateX = useTransform(smoothProgress, [0.15, 0.45], [75, 0])
    const textY = useTransform(smoothProgress, [0.15, 0.45], [240, 0])
    const titleScale = useTransform(smoothProgress, [0.15, 0.45, 0.85, 1], [1.1, 1, 1, 0.95])
    const titleOpacity = useTransform(smoothProgress, [0.12, 0.28], [0, 1])

    const logoY = useTransform(smoothProgress, [0, 0.25, 0.55], ["8vh", "8vh", "0vh"])
    const logoScale = useTransform(smoothProgress, [0, 0.25, 0.55], [1.18, 1.18, 1])
    const logoOpacity = useTransform(smoothProgress, [0, 0.12], [0.35, 1])

    const subtitleY = useTransform(smoothProgress, [0.25, 0.52], [70, 0])
    const subtitleOpacity = useTransform(smoothProgress, [0.25, 0.45], [0, 1])

    const ghostY = useTransform(smoothProgress, [0.15, 0.48], [360, 0])
    const ghostOpacity = useTransform(smoothProgress, [0.15, 0.35, 0.85], [0, 0.16, 0.16])
    const ghostRotateX = useTransform(smoothProgress, [0.15, 0.45], [50, 0])

    const imgScale = useTransform(smoothProgress, [0, 1], [1.35, 1])
    const imgRotate = useTransform(smoothProgress, [0, 1], [-4, 4])
    const imgOpacity = useTransform(smoothProgress, [0, 0.25, 0.85], [0, 0.2, 0.2])

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
                <motion.div
                    style={{
                        opacity: imgOpacity,
                        scale: imgScale,
                        rotate: imgRotate
                    }}
                    className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[#d9d4c7]/30 mix-blend-overlay z-10" />
                    <img
                        src={UNION_LOGO_URL}
                        alt="College Union Logo Background"
                        className="w-[85vw] max-w-[750px] h-auto object-contain opacity-30 grayscale contrast-[1.2] blur-[2px] mix-blend-multiply"
                        onError={(e) => { e.currentTarget.style.display = "none" }}
                    />
                </motion.div>

                <div className="w-full max-w-[100rem] flex flex-col items-center text-center relative z-20 px-4">
                    <motion.div
                        style={{
                            y: logoY,
                            scale: logoScale,
                            opacity: logoOpacity
                        }}
                        className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-68 lg:h-68 drop-shadow-xl z-30 mb-2 sm:mb-4"
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
                        style={{ opacity: titleOpacity, scale: titleScale }}
                        className="w-full flex flex-col items-center"
                    >
                        <div className="relative w-full flex justify-center py-2" style={{ perspective: "1500px" }}>
                            <motion.h1
                                style={{
                                    y: ghostY,
                                    rotateX: ghostRotateX,
                                    opacity: ghostOpacity,
                                    transformOrigin: "bottom center",
                                    filter: "blur(14px)",
                                    letterSpacing
                                }}
                                className="absolute inset-0 flex justify-center text-[20vw] sm:text-[16vw] md:text-[11rem] lg:text-[14rem] xl:text-[16rem] font-heading font-black leading-[0.75] uppercase text-black z-10 pointer-events-none select-none"
                                aria-hidden="true"
                            >
                                SATHVA
                            </motion.h1>

                            <motion.h1
                                style={{
                                    y: textY,
                                    letterSpacing,
                                    filter: textBlur,
                                    rotateX,
                                    transformOrigin: "bottom center"
                                }}
                                className="text-[20vw] sm:text-[16vw] md:text-[11rem] lg:text-[14rem] xl:text-[16rem] font-heading font-black leading-[0.75] uppercase text-black z-20 select-none"
                            >
                                SATHVA
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden mt-3 sm:mt-5 md:mt-6">
                            <motion.div
                                style={{ y: subtitleY, opacity: subtitleOpacity }}
                                className="flex items-center justify-center"
                            >
                                <h2 className="font-heading font-bold uppercase text-sm sm:text-xl md:text-3xl lg:text-4xl tracking-[0.4em] md:tracking-[0.6em] text-black/90 pl-[0.4em] md:pl-[0.6em]">
                                    COLLEGE UNION
                                </h2>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default SecB
