"use client";

import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
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
  credits: [string, string][];
  paragraphs: string[];
  photos: ReportPhotoItem[];
}

const PROJECTS: Project[] = [
  {
    name: "ARMOR",
    kicker: "Autonomous Robotic Maintenance & Observation Rover",
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
    credits: [
      ["Guide", "Asst. Prof. Vipin Chambadan"],
      ["Team", "M. Sidharth, P. Athul, Safadur Irfan, Revanth Aravind"],
    ],
    paragraphs: [
      "Students of Government Engineering College Wayanad have developed a Smart Agriculture Unit, an innovative project that integrates modern technology with agriculture.",
      "The unit is designed to cultivate various vegetables and leafy greens in limited spaces by repurposing the shelves of an unused refrigerator. This innovative approach helps maximize crop production in small areas while reducing water consumption. The system also provides opportunities for controlled irrigation, nutrient delivery, and plant growth management.",
      "The primary objective of the project is to make agriculture more efficient and environmentally sustainable through the application of modern technology. The Smart Agriculture Unit represents the engineering students’ efforts to address challenges in the agricultural sector through innovative and practical solutions.",
    ],
    photos: [
      { id: "project-agri-team", alt: "The Smart Agriculture Unit team beside the refrigerator-based grow unit" },
      { id: "project-agri-news", alt: "Newspaper feature on the Smart Agriculture Unit" },
    ],
  },
];

export function StudentProjects() {
  return (
    <ReportSection id="sec-student-projects" tone={TONE}>
      <Container>
        <Rail left="Student Projects" right="Department projects" />

        <div className="py-16 sm:py-24">
          <Reveal>
            <Kicker>Projects · GECW</Kicker>
            <h2 className="font-heading text-[clamp(5rem,16vw,15rem)] uppercase leading-[0.8] tracking-[-0.01em]">
              Student
              <span className="block pl-[0.15em] text-[color:var(--accent)]">Projects</span>
            </h2>
          </Reveal>
        </div>

        {PROJECTS.map((project, index) => {
          const flipped = index % 2 === 1;
          return (
            <article
              key={project.name}
              className="grid gap-10 border-t border-[color:var(--rule)] py-14 lg:grid-cols-2 lg:gap-20 lg:py-20"
            >
              <div className={`grid grid-cols-2 items-start gap-3 sm:gap-4 ${flipped ? "lg:order-2" : ""}`}>
                {project.photos.map((photo, photoIndex) => (
                  <Reveal key={photo.id} delay={photoIndex * 0.08} y={18} className={photoIndex === 1 ? "mt-8 sm:mt-14" : ""}>
                    <ReportPhoto {...photo} sizes="(max-width: 1024px) 50vw, 25vw" />
                  </Reveal>
                ))}
              </div>

              <Reveal className="lg:sticky lg:top-16 lg:self-start">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                  {String(index + 1).padStart(2, "0")} · {project.kicker}
                </p>
                <h3 className="mt-4 font-heading text-5xl uppercase leading-[0.9] sm:text-6xl">{project.name}</h3>

                <dl className="mt-6 border-t border-[color:var(--rule)]">
                  {project.credits.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-[color:var(--rule)] py-3 text-sm">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--muted)]">{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 space-y-4 text-[15px] leading-[1.85] text-[color:var(--muted)]">
                  {project.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </Reveal>
            </article>
          );
        })}
      </Container>
    </ReportSection>
  );
}
