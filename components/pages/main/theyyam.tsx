"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import { YouTubePlayer } from "@/components/ui/youtube-player";

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

/* Hero backdrop: North Malabar theyyam footage, looped over a hand-picked
   window so the clip never shows its title card or outro. */
const HERO_VIDEO_ID = "Wmuy_jfGI68";
const HERO_VIDEO_START = 6;
const HERO_VIDEO_END = 34;

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

const EASE = [0.16, 1, 0.3, 1] as const;

/* A hairline "mudi" — the crown of the theyyam drawn as concentric arcs and rays. */
function CrownMotif() {
  const arcs = [96, 132, 168, 204, 240];
  const rays = Array.from({ length: 17 }, (_, i) => -90 + (i - 8) * 10.5);

  return (
    <svg
      viewBox="0 0 600 340"
      aria-hidden
      className="w-full h-full"
      fill="none"
      strokeLinecap="round"
    >
      {rays.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = +(300 + Math.cos(rad) * 70).toFixed(3);
        const y1 = +(300 + Math.sin(rad) * 70).toFixed(3);
        const x2 = +(300 + Math.cos(rad) * (250 + (i % 2 ? 22 : 0))).toFixed(3);
        const y2 = +(300 + Math.sin(rad) * (250 + (i % 2 ? 22 : 0))).toFixed(3);
        return (
          <motion.line
            key={`ray-${deg}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 2 ? "#d3452b" : "#e0a35e"}
            strokeWidth={0.75}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: i % 2 ? 0.35 : 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.5 + Math.abs(i - 8) * 0.04, ease: EASE }}
          />
        );
      })}

      {arcs.map((r, i) => (
        <motion.path
          key={`arc-${r}`}
          d={`M ${300 - r} 300 A ${r} ${r} 0 0 1 ${300 + r} 300`}
          stroke="#e0a35e"
          strokeWidth={i === 0 ? 1.2 : 0.65}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: i === 0 ? 0.6 : 0.28 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.15 * i, ease: EASE }}
        />
      ))}

      <motion.circle
        cx={300}
        cy={300}
        r={9}
        fill="#d3452b"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.85 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
        style={{ transformOrigin: "300px 300px" }}
      />
    </svg>
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
        className="mb-3 hidden font-mono text-[10px] tracking-[0.2em] text-[#e0a35e]/45 transition-colors duration-500 group-hover:text-[#e0a35e] md:block md:mb-0 md:pt-[0.9em] md:text-right"
      >
        {String(ordinal).padStart(2, "0")}
      </span>
      <p
        className={`font-sans tracking-tight text-pretty ${lede
            ? "text-[19px] leading-[1.9] text-[#efe3d0] sm:text-[22px] md:text-[27px] md:leading-[1.8]"
            : "text-[17px] leading-[2] text-[#efe3d0]/80 sm:text-[19px] md:text-[22px] md:leading-[1.9]"
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
      className="font-sans text-[20px] leading-[1.6] tracking-tight text-[#e0a35e] sm:text-[26px] md:text-[34px] will-change-[opacity,transform]"
    >
      {text}
    </motion.p>
  );
}

function PullQuote({ lines, source, mobile }: { lines: string[]; source: string; mobile?: boolean }) {
  return (
    <figure className="relative my-4 sm:my-6 md:ml-12" lang="ml">
      <blockquote className="border-l border-[#d3452b]/60 pl-5 sm:pl-8">
        {lines.map((line) => (
          <QuoteLine key={line} text={line} mobile={mobile} />
        ))}
        <figcaption className="mt-4 font-mono text-[8px] uppercase tracking-[0.28em] text-[#efe3d0]/35 sm:mt-6 sm:text-[9px]">
          {source}
        </figcaption>
      </blockquote>
    </figure>
  );
}

export function Theyyam() {
  const mobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, mobile ? -30 : -70]);
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="sec-o"
      aria-labelledby="theyyam-title"
      className="relative w-full overflow-hidden bg-[#12100e] text-[#efe3d0]"
    >
      {/* Ember glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[120vh] opacity-70"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 30%, rgba(211,69,43,0.16) 0%, rgba(224,163,94,0.06) 40%, transparent 72%)",
        }}
      />

      {/* Hero */}
      <div ref={heroRef} className="relative flex min-h-[85svh] flex-col justify-center px-5 pt-20 pb-12 sm:min-h-[92svh] sm:px-10 sm:pt-28 sm:pb-16 lg:px-24">
        {/* Hero background video — looped, muted, cropped to a fixed window of the source clip */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0c0b09]"
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "100vw",
              height: "56.25vw",
              minWidth: "177.78vh",
              minHeight: "100vh",
            }}
          >
            <YouTubePlayer
              videoId={HERO_VIDEO_ID}
              autoPlay
              muted
              loop
              hideControls
              showFloatingMute={false}
              showQualitySelector={false}
              playsInline
              priority
              height="100%"
              className="h-full w-full"
              playerVars={{
                start: HERO_VIDEO_START,
                end: HERO_VIDEO_END,
                mute: 1,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#12100e] via-[#12100e]/65 to-[#12100e]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12100e] via-[#12100e]/35 to-[#12100e]/60" />
          <div className="absolute inset-0 bg-[#12100e]/20" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroFade }}
          className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center px-2"
        >
          <div className="relative flex w-full flex-col items-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-[18%] left-1/2 h-[min(46vw,340px)] w-[min(92vw,600px)] -translate-x-1/2"
            >
              <CrownMotif />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative font-mono text-[8px] uppercase tracking-[0.32em] text-[#e0a35e] sm:text-[9px] sm:tracking-[0.42em] md:text-[10px]"
            >
              Culture · Survival · Resistance
            </motion.p>

            <motion.h2
              id="theyyam-title"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
              className="relative mt-5 font-sans text-[18vw] leading-[0.95] tracking-[-0.06em] text-[#efe3d0] sm:mt-8 sm:text-[16vw] md:text-[140px] lg:text-[190px]"
              lang="ml"
            >
              തെയ്യം
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            className="mt-4 max-w-2xl font-sans text-[16px] leading-[1.5] tracking-tight text-[#e0a35e] sm:mt-10 sm:text-[22px] md:text-[32px]"
            lang="ml"
          >
            അതിജീവനത്തിന്റെ കലയും ചെറുത്തുനിൽപ്പും.
          </motion.p>
        </motion.div>

        {/* Hero meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-10 grid w-full max-w-[1200px] grid-cols-2 gap-px border-t border-[#efe3d0]/10 pt-4 font-mono text-[7px] uppercase tracking-[0.18em] text-[#efe3d0]/35 sm:mt-24 sm:grid-cols-4 sm:text-[9px] sm:tracking-[0.22em] sm:pt-5"
        >
          <span>Essay</span>
          <span className="sm:text-center">Malayalam</span>
          <span className="sm:text-center">North Malabar</span>
          <span className="text-right text-[#efe3d0]/55">Asika K</span>
        </motion.div>
      </div>

      {/* Body */}
      <div className="relative mx-auto w-full max-w-[46rem] px-5 pb-20 sm:px-10 md:pb-40">
        <div className="flex flex-col gap-10 sm:gap-16 md:gap-20">
          {BLOCKS.map((block, i) => {
            if (block.kind === "quote") {
              return <PullQuote key={`q-${i}`} lines={block.lines} source={block.source} mobile={mobile} />;
            }
            return (
              <Paragraph key={`p-${i}`} text={block.text} ordinal={ORDINALS[i]} lede={block.lede} mobile={mobile} />
            );
          })}
        </div>

        {/* Theyyam image interlude */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative -mx-5 my-10 sm:-mx-10 sm:my-12 lg:my-16 flex flex-col items-center"
        >
          {/* Image frame with sophisticated treatment */}
          <div className="relative w-full max-w-3xl overflow-hidden">
            {/* Outer frame border with subtle glow */}
            <div className="absolute -inset-[3px] rounded-xl lg:rounded-2xl bg-gradient-to-b from-[#e0a35e]/20 via-[#d3452b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[540px] overflow-hidden rounded-lg lg:rounded-xl border border-[#efe3d0]/15 bg-[#0c0b09] group shadow-2xl shadow-[#d3452b]/10 hover:shadow-[#d3452b]/20 transition-shadow duration-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Theyyam_of_Kerala_3.jpg"
                alt="Theyyam performer in traditional attire with red and gold makeup"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Refined gradient overlay — darker at bottom for caption readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100e]/90 via-[#12100e]/20 to-transparent" />
              {/* Subtle vignette for depth */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#12100e/40_100%)]" />
            </div>
          </div>

          {/* Caption */}
          <figcaption className="mt-4 sm:mt-6 max-w-lg px-5 sm:px-0 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              <p className="font-sans text-[14px] sm:text-[16px] leading-[1.6] text-[#efe3d0]/70">
                A ritual art form of North Malabar, embodying stories of resistance and survival.
              </p>
              <p className="mt-2 font-mono text-[8px] sm:mt-3 sm:text-[10px] uppercase tracking-[0.2em] text-[#efe3d0]/35">
                Shagil Kannur · CC BY-SA 4.0
              </p>
            </motion.div>
          </figcaption>
        </motion.figure>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mt-12 flex flex-col gap-6 sm:mt-20 sm:flex-row sm:items-center sm:gap-8 border-t border-[#efe3d0]/10 pt-8"
        >
          <div className="flex items-center gap-5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#efe3d0]/10 grayscale transition-all duration-700 hover:grayscale-0 sm:h-20 sm:w-20">
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
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#e0a35e] sm:text-[9px] sm:tracking-[0.3em]">
                Written by
              </span>
              <span className="mt-1 font-sans text-xl leading-none tracking-tight text-[#efe3d0] sm:text-3xl lg:text-[32px]">
                Asika K
              </span>
              <span className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#efe3d0]/40 sm:mt-2 sm:text-[9px] sm:tracking-[0.15em]">
                Second year · Electronics &amp; Communication
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Theyyam;
