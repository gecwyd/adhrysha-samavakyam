"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export default function DowryPage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#111827] text-[#f8fafc] selection:bg-[#e11d48]/30 font-sans">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-dowry" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f8fafc] hover:text-[#e11d48] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-32 md:py-48">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e11d48] leading-snug mb-12" lang="ml">
              സ്ത്രീധനം: പുരോഗതിയുടെ മറവിലെ പഴഞ്ചൻ ചങ്ങല
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#e11d48]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={resolveAsset("shaheer.png")} 
                  alt="Ahammed Shaheer" 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#f8fafc] font-serif" lang="ml">അഹമ്മദ് ഷഹീർ</p>
              <p className="text-sm md:text-base text-[#f8fafc]/60 mt-1 font-sans font-light" lang="ml">
                രണ്ടാം വർഷം, മെക്കാനിക്കൽ എഞ്ചിനീയറിങ്
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-12 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#cbd5e1] font-light"
          lang="ml"
        >
          <p>
            ഇന്ന് നമ്മുടെ സമൂഹം വിദ്യാഭ്യാസത്തിലും സാങ്കേതികവിദ്യയിലും ജീവിത നിലവാരത്തിലും വളരെയധികം മുന്നേറിയിട്ടുണ്ട്. എന്നാൽ ഇത്രയും പുരോഗതി ഉണ്ടായിട്ടും സ്ത്രീധനം എന്ന ദുരാചാരം ഇന്നും സമൂഹത്തിൽ നിലനിൽക്കുന്നു. അതുകൊണ്ടാണ് സ്ത്രീധനത്തെ പുരോഗതിയുടെ മറവിലെ പഴഞ്ചൻ ചങ്ങല എന്ന് വിശേഷിപ്പിക്കുന്നത്. വിവാഹസമയത്ത് വധുവിന്റെ വീട്ടുകാർ വരന്റെ വീട്ടുകാർക്ക് പണം, സ്വർണം, വാഹനം, ഭൂമി തുടങ്ങിയവ നൽകുന്ന രീതിയാണ് സ്ത്രീധനം. ഇത് ഒരു ആചാരമെന്ന പേരിൽ തുടരുന്നുണ്ടെങ്കിലും യഥാർത്ഥത്തിൽ ഇത് സ്ത്രീകളോടുള്ള അനീതിയാണ്. 
          </p>

          <div className="py-8 my-12 border-l-2 border-[#e11d48]/50 pl-6 md:pl-10 bg-gradient-to-r from-[#e11d48]/5 to-transparent">
            <p className="text-xl md:text-3xl text-[#f1f5f9] font-normal leading-relaxed italic">
              ഒരു പെൺകുട്ടിയുടെ കഴിവിനോ വിദ്യാഭ്യാസത്തിനോ പകരം അവൾക്ക് നൽകാൻ കഴിയുന്ന സ്ത്രീധനത്തിന്റെ അളവാണ് പലപ്പോഴും വിലയിരുത്തപ്പെടുന്നത്.
            </p>
          </div>

          <p>
            സ്ത്രീധനം കാരണം നിരവധി കുടുംബങ്ങൾ സാമ്പത്തിക ബുദ്ധിമുട്ടുകൾ നേരിടുന്നു. മകളുടെ വിവാഹത്തിനായി മാതാപിതാക്കൾ കടം വാങ്ങുകയും ജീവിതകാല സമ്പാദ്യം ചെലവഴിക്കുകയും ചെയ്യുന്നു. പല കുടുംബങ്ങളും ഇതുമൂലം കടബാധ്യതകളിൽ അകപ്പെടുന്നു. കേരളത്തെ ഞെട്ടിച്ച വിസ്മയ എന്ന പെൺകുട്ടിയുടെ സംഭവം സ്ത്രീധനത്തിന്റെ ഭീകരത സമൂഹത്തിന് മുന്നിൽ തുറന്നുകാട്ടിയ ഒന്നായിരുന്നു. ഉന്നത വിദ്യാഭ്യാസം നേടിയ ഒരു യുവതിക്ക് പോലും സ്ത്രീധനത്തിന്റെ പേരിൽ പീഡനങ്ങൾ നേരിടേണ്ടി വന്നത് ഈ ദുരാചാരം എത്രമാത്രം ആഴത്തിൽ സമൂഹത്തിൽ വേരൂന്നിയിട്ടുണ്ടെന്ന് കാണിക്കുന്നു. ആ സംഭവം കേരള സമൂഹത്തിന് വലിയൊരു തിരിച്ചറിവും മുന്നറിയിപ്പും ആയിരുന്നു.
          </p>

          <p>
            വിവാഹശേഷവും കൂടുതൽ സ്ത്രീധനം ആവശ്യപ്പെട്ട് പല സ്ത്രീകളും മാനസികവും ശാരീരികവുമായ പീഡനങ്ങൾ അനുഭവിക്കുന്നു. ചിലർക്ക് സ്വന്തം വീട്ടിൽ പോലും സുരക്ഷിതമായി ജീവിക്കാൻ കഴിയാത്ത അവസ്ഥ വരുന്നു. കുടുംബ തർക്കങ്ങൾ, വിവാഹമോചനം, ആത്മഹത്യകൾ തുടങ്ങിയ പല ദുരന്തങ്ങൾക്കും സ്ത്രീധനം കാരണമാകുന്നു. സ്ത്രീധനം സ്ത്രീകളുടെ ആത്മാഭിമാനത്തെയും സ്വാതന്ത്ര്യത്തെയും ബാധിക്കുന്നു. സ്ത്രീയും പുരുഷനും തുല്യരാണെന്ന് പറയുന്ന സമൂഹത്തിൽ സ്ത്രീധനം പോലുള്ള ആചാരങ്ങൾക്ക് സ്ഥാനമില്ല.
          </p>

          <p>
            നിയമം സ്ത്രീധനത്തെ നിരോധിച്ചിട്ടുണ്ടെങ്കിലും അത് പൂർണമായും ഇല്ലാതായിട്ടില്ല. അതിനാൽ നിയമത്തോടൊപ്പം സമൂഹത്തിന്റെ മനോഭാവവും മാറണം. സ്ത്രീധനം വാങ്ങുകയോ നൽകുകയോ ചെയ്യില്ലെന്ന് ഓരോ യുവാവും യുവതിയും തീരുമാനിക്കണം. ഒരു വിദ്യാർത്ഥി എന്ന നിലയിൽ, സ്ത്രീധനം വാങ്ങുന്നതും നൽകുന്നതും ഒരുപോലെ തെറ്റാണെന്ന് ഞാൻ വിശ്വസിക്കുന്നു. 
          </p>

          <div className="mt-24 pt-12 border-t border-[#f8fafc]/10 text-center">
            <p className="text-2xl md:text-4xl text-[#f8fafc] font-medium leading-relaxed">
              സ്ത്രീയെ സ്വർണത്തിന്റെയോ പണത്തിന്റെയോ അടിസ്ഥാനത്തിൽ വിലയിരുത്തുന്ന മനോഭാവം മാറണം.
            </p>
            <p className="mt-8 text-xl md:text-2xl text-[#94a3b8]">
              വിദ്യാഭ്യാസവും പുരോഗതിയും യഥാർത്ഥ അർഥത്തിൽ നേടണമെങ്കിൽ സ്ത്രീധനം എന്ന പഴഞ്ചൻ ചങ്ങല പൊട്ടിച്ചെറിയണം. സ്ത്രീധനം അവസാനിപ്പിക്കേണ്ട ഒരു സാമൂഹിക ദുരാചാരമാണ്. 
            </p>
            <p className="mt-12 text-2xl md:text-4xl text-[#e11d48] drop-shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              സ്ത്രീയുടെ മൂല്യം സ്വർണത്തിലും പണത്തിലും അല്ല, അവളുടെ വ്യക്തിത്വത്തിലും കഴിവുകളിലുമാണ്.
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
