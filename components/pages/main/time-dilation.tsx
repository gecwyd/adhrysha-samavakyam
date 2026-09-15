"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useInView } from "framer-motion";
import { useAudio } from "@/context/audio.context";
import { resolveAsset } from "@/lib/asset-registry";
import { preload } from "@/lib/preload";

export function travelerYears(speedFraction: number, earthYears = 10) {
  return earthYears * Math.sqrt(1 - speedFraction * speedFraction);
}

const TIME_DILATION_BG = "https://youtu.be/m3zvVGJrTP8?si=4n9m6nylINfXnXh6"

export function TimeDilation() {
  const containerRef = useRef<HTMLElement>(null);
  const { playbg, prebufferbg } = useAudio();

  useEffect(() => {
    prebufferbg(TIME_DILATION_BG);
  }, [prebufferbg]);

  useEffect(() => {
    preload(TIME_DILATION_BG, "youtube");
  }, []);

  const isInView = useInView(containerRef, { amount: "some", margin: "150px 0px" });

  useEffect(() => {
    if (isInView) {
      playbg(TIME_DILATION_BG, { loop: true, volume: 0.3 });
    }
  }, [isInView, playbg]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

  const speedFraction = useTransform(smooth, [0.45, 0.9], [0, 0.999]);
  const elapsed = useTransform(speedFraction, (v) => travelerYears(v));

  const [speedDisplay, setSpeedDisplay] = useState("0.0");
  const [elapsedDisplay, setElapsedDisplay] = useState("10.00");

  useMotionValueEvent(speedFraction, "change", (v) => {
    setSpeedDisplay((v * 100).toFixed(1));
  });
  useMotionValueEvent(elapsed, "change", (v) => {
    setElapsedDisplay(v.toFixed(2));
  });

  const headlineOpacity = useTransform(smooth, [0, 0.22, 0.3], [1, 1, 0]);
  const headlineY = useTransform(smooth, [0.22, 0.3], [0, -100]);
  const headlineScale = useTransform(smooth, [0, 0.3], [1, 1.1]);

  const counterOpacity = useTransform(smooth, [0.28, 0.38], [0, 1]);
  const counterY = useTransform(smooth, [0.28, 0.38], [60, 0]);

  const earthX = useTransform(speedFraction, [0, 0.999], [0, -60]);
  const travellerX = useTransform(speedFraction, [0, 0.999], [0, 60]);
  const travellerScale = useTransform(speedFraction, [0, 0.999], [1, 1.2]);
  const travellerFilter = useTransform(speedFraction, [0, 0.9, 0.999], ["blur(0px)", "blur(0px)", "blur(4px)"]);

  const dividerOpacity = useTransform(speedFraction, [0, 0.15], [1, 0]);

  const barWidth = useTransform(speedFraction, [0, 0.999], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="sec-h"
      aria-labelledby="time-dilation-title"
      className="relative h-[500vh] w-full bg-[#191713] text-[#d9d4c7]"
    >
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 mix-blend-screen"
          style={{ backgroundImage: `url("${resolveAsset("time-dilation-bg.png")}")` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,23,19,0.28)_0%,rgba(25,23,19,0.58)_68%,rgba(25,23,19,0.82)_100%)]"
        />

        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY, scale: headlineScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
        >
          <h2
            id="time-dilation-title"
            className="font-heading text-[23vw] sm:text-[17vw] md:text-[13vw] leading-[0.85] tracking-tight"
          >
            TIME
            <br />
            <span className="text-[#a84e2a]">DILATION.</span>
          </h2>
          <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#d9d4c7]/25 mt-9">
            Scroll to accelerate ↓
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: counterOpacity, y: counterY }}
          className="flex flex-col items-center justify-center gap-12 sm:gap-16 w-full max-w-5xl px-6 select-none relative z-10"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Earth: 10.00 years. Traveller: ${elapsedDisplay} years at ${speedDisplay} percent of light speed.`}
        >
          <div className="flex items-center justify-center w-full relative">
            <motion.div style={{ x: earthX }} className="flex flex-col items-center w-1/2 pr-4 sm:pr-8 md:pr-16 border-r border-[#d9d4c7]/0">
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#d9d4c7]/40 mb-4">
                Earth
              </p>
              <p className="font-heading text-[16vw] sm:text-[12vw] md:text-[9vw] leading-none text-[#d9d4c7] tabular-nums tracking-tighter">
                10.00
              </p>
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#d9d4c7]/25 mt-3">
                years
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: dividerOpacity }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-3xl sm:text-4xl text-[#d9d4c7]/20 italic pointer-events-none"
            >
              vs
            </motion.div>

            <motion.div style={{ x: travellerX, scale: travellerScale, filter: travellerFilter }} className="flex flex-col items-center w-1/2 pl-4 sm:pl-8 md:pl-16 origin-left">
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#a84e2a]/70 mb-4">
                Traveller
              </p>
              <p className="font-heading text-[16vw] sm:text-[12vw] md:text-[9vw] leading-none text-[#a84e2a] tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(168,78,42,0.2)]">
                {elapsedDisplay}
              </p>
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#a84e2a]/40 mt-3">
                years
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col items-center w-full max-w-lg mt-8">
            <div className="w-full h-px bg-[#d9d4c7]/10 relative overflow-hidden mb-6">
              <motion.div
                style={{ width: barWidth }}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#a84e2a]/20 via-[#a84e2a] to-[#ff8c61] shadow-[0_0_10px_rgba(168,78,42,0.5)]"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#d9d4c7]/50">
                Speed &mdash; <span className="text-[#d9d4c7] font-bold">{speedDisplay}%</span> of light
              </p>
              <p className="font-mono text-[7px] sm:text-[8px] tracking-[0.15em] text-[#d9d4c7]/20">
                Δτ = Δt √(1 − v²/c²)
              </p>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-6 flex justify-between font-mono text-[7px] sm:text-[8px] tracking-[0.15em] uppercase text-[#d9d4c7]/15">
          <span>GEC Wayanad · 2025–26</span>
          <span>Idealised constant-speed trip</span>
        </div>
      </div>
    </section>
  );
}
