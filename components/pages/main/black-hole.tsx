"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function BlackHole() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const opacity = useTransform(smooth, [0, 0.2, 1], [0.3, 1, 1]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.85, 1, 1.1]);
  const y = useTransform(smooth, [0, 0.5, 1], [40, 0, -30]);
  const letterSpacing = useTransform(smooth, [0, 1], ["-0.04em", "0.01em"]);

  const subtitleY = useTransform(smooth, [0, 0.4, 1], [20, 0, -15]);
  const subtitleOpacity = useTransform(smooth, [0, 0.2, 1], [0, 1, 1]);

  const bgScale = useTransform(smooth, [0, 1], [1, 1.3]);
  const glowOpacity = useTransform(smooth, [0, 0.5, 1], [0.3, 0.85, 0.7]);

  const defOpacity = useTransform(smooth, [0.3, 0.55], [0, 1]);
  const defY = useTransform(smooth, [0.3, 0.55], [40, 0]);
  const defFilter = useTransform(smooth, [0.3, 0.55], ["blur(12px)", "blur(0px)"]);
  const defScale = useTransform(smooth, [0.3, 0.55], [0.9, 1]);

  return (
    <section
      ref={containerRef}
      aria-label="Black Hole"
      className="relative h-[220vh] w-full bg-black text-[#e6e0d3]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden select-none">
        <motion.div
          aria-hidden="true"
          style={{ scale: bgScale, opacity: glowOpacity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_50%,#1a0f08_0%,#000000_75%)] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6">
          <motion.p
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.4em] uppercase text-[#d99065] mb-6 sm:mb-8"
          >
            Beyond the darkness
          </motion.p>
          <motion.h2
            id="black-hole-title"
            style={{
              opacity,
              scale,
              y,
              letterSpacing,
            }}
            className="font-heading font-black text-[22vw] sm:text-[18vw] md:text-[140px] lg:text-[170px] leading-[0.85] text-[#e6e0d3] will-change-transform"
          >
            BLACK
            <br />
            <span className="text-[#d99065]">HOLE.</span>
          </motion.h2>

          <motion.div
            style={{ opacity: defOpacity, y: defY, filter: defFilter, scale: defScale }}
            className="mt-8 sm:mt-12 md:mt-16 max-w-xl md:max-w-2xl mx-auto will-change-transform px-4"
          >
            <p className="text-sm sm:text-base md:text-xl font-mono text-[#a39b8c] leading-relaxed tracking-wide">
              A region of spacetime where gravity is so intense that <span className="text-[#d99065] font-semibold">nothing</span>—not even light—can escape its grasp.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BlackHole;