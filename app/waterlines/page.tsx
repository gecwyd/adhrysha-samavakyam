"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export default function WaterlinesPage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#061325] text-[#e0f2fe] selection:bg-[#38bdf8]/30 font-sans">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-waterlines" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e0f2fe] hover:text-[#38bdf8] transition-colors"
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
            <h1 className="text-4xl md:text-6xl font-light text-[#38bdf8] leading-snug mb-12 tracking-wide" lang="ml">
              ജലരേഖകൾ
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#38bdf8]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={resolveAsset("anagha.png")} 
                  alt="Anagha T.J" 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#e0f2fe] font-serif" lang="ml">അനഘ ടി. ജെ</p>
              <p className="text-sm md:text-base text-[#e0f2fe]/60 mt-1 font-sans font-light tracking-widest" lang="ml">
                രണ്ടാം വർഷം, സിവിൽ എഞ്ചിനീയറിങ്
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-16 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#bae6fd] font-light text-center"
          lang="ml"
        >
          <div className="space-y-4">
            <p>തനിച്ചീ കാറ്റിൻ പടിയിൽ</p>
            <p>ഞാൻ നീറുമാ പ്രണയമോർക്കവേ</p>
            <p>പ്രണയം പറഞ്ഞു നീ പലപ്പോഴും</p>
            <p>വിശ്വസിച്ചു ഞാൻ ആ വാക്കുകൾ</p>
            <p>പ്രണയം നടിച്ചു നീ പലപ്പോഴും</p>
            <p>കവർന്നിരുന്നു എന്റെ ഹൃദയത്തെ</p>
            <p>നിൻ വാക്കുകളിൽ ഞാൻ മന്ദമാം</p>
            <p>പ്രണയത്താൽ ലയിച്ചുപോയീടവെ.</p>
          </div>

          <div className="space-y-4">
            <p>ആ അന്ധപ്രണയത്തിൽ ഞാൻ</p>
            <p>സർവ്വം നിനക്കായ് തന്നു പോയ്</p>
            <p>നിൻ പ്രണയം അതെൻ</p>
            <p>ഹൃദയത്തിൽ മാത്രമെന്ന് കരുതവേ</p>
            <p>ഒരുമിക്കും നാം ആ രാത്രിയിൽ</p>
            <p>നീ എൻ ഹൃദയത്തിൽ ദൃഢമാക്കി</p>
            <p className="text-[#38bdf8]">നീ എന്റേതു മാത്രമെന്ന്</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#38bdf8]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>എന്നാൽ ഏതോ ഒരു കാറ്റിൻ പടിയിൽ</p>
            <p>നീ അകറ്റിചൊന്നു ഞാൻ ചണ്ടിയെന്ന്</p>
            <p>ഞാൻ വെറും വേശ്യയെന്ന്</p>
            <p>എന്നാൽ ഓർക്കാതെ പോയ് നീ</p>
            <p>എന്നെ ചണ്ടിയാക്കിയതു നീ തന്നെയെന്ന്</p>
            <p>എന്നോട് ചേർത്തു വക്കാനായ്</p>
            <p>എൻ ശരീരം പോലും കവർന്നു നീ</p>
            <p>പലപ്പോഴും നീ പറഞ്ഞ നിന്നിലെ</p>
            <p>പ്രണയം ഇന്നെവിടെ</p>
          </div>

          <div className="space-y-4 pb-24">
            <p>ഇന്നീക്കാറ്റിൻ പടിയിൽ ഇരിക്കുമ്പോൾ</p>
            <p>ഞാൻ അറിയുന്നു.</p>
            <p>നിന്നിലെ എന്നോടുള്ള പ്രണയം</p>
            <p className="text-2xl md:text-4xl text-[#38bdf8] mt-8 pt-4 block">
              വെറും ജലരേഖകൾ മാത്രമെന്ന്<br/>
              അവ ഓളംവെട്ടി ള്ളകിമറിയും<br/>
              നിശ്ചലസമയത്തിൽ അതു<br/>
              കാണാമറയത്താവുന്നു
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
