"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#12061c",
  ink: "#f4eaff",
  accent: "#d45cff",
  muted: "#f4eaffb3",
  rule: "#f4eaff26",
};

const EVENTS = [
  {
    iso: "2025-09-14",
    date: "14 Sep 2025",
    title: "SPARK 3.0",
    body: "Performed at the GBOT First Year Orientation Programme, welcoming newcomers with an energetic musical performance.",
  },
  {
    iso: "2025-10-07",
    date: "7 Oct 2025",
    title: "Band Selection 2025",
    body: "Conducted auditions for first-year students in vocals and instruments, identifying and welcoming new musical talent into Decibel.",
  },
  {
    iso: "2025-10-24",
    date: "24 Oct 2025",
    title: "Tathva 2025, NIT Calicut",
    body: "Performed at the prestigious techno-management fest of NIT Calicut, gaining valuable exposure and marking a significant milestone for the band.",
  },
  {
    iso: "2025-12-19",
    date: "19 Dec 2025",
    title: "AKCSSE IEEE 2025",
    body: "Delivered a musical performance for students, delegates, and IEEE members, adding vibrancy to the event.",
  },
  {
    iso: "2026-01-23",
    date: "23 Jan 2026",
    title: "National Voters Day",
    body: "Performed at the District Level Inauguration held at GECW in the presence of the Wayanad District Collector and distinguished guests.",
  },
  {
    iso: "2026-03-24",
    date: "24 Mar 2026",
    title: "ORMA 2026 – NSS Farewell",
    body: "Presented a heartfelt performance for the farewell of outgoing NSS volunteers.",
  },
  {
    iso: "2026-03-28",
    date: "28 Mar 2026",
    title: "One Last Song",
    body: "Decibel Farewell 2026: a gathering for outgoing band members, celebrating their contributions through performances, speeches, memories, and gratitude.",
  },
];

// Where each event's note sits on the staff, in staff steps from the top line (0) to the bottom line (4).
const NOTE_STEPS = [3, 2, 2.5, 1.5, 1, 2, 0.5];

const MONTH_MARKS: [label: string, iso: string][] = [
  ["Sep", "2025-09-14"],
  ["Oct", "2025-10-01"],
  ["Nov", "2025-11-01"],
  ["Dec", "2025-12-01"],
  ["Jan", "2026-01-01"],
  ["Feb", "2026-02-01"],
  ["Mar", "2026-03-01"],
];

const SEASON_START = Date.parse(EVENTS[0].iso);
const SEASON_END = Date.parse(EVENTS[EVENTS.length - 1].iso);
const seasonPos = (iso: string) => ((Date.parse(iso) - SEASON_START) / (SEASON_END - SEASON_START)) * 100;

const COMMITTEE = [
  ["Faculty Coordinator", "Dr. Pradeep"],
  ["President", "Amitha Joy"],
  ["Vice President", "Ashwinjith"],
  ["Secretary", "Muhammed Sinan M."],
  ["Joint Secretary", "Delvin Jaison"],
  ["Treasurer", "Pranavathmika"],
  ["Program Coordinator", "Basim Hassan"],
  ["Media & Publicity", "Abhinand, Athun"],
  ["Technical", "Sanjay"],
];

const SNAPS = [
  { id: "decibel-new-members", alt: "Decibel new member line-up poster", caption: "New members", position: "top" },
  { id: "decibel-tathva", alt: "Decibel performing on stage at Tathva 2025", caption: "Tathva 2025", position: "center" },
  { id: "decibel-akcssc", alt: "Decibel members seated together at AKCSSC", caption: "AKCSSC", position: "center" },
  { id: "decibel-voters-day", alt: "Students singing at the National Voters Day event", caption: "Voters Day", position: "center" },
] as const;

/** Five staff lines. Spacing is set by --gap so notes can be positioned in staff steps. */
function Staff({
  className = "",
  decorative = false,
  children,
}: {
  className?: string;
  decorative?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      aria-hidden={decorative ? true : undefined}
      className={`relative h-[calc(var(--gap)*4+1px)] [--gap:12px] [--staff:rgba(244,234,255,0.32)] sm:[--gap:16px] bg-[repeating-linear-gradient(to_bottom,var(--staff)_0,var(--staff)_1px,transparent_1px,transparent_var(--gap))] ${className}`}
    >
      {children}
    </div>
  );
}

function SeasonStaff() {
  return (
    <div className="mt-24 sm:mt-28">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--ink)]/85">
            The season, Sep 2025 – Mar 2026
          </p>
          <p className="text-sm text-[color:var(--muted)]">Each note is an event. Select one to jump to it.</p>
        </div>

        <Staff>
          <div className="absolute inset-x-3 inset-y-0">
            {EVENTS.map((event, index) => {
              const step = NOTE_STEPS[index];
              const stemUp = step >= 2;
              return (
                <a
                  key={event.iso}
                  href={`#decibel-event-${index}`}
                  title={`${event.title}, ${event.date}`}
                  aria-label={`${event.title}, ${event.date}`}
                  className="group absolute h-[calc(var(--gap)*0.9)] w-[calc(var(--gap)*1.2)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[var(--accent)] outline-none transition-transform duration-300 before:absolute before:-inset-3 before:content-[''] hover:scale-125 focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
                  style={{ left: `${seasonPos(event.iso)}%`, top: `calc(var(--gap) * ${step})` } as CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute w-px bg-[color:var(--ink)]/75 ${
                      stemUp ? "bottom-1/2 right-0" : "left-0 top-1/2"
                    } h-[calc(var(--gap)*3)]`}
                  />
                </a>
              );
            })}
          </div>
        </Staff>

        <div aria-hidden="true" className="relative mx-3 mt-8 h-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
          {MONTH_MARKS.map(([label, iso]) => (
            <span
              key={label}
              className="absolute top-0 border-l border-[color:var(--rule)] pl-1.5 pt-0.5 leading-none"
              style={{ left: `${seasonPos(iso)}%`, height: "1.25rem" }}
            >
              {label}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export function Decibel() {
  return (
    <ReportSection id="sec-decibel" tone={TONE}>
      {/* One quiet wash of colour behind the hero; nothing moves. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70rem] bg-[radial-gradient(ellipse_60%_40%_at_85%_10%,rgba(212,92,255,0.14),transparent_70%)]"
      />

      <Container className="relative">
        <Rail left="Music Club" right="Clubs & Activities / 01" />

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 items-start gap-14 pb-4 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <Kicker>Music Club · 2025–26</Kicker>
            <h2 className="font-heading text-[clamp(5rem,15vw,15rem)] uppercase leading-[0.82] tracking-[-0.01em]">
              Deci<span className="text-[color:var(--accent)]">bel</span>
            </h2>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--ink)]/85">
              Music Band · GECW
            </p>
            <p className="mt-10 max-w-xl text-[15px] leading-[1.85] text-[color:var(--ink)]/85 sm:text-base">
              Decibel, the Music Band of Government Engineering College Wayanad, functions under the Music Club as a
              vibrant platform for students passionate about music and artistic expression. Throughout 2025–26, the
              club contributed to campus culture through performances, talent selection, collaborations, and
              participation in prominent events. Beyond entertainment, Decibel promoted creativity, confidence,
              teamwork, leadership, and a strong sense of belonging among students.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="w-full max-w-sm lg:ml-auto lg:max-w-md">
            <ReportPhoto
              id="decibel-spark"
              alt="Decibel Music Band poster for Spark 3.0 at the CSE Seminar Hall"
              caption="Spark 3.0 · 14 Sep 2025 · CSE Seminar Hall"
              priority
              sizes="(max-width: 1024px) 90vw, 34vw"
            />
          </Reveal>
        </div>

        <SeasonStaff />

        {/* ── Events ────────────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-[color:var(--rule)] py-16 sm:mt-28 sm:py-24 lg:grid-cols-[0.5fr_1.5fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-16 lg:self-start">
            <Kicker>Major activities &amp; events</Kicker>
            <h3 className="font-heading text-[clamp(3.25rem,8vw,7rem)] uppercase leading-[0.86]">
              The <span className="text-[color:var(--accent)]">season</span>
            </h3>
          </Reveal>

          <ol className="border-t border-[color:var(--rule)]">
            {EVENTS.map((event, index) => (
              <li
                key={event.iso}
                id={`decibel-event-${index}`}
                className="scroll-mt-24 border-b border-[color:var(--rule)]"
              >
                <Reveal y={12}>
                  <div className="grid grid-cols-[2.75rem_1fr] gap-x-3 gap-y-3 py-7 sm:grid-cols-[3.5rem_9.5rem_1fr] sm:gap-x-6 sm:py-9">
                    <span className="pt-0.5 font-mono text-xs tracking-[0.16em] text-[color:var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      {event.date}
                    </p>
                    <div className="col-start-2 sm:col-start-3">
                      <h4
                        className={`font-heading text-3xl uppercase leading-none tracking-wide sm:text-4xl ${
                          index === EVENTS.length - 1 ? "text-[color:var(--accent)]" : ""
                        }`}
                      >
                        {event.title}
                      </h4>
                      <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-[color:var(--muted)] sm:text-base">
                        {event.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Snapshots ─────────────────────────────────────────────── */}
        <div className="border-t border-[color:var(--rule)] py-16 sm:py-24">
          <Reveal>
            <Kicker>Gallery</Kicker>
            <h3 className="mb-12 font-heading text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9]">
              Snap<span className="text-[color:var(--accent)]">shots</span>
            </h3>
          </Reveal>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
            {SNAPS.map((snap, index) => (
              <li key={snap.id}>
                <Reveal delay={index * 0.06} y={16}>
                  <ReportPhoto
                    id={snap.id}
                    alt={snap.alt}
                    caption={snap.caption}
                    ratio="4 / 5"
                    position={snap.position}
                    sizes="(max-width: 640px) 45vw, 22vw"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Executive committee ───────────────────────────────────── */}
        <div className="border-t border-[color:var(--rule)] py-16 sm:py-24">
          <Reveal>
            <Kicker>Executive Committee · 2025–26</Kicker>
            <h3 className="mb-12 font-heading text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9]">
              The <span className="text-[color:var(--accent)]">band</span>
            </h3>
          </Reveal>

          <Reveal delay={0.06}>
            <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {COMMITTEE.map(([role, name]) => (
                <div key={role} className="border-t border-[color:var(--rule)] py-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]">{role}</dt>
                  <dd className="mt-2 font-heading text-3xl uppercase leading-none tracking-wide sm:text-4xl">{name}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ── Key achievement ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 border-t border-[color:var(--rule)] py-16 sm:py-24 lg:grid-cols-[0.5fr_1.5fr] lg:gap-20">
          <Reveal>
            <Kicker>Key achievement</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-3xl font-serif text-2xl leading-[1.55] text-[color:var(--ink)] sm:text-[1.9rem]">
              The GECW Alumni Association supported Decibel by sponsoring a new speaker and microphone, strengthening
              the band’s technical capabilities and enhancing the quality of rehearsals and performances.
            </p>
          </Reveal>
        </div>

        {/* ── Conclusion & acknowledgement ──────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 border-t border-[color:var(--rule)] py-16 sm:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.26em] text-[color:var(--accent)]">
              Conclusion
            </h4>
            <p className="font-serif text-lg leading-[1.8] text-[color:var(--ink)]/90 sm:text-xl">
              The academic year 2025–26 marked an eventful and melodious journey for Decibel, reflecting musical
              excellence, inclusivity, teamwork, and a commitment to enriching campus culture. Through performances,
              talent development, and meaningful collaborations, the band strengthened its presence both within and
              beyond GECW. Looking ahead, Decibel aims to reach wider audiences, nurture more talent, and continue
              growing as a powerful platform for creativity, unity, and musical expression.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.26em] text-[color:var(--accent)]">
              Acknowledgement
            </h4>
            <p className="text-sm leading-[1.9] text-[color:var(--muted)]">
              Decibel sincerely acknowledges the support of the Principal, Faculty Coordinator, College Union,
              supporting bodies, Executive Committee, club members, volunteers, performers, faculty, non-teaching
              staff, technical assistants, students, alumni, friends, and families. Their guidance, resources,
              encouragement, and appreciation played an essential role in making the academic year successful.
            </p>
          </Reveal>
        </div>

        {/* Closing double bar line. */}
        <div className="pb-16 sm:pb-24">
          <Staff decorative>
            <span className="absolute inset-y-0 right-3 w-px bg-[color:var(--ink)]/80" />
            <span className="absolute inset-y-0 right-0 w-[3px] bg-[color:var(--ink)]/80" />
          </Staff>
        </div>
      </Container>
    </ReportSection>
  );
}
