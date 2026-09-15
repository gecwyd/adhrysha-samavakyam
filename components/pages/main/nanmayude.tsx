"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE RADIANCE",
    text: "അല്ലയോ പൂവേ!\nനീ ജന്മം നൽകും\nപൂമൊട്ടുകൾക്കെന്തൊരു കാന്തി!",
    translation: "Oh flower!\nThe buds you give birth to\nWhat radiance they have!",
  },
  {
    tag: "02 / THE LIGHT",
    text: "പകരൂ നീ നന്മ തൻ തൂവെളിച്ചം...\nവളർന്നു തുടങ്ങുന്ന പൂമൊട്ടുകൾ\nവിടരട്ടെ നന്മയുടെ വിരിഞ്ഞ പുഷ്പങ്ങളായ്",
    translation: "Pour out the pure light of goodness...\nMay the growing buds\nBloom into open flowers of goodness",
  },
  {
    tag: "03 / THE DREAM",
    text: "പറയൂ പകരൂ നീ നന്മതൻ പ്രിയസ്വപ്നങ്ങൾ\nവളരും മൊട്ടുകൾ വിടരട്ടേ നന്മയാൽ",
    translation: "Speak and pour out the dear dreams of goodness\nLet the growing buds bloom with goodness",
  }
];

export function Nanmayude() {
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
      id="sec-nanmayude" 
      className="relative h-[500vh] w-full bg-[#052e16] text-[#ecfccb]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <motion.div 
            style={{ 
              scale: useTransform(smooth, [0, 1], [0.8, 1.3]),
              opacity: useTransform(smooth, [0, 1], [0.1, 0.4]),
              rotate: useTransform(smooth, [0, 1], [0, 90])
            }}
            className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] border-[2px] border-dashed border-[#bef264] rounded-full absolute" 
          />
          <motion.div 
            style={{ 
              scale: useTransform(smooth, [0, 1], [1, 1.8]),
              opacity: useTransform(smooth, [0, 1], [0.2, 0]),
              rotate: useTransform(smooth, [0, 1], [0, -90])
            }}
            className="w-[90vw] h-[90vw] md:w-[45vw] md:h-[45vw] border-[1px] border-[#bef264] rounded-full absolute" 
          />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ecfccb]/40">
            Inquation / Poetry
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ecfccb]/40 text-right">
            12
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#bef264] uppercase mb-6">
              A Poem of Nature and Hope
            </p>
            <h2 className="font-heading text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.85] tracking-tight text-[#ecfccb]">
              BUDS OF
              <br />
              <span className="text-[#bef264] text-[6vw] md:text-[4vw] block mt-6 font-serif italic font-light tracking-wide">Goodness</span>
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#bef264] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#ecfccb] leading-[1.4] max-w-4xl whitespace-pre-line" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#ecfccb]/60 mt-8 max-w-2xl italic whitespace-pre-line">
                {item.quote.translation}
              </p>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#bef264]/30 shadow-[0_0_30px_rgba(190,242,100,0.15)] bg-[#bef264]/10">
              <Image 
                src={resolveAsset("eldho.png")} 
                alt="Eldho Paul Shajan" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover grayscale opacity-90 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#bef264] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#ecfccb]" lang="ml">
              ഏൽദോ പോൾ ഷാജൻ
            </h3>
            <p className="font-sans text-sm md:text-base text-[#ecfccb]/50 mt-2 max-w-2xl" lang="ml">
              ഒന്നാം വർഷം, മെക്കാനിക്കൽ എഞ്ചിനീയറിങ്
            </p>
            <div className="mt-16">
              <Link
                href="/nanmayude"
                className="group inline-flex items-center gap-4 bg-[#bef264] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#052e16] transition-all hover:bg-[#ecfccb]"
              >
                <span>Read the Full Poem</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#ecfccb]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ecfccb]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#ecfccb]/40" lang="ml">
            നന്മയുടെ പൂമൊട്ടുകൾ
          </div>
        </footer>
      </div>
    </section>
  );
}
