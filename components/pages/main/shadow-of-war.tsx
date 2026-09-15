"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE SHADOW",
    text: "യുദ്ധത്തിന്റെ നിഴലിൽ മിന്നലൊച്ച മുഴങ്ങുന്നു..\nതകർന്ന വാതിലുകൾക്കു പുറകിൽ\nസ്നേഹമിപ്പോഴും ചലിച്ചുകൊണ്ടേയിരിക്കുന്നുണ്ട്..",
    translation: "In the shadow of war, the thunder roars..\nBehind broken doors,\nLove still keeps moving..",
  },
  {
    tag: "02 / THE DESTRUCTION",
    text: "കളിപ്പാട്ടങ്ങൾ വീണ നിലങ്ങൾ\nചിതറിത്തെറിച്ച് വിണ്ടുകീറി കിടക്കുന്നു..",
    translation: "The grounds where toys once fell\nLie shattered and torn apart..",
  },
  {
    tag: "03 / THE HOPE",
    text: "ഇരുട്ട് പടരുന്നിടത്ത്, യുദ്ധത്തിന്റെ നിഴലിൽ,\nപ്രത്യാശയുടെ പാത തെളിയുന്നുണ്ട്..\nഒന്നിനും തോൽപ്പിക്കാനാവാത്ത പ്രത്യാശയുടെ പാത..",
    translation: "Where darkness spreads, in the shadow of war,\nThe path of hope becomes clear..\nA path of hope that nothing can defeat..",
  }
];

export function ShadowOfWar() {
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
      id="sec-shadow-of-war" 
      className="relative h-[500vh] w-full bg-[#1c1917] text-[#fafaf9]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <motion.div 
            style={{ 
              opacity: useTransform(smooth, [0, 1], [0.1, 0.4]),
              y: useTransform(smooth, [0, 1], ["0%", "20%"]),
            }}
            className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] bg-[radial-gradient(ellipse_at_bottom,#f97316_0%,transparent_60%)] blur-[120px] opacity-20 mix-blend-screen absolute bottom-[-20%]" 
          />
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 absolute inset-0 mix-blend-overlay"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#fafaf9]/40">
            Inquation / Poetry
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#fafaf9]/40 text-right">
            14
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#f97316] uppercase mb-6 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
              A Poem of Survival
            </p>
            <h2 className="font-heading text-[10vw] md:text-[7vw] lg:text-[5vw] leading-[0.85] tracking-tight text-[#fafaf9] opacity-90" lang="ml">
              യുദ്ധത്തിന്റെ 
              <br />
              <span className="text-[#f97316] text-[7vw] md:text-[5vw] lg:text-[4vw] block mt-4 font-serif italic font-light tracking-wide">നിഴലിൽ</span>
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#f97316] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#fafaf9] leading-[1.4] max-w-4xl whitespace-pre-line" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#fafaf9]/60 mt-8 max-w-2xl italic whitespace-pre-line">
                {item.quote.translation}
              </p>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#f97316]/30 shadow-[0_0_30px_rgba(249,115,22,0.15)] bg-[#f97316]/10">
              <Image 
                src={resolveAsset("hadin.jpg")} 
                alt="Hadin Muhammed" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#f97316] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#fafaf9]" lang="ml">
              ഹാദിൻ മുഹമ്മദ് 
            </h3>
            <p className="font-sans text-sm md:text-base text-[#fafaf9]/50 mt-2 max-w-2xl" lang="ml">
              മൂന്നാം വർഷം, സിവിൽ എഞ്ചിനീയറിങ്
            </p>
            <div className="mt-16">
              <Link
                href="/shadow-of-war"
                className="group inline-flex items-center gap-4 bg-[#f97316] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1c1917] transition-all hover:bg-[#fb923c]"
              >
                <span>Read the Full Poem</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#fafaf9]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#fafaf9]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#fafaf9]/40" lang="ml">
            യുദ്ധത്തിന്റെ നിഴലിൽ
          </div>
        </footer>
      </div>
    </section>
  );
}
