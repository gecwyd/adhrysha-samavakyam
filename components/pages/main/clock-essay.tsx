"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useAudio } from "@/context/audio.context";
import { preload } from "@/lib/preload";

const TIME_DILATION_BG = "https://youtu.be/m3zvVGJrTP8?si=4n9m6nylINfXnXh6";

const QUOTES = [
  {
    tag: "01 / DEPTH",
    english: "We can measure the length of time, but not its depth. Experience creates that depth.",
    malayalam: "അളക്കാൻ കഴിയുന്നത് സമയത്തിന്റെ ദൈർഘ്യമാണ്; ആ ആഴം സൃഷ്ടിക്കുന്നത് അനുഭവങ്ങളാണ്.",
  },
  {
    tag: "02 / PRECISION",
    english: "A clock records every moment with the same precision. To it, a second is always a second. It carries neither the rhythm of happiness, nor the weight of sorrow.",
    malayalam: "ഘടികാരം ഓരോ നിമിഷത്തെയും ഒരേ കൃത്യതയോടെ രേഖപ്പെടുത്തുന്നു. അതിൽ സന്തോഷത്തിന്റെ താളമില്ല, ദുഃഖത്തിന്റെ ഭാരമില്ല.",
  },
  {
    tag: "03 / RESONANCE",
    english: "Some meetings last only moments, yet their echoes can be heard for a lifetime. Some farewells are only a few words, but carry the weight of years.",
    malayalam: "ചില കൂടിക്കാഴ്ചകൾ നിമിഷങ്ങൾ മാത്രം നീണ്ടുനിൽക്കൂ; പക്ഷേ അവയുടെ പ്രതിധ്വനി ഒരു ജീവിതകാലം കേൾക്കാം.",
  },
  {
    tag: "04 / SYNTHESIS",
    english: "A clock tells us how much time has passed. Memories tell us how much that time has changed us.",
    malayalam: "ഘടികാരം നമ്മോട് പറയുന്നത് എത്ര സമയം കടന്നുപോയി എന്നതാണ്. ആ സമയം നമ്മെ എത്രമാത്രം മാറ്റിയെന്ന് പറയുന്നത് ഓർമ്മകളാണ്.",
  },
];

export function ClockEssay() {
  const containerRef = useRef<HTMLElement>(null);
  const { playbg, prebufferbg } = useAudio();

  useEffect(() => {
    prebufferbg(TIME_DILATION_BG);
    preload(TIME_DILATION_BG, "youtube");
  }, [prebufferbg]);

  const isInView = useInView(containerRef, { amount: "some", margin: "150px 0px" });

  useEffect(() => {
    if (isInView) {
      playbg(TIME_DILATION_BG, { loop: true, volume: 0.3, startSeconds: 10 });
    }
  }, [isInView, playbg]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.8 });

  const introOpacity = useTransform(smooth, [0, 0.1, 0.15], [1, 1, 0]);
  const introY = useTransform(smooth, [0, 0.15], ["0%", "-10%"]);

  const q0Opacity = useTransform(smooth, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const q0Y = useTransform(smooth, [0.15, 0.2, 0.3, 0.35], ["10%", "0%", "0%", "-10%"]);

  const q1Opacity = useTransform(smooth, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const q1Y = useTransform(smooth, [0.35, 0.4, 0.5, 0.55], ["10%", "0%", "0%", "-10%"]);

  const q2Opacity = useTransform(smooth, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const q2Y = useTransform(smooth, [0.55, 0.6, 0.7, 0.75], ["10%", "0%", "0%", "-10%"]);

  const q3Opacity = useTransform(smooth, [0.75, 0.8, 1, 1], [0, 1, 1, 1]);
  const q3Y = useTransform(smooth, [0.75, 0.8, 1, 1], ["10%", "0%", "0%", "0%"]);

  return (
    <section
      ref={containerRef}
      id="sec-i"
      aria-labelledby="clock-essay-title"
      className="relative h-[500vh] w-full bg-[#d9d4c7] text-[#191713]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        {/* Minimalist Background Graphic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-[120vmin] h-[120vmin] overflow-visible">
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#191713"
              strokeWidth="0.2"
              style={{ pathLength: smooth }}
              transform="rotate(-90 50 50)"
            />
            <circle cx="50" cy="50" r="48" fill="none" stroke="#191713" strokeWidth="0.05" strokeDasharray="0.5 1" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="2"
                x2="50"
                y2="4"
                stroke="#191713"
                strokeWidth="0.2"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#191713]/50">
            Inquation / Reflection
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#191713]/50 text-right">
            02
          </div>
        </header>

        {/* Content Layers */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#a84e2a] uppercase mb-6">
              A Bilingual Essay
            </p>
            <h2
              id="clock-essay-title"
              className="font-heading text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tight text-[#191713]"
            >
              THE TIME
              <br />
              A CLOCK
              <br />
              <span className="text-[#a84e2a]">DOESN&apos;T TELL.</span>
            </h2>
          </motion.div>

          {/* Quotes */}
          {[
            { opacity: q0Opacity, y: q0Y, quote: QUOTES[0] },
            { opacity: q1Opacity, y: q1Y, quote: QUOTES[1] },
            { opacity: q2Opacity, y: q2Y, quote: QUOTES[2] },
          ].map((item, index) => (
            <motion.div
              key={index}
              style={{ opacity: item.opacity, y: item.y }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#a84e2a] uppercase mb-8">
                {item.quote.tag}
              </span>
              <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#191713] leading-[1.2] max-w-4xl">
                &ldquo;{item.quote.english}&rdquo;
              </h3>
              <p className="font-sans text-sm md:text-lg text-[#191713]/60 mt-8 max-w-2xl" lang="ml">
                {item.quote.malayalam}
              </p>
            </motion.div>
          ))}

          {/* Final Quote & CTA */}
          <motion.div
            style={{ opacity: q3Opacity, y: q3Y }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-auto"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#a84e2a] uppercase mb-8">
              {QUOTES[3].tag}
            </span>
            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#191713] leading-[1.2] max-w-4xl">
              &ldquo;{QUOTES[3].english}&rdquo;
            </h3>
            <p className="font-sans text-sm md:text-lg text-[#191713]/60 mt-8 max-w-2xl" lang="ml">
              {QUOTES[3].malayalam}
            </p>
            <div className="mt-16">
              <Link
                href="/clock-essay"
                className="group inline-flex items-center gap-4 bg-[#191713] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d9d4c7] transition-all hover:bg-[#a84e2a]"
              >
                <span>Read the Full Essay</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#191713]/10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#191713]/40">
            GEC Wayanad · 2025-26
          </div>
          <div className="font-sans text-[10px] text-[#191713]/40" lang="ml">
            ഘടികാരം പറയാത്ത സമയം
          </div>
        </footer>
      </div>
    </section>
  );
}
