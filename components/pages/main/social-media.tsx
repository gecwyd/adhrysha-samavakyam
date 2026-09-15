"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const SUMMARY = [
  {
    tag: "01 / THE VIRTUAL WORLD",
    text: "സാധ്യതകളുടെ ഒരു സമാഹാരമാണ് സോഷ്യൽമീഡിയ. വിവരങ്ങൾ വിരൽത്തുമ്പിലെത്തിക്കാനും ആശയവിനിമയം നടത്താനും ഇത് ആവശ്യമാണ്.",
    translation: "Social media is a collection of possibilities. It brings information to your fingertips.",
  },
  {
    tag: "02 / THE DARK SIDE",
    text: "മറുവശത്തോ സോഷ്യൽമീഡിയോടുള്ള അമിതമായ ആസക്തി ഒരു മാനസികരോഗ അവസ്ഥയായി മാറുന്നു. അനേകം ചതിക്കുഴികൾക്കുള്ള വേദി കൂടിയായി ഇത് മാറുന്നു.",
    translation: "On the other hand, extreme addiction turns into a psychological condition. It becomes a stage for many traps.",
  },
  {
    tag: "03 / THE REALITY",
    text: "സോഷ്യൽ മീഡിയ ഒരു ശാപമോ വരമോ അല്ല, അത് ഉപയോഗിക്കുന്ന മനുഷ്യന്റെ കൈകളിലെ ഒരു ഉപകരണമാണ്.",
    translation: "Social media is neither a curse nor a boon, it is a tool in human hands.",
  }
];

export function SocialMedia() {
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
      id="sec-social-media" 
      className="relative h-[500vh] w-full bg-[#1e2329] text-[#e0e1dd]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <div className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] border-[1px] border-[#e0e1dd] rounded-full absolute" />
          <div className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] border-[1px] border-[#e0e1dd] rounded-full absolute" />
          <div className="w-[90vw] h-[90vw] md:w-[40vw] md:h-[40vw] border-[1px] border-[#e0e1dd] rounded-full absolute" />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0e1dd]/40">
            Inquation / Perspective
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0e1dd]/40 text-right">
            04
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#78a890] uppercase mb-6">
              A critical view on connection
            </p>
            <h2 className="font-heading text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.85] tracking-tight text-[#e0e1dd]">
              SOCIAL MEDIA
              <br />
              <span className="text-[#78a890] text-[5vw] md:text-[4vw] block mt-6 font-serif italic font-light tracking-wide">Possibility or Liability?</span>
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
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#78a890] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#e0e1dd] leading-[1.4] max-w-4xl" lang="ml">
                &ldquo;{item.quote.text}&rdquo;
              </h3>
              <p className="font-serif text-sm md:text-lg text-[#e0e1dd]/60 mt-8 max-w-2xl italic">
                {item.quote.translation}
              </p>
            </motion.div>
          ))}

          {/* Final CTA */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border-2 border-[#78a890]/30 shadow-[0_0_30px_rgba(120,168,144,0.15)] bg-[#78a890]/10">
              <Image 
                src={resolveAsset("adharsh.png")} 
                alt="Adharsh P" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#78a890] uppercase mb-4">
              Written by
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#e0e1dd]">
              Adharsh . P
            </h3>
            <p className="font-sans text-sm md:text-base text-[#e0e1dd]/50 mt-2 max-w-2xl">
              1st Year, Civil Engineering
            </p>
            <div className="mt-16">
              <Link
                href="/social-media"
                className="group inline-flex items-center gap-4 bg-[#78a890] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1e2329] transition-all hover:bg-[#e0e1dd]"
              >
                <span>Read the Full Essay</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#e0e1dd]/10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0e1dd]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#e0e1dd]/40" lang="ml">
            സോഷ്യൽ മീഡിയ
          </div>
        </footer>
      </div>
    </section>
  );
}
