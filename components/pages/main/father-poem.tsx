"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const POEM_STANZAS = [
  "ഈ ലോകം എത്രയോ സുന്ദരമെന്നു-\nനിൻ കണ്ണുകളെന്നും ചൊല്ലിയല്ലോ...\nഎൻ കണ്ണുകളിൽ നിൻ ഭംഗി നിറഞ്ഞിരുന്നു\nഎൻ കാതുകൾ നിൻ സ്വരം ചെവിയോർത്തിരുന്നു...",
  "നീ എനിക്കായ് പകർന്നുതന്ന സ്മരണകൾക്കെല്ലാം\nനിന്റെ ഗന്ധമായിരുന്നുവെന്ന് നീ അറിഞ്ഞുവോ....\nനിന്നോടൊപ്പം ഞാൻ കണ്ടയിടങ്ങളെല്ലാമെ\nനമ്മുടെ സ്നേഹംപോൽ എന്നും മനോഹരം...",
  "ഒരു കുഞ്ഞു പൈതലായ് നിൻ-\nവിരലുകളിൽ എൻ വിരൽ ഞാൻ കോർത്തതും\nഎൻ ലോകമേ നീയെന്നു ഞാനറിഞ്ഞു....\nനിൻ കണ്ണുകൾ എനിക്കായ് കാഴ്ചകൾ കണ്ടതും\nനിൻ സ്വരം എനിക്കായി ഉയർന്നു പറന്നതും\nനിൻ നിഴൽ എന്റെ കാവലായി നിൽപ്പതും\nഎൻ ഉയർച്ചകൾ എന്നും നിൻ നേട്ടങ്ങളായി\nഎനിക്കു പിന്നിലെ ശക്തിയാം നിഴലായി\nഎന്നുമെന്നും നീ അരികിലുണ്ട്....",
  "ജീവിതമാം സാഗരത്തെ എന്റെയീ -\nകൈക്കുമ്പിളിലൊതുക്കിയ മായാജാലക്കാരാ...\nഎന്നെ പുണരുന്ന സ്നേഹകവചം\nഎന്നുമെന്നും നീ മാത്രമെന്ന് ഞാനറിവൂ....\nഅതെന്നുമെൻ അച്ഛനെന്നാരറിവൂ....!"
];

export function FatherPoem() {
  return (
    <section
      id="sec-father-poem"
      className="relative w-full min-h-[100dvh] bg-[#fbfbf9] text-[#222222] font-sans selection:bg-[#222] selection:text-white flex flex-col justify-center py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      <div className="max-w-4xl mx-auto w-full px-6 sm:px-10 lg:px-16 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="font-mono text-[9px] tracking-[0.4em] text-[#222]/40 uppercase block mb-4">
            Poetry · Volume 3
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#111]" lang="ml">
            അച്ഛൻ
          </h2>
          <div className="w-[1px] h-12 bg-[#222]/20 mx-auto mt-8" />
        </motion.div>

        {/* Poem Content */}
        <div className="flex flex-col items-center gap-16 md:gap-20 mb-24 w-full">
          {POEM_STANZAS.map((stanza, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-center"
            >
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-light leading-[2] tracking-wide text-[#333]/90 whitespace-pre-line" lang="ml">
                {stanza}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-sm h-[1px] bg-[#222]/10 mb-16"
        />

        {/* Author Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden relative border border-[#222]/10 mb-6 shrink-0">
            <Image 
              src={resolveAsset("poornima.png")}
              alt="Poornima A" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#222]/40 uppercase mb-2">
            Written by
          </span>
          <span className="font-sans text-xl md:text-2xl font-medium tracking-tight text-[#111]" lang="ml">
            പൂർണിമ എ
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#222]/50 uppercase mt-2">
            2nd Year · Civil Engineering
          </span>
        </motion.div>

      </div>
      
      <footer className="absolute bottom-0 w-full border-t border-[#222]/5">
        <div className="mx-auto max-w-[1400px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] uppercase tracking-[0.15em] text-[#222]/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Inquation 2025–26</span>
          <span>Poetry Collection</span>
        </div>
      </footer>
    </section>
  );
}

export default FatherPoem;
