"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import { Clock } from "lucide-react";

const STANZAS = [
  [
    "ഒച്ചയും ബഹളവും നിറഞ്ഞ ആ വീട്ടിൽ",
    "അന്ന് ആരും ആ ഘടികാരത്തെ കേൾക്കാൻ തയ്യാറായിരുന്നില്ല.",
    "ദിവസവും കണ്ണുകൾ അതിൽ പതിയുമെങ്ങിലും",
    "ചെവിക്കൊടുകാൻ ആരും തയ്യറായിരുന്നില്ല…",
    "ഞാനും.!!"
  ],
  [
    "എന്നാൽ ഇന്ന്,",
    "നിശബ്ദത നിറഞ്ഞ ഏകാന്തതയിൽ",
    "അവൾ അതിനെ ശ്രവിച്ചുകൊണ്ടേയിരുന്നു …"
  ],
  [
    "ഒച്ചയും ബഹളവും ഇല്ലാഞ്ഞിട്ടോ??",
    "അതോ,",
    "അതിനെ ഒന്ന് മനസറിഞ്ഞ് കേൾക്കാം എന്നവണ്ണമോ???"
  ],
  [
    "അവൾ അതിനെ കേട്ടുകൊണ്ടേയിരുന്നു...",
    "അതിനെമാത്രം."
  ],
  [
    "ടിക്…",
    "ടിക്…",
    "ടിക്... !!!!!!"
  ]
];

function StanzaBlock({ lines }: { lines: string[] }) {
  return (
    <div className="mb-20 sm:mb-24 flex flex-col gap-3 items-start">
      {lines.map((line, i) => (
        <p 
          key={i} 
          className="font-sans font-light text-[22px] sm:text-[26px] md:text-[34px] lg:text-[40px] leading-[1.6] sm:leading-[1.7] text-white/90 tracking-tight drop-shadow-sm" 
          lang="ml"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export function TickTickTick() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });
  const rotate = useTransform(smoothProgress, [0, 1], [0, 720]);

  return (
    <section
      ref={containerRef}
      id="sec-tick"
      className="relative w-full bg-[#030303] text-white selection:bg-white/20"
    >
      {/* Ambient background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <Image 
          src={resolveAsset("tick-tick-art.webp")}
          alt="Time Background"
          fill
          className="object-cover object-center opacity-15 filter blur-[2px] brightness-50"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-20 pb-32 flex flex-col lg:flex-row relative">
        
        {/* Left Sticky Column */}
        <div className="lg:w-5/12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center pt-8 lg:pt-0 pb-12 lg:pb-0 z-10">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
             transition={{ duration: 1, ease: "easeOut" }}
           >
             <div className="flex items-center mb-6 lg:mb-8">
               <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/50">
                 A Poem About Time
               </p>
             </div>
             
             <h2 
                className="font-heading text-[16vw] sm:text-[12vw] lg:text-[96px] xl:text-[110px] leading-[0.85] tracking-tight text-[#f5f5f5] mb-6" 
                lang="ml"
             >
                ടിക്...<br />ടിക്...
             </h2>
             
             <div className="flex items-center gap-4 text-white/40 border-l border-white/10 pl-5 ml-1 mb-8">
               <motion.div style={{ rotate }} className="origin-center">
                 <Clock className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
               </motion.div>
               <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                 Time passes in silence
               </span>
             </div>

             {/* Illustration Card */}
             <div className="relative w-full max-w-[340px] aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                <Image 
                  src={resolveAsset("tick-tick-art.webp")}
                  alt="Illustration of woman listening to the clock"
                  fill
                  className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                  unoptimized
                />
             </div>
           </motion.div>
        </div>

        {/* Right Scroll Column */}
        <div className="lg:w-7/12 flex flex-col lg:pt-[35vh] pb-[10vh] relative z-10 pl-0 lg:pl-16 xl:pl-24">
           {STANZAS.map((stanza, i) => (
             <StanzaBlock key={i} lines={stanza} />
           ))}

           {/* Minimal Author Block */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="mt-20 lg:mt-32 pt-16 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
           >
             <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ring-1 ring-white/10 shrink-0">
                <Image 
                  src={resolveAsset("avani-manoj.png")} 
                  alt="Author portrait of R S Sreelakshmi" 
                  fill 
                  sizes="96px" 
                  unoptimized
                  className="object-cover" 
                />
             </div>
             <div className="flex flex-col">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                  Written by
                </span>
                <span className="font-sans text-2xl sm:text-3xl tracking-tight text-white/90 mb-2">
                  R S Sreelakshmi
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                  First year · Electronics & Communication
                </span>
             </div>
           </motion.div>
        </div>
      </div>
      
      {/* Footer minimal */}
      <footer className="w-full border-t border-white/5 bg-[#030303] relative z-10">
        <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-10 lg:px-16 flex flex-col gap-4 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <span>Author · R S Sreelakshmi</span>
          <span>College Union 2026–27 · Source page 19</span>
        </div>
      </footer>
    </section>
  );
}

