"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export default function ShadowOfWarPage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1c1917] text-[#fafaf9] selection:bg-[#f97316]/30 font-sans">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-shadow-of-war" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#fafaf9] hover:text-[#f97316] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main
        </Link>
      </div>

      <article className="max-w-2xl mx-auto px-6 py-32 md:py-48 relative">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light text-[#f97316] leading-snug mb-12 tracking-wide" lang="ml">
              യുദ്ധത്തിന്റെ നിഴലിൽ 
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#f97316]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={resolveAsset("hadin.jpg")} 
                  alt="Hadin Muhammed" 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#fafaf9] font-serif" lang="ml">ഹാദിൻ മുഹമ്മദ് </p>
              <p className="text-sm md:text-base text-[#fafaf9]/60 mt-1 font-sans font-light tracking-widest" lang="ml">
                മൂന്നാം വർഷം, സിവിൽ എഞ്ചിനീയറിങ്
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-16 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#d6d3d1] font-light text-center"
          lang="ml"
        >
          <div className="space-y-4">
            <p>യുദ്ധത്തിന്റെ നിഴലിൽ മിന്നലൊച്ച മുഴങ്ങുന്നു..</p>
            <p>തകർന്ന വാതിലുകൾക്കു പുറകിൽ</p>
            <p>സ്നേഹമിപ്പോഴും ചലിച്ചുകൊണ്ടേയിരിക്കുന്നുണ്ട്..</p>
            <p>നല്ല പാതിയെ കാത്തിരിക്കുന്ന ഹൃദയങ്ങളുണ്ട്..</p>
            <p>അവരിൽ നിന്നും അവസാന ശ്വാസവും</p>
            <p>അറ്റുപോകും വരെ പോരാട്ടം തുടർന്നുകൊണ്ടേയിരിക്കും..</p>
          </div>

          <div className="space-y-4">
            <p>കളിപ്പാട്ടങ്ങൾ വീണ നിലങ്ങൾ</p>
            <p>ചിതറിത്തെറിച്ച് വിണ്ടുകീറി കിടക്കുന്നു..</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#f97316]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>പ്രിയപ്പെട്ടവർക്കു നൽകിയ വാഗ്ദാനങ്ങൾ</p>
            <p>ദൂരങ്ങൾക്കപ്പുറം കേൾക്കുന്നുണ്ട്..</p>
          </div>

          <div className="space-y-4">
            <p>ഭീതിയുടെ രാത്രികളിലും</p>
            <p>പ്രത്യാശയുടെ ചെറുകനലിൽ അവർ ചിരി കണ്ടെത്തി..</p>
          </div>

          <div className="space-y-4">
            <p>നിറഞ്ഞ നിഷ്കളങ്കതയെ ഒരമ്മ</p>
            <p>യുദ്ധത്തിന്റെ ഭീകര ശബ്ദങ്ങളിൽ</p>
            <p>നിന്ന് തന്റെ താരാട്ടു കൊണ്ട് മറച്ചുപിടിക്കുന്നു..</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#f97316]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>ഉള്ളിൽ തുടിച്ച ജീവനെയും കൊണ്ട്</p>
            <p>പാഞ്ഞ മറ്റൊരമ്മ സമാധാനത്തിന്റെ</p>
            <p>പുതുലോകം സ്വപ്നം കാണുന്നു..</p>
            <p>ഹൃദയത്തിൽ നിറച്ചും</p>
            <p>ഭയമാണെങ്കിലും നാളെയുടെ പുലരി സന്തോഷം നൽകുമെന്ന് വിശ്വസിച്ചുകൊണ്ട് ..</p>
            <p>അവളുടെ കണ്ണുനീർ ഒരു നദിപോലെ കാണപ്പെട്ടു..</p>
          </div>

          <div className="space-y-4">
            <p>രക്തം നിറച്ച പേനകൾ കൊണ്ടവർ</p>
            <p>കവിതയെഴുതി ഒരിക്കലും</p>
            <p>മായ്ക്കാനാകാത്ത കവിതകൾ..</p>
          </div>
          
          <div className="space-y-4 pb-24">
            <p>ഇരുട്ട് പടരുന്നിടത്ത്, യുദ്ധത്തിന്റെ നിഴലിൽ,</p>
            <p>പ്രത്യാശയുടെ പാത തെളിയുന്നുണ്ട്..</p>
            <p>ഒന്നിനും തോൽപ്പിക്കാനാവാത്ത പ്രത്യാശയുടെ പാത..</p>
            <p>പ്രണയവും സൗഹൃദവും കുടുംബവും,</p>
            <p className="text-2xl md:text-4xl text-[#f97316] mt-8 pt-4 block drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              സമരത്തിന്റെ ഹൃദയത്തിൽ സദാ ശക്തമായിരിക്കും..!!
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
