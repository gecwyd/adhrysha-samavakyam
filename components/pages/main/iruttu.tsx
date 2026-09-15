"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE FEAR",
    text: "കൊച്ചുകുട്ടികളുടെ മനസ്സിൽ ഇരുട്ടിന് എന്നും പേടിയുടെ മുഖമാണ്...",
    translation: "In the minds of little children, darkness always wears the face of fear...",
  },
  {
    tag: "02 / THE FORM",
    text: "ശരിക്കും ഇരുട്ടിന് ഒരു രൂപമുണ്ടോ?... ഇരുട്ടിന് അവർ കണ്ടെത്തിയ രൂപം ഒരു സുഹൃത്തിന്റെയാവാം സമാധാനത്തിന്റെയായിരിക്കാം.",
    translation: "Does darkness really have a form?... The form they found for darkness could be that of a friend, or of peace.",
  },
  {
    tag: "03 / THE REVELATION",
    text: "ഒരിക്കൽ ഇരുട്ടിനെ ഭയന്ന് തിരിഞ്ഞ് നടന്നവർ ഇന്ന് അതെ ഇരുട്ടിൽ വെളിച്ചം തേടുന്നു.",
    translation: "Those who once turned away in fear of the dark, today seek light within that very same darkness.",
  }
];

export function Iruttu() {
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
      id="sec-iruttu" 
      className="relative h-[500vh] w-full bg-[#050505] text-[#d4d4d4]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
          <motion.div 
            style={{ 
              opacity: useTransform(smooth, [0, 1], [0.1, 0.5]),
              scale: useTransform(smooth, [0, 1], [0.5, 1.5]),
            }}
            className="w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] bg-[radial-gradient(circle_at_center,#fef08a_0%,transparent_60%)] blur-[100px] opacity-20 mix-blend-screen" 
          />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4d4d4]/40">
            Inquation / Reflection
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4d4d4]/40 text-right">
            11
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#fef08a]/70 uppercase mb-6">
              A Journey Through Shadows
            </p>
            <h2 className="font-heading text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-tight text-[#fef08a] opacity-90" lang="ml">
              ഇരുട്ട്
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#fef08a]/70 uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#f5f5f5] leading-[1.4] max-w-4xl whitespace-pre-line" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#a3a3a3] mt-8 max-w-2xl italic whitespace-pre-line">
                {item.quote.translation}
              </p>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#fef08a]/20 shadow-[0_0_30px_rgba(254,240,138,0.1)] bg-[#fef08a]/5">
              <Image 
                src={resolveAsset("anirudh.png")} 
                alt="Anirudh P.T" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#fef08a]/70 uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#f5f5f5]" lang="ml">
              അനിരുദ്ധ് പി . ടി
            </h3>
            <p className="font-sans text-sm md:text-base text-[#a3a3a3] mt-2 max-w-2xl" lang="ml">
              മൂന്നാം വർഷം, ഇലക്ട്രോണിക്സ് & കമ്യൂണികേഷൻ
            </p>
            <div className="mt-16">
              <Link
                href="/iruttu"
                className="group inline-flex items-center gap-4 bg-[#fef08a]/90 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#050505] transition-all hover:bg-[#fef08a]"
              >
                <span>Read the Full Story</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#d4d4d4]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4d4d4]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#d4d4d4]/40" lang="ml">
            ഇരുട്ട്
          </div>
        </footer>
      </div>
    </section>
  );
}
