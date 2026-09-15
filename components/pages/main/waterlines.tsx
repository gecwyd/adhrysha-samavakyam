"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE ILLUSION",
    text: "പ്രണയം നടിച്ചു നീ പലപ്പോഴും\nകവർന്നിരുന്നു എന്റെ ഹൃദയത്തെ...",
    translation: "You often feigned love\nAnd stole my heart away...",
  },
  {
    tag: "02 / THE BETRAYAL",
    text: "എന്നാൽ ഓർക്കാതെ പോയ് നീ\nഎന്നെ ചണ്ടിയാക്കിയതു നീ തന്നെയെന്ന്...",
    translation: "But you forgot without a thought\nThat it was you who turned me to waste...",
  },
  {
    tag: "03 / THE REALITY",
    text: "നിന്നിലെ എന്നോടുള്ള പ്രണയം\nവെറും ജലരേഖകൾ മാത്രമെന്ന്...",
    translation: "That your love for me\nWas nothing but fleeting lines on water...",
  }
];

export function Waterlines() {
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
      id="sec-waterlines" 
      className="relative h-[500vh] w-full bg-[#061325] text-[#e0f2fe]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <motion.div 
            style={{ 
              scale: useTransform(smooth, [0, 1], [0.8, 1.5]),
              opacity: useTransform(smooth, [0, 1], [0.1, 0.3])
            }}
            className="w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] border-[1px] border-[#38bdf8] rounded-full absolute" 
          />
          <motion.div 
            style={{ 
              scale: useTransform(smooth, [0, 1], [1, 2]),
              opacity: useTransform(smooth, [0, 1], [0.2, 0])
            }}
            className="w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] border-[1px] border-[#38bdf8] rounded-full absolute" 
          />
          <motion.div 
            style={{ 
              scale: useTransform(smooth, [0, 1], [1.2, 2.5]),
              opacity: useTransform(smooth, [0, 1], [0.3, 0])
            }}
            className="w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] border-[1px] border-[#38bdf8] rounded-full absolute" 
          />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0f2fe]/40">
            Inquation / Poetry
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0f2fe]/40 text-right">
            10
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#38bdf8] uppercase mb-6">
              A Poem on Illusions
            </p>
            <h2 className="font-heading text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.85] tracking-tight text-[#e0f2fe]">
              WATER
              <br />
              <span className="text-[#38bdf8] text-[5vw] md:text-[4vw] block mt-6 font-serif italic font-light tracking-wide">Lines</span>
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#38bdf8] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#e0f2fe] leading-[1.4] max-w-4xl whitespace-pre-line" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#e0f2fe]/60 mt-8 max-w-2xl italic whitespace-pre-line">
                {item.quote.translation}
              </p>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#38bdf8]/30 shadow-[0_0_30px_rgba(56,189,248,0.15)] bg-[#38bdf8]/10">
              <Image 
                src={resolveAsset("anagha.png")} 
                alt="Anagha T.J" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover grayscale opacity-90 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#38bdf8] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#e0f2fe]" lang="ml">
              അനഘ ടി. ജെ
            </h3>
            <p className="font-sans text-sm md:text-base text-[#e0f2fe]/50 mt-2 max-w-2xl" lang="ml">
              രണ്ടാം വർഷം, സിവിൽ എഞ്ചിനീയറിങ്
            </p>
            <div className="mt-16">
              <Link
                href="/waterlines"
                className="group inline-flex items-center gap-4 bg-[#38bdf8] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#061325] transition-all hover:bg-[#e0f2fe]"
              >
                <span>Read the Full Poem</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#e0f2fe]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0f2fe]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#e0f2fe]/40" lang="ml">
            ജലരേഖകൾ
          </div>
        </footer>
      </div>
    </section>
  );
}
