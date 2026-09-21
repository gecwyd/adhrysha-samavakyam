"use client";

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
  paper: "#f6f1e6",
  ink: "#17282a",
  accent: "#dd5a2a",
  muted: "#17282aac",
  rule: "#17282a26",
};

const ACTIVITIES = [
  "Orientation camps that help first-years settle in, make friends, and understand college life",
  "Remedial classes in subjects like Analog Circuits and Python, run by faculty and senior students before exams",
  "Skill workshops on things your syllabus doesn’t always cover, such as UX design, functional programming, product design",
  "Industrial visits that show you how what you’re studying actually works in the real world",
  "Idea pitching and project expos where you can showcase what you’re building",
  "Placement and academic awareness sessions to help you plan ahead",
  "A chance to represent your college at state-level meets and conventions",
];

export function Iste() {
  return (
    <ReportSection id="sec-iste" tone={TONE}>
      <Container>
        <Rail left="ISTE Student Chapter · KE 091" right="Clubs & Activities / 07" />

        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Kicker>Beyond the syllabus</Kicker>
            <h2 className="font-heading text-[clamp(8rem,26vw,22rem)] uppercase leading-[0.72] tracking-[-0.02em]">
              ISTE
            </h2>
            <p className="mt-8 max-w-md font-serif text-2xl italic leading-snug text-[color:var(--accent)] sm:text-3xl">
              If you’ve heard “ISTE” mentioned around campus but aren’t quite sure what it is, here’s your answer.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="self-end text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-lg">
            <p>
              The Indian Society for Technical Education (ISTE) Student Chapter at GEC Wayanad (KE 091) is a
              student-run platform that exists for one simple reason: to help you grow beyond the syllabus.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-12 border-t border-[color:var(--rule)] py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-16 lg:self-start">
            <h3 className="font-heading text-5xl uppercase leading-[0.9] sm:text-6xl">
              What ISTE
              <span className="block text-[color:var(--accent)]">actually does</span>
            </h3>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[color:var(--muted)]">
              ISTE isn’t a one-off event or a single workshop; it’s a year-round chapter that organizes a mix of
              activities designed to build real, usable skills alongside your regular classes:
            </p>
          </Reveal>
          <ol className="border-t border-[color:var(--rule)]">
            {ACTIVITIES.map((activity, index) => (
              <Reveal key={activity} y={12} delay={index * 0.03}>
                <li className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[color:var(--rule)] py-5 sm:grid-cols-[4rem_1fr]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-[1.65] sm:text-lg">{activity}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 pb-16 sm:grid-cols-2 sm:gap-6 sm:pb-24">
          <Reveal>
            <ReportPhoto id="iste-1" alt="Students attending an ISTE session in a lecture hall" ratio="4 / 3" sizes="(max-width: 640px) 100vw, 50vw" />
          </Reveal>
          <Reveal delay={0.1}>
            <ReportPhoto id="iste-2" alt="Students working at computers during an ISTE workshop" ratio="4 / 3" sizes="(max-width: 640px) 100vw, 50vw" />
          </Reveal>
        </div>

        <div className="grid gap-12 border-t border-[color:var(--rule)] py-16 md:grid-cols-3 md:gap-10 md:py-24">
          {[
            [
              "Why it’s worth joining",
              "Being part of ISTE isn’t just a line on your resume. It’s where you pick up the things engineering courses don’t always teach directly: how to work in a team, speak in front of a crowd, pitch an idea, or lead a project. Members get access to hands-on sessions, guidance from alumni and faculty advisors, and a network of peers across departments and even other colleges. It’s also a place to lead, not just attend. Every year, students step into roles like Forum Head, Design Lead, Media Lead, or Documentation Lead, running real events from planning to execution. If you enjoy organizing things, designing posters, writing, coordinating logistics, or just want to build confidence, there’s a role for you.",
            ],
            [
              "Who can join",
              "Anyone. ISTE welcomes students from all departments and all years. Membership drives are held at the start of the year, and interested students can also apply for department forum or execom positions when calls are announced.",
            ],
            [
              "Get involved",
              "Keep an eye out for the next membership drive and follow @istegecw for updates on upcoming workshops, competitions, and events. ISTE is what you make of it: come for a single workshop, or stay to help run the chapter.",
            ],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.08}>
              <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">{title}</h4>
              <p className="text-[15px] leading-[1.85] text-[color:var(--muted)]">{text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </ReportSection>
  );
}
