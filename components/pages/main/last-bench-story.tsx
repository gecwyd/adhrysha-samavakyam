"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STORY_PARTS = [
  "ലാസ്റ്റ് ബെഞ്ച് ഒഴികെ ക്ലാസ്റൂം ശൂന്യമായിരുന്നു. നാല് വർഷമായി, അത് രഹസ്യങ്ങൾ കൊണ്ടു നടന്നിരുന്നു. പരീക്ഷകൾക്ക് മുമ്പ് എഴുതിയ സൂത്രവാക്യങ്ങൾ, പൂർത്തിയാകാത്ത കവിതകൾ, മോശം ഫലങ്ങൾക്ക് ശേഷം മറഞ്ഞിരിക്കുന്ന കണ്ണുനീർ, കഠിനമായ പ്രഭാഷണങ്ങളെ പോലും അതിജീവിക്കുന്ന ചിരി.",
  "കോളേജിലെ അവസാന ദിവസം കണ്ണൻ ഒറ്റയ്ക്ക് റൂമിലേക്ക് നടന്നു. വൈകുന്നേരത്തെ സൂര്യപ്രകാശത്തിൽ പൊടി ഒഴുകി. അവസാനത്തെ ബെഞ്ച് ഒഴികെ എല്ലാ മേശകളും അപരിചിതമായി തോന്നി. അവൻ അവസാനമായി അവിടെ ഇരുന്നു.",
  "മരത്തിൽ ഇപ്പോഴും പേരുകളുടെ മങ്ങിയ കൊത്തുപണികൾ ഉണ്ടായിരുന്നു. ചിലത് ദൂരെ മാറിപ്പോയ സുഹൃത്തുക്കളുടേതാണ്, ചിലത് അവൻ സംസാരിക്കാത്ത ആളുകളുടേതാണ്, ഒന്ന് ഒരിക്കൽ അവളുടെ കുറിപ്പുകളും, അറിയാതെ അവൻ്റെ ഹൃദയവും പങ്കിട്ട ഒരു പെൺകുട്ടിയുടെതാണ്.",
  "അവൻ പുഞ്ചിരിച്ചു. ക്ലാസ് മുറിയേക്കാൾ വലിയ സ്വപ്നങ്ങൾക്ക് ബെഞ്ച് സാക്ഷിയായിരുന്നു. സംഗീതജ്ഞതരാകാൻ ആഗ്രഹിച്ച എഞ്ചിനീയർമാർ. ഭാവി കോഡറുകൾക്കുള്ളിൽ കുടുങ്ങിയ എഴുത്തുകാർ. ഉറങ്ങുന്ന വിദ്യാർത്ഥികളുടെ വേഷം ധരിച്ച വിപ്ലവകാരികൾ.",
  "പെട്ടെന്ന് വീശിയടിച്ച കാറ്റ് സമീപത്ത് കിടന്ന മറന്നുപോയ ഒരു നോട്ട്ബുക്ക് തുറന്നു. അവസാന പേജിൽ, തിടുക്കപ്പെട്ട കൈയക്ഷരത്തിൽ എഴുതിയ വാക്കുകൾ:\n\n\"ഒരു ദിവസം നമുക്ക് ഊഹിക്കാവുന്നതിലും കൂടുതൽ ഈ സ്ഥലം നഷ്ടമാകും\"",
  "കണ്ണൻ ചുറ്റും നോക്കിയപ്പോൾ ആ ദിവസം വന്നിരിക്കുന്നുവെന്ന് മനസ്സിലായി. പോകുമ്പോൾ ലാസ്റ്റ് ബെഞ്ചിൽ മെല്ലെ തൊട്ടു. ഫർണിച്ചർ പോലെയല്ല. എന്നാൽ അവനോടൊപ്പം നിശബ്ദമായി വളർന്ന ഒരു സുഹൃത്ത് എന്ന നിലയിൽ. ഒരു നിമിഷത്തേക്ക്, ശൂന്യമായ ക്ലാസ് മുറി വീണ്ടും നിറഞ്ഞതായി തോന്നി."
];

export function LastBenchStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 30, damping: 20 });

  return (
    <section 
      ref={containerRef}
      id="sec-last-bench-story"
      className="relative w-full bg-[#080604] text-[#d9cca5]"
      style={{ height: `${(STORY_PARTS.length + 2) * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Very subtle vintage paper noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* Golden hour / dust motes very subtle glow in the background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
           <div className="w-[100vw] h-[50vw] bg-[radial-gradient(ellipse_at_center,#d9cca5_0%,transparent_60%)] blur-[100px] mix-blend-screen" />
        </div>

        {/* TITLE SLIDE */}
        <motion.div
          style={{
            opacity: useTransform(smooth, [0, 0.08, 0.12], [1, 1, 0]),
            y: useTransform(smooth, [0, 0.12], ["0%", "-50%"])
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
        >
          <p className="font-mono text-[10px] tracking-[0.4em] text-[#d9cca5]/30 uppercase mb-8">
            Anjali Krishna · ECE 3rd Year
          </p>
          <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl font-light text-[#d9cca5] leading-[1.2] tracking-wide" lang="ml">
            ലാസ്റ്റ്<br />
            <span className="font-serif italic text-[#d9cca5]/60">ബെഞ്ച്</span>
          </h2>
        </motion.div>

        {/* STORY SLIDES */}
        {STORY_PARTS.map((text, i) => {
          const step = 1 / (STORY_PARTS.length + 2);
          const start = (i + 1) * step;
          const end = (i + 2) * step;

          const fadeInStart = start - (step * 0.2);
          const fadeInEnd = start + (step * 0.2);
          const fadeOutStart = end - (step * 0.2);
          const fadeOutEnd = end + (step * 0.2);

          const opacity = useTransform(
            smooth,
            [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
            [0, 1, 1, 0]
          );

          const y = useTransform(
            smooth,
            [fadeInStart, fadeOutEnd],
            ["40px", "-40px"]
          );
          
          const blur = useTransform(
            smooth,
            [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
            ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
          );

          return (
            <motion.div
              key={i}
              style={{ opacity, y, filter: blur }}
              className="absolute inset-0 flex items-center justify-center px-6 md:px-16 lg:px-32 text-center pointer-events-none"
            >
              <p className="font-sans text-3xl md:text-5xl lg:text-6xl font-light leading-[1.7] md:leading-[1.8] text-[#d9cca5] whitespace-pre-line drop-shadow-sm" lang="ml">
                {text}
              </p>
            </motion.div>
          );
        })}

        {/* AUTHOR SLIDE */}
        <motion.div
          style={{
            opacity: useTransform(
              smooth,
              [(STORY_PARTS.length + 0.8) / (STORY_PARTS.length + 2), (STORY_PARTS.length + 1) / (STORY_PARTS.length + 2)],
              [0, 1]
            ),
            y: useTransform(
              smooth,
              [(STORY_PARTS.length + 0.8) / (STORY_PARTS.length + 2), (STORY_PARTS.length + 1) / (STORY_PARTS.length + 2)],
              ["40px", "0px"]
            )
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border border-[#d9cca5]/20 shadow-2xl relative">
            <Image 
              src={resolveAsset("anjali.png")} 
              alt="Anjali Krishna" 
              fill
              className="object-cover grayscale mix-blend-luminosity opacity-80"
            />
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#d9cca5]/30 uppercase mb-4">
            Written by
          </span>
          <h3 className="font-sans text-2xl md:text-3xl text-[#d9cca5]/90" lang="ml">
            അഞ്ജലി കൃഷ്ണ
          </h3>
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#d9cca5]/40 mt-4 uppercase">
            3rd Year · ECE
          </p>
        </motion.div>

        {/* Header (Static) */}
        <header className="absolute top-0 w-full z-20 flex items-center justify-between px-6 py-8 md:px-12 md:py-10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d9cca5]/30">
            Memoir
          </div>
          <div className="font-sans text-[10px] text-[#d9cca5]/30" lang="ml">
            ലാസ്റ്റ് ബെഞ്ച്
          </div>
        </header>
        
        {/* Progress Line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-[#d9cca5]/10 z-20 overflow-hidden">
           <motion.div 
             style={{ scaleX: smooth }} 
             className="w-full h-full bg-[#d9cca5]/50 origin-left"
           />
        </div>

      </div>
    </section>
  );
}
