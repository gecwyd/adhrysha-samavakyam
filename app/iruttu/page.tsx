"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export default function IruttuPage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-[#d4d4d4] selection:bg-[#fef08a]/20 font-sans">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-iruttu" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4d4d4] hover:text-[#fef08a] transition-colors"
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
            <h1 className="text-4xl md:text-6xl font-light text-[#fef08a] leading-snug mb-12 opacity-90" lang="ml">
              ഇരുട്ട്
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#fef08a]/20 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={resolveAsset("anirudh.png")} 
                  alt="Anirudh P.T" 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#f5f5f5] font-serif" lang="ml">അനിരുദ്ധ് പി . ടി</p>
              <p className="text-sm md:text-base text-[#a3a3a3] mt-1 font-sans font-light" lang="ml">
                മൂന്നാം വർഷം, ഇലക്ട്രോണിക്സ് & കമ്യൂണികേഷൻ
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-12 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#c4c4c4] font-light"
          lang="ml"
        >
          <p>
            കൊച്ചുകുട്ടികളുടെ മനസ്സിൽ ഇരുട്ടിന് എന്നും പേടിയുടെ മുഖമാണ്. അത് അവരിൽ ഉണ്ടാക്കിയെടുത്തതാണോ എന്ന് ചോദിച്ചാൽ അല്ല എന്നാലെങ്കിലും അത് ചിലപ്പോഴൊക്കെ ഉണ്ടായിതീരാൻ അവരുടെ ചുറ്റുമുള്ള മുതിർന്നവരും ഒരു കാരണമാക്കാറുണ്ട്. ഞാനടക്കമുള്ള പലരും കുട്ടിക്കാലത്തു വീട്ടിൽ കറന്റ് പോകുമ്പോൾ ഓടികളിക്കുന്നത് നിർത്തി കത്തിച്ചുവച്ച മെഴുകുതിരി വെട്ടത്തിന്റെ അടുത്തു നില്കുകയല്ലാതെ ഇരുട്ടത് എവിടേക്കും പോക്കില്ല കാരണം. ആ പ്രായത്തിന്റെ ഇരുട്ട് അമ്മമാരും മുത്തശ്ശനും മുത്തശ്ശിയുമെല്ലാം കുട്ടികൾക്ക് പറഞ്ഞുകൊടുത്ത പേടിപ്പിക്കുന്ന കഥകളില്ലെല്ലാം ഉള്ള പേടിയുടെ രൂപമായിരുന്നു.
          </p>

          <p>
            വർഷങ്ങൾക്ക് ശേഷം കുട്ടികൾ വളർന്നു, ഇന്ന് അവർക്ക് അതെ പേടിയാണോ ഇരുട്ടിനോടുള്ളത്, ചിലർക്ക് ആയിരിക്കാം മറ്റുചിലർക്ക് അങ്ങനെ ആയിരിക്കില്ല. ശരിക്കും ഇരുട്ടിന് ഒരു രൂപമുണ്ടോ?.... ഉണ്ട്, നമ്മുക്ക് ഇരുട്ടിനെ എങ്ങനെ കാണാൻ കഴിയുന്നവോ അതാണ് ഇരുട്ടിന്റെ രൂപം. കുഞ്ഞുനാളിൽ അതിന് പേടിയുടെ രൂപം കണ്ടവരിൽ ചിലർക്ക് അതിന്റെ രൂപം മാറാൻ തുടങ്ങിയിരിക്കും. അതിനു കാരണം അവർ ഇരുട്ടിനേക്കാൾ പേടിച്ചിരുന്നതിനെയെല്ലാം നേരിട്ട് കടന്നുവന്നതുകൊണ്ടാവാം അല്ലെങ്കിൽ വലിയ ഭയം ഉള്ളവർക്ക് ഇരുട്ടിനോടുള്ള ഭയം മാറി പറഞ്ഞുതരാൻ കഴിയാത്ത ഒരു തരം അടുപ്പം അവരുടെ ജീവിതത്തിൽ അവർ ഉണ്ടാക്കിയെടുത്തതാവാം. 
          </p>

          <div className="py-8 my-12 border-l-2 border-[#fef08a]/20 pl-6 md:pl-10 bg-gradient-to-r from-[#fef08a]/5 to-transparent">
            <p className="text-xl md:text-3xl text-[#fef08a] font-normal leading-relaxed italic opacity-90">
              ഇരുട്ടിന് അവർ കണ്ടെത്തിയ രൂപം ഒരു സുഹൃത്തിന്റെയാവാം സമാധാനത്തിന്റെയായിരിക്കാം. അതുമല്ലെങ്കിൽ ഒരു പ്രതീക്ഷയുടെതും ആയിരിക്കാം.
            </p>
          </div>

          <p>
            ഇത് വായിക്കുന്ന നിനക്കും ഇത് എഴുതിയ എനിക്കും ഇരുട്ട് ഇങ്ങനെ തന്നെയായിരിക്കും ഒരു സുഹൃത്തിനെപ്പോലെ എപ്പോൾ വേണമെങ്കിലും കേറിചെല്ലാവുന്ന ഒരിടം അല്ലെങ്കിൽ ജീവിതത്തിന്റെ നിലക്കാത്ത ഓട്ടത്തിൽ ഒരു നിമിഷമെങ്കിലും നിൽക്കാനുള്ള ഒരിടം, കുറച്ചു സമാധാനം കിട്ടുന്ന ഒരിടം അതുമല്ലെങ്കിൽ ചുറ്റും നിറഞ്ഞുനിൽക്കുന്ന ഇരുട്ടിലും എന്നെങ്കിലും ഒരുതരി വെട്ടം അവിടെ പ്രകാശിക്കും എന്ന പ്രതീക്ഷയുടെ ഒരു രൂപം.
          </p>

          <div className="mt-24 pt-12 border-t border-[#d4d4d4]/10 text-center">
            <p className="mt-12 text-2xl md:text-4xl text-[#fef08a] opacity-90 drop-shadow-[0_0_15px_rgba(254,240,138,0.2)]">
              ഒരിക്കൽ ഇരുട്ടിനെ ഭയന്ന് തിരിഞ്ഞ് നടന്നവർ ഇന്ന് അതെ ഇരുട്ടിൽ വെളിച്ചം തേടുന്നു.
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
