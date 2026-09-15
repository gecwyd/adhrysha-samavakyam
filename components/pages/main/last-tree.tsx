"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STORY_PARAGRAPHS = [
  "വർഷം 2050. പുതിയൊരു അധ്യയന വർഷത്തിന് തുടക്കമായി. പുത്തൻ പ്രതീക്ഷകളും പേറി കോളേജിന്റെ പടികൾ കയറുമ്പോൾ അരുണിന്റെ മനസ്സിൽ ഒരാഗ്രഹം മാത്രം, പഠിച്ച് ഒരു കളക്ടർ ആവണം. പിന്നിട്ട വഴികളിലെ ദുർഗന്ധം വമിക്കുന്ന ഓർമകൾ അതിന് അവനൊരു പ്രചോദനമായി.",
  "പുതിയ സൗഹൃദങ്ങളും പുത്തൻ ക്ലാസ്റൂമും അവന്റെ ആഗ്രഹങ്ങൾ ഉണർവ് പകർന്നു. സമയം വൈകുന്നേരമായി. ക്ലാസ്സ് കഴിഞ്ഞിറങ്ങിയപ്പോൾ ശക്തമായി മഴ പെയ്യാൻ തുടങ്ങി. കോളേജിന്റെ വിജനമായ വരാന്തയിൽനിന്ന് പുറത്തേക്ക് കണ്ണും നട്ട് നിന്നപ്പോൾ മഴയോടൊപ്പം പതുങ്ങി വന്ന ശീതളകാറ്റ് ക്യാമ്പസിനുള്ളിൽ ആഞ്ഞുവീശാൻ തുടങ്ങിയത് അരുൺ കണ്ടു. അവന്റെ ചീകി വൃത്തിയാക്കി വച്ചിരുന്ന മുടിയിഴകളെ അത് വേർപെടുത്തി. നിശബ്ദത തളം കെട്ടിയ വരാന്തയിൽ മഴയുടെ ശബ്ദം ഒരാക്രോഷമായി അവന്റെ ചെവികൾ അലോസരപ്പെടുത്തി.",
  "പല ചിന്തകളും അവന്റെ മനസ്സിൽ ഓടിമറഞ്ഞു കൊണ്ടേയിരുന്നു, ഒരു നേർചിത്രമായി.. പെട്ടെന്നെ അരുണിന്റെ ചിന്ത ദൂരെയുള്ളൊരു കാഴ്ചയിൽ ഉടക്കി. മഴയത്ത് തണുത്ത് വിറച്ച് ലൈബ്രറിയുടെ മുന്നിലുള്ള ഒരു പച്ച മരം. അപ്പോഴാണ് അവൻ മനസ്സിലാക്കിയത് അതാണ് ആ ക്യാമ്പസിലുള്ളിലെ ഒരേയൊരു മരം. മഴയിലും കാറ്റിലും വീഴാൻ തയ്യാറാവതെ വള്ളിപ്പടർപ്പുകളാൽ അണിഞ്ഞൊരുങ്ങിയ പ്രത്യാശ തുളുമ്പുന്ന ഒരു വയസ്സൻ ആൽമരം. അവന്റെ ജീവിതം പോലെ.....",
  "പിന്നീട് ഓരോ ദിവസം കോളേജിൽ എത്തുമ്പോഴും അവന്റെ നോട്ടം ശരങ്ങളായി ആൽമരത്തിന്റെ ഹൃദയത്തിൽ പതിച്ചു. അവൻ എന്നും അതിന്റെ ചുവട്ടിൽ കുറച്ച് നേരം ഇരിക്കാൻ തുടങ്ങി. അപ്പോഴെല്ലാം അവിടെ അവശേഷിച്ച ആ അവസാന മരം അവനെ പ്രതീക്ഷകൾക്ക് തണലേകി. ശക്തമായി പെയ്ത മഴയിൽ മരത്തിന്റെ മുകളിലെ ഒരു ചില്ല ഒടിഞ്ഞ് അതിലൂടെ വെള്ളം ഒലിച്ചുകൊണ്ടേയിരുന്നു. അത് കണ്ടപ്പോൾ ജീവിതഭാരത്തൽ മരം കരയുന്നതായി അവന് തോന്നി.",
  "\"എന്റെ ഒപ്പം ഉണ്ടായിരുന്നവരെയെല്ലാം ഇവിടുള്ളവർ കൊന്നു. അവസാന അവശേഷിപ്പായി ഞാൻ മാത്രം.... നിങ്ങൾക്ക് വേണ്ടതെല്ലാം ഞാൻ തന്നു. പക്ഷെ എനിക്ക് വേണ്ടതൊന്നും നിങ്ങൾ തന്നില്ല.....\" മരത്തിന്റെ ആത്മഗതം അവൻ വായിക്കാൻ ശ്രമിച്ചു..",
  "ആ അനുഭവം ഒരു പുതിയ ആശയത്തിലേക്ക് അവനെ നയിച്ചു. പിറ്റേന്ന് തന്നെ മറ്റു കൂട്ടുകാരുമായി ചേർന്നു അവൻ നേച്ചർ ക്യാമ്പയിനുകൾ സംഘടിപ്പിച്ചു. അവരുടെ കൂട്ടായ പരിശ്രമത്തിനൊടുവിൽ ഒറ്റ മരത്തിന് കൂട്ടായി നിറയെ മരങ്ങൾ അവർ ക്യാമ്പസിനുള്ളിൽ നട്ടുപിടിപ്പിച്ചു.",
  "വർഷങ്ങൾ കഴിഞ്ഞു.... കോളേജ് ജീവിതം അവസാനിച്ചു അരുൺ പടിയിറങ്ങുമ്പോൾ ഒരിക്കൽകൂടി ക്യാമ്പസിനുള്ളിലേക്ക് തിരിഞ്ഞുനോക്കി. ചുറ്റുമുള്ള പുതിയ മരങ്ങൾക്കിടയിൽ ആ വയസ്സൻമരം തീരെ അവശനായി ചില്ലകൾ കൂമ്പി നിൽക്കുന്നു. അത് അവനോട് നന്ദി പറയുന്നതായി അവന് തോന്നി. ഇവിടം സുന്ദരമാക്കിയതിനു... പുത്തൻ പ്രത്യാശ പകർന്നതിന്.... എല്ലാം.. അവന്റെ കണ്ണുകൾ പെയ്യാൻ തുടങ്ങി. കൂടെ മേഘങ്ങളും...",
  "ആഞ്ഞുവീശിയ കാറ്റ് വീണ്ടും അവന്റെ മുടിയിഴകളെ ആക്രമിച്ചു. പക്ഷെ അവൻ ചിന്തകളിൽ മുഴുകിയില്ല. അവന്റെ മനസ് പോലെ പച്ച നിറഞ്ഞ ചുറ്റുമുള്ള ലോകം അവന്റെ ആഗ്രഹങ്ങൾക്ക് പ്രത്യാശ നുകർന്നു. ഇനിയൊരു സ്വപ്നം മാത്രം.. പഠിച്ച് കലക്ടർ ആവണം. ഈ യാത്രയിൽ അരുൺ തനിച്ചല്ലായിരുന്നു.. മരങ്ങളും പ്രകൃതിയും മഴയുമെല്ലാം അവനൊപ്പമുണ്ടായിരുന്നു."
];

function Paragraph({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="font-sans text-[20px] md:text-[24px] lg:text-[26px] font-light leading-[1.9] text-[#182018]/85 mb-10 text-justify sm:text-left drop-shadow-sm"
      lang="ml"
    >
      {text}
    </motion.p>
  );
}

export function LastTree() {
  return (
    <section
      id="sec-last-tree"
      className="relative w-full bg-[#f3f5f2] text-[#182018] font-sans selection:bg-[#182018] selection:text-[#f3f5f2]"
    >
      {/* Subtle organic noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16 pt-24 md:pt-32 pb-32 relative z-10 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Column - Title & Author Sticky */}
        <div className="w-full md:w-1/3 flex flex-col relative">
          <div className="md:sticky md:top-32 flex flex-col gap-16">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="w-8 h-[2px] bg-[#182018] mb-8" />
              <p className="font-mono text-[9px] tracking-[0.4em] text-[#182018]/40 uppercase mb-6">
                Short Story
              </p>
              <h2 
                className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-[#182018]"
                lang="ml"
              >
                ക്യാമ്പസിലെ
                <br />
                <span className="font-serif italic text-[#182018]/60 font-normal">അവസാന മരം</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-5"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden relative border border-[#182018]/10 shrink-0">
                <Image 
                  src={resolveAsset("adarsh.png")}
                  alt="Adarsh P" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#182018]/40 uppercase mb-1">
                  Written by
                </span>
                <span className="font-sans text-xl md:text-2xl font-medium tracking-tight text-[#182018]" lang="ml">
                  ആദർഷ് പി
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#182018]/50 uppercase mt-1">
                  1st Year · Civil
                </span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Right Column - Story Content */}
        <div className="w-full md:w-2/3 md:pl-12 md:border-l border-[#182018]/10 pt-4 md:pt-0">
          <div className="flex flex-col">
            {STORY_PARAGRAPHS.map((text, index) => (
              <Paragraph key={index} text={text} />
            ))}
          </div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-[1px] bg-[#182018]/20 origin-left mt-16"
          />
        </div>

      </div>
      
      <footer className="w-full border-t border-[#182018]/10 bg-[#ebece7]">
        <div className="mx-auto max-w-[1200px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-[#182018]/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Inquation 2025–26</span>
          <span>The Last Tree on Campus</span>
        </div>
      </footer>
    </section>
  );
}

export default LastTree;
