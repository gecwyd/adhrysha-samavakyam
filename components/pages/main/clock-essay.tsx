"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useAudio } from "@/context/audio.context";
import { preload } from "@/lib/preload";
import { resolveAsset } from "@/lib/asset-registry";
import { clockEssay } from "@/lib/clock-essay";
import { cn } from "@/lib/utils";

const TIME_DILATION_BG = resolveAsset("time-dilation.mp3");

export function ClockEssay() {
  const containerRef = useRef<HTMLElement>(null);
  const { playbg } = useAudio();

  useEffect(() => {
    preload(TIME_DILATION_BG, "audio");
  }, []);

  const isInView = useInView(containerRef, { amount: 0.05, margin: "150px 0px" });

  useEffect(() => {
    if (isInView) {
      playbg(TIME_DILATION_BG, { loop: true, volume: 0.3, startSeconds: 10 });
    }
  }, [isInView, playbg]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.8 });

  return (
    <section
      ref={containerRef}
      id="sec-i"
      aria-labelledby="clock-essay-title"
      className="relative w-full bg-[#d9d4c7] text-[#191713]"
    >
      {/* Background Graphic fixed to viewport while scrolling through this section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center opacity-[0.08]">
          <svg viewBox="0 0 100 100" className="w-[120vmin] h-[120vmin] overflow-visible">
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#191713"
              strokeWidth="0.2"
              style={{ pathLength: smooth }}
              transform="rotate(-90 50 50)"
            />
            <circle cx="50" cy="50" r="48" fill="none" stroke="#191713" strokeWidth="0.05" strokeDasharray="0.5 1" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="2"
                x2="50"
                y2="4"
                stroke="#191713"
                strokeWidth="0.2"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#191713]/50">
            Inquation / Reflection
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#191713]/50 text-right">
            02
          </div>
        </header>

        {/* Intro Screen */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center min-h-[75vh]">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#a84e2a] uppercase mb-6">
            A Reflection
          </p>
          <h2
            id="clock-essay-title"
            className="font-heading text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tight text-[#191713]"
          >
            THE TIME
            <br />
            A CLOCK
            <br />
            <span className="text-[#a84e2a]">DOESN&apos;T TELL.</span>
          </h2>
        </div>

        {/* Essay Content */}
        <div className="w-full max-w-5xl mx-auto px-6 pb-32 pt-16 md:pb-48 md:pt-24 flex flex-col gap-20 md:gap-32">
          {clockEssay.map((paragraph, index) => {
            // Alternate alignment for a poetic, staggering flow
            const alignRight = index % 2 !== 0;
            // Highlight specific paragraphs (first, middle climax, ending) to vary typographic scale
            const isHighlight = index === 0 || index === 6 || index === clockEssay.length - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "w-full flex",
                  alignRight ? "md:justify-end" : "md:justify-start"
                )}
              >
                <div
                  className={cn(
                    "w-full md:w-9/12 lg:w-8/12",
                    alignRight ? "md:text-right" : "md:text-left"
                  )}
                >
                  <p
                    className={cn(
                      "font-sans text-[#191713] leading-[1.7] md:leading-[1.8] tracking-wide",
                      isHighlight
                        ? "text-2xl md:text-4xl lg:text-[2.5rem] font-medium text-[#191713]/90"
                        : "text-xl md:text-2xl lg:text-3xl text-[#191713]/70"
                    )}
                    lang="ml"
                  >
                    {paragraph.malayalam}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-auto flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#191713]/10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#191713]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#191713]/40" lang="ml">
            ഘടികാരം പറയാത്ത സമയം
          </div>
        </footer>
      </div>
    </section>
  );
}

export default ClockEssay;
