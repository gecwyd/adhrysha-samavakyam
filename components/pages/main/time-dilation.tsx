"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

export function TimeDilation() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.2 });

  const bgScale = useTransform(smooth, [0, 1], [1, 1.15]);
  const titleScale = useTransform(smooth, [0, 1], [1, 1.05]);
  const beamWidth = useTransform(smooth, [0.1, 0.6], ["0%", "85%"]);
  const beamOpacity = useTransform(smooth, [0.1, 0.5], [0, 0.75]);
  const formulaOpacity = useTransform(smooth, [0.15, 0.45], [0, 1]);
  const formulaY = useTransform(smooth, [0.15, 0.45], [16, 0]);

  return (
    <section
      ref={containerRef}
      id="sec-h"
      aria-labelledby="time-dilation-title"
      className="relative h-[200vh] w-full bg-[#191713] text-[#d9d4c7]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          aria-hidden="true"
          style={{ scale: bgScale }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 mix-blend-screen will-change-transform"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url("${resolveAsset("time-dilation-bg.png")}")` }}
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,23,19,0.28)_0%,rgba(25,23,19,0.58)_68%,rgba(25,23,19,0.85)_100%)]"
        />

        <motion.div
          style={{ width: beamWidth, opacity: beamOpacity }}
          aria-hidden="true"
          className="absolute h-px bg-gradient-to-r from-transparent via-[#a84e2a] to-transparent pointer-events-none shadow-[0_0_15px_rgba(168,78,42,0.8)] z-10"
        />

        <motion.div
          style={{ scale: titleScale }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 select-none will-change-transform"
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#a84e2a] mb-6">
            Section III · Physics &amp; Philosophy
          </span>
          <h2
            id="time-dilation-title"
            className="font-heading text-[20vw] sm:text-[15vw] md:text-[12vw] leading-[0.85] tracking-tight"
          >
            TIME
            <br />
            <span className="text-[#a84e2a]">DILATION.</span>
          </h2>

          <motion.div
            style={{ opacity: formulaOpacity, y: formulaY }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-[#d9d4c7]/40 uppercase">
              Δτ = Δt √(1 − v²/c²)
            </p>
            <p className="font-serif text-xs sm:text-sm text-[#d9d4c7]/45 italic max-w-sm">
              &ldquo;Time is an illusion, albeit a very persistent one.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
