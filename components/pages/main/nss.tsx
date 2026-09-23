"use client";

import { useId, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  type ReportPhotoItem,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./nss.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const TONE: ReportTone = {
  paper: "#f3eee4",
  ink: "#15193d",
  accent: "#c8281f",
  muted: "#15193dae",
  rule: "#15193d26",
};

// Fill-color (not color) is made transparent so currentColor still paints the stroke.
const OUTLINE = "[-webkit-text-stroke:2px_currentColor] [-webkit-text-fill-color:transparent]";

const INTRO = [
  "During the academic year 2025–26, NSS Units 168 & 263 of Government Engineering College Wayanad carried out a broad programme of community service, campus development, health awareness, environmental action, humanitarian assistance, student engagement and social responsibility.",
  "The year brought together activities ranging from campus improvement and waste-management drives to community visits, technical service, food distribution, health awareness, volunteering initiatives, cultural programmes and student-oriented events. The activities reflect the NSS objective of learning through service and encouraging students to respond to community and institutional needs through collective action.",
  "This annual report records 59 programmes conducted during the year, with detailed profiles of the major programmes for which individual reports or supporting records were supplied.",
];

const CONCLUSION = [
  "The academic year 2025–26 was a year of varied service and active student participation for NSS Units 168 & 263 of Government Engineering College Wayanad. The consolidated record of 59 programmes demonstrates the breadth of the units’ engagement across campus development, community welfare, environmental responsibility, health awareness, humanitarian service, civic engagement and student activities.",
  "Major initiatives such as Punarjani, Canteen Renovation, Scrap Collection, Godhavari community interventions, Jeevanudaanam, Plastic Collection, Sustainability and Carbon Neutrality, food distribution and the Children Home Onam Celebration connected volunteerism with practical outcomes. The documented Punarjani programme reclaimed public property worth ₹1.15 lakh, while the three Jeevanudaanam programmes together recorded 160 successful blood donations.",
  "The year also provided opportunities for volunteers to participate in civic and educational initiatives, environmental action, sports, cultural activities and meaningful interactions with children and communities. Through these experiences, NSS continued to provide a platform for students to learn through service and translate collective effort into socially useful action.",
];

const PROGRAMMES: { name: string; photos: ReportPhotoItem[] }[] = [
  {
    name: "Canteen Renovation",
    photos: [
      { id: "nss-canteen-1", alt: "Volunteer painting a mural on the renovated canteen wall" },
      { id: "nss-canteen-2", alt: "Cartoon face painted on the canteen wall" },
      { id: "nss-canteen-3", alt: "Volunteers painting a quote on the canteen wall" },
    ],
  },
  {
    name: "Scrap Collection",
    photos: [{ id: "nss-scrap", alt: "NSS volunteers with collected plastic waste bags and a banner" }],
  },
  {
    name: "Punarjani",
    photos: [
      { id: "nss-punarjani-1", alt: "Volunteers handling a hospital bed during Punarjani" },
      { id: "nss-punarjani-2", alt: "Newspaper coverage of the Punarjani programme" },
    ],
  },
  {
    name: "Jeevanudaanam",
    photos: [
      { id: "nss-blood-1", alt: "A student donating blood at the Jeevanudaanam camp" },
      { id: "nss-blood-2", alt: "A volunteer assisting a blood donor" },
      { id: "nss-blood-3", alt: "Volunteers gathered behind a Red Ribbon Club GECW Wayanad banner" },
    ],
  },
  {
    name: "Hearing Aid Handover",
    photos: [
      { id: "nss-hearing-aid-1", alt: "Newspaper clipping on the hearing aid handover" },
      { id: "nss-hearing-aid-2", alt: "Handover of hearing aids reported in the press" },
    ],
  },
  {
    name: "Godhavari Electrification",
    photos: [{ id: "nss-godhavari", alt: "Poster of the Godhavari electrification programme by NSS units 168 & 263" }],
  },
  {
    name: "Hridayapoorvam Pothichoru",
    photos: [
      { id: "nss-pothichoru-1", alt: "Volunteers packing food parcels" },
      { id: "nss-pothichoru-2", alt: "Volunteers carrying food parcels for distribution" },
    ],
  },
  {
    name: "Plastic Collection",
    photos: [{ id: "nss-plastic", alt: "Volunteers walking along a road collecting plastic waste" }],
  },
  {
    name: "Sustainability and Carbon Neutrality",
    photos: [{ id: "nss-carbon", alt: "Participants of the sustainability and carbon neutrality session in a hall" }],
  },
  {
    name: "Annual Sports Meet",
    photos: [{ id: "nss-sports-meet", alt: "Students running on the track during the annual sports meet" }],
  },
  {
    name: "Voters Day",
    photos: [
      { id: "nss-voters-day-1", alt: "Students seated in an auditorium for National Voters Day" },
      { id: "nss-voters-day-2", alt: "Students and officials at the Voters Day programme" },
    ],
  },
  {
    name: "Anganwadi Visit",
    photos: [{ id: "nss-anganwadi", alt: "Volunteers with a tricolour banner and children at an anganwadi" }],
  },
  {
    name: "Clothes Collection",
    photos: [{ id: "nss-clothes", alt: "Volunteers sorting collected clothes" }],
  },
  {
    name: "Children Home Onam Celebration",
    photos: [{ id: "nss-onam", alt: "Children gathered at the children’s home for Onam celebration" }],
  },
];

// Callouts pulled from the conclusion, filed against the programme they belong to.
const HIGHLIGHTS: Record<string, string> = {
  Punarjani: "₹1.15L in public property reclaimed",
  Jeevanudaanam: "160 successful blood donations",
};

const GRID_COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1 sm:max-w-xl",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

const TAPE_TOP = ["Service", "Self", "Society", "Seva", "Unity", "Care"];
const TAPE_BOTTOM = ["Campus", "Community", "Action", "Volunteer", "Duty", "Change"];

const MEDALS = [
  { value: "59", label: "Programmes recorded", tilt: -3 },
  { value: "160", label: "Successful blood donations", tilt: 2 },
  { value: "₹1.15L", label: "Public property reclaimed · Punarjani", tilt: -1.5 },
] as const;

/** Scrolling motto tape. Two identical tracks translate by their own width for a seamless loop. */
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

/** The Konark-wheel emblem: a rotating spoked ring with the unit motto set on the rim. */
function Emblem({ className = "" }: { className?: string }) {
  const pathId = `nss-rim-${useId().replace(/:/g, "")}`;
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg
        viewBox="0 0 240 240"
        aria-hidden
        className={`${styles.spin} absolute inset-0 h-full w-full text-[color:var(--accent)]`}
      >
        <defs>
          <path id={pathId} d="M120,120 m-96,0 a96,96 0 1,1 192,0 a96,96 0 1,1 -192,0" />
        </defs>
        <circle cx="120" cy="120" r="96" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="120" cy="120" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        {Array.from({ length: 16 }).map((_, index) => (
          <line
            key={index}
            x1="120"
            y1="120"
            x2="120"
            y2="26"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
            transform={`rotate(${index * 22.5} 120 120)`}
          />
        ))}
        <circle cx="120" cy="120" r="16" fill="currentColor" />
        <text fontSize="12" letterSpacing="2" fill="currentColor" className="font-mono uppercase">
          <textPath href={`#${pathId}`}>Not Me But You · Not Me But You · </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[color:var(--ink)]">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">Units</span>
        <span className="font-heading text-4xl leading-none sm:text-5xl">168&amp;263</span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">GECW · 25–26</span>
      </div>
    </div>
  );
}

/** A campaign-medal stat: a ribbon tail behind a double-ringed medallion. */
function Medal({
  value,
  label,
  tilt,
  index,
}: {
  value: string;
  label: string;
  tilt: number;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      style={{ rotate: tilt }}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -8, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
      className={`${styles.medal} relative mx-auto flex w-44 flex-col items-center sm:w-48`}
    >
      <span
        aria-hidden
        className={`${styles.ribbon} absolute -bottom-6 h-14 w-24 ${
          index % 2 === 0 ? "bg-[color:var(--accent)]" : "bg-[color:var(--ink)]"
        }`}
      />
      <div className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 border-double border-[color:var(--ink)] bg-[color:var(--paper)] px-4 text-center sm:h-40 sm:w-40">
        <p className="font-heading text-4xl leading-none text-[color:var(--accent)] sm:text-5xl">{value}</p>
        <p className="mt-2 font-mono text-[8px] uppercase leading-tight tracking-[0.16em] text-[color:var(--muted)]">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function Nss() {
  return (
    <ReportSection id="sec-nss" tone={TONE}>
      <Container>
        <Rail left="National Service Scheme" right="Clubs & Activities / 05" />
      </Container>

      {/* Hero: display lockup on the left, the unit's wheel emblem on the right */}
      <Container>
        <div className="grid gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-10 lg:pb-32">
          <div>
            <Reveal>
              <Kicker>Units 168 &amp; 263 · 2025–26</Kicker>
              <h2 className="font-heading uppercase tracking-[-0.01em]">
                <span className="block text-[clamp(6rem,26vw,12rem)] leading-[0.78] sm:text-[clamp(10rem,20vw,17rem)] lg:text-[clamp(12rem,17vw,20rem)]">
                  NSS
                </span>
                <span
                  className={`block text-[clamp(3rem,15vw,6rem)] leading-[0.85] sm:text-[clamp(4.5rem,11vw,7.5rem)] lg:text-[clamp(4.5rem,9vw,8rem)] ${OUTLINE}`}
                >
                  Service
                </span>
                <span className="-mt-[0.1em] block pl-[0.4em] font-serif text-[clamp(3rem,13vw,5rem)] normal-case italic leading-none tracking-normal text-[color:var(--accent)] sm:text-[clamp(4rem,9vw,6.5rem)]">
                  Scheme.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 max-w-xl sm:mt-14">
              <p className="border-l-4 border-[color:var(--accent)] pl-6 font-serif text-lg leading-[1.8] first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-[color:var(--accent)] sm:text-xl">
                {INTRO[0]}
              </p>
            </Reveal>
            <div className="mt-5 max-w-xl space-y-5 text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
              {INTRO.slice(1).map((text, index) => (
                <Reveal key={index} y={16} delay={0.05 + index * 0.05}>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="mx-auto w-full max-w-[16rem] sm:max-w-[19rem] lg:ml-auto lg:mr-0">
            <Emblem />
          </Reveal>
        </div>
      </Container>

      {/* Crossed motto tape */}
      <div className="relative z-10 py-8 sm:py-14">
        <div className="-mx-[5%] -rotate-2 bg-[color:var(--ink)] text-[color:var(--paper)]">
          <Marquee words={TAPE_TOP} duration={45} />
        </div>
        <div className="-mx-[5%] -mt-3 rotate-2 bg-[color:var(--accent)] text-[color:var(--paper)]">
          <Marquee words={TAPE_BOTTOM} reverse duration={38} outline />
        </div>
      </div>

      {/* Campaign medals */}
      <Container>
        <div className="grid grid-cols-1 gap-16 py-16 sm:grid-cols-3 sm:gap-10 sm:py-24">
          {MEDALS.map((medal, index) => (
            <Medal key={medal.label} value={medal.value} label={medal.label} tilt={medal.tilt} index={index} />
          ))}
        </div>
      </Container>

      {/* Service register: each programme filed as a numbered, tabbed entry */}
      <Container>
        <Reveal className="mb-12 grid items-end gap-6 sm:mb-16 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <Kicker>The Service Register</Kicker>
            <h3 className="font-heading text-[clamp(3.5rem,11vw,8rem)] uppercase leading-[0.85] tracking-[-0.01em]">
              Fourteen
              <span className="block text-[color:var(--accent)]">Files</span>
            </h3>
          </div>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
            Major programmes from the year's 59, filed with supporting records.
          </p>
        </Reveal>
      </Container>

      <div className="relative border-t-2 border-[color:var(--ink)]">
        <span aria-hidden className={`${styles.punch} absolute inset-y-0 left-0 w-3 sm:left-4`} />
        {PROGRAMMES.map((programme, index) => {
          const highlight = HIGHLIGHTS[programme.name];
          return (
            <div
              key={programme.name}
              className="grid gap-6 border-b-2 border-[color:var(--ink)]/60 py-10 pl-10 sm:pl-16 md:grid-cols-[16rem_1fr] md:gap-12 md:py-14"
            >
              <Reveal y={12}>
                <span
                  className={`${styles.tab} inline-flex -rotate-2 items-baseline gap-2 bg-[color:var(--ink)] px-3 py-1.5 text-[color:var(--paper)]`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] opacity-70">File</span>
                  <span className="font-heading text-2xl leading-none">{String(index + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="mt-4 font-heading text-3xl uppercase leading-[0.95] sm:text-4xl">{programme.name}</h3>
                {highlight && (
                  <p className="mt-3 inline-block border border-[color:var(--accent)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    {highlight}
                  </p>
                )}
              </Reveal>
              <div className={`grid grid-cols-1 items-start gap-3 sm:gap-4 ${GRID_COLUMNS[programme.photos.length]}`}>
                {programme.photos.map((photo, photoIndex) => (
                  <Reveal key={photo.id} delay={photoIndex * 0.07} y={18}>
                    <div className="transition-transform duration-300 will-change-transform hover:-translate-y-1.5">
                      <ReportPhoto {...photo} sizes="(max-width: 768px) 100vw, 30vw" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing: the units' seal, stamped over a watermark */}
      <div className={`${styles.ruled} relative overflow-hidden bg-[color:var(--accent)] text-[color:var(--paper)]`}>
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 -top-16 select-none font-heading text-[clamp(14rem,36vw,30rem)] leading-none text-[color:var(--ink)] opacity-80 sm:-top-24"
        >
          “
        </span>
        <span
          aria-hidden
          className={`pointer-events-none absolute -bottom-[0.2em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[clamp(9rem,30vw,32rem)] uppercase leading-none opacity-20 ${OUTLINE}`}
        >
          Service
        </span>

        <Container className="relative">
          <div className="grid gap-14 pb-40 pt-40 sm:pb-56 sm:pt-52 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <div className="max-w-4xl">
              <Reveal>
                <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-[color:var(--ink)]">
                  <span className="h-px w-8 bg-[color:var(--ink)]" />
                  Conclusion · 2025–26
                </p>
              </Reveal>
              <div className="space-y-6">
                {CONCLUSION.map((text, index) => (
                  <Reveal key={index} y={16} delay={index * 0.05}>
                    <p className="font-serif text-xl italic leading-[1.5] sm:text-2xl lg:text-3xl">{text}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className="mx-auto border-4 border-double border-[color:var(--ink)] px-8 py-6 text-center lg:mx-0">
                <p className="font-heading text-3xl uppercase leading-none sm:text-4xl">NSS</p>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em]">Units 168 &amp; 263</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] opacity-70">GEC Wayanad</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </ReportSection>
  );
}
