"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const STANZAS = [
  [
    "ഒച്ചയും ബഹളവും നിറഞ്ഞ ആ വീട്ടിൽ",
    "അന്ന് ആരും ആ ഘടികാരത്തെ കേൾക്കാൻ തയ്യാറായിരുന്നില്ല.",
    "ദിവസവും കണ്ണുകൾ അതിൽ പതിയുമെങ്ങിലും",
    "ചെവിക്കൊടുകാൻ ആരും തയ്യറായിരുന്നില്ല…",
    "ഞാനും.!!",
  ],
  [
    "എന്നാൽ ഇന്ന്,",
    "നിശബ്ദത നിറഞ്ഞ ഏകാന്തതയിൽ",
    "അവൾ അതിനെ ശ്രവിച്ചുകൊണ്ടേയിരുന്നു …",
  ],
  [
    "ഒച്ചയും ബഹളവും ഇല്ലാഞ്ഞിട്ടോ??",
    "അതോ,",
    "അതിനെ ഒന്ന് മനസറിഞ്ഞ് കേൾക്കാം എന്നവണ്ണമോ???",
  ],
  [
    "അവൾ അതിനെ കേട്ടുകൊണ്ടേയിരുന്നു...",
    "അതിനെമാത്രം.",
  ],
  [
    "ടിക്…",
    "ടിക്…",
    "ടിക്... !!!!!!",
  ],
];

function StanzaBlock({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 55%"] // Fades in as it approaches the center
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div 
      ref={ref} 
      style={{ opacity, y }} 
      className="mb-20 sm:mb-28 flex flex-col gap-3 sm:gap-4 items-center text-center will-change-[opacity,transform]"
    >
      {lines.map((line, i) => (
        <p 
          key={i} 
          className="font-sans font-light text-[22px] sm:text-[26px] md:text-[32px] leading-[1.6] sm:leading-[1.8] text-[#d9d4c7] tracking-tight" 
          lang="ml"
        >
          {line}
        </p>
      ))}
    </motion.div>
  );
}

export function TickTickTick() {
  return (
    <section
      id="sec-j"
      aria-labelledby="tick-tick-tick-title"
      className="relative w-full bg-[#11100e] text-[#d9d4c7] overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-32 pb-16 md:pt-48">
         
         {/* Minimal Header */}
         <div className="flex flex-col items-center text-center mb-24 md:mb-40">
           <motion.div 
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-12"
           >
             <div className="w-[1px] h-16 sm:h-24 bg-[#d9d4c7]/20" />
             <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#d9d4c7]/60">
               A poem about time
             </p>
           </motion.div>
           
           <motion.h2
             id="tick-tick-tick-title"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 1 }}
             className="font-heading text-[18vw] sm:text-[14vw] md:text-[120px] lg:text-[140px] leading-[0.8] tracking-[-0.02em] text-[#d9d4c7]"
             lang="ml"
           >
              ടിക്... ടിക്...
           </motion.h2>
         </div>

         {/* Core Reading Experience - Standard Scroll Grid */}
         <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center pb-20">
            {STANZAS.map((stanza, i) => (
               <StanzaBlock key={i} lines={stanza} />
            ))}
         </div>

         {/* Minimal Author Lockup */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
           transition={{ duration: 0.8 }}
           className="mt-16 md:mt-24 mb-16 flex justify-center"
         >
            <div className="flex flex-col items-center text-center pt-16 w-full max-w-md">
               <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700 border border-[#d9d4c7]/20 mb-6 sm:mb-8">
                  <Image 
                    src="/r-s-sreelakshmi.png" 
                    alt="Author portrait of R S Sreelakshmi" 
                    fill 
                    sizes="128px" 
                    className="object-cover" 
                  />
               </div>
               <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#d9d4c7]/60 mb-2 sm:mb-3">
                 Written by
               </span>
               <span className="font-sans text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#d9d4c7] mb-2 sm:mb-3">
                 R S Sreelakshmi
               </span>
               <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-[#d9d4c7]/40">
                 First year · Electronics & Communication
               </span>
            </div>
         </motion.div>

      </div>
      
      <footer className="w-full border-t border-[#d9d4c7]/5">
        <div className="mx-auto max-w-[1440px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#d9d4c7]/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Author · R S Sreelakshmi</span>
          <span>College Union 2026–27 · Source page 19</span>
        </div>
      </footer>
    </section>
  );
}

export default TickTickTick;
