"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export default function StitchedWingsPage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0b1320] text-[#d4dbe8] selection:bg-[#d4b483]/30 font-serif">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-stitched-wings" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4dbe8] hover:text-[#d4b483] transition-colors"
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
            <h1 className="text-4xl md:text-6xl font-light text-[#d4b483] leading-snug mb-12 tracking-wide uppercase">
              Stitched Wings
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#d4b483]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={resolveAsset("sreya.png")} 
                  alt="Sreya Raghavan" 
                  width={128} 
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#d4dbe8] font-serif">Sreya Raghavan</p>
              <p className="text-sm md:text-base text-[#d4dbe8]/60 mt-1 font-sans font-light uppercase tracking-widest">
                2nd Year, Electrical & Electronics
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-16 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#b0bbcf] font-light text-center italic"
        >
          <div className="space-y-4">
            <p>People speaks of roots and wings</p>
            <p>As though they belong to different lives</p>
            <p className="text-[#d4b483]">My roots and wings grew together.</p>
          </div>

          <div className="space-y-4">
            <p>My roots were not gardens</p>
            <p>They were late nights of swallowed tears</p>
            <p>Fears that sat beside me</p>
            <p>Like silent companions.</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#d4b483]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>They hold me to places</p>
            <p>I want to forget</p>
            <p>They reminded me of storms</p>
            <p>Long after the rain had passed</p>
          </div>

          <div className="space-y-4">
            <p>From the same soil</p>
            <p>Wings began to grow</p>
            <p>Stitched from hope</p>
            <p>From dreams whispered softly</p>
            <p>To a heart that almost gave up</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#d4b483]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4 pb-24">
            <p>So I keep moving forward</p>
            <p>Carrying both the ache and ambition</p>
            <p>Hoping that one day</p>
            <p>My parents look at me and smile</p>
            <p>And see not the girl who struggled</p>
            <p className="text-2xl md:text-4xl text-[#d4b483] mt-8 pt-4 block">
              But the girl who flew.
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
