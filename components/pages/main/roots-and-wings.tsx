"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const POEM_PARTS = [
  "I buried my faith in your hands,\nAnd called it home.\nI named you my anchor,\nNever knowing you'd become\nthe tide that pulled me under.",
  "You were my compass,\nuntil I discovered\nthat even north can lie.\nYou became the roots,\nBeneath my quiet dreams.",
  "I was your tree.\nI spent my season growing leaves for you.\nI was your sun.\nI turned myself into your mornings.",
  "Then the day came.\nThe hand I trusted became a storm.\nI was trapped in a cave,\nWhere even daylight forgot my name.",
  "I searched for answers\nin the ashes of your promises.\nBut betrayal is strange\nIt buries the living, leaving no grave\nto mourn.",
  "For a while,\nI carried you like an anchor:\nHeavy enough to drown me,\nYet sacred enough\nthat I refused to let go.",
  "Then one morning,\nThe wind spoke, with a storm.\nThe scars on my soul\nBegan remembering\nthe shape of wings.",
  "Every tear became a feather.\nEvery feather remembered the sky.\nEvery lonely night became a sky,\nand the sky became\nthe home I had been seeking.",
  "You were my destination.\nYou were the lesson before it.\nThe roots still remember your name,\nBut my wings no longer need it.",
  "Now I fly\nNot because I escaped the fall,\nBut because I grew wings from it.\nI found the sun.\nI found both my roots and my wings."
];

function Stanza({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-32 md:mb-48 last:mb-0"
    >
      <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/30 mb-8">
        Stanza {String(index + 1).padStart(2, "0")}
      </span>
      <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-[1.8] text-[#111111] whitespace-pre-line">
        {text}
      </p>
    </motion.div>
  );
}

export function RootsAndWings() {
  return (
    <section
      id="sec-roots-and-wings"
      className="relative w-full bg-[#f4f4f2] text-[#111111] font-sans selection:bg-black selection:text-white"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 pt-24 md:pt-32 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Sticky Left Column: Title & Author */}
          <div className="w-full lg:w-1/3 flex flex-col relative">
            <div className="lg:sticky lg:top-32 flex flex-col gap-12">
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="w-8 h-[1px] bg-black mb-8" />
                <p className="font-mono text-[10px] tracking-[0.4em] text-black/40 uppercase mb-4">
                  Poetry · Volume 1
                </p>
                <h2 className="text-5xl md:text-6xl xl:text-7xl font-medium tracking-tighter leading-[0.9] text-[#111111] mb-2">
                  ROOTS
                </h2>
                <h2 className="text-5xl md:text-6xl xl:text-7xl font-light italic tracking-tighter leading-[0.9] text-black/40">
                  &amp; WINGS
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex items-center gap-6 mt-4 lg:mt-12"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden relative border border-black/10 shrink-0">
                  <Image 
                    src={resolveAsset("sefana-elizabeth.png")}
                    alt="Sefana Elizabeth" 
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-black/40 uppercase mb-1">
                    Written by
                  </span>
                  <span className="font-sans text-lg font-medium tracking-tight text-[#111111]">
                    Sefana Elizabeth
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-black/50 uppercase mt-0.5">
                    1st Year · ECE
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column: Scrolling Poetry */}
          <div className="w-full lg:w-2/3 max-w-3xl lg:pl-10 xl:pl-20">
            <div className="w-full h-px bg-black/10 mb-16 lg:hidden" />
            
            <div className="py-8 lg:py-24">
              {POEM_PARTS.map((text, i) => (
                <Stanza key={i} text={text} index={i} />
              ))}
            </div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-[1px] bg-black/20 origin-left mt-16"
            />
          </div>

        </div>
      </div>
      
      <footer className="w-full border-t border-black/5 bg-[#f0f0ee]">
        <div className="mx-auto max-w-[1600px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-black/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Inquation 2025–26</span>
          <span>Poetry Collection</span>
        </div>
      </footer>
    </section>
  );
}

export default RootsAndWings;
