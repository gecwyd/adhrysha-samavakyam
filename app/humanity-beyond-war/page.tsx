"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export default function HumanityBeyondWarPage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1f2224] text-[#e2e8f0] selection:bg-[#8da6b9]/30 font-serif">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-humanity-beyond-war" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e2e8f0] hover:text-[#8da6b9] transition-colors"
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
            <h1 className="text-4xl md:text-6xl font-light text-[#8da6b9] leading-snug mb-12 tracking-wide uppercase">
              When Humanity<br/>Stands Beyond War
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#8da6b9]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={resolveAsset("saliha.png")} 
                  alt="Saliha VK" 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#e2e8f0] font-serif">Saliha VK</p>
              <p className="text-sm md:text-base text-[#e2e8f0]/60 mt-1 font-sans font-light uppercase tracking-widest">
                2nd Year, Electronics & Comm.
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-16 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#cbd5e1] font-light text-center italic"
        >
          <div className="space-y-4">
            <p>I have never stood on a battlefield,</p>
            <p>Yet I have heard its echoes</p>
            <p>Through the cries of children,</p>
            <p>The silence of broken homes,</p>
            <p>And the eyes that have forgotten what peace looks like.</p>
          </div>

          <div className="space-y-4">
            <p>War may begin with power and politics,</p>
            <p>But it always ends in the lives of ordinary people.</p>
            <p>A child does not know the language of borders;</p>
            <p>A mother does not pray for victory—</p>
            <p className="text-[#8da6b9]">She only prays that her family survives another night.</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#8da6b9]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>The sky belongs to everyone,</p>
            <p>Yet today it carries smoke instead of dreams.</p>
            <p>The earth beneath our feet</p>
            <p>Does not ask who we are,</p>
            <p>Why then do we let hatred decide our future?</p>
          </div>

          <div className="space-y-4">
            <p>I dream of a world</p>
            <p>Where schools are rebuilt before weapons,</p>
            <p>Where hands reach to heal, not to harm,</p>
            <p>Where every child grows up</p>
            <p>Knowing books more than fear.</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#8da6b9]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>Perhaps I cannot stop a war.</p>
            <p>Perhaps my words cannot silence the guns.</p>
            <p>But I can choose compassion over hatred,</p>
            <p>Hope over despair,</p>
            <p>And humanity over division.</p>
          </div>

          <div className="space-y-4">
            <p>Because in the end,</p>
            <p>No nation truly wins</p>
            <p>When innocent lives are lost.</p>
          </div>
          
          <div className="space-y-4 pb-24">
            <p>The greatest victory</p>
            <p>Will never be written in the history of wars,</p>
            <p>But in the day</p>
            <p className="text-2xl md:text-4xl text-[#8da6b9] mt-8 pt-4 block">
              When humanity finally stands beyond war
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
