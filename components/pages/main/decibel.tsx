"use client";

import type { CSSProperties } from "react";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  type ReportTone,
  type TimelineItem,
} from "@/components/ui/report-kit";
import styles from "./decibel.module.css";

const TONE: ReportTone = {
  paper: "#12061c",
  ink: "#f4eaff",
  accent: "#d45cff",
  muted: "#f4eaffb3",
  rule: "#f4eaff26",
};

const STAGE_AMBER = "#ffb84d";

// The line-up is read like a festival bill: the higher the office, the bigger the type.
const LINEUP: { tier: 1 | 2 | 3; people: [role: string, name: string][] }[] = [
  {
    tier: 1,
    people: [
      ["President", "Amitha Joy"],
      ["Vice President", "Ashwinjith"],
      ["Secretary", "Muhammed Sinan M."],
    ],
  },
  {
    tier: 2,
    people: [
      ["Joint Secretary", "Delvin Jaison"],
      ["Treasurer", "Pranavathmika"],
      ["Program Coordinator", "Basim Hassan"],
    ],
  },
  {
    tier: 3,
    people: [
      ["Media & Publicity", "Abhinand"],
      ["Media & Publicity", "Athun"],
      ["Technical", "Sanjay"],
    ],
  },
];

const TIER_TYPE = {
  1: "text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95]",
  2: "text-[clamp(2rem,5vw,4.25rem)] leading-none text-[color:var(--ink)]/85",
  3: "text-[clamp(1.4rem,3vw,2.5rem)] leading-none text-[color:var(--muted)]",
} as const;

const EVENTS: TimelineItem[] = [
  {
    date: "14 Sep 2025",
    title: "SPARK 3.0",
    body: "Performed at the GBOT First Year Orientation Programme, welcoming newcomers with an energetic musical performance.",
  },
  {
    date: "7 Oct 2025",
    title: "Band Selection 2025",
    body: "Conducted auditions for first-year students in vocals and instruments, identifying and welcoming new musical talent into Decibel.",
  },
  {
    date: "24 Oct 2025",
    title: "Tathva 2025, NIT Calicut",
    body: "Performed at the prestigious techno-management fest of NIT Calicut, gaining valuable exposure and marking a significant milestone for the band.",
  },
  {
    date: "19 Dec 2025",
    title: "AKCSSE IEEE 2025",
    body: "Delivered a musical performance for students, delegates, and IEEE members, adding vibrancy to the event.",
  },
  {
    date: "23 Jan 2026",
    title: "National Voters Day",
    body: "Performed at the District Level Inauguration held at GECW in the presence of the Wayanad District Collector and distinguished guests.",
  },
  {
    date: "24 Mar 2026",
    title: "ORMA 2026 – NSS Farewell",
    body: "Presented a heartfelt performance for the farewell of outgoing NSS volunteers.",
  },
  {
    date: "28 Mar 2026",
    title: "One Last Song",
    body: "Decibel Farewell 2026: a gathering for outgoing band members, celebrating their contributions through performances, speeches, memories, and gratitude.",
  },
];

// Side A is the autumn/winter of 2025, Side B is 2026.
const SIDES = [
  { label: "Side A", note: "Sep – Dec 2025", start: 0, end: 4 },
  { label: "Side B", note: "Jan – Mar 2026", start: 4, end: EVENTS.length },
];

const SNAPS = [
  {
    id: "decibel-new-members",
    alt: "Decibel new member line-up poster",
    caption: "New members",
    tilt: "-rotate-2 hover:rotate-0",
    offset: "",
  },
  {
    id: "decibel-tathva",
    alt: "Decibel performing on stage at Tathva 2025",
    caption: "Tathva 2025",
    tilt: "rotate-[1.5deg] hover:rotate-0",
    offset: "sm:mt-12",
  },
  {
    id: "decibel-akcssc",
    alt: "Decibel members seated together at AKCSSC",
    caption: "AKCSSC",
    tilt: "-rotate-[1.5deg] hover:rotate-0",
    offset: "sm:mt-4",
  },
  {
    id: "decibel-voters-day",
    alt: "Students singing at the National Voters Day event",
    caption: "Voters Day",
    tilt: "rotate-2 hover:rotate-0",
    offset: "sm:mt-16",
  },
] as const;

const MARQUEE = [
  "Spark 3.0",
  "Band Selection",
  "Tathva 2025",
  "AKCSSE IEEE",
  "National Voters Day",
  "ORMA 2026",
  "One Last Song",
];

type Bar = { lo: number; mid: number; hi: number; d: number; delay: number };

// Deterministic (rounded) so server and client markup match.
function makeBars(count: number, seed: number): Bar[] {
  return Array.from({ length: count }, (_, i) => {
    const lo = 0.2 + 0.55 * Math.abs(Math.sin(i * 1.7 + seed * 2.3 + 0.6));
    return {
      lo: +lo.toFixed(2),
      mid: +Math.max(0.14, lo * 0.55).toFixed(2),
      hi: +Math.min(1, lo + 0.4).toFixed(2),
      d: +(0.8 + ((i + seed) % 5) * 0.17).toFixed(2),
      delay: -(((i * 37 + seed * 11) % 100) / 50),
    };
  });
}

const barVars = (bar: Bar) =>
  ({
    "--lo": bar.lo,
    "--mid": bar.mid,
    "--hi": bar.hi,
    "--d": `${bar.d}s`,
    "--delay": `${bar.delay}s`,
  }) as CSSProperties;

const HERO_BARS = makeBars(48, 0);
const TRACK_BARS = EVENTS.map((_, index) => makeBars(20, index + 1));
const DB_SCALE = ["0", "20", "40", "60", "80", "100", "120 dB"];

function Equalizer() {
  return (
    <div aria-hidden="true">
      <div className="flex h-36 items-end gap-[3px] sm:h-52 sm:gap-1 lg:h-64">
        {HERO_BARS.map((bar, index) => (
          <span key={index} className={styles.bar} style={barVars(bar)} />
        ))}
      </div>
      {/* Reflection on the “floor”. */}
      <div className="flex h-10 scale-y-[-1] items-end gap-[3px] overflow-hidden opacity-25 [mask-image:linear-gradient(to_top,black,transparent)] sm:h-14 sm:gap-1">
        {HERO_BARS.map((bar, index) => (
          <span key={index} className={`${styles.bar} !h-36 sm:!h-52 lg:!h-64`} style={barVars(bar)} />
        ))}
      </div>
      <div className="mt-3 flex justify-between border-t border-[color:var(--rule)] pt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
        {DB_SCALE.map((mark) => (
          <span key={mark}>{mark}</span>
        ))}
      </div>
    </div>
  );
}

function MiniWave({ bars }: { bars: Bar[] }) {
  return (
    <span aria-hidden="true" className="flex h-6 items-end gap-[2px] text-[color:var(--accent)]">
      {bars.map((bar, index) => (
        <span key={index} className={styles.miniBar} style={barVars(bar)} />
      ))}
    </span>
  );
}

function Sleeve() {
  return (
    <div className={`${styles.sleeveWrap} mx-auto w-[78%] max-w-sm lg:w-full lg:max-w-md`}>
      <div aria-hidden="true" className={styles.vinylSlot}>
        <div className={styles.vinyl}>
          <div className={styles.label}>
            <span>
              DECIBEL
              <br />
              2025-26
            </span>
          </div>
        </div>
      </div>
      <div className="relative z-10 -rotate-[2.5deg] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] transition-transform duration-700 hover:rotate-0">
        <ReportPhoto
          id="decibel-spark"
          alt="Decibel Music Band poster for Spark 3.0 at the CSE Seminar Hall"
          priority
          sizes="(max-width: 1024px) 78vw, 34vw"
        />
      </div>
      <p className="relative z-10 mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--ink)]/80">
        Side A · Track 01 · Spark 3.0
      </p>
    </div>
  );
}

function Speaker() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex aspect-[3/4] w-full max-w-[17rem] flex-col items-center justify-evenly rounded-[1.75rem] border border-[color:var(--rule)] bg-[linear-gradient(160deg,#2c1244,#150822)] px-6 shadow-[0_30px_80px_-20px_rgba(212,92,255,0.4)]"
    >
      <div className="aspect-square w-[26%] rounded-full border border-[color:var(--rule)] bg-[radial-gradient(circle_at_35%_30%,#5a2a80,#1a0a2a_70%)]" />
      <div className="relative aspect-square w-[82%]">
        <span className={styles.ripple} />
        <span className={styles.ripple} style={{ animationDelay: "-1.1s" }} />
        <div
          className={`${styles.woofer} absolute inset-0 rounded-full border-[6px] border-[#08020e] bg-[radial-gradient(circle,#2a1240_0_18%,#0c0414_19%_34%,#1f0d33_35%_58%,#08020e_59%_66%,#2a1240_67%)] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]`}
        >
          <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#d45cff,#5b1a82_70%)]" />
        </div>
      </div>
    </div>
  );
}

export function Decibel() {
  return (
    <ReportSection id="sec-decibel" tone={TONE}>
      {/* ── Stage: hero ─────────────────────────────────────────────── */}
      <div className="relative isolate">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <span className={`${styles.beam} ${styles.beamLeft}`} />
          <span className={`${styles.beam} ${styles.beamMid}`} />
          <span className={`${styles.beam} ${styles.beamRight}`} />
          <span className={styles.floor} />
        </div>

        <Container>
          <Rail left="Music Club" right="Clubs & Activities / 01" />

          <div className="grid grid-cols-1 items-center gap-14 pb-10 pt-14 sm:pt-20 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
            <Reveal>
              <Kicker>Music Club · 2025–26</Kicker>
              <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[color:var(--ink)]/30 bg-[color:var(--paper)]/60 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--ink)]/90">
                <span
                  className={`${styles.live} h-1.5 w-1.5 rounded-full`}
                  style={{ background: STAGE_AMBER, boxShadow: `0 0 10px ${STAGE_AMBER}` }}
                />
                Now playing · Season 2025–26
              </p>
              <h2 className="font-heading text-[clamp(5.5rem,19vw,17rem)] uppercase leading-[0.8] tracking-[-0.01em]">
                Deci
                <span className="text-[color:var(--accent)]">bel</span>
              </h2>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--ink)]/85">
                Music Band · GECW
              </p>
              <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-[color:var(--ink)]/90 [text-shadow:0_0_14px_#12061c,0_0_4px_#12061c] sm:text-base">
                Decibel, the Music Band of Government Engineering College Wayanad, functions under the Music Club as
                a vibrant platform for students passionate about music and artistic expression. Throughout 2025–26,
                the club contributed to campus culture through performances, talent selection, collaborations, and
                participation in prominent events. Beyond entertainment, Decibel promoted creativity, confidence,
                teamwork, leadership, and a strong sense of belonging among students.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Sleeve />
            </Reveal>
          </div>

          <div className="pb-12 sm:pb-20">
            <Equalizer />
          </div>
        </Container>
      </div>

      {/* ── Tape marquee ────────────────────────────────────────────── */}
      <div aria-hidden="true" className="overflow-hidden py-6 sm:py-10">
        <div className={`${styles.tape} bg-[var(--accent)] py-3 text-[color:var(--paper)] sm:py-4`}>
          <div className={styles.marquee}>
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex flex-none items-center">
                {MARQUEE.map((item) => (
                  <li
                    key={item}
                    className="flex items-center font-heading text-2xl uppercase leading-none tracking-wide sm:text-4xl"
                  >
                    <span className="px-5 sm:px-8">{item}</span>
                    <span className="text-lg sm:text-2xl">✦</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <Container>
        {/* ── Tracklist ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-16 lg:self-start">
            <Kicker>Major activities &amp; events</Kicker>
            <h3 className="font-heading text-[clamp(3.5rem,9vw,8rem)] uppercase leading-[0.85]">
              Track
              <span className="block text-[color:var(--accent)]">list</span>
            </h3>
            <p className="mt-6 max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
              Seven moments, two sides.
              <br />
              Hover a track to hear it.
            </p>
          </Reveal>

          <div className="space-y-12">
            {SIDES.map((side) => (
              <div key={side.label}>
                <Reveal y={12}>
                  <h4 className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                    {side.label}
                    <span className="h-px flex-1 bg-[color:var(--rule)]" />
                    <span className="text-[color:var(--muted)]">{side.note}</span>
                  </h4>
                </Reveal>
                <ol className="mt-4 border-t border-[color:var(--rule)]">
                  {EVENTS.slice(side.start, side.end).map((event, offset) => {
                    const index = side.start + offset;
                    const finale = index === EVENTS.length - 1;
                    return (
                      <li key={event.title} className={`${styles.track} border-b border-[color:var(--rule)]`}>
                        <Reveal y={12}>
                          <div className="grid grid-cols-[3.25rem_1fr] gap-x-2 gap-y-3 px-1 py-7 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-x-4 sm:px-3 sm:py-9">
                            <span className="pt-1 font-mono text-[11px] tracking-[0.2em] text-[color:var(--accent)] sm:text-xs">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                              {finale && (
                                <span className="mb-3 inline-block rounded-full bg-[var(--accent)] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--paper)]">
                                  Encore · Finale
                                </span>
                              )}
                              <h5
                                className={`${styles.trackTitle} font-heading uppercase leading-none tracking-wide ${
                                  finale ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl"
                                }`}
                              >
                                {event.title}
                              </h5>
                              <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-[color:var(--muted)]">
                                {event.body}
                              </p>
                            </div>
                            <div className="col-start-2 flex items-center gap-4 sm:col-start-auto sm:flex-col sm:items-end sm:gap-3">
                              <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
                                {event.date}
                              </p>
                              <MiniWave bars={TRACK_BARS[index]} />
                            </div>
                          </div>
                        </Reveal>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* ── Snapshots ─────────────────────────────────────────────── */}
        <div className="border-t border-[color:var(--rule)] py-16 sm:py-24">
          <Reveal>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Kicker>Backstage pass</Kicker>
                <h3 className="font-heading text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9]">
                  Snap<span className="text-[color:var(--accent)]">shots</span>
                </h3>
              </div>
              <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
                From the audition room to the Tathva stage.
              </p>
            </div>
          </Reveal>

          <ul className="mx-auto grid max-w-5xl grid-cols-2 items-start gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-7">
            {SNAPS.map((snap, index) => (
              <li
                key={snap.id}
                className={`transition-transform duration-500 hover:-translate-y-1.5 ${snap.tilt} ${snap.offset}`}
              >
                <Reveal delay={index * 0.07} y={18}>
                  <figure className="bg-[#f4eaff] p-2 pb-3 text-[#12061c] shadow-[0_22px_44px_-14px_rgba(0,0,0,0.75)]">
                    <ReportPhoto
                      id={snap.id}
                      alt={snap.alt}
                      sizes="(max-width: 640px) 45vw, 240px"
                    />
                    <figcaption className="mt-2.5 flex items-center justify-between font-heading text-lg uppercase leading-none tracking-wide">
                      {snap.caption}
                      <span className="font-mono text-[9px] tracking-[0.2em] opacity-50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Line-up ───────────────────────────────────────────────── */}
        <div className="border-t border-[color:var(--rule)] py-16 sm:py-24">
          <Reveal>
            <Kicker>Executive Committee · 2025–26</Kicker>
            <h3 className="font-heading text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9]">
              The <span className="text-[color:var(--accent)]">line-up</span>
            </h3>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--muted)]">
              Under the guidance of <span className="text-[color:var(--ink)]">Dr. Pradeep</span> · Faculty Coordinator
            </p>
          </Reveal>

          <div className="mt-14 space-y-8 sm:space-y-12">
            {LINEUP.map(({ tier, people }, tierIndex) => (
              <Reveal key={tier} delay={tierIndex * 0.06}>
                <ul className="flex flex-wrap items-end gap-x-5 gap-y-5 sm:gap-x-8">
                  {people.map(([role, name], index) => (
                    <li key={`${role}-${name}`} className="flex items-end gap-5 sm:gap-8">
                      <div>
                        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.26em] text-[color:var(--accent)]">
                          {role}
                        </p>
                        <p
                          className={`font-heading uppercase transition-colors duration-300 hover:text-[color:var(--accent)] ${TIER_TYPE[tier]}`}
                        >
                          {name}
                        </p>
                      </div>
                      {index < people.length - 1 && (
                        <span aria-hidden="true" className="pb-[0.15em] text-[color:var(--accent)]">
                          ✦
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Key achievement ───────────────────────────────────────── */}
        <div className="border-t border-[color:var(--rule)] py-16 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <Reveal>
              <Speaker />
            </Reveal>
            <Reveal delay={0.08}>
              <Kicker>Key achievement</Kicker>
              <h3 className="font-heading text-[clamp(3.5rem,9vw,8rem)] uppercase leading-[0.85]">
                Turned <span className="text-[color:var(--accent)]">up.</span>
              </h3>
              <p className="mt-8 max-w-2xl font-serif text-xl leading-[1.7] text-[color:var(--ink)] sm:text-2xl">
                The GECW Alumni Association supported Decibel by sponsoring a new speaker and microphone,
                strengthening the band’s technical capabilities and enhancing the quality of rehearsals and
                performances.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Encore ────────────────────────────────────────────────── */}
        <div className="border-t border-[color:var(--rule)] py-16 sm:py-28">
          <Reveal>
            <Kicker>Conclusion</Kicker>
            <h3
              className={`${styles.outline} font-heading text-[clamp(5rem,22vw,20rem)] uppercase leading-[0.8] tracking-[-0.01em]`}
            >
              Encore
            </h3>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <Reveal delay={0.06}>
              <p className="border-l border-[color:var(--accent)] pl-5 font-serif text-lg leading-[1.8] text-[color:var(--ink)] sm:pl-7 sm:text-xl">
                The academic year 2025–26 marked an eventful and melodious journey for Decibel, reflecting musical
                excellence, inclusivity, teamwork, and a commitment to enriching campus culture. Through
                performances, talent development, and meaningful collaborations, the band strengthened its presence
                both within and beyond GECW. Looking ahead, Decibel aims to reach wider audiences, nurture more
                talent, and continue growing as a powerful platform for creativity, unity, and musical expression.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                Acknowledgement · Liner notes
              </h4>
              <p className="text-[13px] leading-[1.9] text-[color:var(--muted)]">
                Decibel sincerely acknowledges the support of the Principal, Faculty Coordinator, College Union,
                supporting bodies, Executive Committee, club members, volunteers, performers, faculty, non-teaching
                staff, technical assistants, students, alumni, friends, and families. Their guidance, resources,
                encouragement, and appreciation played an essential role in making the academic year successful.
              </p>
            </Reveal>
          </div>

          <div
            aria-hidden="true"
            className="mt-16 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.34em] text-[color:var(--muted)]"
          >
            <span className="h-px flex-1 bg-[color:var(--rule)]" />
            End of Side B
            <span className="h-px flex-1 bg-[color:var(--rule)]" />
          </div>
        </div>
      </Container>
    </ReportSection>
  );
}
