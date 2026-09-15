"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export default function NanmayudePage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#052e16] text-[#ecfccb] selection:bg-[#bef264]/30 font-sans">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-nanmayude" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ecfccb] hover:text-[#bef264] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main
        </Link>
      </div>

      <article className="max-w-2xl mx-auto px-6 py-32 md:py-48">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light text-[#bef264] leading-snug mb-12 tracking-wide" lang="ml">
              നന്മയുടെ പൂമൊട്ടുകൾ
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#bef264]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={resolveAsset("eldho.png")} 
                  alt="Eldho Paul Shajan" 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#ecfccb] font-serif" lang="ml">ഏൽദോ പോൾ ഷാജൻ</p>
              <p className="text-sm md:text-base text-[#ecfccb]/60 mt-1 font-sans font-light tracking-widest" lang="ml">
                ഒന്നാം വർഷം, മെക്കാനിക്കൽ എഞ്ചിനീയറിങ്
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-16 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#d9f99d] font-light text-center"
          lang="ml"
        >
          <div className="space-y-4">
            <p>അല്ലയോ പൂവേ!</p>
            <p>നീ ജന്മം നൽകും</p>
            <p>പൂമൊട്ടുകൾക്കെന്തൊരു കാന്തി!</p>
          </div>

          <div className="space-y-4">
            <p>ചിത്രപതംഗം തേൻ നുകരുന്ന</p>
            <p>എളിമയാർന്ന ഗാത്രത്തിനുടമേ!</p>
            <p>ആരും കൊതിക്കുന്ന ശോഭയാൽ</p>
            <p>തിളങ്ങുന്ന മഹിതേ!</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#bef264]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>നിൻ പൂമോട്ടുകൾ ഉല്ലസിക്കുന്ന</p>
            <p>ആതപാർന്ന ഈ വേളയിൽ</p>
            <p>പകരൂ നീ നന്മ തൻ തൂവെളിച്ചം</p>
          </div>

          <div className="space-y-4">
            <p>മർത്ത്യർ കൊതിക്കുന്ന കാന്തിയാർന്ന</p>
            <p>പ്രിയ ലളിതേ !</p>
            <p>വളർന്നു തുടങ്ങുന്ന പൂമൊട്ടുകൾ</p>
            <p className="text-[#bef264]">വിടരട്ടെ നന്മയുടെ വിരിഞ്ഞ പുഷ്പങ്ങളായ്</p>
          </div>

          <div className="space-y-4 pb-24">
            <p>പറയൂ പകരൂ നീ നന്മതൻ പ്രിയസ്വപ്നങ്ങൾ</p>
            <p>ക്വാണമോടംബര ഛായയിൽ</p>
            <p className="text-2xl md:text-4xl text-[#bef264] mt-8 pt-4 block drop-shadow-[0_0_15px_rgba(190,242,100,0.3)]">
              വളരും മൊട്ടുകൾ വിടരട്ടേ നന്മയാൽ
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
