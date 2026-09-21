"use client";

import {
  Container,
  Kicker,
  PhotoMasonry,
  Rail,
  ReportSection,
  Reveal,
  type ReportPhotoItem,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#101113",
  ink: "#f2efe9",
  accent: "#ff6a1a",
  muted: "#f2efe9b0",
  rule: "#f2efe92b",
};

const INTRO =
  "At Government Engineering College Wayanad, EXORQUE, the Automotive Club of the Mechanical Engineering Department, provides students with opportunities to explore the world of automobiles beyond the classroom. Through exhibitions, technical workshops, hands-on training and knowledge-based competitions, the club encourages students to connect theoretical concepts with practical experience. From understanding engine mechanisms and modern manufacturing technologies to testing their knowledge through competitions, EXORQUE continues to create a platform for technical learning, innovation and active student participation.";

const CHAPTERS: {
  title: string;
  date: string;
  body: string;
  photos: ReportPhotoItem[];
}[] = [
  {
    title: "Exhibition – All Kerala Technology Fair",
    date: "5–6 Jan 2024",
    body: "EXORQUE participated in the Science Fair held on January 5 and 6, 2024, at Government Technical High School, Sulthanbathery. The exhibition showcased automotive technology, sustainability and engineering principles through various displays and demonstrations. A working model of an internal combustion engine helped visitors understand components such as pistons, crankshafts and camshafts. Interactive sessions also gave students an opportunity to assemble and disassemble small engine parts. The exhibition received positive feedback and encouraged students to explore automotive engineering and mechanics.",
    photos: [
      { id: "exorque-engine", alt: "Working model of an internal combustion engine on display" },
      { id: "exorque-fair-group", alt: "EXORQUE team and visitors gathered at the exhibition" },
      { id: "exorque-fair-demo", alt: "Students examining an engine part at the exhibition" },
    ],
  },
  {
    title: "3-D Printing Workshop",
    date: "6 Aug 2025",
    body: "A one-day 3D Printing Workshop was organized on August 6, 2025, at ASAP Hall. The workshop introduced students to additive manufacturing, different 3D printing technologies, materials and real-world applications. Participants learned the complete process from CAD modelling and slicing to actual printing and post-processing. Using SolidWorks and Creality Slicer, students created simple models and experienced the complete workflow through a live demonstration. With 38 students participating, the workshop provided an engaging blend of theory and hands-on learning.",
    photos: [
      { id: "exorque-3d-1", alt: "Students listening to the 3D printing workshop session" },
      { id: "exorque-3d-2", alt: "Trainer explaining the 3D printing workflow at a display screen" },
      { id: "exorque-3d-group", alt: "Participants of the 3D printing workshop seated in the hall" },
    ],
  },
  {
    title: "Engine Overhauling Workshop",
    date: "11 Oct 2025",
    body: "In association with the SAE GECW Student Chapter, EXORQUE conducted a Honda Engine Overhauling Workshop on October 11, 2025, for SAE registered students. The workshop offered practical exposure to the construction and working of the Honda Splendor engine. After a theory session, participants worked in groups to dismantle and reassemble engines under the guidance of student trainers. A quiz on engine components and automobile engineering was also conducted. The workshop strengthened students’ practical knowledge and promoted interdisciplinary learning between Mechanical and Electronics students.",
    photos: [
      { id: "exorque-overhaul-1", alt: "Students dismantling an engine during the overhauling workshop" },
      { id: "exorque-overhaul-2", alt: "Trainer presenting to participants at a laptop" },
      { id: "exorque-overhaul-3", alt: "Groups working on engine parts at the overhauling workshop" },
      { id: "exorque-overhaul-4", alt: "Participants of the overhauling workshop posing together" },
      { id: "exorque-overhaul-5", alt: "Workshop trainers and participants in the workshop hall" },
    ],
  },
  {
    title: "Quiz Competition",
    date: "Knowledge-based competition",
    body: "EXORQUE also conducted a quiz competition focusing on Mechanical Science, Technology, Automobiles and Current Affairs. Students from different departments participated enthusiastically, making the event both informative and competitive. The quiz encouraged students to test their knowledge, improve their awareness and learn beyond the classroom. The active participation and positive response highlighted the club’s efforts to promote technical learning through engaging activities.",
    photos: [
      { id: "exorque-quiz-1", alt: "Quiz participants gathered around the quiz master" },
      { id: "exorque-quiz-2", alt: "Students assembled outdoors for the quiz competition" },
      { id: "exorque-quiz-3", alt: "Crowd of students taking part in the quiz" },
    ],
  },
];

export function Exorque() {
  return (
    <ReportSection id="sec-exorque" tone={TONE}>
      <Container>
        <Rail left="Automotive Club · Mechanical Engineering" right="Clubs & Activities / 08" />

        <div className="py-16 sm:py-24">
          <Reveal>
            <Kicker>Driving curiosity through automotive learning</Kicker>
            <h2 className="font-heading text-[clamp(5rem,17vw,16rem)] uppercase leading-[0.8] tracking-[-0.01em]">
              Exor<span className="text-[color:var(--accent)]">que</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-3xl">
            <p className="text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-lg">{INTRO}</p>
          </Reveal>
        </div>

        {CHAPTERS.map((chapter, index) => (
          <article
            key={chapter.title}
            className="grid gap-10 border-t border-[color:var(--rule)] py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-20"
          >
            <Reveal className="lg:sticky lg:top-16 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                {String(index + 1).padStart(2, "0")} · {chapter.date}
              </p>
              <h3 className="mt-4 font-heading text-4xl uppercase leading-[0.95] sm:text-5xl">{chapter.title}</h3>
              <p className="mt-6 text-[15px] leading-[1.85] text-[color:var(--muted)]">{chapter.body}</p>
            </Reveal>
            <PhotoMasonry
              photos={chapter.photos}
              className="columns-2 gap-3 lg:gap-4"
            />
          </article>
        ))}
      </Container>
    </ReportSection>
  );
}
