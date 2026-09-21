"use client";

import { Fragment, useRef, type ReactNode } from "react";
import Image from "next/image";
import { Newsreader } from "next/font/google";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const POEM_STANZAS = [
  [
    "Sometimes when I laugh",
    "I sound just like my dad",
    "And sometimes when I look in the mirror",
    "I see my mother looking back at me.",
  ],
  [
    "One day they’ll be gone",
    "That’s how it’s supposed to be",
    "I don’t want to live without them",
    "But someday I’ll have to.",
  ],
  [
    "So when I’m seventy two",
    "And the earth is dying",
    "And my parents are long gone",
    "All I hope is that my laugh is still my dad’s",
    "And my face is still my mom’s.",
  ],
];

const PAPER = "#f4f0e8";
const GREEN = "#17352f";
const CORAL = "#df674d";

const MEMORY_IMAGES = [
  {
    file: "in-their-image-hands.webp",
    alt: "An older parent’s hand resting over an adult child’s hand on a sunlit wooden table, suggesting inherited gestures and quiet affection.",
    caption: "What we inherit is rarely spoken.",
  },
  {
    file: "in-their-image-reflection.webp",
    alt: "An adult daughter seen from behind beside a sunlit window, with a soft reflection suggesting her mother behind her.",
    caption: "A face can carry a family forward.",
  },
] as const;

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.28em] ${className}`}>{children}</span>
  );
}

/*
 * Two circles — his laugh, her face — drift together as the poem is read and overlap into one.
 * `sep` is how far each circle sits from the centre line; `meOpacity` brings in the word for the overlap.
 */
function Convergence({ sep, meOpacity }: { sep: MotionValue<number>; meOpacity: MotionValue<number> }) {
  const leftX = useTransform(sep, (v) => -v);
  const leftLabelX = useTransform(sep, (v) => -v + 30);
  const rightLabelX = useTransform(sep, (v) => v - 30);

  return (
    <svg
      role="img"
      aria-label="Two outlined circles slowly overlap; the shared lens between them fills with coral"
      viewBox="0 0 600 360"
      className="h-full w-full"
      fill="none"
    >
      <defs>
        <clipPath id="ti-lens">
          <motion.circle cx={300} cy={170} r={110} style={{ x: sep }} />
        </clipPath>
      </defs>

      <motion.circle cx={300} cy={170} r={110} fill={GREEN} fillOpacity={0.05} stroke={GREEN} strokeWidth={1.5} style={{ x: leftX }} />
      <motion.circle cx={300} cy={170} r={110} fill={GREEN} fillOpacity={0.05} stroke={GREEN} strokeWidth={1.5} style={{ x: sep }} />

      <g clipPath="url(#ti-lens)">
        <motion.circle cx={300} cy={170} r={110} fill={CORAL} style={{ x: leftX }} />
      </g>

      <motion.text
        x={300}
        y={338}
        textAnchor="end"
        fill={GREEN}
        fillOpacity={0.6}
        className="font-mono"
        fontSize={11}
        letterSpacing={3}
        style={{ x: leftLabelX }}
      >
        HIS LAUGH
      </motion.text>
      <motion.text
        x={300}
        y={338}
        textAnchor="start"
        fill={GREEN}
        fillOpacity={0.6}
        className="font-mono"
        fontSize={11}
        letterSpacing={3}
        style={{ x: rightLabelX }}
      >
        HER FACE
      </motion.text>

      <motion.text
        x={300}
        y={182}
        textAnchor="middle"
        fill={PAPER}
        fontSize={34}
        fontStyle="italic"
        style={{ opacity: meOpacity }}
      >
        me
      </motion.text>
    </svg>
  );
}

/* A hairline above each stanza, paid out from the left as the stanza scrolls into place. */
function Rule() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 58%"] });
  return (
    <div ref={ref} aria-hidden className="mb-8 h-px w-full bg-[#17352f]/10">
      <motion.div
        style={{ scaleX: reduce ? 1 : scrollYProgress, transformOrigin: "left" }}
        className="h-full w-full bg-[#df674d]"
      />
    </div>
  );
}

function Stanza({ lines, index, last }: { lines: string[]; index: number; last: boolean }) {
  return (
    <section className="flex min-h-[65dvh] flex-col justify-center py-14">
      <Rule />
      <Label className="mb-6 block text-[#17352f]/45">
        {String(index + 1).padStart(2, "0")} / {String(POEM_STANZAS.length).padStart(2, "0")}
      </Label>
      <p className="text-[1.7rem] font-light leading-[1.5] text-[#17352f] sm:text-[2.1rem] sm:leading-[1.45]">
        {lines.map((line, i) => {
          const closing = last && i > 2;
          return (
            <span
              key={line}
              className={`block text-pretty ${closing ? "mt-1 italic text-[#df674d] sm:text-[2.3rem]" : ""}`}
            >
              {line}
            </span>
          );
        })}
      </p>
    </section>
  );
}

/* The figure sits after the last stanza; the circles meet as it scrolls into view. */
function Figure() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 50%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.4 });

  const scrolledSep = useTransform(progress, [0, 0.85], [150, 40]);
  const scrolledMe = useTransform(progress, [0.6, 0.9], [0, 1]);
  const restSep = useMotionValue(40);
  const restMe = useMotionValue(1);

  return (
    <figure ref={ref} className="py-24 lg:py-32">
      <div className="mx-auto aspect-[5/3] w-full max-w-[32rem]">
        <Convergence sep={reduce ? restSep : scrolledSep} meOpacity={reduce ? restMe : scrolledMe} />
      </div>
      <figcaption className="mx-auto mt-8 max-w-xs text-balance text-center text-xl italic leading-snug text-[#17352f]/70 sm:text-2xl">
        We become the people who raised us.
      </figcaption>
    </figure>
  );
}

export function InTheirImage() {
  return (
    <section
      id="sec-in-their-image"
      className={`${serif.className} relative w-full bg-[#f4f0e8] text-[#17352f] selection:bg-[#df674d] selection:text-[#fffaf2]`}
    >
      <div className="mx-auto max-w-2xl px-6 sm:px-10">
        <header className="flex min-h-[80dvh] flex-col justify-center py-20">
          <p className="mb-6 flex items-center gap-3 text-[#df674d]">
            <span aria-hidden className="h-px w-8 bg-[#df674d]" />
            <Label>A poem on inheritance</Label>
          </p>
          <h2 className="font-heading text-[clamp(4.5rem,15vw,9rem)] uppercase leading-[0.8] tracking-[-0.01em] text-[#17352f]">
            In their
            <span className="block text-[#df674d]">image</span>
          </h2>
        </header>

          {POEM_STANZAS.map((lines, i) => (
            <Fragment key={lines[0]}>
              <Stanza lines={lines} index={i} last={i === POEM_STANZAS.length - 1} />
              {i < MEMORY_IMAGES.length && (
                <figure className="mb-16 overflow-hidden border-y border-[#17352f]/10 py-6 lg:mb-24 lg:py-8">
                  <div className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden bg-[#e8e1d5]">
                    <Image
                      src={resolveAsset(MEMORY_IMAGES[i].file)}
                      alt={MEMORY_IMAGES[i].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm italic text-[#17352f]/55">
                    {MEMORY_IMAGES[i].caption}
                  </figcaption>
                </figure>
              )}
            </Fragment>
          ))}

        <Figure />

        <div className="flex flex-col gap-5 border-t border-[#17352f]/15 py-16 sm:flex-row sm:items-end sm:justify-between lg:py-24">
          <div>
            <Label className="mb-2 block text-[#17352f]/45">Words by</Label>
            <p className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">Fathima Aslam</p>
          </div>
          <Label className="leading-relaxed text-[#17352f]/45 sm:text-right">
            3rd Year
            <br />
            Electrical &amp; Electronics
          </Label>
        </div>
      </div>
    </section>
  );
}

export default InTheirImage;
