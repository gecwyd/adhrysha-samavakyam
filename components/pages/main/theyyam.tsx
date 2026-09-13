"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ARTICLE_PARAGRAPHS = [
  "\"അവനവൻ ആത്മസുഖത്തിനായി ആചരിക്കുന്നവ അപരന് സുഖത്തിനായി വരേണം\" എന്നല്ലെ ഗുരുവചനം! 'ആചാരം' എന്ന വാക്കിൻ്റെ ഉൽപ്പത്തി പരിശോധിച്ചാൽ അതൊരു നിരന്തരയാത്രയെ സൂചിപ്പിക്കുന്നതായി മനസിലാക്കാം. ഒരുപക്ഷെ മനുഷ്യൻ്റെ ജീവിതയാത്രയിൽ വ്യത്യസ്തങ്ങളായ ആചാര അനുഷ്ഠാനങ്ങൾ സ്വാധീനിക്കാറുണ്ട്.",
  "അത്തരത്തിൽ ഉത്തരമലബാറിലെ ജീവിത സംസ്കാരത്തിൽ ആഴത്തിൽ വേരുന്നിയ അനുഷ്ഠാന കലയാണ് തെയ്യം. നരവംശശാസ്ത്രപരമായും, സാമൂഹ്യശാസ്ത്രപരമായും തെയ്യത്തിനുള്ള പ്രസക്തിയും, മനുഷ്യ സംസ്കാരത്തിലേക്ക് നീണ്ടുനിൽക്കുന്ന അതിൻ്റെ വേരുകളും പടർച്ചകളും ഏറെ ചർച്ചചെയ്യപ്പെടേണ്ട വിഷയമാണ്.",
  "കേവലം ആചാരാനുഷ്ഠാനങ്ങൾക്കുമപ്പുറം ഒരു ദേശത്തിൻ്റെ സംസ്കാരവും, പൈതൃകവും, കൂട്ടായ്മയുമൊക്കെ ചേരുന്ന ഒരു കലാരൂപം എന്ന സവിശേഷതകൂടി ഉണ്ട് തെയ്യത്തിന്. ചരിത്രം എപ്പോഴും വിജയികളുടേതാണ്. എന്നാൽ തോറ്റു പോകാൻ വിസമ്മതിച്ചവരുടെ ചരിത്രമാണ് തെയ്യങ്ങൾ പറയുന്നത്.",
  "ശിശിരകാലത്തിൻ്റെ കുളിരിൽ ചെണ്ടയുടെ താളങ്ങൾക്കും, തോറ്റം പാട്ടുകൾക്കുമൊപ്പം ചുവപ്പണിഞ്ഞ തെയ്യക്കോലങ്ങൾ ആടുമ്പോൾ അതിനുപിന്നിൽ ഒരു വിലാപത്തിൻ്റെ ഈണം പ്രത്യക്ഷമാവുന്നുണ്ട്. തോറ്റം പാട്ടുകൾക്ക് ഒരു വിപ്ലവത്തിൻ്റെ വീര്യമുണ്ട്.",
  "അവിടെ ആടിത്തിമിർക്കുന്ന ആ ഓരോ തെയ്യക്കോലവും കേവലം മന്ത്രങ്ങളാൽ ആവാഹിക്കപ്പെട്ട ദേവതകളല്ല, മറിച്ച് അറിവിനെ ആയുധമാക്കിയതിന്റെ പേരിൽ ബലികഴിക്കപ്പെട്ട മനുഷ്യരുടെ ഉയിർത്തെഴുന്നേൽപ്പുകളാണ്. ജന്മിതത്തിന് എതിരെയും നാടുവാഴിത്തം കെട്ടിപ്പൊക്കിയ സാമൂഹിക വ്യവസ്ഥിതികൾക്കെതിരെയും നിലകൊണ്ടവരുടെ ചരിത്രകഥ ഇവയ്ക്ക് പിന്നിലുണ്ട്.",
  "കണ്ണീരും, ചോരയും വീണ ആ മണ്ണിൽ നിന്നാണ് പിന്നീട് നവോത്ഥാനത്തിൻ്റെ ആദ്യ സ്ഫുരണങ്ങൾ ഉണ്ടായത്. തെയ്യങ്ങളുടെ പുരാവൃത്തങ്ങൾ പരിശോധിച്ചാൽ അവ ആത്മീയതയേക്കാൾ ഉപരി ഭൗതികജീവിതത്തിന്റെ നേർക്കാഴ്ച്ചകളാണെന്ന് മനസിലാക്കാം.",
  "ജാതിയും, വരേണ്യതയും തീർത്ത വേലിക്കെട്ടുകൾക്കുമീതെ അറിവിൻ്റേയും, അതിജീവനത്തിൻറേയും ചെറുത്തുനിൽപ്പുകൾ അനിവാര്യമാണ് എന്ന സന്ദേശം ചരിത്രം മുന്നോട്ട് വയ്ക്കുന്നു. ഉദാഹരണത്തിന് ഉത്തരമലബാറിലെ പൊട്ടൻ തെയ്യത്തിൻ്റെ തോറ്റം പാട്ടിലെ ചില വരികളുണ്ട്: \"നീങ്കളെക്കൊത്ത്യാലും ചോരല്ലേ ചൊവ്വറ്? നാങ്കളെക്കൊത്ത്യാലും ചോരലേ ചൊവ്വറ്?\"",
  "മനുഷ്യരെല്ലാം തുല്യരാണെന്നും, മനുഷ്യൻ്റെ സിരകളിലൂടെ ഒഴുകുന്ന രക്തത്തിന് ഒരേ നിറമാണ് എന്നും, ജാതിയുടെയും മതത്തിൻ്റേയും പേരിൽ ആരെയും ഉയർന്നവരോ, താഴ്ന്നവരോ ആയി കാണരുതെന്നും ഇതിലൂടെ വ്യക്തമാക്കുന്നു.",
  "ഇത്തരത്തിൽ അതിജീവനത്തിൻ്റെയും, ചെറുത്തുനിൽപ്പുകളുടയും തോറ്റം പാട്ടുകൾ ഇവിടംകൊണ്ട് അവസാനിക്കുന്നില്ല. അവ ഓരോ കാലത്തെയും അനീതികൾക്കും, അധർമ്മങ്ങൾക്കുമെതിരെ ശബ്ദിച്ചുകൊണ്ടേയിരിക്കും.",
];

function FocusParagraph({ text, index }: { text: string, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track this paragraph's position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"] 
  });

  // Paragraph is fully opaque when in the center of the screen, and dims at the edges
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.15, 1, 1, 0.15]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.97, 1, 1, 0.97]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative flex flex-col font-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] leading-[1.8] sm:leading-[1.9] text-[#f2dfc4] tracking-tight will-change-[opacity,transform]"
      lang="ml"
    >
      {/* Decorative paragraph number that fades in along with the text */}
      <span className="font-mono text-[9px] sm:text-[10px] text-[#f0a35e] mb-3 opacity-60 tracking-[0.2em] -ml-2">
        {String(index + 1).padStart(2, '0')} —
      </span>
      {text}
    </motion.div>
  );
}

export function Theyyam() {
  return (
    <section
      id="sec-o"
      aria-labelledby="theyyam-title"
      className="relative w-full bg-[#1f1c19] text-[#f2dfc4] overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-32 pb-16 md:pt-48">
         
         {/* Title Section */}
         <div className="flex flex-col items-center text-center mb-32 md:mb-48">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12"
           >
             <div className="w-12 sm:w-20 h-px bg-[#f0a35e]/50" />
             <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#f0a35e]">
               Culture, survival, resistance
             </p>
             <div className="w-12 sm:w-20 h-px bg-[#f0a35e]/50" />
           </motion.div>
           
           <motion.h2
             id="theyyam-title"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 1 }}
             className="font-heading text-[22vw] sm:text-[20vw] md:text-[150px] lg:text-[180px] leading-[0.8] tracking-[-0.04em] text-[#f2dfc4]"
             lang="ml"
           >
              തെയ്യം
           </motion.h2>

           <motion.h3
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4, duration: 1 }}
             className="font-heading text-[8vw] sm:text-[6vw] md:text-[50px] lg:text-[60px] leading-[1.2] tracking-[-0.02em] text-[#f0a35e] mt-4 sm:mt-8"
             lang="ml"
           >
              അതിജീവനത്തിന്റെ കലയും ചെറുത്തുനിൽപ്പും.
           </motion.h3>
         </div>

         {/* Spotlight Scrolling Essay */}
         <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-16 sm:gap-24 md:gap-32 pb-24 md:pb-40">
            {ARTICLE_PARAGRAPHS.map((paragraph, i) => (
               <FocusParagraph key={i} text={paragraph} index={i} />
            ))}
         </div>

         {/* Centered Editorial Author Block */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
           transition={{ duration: 0.8 }}
           className="mt-16 md:mt-24 mb-20 flex justify-center relative z-10"
         >
            <div className="flex flex-col items-center text-center">
               <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-full grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700 border border-[#f2dfc4]/10 shadow-2xl mb-6 sm:mb-8">
                  <Image 
                    src="/asika-k.png" 
                    alt="Author portrait of Asika K" 
                    fill 
                    sizes="144px" 
                    className="object-cover" 
                  />
               </div>
               <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#f0a35e] mb-3 sm:mb-4">
                 Written by
               </span>
               <span className="font-sans text-4xl sm:text-5xl lg:text-[64px] tracking-tight text-[#f2dfc4] mb-2 sm:mb-4 leading-none">
                 Asika K
               </span>
               <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-[#f2dfc4]/40">
                 Second year · Electronics & Communication
               </span>
            </div>
         </motion.div>

      </div>
      
      <footer className="w-full border-t border-[#f2dfc4]/5">
        <div className="mx-auto max-w-[1440px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#f2dfc4]/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Author · Asika K</span>
          <span>College Union 2026–27 · Source pages 23–24</span>
        </div>
      </footer>
    </section>
  );
}

export default Theyyam;
