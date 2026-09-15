"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

const POEM_STANZAS = [
  "A dawn once broke with hope anew,\nAs freedom’s dream at last came true.\nA timeless charter, a solemn pledge,\nWhere justice found its rightful place.",
  "Yet tell me—have we learned at last\nTo heal the wounds our choices cast?\nTo guard the forests, skies, and seas,\nAnd cherish every swaying tree?",
  "We charred the forests, dimmed the skies,\nLeft rivers parched before our eyes.\nWe turned from neighbors, nursed our pride,\nWhile silent grief we chose to hide.",
  "When envy speaks where kindness should,\nAnd greed outweighs the common good,\nWe struggle, strive, and seek to claim\nA fleeting crown, an empty name.",
  "Yet where is trust in human hearts?\nThe bond that holds a people fast?\nFraternity is not mere sound,\nBut love that lifts and gathers round.",
  "It shines through every hand we raise,\nIn hearts that choose compassion over praise.",
  "A nation is more than maps we trace,\nOr flags that flutter into space.\nIt lives wherever hope takes root,\nIn every life that bears its fruit.",
  "In fields where patient farmers sow,\nThrough sun and storm their harvests grow.\nIn birds that sing and trees that stand\nThe living soul of this dear land.",
];

const FINAL_STANZA =
  "The day we love without a claim,\nWithout a caste, without a name,\nThat day our Constitution lives,\nAnd hope in every heart survives.\nThat is the promise we must keep.";

const EASE = [0.16, 1, 0.3, 1] as const;

function PromiseMark() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[31rem]"
    >
      <div className="absolute inset-[8%] rounded-full border border-[#f1eadc]/25" />
      <div className="absolute inset-[18%] rounded-full border border-[#f1eadc]/15" />
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full">
        <g
          stroke="#F1EADC"
          strokeOpacity="0.42"
          strokeWidth="1"
          transform="translate(250 250)"
        >
          {Array.from({ length: 24 }).map((_, index) => (
            <line
              key={index}
              x1="0"
              y1="-92"
              x2="0"
              y2="-198"
              transform={`rotate(${index * 15})`}
            />
          ))}
        </g>
        <circle cx="250" cy="250" r="87" fill="#D97845" />
        <circle
          cx="250"
          cy="250"
          r="43"
          fill="none"
          stroke="#F1EADC"
          strokeOpacity="0.72"
        />
        <circle cx="250" cy="250" r="5" fill="#F1EADC" />
      </svg>

      <span className="absolute left-1/2 top-0 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.32em] text-[#f1eadc]/55">
        Justice
      </span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.32em] text-[#f1eadc]/55">
        Fraternity
      </span>
      <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[8px] uppercase tracking-[0.32em] text-[#f1eadc]/55">
        Liberty
      </span>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[8px] uppercase tracking-[0.32em] text-[#f1eadc]/55">
        Equality
      </span>
    </div>
  );
}

export function PromiseWeMustKeep() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0, distance = 24) => ({
    initial: reduceMotion ? false : { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8% 0px" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      id="sec-promise"
      className="relative w-full overflow-hidden bg-[#f2eee5] text-[#172e28] selection:bg-[#d97845] selection:text-[#fffaf0]"
    >
      <div className="bg-[#173c34] text-[#f1eadc]">
        <div className="mx-auto w-full max-w-[1600px] px-5 pt-6 sm:px-10 sm:pt-8 lg:px-16">
          <header className="flex items-center justify-between border-b border-[#f1eadc]/15 pb-5 font-mono text-[9px] uppercase tracking-[0.24em] text-[#f1eadc]/55">
            <span>Inquation · 2025—26</span>
            <span className="hidden sm:inline">Civic poetry / Volume 05</span>
            <span>Essay in verse</span>
          </header>

          <div className="grid min-h-[calc(100svh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:py-20">
            <motion.div {...reveal()} className="relative z-10">
              <p className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.34em] text-[#dca36b]">
                <span className="h-px w-8 bg-[#dca36b]" />
                A living document
              </p>
              <h2 className="max-w-4xl font-heading text-[clamp(5rem,13vw,11rem)] uppercase leading-[0.78] tracking-[-0.02em]">
                The
                <span className="block text-[#d97845]">Promise</span>
                <span className="block pl-[0.22em] text-[#f1eadc]/90">We keep</span>
              </h2>
              <p className="mt-8 max-w-md border-l border-[#d97845] pl-5 font-serif text-lg italic leading-relaxed text-[#f1eadc]/65 sm:text-xl">
                A nation lives wherever hope takes root.
              </p>
            </motion.div>

            <motion.div
              {...reveal(0.12, 16)}
              className="mx-auto w-full max-w-[34rem] lg:max-w-none"
            >
              <PromiseMark />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(23,46,40,0.05)_1px,transparent_1px)] [background-size:clamp(5rem,10vw,10rem)_100%]" />

        <div className="relative grid gap-20 lg:grid-cols-[minmax(15rem,0.65fr)_minmax(34rem,1.35fr)] lg:gap-24 xl:gap-36">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <motion.div {...reveal()}>
              <p className="mb-8 font-mono text-[9px] uppercase tracking-[0.3em] text-[#172e28]/45">
                The author
              </p>
              <div className="flex items-center gap-5 border-y border-[#172e28]/15 py-6 lg:block lg:py-8">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-[#ddd5c7] lg:mb-6 lg:size-28 lg:rounded-[2rem]">
                  <Image
                    src={resolveAsset("rebekka.png")}
                    alt="Rebekka Mathew"
                    fill
                    sizes="(min-width: 1024px) 112px, 80px"
                    className="object-cover grayscale transition duration-700 hover:grayscale-0"
                  />
                </div>
                <div>
                  <p className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                    Rebekka Mathew
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.22em] text-[#172e28]/45">
                    2nd Year · ECE
                  </p>
                </div>
              </div>

              <div className="mt-8 hidden lg:block">
                <span className="font-heading text-[7rem] leading-none text-[#d97845]">09</span>
                <p className="mt-2 max-w-[11rem] font-mono text-[8px] uppercase leading-relaxed tracking-[0.24em] text-[#172e28]/40">
                  passages toward one common promise
                </p>
              </div>
            </motion.div>
          </aside>

          <article aria-label="The Promise We Must Keep poem">
            <div className="border-t border-[#172e28]/20">
              {POEM_STANZAS.map((stanza, index) => (
                <motion.div
                  key={stanza}
                  {...reveal(0, 20)}
                  className="grid gap-5 border-b border-[#172e28]/15 py-10 sm:grid-cols-[3.5rem_1fr] sm:gap-8 sm:py-14"
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#d97845]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="whitespace-pre-line text-pretty font-serif text-[clamp(1.45rem,2.7vw,2.5rem)] font-light leading-[1.55] tracking-[-0.02em] text-[#172e28]/86">
                    {stanza}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...reveal()}
              className="relative mt-16 overflow-hidden rounded-[2rem] bg-[#173c34] px-7 py-10 text-[#f1eadc] sm:mt-24 sm:rounded-[2.5rem] sm:px-12 sm:py-14 lg:px-16 lg:py-16"
            >
              <div className="absolute -right-20 -top-20 size-64 rounded-full border-[3rem] border-[#d97845]/80" />
              <div className="relative z-10 grid gap-8 sm:grid-cols-[3.5rem_1fr] sm:gap-8">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#dca36b]">
                  09
                </span>
                <div>
                  <p className="whitespace-pre-line text-pretty font-serif text-[clamp(1.6rem,3vw,2.8rem)] font-light leading-[1.5] tracking-[-0.02em]">
                    {FINAL_STANZA}
                  </p>
                  <div className="mt-10 flex items-center gap-4 font-mono text-[8px] uppercase tracking-[0.25em] text-[#f1eadc]/45">
                    <span className="h-px w-10 bg-[#d97845]" />
                    The pledge continues
                  </div>
                </div>
              </div>
            </motion.div>
          </article>
        </div>
      </div>

      <footer className="border-t border-[#172e28]/15">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-6 font-mono text-[8px] uppercase tracking-[0.22em] text-[#172e28]/45 sm:px-10 lg:px-16">
          <span>Poetry collection</span>
          <span className="hidden sm:inline">Justice · Liberty · Equality · Fraternity</span>
          <span>Wayanad · Kerala</span>
        </div>
      </footer>
    </section>
  );
}

export default PromiseWeMustKeep;
