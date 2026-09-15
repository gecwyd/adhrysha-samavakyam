"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Droplets } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE RAIN",
    text: "വയനാട്ടിലെ മഴയ്ക്ക് ഒരു പ്രത്യേക സ്വഭാവമുണ്ട്. അത് വെറുതെ പെയ്യുകയല്ല. ഓർമ്മകളെ നനയ്ക്കും.",
    translation: "The rain in Wayanad has a distinct character. It doesn't just fall. It drenches memories.",
  },
  {
    tag: "02 / THE PRESENCE",
    text: "സൗഹൃദം എന്നത് ചിലപ്പോൾ ഒരു വാക്കല്ല, അടുത്തിരിക്കുന്ന ഒരാളുടെ സാന്നിധ്യമാണ്.",
    translation: "Friendship is sometimes not just a word, but the presence of someone sitting beside you.",
  },
  {
    tag: "03 / THE LESSON",
    text: "നമ്മൾ കോളേജിൽ പഠിച്ചത് പാഠപുസ്തകങ്ങൾ ആയിരുന്നില്ല സ്നേഹിക്കാനും നഷ്ടപ്പെടാനും ഓർമ്മിക്കാനും ആയിരുന്നു.",
    translation: "What we learned in college weren't textbooks, but how to love, to lose, and to remember.",
  }
];

export function MistyPaths() {
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
      id="sec-misty-paths" 
      className="relative h-[500vh] w-full bg-[#040e16] text-[#e0e7ff]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual: Image, Fog and Rain overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
          <motion.div 
            style={{ 
              opacity: useTransform(smooth, [0, 1], [0.6, 1]),
              scale: useTransform(smooth, [0, 1], [1, 1.2]),
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={resolveAsset("misty-paths-bg.jpg")}
              alt="Misty background"
              fill
              className="object-cover object-center grayscale contrast-125 opacity-70"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#38bdf8_0%,transparent_50%)] blur-[100px] opacity-30 mix-blend-screen" />
          </motion.div>
          {/* Noise/Dust texture representing rain/mist */}
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 absolute inset-0 mix-blend-overlay"></div>
        </div>

        {/* Floating animated mist layers */}
        <motion.div 
          style={{ y: useTransform(smooth, [0, 1], ["0%", "-30%"]) }}
          className="absolute inset-0 bg-gradient-to-t from-[#040e16] via-transparent to-transparent z-0 opacity-80"
        />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0e7ff]/40">
            Inquation / Memoir
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0e7ff]/40 text-right flex items-center gap-2">
            <Droplets className="w-3 h-3 text-[#38bdf8]" />
            15
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full z-10">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#38bdf8] uppercase mb-6 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              A Nostalgic Journey
            </p>
            <h2 className="font-heading text-[10vw] md:text-[7vw] lg:text-[6vw] leading-[0.85] tracking-tight text-[#e0e7ff] opacity-90" lang="ml">
              മഞ്ഞിറങ്ങിയ
              <br />
              <span className="text-[#38bdf8] text-[7vw] md:text-[5vw] lg:text-[4vw] block mt-4 font-serif italic font-light tracking-wide">വഴികൾ</span>
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
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#e0e7ff] leading-[1.4] max-w-4xl whitespace-pre-line" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#e0e7ff]/60 mt-8 max-w-2xl italic whitespace-pre-line">
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
                src={resolveAsset("anjali.png")} 
                alt="Anjali Krishna" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#38bdf8] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#e0e7ff]" lang="ml">
              അഞ്ജലി കൃഷ്ണ 
            </h3>
            <p className="font-sans text-sm md:text-base text-[#e0e7ff]/50 mt-2 max-w-2xl" lang="ml">
              മൂന്നാം വർഷം, ഇലക്ട്രോണിക്സ് & കമ്യൂണികേഷൻ
            </p>
            <div className="mt-16">
              <Link
                href="/misty-paths"
                className="group inline-flex items-center gap-4 bg-[#38bdf8] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#040e16] transition-all hover:bg-[#7dd3fc]"
              >
                <span>Read the Full Memoir</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#e0e7ff]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0e7ff]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#e0e7ff]/40" lang="ml">
            മഞ്ഞിറങ്ങിയ വഴികൾ
          </div>
        </footer>
      </div>
    </section>
  );
}
