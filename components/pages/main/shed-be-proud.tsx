"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const POEM_STANZAS = [
  [
    "Sometimes",
    "i wonder what",
    "the little girl i used to be",
    "would think of me now.",
    "would she notice",
    "all the ways i’ve changed,",
    "or all the ways",
    "i’ve stayed the same?"
  ],
  [
    "i hope she'd see",
    "that even after disappointment,",
    "i still choose hope.",
    "that even after everything,",
    "i still choose love.",
    "that even after getting lost,",
    "i still find my way back to myself."
  ],
  [
    "life didn't become",
    "what we imagined.",
    "some dreams changed.",
    "some doors closed.",
    "some lessons arrived",
    "harder than they needed to."
  ],
  [
    "but i'm still here.",
    "still learning.",
    "still growing.",
    "still believing",
    "there is something beautiful",
    "waiting ahead."
  ],
  [
    "and i think",
    "the little girl i used to be",
    "wouldn't care about",
    "everything i haven't done yet.",
    "she'd just be proud",
    "that i never stopped trying."
  ]
];

function Stanza({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 40%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, rotateX, scale, transformPerspective: 1200, transformOrigin: "bottom center" }}
      className="flex flex-col items-center gap-1 my-10 sm:my-16 will-change-transform"
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className="font-serif text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[1.4] text-center text-[#e6e0d3]/90 tracking-tight italic"
        >
          {line}
        </span>
      ))}
    </motion.div>
  );
}

export function ShedBeProud() {
  return (
    <section
      id="sec-n"
      aria-labelledby="shed-be-proud-title"
      className="relative w-full bg-[#0a0908] text-[#e6e0d3]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Image
            src={resolveAsset("shed-be-proud-art.webp")}
            alt="Vintage mirror reflecting morning light"
            fill
            className="object-cover opacity-40 mix-blend-luminosity scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/80 via-[#0a0908]/40 to-[#0a0908]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-[30vh] pb-32">

        {/* Intro Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center justify-center mb-32 sm:mb-48"
        >
          <div className="flex items-center gap-4 sm:gap-6 mb-8 opacity-60">
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#d99065]">
              For the person still becoming
            </p>
          </div>
          <h2
            id="shed-be-proud-title"
            className="font-heading text-[18vw] sm:text-[14vw] md:text-[120px] leading-[0.85] tracking-[-0.04em] text-[#e6e0d3] text-center"
          >
            SHE’D
            <br />
            BE <span className="text-[#d99065] italic">PROUD.</span>
          </h2>
        </motion.div>

        {/* Poem Stanzas */}
        <div className="flex flex-col items-center">
          {POEM_STANZAS.map((stanza, i) => (
            <Stanza key={i} lines={stanza} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 md:mt-32 flex justify-center pb-12"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-[#e6e0d3]/10 pt-16 w-full max-w-md justify-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ring-1 ring-[#e6e0d3]/20 shrink-0 shadow-lg bg-black/40">
              <Image
                src={resolveAsset("nivedya.webp")}
                alt="Portrait of Nivedya"
                fill
                sizes="96px"
                unoptimized
                className="object-cover hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d99065] mb-2">
                Written by
              </span>
              <span className="font-sans text-3xl sm:text-4xl tracking-tight text-[#e6e0d3] mb-2 leading-none">
                Nivedya
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#e6e0d3]/40">
                First year · Electronics & Communication
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="relative z-10 w-full border-t border-[#e6e0d3]/10 bg-[#0a0908]">
        <div className="mx-auto max-w-[1440px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#e6e0d3]/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Author · Nivedya</span>
        </div>
      </footer>
    </section>
  );
}

export default ShedBeProud;
