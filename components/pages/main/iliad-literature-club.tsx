"use client";

import { useId, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import { REPORT_PHOTOS } from "@/lib/report-photos";
import {
  Container,
  Kicker,
  Rail,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./iliad-literature-club.module.css";

const TONE: ReportTone = {
  paper: "#f5efe3",
  ink: "#26181a",
  accent: "#8a2233",
  muted: "#26181aa8",
  rule: "#26181a26",
};

// Secondary palette layered over the base tone; the bookmarks and stickers draw from it.
const PALETTE = {
  "--gold": "#e3a92b",
  "--teal": "#1f4d47",
  "--blush": "#efb9a6",
} as CSSProperties;

const INTRO =
  "The Iliad Literature Club of Government Engineering College Wayanad aims to encourage reading, creative expression, literary appreciation and active participation in literary activities among students. The club provides a platform for students to explore their interests in literature and express their creativity through various activities.";

const NATIONAL_READING_DAY =
  "During the academic year 2025–2026, the club conducted a programme in connection with National Reading Day, observed on June 19. The programme was designed to promote the habit of reading among students and to encourage them to engage creatively with their favourite books.";

const CONTEST = [
  "As part of the National Reading Day observance, the Iliad Literature Club conducted a “Book Mark with a Quote from Your Favourite Book” Design Contest for students.",
  "The contest encouraged students to select a meaningful quote from a book they enjoyed and creatively incorporate it into a bookmark design. Through this activity, students were given an opportunity to combine their love for reading with artistic and creative expression.",
  "The programme highlighted the importance of books and reading in enriching one's imagination, knowledge and perspective. It also provided students with a simple yet engaging way to celebrate reading and share the literary works that inspired them.",
  "The activity successfully reflected the spirit of National Reading Day and the objectives of the Iliad Literature Club by encouraging students to read, create and inspire others through literature.",
];

const CLOSING =
  "The activities of the academic year 2025–2026, though limited to a single programme, reflected the club's commitment to promoting a culture of reading and creativity among students. The Iliad Literature Club looks forward to conducting more engaging literary activities and providing students with opportunities to discover, appreciate and express themselves through literature.";

const BOOKMARKS = [
  { no: "01", label: "The Contest", bg: "var(--accent)", fg: "var(--paper)", tilt: -2, lift: "lg:mt-0" },
  { no: "02", label: "The Idea", bg: "var(--gold)", fg: "var(--ink)", tilt: 1.5, lift: "lg:mt-11" },
  { no: "03", label: "The Purpose", bg: "var(--teal)", fg: "var(--paper)", tilt: -1, lift: "lg:mt-4" },
  { no: "04", label: "The Spirit", bg: "var(--blush)", fg: "var(--ink)", tilt: 2, lift: "lg:mt-16" },
] as const;

const TAPE_TOP = ["Read", "Write", "Imagine", "Quote", "Bookmark", "Wonder"];
const TAPE_BOTTOM = ["Create", "Inspire", "Story", "Verse", "Page", "Turn"];

const OUTLINE = "[-webkit-text-stroke:2px_currentColor] text-transparent";

/** Scrolling word tape. Two identical tracks translate by their own width for a seamless loop. */
function Marquee({
  words,
  reverse = false,
  duration = 40,
  outline = false,
}: {
  words: string[];
  reverse?: boolean;
  duration?: number;
  outline?: boolean;
}) {
  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className={`${styles.track} ${reverse ? styles.reverse : ""} flex min-w-full shrink-0 items-center justify-around gap-8 pr-8`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {words.map((word) => (
        <span key={word} className="flex items-center gap-8">
          <span
            className={`font-heading text-[clamp(3rem,7vw,6rem)] uppercase leading-none ${outline ? OUTLINE : ""}`}
          >
            {word}
          </span>
          <span className="text-[clamp(1.5rem,3vw,2.5rem)] leading-none">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-3 sm:py-4">
      {track(false)}
      {track(true)}
    </div>
  );
}

/** Rotating circular sticker; text is set on a path around the rim. */
function Badge({ text, center, className = "" }: { text: string; center: string; className?: string }) {
  const pathId = `badge-${useId().replace(/:/g, "")}`;
  return (
    <div className={`relative aspect-square rounded-full ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden className={`${styles.spin} absolute inset-0 h-full w-full`}>
        <defs>
          <path id={pathId} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text fontSize="21" className="font-mono uppercase" fill="currentColor" textLength="470" lengthAdjust="spacing">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-center font-heading text-2xl leading-[0.85] sm:text-3xl">
        {center}
      </span>
    </div>
  );
}

export function IliadLiteratureClub() {
  const { width, height } = REPORT_PHOTOS["iliad-logo"];
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);

  return (
    <ReportSection id="sec-iliad" tone={TONE}>
      <div style={PALETTE}>
        <Container>
          <Rail left="Literature Club" right="Clubs & Activities / 03" />
        </Container>

        {/* Hero: stacked display type on the left, a hanging bookmark on the right */}
        <div ref={heroRef} className="relative">
          <Container>
            <div className="grid gap-14 pb-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:gap-10 lg:pb-32">
              <div className="relative z-10 pt-12 sm:pt-16">
                <Reveal>
                  <Kicker>Academic Year 2025–26</Kicker>
                  <h2 className="font-heading uppercase tracking-[-0.01em]">
                    <span className="block text-[clamp(6rem,42vw,11rem)] leading-[0.78] sm:text-[clamp(11rem,26vw,17rem)] lg:text-[clamp(12rem,22vw,26rem)]">
                      Iliad
                    </span>
                    <motion.span
                      style={reduceMotion ? undefined : { x: drift }}
                      className={`block text-[clamp(3.5rem,21vw,7rem)] leading-[0.85] sm:text-[clamp(6rem,15vw,10rem)] lg:text-[clamp(6rem,12vw,13rem)] ${OUTLINE}`}
                    >
                      Literature
                    </motion.span>
                    <span className="-mt-[0.1em] block pl-[0.4em] font-serif text-[clamp(3.5rem,18vw,6rem)] normal-case italic leading-none tracking-normal text-[color:var(--accent)] sm:text-[clamp(5rem,13vw,9rem)]">
                      Club
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={0.15} className="mt-12 max-w-xl sm:mt-16">
                  <p className="border-l-4 border-[color:var(--accent)] pl-6 font-serif text-lg leading-[1.8] first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-[color:var(--accent)] sm:text-xl">
                    {INTRO}
                  </p>
                </Reveal>
              </div>

              <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:ml-auto lg:mr-0">
                {/* Arched backdrops */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 top-24 translate-x-5 rounded-t-full border-2 border-[color:var(--ink)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 top-24 -translate-x-3 rounded-t-full bg-[color:var(--blush)]"
                />

                <motion.div
                  style={{ transformOrigin: "top center" }}
                  animate={reduceMotion ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <span aria-hidden className="mx-auto block h-14 w-px bg-[color:var(--ink)]" />
                  <div className={styles.lift}>
                    <div className={`${styles.bookmark} relative bg-[#fffdf7] px-6 pb-24 pt-10`}>
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[color:var(--ink)]"
                      />
                      <Image
                        src={resolveAsset("iliad-logo.webp")}
                        alt="Iliad Literature Club of GECW logo"
                        width={width}
                        height={height}
                        priority
                        className="h-auto w-full mix-blend-multiply"
                      />
                      <dl className="mt-5 space-y-2 border-t-2 border-[color:var(--ink)] pt-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                        {[
                          ["College", "GEC Wayanad"],
                          ["Year", "2025–26"],
                          ["Programmes", "01"],
                        ].map(([term, detail]) => (
                          <div key={term} className="flex justify-between gap-4">
                            <dt className="text-[color:var(--muted)]">{term}</dt>
                            <dd>{detail}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </motion.div>

                <Badge
                  text="Read ✦ Create ✦ Inspire ✦ "
                  center="AY 25—26"
                  className="absolute -bottom-8 -left-6 z-10 w-28 bg-[color:var(--gold)] text-[color:var(--ink)] sm:-left-16 sm:w-36"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Crossed tape bands */}
        <div className="relative z-10 py-8 sm:py-14">
          <div className="-mx-[5%] -rotate-2 bg-[color:var(--accent)] text-[color:var(--paper)]">
            <Marquee words={TAPE_TOP} duration={45} />
          </div>
          <div className="-mx-[5%] -mt-3 rotate-2 bg-[color:var(--ink)] text-[color:var(--gold)]">
            <Marquee words={TAPE_BOTTOM} reverse duration={38} outline />
          </div>
        </div>

        {/* National Reading Day */}
        <div className={`${styles.dots} relative -mt-6 bg-[color:var(--ink)] pt-6 text-[color:var(--paper)] sm:-mt-10 sm:pt-10`}>
          <Container>
            <div className="grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.34em] text-[color:var(--gold)]">
                  National Reading Day
                </p>
                <div className="flex flex-wrap items-end gap-x-6 gap-y-10">
                  <span className="block font-heading text-[clamp(11rem,46vw,20rem)] leading-[0.75] text-[color:var(--gold)] lg:text-[clamp(14rem,24vw,28rem)]">
                    19
                  </span>
                  <span
                    className={`font-heading text-6xl uppercase leading-none tracking-[0.06em] [writing-mode:vertical-rl] sm:text-7xl ${OUTLINE}`}
                    style={{ transform: "rotate(180deg)" }}
                  >
                    June
                  </span>

                  {/* Blank specimen — the brief, drawn: one line, one bookmark */}
                  <div className={`${styles.lift} rotate-6`}>
                    <div
                      className={`${styles.bookmark} flex w-40 flex-col justify-between bg-[color:var(--paper)] px-4 pb-12 pt-8 text-[color:var(--ink)] sm:w-48`}
                    >
                      <p className="font-serif text-lg italic leading-snug">“Your favourite line goes here.”</p>
                      <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                        — Book · Author
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h3 className="font-serif text-4xl italic leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                  A bookmark with a quote from your{" "}
                  <span className="text-[color:var(--gold)]">favourite book.</span>
                </h3>
                <p className="mt-8 max-w-xl text-base leading-[1.9] opacity-75 sm:text-lg">{NATIONAL_READING_DAY}</p>
              </Reveal>
            </div>
          </Container>
        </div>

        {/* Design contest: each paragraph is a die-cut bookmark */}
        <Container>
          <div className="pb-24 pt-20 sm:pb-36 sm:pt-28">
            <Reveal className="mb-16 grid items-end gap-6 sm:mb-24 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                <Kicker>Book Mark with a Quote</Kicker>
                <h3 className="font-heading text-[clamp(4.5rem,15vw,13rem)] uppercase leading-[0.8] tracking-[-0.01em]">
                  Design
                  <span className="block pl-[0.15em] text-[color:var(--accent)]">Contest</span>
                </h3>
              </div>
              <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
                Four short notes on the contest, the idea, the purpose and the spirit behind it.
              </p>
            </Reveal>

            <ol className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
              {BOOKMARKS.map((mark, index) => (
                <motion.li
                  key={mark.no}
                  style={{ rotate: mark.tilt }}
                  initial={reduceMotion ? false : { opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -12, rotate: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`${styles.lift} ${mark.lift}`}
                >
                  <div
                    className={`${styles.bookmark} relative flex min-h-[27rem] flex-col px-6 pb-20 pt-12`}
                    style={{ background: mark.bg, color: mark.fg }}
                  >
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-4 h-4 w-4 -translate-x-1/2 rounded-full bg-[color:var(--paper)] shadow-[inset_0_2px_3px_rgba(0,0,0,0.35)]"
                    />
                    <div className="flex items-end justify-between border-b border-current pb-3">
                      <span className="font-heading text-7xl leading-[0.8]">{mark.no}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.24em]">{mark.label}</span>
                    </div>
                    <p className="mt-6 font-serif text-[15px] leading-[1.75] sm:text-base">{CONTEST[index]}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>

        {/* Closing */}
        <div className={`${styles.ruled} relative overflow-hidden bg-[color:var(--accent)] text-[color:var(--paper)]`}>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-4 -top-16 select-none font-heading text-[clamp(16rem,40vw,34rem)] leading-none text-[color:var(--gold)] opacity-90 sm:-top-28"
          >
            “
          </span>
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-[0.22em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[clamp(10rem,34vw,36rem)] uppercase leading-none opacity-30 ${OUTLINE}`}
          >
            Iliad
          </span>

          <Container className="relative">
            <div className="grid items-end gap-14 pb-40 pt-40 sm:pb-56 sm:pt-52 lg:grid-cols-[1fr_auto] lg:gap-20">
              <Reveal>
                <p className="max-w-4xl font-serif text-2xl italic leading-[1.4] sm:text-3xl lg:text-4xl">{CLOSING}</p>
                <p className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[color:var(--gold)]">
                  <span className="h-px w-10 bg-[color:var(--gold)]" />
                  Iliad Literature Club · GECW
                </p>
              </Reveal>

              <Badge
                text="Read ✦ Create ✦ Inspire ✦ "
                center="Read Create Inspire"
                className="w-36 bg-[color:var(--gold)] text-[color:var(--ink)] sm:w-44 lg:w-52"
              />
            </div>
          </Container>
        </div>
      </div>
    </ReportSection>
  );
}
