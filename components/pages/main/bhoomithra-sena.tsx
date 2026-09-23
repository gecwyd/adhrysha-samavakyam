"use client";

import { useId, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  Stat,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./bhoomithra-sena.module.css";

const TONE: ReportTone = {
  paper: "#e9f0df",
  ink: "#12261a",
  accent: "#2c7a3f",
  muted: "#12261aab",
  rule: "#12261a26",
};

// Secondary palette layered over the base tone; badges, tags and polaroids draw from it.
const PALETTE = {
  "--soil": "#6b4a2a",
  "--sun": "#dda52e",
  "--sky": "#3f7a8c",
  "--cream": "#fbf9ee",
} as CSSProperties;

const INTRO =
  "The Bhoomithra Sena Club at Government Engineering College, Wayanad, turned environmental awareness into meaningful action during the academic year 2025–2026. Through field activities, conservation programmes and awareness sessions, students explored biodiversity, sustainable living and environmental responsibility.";

const CLOSING =
  "The activities of Bhoomithra Sena Club demonstrate that environmental conservation begins with small, collective actions. By stepping beyond classrooms and engaging directly with nature and communities, students learned not only to understand the environment, but also to become responsible friends of the Earth: Bhoomithras.";

const TAPE_TOP = ["Reduce", "Reuse", "Recycle", "Restore", "Rewild", "Renew"];
const TAPE_BOTTOM = ["Seed", "Soil", "Stream", "Sapling", "Species", "Sanctuary"];

const STATS = [
  { value: "11", label: "Programmes Held" },
  { value: "02", label: "Panchayats Partnered" },
  { value: "01", label: "Trekking & Nature Camp" },
];

const EVENTS: { date: string; title: string; body: string }[] = [
  {
    date: "20–21 Jul 2025",
    title: "People’s Biodiversity Register",
    body: "The year began with the People’s Biodiversity Register (PBR) Programme at Thavinjal Panchayat, where students documented local flora, fauna, agricultural practices, water resources and traditional ecological knowledge in association with the Panchayat and Keystone Foundation.",
  },
  {
    date: "Begur–Thirunelli",
    title: "Eco Restoration",
    body: "The Eco Restoration Programme at Begur–Thirunelli Panchayat focused on removing invasive plants and planting native saplings, giving students hands-on experience in forest restoration.",
  },
  {
    date: "26 Aug 2025",
    title: "Tree Tagging Internship",
    body: "The Tree Tagging Internship Programme combined technology and conservation as students identified and digitally documented trees using the Tree Tagging App.",
  },
  {
    date: "Campus",
    title: "Campus Beautification",
    body: "Through the Campus Beautification Programme, students cleaned the campus, removed plastic waste and maintained green spaces.",
  },
  {
    date: "Thrissilery",
    title: "Vith Muthal Vipani Vare",
    body: "The Vith Muthal Vipani Vare Programme at Thrissilery introduced students to the complete journey of paddy, from seed selection and cultivation to harvesting, processing and marketing.",
  },
  {
    date: "22 Nov 2025",
    title: "Bird-Watching",
    body: "Nature became the classroom during the Bird-Watching Programme at Thirunelli Forest Range, where students learned about bird diversity and forest ecosystems.",
  },
  {
    date: "16 Jan 2026",
    title: "Carbon Neutrality Awareness",
    body: "The Carbon Neutrality Awareness Class explored carbon emissions, climate change, carbon-footprint assessment and sustainable practices.",
  },
  {
    date: "17 Jan 2026",
    title: "Brahmagiri Trekking & Nature Camp",
    body: "The Brahmagiri Trekking and Nature Camp offered students an opportunity to experience the Western Ghats while learning about forests, wildlife and conservation.",
  },
  {
    date: "7 Mar 2026",
    title: "Fire and Safety Awareness",
    body: "The Fire and Safety Awareness Class at Munneshwaram Kunn focused on forest-fire prevention, emergency response and basic firefighting.",
  },
  {
    date: "Competition",
    title: "Scrap to Craft",
    body: "Creativity met sustainability through the Scrap to Craft Competition, which promoted the principles of Reduce, Reuse and Recycle by transforming discarded materials into useful crafts.",
  },
  {
    date: "Makkimala",
    title: "School Garden Initiative",
    body: "The year concluded with the School Garden Initiative at Government School, Makkimala, encouraging students to practise gardening, cleanliness, organic farming and environmental responsibility.",
  },
];

const PHOTOS = [
  { id: "bhoomithra-1", alt: "Bhoomithra Sena members and guests posing together indoors", caption: "Members & guests" },
  { id: "bhoomithra-2", alt: "Students gathered in a green field during a field programme", caption: "Field programme" },
  { id: "bhoomithra-3", alt: "Club members and mentors under decorated eaves", caption: "Club & mentors" },
] as const;

// Fill-color (not color) is made transparent so currentColor still paints the stroke.
const OUTLINE = "[-webkit-text-stroke:2px_currentColor] [-webkit-text-fill-color:transparent]";

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

/** Rotating circular stamp; text runs on a path around the rim, like a field-permit seal. */
function Stamp({ text, center, className = "" }: { text: string; center: string; className?: string }) {
  const pathId = `stamp-${useId().replace(/:/g, "")}`;
  return (
    <div className={`relative aspect-square rounded-full ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden className={`${styles.spin} absolute inset-0 h-full w-full`}>
        <defs>
          <path id={pathId} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text fontSize="20" className="font-mono uppercase" fill="currentColor" textLength="470" lengthAdjust="spacing">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-center font-heading text-2xl leading-[0.85] sm:text-3xl">
        {center}
      </span>
    </div>
  );
}

/** Concentric growth rings, like a cross-section of a tree trunk. */
function GrowthRings({ className = "" }: { className?: string }) {
  const radii = [30, 45, 60, 75, 90];
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      {radii.map((r) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.16 + (90 - r) * 0.004}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

export function BhoomithraSena() {
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["5%", "-12%"]);

  return (
    <ReportSection id="sec-bhoomithra-sena" tone={TONE}>
      <div style={PALETTE}>
        <Container>
          <Rail left="Bhoomithra Sena Club" right="Clubs & Activities / 14" />
        </Container>

        {/* Hero */}
        <div ref={heroRef} className="relative">
          <Container>
            <div className="grid gap-14 pb-16 pt-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:gap-10 lg:pb-24 sm:pt-16">
              <div className="relative z-10">
                <Reveal>
                  <Kicker>Where young minds meet the rhythm of nature</Kicker>
                  <h2 className="font-heading uppercase tracking-[-0.01em]">
                    <span className="block text-[clamp(5rem,16vw,15rem)] leading-[0.8]">Bhoomithra</span>
                    <motion.span
                      style={reduceMotion ? undefined : { x: drift }}
                      className={`block pl-[0.15em] text-[clamp(4rem,14vw,12rem)] leading-[0.82] text-[color:var(--accent)] ${OUTLINE}`}
                    >
                      Sena
                    </motion.span>
                  </h2>
                </Reveal>

                <Reveal delay={0.15} className="mt-10 max-w-xl">
                  <p className="border-l-4 border-[color:var(--accent)] pl-6 font-serif text-lg leading-[1.8] first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-[color:var(--accent)] sm:text-xl">
                    {INTRO}
                  </p>
                </Reveal>
              </div>

              <div className="relative mx-auto w-full max-w-[16rem] pt-4 sm:max-w-[18rem] lg:ml-auto lg:mr-0">
                <GrowthRings className="absolute inset-0 h-full w-full text-[color:var(--accent)]" />
                <Stamp
                  text="Bhoomithra ✦ Friend of the Earth ✦ "
                  center="AY 25—26"
                  className="relative mx-auto w-40 bg-[color:var(--cream)] text-[color:var(--ink)] shadow-[0_18px_30px_rgba(18,38,26,0.22)] sm:w-48"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Crossed tape bands */}
        <div className="relative z-10 py-6 sm:py-10">
          <div className="-mx-[5%] -rotate-2 bg-[color:var(--accent)] text-[color:var(--paper)]">
            <Marquee words={TAPE_TOP} duration={42} />
          </div>
          <div className="-mx-[5%] -mt-3 rotate-2 bg-[color:var(--ink)] text-[color:var(--sun)]">
            <Marquee words={TAPE_BOTTOM} reverse duration={36} outline />
          </div>
        </div>

        {/* Stat band */}
        <Container>
          <Reveal className="grid grid-cols-1 gap-8 border-b border-[color:var(--rule)] py-14 sm:grid-cols-3 sm:gap-6 sm:py-20">
            {STATS.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </Reveal>
        </Container>

        {/* Field log */}
        <Container>
          <div className="py-16 sm:py-24">
            <Reveal className="mb-14 grid items-end gap-6 sm:mb-20 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                <Kicker>Season Log · 2025—26</Kicker>
                <h3 className="font-heading text-[clamp(3.5rem,11vw,8rem)] uppercase leading-[0.82] tracking-[-0.01em]">
                  Field
                  <span className="block pl-[0.1em] text-[color:var(--accent)]">Notes</span>
                </h3>
              </div>
              <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
                Eleven programmes, logged from the first biodiversity register to the last seed sown.
              </p>
            </Reveal>

            <ol className="grid gap-x-6 gap-y-8 lg:grid-cols-2">
              {EVENTS.map((event, index) => (
                <motion.li
                  key={event.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.8, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-[color:var(--rule)] bg-[color:var(--cream)]/40 p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`${styles.leaf} flex h-12 w-12 shrink-0 items-center justify-center bg-[color:var(--accent)] font-heading text-lg text-[color:var(--paper)] sm:h-14 sm:w-14 sm:text-xl`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-[color:var(--muted)]">
                      {event.date}
                    </span>
                  </div>
                  <h4 className="mt-5 font-heading text-2xl uppercase leading-none tracking-wide sm:text-3xl">
                    {event.title}
                  </h4>
                  <p className="mt-3 text-[15px] leading-[1.8] text-[color:var(--muted)] sm:text-base">{event.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>

        {/* Field photos, polaroid-style */}
        <div className={`${styles.grain} relative bg-[color:var(--ink)] py-20 text-[color:var(--paper)] sm:py-28`}>
          <Container>
            <Reveal className="mb-14 sm:mb-20">
              <Kicker>In the Field</Kicker>
              <h3 className="font-heading text-[clamp(3.5rem,11vw,7rem)] uppercase leading-[0.82] tracking-[-0.01em] text-[color:var(--paper)]">
                From the Ground
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3 sm:items-start">
              {PHOTOS.map((photo, index) => {
                const tilt = index === 0 ? -2.5 : index === 1 ? 1.5 : -1;
                const lift = index === 1 ? "sm:mt-10" : "";
                return (
                  <motion.div
                    key={photo.id}
                    style={{ rotate: reduceMotion ? 0 : tilt }}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={reduceMotion ? undefined : { y: -8, rotate: 0 }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.polaroid} ${lift} mx-auto w-full max-w-xs`}
                  >
                    <div className="bg-[color:var(--cream)] p-3 pb-8 text-[color:var(--ink)]">
                      <ReportPhoto id={photo.id} alt={photo.alt} ratio="4/5" sizes="(max-width: 640px) 80vw, 30vw" />
                      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        {photo.caption}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </div>

        {/* Closing */}
        <div className="relative overflow-hidden bg-[color:var(--accent)] text-[color:var(--paper)]">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-4 -top-20 select-none font-heading text-[clamp(16rem,40vw,32rem)] leading-none text-[color:var(--sun)] opacity-90 sm:-top-32"
          >
            “
          </span>
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-[0.2em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[clamp(9rem,30vw,32rem)] uppercase leading-none opacity-25 ${OUTLINE}`}
          >
            Earth
          </span>

          <Container className="relative">
            <div className="grid items-end gap-14 pb-40 pt-40 sm:pb-56 sm:pt-52 lg:grid-cols-[1fr_auto] lg:gap-20">
              <Reveal>
                <p className="max-w-4xl font-serif text-2xl italic leading-[1.4] sm:text-3xl lg:text-4xl">{CLOSING}</p>
                <p className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[color:var(--sun)]">
                  <span className="h-px w-10 bg-[color:var(--sun)]" />
                  Bhoomithra Sena Club · GECW
                </p>
              </Reveal>

              <Stamp
                text="Reduce ✦ Reuse ✦ Recycle ✦ Restore ✦ "
                center="Bhoomithras"
                className="w-36 bg-[color:var(--sun)] text-[color:var(--ink)] sm:w-44 lg:w-52"
              />
            </div>
          </Container>
        </div>
      </div>
    </ReportSection>
  );
}
