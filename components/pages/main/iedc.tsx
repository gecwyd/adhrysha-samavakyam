"use client";

import {
  Container,
  Kicker,
  PhotoMasonry,
  Rail,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#f8f3e7",
  ink: "#1c1710",
  accent: "#b86a00",
  muted: "#1c1710ab",
  rule: "#1c171027",
};

const INTRO =
  "The Innovation and Entrepreneurship Development Centre (IEDC) of Government Engineering College Wayanad works towards nurturing innovation, entrepreneurial thinking, problem-solving and teamwork among students. It provides a platform for students to develop ideas, present them and connect with the wider innovation and entrepreneurship ecosystem.";

const EVENTS = [
  {
    label: "Idea Pitching Competition",
    date: "21 March 2025 · CSE Seminar Hall",
    text: "As part of its activities, an Idea Pitching Competition was organised at the college level. The competition was open to first- and second-year students, who participated in teams of 2–4 members and presented their innovative ideas. Two winning teams were selected to progress to the zonal and state-level stages, with a cash prize announced up to ₹2 lakhs.",
  },
  {
    label: "UDYAMA 1.0 Pre-Conclave",
    date: "Pre-Conclave session",
    text: "The IEDC also provided students with exposure to entrepreneurship through the UDYAMA 1.0 Pre-Conclave, featuring a session titled “From Foundational Research to Impactful Entrepreneurship.” The session focused on connecting research with entrepreneurship and featured Sooraj K Babu, Scientist, Digital Health, Dr Moopen’s iNEST.",
  },
];

const CLOSING =
  "Through these initiatives, students gained opportunities to improve their communication, presentation, teamwork and entrepreneurial awareness. The activities also contributed to creating a stronger culture of innovation and entrepreneurship within the campus.";

export function Iedc() {
  return (
    <ReportSection id="sec-iedc" tone={TONE}>
      <Container>
        <Rail left="Innovation & Entrepreneurship" right="Clubs & Activities / 13" />

        <div className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-24">
          <Reveal>
            <Kicker>Nurturing ideas into ventures</Kicker>
            <h2 className="font-heading text-[clamp(8rem,26vw,22rem)] uppercase leading-[0.72] tracking-[-0.02em]">
              IE<span className="text-[color:var(--accent)]">DC</span>
            </h2>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Innovation and Entrepreneurship Development Centre
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif text-xl leading-[1.7] text-[color:var(--muted)] sm:text-2xl">{INTRO}</p>
          </Reveal>
        </div>

        <div className="grid border-y border-[color:var(--rule)] md:grid-cols-2 md:divide-x md:divide-[color:var(--rule)]">
          {EVENTS.map((event, index) => (
            <Reveal key={event.label} delay={index * 0.08} className="p-6 sm:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
                {String(index + 1).padStart(2, "0")} · {event.date}
              </p>
              <h3 className="mt-4 font-heading text-4xl uppercase leading-none sm:text-5xl">{event.label}</h3>
              <p className="mt-5 text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">{event.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="py-14 sm:py-20">
          <PhotoMasonry
            className="columns-1 gap-3 sm:columns-3 lg:gap-4"
            photos={[
              { id: "iedc-1", alt: "Students listening to a presentation in the seminar hall" },
              { id: "iedc-2", alt: "A team pitching its idea at the Idea Pitching Competition" },
              { id: "iedc-3", alt: "Audience at the UDYAMA pre-conclave session" },
            ]}
          />
        </div>

        <Reveal className="mx-auto max-w-3xl border-t border-[color:var(--rule)] pb-20 pt-12 text-center sm:pb-28">
          <p className="font-serif text-xl italic leading-[1.7] sm:text-2xl">{CLOSING}</p>
        </Reveal>
      </Container>
    </ReportSection>
  );
}
