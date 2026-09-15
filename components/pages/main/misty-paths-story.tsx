"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STORY_PARTS = [
  "വയനാട്ടിലെ മഴയ്ക്ക് ഒരു പ്രത്യേക സ്വഭാവമുണ്ട്. അത് വെറുതെ പെയ്യുകയല്ല. ഓർമ്മകളെ നനയ്ക്കും.",
  "ക്യാമ്പസിലെ ആദ്യദിവസം, മൂടൽമഞ്ഞ് കോറിഡോറിലൂടെ നടന്നു വരുന്നത് പോലെ തോന്നി. ചുറ്റും അപരിച്ചിത മുഖങ്ങൾ. പരിചയമില്ലാത്ത ക്ലാസ് റൂമുകൾ. ഭാവിയെ കുറിച്ചുള്ള നൂറുക്കണക്കിന് ചോദ്യങ്ങൾ.",
  "അവിടെ വെച്ചാണ് അവളെ ആദ്യം കണ്ടത്. ജനലരികിലെ ബെഞ്ചിൽ ഇരുന്നു മഴ നോക്കുന്ന ഒരു പെൺകുട്ടി. പേരറിയില്ല, സംസാരിച്ചിട്ടില്ല, പക്ഷേ മഴത്തുള്ളികൾ ജനലിൽ തട്ടിപ്പൊട്ടുമ്പോഴെല്ലാം അവളുടെ കണ്ണുകളിൽ ഒരു കഥയുണ്ടായിരുന്നു.",
  "കാലം കടന്നുപോയി. അപരിചിതർ സുഹൃത്തുക്കളായി. സുഹൃത്തുക്കൾ കുടുംബമായി.",
  "ക്ലാസിൽ അധ്യാപകൻ പഠിപ്പിക്കുമ്പോഴെല്ലാം, അവസാന ബെഞ്ചിലിരുന്ന് ലോകം മാറ്റാനുള്ള പദ്ധതികൾ ആസൂത്രണം ചെയ്തവർ. ലാബിൽ റീഡിങ്ങുകൾ എഴുതിയവർ. രാത്രി രണ്ടുമണിക്ക് ഹോസ്റ്റൽ മുറിയിൽ മാഗ്ഗി പങ്കുവെച്ചവർ.",
  "ആരുടെയെങ്കിലും മനസ്സ് തകരുമ്പോൾ ഒന്നും ചോദിക്കാതെ അടുത്തിരുന്നവർ. അതായിരുന്നു സൗഹൃദം.",
  "ഹോസ്റ്റൽ രാത്രികൾ മറ്റൊരു ലോകമായിരുന്നു. പരീക്ഷയുടെ തലേന്ന് പുസ്തകം തുറന്ന് ഉറങ്ങിപ്പോയവരും ഉറങ്ങാതെ ഇരുന്ന് ഭാവിയെ കുറിച്ച് സംസാരിച്ചവരും. മഴ പെയ്യുന്ന രാത്രികളിൽ ജനലരികിലിരുന്ന് ഓരോരുത്തരും അവരുടെ വീടുകളെക്കുറിച്ച് പറഞ്ഞ കഥകൾ.",
  "അവയിൽ ചിലത് സന്തോഷമായിരുന്നു, ചിലത് നിശബ്ദമായ വേദനകളും. എന്നാൽ ആരും ഒറ്റയ്ക്കായിരുന്നില്ല. കാരണം സൗഹൃദം എന്നത് ചിലപ്പോൾ ഒരു വാക്കല്ല, അടുത്തിരിക്കുന്ന ഒരാളുടെ സാന്നിധ്യമാണ്.",
  "അവളോട് സംസാരിക്കാൻ തുടങ്ങിയതും അങ്ങനെയായിരുന്നു. ഒരു മഴ ദിവസം. കാൻ്റീനിൽ ചായ വാങ്ങാൻ പോയപ്പോൾ.\n\nഅവൾ ചോദിച്ചു: \"മഴയെ ഇഷ്ടമാണോ?\"\nഅവൻ ചിരിച്ചു: \"നിനക്ക്?\"\n\"മഴയെക്കാൾ മഴയിൽ നഷ്ടപ്പെടുന്ന ആളുകളെയാണ് ഇഷ്ടം\"",
  "അന്നുമുതൽ അവളുടെ കഥ ആരംഭിച്ചു. പ്രണയം ഒരിക്കലും വലിയ പ്രഖ്യാപനങ്ങളായിരുന്നില്ല. ലൈബ്രറിയിൽ ഒരേ പുസ്തകത്തിൻ്റെ രണ്ട് അറ്റങ്ങൾ പിടിച്ചിരുന്നതായിരുന്നു. കോറിഡോറിലൂടെ നടന്നുപോകുമ്പോൾ ഒന്നും പറയാതെ ഒരുമിച്ച് മഴ നോക്കിയിരുന്നതായിരുന്നു.",
  "കാൻ്റീനിൽ ഒരു ചായ രണ്ട് പേരായി പങ്കിടുന്നതായിരുന്നു. പറയാത്ത വാക്കുകൾ മനസ്സിലാക്കുന്നതായിരുന്നു.",
  "സെമസ്റ്ററുകൾ കടന്നുപോയി. മൂടൽമഞ്ഞുകൾ വന്നുപോയി. വയനാടിന്റെ കുന്നുകൾ ഓരോ പ്രഭാതവും ക്യാമ്പസിനെ ചേർത്തുപിടിച്ചു. മഴയിന്നും പെയ്തു. സുഹൃത്തുക്കൾ ഇന്നും ചിരിച്ചു.",
  "അവസാന ദിവസം ശൂന്യമായ ക്ലാസ്റൂം. ചുവരുകളിൽ മാഞ്ഞുപ്പോകുന്ന കുറിപ്പുകൾ. കോറിഡോറിൽ മാഞ്ഞുപ്പോകുന്ന കാൽപ്പാടുകൾ. അവൻ ജനലരികിൽ നിന്നു. അവൾ അടുത്തുവന്നു. രണ്ടുപേരും പുറത്തുള്ള മഴയിലേക്ക് നോക്കി.",
  "ഒരുപാട് പറയാനുണ്ടായിരുന്നു പക്ഷേ ഒന്നും പറഞ്ഞില്ല. കാരണം ചില കഥകൾ അവസാനിക്കുമ്പോൾ വാക്കുകൾ വേണ്ടിവരില്ല. അവൾ പോകാൻ തിരിഞ്ഞു. അൽപനേരം കഴിഞ്ഞ് പിന്നിലേക്ക് നോക്കിച്ചിരിച്ചു. അത് അവരുടെ ആദ്യ കൂടിക്കാഴ്ചയിലെ അതേ ചിരിയായിരുന്നു.",
  "വർഷങ്ങൾക്കിപ്പുറം, ജീവിതം പല നഗരങ്ങളിലേക്കും മനുഷ്യരിലേക്കും വഴിത്തിരിഞ്ഞു. സുഹൃത്തുക്കൾ ഓരോരുത്തരും ഓരോ കഥകളായി മാറി.",
  "എന്നാൽ മഴ പെയ്യുമ്പോഴെല്ലാം, ഒരു പഴയ കോറിഡോർ മനസ്സിൽ തെളിയും. ഒരു ക്ലാസ് റൂമും. ഒരു ഹോസ്റ്റൽ മുറി. ഒരു കൂട്ടം സുഹൃത്തുക്കൾ. ഒരു ചായ. ഒരു പ്രണയം.",
  "അപ്പോൾ മനസ്സും മന്ദമായി പറയും:\n\n\"നമ്മൾ കോളേജിൽ പഠിച്ചത് പാഠപുസ്തകങ്ങൾ ആയിരുന്നില്ല സ്നേഹിക്കാനും നഷ്ടപ്പെടാനും ഓർമ്മിക്കാനും ആയിരുന്നു\""
];

export function MistyPathsStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 30, damping: 20 });

  return (
    <section 
      ref={containerRef}
      id="sec-misty-paths-story"
      className="relative w-full bg-black text-white"
      style={{ height: `${(STORY_PARTS.length + 2) * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Subtle, minimal animated noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* IMAGE 1: Appears in the background during the early middle of the story */}
        <motion.div
          style={{
            opacity: useTransform(smooth, [0.15, 0.25, 0.45, 0.55], [0, 0.4, 0.4, 0]),
            scale: useTransform(smooth, [0.15, 0.55], [1, 1.1]),
            filter: "blur(2px)",
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
          <Image 
            src={resolveAsset("anjali-img1.png")} 
            alt="Memory" 
            fill 
            className="object-cover object-center grayscale opacity-60" 
          />
        </motion.div>

        {/* IMAGE 2: Appears in the background during the late middle of the story */}
        <motion.div
          style={{
            opacity: useTransform(smooth, [0.65, 0.75, 0.9, 0.95], [0, 0.4, 0.4, 0]),
            scale: useTransform(smooth, [0.65, 0.95], [1, 1.1]),
            filter: "blur(2px)",
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
          <Image 
            src={resolveAsset("anjali-img2.jpg")} 
            alt="Memory" 
            fill 
            className="object-cover object-center grayscale opacity-60" 
          />
        </motion.div>

        {/* TITLE SLIDE */}
        <motion.div
          style={{
            opacity: useTransform(smooth, [0, 0.04, 0.08], [1, 1, 0]),
            y: useTransform(smooth, [0, 0.08], ["0%", "-50%"])
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
        >
          <p className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase mb-8">
            Anjali Krishna · ECE 3rd Year
          </p>
          <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.2] tracking-wide" lang="ml">
            മഞ്ഞിറങ്ങിയ<br />വഴികൾ
          </h2>
        </motion.div>

        {/* STORY SLIDES */}
        {STORY_PARTS.map((text, i) => {
          const step = 1 / (STORY_PARTS.length + 2);
          const start = (i + 1) * step;
          const end = (i + 2) * step;

          // Fade in for the first 25% of its duration
          const fadeInStart = start - (step * 0.2);
          const fadeInEnd = start + (step * 0.2);
          
          // Fade out for the last 25% of its duration
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
              <p className="font-sans text-2xl md:text-4xl lg:text-5xl font-light leading-[1.8] md:leading-[1.9] text-white/90 whitespace-pre-line" lang="ml">
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
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 border border-white/20 shadow-2xl relative">
            <Image 
              src={resolveAsset("anjali.png")} 
              alt="Anjali Krishna" 
              fill
              className="object-cover grayscale"
            />
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">
            Written by
          </span>
          <h3 className="font-sans text-2xl md:text-3xl text-white/90" lang="ml">
            അഞ്ജലി കൃഷ്ണ
          </h3>
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 mt-4 uppercase">
            3rd Year · ECE
          </p>
        </motion.div>

        {/* Header (Static) */}
        <header className="absolute top-0 w-full z-20 flex items-center justify-between px-6 py-8 md:px-12 md:py-10 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
            Inquation / Memoir
          </div>
          <div className="font-sans text-[10px] text-white/30" lang="ml">
            മഞ്ഞിറങ്ങിയ വഴികൾ
          </div>
        </header>
        
        {/* Progress Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px bg-white/10 z-20">
           <motion.div 
             style={{ scaleX: smooth }} 
             className="w-full h-full bg-white origin-left"
           />
        </div>

      </div>
    </section>
  );
}
