"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE TOLL",
    text: "War may begin with power and politics,\nBut it always ends in the lives of ordinary people.",
  },
  {
    tag: "02 / THE QUESTION",
    text: "The earth beneath our feet\nDoes not ask who we are,\nWhy then do we let hatred decide our future?",
  },
  {
    tag: "03 / THE VICTORY",
    text: "The greatest victory\nWill never be written in the history of wars,\nBut in the day\nWhen humanity finally stands beyond war...",
  }
];

export function HumanityBeyondWar() {
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
      id="sec-humanity-beyond-war" 
      className="relative h-[500vh] w-full bg-[#1f2224] text-[#e2e8f0]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <motion.div 
            style={{ 
              opacity: useTransform(smooth, [0, 1], [0.1, 0.5]),
              y: useTransform(smooth, [0, 1], ["10%", "-10%"])
            }}
            className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] bg-[radial-gradient(ellipse_at_top,#8da6b9_0%,transparent_70%)] blur-[120px] opacity-20 mix-blend-screen" 
          />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e2e8f0]/40">
            Inquation / Poetry
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e2e8f0]/40 text-right">
            09
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#8da6b9] uppercase mb-6">
              A Prayer for Peace
            </p>
            <h2 className="font-heading text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.85] tracking-tight text-[#e2e8f0] uppercase">
              HUMANITY
              <br />
              <span className="text-[#8da6b9] text-[5vw] md:text-[4vw] block mt-6 font-serif italic font-light tracking-wide normal-case">Beyond War</span>
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#8da6b9] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[#e2e8f0] leading-[1.4] max-w-4xl whitespace-pre-line italic">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#8da6b9]/30 shadow-[0_0_30px_rgba(141,166,185,0.15)] bg-[#8da6b9]/10">
              <Image 
                src={resolveAsset("saliha.png")} 
                alt="Saliha VK" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover grayscale opacity-90 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8da6b9] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#e2e8f0]">
              Saliha VK
            </h3>
            <p className="font-sans text-sm md:text-base text-[#e2e8f0]/50 mt-2 max-w-2xl">
              2nd Year, Electronics & Communication
            </p>
            <div className="mt-16">
              <Link
                href="/humanity-beyond-war"
                className="group inline-flex items-center gap-4 bg-[#8da6b9] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1f2224] transition-all hover:bg-[#e2e8f0]"
              >
                <span>Read the Full Poem</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#e2e8f0]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e2e8f0]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#e2e8f0]/40">
            Humanity Beyond War
          </div>
        </footer>
      </div>
    </section>
  );
}
