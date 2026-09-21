"use client";

import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
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
  paper: "#0d1420",
  ink: "#f4efe8",
  accent: "#ffb26b",
  muted: "#f4efe8b3",
  rule: "#ffb26b2e",
};

const BEFORE_QUOTE = [
  "With the hum of propellers and the excitement of watching technology take flight, AERONAUTS, the Drone Club of Government Engineering College, Wayanad, brings together students with a passion for drones, aviation, and innovation.",
  "Drones have moved far beyond being flying gadgets. Today, they are transforming industries through applications in photography, agriculture, surveying, disaster management, defence, and many other fields. AERONAUTS provides students with a platform to explore this rapidly evolving technology and understand the ideas that make these systems possible.",
  "Through workshops, technical sessions, demonstrations, hands-on activities, and projects, the club encourages students to move beyond theoretical learning and experience technology in action. From understanding drone components and flight principles to exploring electronics, control systems, simulation, and design, every activity opens the door to something new.",
];

const AFTER_QUOTE = [
  "This year, the team is once again gearing up to participate in the competition, carrying forward the experience gained from the previous edition while aiming to push their ideas further. With every challenge comes an opportunity to learn, improve, and build something better.",
  "But AERONAUTS is not only about technology. It is about curiosity, creativity, collaboration, and the courage to experiment. Students from different interests and backgrounds come together, share ideas, learn from one another, and turn those ideas into experiences that extend beyond the classroom.",
];

export function Aeronauts() {
  return (
    <ReportSection id="sec-aeronauts" tone={TONE}>
      <div className="relative">
        <div className="relative h-[78svh] min-h-[32rem] w-full">
          <Image
            src={resolveAsset("aeronauts-drone.webp")}
            alt="A quadcopter drone held up against a dusk sky over forested hills"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_55%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1420] via-[#0d1420]/40 to-[#0d1420]/30" />
        <Container className="absolute inset-x-0 top-0">
          <Rail left="Drone Club" right="Clubs & Activities / 12" />
        </Container>
        <Container className="absolute inset-x-0 bottom-0 pb-10 sm:pb-16">
          <Reveal>
            <Kicker>Where curiosity takes flight</Kicker>
            <h2 className="font-heading text-[clamp(5rem,17vw,16rem)] uppercase leading-[0.8] tracking-[-0.01em]">
              Aero<span className="text-[color:var(--accent)]">nauts</span>
            </h2>
          </Reveal>
        </Container>
      </div>

      <Container>
        <div className="mx-auto max-w-3xl space-y-6 py-16 text-[15px] leading-[1.9] text-[color:var(--muted)] sm:py-24 sm:text-lg">
          {BEFORE_QUOTE.map((text, index) => (
            <Reveal key={index} y={16}>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid items-center gap-8 border-y border-[color:var(--rule)] py-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-20">
          <Reveal>
            <ReportPhoto
              id="aeronauts-nidar"
              alt="Team Aeronauts with their drones at the NIDAR national drone innovation challenge"
              caption="Team Aeronauts · NIDAR 2025 finalists"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
              A national stage
            </p>
            <p className="mt-5 text-[15px] leading-[1.9] text-[color:var(--muted)] sm:text-lg">
              The club has already marked its presence on a national stage. Last year, Team Aeronauts from GEC Wayanad
              emerged as finalists in NIDAR 2025, a national drone innovation challenge. This achievement stands as a
              proud moment for the college and reflects the dedication, teamwork, and innovative spirit of the
              students involved.
            </p>
            <p className="mt-8 font-serif text-3xl italic leading-[1.2] sm:text-4xl">
              But for AERONAUTS, the achievement is not a finish line; it is a starting point.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-3xl space-y-6 py-16 text-[15px] leading-[1.9] text-[color:var(--muted)] sm:py-24 sm:text-lg">
          {AFTER_QUOTE.map((text, index) => (
            <Reveal key={index} y={16}>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid items-end gap-8 pb-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16 sm:pb-28">
          <Reveal>
            <p className="font-heading text-5xl uppercase leading-[0.9] sm:text-7xl">
              Look higher.
              <span className="block text-[color:var(--accent)]">Think differently.</span>
              Create boldly.
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-[color:var(--muted)]">
              As drones continue to reshape the world around us, AERONAUTS aims to inspire students to look higher,
              think differently, and create boldly.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ReportPhoto
              id="aeronauts-team"
              alt="Members of the Aeronauts drone club standing in a row outside a building"
              ratio="16 / 9"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </Reveal>
        </div>
      </Container>
    </ReportSection>
  );
}
