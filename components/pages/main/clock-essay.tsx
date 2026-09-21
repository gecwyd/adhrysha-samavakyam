"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

interface Chapter {
  label?: string;
  text: string;
  image: keyof typeof IMAGES;
  dark?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    label: "ആദ്യം",
    text: clockEssay[0].malayalam,
    image: "hero",
  },
  {
    label: "ഘടികാരം",
    text: clockEssay[1].malayalam,
    image: "clock",
  },
  {
    label: "മനസ്സ്",
    text: clockEssay[2].malayalam,
    image: "mind",
  },
  {
    label: "ആപേക്ഷികത",
    text: clockEssay[3].malayalam,
    image: "depth",
    dark: true,
  },
  {
    text: clockEssay[4].malayalam,
    image: "depth",
    dark: true,
  },
  {
    label: "ജീവിതം",
    text: clockEssay[5].malayalam,
    image: "life",
  },
  {
    label: "ആഴം",
    text: clockEssay[6].malayalam,
    image: "depth",
    dark: true,
  },
  {
    label: "നാല് വർഷം",
    text: clockEssay[7].malayalam,
    image: "campus",
  },
  {
    label: "ഓർമ്മ",
    text: clockEssay[8].malayalam,
    image: "rain",
  },
  {
    text: clockEssay[9].malayalam,
    image: "rain",
  },
  {
    label: "ഉപസംഹാരം",
    text: clockEssay[10].malayalam,
    image: "hero",
  },
];

const N = CHAPTERS.length;

function ProgressDots({ active, total, dark }: { active: number; total: number; dark: boolean }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: i === active ? 20 : 4,
            opacity: i === active ? 1 : i < active ? 0.5 : 0.2,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-[2px] rounded-full"
          style={{ backgroundColor: dark ? "rgba(217,212,199,0.8)" : "rgba(25,23,19,0.7)" }}
        />
      ))}
    </div>
  );
}

export function ClockEssay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { playbg } = useAudio();
  const [active, setActive] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    preload(TIME_DILATION_BG, "audio");
    Object.values(IMAGES).forEach((src) => preload(src, "image"));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * N), N - 1);
      setActive(idx);
      if (v > 0.01 && !hasEntered) {
        setHasEntered(true);
        playbg(TIME_DILATION_BG, { loop: true, volume: 0.3, startSeconds: 10 });
      }
    });
    return unsub;
  }, [scrollYProgress, playbg, hasEntered]);

  const chapter = CHAPTERS[active];
  const isDark = chapter?.dark ?? false;
  const textColor = isDark ? "rgba(217,212,199,0.92)" : "rgba(25,23,19,0.88)";
  const labelColor = isDark ? "rgba(201,106,69,0.9)" : "rgba(168,78,42,0.85)";
  const dividerColor = isDark ? "rgba(217,212,199,0.2)" : "rgba(25,23,19,0.15)";

  const progressText = `${String(active + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;

  return (
    <section
      id="sec-i"
      aria-labelledby="clock-essay-title"
    >
      {/* Hero screen — full viewport before sticky scroll begins */}
      <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col bg-[#0d0b09]">
        <img
          src={IMAGES.hero}
          alt="Ancient sundial at sunrise"
          className="absolute inset-0 w-full h-full object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/40 to-[#0d0b09]" />

        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-14">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">Inquation · Reflection</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">02</span>
        </header>

        <div className="relative z-10 mt-auto px-6 pb-16 md:px-14 md:pb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c96a45] mb-5"
          >
            ഒരു ചിന്ത
          </motion.p>
          <motion.h2
            id="clock-essay-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading leading-[0.88] tracking-tight text-white"
            style={{ fontSize: "clamp(3.2rem, 12vw, 8rem)" }}
          >
            ഘടികാരം<br />
            <span className="text-[#c96a45]">പറയാത്ത</span><br />
            സമയം
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex items-center gap-3"
          >
            <div className="w-6 h-px bg-white/40" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40">
              Scroll to read
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── STICKY SCROLL SECTION ─────────────────────────────────────── */}
      {/* Outer div sets the total scroll height */}
      <div
        ref={containerRef}
        style={{ height: `${N * 100}vh` }}
        className="relative"
      >
        {/* Sticky viewport */}
        <div
          ref={stickyRef}
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: "100dvh" }}
        >
          {/* ── Background images ─────────────────────────────────────── */}
          <div className="absolute inset-0">
            {(Object.keys(IMAGES) as (keyof typeof IMAGES)[]).map((key) => {
              const isActive = IMAGES[key] === IMAGES[chapter.image];
              return (
                <motion.div
                  key={key}
                  className="absolute inset-0"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <img
                    src={IMAGES[key]}
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover object-center"
                    style={{ filter: isDark ? "grayscale(20%) brightness(0.4)" : "grayscale(60%) brightness(0.65)" }}
                  />
                </motion.div>
              );
            })}
            {/* Color overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "dark" : "light"}
                className="absolute inset-0 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  background: isDark
                    ? "linear-gradient(to bottom, rgba(10,8,6,0.85) 0%, rgba(10,8,6,0.75) 100%)"
                    : "linear-gradient(to bottom, rgba(217,212,199,0.88) 0%, rgba(217,212,199,0.82) 100%)",
                }}
              />
            </AnimatePresence>
          </div>

          {/* ── UI CHROME ─────────────────────────────────────────────── */}
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
            <span
              className="font-mono text-[9px] tracking-[0.28em] uppercase transition-colors duration-700"
              style={{ color: isDark ? "rgba(217,212,199,0.4)" : "rgba(25,23,19,0.35)" }}
            >
              Inquation · Reflection
            </span>
            <span
              className="font-mono text-[9px] tracking-[0.28em] uppercase tabular-nums transition-colors duration-700"
              style={{ color: isDark ? "rgba(217,212,199,0.4)" : "rgba(25,23,19,0.35)" }}
            >
              {progressText}
            </span>
          </div>

          {/* Right side progress bar */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-30">
            <ProgressDots active={active} total={N} dark={isDark} />
          </div>

          {/* ── CHAPTER CONTENT ───────────────────────────────────────── */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-16">
            <div className="w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col"
                >
                  {/* Chapter label */}
                  {chapter.label && (
                    <div className="flex items-center gap-3 mb-7">
                      <div
                        className="w-5 h-px transition-colors duration-700"
                        style={{ backgroundColor: labelColor }}
                      />
                      <span
                        className="font-mono text-[10px] tracking-[0.35em] uppercase transition-colors duration-700"
                        style={{ color: labelColor }}
                      >
                        {chapter.label}
                      </span>
                    </div>
                  )}

                  {/* Text */}
                  <p
                    lang="ml"
                    className="leading-[1.85] transition-colors duration-700"
                    style={{
                      color: textColor,
                      fontFamily: "Georgia, serif",
                      fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                    }}
                  >
                    {chapter.text}
                  </p>

                  {/* Bottom divider */}
                  <motion.div
                    className="mt-10 h-px w-10 transition-colors duration-700"
                    style={{ backgroundColor: dividerColor }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom scroll nudge — only on first chapter */}
          <AnimatePresence>
            {active === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  className="w-px h-8 rounded-full"
                  style={{ backgroundColor: isDark ? "rgba(217,212,199,0.3)" : "rgba(25,23,19,0.25)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── POST-SCROLL FOOTER ────────────────────────────────────────── */}
      <div
        className="w-full flex items-center justify-between px-6 py-6 md:px-14 md:py-8 border-t"
        style={{
          backgroundColor: "#d9d4c7",
          borderColor: "rgba(25,23,19,0.1)",
        }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#191713]/35">
          GEC Wayanad · 2025–26
        </span>
        <span className="font-mono text-[9px] text-[#191713]/35" lang="ml">
          ഘടികാരം പറയാത്ത സമയം
        </span>
      </div>
    </section>
  );
}

export default ClockEssay;
