"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useAudio } from "@/context/audio.context";
import { preload } from "@/lib/preload";
import { resolveAsset } from "@/lib/asset-registry";
import { clockEssay } from "@/lib/clock-essay";

const TIME_DILATION_BG = resolveAsset("time-dilation.mp3");

const IMAGES = {
  hero: resolveAsset("clock-essay-hero.webp"),
  clock: resolveAsset("clock-essay-clock.webp"),
  mind: resolveAsset("clock-essay-mind.webp"),
  depth: resolveAsset("clock-essay-depth.webp"),
  life: resolveAsset("clock-essay-life.webp"),
  rain: resolveAsset("clock-essay-rain.webp"),
  campus: resolveAsset("clock-essay-campus.webp"),
};

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ClockEssay() {
  const containerRef = useRef<HTMLElement>(null);
  const { playbg } = useAudio();

  useEffect(() => {
    preload(TIME_DILATION_BG, "audio");
  }, []);

  const isInView = useInView(containerRef, { amount: 0.05, margin: "150px 0px" });

  useEffect(() => {
    if (isInView) {
      playbg(TIME_DILATION_BG, { loop: true, volume: 0.3, startSeconds: 10 });
    }
  }, [isInView, playbg]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.8 });

  return (
    <section
      ref={containerRef}
      id="sec-i"
      aria-labelledby="clock-essay-title"
      className="relative w-full bg-[#d9d4c7] text-[#191713] font-sans"
    >

      {/* ─── CHAPTER 0: HERO ─────────────────────────────────────────── */}
      <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col">
        {/* Full bleed image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Sundial in light"
            className="w-full h-full object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#d9d4c7]" />
        </div>

        {/* Top nav bar */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
            Inquation · Reflection
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
            02
          </div>
        </header>

        {/* Hero Title — bottom anchored */}
        <div className="relative z-10 mt-auto px-6 pb-16 md:px-16 md:pb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#a84e2a] mb-5"
          >
            ഒരു ചിന്ത
          </motion.p>
          <motion.h2
            id="clock-essay-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw] leading-[0.88] tracking-tight text-white"
          >
            THE TIME<br />
            A CLOCK<br />
            <span className="text-[#c96a45]">DOESN&apos;T TELL.</span>
          </motion.h2>
        </div>
      </div>


      {/* ─── CHAPTER 1: OPENING PARAGRAPH ───────────────────────────── */}
      <div className="relative w-full py-28 md:py-40 px-6 md:px-16 flex justify-center">
        <FadeIn className="max-w-3xl text-center">
          <p className="text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.75] text-[#191713]/85" lang="ml">
            {clockEssay[0].malayalam}
          </p>
        </FadeIn>
      </div>


      {/* ─── CHAPTER 2: THE CLOCK (image right, text left) ───────────── */}
      <div className="relative w-full min-h-[80vh] flex flex-col md:flex-row overflow-hidden">
        {/* Text column */}
        <div className="relative z-10 w-full md:w-[45%] flex flex-col justify-center px-6 py-20 md:px-16 md:py-32 bg-[#d9d4c7]">
          <FadeIn>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#191713]/40 block mb-8">ഘടികാരം</span>
            <p className="text-xl md:text-2xl leading-[1.8] text-[#191713]/80" lang="ml">
              {clockEssay[1].malayalam}
            </p>
          </FadeIn>
        </div>
        {/* Image column — overlaps slightly */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[58%] md:-ml-[3%] h-72 md:h-auto md:min-h-[70vh] flex-shrink-0 relative overflow-hidden"
        >
          <img src={IMAGES.clock} alt="Pocket watch" className="w-full h-full object-cover object-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#d9d4c7] via-transparent to-transparent md:block hidden" />
        </motion.div>
      </div>


      {/* ─── CHAPTER 3: THE MIND (image left, text right) ────────────── */}
      <div className="relative w-full min-h-[80vh] flex flex-col md:flex-row-reverse overflow-hidden">
        {/* Text column */}
        <div className="relative z-10 w-full md:w-[45%] flex flex-col justify-center px-6 py-20 md:px-16 md:py-32 bg-[#d9d4c7]">
          <FadeIn>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#191713]/40 block mb-8">മനസ്സ്</span>
            <p className="text-xl md:text-2xl leading-[1.8] text-[#191713]/80" lang="ml">
              {clockEssay[2].malayalam}
            </p>
          </FadeIn>
        </div>
        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[58%] md:-mr-[3%] h-72 md:h-auto md:min-h-[70vh] flex-shrink-0 relative overflow-hidden"
        >
          <img src={IMAGES.mind} alt="Window corridor light" className="w-full h-full object-cover object-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#d9d4c7] via-transparent to-transparent md:block hidden" />
        </motion.div>
      </div>


      {/* ─── CHAPTER 4: EINSTEIN / FULL-WIDTH TEXT BREAK ─────────────── */}
      <div className="relative w-full py-28 md:py-40 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-10 md:gap-16 items-start">
          <FadeIn>
            <p className="text-xl md:text-2xl leading-[1.85] text-[#191713]/75" lang="ml">
              {clockEssay[3].malayalam}
            </p>
          </FadeIn>
          {/* Divider */}
          <div className="hidden md:block w-px bg-[#191713]/20 self-stretch" />
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl leading-[1.85] text-[#191713]/75" lang="ml">
              {clockEssay[4].malayalam}
            </p>
          </FadeIn>
        </div>
      </div>


      {/* ─── CHAPTER 5: DEPTH PULL QUOTE (dark full-bleed) ───────────── */}
      <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.depth} alt="Deep space" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-[#191713]/80" />
        </div>
        <FadeIn className="relative z-10 px-6 py-32 md:px-20 text-center max-w-5xl">
          <p className="font-heading text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4.2vw] leading-[1.25] tracking-tight text-[#d9d4c7]" lang="ml">
            {clockEssay[6].malayalam}
          </p>
        </FadeIn>
      </div>


      {/* ─── CHAPTER 6: LIFE & FRIENDS (portrait image + two columns) ── */}
      <div className="relative w-full py-28 md:py-40 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Tall portrait image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-[38%] flex-shrink-0 overflow-hidden"
          >
            <img src={IMAGES.life} alt="Friends together" className="w-full aspect-[3/4] object-cover object-center grayscale" />
          </motion.div>
          {/* Two text blocks stacked */}
          <div className="flex-1 flex flex-col gap-14 pt-4 md:pt-12">
            <FadeIn>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#191713]/40 block mb-5">ജീവിതം</span>
              <p className="text-xl md:text-2xl leading-[1.8] text-[#191713]/80" lang="ml">
                {clockEssay[5].malayalam}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="w-12 h-px bg-[#191713]/25" />
              <p className="text-xl md:text-2xl leading-[1.8] text-[#191713]/80 mt-8" lang="ml">
                {clockEssay[7].malayalam}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>


      {/* ─── CHAPTER 7: RAIN GHOST IMAGE ─────────────────────────────── */}
      <div className="relative w-full overflow-hidden">
        {/* Full bleed ghost image */}
        <div className="absolute inset-0">
          <img src={IMAGES.rain} alt="Rain" className="w-full h-full object-cover object-center grayscale opacity-20" />
        </div>
        <div className="relative z-10 py-28 md:py-48 px-6 md:px-20 flex justify-center">
          <FadeIn className="max-w-3xl text-center">
            <p className="text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.75] text-[#191713]/90" lang="ml">
              {clockEssay[8].malayalam}
            </p>
          </FadeIn>
        </div>
      </div>


      {/* ─── CHAPTER 8: CAMPUS (image right, text left) ──────────────── */}
      <div className="relative w-full min-h-[70vh] flex flex-col md:flex-row overflow-hidden">
        <div className="relative z-10 w-full md:w-[50%] flex flex-col justify-center px-6 py-20 md:px-16 md:py-32 bg-[#d9d4c7]">
          <FadeIn>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#191713]/40 block mb-8">ഓർമ്മ</span>
            <p className="text-xl md:text-2xl leading-[1.8] text-[#191713]/80" lang="ml">
              {clockEssay[9].malayalam}
            </p>
          </FadeIn>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[55%] md:-ml-[5%] h-64 md:h-auto md:min-h-[60vh] flex-shrink-0 relative overflow-hidden"
        >
          <img src={IMAGES.campus} alt="College campus" className="w-full h-full object-cover object-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#d9d4c7] via-transparent to-transparent md:block hidden" />
        </motion.div>
      </div>


      {/* ─── CONCLUSION ───────────────────────────────────────────────── */}
      <div className="w-full py-40 md:py-64 px-6 text-center border-t border-[#191713]/15">
        <FadeIn className="max-w-3xl mx-auto">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#191713]/40 block mb-10">
            ഉപസംഹാരം
          </span>
          <p className="font-heading text-[8vw] sm:text-[6vw] md:text-[4.5vw] lg:text-[3.8vw] leading-[1.3] text-[#191713]" lang="ml">
            {clockEssay[10].malayalam}
          </p>
        </FadeIn>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-[#191713]/10">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#191713]/40">
          GEC Wayanad · 2025-26
        </div>
        <div className="font-sans text-[10px] text-[#191713]/40" lang="ml">
          ഘടികാരം പറയാത്ത സമയം
        </div>
      </footer>

    </section>
  );
}

export default ClockEssay;
