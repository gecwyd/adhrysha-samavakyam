"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE HUNGER",
    text: "വിശപ്പിന്റെ ഭാഷ എല്ലാ ദൈവസൃഷ്ടിക്കും ഒന്നായതിനാൽ രാമുവിന് അധികം ചിന്തിക്കേണ്ടി വന്നില്ല.",
    translation: "Since the language of hunger is the same for all of God's creations, Ramu didn't have to think much.",
  },
  {
    tag: "02 / THE FIND",
    text: "ആളുകളുടെ ചവറുകൂമ്പാരമായ റോഡരികിലൂടെ രാമു നടത്തം ആരംഭിച്ചു... വലിച്ചെറിയപ്പെട്ടത് എന്തോ ഒരു പൊതിയായിരുന്നു.",
    translation: "Ramu started walking along the garbage-filled roadside... What was thrown away was a packet.",
  },
  {
    tag: "03 / THE GOD",
    text: "വിശക്കുന്നവന് ആഹാരം കൊടുക്കുന്നവൻ ദൈവമാണെന്ന് കേട്ടിട്ടുണ്ട്. താൻ ദൈവമാണോ...",
    translation: "I have heard that the one who gives food to the hungry is God. Was he a God...",
  }
];

export function OruMudanthan() {
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
      id="sec-oru-mudanthan" 
      className="relative h-[500vh] w-full bg-[#1c1814] text-[#e8dac7]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <div className="w-[100vw] h-px bg-[#e6ba95] absolute top-1/3 rotate-12" />
          <div className="w-[100vw] h-px bg-[#e6ba95] absolute top-2/3 -rotate-12" />
          <div className="w-px h-[100vh] bg-[#e6ba95] absolute left-1/3 rotate-45" />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e8dac7]/40">
            Inquation / Short Story
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e8dac7]/40 text-right">
            06
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#e6ba95] uppercase mb-6">
              A Tale of Survival
            </p>
            <h2 className="font-heading text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.85] tracking-tight text-[#e8dac7]">
              STORY OF
              <br />
              <span className="text-[#e6ba95] text-[7vw] md:text-[5vw] block mt-4 font-serif italic font-light">The Lame Man.</span>
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#e6ba95] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#e8dac7] leading-[1.4] max-w-4xl" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#e8dac7]/60 mt-8 max-w-2xl italic">
                {item.quote.translation}
              </p>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#e6ba95]/30 grayscale opacity-80 mix-blend-luminosity">
              <Image 
                src={resolveAsset("sifna.png")} 
                alt="Sifna Ameesha V K" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#e6ba95] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#e8dac7]" lang="ml">
              സിഫ്ന അമീഷ വി . കെ
            </h3>
            <p className="font-sans text-sm md:text-base text-[#e8dac7]/50 mt-2 max-w-2xl" lang="ml">
              രണ്ടാം വർഷം, ഇലക്ട്രികൽ & ഇലക്ട്രോണിക്സ്
            </p>
            <div className="mt-16">
              <Link
                href="/oru-mudanthan"
                className="group inline-flex items-center gap-4 bg-[#e6ba95] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1c1814] transition-all hover:bg-[#e8dac7]"
              >
                <span>Read the Full Story</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#e8dac7]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e8dac7]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#e8dac7]/40" lang="ml">
            ഒരു മുടന്തൻ പറഞ്ഞ കഥ
          </div>
        </footer>
      </div>
    </section>
  );
}
