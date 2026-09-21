"use client";

import {
  Container,
  Kicker,
  Rail,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#0a0a0a",
  ink: "#f1f1ee",
  accent: "#ffffff",
  muted: "#f1f1eeb0",
  rule: "#f1f1ee29",
};

const FRAMES = [
  {
    label: "Screenings",
    text: "Monthly movie screenings were conducted based on student voting, followed by discussions on cinematography and film themes.",
  },
  {
    label: "Sessions",
    text: "The club also organized technical sessions on video editing, camera handling, lighting and sound design.",
  },
  {
    label: "Contests",
    text: "Students were encouraged to participate in Reel and short-content competitions, movie recreation challenges, scriptwriting and storytelling competitions.",
  },
  {
    label: "Photography",
    text: "Photography walks and theme-based contests provided opportunities for students interested in visual arts to improve their photography and composition skills.",
  },
  {
    label: "Community",
    text: "The club maintained a student community where senior members and peers shared tutorials, provided feedback, helped solve software-related issues and guided students in using filmmaking equipment.",
  },
];

// Sprocket holes along the top and bottom of the film strip.
const PERFORATION =
  "repeating-linear-gradient(90deg, transparent 0 14px, rgba(241,241,238,0.9) 14px 30px, transparent 30px 44px)";

function FilmEdge() {
  return (
    <div aria-hidden="true" className="h-3 w-full opacity-70" style={{ backgroundImage: PERFORATION, backgroundSize: "44px 12px", backgroundRepeat: "repeat-x" }} />
  );
}

export function MonochromeFilmClub() {
  return (
    <ReportSection id="sec-monochrome" tone={TONE}>
      <Container>
        <Rail left="Film & Creative Arts Club" right="Clubs & Activities / 04" />

        <div className="py-16 sm:py-24">
          <Reveal>
            <Kicker>Academic Year 2025–26</Kicker>
            <h2 className="font-heading text-[clamp(4.5rem,15vw,14rem)] uppercase leading-[0.82] tracking-[0.01em]">
              Mono
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #f1f1ee" }}>
                chrome
              </span>
            </h2>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted)]">
              Film &amp; Creative Arts Club · GECW
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <p className="font-serif text-2xl leading-[1.55] sm:text-3xl">
              Monochrome, the official Film and Creative Arts Club of Government Engineering College Wayanad,
              provides a creative platform for students to explore cinema, photography, filmmaking and digital
              storytelling.
            </p>
            <p className="text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
              The club aims to bring together technical skills and artistic expression while encouraging students to
              discover and develop their creative talents.
            </p>
          </Reveal>
        </div>

        <div className="border-y border-[color:var(--rule)] bg-[#111]">
          <FilmEdge />
          <div className="grid divide-y divide-[color:var(--rule)] md:grid-cols-5 md:divide-x md:divide-y-0">
            {FRAMES.map((frame, index) => (
              <Reveal key={frame.label} delay={index * 0.07} className="p-6 sm:p-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  Frame {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-heading text-3xl uppercase leading-none sm:text-4xl">{frame.label}</h3>
                <p className="mt-4 text-sm leading-[1.75] text-[color:var(--muted)]">{frame.text}</p>
              </Reveal>
            ))}
          </div>
          <FilmEdge />
        </div>

        <div className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[15px] leading-[1.9] text-[color:var(--muted)] sm:text-base">
              During the academic year 2025–26, Monochrome engaged students through a variety of creative and
              technical activities. Through these activities, Monochrome contributed to the development of technical
              skills, teamwork, leadership and communication while providing students with a creative space alongside
              their academic life.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif text-xl italic leading-[1.7] sm:text-2xl">
              Monochrome continues to work towards creating a vibrant cultural atmosphere on campus and looks forward
              to expanding its activities through inter-college events and guest lectures.
            </p>
          </Reveal>
        </div>
      </Container>
    </ReportSection>
  );
}
