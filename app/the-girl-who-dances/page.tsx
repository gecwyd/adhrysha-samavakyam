"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export default function TheGirlWhoDancesPage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#370a0a] text-[#fef3c7] selection:bg-[#fbbf24]/30 font-serif">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-the-girl-who-dances" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#fef3c7] hover:text-[#fbbf24] transition-colors"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#fbbf24] leading-snug mb-12 tracking-wide uppercase">
              The Girl Who Still<br/>Dances In Her Heart
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#fbbf24]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={resolveAsset("ashtami.png")} 
                  alt="Ashtami Chandran" 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#fef3c7] font-serif">Ashtami Chandran</p>
              <p className="text-sm md:text-base text-[#fef3c7]/60 mt-1 font-sans font-light uppercase tracking-widest">
                1st Year, Electronics & Comm.
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-16 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#fde68a] font-light text-center italic"
        >
          <div className="space-y-4">
            <p>I began dancing at the age of three,</p>
            <p>On stages that felt like another world to me-</p>
            <p>A place where music became my breath,</p>
            <p>And movements spoke the words I couldn’t say.</p>
          </div>

          <div className="space-y-4">
            <p>As I grew, dance too grew with me.</p>
            <p>Bharathanatyam shaped my discipline,</p>
            <p>Kuchipudi gifted me grace,</p>
            <p>Mohiniyattam filled me with emotion.</p>
            <p>Together they became language of my life.</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#fbbf24]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>But life had its own choreography</p>
            <p>My health shifted, quietly, slowly</p>
            <p>And the art that once lived in my bones</p>
            <p>Began slipping away</p>
            <p>Like sand through tired fingers.</p>
          </div>

          <div className="space-y-4">
            <p>People told me, &ldquo;you’re lucky you danced so long,&rdquo;</p>
            <p>&ldquo;take rest now&rdquo;, But they never know</p>
            <p>When dance is your heartbeat,</p>
            <p className="text-[#fbbf24]">Stopping feels like small death every single day.</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#fbbf24]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>Even now, when temple bells ring</p>
            <p>Or ankle bells echo in the distance,</p>
            <p>My eyes soften with tears.</p>
            <p>My mind still create steps</p>
            <p>My soul still lifts with rhythm</p>
            <p>But my body refuses to follow.</p>
          </div>

          <div className="space-y-4">
            <p>The doctor sir said,</p>
            <p>&ldquo;You shouldn’t dance until you’re 20&rdquo;.</p>
            <p>Just two years.</p>
            <p>But for me its felt like forever.</p>
            <p>I try to be strong Sometimes I cry silent,</p>
            <p>Because passion hurts.</p>
            <p>When it becomes something you must let go</p>
          </div>
          
          <div className="space-y-4 pb-24">
            <p>But deep inside, the dancer never stopped</p>
            <p>She still dreams in mudras,</p>
            <p>Counts the beat of thalam</p>
            <p>Reflect herself in every dancer on stage</p>
            <p>No doctor, no pain, no fear no waiting</p>
            <p className="mt-8 pt-4">Can pull dance from my soul</p>
            <p>I was born to dance I will dance again</p>
            <p>I’m still a dancer</p>
            <p className="text-2xl md:text-4xl text-[#fbbf24] mt-8 pt-4 block">
              Just waiting for my comeback.
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
