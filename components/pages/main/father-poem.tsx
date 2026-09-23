"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Noto_Serif_Malayalam } from "next/font/google";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

const serif = Noto_Serif_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const POEM_STANZAS = [
  "ഈ ലോകം എത്രയോ സുന്ദരമെന്നു-\nനിൻ കണ്ണുകളെന്നും ചൊല്ലിയല്ലോ...\nഎൻ കണ്ണുകളിൽ നിൻ ഭംഗി നിറഞ്ഞിരുന്നു\nഎൻ കാതുകൾ നിൻ സ്വരം ചെവിയോർത്തിരുന്നു...",
  "നീ എനിക്കായ് പകർന്നുതന്ന സ്മരണകൾക്കെല്ലാം\nനിന്റെ ഗന്ധമായിരുന്നുവെന്ന് നീ അറിഞ്ഞുവോ....\nനിന്നോടൊപ്പം ഞാൻ കണ്ടയിടങ്ങളെല്ലാമെ\nനമ്മുടെ സ്നേഹംപോൽ എന്നും മനോഹരം...",
  "ഒരു കുഞ്ഞു പൈതലായ് നിൻ-\nവിരലുകളിൽ എൻ വിരൽ ഞാൻ കോർത്തതും\nഎൻ ലോകമേ നീയെന്നു ഞാനറിഞ്ഞു....\nനിൻ കണ്ണുകൾ എനിക്കായ് കാഴ്ചകൾ കണ്ടതും\nനിൻ സ്വരം എനിക്കായി ഉയർന്നു പറന്നതും\nനിൻ നിഴൽ എന്റെ കാവലായി നിൽപ്പതും\nഎൻ ഉയർച്ചകൾ എന്നും നിൻ നേട്ടങ്ങളായി\nഎനിക്കു പിന്നിലെ ശക്തിയാം നിഴലായി\nഎന്നുമെന്നും നീ അരികിലുണ്ട്....",
  "ജീവിതമാം സാഗരത്തെ എന്റെയീ -\nകൈക്കുമ്പിളിലൊതുക്കിയ മായാജാലക്കാരാ...\nഎന്നെ പുണരുന്ന സ്നേഹകവചം\nഎന്നുമെന്നും നീ മാത്രമെന്ന് ഞാനറിവൂ....\nഅതെന്നുമെൻ അച്ഛനെന്നാരറിവൂ....!",
];

const INK = "#1f1a15";
const PAPER = "#f6f2ea";
const ACCENT = "#a8552a";
const NIGHT = "#15110e";
const EMBER = "#e0a06b";

/*
 * IMAGES — each picture below is a placeholder until its real file is uploaded to the release assets.
 * To replace one: upload the file named in `file` (webp) and it swaps in automatically. Nothing else to change.
 * `alt` is the full brief for the picture, so it can be handed straight to an image generator.
 */
type Shot = { n: number; file: string; ratio: string; alt: string; mock: string };

const SHOTS = {
  hands: {
    n: 1,
    file: "father-poem-hands.webp",
    ratio: "4:5",
    alt: "Extreme close-up of a grown man's large, weathered hand gently holding the tiny hand of a toddler, the child's small fingers wrapped around his index finger. Warm late-afternoon side light, shallow depth of field, soft creamy background blur in ochre and cream. Visible skin texture, a faint callus on the father's palm, no faces, no jewellery, no text. Tender, quiet, documentary photography feel with a slightly muted film grade.",
    mock: "linear-gradient(160deg, #e9d8bd 0%, #c79b6d 100%)",
  },
  path: {
    n: 2,
    file: "father-poem-path.webp",
    ratio: "16:9",
    alt: "A father and his young child walking away from the camera along a narrow country lane between bright green paddy fields in Kerala, coconut palms on the horizon, the child's small hand held in the father's. Golden hour, long warm light, soft haze. Both seen from behind at a distance, faces not visible, small figures in a wide calm landscape with lots of open sky. Muted warm greens and honey-gold, cinematic and nostalgic, no text.",
    mock: "linear-gradient(to top, #b9a56a 0%, #e8d9b5 55%, #f3ead8 100%)",
  },
  shadow: {
    n: 3,
    file: "father-poem-shadow.webp",
    ratio: "4:5",
    alt: "A small child in a school uniform walking forward alone along a dusty village road at low sunrise, and stretching long behind and beside the child, the enormous protective shadow of a tall man cast across the road, its arms slightly open as if guarding the child. The father himself is not in frame, only his shadow. Warm amber and deep brown palette, strong directional light, graphic and minimal composition with plenty of empty ground. Child seen from behind, no text.",
    mock: "linear-gradient(200deg, #d9a56e 0%, #7a4a2a 60%, #2b1c12 100%)",
  },
  ocean: {
    n: 4,
    file: "father-poem-ocean.webp",
    ratio: "21:9",
    alt: "Two cupped hands held open against a near-black background, cradling a miniature glowing ocean: a small swell of luminous deep-blue water with a tiny crescent of warm gold light on its surface, a few droplets rising like sparks. Hands are a man's, weathered, lit softly from below by the water's glow. Conceptual, minimal, magical and reverent, dark negative space on both sides, cinematic and painterly. No face, no text.",
    mock: "radial-gradient(ellipse at 50% 60%, #2a4a63 0%, #15110e 65%)",
  },
} satisfies Record<string, Shot>;

function Plate({
  shot,
  sizes = "100vw",
  priority,
  className = "object-cover",
  overlay,
}: {
  shot: Shot;
  sizes?: string;
  priority?: boolean;
  className?: string;
  overlay?: ReactNode;
}) {
  const img = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  /* onError can fire before hydration, so also catch an image that already failed. */
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, []);

  if (missing) {
    return (
      <>
        <div role="img" aria-label={shot.alt} className="absolute inset-0" style={{ background: shot.mock }} />
        {overlay}
        <div className="absolute inset-0 z-10 flex items-end p-4 sm:p-6">
          <p
            aria-hidden="true"
            className="max-h-full max-w-md overflow-hidden rounded-sm bg-black/60 px-4 py-3 text-left font-mono text-[10px] leading-relaxed text-white/80 backdrop-blur-sm sm:text-[11px]"
          >
            <b className="mb-1 block text-[10px] font-medium uppercase tracking-[0.25em] text-white">
              Image {shot.n} · {shot.ratio}
            </b>
            <code className="mb-2 block text-white/50">{shot.file}</code>
            {shot.alt}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Image
        ref={img}
        src={resolveAsset(shot.file)}
        alt={shot.alt}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized
        className={className}
        onError={() => setMissing(true)}
      />
      {overlay}
    </>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Image panel that drifts on scroll instead of fading in — the picture is always visible, the motion is the reveal. */
function ParallaxPlate({
  shot,
  sizes = "100vw",
  ratioClassName = "aspect-[16/9]",
  imgClassName = "object-cover",
  strength = 10,
  className = "",
  overlay,
}: {
  shot: Shot;
  sizes?: string;
  ratioClassName?: string;
  imgClassName?: string;
  strength?: number;
  className?: string;
  overlay?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${ratioClassName} ${className}`}>
      <motion.div style={reduce ? undefined : { y, scale: 1.18 }} className="absolute inset-0">
        <Plate shot={shot} sizes={sizes} className={imgClassName} />
      </motion.div>
      {overlay}
    </div>
  );
}

/** Entrance kept short and used sparingly — most movement in this piece comes from scroll position, not opacity. */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${className}`}>{children}</span>;
}

/** A single hairline that fills as its stanza crosses the viewport — the page marking its own place, not fading text in line by line. */
function Stanza({
  text,
  index,
  accentLast = false,
  accentColor,
  numberColor,
  className = "",
}: {
  text: string;
  index: number;
  accentLast?: boolean;
  accentColor: string;
  numberColor: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
  const fill = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
  const lines = text.split("\n");

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div aria-hidden className="absolute -left-6 top-1 hidden h-[calc(100%-0.75rem)] w-px bg-current/10 md:block">
        <motion.div style={{ background: accentColor, scaleY: fill }} className="h-full w-full origin-top" />
      </div>

      <Label className="mb-6 block">
        <span style={{ color: numberColor }}>
          {String(index + 1).padStart(2, "0")} / {String(POEM_STANZAS.length).padStart(2, "0")}
        </span>
      </Label>

      <motion.p
        lang="ml"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-[1.35rem] font-light leading-[2] sm:text-[1.55rem] md:text-[1.8rem] md:leading-[2.05]"
      >
        {lines.map((line, i) => (
          <span
            key={i}
            className="block"
            style={accentLast && i === lines.length - 1 ? { color: accentColor } : undefined}
          >
            {line}
          </span>
        ))}
      </motion.p>
    </div>
  );
}

export function FatherPoem() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLElement>(null);

  const { scrollYProgress: readProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1.16, 1.04]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const closing = POEM_STANZAS[3].split("\n");
  const closingLast = closing[closing.length - 1];

  return (
    <section
      ref={sectionRef}
      id="sec-father-poem"
      className={`${serif.className} relative w-full selection:bg-[#a8552a] selection:text-[#f6f2ea]`}
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* A quiet reading-line pinned to the margin: it only fills, it never fades. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-3 hidden w-px md:block lg:left-6">
        <div className="sticky top-0 h-screen w-px bg-current/10">
          <motion.div
            style={{ scaleY: reduce ? 0 : readProgress, background: `linear-gradient(${ACCENT}, ${EMBER})` }}
            className="h-full w-full origin-top"
          />
        </div>
      </div>

      {/* ───────── Cover ───────── */}
      <header ref={coverRef} className="relative mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16">
        <motion.div style={reduce ? undefined : { y: titleY }} className="lg:col-span-7">
          <Reveal>
            <Label className="text-[#a8552a]">Poetry · Volume 3</Label>
            <h2 lang="ml" className="mt-8 text-[6rem] font-light leading-[1.15] sm:text-[9rem] lg:text-[11rem]">
              അച്ഛൻ
            </h2>
            <div className="mt-8 flex items-center gap-5">
              <span aria-hidden className="h-px w-12 bg-[#a8552a]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1f1a15]/60">
                Father · a poem by Poornima A
              </p>
            </div>
          </Reveal>
        </motion.div>

        <div className="relative aspect-[4/5] w-full overflow-hidden lg:col-span-5">
          <motion.div style={reduce ? undefined : { y: plateY, scale: plateScale }} className="absolute inset-0">
            <Plate shot={SHOTS.hands} priority sizes="(max-width: 1024px) 100vw, 40vw" />
          </motion.div>
        </div>
      </header>

      {/* ───────── I · Eyes and ears ───────── */}
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-40 lg:px-16">
        <Stanza
          text={POEM_STANZAS[0]}
          index={0}
          accentColor={ACCENT}
          numberColor={`${ACCENT}b3`}
          className="max-w-2xl lg:ml-[16%]"
        />
      </div>

      {/* ───────── II · Memories ───────── */}
      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-40 lg:px-16">
        <ParallaxPlate
          shot={SHOTS.path}
          sizes="(max-width: 1152px) 100vw, 1152px"
          ratioClassName="aspect-[4/3] md:aspect-[16/9]"
        />
        <Stanza
          text={POEM_STANZAS[1]}
          index={1}
          accentColor={ACCENT}
          numberColor={`${ACCENT}b3`}
          className="mt-16 max-w-2xl md:mt-28 lg:ml-[40%]"
        />
      </div>

      {/* ───────── III · Shadow ───────── */}
      <div className="mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-44 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:sticky lg:top-24">
              <Plate shot={SHOTS.shadow} sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </div>
          <Stanza
            text={POEM_STANZAS[2]}
            index={2}
            accentLast
            accentColor={ACCENT}
            numberColor={`${ACCENT}b3`}
            className="lg:col-span-7 lg:pt-16"
          />
        </div>
      </div>

      {/* ───────── IV · The magician ───────── */}
      <div className="relative" style={{ backgroundColor: NIGHT, color: "#f1e8da" }}>
        <ParallaxPlate
          shot={SHOTS.ocean}
          ratioClassName="h-[56svh] min-h-[320px] md:h-[70svh]"
          strength={6}
          className="isolate"
          overlay={
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, ${PAPER} 0%, transparent 22%, transparent 65%, ${NIGHT} 100%)` }}
            />
          }
        />

        <div className="mx-auto max-w-4xl px-6 pb-28 pt-12 text-center md:px-10 md:pb-40">
          <Reveal>
            <Label className="mb-8 block text-[#e0a06b]/70">04 / 04</Label>
            <p lang="ml" className="text-[1.35rem] font-light leading-[2] text-[#f1e8da]/80 sm:text-[1.55rem] md:text-[1.8rem] md:leading-[2.05]">
              {closing.slice(0, -1).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p lang="ml" className="mx-auto mt-14 max-w-3xl text-[1.75rem] font-light leading-[1.7] sm:text-[2.25rem] md:text-[3rem]" style={{ color: EMBER }}>
              {closingLast}
            </p>
          </Reveal>
        </div>

        {/* Author */}
        <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 lg:px-16">
          <Reveal className="flex items-center gap-6 border-t border-[#f1e8da]/15 pt-10">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#f1e8da]/20 md:h-20 md:w-20">
              <Image
                src={resolveAsset("poornima.png")}
                alt="Poornima A"
                fill
                sizes="80px"
                unoptimized
                className="object-cover grayscale"
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-1 text-[#f1e8da]/50">Written by</Label>
              <span lang="ml" className="text-2xl font-medium md:text-3xl">
                പൂർണിമ എ
              </span>
              <Label className="mt-1 text-[#f1e8da]/50">2nd Year · Civil Engineering</Label>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default FatherPoem;
