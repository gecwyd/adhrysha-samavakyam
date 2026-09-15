"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { resolveAsset } from "@/lib/asset-registry";

const STORY_PARAGRAPHS = [
  "കിഴക്കൻ മലയോര ഗ്രാമത്തിലെ ചെറിയ ഓലമേഞ്ഞ വീടിന്റെ ഉമ്മറത്ത് മണ്ണെണ്ണവിളക്കിന്റെ മങ്ങിയ വെളിച്ചത്തിൽ പതിനാലുകാരനായ അപ്പു ഇരിക്കുകയായിരുന്നു. അവന്റെ മുന്നിൽ തുറന്നുവെച്ച പുസ്തകത്തിലെ അക്ഷരങ്ങൾ കുറഞ്ഞ പ്രകാശത്തിൽ നൃത്തം ചെയ്യുന്നുണ്ട്, ആ ദിവസം മുഴുവൻ പണിയെടുത്തതിന്റെ തളർച്ചയോടെ ഇരിക്കുകയായിരുന്നു അവന്റെ മുത്തശ്ശൻ മാധവൻ. മാധവന്റെ കൈകൾ പരുക്കനായിരുന്നു; ജീവിതത്തിലെ ദാരിദ്ര്യത്തോടും കഷ്ടപ്പാടുകളോടും പടവെട്ടി ഉണ്ടായ തഴമ്പുകൾ ആ കൈകളിൽ വ്യക്തമായി കാണാമായിരുന്നു. സ്വന്തമായി പേരെഴുതാൻ പോലും അറിയാത്ത, അക്ഷരങ്ങളുടെ ലോകം അന്യമായിരുന്ന ഒരു സാധാരണ മനുഷ്യനായിരുന്നു അദ്ദേഹം. പക്ഷേ, തന്റെ ഏക മകനായ രാമുവിൻ്റെ മരണശേഷം അനാഥനായ കൊച്ചുമകൻ അപ്പുവിനെ ഒരു ഉന്നത നിലയിൽ എത്തിക്കണമെന്നത് മാത്രമായിരുന്നു ആ വൃദ്ധന്റെ ഏക സ്വപ്നം. രാത്രിയേറെ വൈകിയിട്ടും അപ്പു പുസ്തകം അടച്ചുവെച്ചില്ല. പക്ഷേ, അവന്റെ മനസ്സിൽ പഠനമായിരുന്നില്ല. കഴിഞ്ഞ കുറച്ചു ദിവസങ്ങളായി മുത്തശ്ശൻ അനുഭവിക്കുന്ന ശ്വാസംമുട്ടലും, മരുന്നിനായി പണമില്ലാതെ വിഷമിക്കുന്നതും അവൻ കാണുന്നുണ്ടായിരുന്നു. വീട്ടുവാടക കൊടുക്കാൻ പോലും വകയില്ലാതെ ആ വൃദ്ധൻ വീടുവീടാന്തരം കയറിയിറങ്ങി പണിയെടുക്കുന്നത് അവന്റെ കുഞ്ഞു മനസ്സിൽ വലിയൊരു ഭാരമായി മാറി. പെട്ടെന്ന് അപ്പു പുസ്തകം മടക്കിവെച്ച് മുത്തശ്ശന്റെ അരികിലേക്ക് നടന്നു. അവന്റെ കണ്ണുകൾ നിറഞ്ഞിട്ടുണ്ടായിരുന്നു.",
  "\"മുത്തശ്ശാ... ഞാൻ നാളെ മുതൽ സ്കൂളിൽ പോകുന്നില്ല. ടൗണിലെ രഘുവേട്ടന്റെ ചായക്കടയിൽ പണിക്ക് നിർത്തിക്കോളാമെന്ന് അദ്ദേഹം പറഞ്ഞിട്ടുണ്ട്. അതിൽ നിന്ന് ലഭിക്കുന്ന വരുമാനം കൊണ്ട് വാടകയും മരുന്നുമെല്ലാം വാങ്ങാം. ഞാൻ പഠിച്ചിട്ട് ഇനി എന്ത് ചെയ്യാനാണ്?\"",
  "അപ്പുവിന്റെ വാക്കുകൾ കേട്ട് മാധവന്റെ നെഞ്ച് പിടഞ്ഞു. വൃദ്ധന്റെ കണ്ണുകളിൽ നിന്ന് കണ്ണുനീർ താഴേക്ക് അടർന്നുവീണു. അദ്ദേഹം അപ്പുവിന്റെ ചെറിയ കൈകൾ തന്റെ പരുക്കൻ കൈകൾക്കുള്ളിലാക്കി. അപ്പു മുത്തശ്ശൻ്റെ മുഖത്തിലെ അടർന്നു വീണ കണ്ണീർ തുള്ളികൾ തുടച്ച് മാറ്റിയിട്ട് ശ്രദ്ധയോടെ മുത്തശ്ശൻ്റെ മുഖത്തേക്ക് നോക്കി നിന്നു.",
  "\"അപ്പു...\" മാധവന്റെ ശബ്ദം വിറയ്ക്കുന്നുണ്ടായിരുന്നു. അദ്ദേഹം അവനെ തന്റെ അരികിലേക്ക് ഇരുത്തി, താൻ നെഞ്ചിൽ ഒളിപ്പിച്ചുവെച്ച ഏറ്റവും വലിയ മുറിവ് തുറന്നു പറയാൻ തുടങ്ങി. \"നിനക്കറിയാമോ അപ്പു, എന്തിനാണ് ഞാൻ ഈ തളർന്ന ശരീരവും വെച്ച് നിന്നെ പഠിപ്പിക്കാൻ ഓടുന്നത് എന്ന്? വർഷങ്ങൾക്ക് മുൻപ്, നിന്റെ അച്ഛൻ ജനിക്കുന്നതിനും മുൻപ്, എനിക്ക് ഈ ഗ്രാമത്തിന്റെ അതിർത്തിയിൽ കുറച്ചു ഭൂമിയുണ്ടായിരുന്നു. കഠിനാധ്വാനം ചെയ്ത് ഞാൻ ഉണ്ടാക്കിയതായിരുന്നു അത്. ഒരു ദിവസം ഗ്രാമത്തിലെ വലിയൊരു പ്രമാണി ചില കടലാസുകളുമായി എന്റെ അടുക്കൽ വന്നു. പണം തരാമെന്ന് പറഞ്ഞ് എന്നെ വിശ്വസിപ്പിച്ചു. ആ കടലാസിൽ എന്താണ് എഴുതിയിരിക്കുന്നതെന്ന് വായിക്കാൻ എനിക്ക് അറിയില്ലായിരുന്നു. ഞാൻ അതിൽ എന്റെ വിരലടയാളം പതിപ്പിച്ചു...\" മാധവൻ ഒന്നു നിർത്തി, ഒരു ദീർഘശ്വാസമെടുത്തു. അദ്ദേഹത്തിന്റെ മുഖത്ത് ആ പഴയ ചതിയുടെ വേദന വീണ്ടും നിഴലിച്ചു.",
  "\"കുറച്ചു ദിവസങ്ങൾ കഴിഞ്ഞപ്പോൾ അവർ എന്നെ എന്റെ സ്വന്തം മണ്ണിൽ നിന്ന് ഇറക്കിവിട്ടു. ഞാൻ ഒപ്പിട്ടു നൽകിയത് ആ ഭൂമി അവർക്ക് എഴുതിക്കൊടുക്കുന്ന ആധാരത്തിലായിരുന്നു! എനിക്ക് അക്ഷരം അറിയാമായിരുന്നെങ്കിൽ, ആ കടലാസിൽ എഴുതിയ ചതി ഞാൻ വായിച്ചറിയുമായിരുന്നു. അന്ന് അക്ഷരമില്ലാത്തതുകൊണ്ട് മാത്രം എനിക്ക് എന്റെ മണ്ണും മാനവും നഷ്ടപ്പെട്ടു. ഒരു മൃഗത്തെപ്പോലെ ഞാൻ ജീവിക്കേണ്ടി വന്നു. ഒരു വിരലടയാളം എന്റെ ജീവിതം മുഴുവൻ ഇരുട്ടിലാക്കി.\" മുത്തശ്ശന്റെ വാക്കുകൾ കേട്ട് അപ്പു നിശബ്ദനായി. വിദ്യാഭ്യാസം എന്നത് വെറുമൊരു ജോലി നേടാനുള്ള വഴി മാത്രമല്ല, മറിച്ച് ഈ ലോകത്ത് തലയുയർത്തി ജീവിക്കാനുള്ള ആയുധമാണെന്ന് അവൻ തിരിച്ചറിയുകയായിരുന്നു.",
  "മാധവൻ അപ്പുവിന്റെ മുഖം കൈകളിൽ കോരിയെടുത്ത് പറഞ്ഞു: \"അപ്പു, ദാരിദ്ര്യം താൽക്കാലികമാണ്. പക്ഷേ, അറിവില്ലായ്മ ശാശ്വതമായ ഇരുട്ടാണ്. ഞാൻ നിനക്ക് നൽകുന്നത് പണമോ സ്വത്തോ അല്ല. ഈ ലോകത്ത് ആർക്കും നിന്നിൽ നിന്ന് മോഷ്ടിക്കാൻ കഴിയാത്ത വിദ്യാഭ്യാസം എന്ന വെളിച്ചമാണ്. നീ പഠിക്കണം. നിന്റെ മുന്നിൽ വരുന്ന ഒരു കടലാസിനെയും നിനക്ക് ഭയപ്പെടേണ്ടി വരരുത്. ആരും നിന്നെ ചതിക്കരുത്. നിന്റെ മുത്തശ്ശന്റെ ഈ പരുക്കൻ കൈകളുടെ വില നിന്റെ അക്ഷരങ്ങളാവണം.\" മുത്തശ്ശന്റെ നെഞ്ചിലെ ആഴമേറിയ വികാരങ്ങളും വിദ്യാഭ്യാസത്തോടുള്ള ആദരവും അപ്പുവിന്റെ ഉള്ളിൽ ഒരു തീപ്പൊരിയായി മാറി. അവൻ തന്റെ കണ്ണീർ തുടച്ചു.",
  "അടുത്ത ദിവസം രാവിലെ, സൂര്യൻ ഉദിച്ചുയർന്നപ്പോൾ അപ്പു തന്റെ സ്കൂൾ ബാഗും തോളിലിട്ട് മുറ്റത്തേക്ക് ഇറങ്ങി. അവന്റെ കണ്ണുകളിൽ മുൻപെങ്ങുമില്ലാത്ത ഒരു ദൃഢനിശ്ചയമുണ്ടായിരുന്നു. മാധവൻ അവനെ നല്ല സന്തോഷത്തോടെ സ്കൂളിൽ പറഞ്ഞയച്ചു, തന്റെ കൊച്ചുമകനിലൂടെ വരാൻ പോകുന്ന ഒരു വലിയ വെളിച്ചത്തിന്റെ പ്രതീക്ഷയോടെയായിരുന്നു. അപ്പു സ്കൂളിലേക്ക് നടന്നു നീങ്ങുമ്പോൾ അവന്റെ കൈയിലിരുന്ന പുസ്തകങ്ങൾ വെറുമൊരു ഭാരമായിരുന്നില്ല, മറിച്ച് തന്റെ തലമുറയുടെ ഇരുട്ടു മാറ്റാൻ പോകുന്ന വെളിച്ചത്തിന്റെ വിത്തുകളായിരുന്നു."
];

function StoryParagraph({ text, index }: { text: string; index: number }) {
  // Indent alternate paragraphs for a more editorial, rhythmic reading experience
  const isDialogue = text.startsWith('"');
  const indentClass = isDialogue
    ? "md:ml-24 border-l-2 border-[#eab308]/40 pl-6 my-16 text-[#eab308]/90 italic"
    : index % 2 === 0
    ? "md:mr-16 my-20"
    : "md:ml-16 my-20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${indentClass}`}
    >
      <p
        className="font-sans text-[22px] md:text-[26px] lg:text-[30px] font-light leading-[1.8] text-[#fff8e7]/90 text-justify sm:text-left tracking-wide"
        lang="ml"
      >
        {text}
      </p>
    </motion.div>
  );
}

export function SeedsOfLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const glowingLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const pulseOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  return (
    <section
      id="sec-seeds-of-light"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-[#fff8e7] font-sans selection:bg-[#eab308]/30 selection:text-white overflow-hidden"
    >
      {/* Dynamic Glowing Background representing the Kerosene Lamp */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none mix-blend-screen"
        style={{ 
          background: "radial-gradient(circle at center, rgba(234, 179, 8, 0.08) 0%, transparent 70%)",
          opacity: pulseOpacity 
        }}
      />

      <div className="mx-auto w-full max-w-[1000px] px-6 sm:px-10 lg:px-16 pt-32 pb-40 relative z-10">
        
        {/* Header / Title Area */}
        <div className="flex flex-col items-center text-center gap-12 mb-32 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#eab308]/50 to-[#eab308] mb-8" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#eab308]/70 uppercase mb-8">
              Short Story
            </p>
            <h2 
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-wide leading-[1.2] text-[#fff8e7] mb-6 drop-shadow-[0_0_40px_rgba(234,179,8,0.2)]"
              lang="ml"
            >
              വെളിച്ചത്തിൻ്റെ
              <br />
              <span className="font-serif italic text-[#eab308]">വിത്തുകൾ</span>
            </h2>
            <p className="font-serif text-xl md:text-2xl text-white/40 italic tracking-widest mt-4">
              Seeds of Light
            </p>
          </motion.div>
        </div>

        {/* Story Content with Animated Glowing Thread */}
        <div className="relative w-full">
          
          {/* Animated Thread of Light down the center */}
          <div className="absolute left-0 md:left-[-40px] top-0 bottom-0 w-[1px] bg-white/5">
            <motion.div 
              className="w-full bg-gradient-to-b from-transparent via-[#eab308] to-[#eab308]/20 shadow-[0_0_15px_rgba(234,179,8,0.6)]"
              style={{ height: glowingLineHeight }}
            />
            {/* The 'Seed' traveling down the thread */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#eab308] shadow-[0_0_15px_rgba(234,179,8,1)]"
              style={{ top: glowingLineHeight }}
            />
          </div>

          <div className="flex flex-col pl-6 md:pl-0">
            {STORY_PARAGRAPHS.map((text, i) => (
              <StoryParagraph key={i} text={text} index={i} />
            ))}
          </div>

        </div>

        {/* Author Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-32 pt-16 border-t border-white/10 flex flex-col items-center justify-center gap-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden relative border border-[#eab308]/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
            <Image 
              src={resolveAsset("muhammad-sinan.png")}
              alt="Muhammad Sinan E" 
              fill
              className="object-cover sepia-[0.3] hover:sepia-0 transition-all duration-700"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-[9px] tracking-[0.4em] text-white/30 uppercase mb-2">
              Written by
            </span>
            <span className="font-sans text-2xl md:text-3xl font-light tracking-wide text-[#fff8e7] mb-2" lang="ml">
              മുഹമ്മദ് സിനാൻ ഇ
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#eab308]/70 uppercase">
              1st Year · ECE
            </span>
          </div>
        </motion.div>

      </div>
      
      <footer className="relative z-10 w-full border-t border-white/5 bg-black/40">
        <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-10 lg:px-16 flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Inquation 2025–26</span>
          <span className="text-[#eab308]/50">End of Story</span>
        </div>
      </footer>
    </section>
  );
}

export default SeedsOfLight;
