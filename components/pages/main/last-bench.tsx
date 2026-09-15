"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE SECRETS",
    text: "പരീക്ഷകൾക്ക് മുമ്പ് എഴുതിയ സൂത്രവാക്യങ്ങൾ, പൂർത്തിയാകാത്ത കവിതകൾ, മോശം ഫലങ്ങൾക്ക് ശേഷം മറഞ്ഞിരിക്കുന്ന കണ്ണുനീർ...",
    translation: "Formulas written before exams, unfinished poems, tears hidden after bad results...",
  },
  {
    tag: "02 / THE DREAMS",
    text: "ക്ലാസ് മുറിയേക്കാൾ വലിയ സ്വപ്നങ്ങൾക്ക് ബെഞ്ച് സാക്ഷിയായിരുന്നു.",
    translation: "The bench was witness to dreams bigger than the classroom.",
  },
  {
    tag: "03 / THE REALIZATION",
    text: "ഒരു ദിവസം നമുക്ക് ഊഹിക്കാവുന്നതിലും കൂടുതൽ ഈ സ്ഥലം നഷ്ടമാകും.",
    translation: "One day, we will miss this place more than we can imagine.",
  }
];

export function LastBench() {
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
      id="sec-last-bench" 
      className="relative h-[500vh] w-full bg-[#1c140a] text-[#fef3c7]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual: Evening sunlight and dust */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <motion.div 
            style={{ 
              opacity: useTransform(smooth, [0, 1], [0.3, 0.6]),
              x: useTransform(smooth, [0, 1], ["-20%", "20%"]),
            }}
            className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] bg-[radial-gradient(ellipse_at_top_right,#fbbf24_0%,transparent_60%)] blur-[100px] opacity-40 mix-blend-screen absolute top-[-30%] right-[-30%]" 
          />
          {/* Dust texture catching the "sunlight" */}
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60 absolute inset-0 mix-blend-overlay"></div>
        </div>

        {/* Floating warm mist layers */}
        <motion.div 
          style={{ opacity: useTransform(smooth, [0, 1], [0.8, 0.3]) }}
          className="absolute inset-0 bg-gradient-to-bl from-[#78350f]/20 via-transparent to-transparent z-0"
        />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#fef3c7]/40">
            Inquation / Memoir
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#fef3c7]/40 text-right flex items-center gap-2">
            16
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full z-10">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] uppercase mb-6 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              A Nostalgic Journey
            </p>
            <h2 className="font-heading text-[12vw] md:text-[9vw] lg:text-[7vw] leading-[0.85] tracking-tight text-[#fef3c7] opacity-90" lang="ml">
              ലാസ്റ്റ്
              <br />
              <span className="text-[#fbbf24] text-[9vw] md:text-[7vw] lg:text-[6vw] block mt-4 font-serif italic font-light tracking-wide">ബെഞ്ച്</span>
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#fef3c7] leading-[1.4] max-w-4xl whitespace-pre-line" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#fef3c7]/60 mt-8 max-w-2xl italic whitespace-pre-line">
                {item.quote.translation}
              </p>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#fbbf24]/30 shadow-[0_0_30px_rgba(251,191,36,0.15)] bg-[#fbbf24]/10">
              <Image 
                src={resolveAsset("anjali.png")} 
                alt="Anjali Krishna" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover sepia-[0.3] opacity-80 mix-blend-luminosity hover:sepia-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#fbbf24] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#fef3c7]" lang="ml">
              അഞ്ജലി കൃഷ്ണ 
            </h3>
            <p className="font-sans text-sm md:text-base text-[#fef3c7]/50 mt-2 max-w-2xl" lang="ml">
              മൂന്നാം വർഷം, ഇലക്ട്രോണിക്സ് & കമ്യൂണികേഷൻ
            </p>
            <div className="mt-16">
              <Link
                href="/last-bench"
                className="group inline-flex items-center gap-4 bg-[#fbbf24] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1c140a] transition-all hover:bg-[#fcd34d]"
              >
                <span>Read the Full Story</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#fef3c7]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#fef3c7]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#fef3c7]/40" lang="ml">
            ലാസ്റ്റ് ബെഞ്ച്
          </div>
        </footer>
      </div>
    </section>
  );
}
