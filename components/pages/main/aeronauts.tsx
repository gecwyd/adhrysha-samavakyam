"use client";

import { useId, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
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
import styles from "./aeronauts.module.css";

const TONE: ReportTone = {
  paper: "#0d1420",
  ink: "#f4efe8",
  accent: "#ffb26b",
  muted: "#f4efe8b3",
  rule: "#ffb26b2e",
};

// Secondary telemetry palette layered over the base tone.
const PALETTE = {
  "--signal": "#7ce3c0",
  "--sky": "#5ea8ff",
} as CSSProperties;

const TELEMETRY = [
  ["MODE", "MANUAL"],
  ["SIGNAL", "STRONG"],
  ["STATUS", "AIRBORNE"],
] as const;

const BEFORE_QUOTE = [
  "With the hum of propellers and the excitement of watching technology take flight, AERONAUTS, the Drone Club of Government Engineering College, Wayanad, brings together students with a passion for drones, aviation, and innovation.",
  "Drones have moved far beyond being flying gadgets. Today, they are transforming industries through applications in photography, agriculture, surveying, disaster management, defence, and many other fields. AERONAUTS provides students with a platform to explore this rapidly evolving technology and understand the ideas that make these systems possible.",
  "Through workshops, technical sessions, demonstrations, hands-on activities, and projects, the club encourages students to move beyond theoretical learning and experience technology in action. From understanding drone components and flight principles to exploring electronics, control systems, simulation, and design, every activity opens the door to something new.",
];

const AFTER_QUOTE = [
  "This year, the team is once again gearing up to participate in the competition, carrying forward the experience gained from the previous edition while aiming to push their ideas further. With every challenge comes an opportunity to learn, improve, and build something better.",
  "But AERONAUTS is not only about technology. It is about curiosity, creativity, collaboration, and the courage to experiment. Students from different interests and backgrounds come together, share ideas, learn from one another, and turn those ideas into experiences that extend beyond the classroom.",
];

const TAPE_TOP = ["Fly", "Build", "Soar", "Capture", "Explore", "Innovate"];
const TAPE_BOTTOM = ["Design", "Launch", "Discover", "Ignite", "Ascend", "Code"];

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

/** Radar-style badge: a rotating text ring over a rotating conic sweep. */
function RadarBadge({ text, center, className = "" }: { text: string; center: string; className?: string }) {
  const pathId = `radar-${useId().replace(/:/g, "")}`;
  return (
    <div className={`relative aspect-square rounded-full border border-current/40 ${className}`}>
      <div
        aria-hidden
        className={`${styles.sweep} absolute inset-1 rounded-full opacity-70`}
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, currentColor 26deg, transparent 70deg)",
        }}
      />
      <svg viewBox="0 0 200 200" aria-hidden className={`${styles.spin} absolute inset-0 h-full w-full`}>
        <defs>
          <path id={pathId} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text fontSize="21" className="font-mono uppercase" fill="currentColor" textLength="470" lengthAdjust="spacing">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-center font-heading text-xl leading-[0.85] sm:text-2xl">
        {center}
      </span>
    </div>
  );
}

/** Four HUD corner brackets framing whatever they're layered over. */
function HudCorners({ className = "" }: { className?: string }) {
  const corner = "absolute h-6 w-6 border-current/70 sm:h-9 sm:w-9";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-4 sm:inset-6 ${className}`}>
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}

export function Aeronauts() {
  const reduceMotion = useReducedMotion();

  return (
    <ReportSection id="sec-aeronauts" tone={TONE}>
      <div style={PALETTE}>
        {/* Hero: full-bleed drone shot with a HUD reticle, telemetry readout, and stacked display type */}
        <div className="relative h-[94svh] min-h-[38rem] w-full overflow-hidden">
          <Image
            src={resolveAsset("aeronauts-drone.webp")}
            alt="A quadcopter drone held up against a dusk sky over forested hills"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_55%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1420] via-[#0d1420]/35 to-[#0d1420]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1420]/70 via-transparent to-transparent" />

          <HudCorners className="text-[color:var(--accent)]" />
          <span
            aria-hidden
            className={`${styles.scanline} absolute inset-x-4 top-4 h-px bg-[color:var(--signal)] shadow-[0_0_12px_2px_var(--signal)] sm:inset-x-6`}
          />

          <Container className="absolute inset-x-0 top-0">
            <Rail left="Drone Club" right="Clubs & Activities / 12" />
          </Container>

          {/* Telemetry readout, top-right */}
          <div className="absolute right-5 top-20 hidden flex-col items-end gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--signal)] sm:right-10 sm:top-24 sm:flex lg:right-16">
            {TELEMETRY.map(([label, value]) => (
              <p key={label} className="flex items-center gap-2">
                <span className="text-[color:var(--muted)]">{label}</span>
                <span>{value}</span>
              </p>
            ))}
            <p className="mt-1 flex items-center gap-2 text-[color:var(--accent)]">
              <span aria-hidden className={`${styles.blink} h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]`} />
              LIVE FEED
            </p>
          </div>

          <RadarBadge
            text="Fly ✦ Build ✦ Soar ✦ "
            center="AY 25—26"
            className="absolute bottom-8 right-5 hidden w-28 text-[color:var(--accent)] sm:flex sm:w-32 lg:right-16 lg:w-36"
          />

          <Container className="absolute inset-x-0 bottom-0 pb-10 sm:pb-16">
            <Reveal>
              <Kicker>Where curiosity takes flight</Kicker>
              <h2 className="font-heading uppercase leading-[0.78] tracking-[-0.01em]">
                <span className="block text-[clamp(5.5rem,20vw,13rem)] lg:text-[clamp(8rem,15vw,15rem)]">
                  Aero
                </span>
                <span
                  className={`block text-[clamp(5.5rem,20vw,13rem)] text-[color:var(--accent)] lg:text-[clamp(8rem,15vw,15rem)] ${OUTLINE}`}
                >
                  Nauts
                </span>
              </h2>
              <p className="mt-4 font-serif text-xl italic text-[color:var(--accent)] sm:text-2xl">
                Drone Club · GEC Wayanad
              </p>
            </Reveal>
          </Container>
        </div>

        {/* Crossed marquee tape */}
        <div className="relative z-10 py-8 sm:py-14">
          <div className="-mx-[5%] -rotate-2 bg-[color:var(--accent)] text-[color:var(--paper)]">
            <Marquee words={TAPE_TOP} duration={44} />
          </div>
          <div className="-mx-[5%] -mt-3 rotate-2 bg-[color:var(--ink)] text-[color:var(--paper)]">
            <Marquee words={TAPE_BOTTOM} reverse duration={37} outline />
          </div>
        </div>

        {/* Mission briefing: intro paragraphs framed like a spec sheet */}
        <Container>
          <div className="pb-20 pt-4 sm:pb-28 sm:pt-10">
            <div className="relative border border-[color:var(--rule)] px-6 py-10 sm:px-12 sm:py-14">
              <HudCorners className="text-[color:var(--rule)]" />
              <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-[color:var(--rule)] pb-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                <span>Subject — Aeronauts Drone Club</span>
                <span className="text-[color:var(--accent)]">Status — Active</span>
              </div>
              <div className="mx-auto max-w-3xl space-y-6 text-[15px] leading-[1.9] text-[color:var(--muted)] sm:text-lg">
                {BEFORE_QUOTE.map((text, index) => (
                  <Reveal key={index} y={16}>
                    <p>{text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* NIDAR spotlight */}
        <div className={`${styles.grid} relative border-y border-[color:var(--rule)] bg-[color:var(--ink)]/[0.02]`}>
          <Container>
            <div className="grid items-center gap-12 py-16 sm:py-24 md:grid-cols-[1fr_1.05fr] md:gap-16 lg:py-28">
              <Reveal>
                <p className="font-mono text-[9px] uppercase tracking-[0.34em] text-[color:var(--accent)]">
                  A national stage
                </p>
                <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <span className="font-heading text-[clamp(6rem,22vw,10rem)] leading-[0.78] text-[color:var(--accent)] lg:text-[clamp(7rem,13vw,11rem)]">
                    2025
                  </span>
                  <span
                    className={`pb-2 font-heading text-4xl uppercase leading-none sm:text-5xl ${OUTLINE}`}
                  >
                    Finalists
                  </span>
                </div>
                <p className="mt-8 max-w-lg text-[15px] leading-[1.9] text-[color:var(--muted)] sm:text-lg">
                  The club has already marked its presence on a national stage. Last year, Team Aeronauts from GEC
                  Wayanad emerged as finalists in NIDAR 2025, a national drone innovation challenge. This achievement
                  stands as a proud moment for the college and reflects the dedication, teamwork, and innovative
                  spirit of the students involved.
                </p>
                <p className="mt-8 font-serif text-2xl italic leading-[1.3] sm:text-3xl">
                  But for AERONAUTS, the achievement is not a finish line; it is a starting point.
                </p>
                <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[color:var(--rule)] pt-2">
                  <Stat value="NIDAR" label="Challenge" />
                  <Stat value="2025" label="Edition" />
                  <Stat value="01" label="Team fielded" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <ReportPhoto
                  id="aeronauts-nidar"
                  alt="Team Aeronauts with their drones at the NIDAR national drone innovation challenge"
                  caption="Team Aeronauts · NIDAR 2025 finalists"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Reveal>
            </div>
          </Container>
        </div>

        {/* Continuing narrative */}
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 py-16 text-[15px] leading-[1.9] text-[color:var(--muted)] sm:py-24 sm:text-lg">
            {AFTER_QUOTE.map((text, index) => (
              <Reveal key={index} y={16}>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </Container>

        {/* Closing statement, oversized watermark behind team photo */}
        <div className="relative overflow-hidden bg-[color:var(--accent)] text-[color:var(--paper)]">
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[clamp(9rem,32vw,32rem)] uppercase leading-none opacity-25 ${OUTLINE}`}
          >
            Aeronauts
          </span>

          <Container className="relative">
            <div className="grid items-end gap-12 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-40">
              <Reveal>
                <p className="font-heading text-5xl uppercase leading-[0.9] sm:text-7xl">
                  Look higher.
                  <span className="block">Think differently.</span>
                  Create boldly.
                </p>
                <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-[color:var(--paper)]/80">
                  As drones continue to reshape the world around us, AERONAUTS aims to inspire students to look
                  higher, think differently, and create boldly.
                </p>
                <p className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em]">
                  <span className="h-px w-10 bg-[color:var(--paper)]" />
                  Aeronauts Drone Club · GECW
                </p>
              </Reveal>
              <Reveal delay={0.1} className="relative">
                <motion.div
                  animate={reduceMotion ? undefined : { rotate: [-1, 1, -1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ReportPhoto
                    id="aeronauts-team"
                    alt="Members of the Aeronauts drone club standing in a row outside a building"
                    ratio="16 / 9"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                </motion.div>
                <RadarBadge
                  text="GEC Wayanad ✦ Drone Club ✦ "
                  center="Aeronauts"
                  className="absolute -bottom-8 -left-6 z-10 w-28 border-[color:var(--paper)]/40 bg-[color:var(--paper)] text-[color:var(--accent)] sm:-left-12 sm:w-32"
                />
              </Reveal>
            </div>
          </Container>
        </div>
      </div>
    </ReportSection>
  );
}
