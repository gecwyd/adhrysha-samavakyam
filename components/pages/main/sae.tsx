"use client";

import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import { REPORT_PHOTOS } from "@/lib/report-photos";
import {
  Container,
  Kicker,
  PhotoMasonry,
  Rail,
  ReportSection,
  Reveal,
  Timeline,
  type ReportTone,
  type TimelineItem,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#edf1f7",
  ink: "#0f1f3a",
  accent: "#1f4c96",
  muted: "#0f1f3aaa",
  rule: "#0f1f3a26",
};

const INTRO =
  "The SAE Students Chapter of Government Engineering College Wayanad conducted a series of technical, academic, community-oriented and student engagement activities during the academic year 2025–26. The chapter aimed to enhance students’ technical knowledge, practical skills, creativity, teamwork, communication and professional development.";

const EVENTS: TimelineItem[] = [
  {
    date: "3–5 Feb 2026",
    title: "Inauguration & ANSYS Workshop",
    body: "The chapter was officially inaugurated from 3–5 February 2026, followed by a three-day ANSYS Hands-On Workshop led by Dr. P. A. Abdul Samad, Professor, Government Engineering College, Palakkad. The workshop introduced students to engineering simulation and provided practical training in ANSYS.",
  },
  {
    date: "13 Mar 2026",
    title: "“Find a Solution” Challenge",
    body: "The chapter organized the “Find a Solution” Challenge for first-year SAE members. The event encouraged students to approach engineering problems creatively and develop innovative solutions through teamwork and brainstorming.",
  },
  {
    date: "25 Mar 2026",
    title: "Exhibition at Valliyoorkavu Temple",
    body: "The chapter also participated in an exhibition at Valliyoorkavu Temple, where students displayed engineering projects and working models to the public. This provided valuable experience in explaining technical concepts and interacting with a diverse audience.",
  },
  {
    date: "27 Mar 2026",
    title: "Farewell 2026 – Drive Out",
    body: "The academic year concluded with “Farewell 2026 – Drive Out”, organized in association with the Exorque Club. The programme brought together juniors and seniors through games, cultural performances, experience sharing and informal interactions.",
  },
];

const CLOSING =
  "Together, these activities strengthened students’ technical abilities, problem-solving skills, communication, leadership and teamwork, while creating opportunities for innovation, professional development and community engagement.";

export function Sae() {
  const { width, height } = REPORT_PHOTOS["sae-logo"];

  return (
    <ReportSection id="sec-sae" tone={TONE}>
      <Container>
        <Rail left="SAE Students Chapter" right="Clubs & Activities / 09" />

        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal>
            <Kicker>Academic Year 2025–26</Kicker>
            <h2 className="font-heading text-[clamp(4rem,11vw,10rem)] uppercase leading-[0.85] tracking-[-0.01em]">
              Society of
              <span className="block text-[color:var(--accent)]">Automotive Engineers</span>
            </h2>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-lg">{INTRO}</p>
          </Reveal>
          <Reveal delay={0.1} className="bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,31,58,0.5)] sm:p-12">
            <Image
              src={resolveAsset("sae-logo.webp")}
              alt="SAE GECW – Society of Automotive Engineers logo"
              width={width}
              height={height}
              priority
              className="h-auto w-full"
            />
          </Reveal>
        </div>

        <Timeline items={EVENTS} />

        <div className="py-14 sm:py-20">
          <PhotoMasonry
            className="columns-2 gap-3 md:columns-4 lg:gap-4"
            photos={[
              { id: "sae-1", alt: "SAE members and guests seated together under string lights" },
              { id: "sae-2", alt: "Large group photo of SAE chapter members in the seminar hall" },
              { id: "sae-3", alt: "SAE members gathered at the farewell event" },
              { id: "sae-4", alt: "A certificate being handed over during an SAE session" },
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
