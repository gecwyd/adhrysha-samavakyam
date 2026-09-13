"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const POEM_LINES = [
  "Sometimes",
  "i wonder what",
  "the little girl i used to be",
  "would think of me now.",
  "would she notice",
  "all the ways i’ve changed,",
  "or all the ways",
  "i’ve stayed the same?",
  "",
  "i hope she'd see",
  "that even after disappointment,",
  "i still choose hope.",
  "that even after everything,",
  "i still choose love.",
  "that even after getting lost,",
  "i still find my way back to myself.",
  "",
  "life didn't become",
  "what we imagined.",
  "some dreams changed.",
  "some doors closed.",
  "some lessons arrived",
  "harder than they needed to.",
  "",
  "but i'm still here.",
  "still learning.",
  "still growing.",
  "still believing",
  "there is something beautiful",
  "waiting ahead.",
  "",
  "and i think",
  "the little girl i used to be",
  "wouldn't care about",
  "everything i haven't done yet.",
  "she'd just be proud",
  "that i never stopped trying.",
];

function ScrollLine({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // The line fades in as it enters the middle third of the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "center 45%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(4px)", "blur(0px)"]);
  const y = useTransform(scrollYProgress, [0, 1], [15, 0]);

  if (!text) {
    return <div className="h-10 sm:h-16 md:h-20" aria-hidden="true" />;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, filter, y }}
      className="font-serif text-[26px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-[1.3] text-center text-[#e6e0d3] tracking-tight italic drop-shadow-md will-change-[opacity,filter,transform]"
    >
      {text}
    </motion.div>
  );
}

export function ShedBeProud() {
  return (
    <section
      id="sec-n"
      aria-labelledby="shed-be-proud-title"
      className="relative w-full bg-[#1b1915] text-[#e6e0d3]"
    >
      {/* Fixed Background Watermark */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none z-0 px-6">
        <div className="flex items-center gap-4 sm:gap-6 mb-8 opacity-20">
          <div className="w-12 sm:w-20 h-[1px] bg-[#d99065]" />
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#d99065]">
            For the person still becoming
          </p>
          <div className="w-12 sm:w-20 h-[1px] bg-[#d99065]" />
        </div>
        <h2 className="font-heading text-[28vw] sm:text-[22vw] leading-[0.8] tracking-[-0.04em] text-[#e6e0d3] opacity-[0.03] text-center">
          SHE’D
          <br />
          BE <span className="text-[#d99065]">PROUD.</span>
        </h2>
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-[80vh] pb-32">
        
        {/* The Poem */}
        <div className="flex flex-col">
          {POEM_LINES.map((line, i) => (
            <ScrollLine key={i} text={line} />
          ))}
        </div>

        {/* The Author Lockup */}
        <div className="mt-40 md:mt-56 flex justify-center pb-20">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-full grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700 border border-[#e6e0d3]/10 mb-6 sm:mb-8 shadow-xl">
              <Image 
                src="/nivedya.png" 
                alt="Author portrait of Nivedya" 
                fill 
                sizes="144px" 
                className="object-cover" 
              />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#d99065] mb-3 sm:mb-4">
              Written by
            </span>
            <span className="font-sans text-4xl sm:text-5xl lg:text-[64px] tracking-tight text-[#e6e0d3] mb-2 sm:mb-4 leading-none">
              Nivedya
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-[#e6e0d3]/40">
              First year · Electronics & Communication
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-[#e6e0d3]/5 bg-[#1b1915]/50 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#e6e0d3]/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Author · Nivedya</span>
          <span>College Union 2026–27 · Source page 22</span>
        </div>
      </footer>
    </section>
  );
}

export default ShedBeProud;
