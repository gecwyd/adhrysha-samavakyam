"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BlackHole } from "./black-hole";

const SUMMARY = [
  {
    tag: "01 / THE ABYSS",
    text: "തമോദ്വാരം എന്നത് പ്രപഞ്ചത്തിലെ അതിഗുരുത്വാകർഷണം നിറഞ്ഞ ഒരു മേഖലയാണ്. വെളിച്ചത്തിന് പോലും അതിൽ നിന്ന് രക്ഷപ്പെടാനാവില്ല.",
    translation: "A black hole is a region of immense gravity. Not even light can escape it.",
  },
  {
    tag: "02 / THE METAPHOR",
    text: "എന്നാൽ തമോദ്വാരം ശാസ്ത്രത്തിലെ ഒരു പദം മാത്രമാണോ? അല്ല. മനുഷ്യന്റെ ജീവിതത്തിലും അനേകം തമോദ്വാരങ്ങൾ ഉണ്ട്.",
    translation: "Is it just a scientific term? No. Human life has many black holes too.",
  },
  {
    tag: "03 / THE STRUGGLE",
    text: "ഏകാന്തത, പരാജയം, ദുഃഖം... ഇവയെല്ലാം ഹൃദയത്തെ വിഴുങ്ങാൻ ശ്രമിക്കുന്ന മനസ്സിന്റെ തമോദ്വാരങ്ങളാണ്.",
    translation: "Loneliness, failure, sorrow... these are the black holes of the mind trying to swallow the heart.",
  },
  {
    tag: "04 / THE HOPE",
    text: "തമോദ്വാരങ്ങൾ വെളിച്ചത്തെ വിഴുങ്ങിയേക്കാം. എന്നാൽ പ്രതീക്ഷയെ വിഴുങ്ങാൻ അവയ്ക്കൊരിക്കലും കഴിയില്ല.",
    translation: "Black holes may swallow light. But they can never swallow hope.",
  }
];

export function Thamodwaram() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const q2Opacity = useTransform(smooth, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const q2Y = useTransform(smooth, [0.55, 0.6, 0.7, 0.75], ["10%", "0%", "0%", "-10%"]);

  const q3Opacity = useTransform(smooth, [0.75, 0.8, 1, 1], [0, 1, 1, 1]);
  const q3Y = useTransform(smooth, [0.75, 0.8, 1, 1], ["10%", "0%", "0%", "0%"]);

  return (
    <section 
      id="sec-q" 
      aria-labelledby="black-hole-title" 
      className="w-full bg-black text-[#e6e0d3] relative"
    >
      <BlackHole />
      
      <div ref={containerRef} className="relative h-[500vh] w-full bg-black text-[#e6e0d3]">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
          
          {/* Header */}
          <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d99065]/60">
              Inquation / Reflection
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d99065]/60 text-right">
              03
            </div>
          </header>

          {/* Content Layers */}
          <div className="relative flex-1 flex items-center justify-center w-full">
            {/* Intro */}
            <motion.div
              style={{ opacity: introOpacity, y: introY }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#d99065] uppercase mb-6">
                A Philosophical Essay
              </p>
              <h2 className="font-heading text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tight text-[#e6e0d3]">
                BEYOND THE
                <br />
                <span className="text-[#d99065]">ABYSS.</span>
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
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#d99065] uppercase mb-8">
                  {item.quote.tag}
                </span>
                <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#e6e0d3] leading-[1.4] max-w-4xl" lang="ml">
                  &ldquo;{item.quote.text}&rdquo;
                </h3>
                <p className="font-serif text-sm md:text-lg text-[#a39b8c] mt-8 max-w-2xl italic">
                  {item.quote.translation}
                </p>
              </motion.div>
            ))}

            {/* Final Quote & CTA */}
            <motion.div
              style={{ opacity: q3Opacity, y: q3Y }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#d99065] uppercase mb-8">
                {SUMMARY[3].tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#e6e0d3] leading-[1.4] max-w-4xl" lang="ml">
                &ldquo;{SUMMARY[3].text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#a39b8c] mt-8 max-w-2xl italic">
                {SUMMARY[3].translation}
              </p>
              <div className="mt-16">
                <Link
                  href="/thamodwaram"
                  className="group inline-flex items-center gap-4 bg-[#d99065] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#191713] transition-all hover:bg-[#e6e0d3]"
                >
                  <span>Read the Full Essay</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#e6e0d3]/10 pointer-events-none">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e6e0d3]/40">
              GEC Wayanad · 2025-26
            </div>
            <div className="font-sans text-[10px] text-[#e6e0d3]/40" lang="ml">
              അഗാധതയുടെ അപ്പുറം
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
