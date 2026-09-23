"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mql);
    mql.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => mql.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, [breakpoint]);
  return isMobile;
}

/* Hero medallion: two North Malabar theyyam photographs cross-fade, tinted
   duotone to read like a spot-colour print rather than a full-colour photo. */
const HERO_IMAGES = [
  { key: "hero-1", src: resolveAsset("theyyam-hero-1.webp"), alt: "Theyyam performance in North Malabar" },
  { key: "hero-2", src: resolveAsset("theyyam-hero-2.webp"), alt: "Theyyam performer under torchlight at night" },
] as const;
const HERO_IMAGE_DURATION = 7000;

type Block =
  | { kind: "p"; text: string; lede?: boolean }
  | { kind: "quote"; lines: string[]; source: string };

const BLOCKS: Block[] = [
  {
    kind: "p",
    lede: true,
    text: "\"അവനവൻ ആത്മസുഖത്തിനായി ആചരിക്കുന്നവ അപരന് സുഖത്തിനായി വരേണം\" എന്നല്ലെ ഗുരുവചനം! 'ആചാരം' എന്ന വാക്കിൻ്റെ ഉൽപ്പത്തി പരിശോധിച്ചാൽ അതൊരു നിരന്തരയാത്രയെ സൂചിപ്പിക്കുന്നതായി മനസിലാക്കാം. ഒരുപക്ഷെ മനുഷ്യൻ്റെ ജീവിതയാത്രയിൽ വ്യത്യസ്തങ്ങളായ ആചാര അനുഷ്ഠാനങ്ങൾ സ്വാധീനിക്കാറുണ്ട്.",
  },
  {
    kind: "p",
    text: "അത്തരത്തിൽ ഉത്തരമലബാറിലെ ജീവിത സംസ്കാരത്തിൽ ആഴത്തിൽ വേരുന്നിയ അനുഷ്ഠാന കലയാണ് തെയ്യം. നരവംശശാസ്ത്രപരമായും, സാമൂഹ്യശാസ്ത്രപരമായും തെയ്യത്തിനുള്ള പ്രസക്തിയും, മനുഷ്യ സംസ്കാരത്തിലേക്ക് നീണ്ടുനിൽക്കുന്ന അതിൻ്റെ വേരുകളും പടർച്ചകളും ഏറെ ചർച്ചചെയ്യപ്പെടേണ്ട വിഷയമാണ്.",
  },
  {
    kind: "p",
    text: "കേവലം ആചാരാനുഷ്ഠാനങ്ങൾക്കുമപ്പുറം ഒരു ദേശത്തിൻ്റെ സംസ്കാരവും, പൈതൃകവും, കൂട്ടായ്മയുമൊക്കെ ചേരുന്ന ഒരു കലാരൂപം എന്ന സവിശേഷതകൂടി ഉണ്ട് തെയ്യത്തിന്. ചരിത്രം എപ്പോഴും വിജയികളുടേതാണ്. എന്നാൽ തോറ്റു പോകാൻ വിസമ്മതിച്ചവരുടെ ചരിത്രമാണ് തെയ്യങ്ങൾ പറയുന്നത്.",
  },
  {
    kind: "p",
    text: "ശിശിരകാലത്തിൻ്റെ കുളിരിൽ ചെണ്ടയുടെ താളങ്ങൾക്കും, തോറ്റം പാട്ടുകൾക്കുമൊപ്പം ചുവപ്പണിഞ്ഞ തെയ്യക്കോലങ്ങൾ ആടുമ്പോൾ അതിനുപിന്നിൽ ഒരു വിലാപത്തിൻ്റെ ഈണം പ്രത്യക്ഷമാവുന്നുണ്ട്. തോറ്റം പാട്ടുകൾക്ക് ഒരു വിപ്ലവത്തിൻ്റെ വീര്യമുണ്ട്.",
  },
  {
    kind: "p",
    text: "അവിടെ ആടിത്തിമിർക്കുന്ന ആ ഓരോ തെയ്യക്കോലവും കേവലം മന്ത്രങ്ങളാൽ ആവാഹിക്കപ്പെട്ട ദേവതകളല്ല, മറിച്ച് അറിവിനെ ആയുധമാക്കിയതിന്റെ പേരിൽ ബലികഴിക്കപ്പെട്ട മനുഷ്യരുടെ ഉയിർത്തെഴുന്നേൽപ്പുകളാണ്. ജന്മിതത്തിന് എതിരെയും നാടുവാഴിത്തം കെട്ടിപ്പൊക്കിയ സാമൂഹിക വ്യവസ്ഥിതികൾക്കെതിരെയും നിലകൊണ്ടവരുടെ ചരിത്രകഥ ഇവയ്ക്ക് പിന്നിലുണ്ട്.",
  },
  {
    kind: "p",
    text: "കണ്ണീരും, ചോരയും വീണ ആ മണ്ണിൽ നിന്നാണ് പിന്നീട് നവോത്ഥാനത്തിൻ്റെ ആദ്യ സ്ഫുരണങ്ങൾ ഉണ്ടായത്. തെയ്യങ്ങളുടെ പുരാവൃത്തങ്ങൾ പരിശോധിച്ചാൽ അവ ആത്മീയതയേക്കാൾ ഉപരി ഭൗതികജീവിതത്തിന്റെ നേർക്കാഴ്ച്ചകളാണെന്ന് മനസിലാക്കാം.",
  },
  {
    kind: "p",
    text: "ജാതിയും, വരേണ്യതയും തീർത്ത വേലിക്കെട്ടുകൾക്കുമീതെ അറിവിൻ്റേയും, അതിജീവനത്തിൻറേയും ചെറുത്തുനിൽപ്പുകൾ അനിവാര്യമാണ് എന്ന സന്ദേശം ചരിത്രം മുന്നോട്ട് വയ്ക്കുന്നു. ഉദാഹരണത്തിന് ഉത്തരമലബാറിലെ പൊട്ടൻ തെയ്യത്തിൻ്റെ തോറ്റം പാട്ടിലെ ചില വരികളുണ്ട്:",
  },
  {
    kind: "quote",
    lines: [
      "നീങ്കളെക്കൊത്ത്യാലും ചോരല്ലേ ചൊവ്വറ്?",
      "നാങ്കളെക്കൊത്ത്യാലും ചോരലേ ചൊവ്വറ്?",
    ],
    source: "പൊട്ടൻ തെയ്യം · തോറ്റം പാട്ട്",
  },
  {
    kind: "p",
    text: "മനുഷ്യരെല്ലാം തുല്യരാണെന്നും, മനുഷ്യൻ്റെ സിരകളിലൂടെ ഒഴുകുന്ന രക്തത്തിന് ഒരേ നിറമാണ് എന്നും, ജാതിയുടെയും മതത്തിൻ്റേയും പേരിൽ ആരെയും ഉയർന്നവരോ, താഴ്ന്നവരോ ആയി കാണരുതെന്നും ഇതിലൂടെ വ്യക്തമാക്കുന്നു.",
  },
  {
    kind: "p",
    text: "ഇത്തരത്തിൽ അതിജീവനത്തിൻ്റെയും, ചെറുത്തുനിൽപ്പുകളുടയും തോറ്റം പാട്ടുകൾ ഇവിടംകൊണ്ട് അവസാനിക്കുന്നില്ല. അവ ഓരോ കാലത്തെയും അനീതികൾക്കും, അധർമ്മങ്ങൾക്കുമെതിരെ ശബ്ദിച്ചുകൊണ്ടേയിരിക്കും.",
  },
];

/* Paragraph ordinals, counted once at module scope so the quote does not consume a number. */
const ORDINALS = BLOCKS.reduce<number[]>((acc, block, i) => {
  acc[i] = block.kind === "p" ? (acc[i - 1] ?? 0) + 1 : acc[i - 1] ?? 0;
  return acc;
}, []);

/* The essay pivots at the Pottan Theyyam quote (index 7) — everything after it
   reads as the resistance half. Chapter marks land on those two halves. */
const QUOTE_INDEX = BLOCKS.findIndex((b) => b.kind === "quote");
const CHAPTERS = [
  { at: 0, numeral: "I", title: "അനുഷ്ഠാനം", sub: "Ritual" },
  { at: QUOTE_INDEX + 1, numeral: "II", title: "പ്രതിരോധം", sub: "Resistance" },
];

const TICKER_WORDS = ["തെയ്യം", "ഉത്തരമലബാർ", "അതിജീവനം", "ചെറുത്തുനിൽപ്പ്", "തോറ്റം", "പൊട്ടൻ തെയ്യം"];

const EASE = [0.16, 1, 0.3, 1] as const;

/* Vintage print palette — mustard, brick maroon and petrol teal on aged paper,
   the way old temple-festival posters and matchbox labels were spot-printed. */
const PAPER = "#ecdfc0";
const INK = "#241209";
const MAROON = "#8c2333";
const MUSTARD = "#d99a2b";
const TEAL = "#1f5c54";

/* A screen-printed halftone dot field — the texture that gives flat colour
   blocks their aged, lithographed feel. */
function Halftone({ color = INK, opacity = 0.12, size = 7 }: { color?: string; opacity?: number; size?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1.4px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}

/* A pleated, rising-sun sunburst — the label-art motif behind the medallion.
   Pure CSS conic-gradient, no glyph-rendering risk. */
function Sunburst({ size = 420, spin = true, reduceMotion }: { size?: number; spin?: boolean; reduceMotion: boolean | null }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: size,
        height: size,
        background: `repeating-conic-gradient(from 0deg, ${MUSTARD} 0deg 9deg, ${MAROON} 9deg 18deg)`,
      }}
      animate={spin && !reduceMotion ? { rotate: 360 } : undefined}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* Four printer's corner ticks — the crop-mark frame vintage plates were
   trimmed to. */
function CornerFrame() {
  const corner = "absolute h-6 w-6 border-[color:var(--ink)] sm:h-9 sm:w-9";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3 z-[2] sm:inset-6" style={{ ["--ink" as string]: INK }}>
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}

/* A photograph pushed to two flat printing colours — grayscale plus a
   multiply tint — the way limited-colour letterpress handled photography. */
function DuotoneImage({
  src,
  alt,
  tint,
  priority,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  tint: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover grayscale contrast-[1.1]"
      />
      <div aria-hidden className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: tint }} />
      <div aria-hidden className="absolute inset-0" style={{ backgroundColor: PAPER, mixBlendMode: "soft-light", opacity: 0.25 }} />
    </div>
  );
}

/* Seamless scrolling ribbon of keywords — two identical tracks animate in
   lockstep so the loop point never shows a seam. */
function RibbonTicker({ reduceMotion }: { reduceMotion: boolean | null }) {
  const track = (key: number) => (
    <motion.div
      key={key}
      aria-hidden={key === 1 || undefined}
      className="flex min-w-full shrink-0 items-center justify-around gap-10 pr-10"
      animate={reduceMotion ? undefined : { x: ["0%", "-100%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {TICKER_WORDS.map((word) => (
        <span key={word} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-sans text-[14px] tracking-normal text-[#f3e6c4] sm:text-[16px]" lang="ml">
            {word}
          </span>
          <span aria-hidden className="text-[10px] text-[#d99a2b]">
            ✦
          </span>
        </span>
      ))}
    </motion.div>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-3 sm:py-4">
      {track(0)}
      {track(1)}
    </div>
  );
}

/* Hero medallion — an arched, temple-gopuram-shaped frame holding the
   cross-fading duotone photographs, ringed by a sunburst. */
function HeroMedallion({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), HERO_IMAGE_DURATION);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const active = HERO_IMAGES[index];

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem]">
      <Sunburst size={520} reduceMotion={reduceMotion} />
      <div className="relative overflow-hidden rounded-t-[10rem] border-[6px] border-[#241209] shadow-[0_18px_0_-4px_rgba(36,18,9,0.25)]">
        <div className="relative aspect-[3/4]">
          <AnimatePresence>
            <motion.div
              key={active.key}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <DuotoneImage src={active.src} alt={active.alt} tint={MAROON} priority={index === 0} sizes="(min-width: 640px) 24rem, 20rem" className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
          <Halftone color={PAPER} opacity={0.1} />
        </div>
      </div>
      <span
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#241209] bg-[#d99a2b]"
        style={{ width: 22, height: 22 }}
      />
    </div>
  );
}

/* Continuous scroll-scrubbed reveal — mirrors tick-tick-tick.tsx's ScrollLine:
   value is driven directly by scroll position (in and back out), never a
   one-shot "reached viewport" trigger. */
function Paragraph({ text, ordinal, lede, mobile }: { text: string; ordinal: number; lede?: boolean; mobile?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mobile ? ["start 96%", "end 8%"] : ["start 92%", "end 22%"],
  });

  const opacity = useTransform(
    scrollYProgress,
    mobile ? [0, 0.15, 0.85, 1] : [0, 0.3, 0.7, 1],
    mobile ? [0.45, 1, 1, 0.45] : [0.12, 1, 1, 0.12],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    mobile ? [14, 0, 0, -14] : [28, 0, 0, -28],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    mobile ? [0.99, 1, 1, 0.99] : [0.97, 1, 1, 0.97],
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale, transformOrigin: "left center" }}
      className="group relative md:grid md:grid-cols-[3rem_1fr] md:gap-6 will-change-[opacity,transform]"
      lang="ml"
    >
      <span
        aria-hidden
        className="mb-3 hidden font-mono text-[10px] tracking-[0.2em] text-[#8c2333]/50 transition-colors duration-500 group-hover:text-[#8c2333] md:block md:mb-0 md:pt-[0.9em] md:text-right"
      >
        {String(ordinal).padStart(2, "0")}
      </span>
      <p
        className={`font-sans tracking-tight text-pretty ${lede
            ? "text-[19px] leading-[1.9] text-[#241209] sm:text-[22px] md:text-[27px] md:leading-[1.8] first-letter:mr-1 first-letter:float-left first-letter:font-sans first-letter:text-[3.2em] first-letter:leading-[0.8] first-letter:text-[#8c2333] md:first-letter:text-[3.6em]"
            : "text-[17px] leading-[2] text-[#241209]/85 sm:text-[19px] md:text-[22px] md:leading-[1.9]"
          }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

function QuoteLine({ text, mobile }: { text: string; mobile?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mobile ? ["start 96%", "end 10%"] : ["start 90%", "end 25%"],
  });

  const opacity = useTransform(
    scrollYProgress,
    mobile ? [0, 0.15, 0.85, 1] : [0, 0.3, 0.7, 1],
    mobile ? [0.35, 1, 1, 0.35] : [0.1, 1, 1, 0.1],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    mobile ? [12, 0, 0, -12] : [22, 0, 0, -22],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    mobile ? [0.98, 1, 1, 0.98] : [0.94, 1, 1, 0.94],
  );

  return (
    <motion.p
      ref={ref}
      style={{ opacity, y, scale, transformOrigin: "left center" }}
      className="font-sans text-[22px] leading-[1.55] tracking-tight text-[#f3e6c4] sm:text-[30px] md:text-[42px] will-change-[opacity,transform]"
    >
      {text}
    </motion.p>
  );
}

function PullQuote({ lines, source, mobile }: { lines: string[]; source: string; mobile?: boolean }) {
  return (
    <figure className="relative -mx-5 my-6 overflow-hidden border-y-4 border-[#241209] bg-[#8c2333] py-14 sm:-mx-10 sm:my-10 sm:py-20 lg:my-14" lang="ml">
      <Halftone color={PAPER} opacity={0.06} />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 -top-10 select-none font-sans text-[13rem] leading-none text-[#d99a2b]/25 sm:-top-16 sm:text-[20rem]"
      >
        “
      </span>
      <blockquote className="relative mx-auto max-w-2xl border-l-4 border-[#d99a2b] px-6 sm:pl-10 sm:pr-8">
        {lines.map((line) => (
          <QuoteLine key={line} text={line} mobile={mobile} />
        ))}
        <figcaption className="mt-5 font-mono text-[10px] tracking-normal text-[#f3e6c4]/70 sm:mt-7 sm:text-[11px]" lang="ml">
          {source}
        </figcaption>
      </blockquote>
    </figure>
  );
}

/* Chapter break — a stamp-like seal with a roman numeral, a Malayalam title
   banner, and a rule that splits the essay into its two halves. */
function ChapterMark({ numeral, title, sub }: { numeral: string; title: string; sub: string }) {
  return (
    <div className="relative flex items-center gap-4 pb-2 sm:gap-6">
      <span className="shrink-0 font-heading text-3xl text-[#8c2333] sm:text-4xl">{numeral}</span>
      <div className="flex flex-col">
        <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#8c2333]/70 sm:text-[10px]">{sub}</span>
        <span className="mt-1 font-sans text-2xl tracking-tight text-[#241209] sm:text-3xl md:text-4xl" lang="ml">
          {title}
        </span>
      </div>
    </div>
  );
}

export function Theyyam() {
  const mobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, mobile ? -20 : -50]);
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="sec-o"
      aria-labelledby="theyyam-title"
      className="relative w-full bg-[#ecdfc0] text-[#241209]"
    >
      {/* Hero — a short scroll-lock: the panel below stays pinned while this
          extra height scrolls past, holding the opening beat before the
          ticker/body are allowed to advance. */}
      <div ref={heroRef} className="relative h-[150svh]">
        <div className="sticky top-0 min-h-[100svh] overflow-hidden">

          {/* Layer 0 — Full-bleed cinematic background */}
          <div className="absolute inset-0 z-0">
            <motion.div
              className="absolute inset-0"
              style={{ y: useTransform(heroProgress, [0, 1], [0, mobile ? -30 : -80]), scale: useTransform(heroProgress, [0, 1], [1, 1.08]) }}
            >
              <Image
                src={resolveAsset("theyyam-bg.webp")}
                alt=""
                fill
                priority
                className="object-cover object-[65%_20%] sm:object-[50%_15%]"
                sizes="100vw"
              />
            </motion.div>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/40 sm:to-black/20" />
            {/* Paper-colour bleed from bottom — vintage transition into the essay body */}
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#ecdfc0] via-[#ecdfc0]/60 to-transparent" />
            {/* Warm fire-glow vignette */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(217,154,43,0.12) 0%, transparent 55%)" }}
            />
          </div>

          {/* Layer 1 — Halftone + corner marks over everything */}
          <Halftone color="#ecdfc0" opacity={0.04} />
          <CornerFrame />

          {/* Layer 2 — Content */}
          <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-20 pt-24 sm:justify-center sm:px-10 sm:pb-16 sm:pt-28 lg:flex-row lg:items-center lg:gap-16 lg:px-20 lg:pb-0">

            {/* Left: text */}
            <motion.div style={{ y: heroY, opacity: heroFade }} className="relative z-10 order-2 flex-1 lg:order-1">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE }}
                className="font-heading text-[13px] uppercase tracking-[0.32em] text-[#d99a2b] sm:text-[15px]"
              >
                Culture · Survival · Resistance
              </motion.p>

              <motion.h2
                id="theyyam-title"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
                className="mt-3 font-sans text-[22vw] leading-[0.92] tracking-[-0.04em] text-[#ecdfc0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-[15vw] md:text-[130px] lg:text-[150px]"
                lang="ml"
              >
                തെയ്യം
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
                className="mt-4 max-w-lg font-sans text-[16px] leading-[1.5] tracking-tight text-[#ecdfc0]/80 sm:mt-6 sm:text-[20px] md:text-[26px]"
                lang="ml"
              >
                അതിജീവനത്തിന്റെ കലയും ചെറുത്തുനിൽപ്പും.
              </motion.p>

              {/* Hero meta strip */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-8 grid max-w-lg grid-cols-2 gap-px border-t-2 border-[#ecdfc0]/20 pt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-[#ecdfc0]/50 sm:mt-12 sm:grid-cols-4 sm:text-[9px] sm:tracking-[0.22em]"
              >
                <span>Essay</span>
                <span className="sm:text-center">Malayalam</span>
                <span className="sm:text-center">North Malabar</span>
                <span className="text-right text-[#d99a2b]">Asika K</span>
              </motion.div>
            </motion.div>

            {/* Right: medallion — hidden on very small screens, visible from sm up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
              className="relative z-10 order-1 hidden flex-1 pt-6 sm:block lg:order-2 lg:pt-0"
            >
              <HeroMedallion reduceMotion={reduceMotion} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ribbon ticker — a bold banner of keywords beneath the hero */}
      <div className="relative z-10 border-y-4 border-[#241209] bg-[#8c2333]">
        <RibbonTicker reduceMotion={reduceMotion} />
      </div>

      {/* Thesis band — the essay's core claim, blown up full-bleed before the close reading begins */}
      <div className="relative overflow-hidden bg-[#d99a2b] py-20 text-[#241209] sm:py-28">
        <Halftone opacity={0.1} />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[0.22em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-sans text-[26vw] leading-none text-[#241209] opacity-[0.08] sm:text-[16rem]"
          lang="ml"
        >
          ചരിത്രം
        </span>
        <div className="relative mx-auto max-w-[46rem] px-5 sm:px-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="font-heading text-[12px] uppercase tracking-[0.34em] text-[#8c2333] sm:text-[14px]"
          >
            The essay&apos;s thesis
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            className="mt-5 font-sans text-[28px] leading-[1.3] tracking-tight sm:mt-8 sm:text-[42px] md:text-[54px]"
            lang="ml"
          >
            ചരിത്രം എപ്പോഴും വിജയികളുടേതാണ്. എന്നാൽ തോറ്റു പോകാൻ വിസമ്മതിച്ചവരുടെ ചരിത്രമാണ് തെയ്യങ്ങൾ പറയുന്നത്.
          </motion.p>
        </div>
      </div>

      {/* Body */}
      <div className="relative mx-auto w-full max-w-[46rem] px-5 pb-20 pt-16 sm:px-10 sm:pt-24 md:pb-40">
        <div className="flex flex-col gap-10 sm:gap-16 md:gap-20">
          {BLOCKS.map((block, i) => {
            const chapter = CHAPTERS.find((c) => c.at === i);
            const node =
              block.kind === "quote" ? (
                <PullQuote key={`q-${i}`} lines={block.lines} source={block.source} mobile={mobile} />
              ) : (
                <Paragraph key={`p-${i}`} text={block.text} ordinal={ORDINALS[i]} lede={block.lede} mobile={mobile} />
              );

            if (!chapter) return node;
            return (
              <div key={`ch-${i}`} className="contents">
                <ChapterMark numeral={chapter.numeral} title={chapter.title} sub={chapter.sub} />
                {node}
              </div>
            );
          })}
        </div>

        {/* Theyyam image gallery — duotone stamps with a perforated ink border */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative -mx-5 my-14 sm:-mx-10 sm:my-20 lg:my-28"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-5">
            <div className="group relative h-80 border-4 border-dashed border-[#241209] sm:col-span-3 sm:h-[28rem] lg:h-[32rem]">
              <DuotoneImage
                src={resolveAsset("theyyam-resistance-1.webp")}
                alt="Theyyam performer in full ritual costume, North Malabar"
                tint={MAROON}
                sizes="(min-width: 640px) 60vw, 100vw"
                className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 border-2 border-[#241209] bg-[#ecdfc0] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#241209] sm:left-4 sm:top-4">
                01 / കോലം
              </span>
              <figcaption className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                <p className="inline-block bg-[#ecdfc0] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#241209] sm:text-[9px]">
                  Shagil Kannur · CC BY-SA 3.0
                </p>
              </figcaption>
            </div>

            <div className="group relative h-64 border-4 border-dashed border-[#241209] sm:col-span-2 sm:h-[28rem] lg:h-[32rem]">
              <DuotoneImage
                src={resolveAsset("theyyam-resistance-2.webp")}
                alt="Close-up of Vishnumoorthi Theyyam ritual face makeup"
                tint={TEAL}
                sizes="(min-width: 640px) 40vw, 100vw"
                className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 border-2 border-[#241209] bg-[#ecdfc0] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#241209] sm:left-4 sm:top-4">
                02 / മുഖം
              </span>
              <figcaption className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                <p className="inline-block bg-[#ecdfc0] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#241209] sm:text-[9px]">
                  Mullookkaaran · CC BY-SA 3.0
                </p>
              </figcaption>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-4 sm:mt-5 relative flex flex-col items-center gap-8 border-4 border-dashed border-[#241209] bg-[#ecdfc0] p-4 pt-16 sm:p-8 lg:flex-row lg:justify-between lg:gap-12"
          >
            <span className="absolute left-3 top-3 z-10 border-2 border-[#241209] bg-[#ecdfc0] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#241209] sm:left-4 sm:top-4">
              03 / ദൃശ്യം
            </span>
            
            <div className="w-full flex-1 lg:max-w-md xl:max-w-lg">
              <p className="font-sans text-[20px] leading-[1.5] tracking-tight text-[#241209]/90 sm:text-[26px] md:text-[32px] md:leading-[1.4]" lang="ml">
                "തോറ്റു പോകാൻ വിസമ്മതിച്ചവരുടെ ചരിത്രമാണ് തെയ്യങ്ങൾ പറയുന്നത്."
              </p>
              <p className="mt-4 font-sans text-[14px] leading-[1.6] text-[#241209]/70 sm:mt-6 sm:text-[16px]">
                A ritual art form of North Malabar, embodying stories of resistance and survival.
              </p>
            </div>

            <div className="w-full shrink-0 lg:w-[400px]">
              <iframe
                src="https://www.instagram.com/reel/DHJIZ2QS0xy/embed"
                className="w-full h-[650px] bg-white rounded-md shadow-lg sm:h-[700px]"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                allow="encrypted-media"
              ></iframe>
            </div>

            <figcaption className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 pointer-events-none">
              <p className="inline-block bg-[#ecdfc0] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#241209] sm:text-[9px]">
                Aswin KV · Instagram Reel
              </p>
            </figcaption>
          </motion.div>
        </motion.figure>

        {/* Colophon — the byline, printed on the same paper as the rest of
            the page rather than dropped into its own dark panel. */}
        <div className="relative mt-16 overflow-hidden border-t-4 border-[#241209] pt-10 sm:mt-24 sm:pt-14">
          <Halftone opacity={0.05} />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-[0.15em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-sans text-[22vw] leading-none text-[#241209] opacity-[0.04] sm:text-[13rem]"
            lang="ml"
          >
            തെയ്യം
          </span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative flex items-center gap-5"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-[3px] border-[#241209] sm:h-20 sm:w-20">
              <Image
                src={resolveAsset("asika-k.png")}
                alt="Author portrait of Asika K"
                fill
                sizes="80px"
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-[#8c2333] sm:text-[11px] sm:tracking-[0.3em]">
                Written by
              </span>
              <span className="mt-1 font-sans text-xl leading-none tracking-tight text-[#241209] sm:text-3xl lg:text-[32px]">
                Asika K
              </span>
              <span className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#241209]/50 sm:mt-2 sm:text-[9px] sm:tracking-[0.15em]">
                Second year · Electronics &amp; Communication
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Theyyam;
