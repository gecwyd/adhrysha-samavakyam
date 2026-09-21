"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import {
  Container,
  Kicker,
  PhotoMasonry,
  Rail,
  ReportSection,
  Reveal,
  Stat,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#05060b",
  ink: "#eef0f8",
  accent: "#8fb4ff",
  muted: "#eef0f8ab",
  rule: "#8fb4ff2b",
};

const PARAGRAPHS = [
  "Orion GECW is a student-led space and technology club at Government Engineering College, Wayanad, consisting of 120 members. The club is built on the vision that engineering is an interconnected system, and it works to bridge the gap between theoretical knowledge and real-world application across fields like electronics, communication, embedded systems, software development, and mechanical design.",
  "Throughout the academic year, the club focused on fostering technical expertise and system-level thinking among its members through a variety of initiatives. Key activities included multi-phase electronics bootcamps led by Botz Embedded Solutions and specialized workshops on FPGA architecture and PCB design. To provide practical exposure, Orion organized an educational visit for 47 students to the ISRO Liquid Propulsion Systems Centre (LPSC) in Thiruvananthapuram. Additionally, the club conducted outreach programs for local high school students and fostered peer-to-peer learning through presentations on satellite technology and gravitational waves.",
];

const PROJECTS = [
  "A QO 100 satellite ground station",
  "A small-scale FM transmitter for wireless communication",
  "A digital application to streamline club management and event coordination",
];

const CLOSING =
  "Ultimately, Orion GECW serves as a platform that equips students with the multidisciplinary skills necessary to become industry-ready engineers capable of contributing to advanced technological fields.";

function Orbit() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <div className="absolute inset-0 rounded-full border border-[color:var(--rule)]" />
      <div className="absolute inset-[14%] rounded-full border border-[color:var(--rule)]" />
      <div className="absolute inset-[28%] rounded-full border border-[color:var(--rule)]" />
      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_24px_var(--accent)]" />
      </motion.div>
      <motion.div
        className="absolute inset-[28%]"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
      <div className="absolute inset-[38%] overflow-hidden rounded-full border border-[color:var(--rule)] bg-black">
        <Image
          src={resolveAsset("orion-logo.webp")}
          alt="Orion GECW logo"
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function Orion() {
  return (
    <ReportSection id="sec-orion" tone={TONE}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 18%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 78% 12%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 44% 64%, #cfe0ff 50%, transparent 51%), radial-gradient(1px 1px at 90% 72%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 22% 88%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 62% 34%, #cfe0ff 50%, transparent 51%)",
        }}
      />
      <Container className="relative">
        <Rail left="Space & Technology Club" right="Clubs & Activities / 11" />

        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal>
            <Kicker>Engineering is an interconnected system</Kicker>
            <h2 className="font-heading text-[clamp(6rem,19vw,17rem)] uppercase leading-[0.78] tracking-[0.01em]">
              Orion
              <span className="block text-[color:var(--accent)]">GECW</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Orbit />
          </Reveal>
        </div>

        <div className="grid gap-8 pb-16 sm:grid-cols-2 sm:pb-24 lg:max-w-2xl">
          <Reveal><Stat value="120" label="Club members" /></Reveal>
          <Reveal delay={0.08}><Stat value="47" label="Students at ISRO LPSC" /></Reveal>
        </div>

        <div className="grid gap-12 border-t border-[color:var(--rule)] py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div className="space-y-6 text-[15px] leading-[1.9] text-[color:var(--muted)] sm:text-lg">
            {PARAGRAPHS.map((text, index) => (
              <Reveal key={index} y={16}>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
              Currently in development
            </h3>
            <ul className="mt-4 border-t border-[color:var(--rule)]">
              {PROJECTS.map((project, index) => (
                <li key={project} className="grid grid-cols-[3rem_1fr] gap-3 border-b border-[color:var(--rule)] py-5">
                  <span className="font-mono text-[10px] tracking-[0.24em] text-[color:var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl leading-snug sm:text-2xl">{project}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="pb-14 sm:pb-20">
          <PhotoMasonry
            className="mx-auto max-w-3xl columns-2 gap-3 lg:gap-4"
            photos={[
              { id: "orion-1", alt: "Students working together at an Orion workshop" },
              { id: "orion-2", alt: "Students at lab benches with oscilloscopes during an Orion session" },
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
