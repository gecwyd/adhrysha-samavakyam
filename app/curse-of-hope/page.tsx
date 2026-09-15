"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { resolveAsset } from "@/lib/asset-registry";

export default function CurseOfHopePage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#140f1a] text-[#d5c7e8] selection:bg-[#d98fa6]/30 font-serif">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-curse-of-hope" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d5c7e8] hover:text-[#d98fa6] transition-colors"
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
            <h1 className="text-4xl md:text-6xl font-light text-[#d98fa6] leading-snug mb-12 tracking-wide uppercase">
              The Curse of Hope
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#d98fa6]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <img 
                  src={resolveAsset("nivedya.png")} 
                  alt="Nivedya A" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-[#d5c7e8] font-serif">Nivedya A</p>
              <p className="text-sm md:text-base text-[#d5c7e8]/60 mt-1 font-sans font-light uppercase tracking-widest">
                1st Year, Electronics & Comm.
              </p>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-16 text-lg md:text-2xl leading-[2] md:leading-[2.2] text-[#c0aec9] font-light text-center italic"
        >
          <div className="space-y-4">
            <p>She loves without limitations</p>
            <p>She always did love the people.</p>
            <p>She always believed someone would find her</p>
            <p>the way she wanted,</p>
            <p>And she thought that person was the one.</p>
            <p>Maybe that&apos;s her mistake;</p>
            <p className="text-[#d98fa6]">That&apos;s her curse.</p>
          </div>

          <div className="space-y-4">
            <p>She let them know too much,</p>
            <p>And still, she doesn&apos;t know she is naive</p>
            <p>Because she thinks 11:11 wishes always come true.</p>
            <p>People take all the love in her like it&apos;s free;</p>
            <p>People always use her kindness like it&apos;s endless.</p>
            <p>Little did they know, it cost her everything;</p>
            <p>It cost her herself and her happiness.</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#d98fa6]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            <p>Every time they don&apos;t pick up her call,</p>
            <p>Every day they are not there for her,</p>
            <p>She still believes they want her.</p>
            <p>And that&apos;s how she ended up being helpless;</p>
            <p>That&apos;s why she doesn&apos;t want to trust anyone;</p>
            <p>That&apos;s why she doesn&apos;t want to fall in love again.</p>
          </div>

          <div className="space-y-4">
            <p>Every time they leave, she knows something in her dims;</p>
            <p>Every time they come again, she knows something lights her up.</p>
            <p>But now she is sure they wouldn&apos;t be there,</p>
            <p>And now she doesn&apos;t want anyone to do that,</p>
            <p>Because even after everything,</p>
            <p>It&apos;s the same thing the world gives her.</p>
            <p>Not everyone can handle a heart like hers,</p>
            <p>But even now, she believes they could—</p>
            <p>And that&apos;s not her fault.</p>
          </div>

          <div className="py-8 my-12">
            <div className="w-px h-16 bg-gradient-to-b from-[#d98fa6]/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-4 pb-24">
            <p>Still, she doesn&apos;t know how much longer she will</p>
            <p>Keep loving them over everything.</p>
            <p>Still, she believes they love her the same way:</p>
            <p className="text-xl md:text-3xl text-[#d98fa6] mt-8 pt-4 block">
              Not out of sympathy,<br/>
              But out of love...
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
