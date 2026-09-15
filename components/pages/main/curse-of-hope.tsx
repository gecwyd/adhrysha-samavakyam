"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE NAIVETY",
    text: "She let them know too much,\nAnd still, she doesn't know she is naive\nBecause she thinks 11:11 wishes always come true.",
  },
  {
    tag: "02 / THE TOLL",
    text: "Every time they leave, she knows something in her dims;\nEvery time they come again, she knows something lights her up.",
  },
  {
    tag: "03 / THE CURSE",
    text: "Not everyone can handle a heart like hers,\nBut even now, she believes they could—\nAnd that's not her fault.",
  }
];

export function CurseOfHope() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.8 });

  const introOpacity = useTransform(smooth, [0, 0.1, 0.15], [1, 1, 0]);
  const introY = useTransform(smooth, [0, 0.15], ["0%", "-10%"]);

  const q0Opacity = useTransform(smooth, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const q0Y = useTransform(smooth, [0.15, 0.2, 0.3, 0.35], ["10%", "0%", "0%", "-10%"]);

  const q1Opacity = useTransform(smooth, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const q1Y = useTransform(smooth, [0.35, 0.4, 0.5, 0.55], ["10%", "0%", "0%", "-10%"]);

  const q2Opacity = useTransform(smooth, [0.55, 0.6, 0.8, 0.85], [0, 1, 1, 0]);
  const q2Y = useTransform(smooth, [0.55, 0.6, 0.8, 0.85], ["10%", "0%", "0%", "-10%"]);

  const finalOpacity = useTransform(smooth, [0.85, 0.9, 1, 1], [0, 1, 1, 1]);
  const finalY = useTransform(smooth, [0.85, 0.9, 1, 1], ["10%", "0%", "0%", "0%"]);

  return (
    <section 
      ref={containerRef}
      id="sec-curse-of-hope" 
      className="relative h-[500vh] w-full bg-[#140f1a] text-[#d5c7e8]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ 
              opacity: useTransform(smooth, [0, 1], [0.1, 0.4]),
              scale: useTransform(smooth, [0, 1], [0.8, 1.2]) 
            }}
            className="w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] bg-[radial-gradient(circle_at_center,#d98fa6_0%,transparent_70%)] blur-[100px] opacity-20" 
          />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d5c7e8]/40">
            Inquation / Poetry
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d5c7e8]/40 text-right">
            05
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#d98fa6] uppercase mb-6">
              A Poem on Vulnerability
            </p>
            <h2 className="font-heading text-[12vw] md:text-[9vw] lg:text-[7vw] leading-[0.85] tracking-tight text-[#d5c7e8]">
              THE CURSE
              <br />
              <span className="text-[#d98fa6]">OF HOPE.</span>
            </h2>
          </motion.div>

          {/* Quotes */}
          {[
            { opacity: q0Opacity, y: q0Y, quote: SUMMARY[0] },
            { opacity: q1Opacity, y: q1Y, quote: SUMMARY[1] },
            { opacity: q2Opacity, y: q2Y, quote: SUMMARY[2] },
          ].map((item, index) => (
            <motion.div
              key={index}
              style={{ opacity: item.opacity, y: item.y }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-none"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#d98fa6] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[#d5c7e8] leading-[1.4] max-w-4xl whitespace-pre-line italic">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#d98fa6]/30 shadow-[0_0_30px_rgba(217,143,166,0.15)] bg-[#d98fa6]/10">
              <img 
                src={resolveAsset("nivedya.png")} 
                alt="Nivedya A" 
                className="w-full h-full object-cover grayscale opacity-90 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#d98fa6] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#d5c7e8]">
              Nivedya A
            </h3>
            <p className="font-sans text-sm md:text-base text-[#d5c7e8]/50 mt-2 max-w-2xl">
              1st Year, Electronics & Communication
            </p>
            <div className="mt-16">
              <Link
                href="/curse-of-hope"
                className="group inline-flex items-center gap-4 bg-[#d98fa6] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#140f1a] transition-all hover:bg-[#d5c7e8]"
              >
                <span>Read the Full Poem</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#d5c7e8]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d5c7e8]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#d5c7e8]/40">
            The Curse of Hope
          </div>
        </footer>
      </div>
    </section>
  );
}
