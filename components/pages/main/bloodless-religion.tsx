"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const POEM_STANZAS = [
  "I was born simply as a human being,\nYet faith and names were given to me.\nCustoms shaped the way I lived,\nAnd slowly, differences became walls.",
  "We kneel in temples, churches, and mosques,\nThough the same sky stretches above us all\nAnd the same red blood runs within us.\nStill, people fight in the name of belief.",
  "No child enters this world with hatred,\nNor does any god ask us to divide.\nIt is we who draw the lines,\nTeaching fear where there could be love.",
  "What value do our labels have\nIf they keep us apart?\nBehind prayers and ancient rituals,\nWe are children of the same earth.",
  "Let history remember us \nNot for the barriers we created,\nBut for the strength to break them\nAnd see each other as human.",
  "When every voice falls silent \nAnd every difference disappears,\nPerhaps the only truth left behind \nWill be our shared humanity."
];

export function BloodlessReligion() {
  return (
    <section
      id="sec-bloodless-religion"
      className="relative w-full bg-[#080808] text-[#f4f4f2] font-sans selection:bg-[#f4f4f2] selection:text-[#080808]"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

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
              <div className="w-8 h-[2px] bg-[#f4f4f2] mb-8" />
              <p className="font-mono text-[9px] tracking-[0.4em] text-white/30 uppercase mb-6">
                Poetry · Volume 4
              </p>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1] text-white/90">
                Bloodless
                <br />
                <span className="italic text-white/40">Religion</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-5"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden relative border border-white/10 shrink-0">
                <Image 
                  src={resolveAsset("navya.png")}
                  alt="Navya John" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-1">
                  Written by
                </span>
                <span className="font-sans text-xl md:text-2xl font-medium tracking-tight text-white/90">
                  Navya John
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase mt-1">
                  2nd Year · EEE
                </span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Right Column - Poem Content */}
        <div className="w-full md:w-2/3 md:pl-16 md:border-l border-white/10 pt-4 md:pt-0">
          <div className="flex flex-col gap-16 md:gap-24">
            {POEM_STANZAS.map((stanza, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className="absolute -left-4 md:-left-8 top-1.5 font-mono text-[9px] tracking-widest text-white/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="font-serif text-2xl md:text-3xl lg:text-[34px] font-light leading-[1.7] tracking-wide text-white/80 whitespace-pre-line">
                  {stanza}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-[1px] bg-white/20 origin-left mt-24"
          />
        </div>

      </div>
      
      <footer className="w-full border-t border-white/5 bg-[#040404]">
        <div className="mx-auto max-w-[1200px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <span>Inquation 2025–26</span>
          <span>Poetry Collection</span>
        </div>
      </footer>
    </section>
  );
}

export default BloodlessReligion;
