// Trigger rebuild
"use client";

import { motion, useReducedMotion } from "framer-motion";

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

const EASE = [0.16, 1, 0.3, 1] as const;

function EchoPortrait() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[4/5] w-full max-w-[31rem] overflow-hidden rounded-[2rem] border border-[#17352f]/15 bg-[#e7dece] sm:rounded-[2.5rem]"
    >
      <div className="absolute inset-5 rounded-[1.4rem] border border-[#17352f]/10 sm:inset-7 sm:rounded-[1.9rem]" />
      <div className="absolute -right-10 -top-10 size-44 rounded-full bg-[#df674d] sm:size-56" />
      <div className="absolute right-10 top-12 font-mono text-[8px] uppercase tracking-[0.28em] text-[#17352f]/55 sm:right-14 sm:top-16">
        Origin / echo
      </div>

      <svg
        viewBox="0 0 480 600"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M65 519C94 463 113 416 112 354C111 298 91 260 101 205C112 146 154 101 211 84C259 69 312 79 350 112C389 146 406 198 395 248C384 300 349 320 331 361C315 398 322 448 350 519"
          stroke="#17352F"
          strokeWidth="2"
        />
        <path
          d="M115 519C145 472 159 432 156 382C153 337 138 304 146 260C155 212 187 174 231 158C271 144 314 151 346 178C378 205 393 247 386 289C379 332 352 352 337 386C324 417 330 462 357 519"
          stroke="#17352F"
          strokeOpacity="0.34"
          strokeWidth="1.5"
        />
        <path
          d="M161 519C184 483 196 451 193 412C190 377 179 351 185 317C192 280 217 250 252 238C283 227 317 233 342 254C367 275 379 308 373 340C368 373 346 388 335 415C324 439 330 478 352 519"
          stroke="#DF674D"
          strokeWidth="3"
        />
        <path
          d="M100 211C150 236 213 233 257 197C291 169 316 125 350 113"
          stroke="#17352F"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        <path
          d="M146 267C188 286 233 282 269 256C295 237 319 204 346 179"
          stroke="#17352F"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        <path
          d="M185 320C218 333 251 327 278 307C300 291 318 271 342 254"
          stroke="#DF674D"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute bottom-10 left-10 sm:bottom-14 sm:left-14">
        <p className="max-w-[13rem] text-balance font-serif text-xl italic leading-snug text-[#17352f] sm:text-2xl">
          We become the people who raised us.
        </p>
      </div>

      <div className="absolute bottom-0 right-0 grid size-20 place-items-center border-l border-t border-[#17352f]/15 bg-[#f4f0e8] font-mono text-[9px] tracking-[0.2em] text-[#17352f]/55 sm:size-24">
        01—03
      </div>
    </div>
  );
}

export function InTheirImage() {
  const reduceMotion = useReducedMotion();
  const enter = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8% 0px" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      id="sec-in-their-image"
      className="relative w-full overflow-hidden bg-[#f4f0e8] text-[#17352f] selection:bg-[#df674d] selection:text-[#fffaf2]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(23,53,47,0.055)_1px,transparent_1px)] [background-size:clamp(4rem,8vw,8rem)_100%]" />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-10 pt-6 sm:px-10 sm:pb-14 sm:pt-8 lg:px-16">
        <header className="flex items-center justify-between border-b border-[#17352f]/15 pb-5 font-mono text-[9px] uppercase tracking-[0.24em] text-[#17352f]/55">
          <span>Inquation · 2025—26</span>
          <span className="hidden sm:inline">Poetry / Family archive</span>
          <span>No. 032</span>
        </header>

        <div className="grid min-h-[calc(100dvh-7rem)] items-center gap-16 py-16 lg:grid-cols-[minmax(19rem,0.88fr)_minmax(32rem,1.12fr)] lg:gap-20 lg:py-20 xl:gap-28">
          <div className="min-w-0">
            <motion.div {...enter()} className="mb-12 sm:mb-14">
              <p className="mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.34em] text-[#df674d]">
                <span className="h-px w-7 bg-[#df674d]" />
                A poem on inheritance
              </p>
              <h2 className="max-w-2xl text-balance font-heading text-[clamp(4.8rem,13vw,10.5rem)] uppercase leading-[0.76] tracking-[-0.025em] text-[#17352f]">
                In their
                <span className="block pl-[0.16em] text-[#df674d]">image</span>
              </h2>
            </motion.div>

            <motion.div {...enter(0.1)}>
              <EchoPortrait />
            </motion.div>
          </div>

          <div className="relative lg:pl-8 xl:pl-16">
            <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-[#17352f]/15 lg:block" />

            <motion.div
              {...enter(0.08)}
              className="mb-12 flex items-end justify-between gap-6 border-b border-[#17352f]/15 pb-5"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#17352f]/50">
                Read slowly
              </p>
              <span className="font-serif text-4xl italic leading-none text-[#df674d] sm:text-5xl">
                “
              </span>
            </motion.div>

            <div className="space-y-12 sm:space-y-14">
              {POEM_STANZAS.map((stanza, stanzaIndex) => (
                <motion.div
                  key={stanza[0]}
                  {...enter(0.12 + stanzaIndex * 0.08)}
                  className="grid grid-cols-[2rem_1fr] gap-3 sm:grid-cols-[3rem_1fr] sm:gap-5"
                >
                  <span className="pt-1 font-mono text-[8px] tracking-[0.2em] text-[#17352f]/35 sm:text-[9px]">
                    /{String(stanzaIndex + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-1.5 sm:space-y-2">
                    {stanza.map((line, lineIndex) => {
                      const isClosingLine =
                        stanzaIndex === POEM_STANZAS.length - 1 && lineIndex > 2;

                      return (
                        <p
                          key={line}
                          className={
                            isClosingLine
                              ? "text-pretty font-serif text-[clamp(1.35rem,2.3vw,2.15rem)] italic leading-[1.35] text-[#df674d]"
                              : "text-pretty text-[clamp(1.08rem,1.75vw,1.55rem)] font-light leading-[1.5] tracking-[-0.02em] text-[#17352f]/82"
                          }
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...enter(0.18)}
              className="mt-14 flex flex-col gap-5 border-t border-[#17352f]/15 pt-6 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.28em] text-[#17352f]/45">
                  Words by
                </p>
                <p className="text-xl font-medium tracking-[-0.03em] text-[#17352f] sm:text-2xl">
                  Fathima Aslam
                </p>
              </div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#17352f]/45 sm:text-right">
                3rd Year<br />Electrical &amp; Electronics
              </p>
            </motion.div>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-[#17352f]/15 pt-5 font-mono text-[8px] uppercase tracking-[0.22em] text-[#17352f]/45">
          <span>Poetry collection</span>
          <span className="hidden sm:inline">What remains, we carry</span>
          <span>Wayanad · Kerala</span>
        </footer>
      </div>
    </section>
  );
}

export default InTheirImage;
