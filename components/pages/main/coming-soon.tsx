"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { DriveImage } from "@/components/ui/drive-image"
import { cn } from "@/lib/utils"
import { preload } from "@/lib/preload"

const UNION_LOGO_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/union-logo.webp"

export interface ComingSoonProps extends React.HTMLAttributes<HTMLElement> { }

export function ComingSoon({ className, ...props }: ComingSoonProps) {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 })

    const badgeOpacity = useTransform(smooth, [0.04, 0.22], [0, 1])
    const badgeY = useTransform(smooth, [0.04, 0.22], [16, 0])

    const magWordOpacity = useTransform(smooth, [0.1, 0.32], [0, 1])
    const magWordY = useTransform(smooth, [0.1, 0.32], [60, 0])

    const numOpacity = useTransform(smooth, [0.22, 0.48], [0, 1])
    const numY = useTransform(smooth, [0.22, 0.48], [120, 0])
    const numScale = useTransform(smooth, [0.22, 0.48], [0.82, 1])

    const divOpacity = useTransform(smooth, [0.44, 0.58], [0, 1])
    const divScale = useTransform(smooth, [0.44, 0.58], [0, 1])

    const cs1Opacity = useTransform(smooth, [0.5, 0.68], [0, 1])
    const cs1X = useTransform(smooth, [0.5, 0.68], [-60, 0])

    const cs2Opacity = useTransform(smooth, [0.58, 0.76], [0, 1])
    const cs2X = useTransform(smooth, [0.58, 0.76], [60, 0])

    const footerOpacity = useTransform(smooth, [0.72, 0.88], [0, 1])
    const footerY = useTransform(smooth, [0.72, 0.88], [20, 0])

    const sideOpacity = useTransform(smooth, [0.03, 0.2], [0, 1])
    const sideH = useTransform(smooth, [0.05, 0.4], ["0%", "100%"])

    return (
        <section
            ref={containerRef}
            id="coming-soon"
            aria-label="Sathva Union presents Magazine 26 — Coming Soon"
            className={cn("relative h-[550vh] w-full bg-[#d9d4c7] text-black z-10", className)}
            {...props}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
                <motion.div style={{ opacity: sideOpacity }} className="absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-black/12 z-10 pointer-events-none">
                    <motion.div style={{ height: sideH }} className="w-full bg-black/40 origin-top" />
                </motion.div>
                <motion.div style={{ opacity: sideOpacity }} className="absolute right-6 sm:right-10 top-0 bottom-0 w-px bg-black/12 z-10 pointer-events-none">
                    <motion.div style={{ height: sideH }} className="w-full bg-black/40 origin-top" />
                </motion.div>

                <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-16 relative z-20 gap-0">
                    <motion.div
                        style={{ opacity: badgeOpacity, y: badgeY }}
                        className="flex flex-col items-center gap-3 mb-8 sm:mb-10"
                    >
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0">
                            <DriveImage
                                src={preload(UNION_LOGO_URL)}
                                alt="Sathva College Union Logo"
                                fill
                                sz="w400"
                                className="object-contain"
                            />
                        </div>
                        <span className="font-heading text-base sm:text-lg md:text-xl tracking-[0.35em] uppercase text-black/80 pl-[0.35em] text-center">
                            Sathva Union Presents
                        </span>
                    </motion.div>

                    <div className="overflow-hidden w-full text-center">
                        <motion.p
                            style={{ opacity: magWordOpacity, y: magWordY }}
                            className="font-heading text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw] xl:text-[6.5rem] leading-none tracking-[0.08em] text-black/75 uppercase select-none"
                        >
                            Magazine
                        </motion.p>
                    </div>

                    <div style={{ perspective: "1200px" }} className="overflow-visible w-full text-center -mt-2 sm:-mt-4">
                        <motion.h1
                            style={{ opacity: numOpacity, y: numY, scale: numScale }}
                            className="font-heading font-black text-[42vw] sm:text-[38vw] md:text-[32vw] lg:text-[26vw] xl:text-[22rem] leading-[0.85] text-black select-none"
                        >
                            26
                        </motion.h1>
                    </div>

                    <motion.div
                        style={{ scaleX: divScale, opacity: divOpacity }}
                        className="h-[1.5px] w-full max-w-md bg-black/25 origin-center mt-4 sm:mt-6"
                    />

                    <div className="mt-5 sm:mt-7 flex flex-col items-center gap-0 w-full text-center overflow-hidden">
                        <div className="overflow-hidden">
                            <motion.p
                                style={{ opacity: cs1Opacity, x: cs1X }}
                                className="font-heading text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[5.2rem] leading-[1] tracking-[0.12em] text-black/75 uppercase select-none"
                            >
                                Coming
                            </motion.p>
                        </div>
                        <div className="overflow-hidden">
                            <motion.p
                                style={{ opacity: cs2Opacity, x: cs2X }}
                                className="font-heading text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[5.2rem] leading-[1] tracking-[0.12em] text-black/40 uppercase select-none"
                            >
                                Soon
                            </motion.p>
                        </div>
                    </div>
                </div>

                <motion.div
                    style={{ opacity: footerOpacity, y: footerY }}
                    className="w-full border-t border-black/10 py-3 px-8 sm:px-16 flex items-center justify-between z-20 shrink-0"
                >
                    <span className="font-sans text-[0.5rem] sm:text-[0.55rem] tracking-[0.4em] uppercase text-black/30">
                        Govt. Engineering College, Wayanad
                    </span>
                    <span className="font-sans text-[0.5rem] sm:text-[0.55rem] tracking-[0.4em] uppercase text-black/30">
                        2025 – 26
                    </span>
                </motion.div>
            </div>
        </section>
    )
}

export default ComingSoon
