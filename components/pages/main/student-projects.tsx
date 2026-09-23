"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  Stat,
  type ReportPhotoItem,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#eceeea",
  ink: "#0f1916",
  accent: "#0b7d68",
  muted: "#0f1916a8",
  rule: "#0f191626",
};

interface Project {
  name: string;
  kicker: string;
  status: string;
  credits: [string, string][];
  paragraphs: string[];
  photos: ReportPhotoItem[];
}

const PROJECTS: Project[] = [
  {
    name: "ARMOR",
    kicker: "Autonomous Robotic Maintenance & Observation Rover",
    status: "District level winner",
    credits: [
      ["Guide", "Mr. Brij Mohan"],
      ["Co-guide", "Mr. Aravind MT"],
      ["Team", "Akhil E, Mohammed Jasir, Athira AP, Anamika P P"],
    ],
    paragraphs: [
      "ARMOR (Autonomous Robotic Maintenance & Observation Rover) is an autonomous robotic system developed to perform inspection and maintenance in areas that are difficult or unsafe for humans to access directly. The system uses a Raspberry Pi as the main control unit to manage the different operations of the robot.",
      "A camera with LED illumination is used to obtain a clear view of the internal area and monitor its condition in real time. The captured video can be viewed through a web interface, allowing the operator to monitor and control the system remotely. This reduces the need for humans to directly enter hazardous or confined areas during inspection and maintenance.",
      "The main aim of ARMOR is to make maintenance work safer, easier, and more efficient while reducing manual effort. It also helps in identifying dirt, damage, and other defects at an early stage. By combining robotics, embedded systems, camera-based monitoring, and wireless communication, ARMOR provides a practical approach for inspection and maintenance in challenging environments.",
    ],
    photos: [
      { id: "project-armor-poster", alt: "YIP 8.0 district level winners poster featuring the ARMOR team", caption: "YIP 8.0 · District level winners" },
      { id: "project-armor-team", alt: "The four members of the ARMOR project team standing together" },
    ],
  },
  {
    name: "Electro-Thermal Drying System",
    kicker: "Refrigeration-based dehumidification",
    status: "Working prototype",
    credits: [
      ["Team", "Shibin Siraj E S, Vishnuraj G, Sreejith T R, Shahad E"],
      ["Guide", "Prof. Laiju Lukose"],
      ["Head of Department", "Dr. Balakrishnan K"],
      ["Principal", "Dr. Pradeep V"],
    ],
    paragraphs: [
      "Traditional open sun drying leaves agricultural produce vulnerable to weather unpredictability, contamination, and inconsistent quality. To overcome these limitations, an Electro-Thermal Drying System with refrigeration-based dehumidification has been developed as an eco-friendly, energy-efficient preservation solution tailored for small-scale farmers in high-humidity regions like Wayanad.",
      "The technology operates on a closed-loop principle where humid air from the drying chamber is drawn across an evaporator coil to condense and remove moisture. The resulting dry air is then reheated and recirculated to ensure uniform, controlled drying. By integrating a Vapour Compression Refrigeration System (VCRS) for active moisture extraction alongside an ESP32 microcontroller for automated thermal regulation, the unit preserves the natural color, flavor, and nutrients of fruits and vegetables while drastically minimizing microbial growth, enabling high-quality food preservation year-round regardless of ambient monsoon conditions.",
      "This bonafide project was carried out by team members from the Department of Mechanical Engineering at Government Engineering College Wayanad, affiliated with APJ Abdul Kalam Technological University, with leadership and support from the Head of Department and Principal.",
    ],
    photos: [
      { id: "project-drying-unit", alt: "Refrigerator-based drying unit with trays of sliced fruit and visible wiring" },
      { id: "project-drying-team", alt: "The drying system team holding award plaques outdoors" },
    ],
  },
  {
    name: "Smart Agriculture Unit",
    kicker: "A technological approach to modern farming",
    status: "Press featured",
    credits: [
      ["Guide", "Asst. Prof. Vipin Chambadan"],
      ["Team", "M. Sidharth, P. Athul, Safadur Irfan, Revanth Aravind"],
    ],
    paragraphs: [
      "Students of Government Engineering College Wayanad have developed a Smart Agriculture Unit, an innovative project that integrates modern technology with agriculture.",
      "The unit is designed to cultivate various vegetables and leafy greens in limited spaces by repurposing the shelves of an unused refrigerator. This innovative approach helps maximize crop production in small areas while reducing water consumption. The system also provides opportunities for controlled irrigation, nutrient delivery, and plant growth management.",
      "The primary objective of the project is to make agriculture more efficient and environmentally sustainable through the application of modern technology. The Smart Agriculture Unit represents the engineering students' efforts to address challenges in the agricultural sector through innovative and practical solutions.",
    ],
    photos: [
      { id: "project-agri-team", alt: "The Smart Agriculture Unit team beside the refrigerator-based grow unit" },
      { id: "project-agri-news", alt: "Newspaper feature on the Smart Agriculture Unit" },
    ],
  },
];

const MARQUEE_TEXT = "STUDENT PROJECTS · DEPARTMENT ENGINEERING · GECW · 2025–26 · ";

const TOTAL_TEAM = new Set(
  PROJECTS.flatMap((p) =>
    p.credits.filter(([label]) => label === "Team").flatMap(([, value]) => value.split(",").map((n) => n.trim()))
  )
).size;

const TOTAL_GUIDES = new Set(
  PROJECTS.flatMap((p) =>
    p.credits.filter(([label]) => label === "Guide" || label === "Co-guide").map(([, value]) => value)
  )
).size;

const pad = (n: number) => String(n).padStart(2, "0");

/** Faint architectural grid, echoing a drafting sheet without competing with the type. */
function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.14]">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-[color:var(--ink)]"
          style={{ top: `${14 + i * 12}%` }}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-[color:var(--ink)]/70"
          style={{ left: `${10 + i * 20}%` }}
        />
      ))}
    </div>
  );
}

function Marquee() {
  return (
    <div className="relative z-10 flex w-full overflow-hidden border-y border-[color:var(--rule)] bg-[color:var(--ink)]/[0.03] py-3">
      <div className="flex shrink-0 animate-[marquee_26s_linear_infinite] whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-heading text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] sm:text-sm">
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
      <div className="flex shrink-0 animate-[marquee_26s_linear_infinite] whitespace-nowrap" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-heading text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] sm:text-sm">
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden">
        <GridLines />

        <div className="pointer-events-none absolute inset-y-0 left-5 z-0 w-px bg-[color:var(--rule)] sm:left-10 lg:left-16" />
        <div className="pointer-events-none absolute inset-y-0 right-5 z-0 w-px bg-[color:var(--rule)] sm:right-10 lg:right-16" />

        <Container className="relative z-10">
          <Rail left="Student Projects" right="Engineering / GECW" />
        </Container>

        <motion.div style={{ opacity: reduceMotion ? 1 : fade }} className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.div style={{ y: reduceMotion ? 0 : titleY }}>
            <Kicker>Engineering · GECW · 2025–26</Kicker>
            <h2 className="font-heading text-[clamp(3.5rem,13vw,11rem)] uppercase leading-[0.82] tracking-[-0.01em]">
              Student
              <span className="block text-[color:var(--accent)]">Projects</span>
            </h2>
          </motion.div>

          <motion.p
            style={{ y: reduceMotion ? 0 : subY }}
            className="mx-auto mt-8 max-w-lg font-serif text-lg leading-[1.6] text-[color:var(--muted)] sm:text-xl"
          >
            Three working prototypes, engineered and defended inside a single academic year. Read the story
            behind each below.
          </motion.p>
        </motion.div>

        <Marquee />
      </div>
    </div>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const [heroPhoto, secondPhoto] = project.photos;

  return (
    <article className="border-t border-[color:var(--rule)] py-16 sm:py-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          {pad(index + 1)} / {pad(PROJECTS.length)}
        </p>
        <span className="rounded-full border border-[color:var(--accent)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
          {project.status}
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal y={24} className={flipped ? "lg:order-2" : ""}>
          <ReportPhoto
            {...heroPhoto}
            ratio="4/5"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="border border-[color:var(--rule)]"
          />
          {secondPhoto && (
            <Reveal delay={0.1} y={16} className="mt-4 w-2/3 sm:w-1/2">
              <ReportPhoto {...secondPhoto} sizes="(max-width: 1024px) 50vw, 25vw" className="border border-[color:var(--rule)]" />
            </Reveal>
          )}
        </Reveal>

        <Reveal delay={0.1} className="lg:self-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
            {project.kicker}
          </p>
          <h3 className="mt-3 font-heading text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            {project.name}
          </h3>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-[color:var(--rule)] py-5">
            {project.credits.map(([label, value]) => (
              <div key={label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--muted)]">{label}</p>
                <p className="mt-1 max-w-xs text-sm leading-snug">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-base leading-[1.85] text-[color:var(--muted)] sm:text-[17px]">
            {project.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function StudentProjects() {
  return (
    <ReportSection id="sec-student-projects" tone={TONE}>
      <Hero />

      <Container>
        {PROJECTS.map((project, index) => (
          <ProjectShowcase key={project.name} project={project} index={index} />
        ))}

        <div className="grid grid-cols-2 gap-6 border-t border-[color:var(--rule)] py-16 sm:grid-cols-4 sm:py-20">
          <Stat value={pad(PROJECTS.length)} label="Prototypes built" />
          <Stat value={pad(TOTAL_TEAM)} label="Student engineers" />
          <Stat value={pad(TOTAL_GUIDES)} label="Faculty guides" />
          <Stat value="01" label="Academic year" />
        </div>
      </Container>
    </ReportSection>
  );
}
