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
    text: "ഒരു പെൺകുട്ടിയുടെ കഴിവിനോ വിദ്യാഭ്യാസത്തിനോ പകരം അവൾക്ക് നൽകാൻ കഴിയുന്ന സ്ത്രീധനത്തിന്റെ അളവാണ് പലപ്പോഴും വിലയിരുത്തപ്പെടുന്നത്.",
    translation: "Often, a girl is evaluated not by her ability or education, but by the amount of dowry she can provide.",
  },
  {
    tag: "02 / THE TRAGEDY",
    text: "സ്ത്രീയും പുരുഷനും തുല്യരാണെന്ന് പറയുന്ന സമൂഹത്തിൽ സ്ത്രീധനം പോലുള്ള ആചാരങ്ങൾക്ക് സ്ഥാനമില്ല. നിയമം നിരോധിച്ചിട്ടുണ്ടെങ്കിലും അത് പൂർണമായും ഇല്ലാതായിട്ടില്ല.",
    translation: "In a society that claims men and women are equal, customs like dowry have no place. Though banned by law, it has not completely disappeared.",
  },
  {
    tag: "03 / THE RESOLUTION",
    text: "വിദ്യാഭ്യാസവും പുരോഗതിയും യഥാർത്ഥ അർഥത്തിൽ നേടണമെങ്കിൽ സ്ത്രീധനം എന്ന പഴഞ്ചൻ ചങ്ങല പൊട്ടിച്ചെറിയണം.",
    translation: "To truly achieve education and progress, the old chain of dowry must be broken.",
  }
];

export function Dowry() {
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
      id="sec-dowry" 
      className="relative h-[500vh] w-full bg-[#111827] text-[#f8fafc]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <div className="w-px h-[100vh] bg-[#e11d48] absolute left-1/4" />
          <div className="w-px h-[100vh] bg-[#e11d48] absolute right-1/4" />
          <div className="w-[100vw] h-px bg-[#e11d48] absolute top-1/2" />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#f8fafc]/40">
            Inquation / Opinion
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#f8fafc]/40 text-right">
            08
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#e11d48] uppercase mb-6">
              A Voice Against The Chains
            </p>
            <h2 className="font-heading text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.85] tracking-tight text-[#f8fafc]">
              DOWRY
              <br />
              <span className="text-[#e11d48] text-[5vw] md:text-[3vw] block mt-6 font-serif italic font-light tracking-wide">The Old Chain Behind Progress</span>
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#e11d48] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#f8fafc] leading-[1.4] max-w-4xl" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#f8fafc]/60 mt-8 max-w-2xl italic">
                {item.quote.translation}
              </p>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#e11d48]/30 shadow-[0_0_30px_rgba(225,29,72,0.15)] bg-[#e11d48]/10">
              <Image 
                src={resolveAsset("shaheer.png")} 
                alt="Ahammed Shaheer" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#e11d48] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#f8fafc]" lang="ml">
              അഹമ്മദ് ഷഹീർ 
            </h3>
            <p className="font-sans text-sm md:text-base text-[#f8fafc]/50 mt-2 max-w-2xl" lang="ml">
              രണ്ടാം വർഷം, മെക്കാനിക്കൽ എഞ്ചിനീയറിങ്
            </p>
            <div className="mt-16">
              <Link
                href="/dowry"
                className="group inline-flex items-center gap-4 bg-[#e11d48] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f8fafc] transition-all hover:bg-[#be123c]"
              >
                <span>Read the Full Essay</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#f8fafc]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#f8fafc]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#f8fafc]/40" lang="ml">
            സ്ത്രീധനം
          </div>
        </footer>
      </div>
    </section>
  );
}
