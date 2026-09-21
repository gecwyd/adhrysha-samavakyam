"use client";

import {
  Container,
  Kicker,
  PhotoMasonry,
  Rail,
  ReportSection,
  Reveal,
  Stat,
  Timeline,
  type ReportTone,
  type TimelineItem,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#08120e",
  ink: "#e6f5ec",
  accent: "#5dffa8",
  muted: "#e6f5ecb0",
  rule: "#5dffa82e",
};

const INTRO =
  "The GBot Robotics Club of Government Engineering College Wayanad conducted and participated in various workshops, exhibitions, competitions and technical programmes during 2024–26, with the aim of promoting practical learning and interest in robotics and technology.";

const CLOSING =
  "Through these diverse initiatives, GBot Robotics Club provided students with opportunities for hands-on learning, project development, mentoring, teamwork and technical communication while encouraging curiosity, creativity and greater interest in robotics, engineering and technological innovation.";

const EVENTS: TimelineItem[] = [
  {
    date: "20 Mar 2024",
    title: "Workshop at GPTC Meppadi",
    body: "A team of 12 GBot members conducted a hands-on robotics workshop at GPTC Meppadi, covering robotics fundamentals, microcontrollers, Embedded C, sensors, motor drivers and a rover project.",
  },
  {
    date: "20–27 Mar 2024",
    title: "Exhibition at Valliyoorkavu",
    body: "The club organized an exhibition at Valliyoorkavu Exhibition Hall, showcasing projects such as Human Follower, Line Follower, Robotic Arm and an Interactive Game.",
  },
  {
    date: "8 Apr 2024",
    title: "Senior farewell",
    body: "A farewell programme for seniors was conducted at the CSE Seminar Hall, featuring speeches, certificate distribution, cake cutting and interactive games.",
  },
  {
    date: "5 Oct 2024",
    title: "IEEE Malabar Hub Meet 2024",
    body: "GBot conducted a Line Follower Robotics Workshop, where participants built and tested robots and took part in a small competition.",
  },
  {
    date: "19–20 Oct 2024",
    title: "Spark 2.0",
    body: "A two-day robotics and technology workshop that introduced 89 first-year students to Arduino programming, sensors, simulation, rover design and robotics through hands-on activities and a Robomaze challenge.",
  },
  {
    date: "11 Jan 2025",
    title: "Robo Olympics 2025",
    body: "GBot members participated in the Robo Football Competition at Robo Olympics 2025 held at College of Engineering Trivandrum, gaining valuable experience in robotics design, control and teamwork.",
  },
  {
    date: "14 Jul 2025",
    title: "Little Kites workshop",
    body: "A one-day robotics workshop was conducted for around 40 Little Kites students at GVHSS Mananthavady, introducing them to robotics, electronic components and basic robot-building concepts.",
  },
  {
    date: "From 15 Jul 2025",
    title: "GBot Robo Series",
    body: "Evening classes were conducted for around 90 club members in two batches, covering programming, robotics project development, PCB designing and other technical fundamentals.",
  },
  {
    date: "25 Aug 2025",
    title: "Robopulse",
    body: "A session on Image Processing with OpenCV was conducted, introducing participants to image processing, computer vision datasets and robotics applications.",
  },
  {
    date: "13–14 Sep 2025",
    title: "Spark 3.0",
    body: "The camp welcomed first-year and lateral-entry students to the robotics community, with 86 participants and 12 mentors/executive members. It covered Arduino, Embedded C, sensors and motor drivers and concluded with a Line Follower Competition.",
  },
  {
    date: "Exhibitions",
    title: "Expos",
    body: "The club also participated in exhibitions including EXPO Bathery, Ente Keralam Expo and the GVHSS Mananthavady Expo, showcasing projects such as Spider Bot, Robotic Hand and other innovative prototypes while promoting awareness of robotics among the public and school students.",
  },
  {
    date: "5 Dec 2025",
    title: "Workshop at Vijaya HSS Pulpally",
    body: "GBot conducted a robotics workshop for +1 and +2 Computer Science students, introducing microcontrollers, sensors and their applications through interactive demonstrations and a Human Following Rover activity.",
  },
];

export function Gbot() {
  return (
    <ReportSection id="sec-gbot" tone={TONE}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#5dffa8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <Container className="relative">
        <Rail left="GBot Robotics Club" right="Clubs & Activities / 10" />

        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal>
            <Kicker>Robotics · 2024–26</Kicker>
            <h2 className="font-heading text-[clamp(6rem,20vw,18rem)] uppercase leading-[0.78] tracking-[-0.01em]">
              G<span className="text-[color:var(--accent)]">-</span>BOT
            </h2>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted)]">
              &gt; robotics_club.gecw <span className="animate-pulse text-[color:var(--accent)]">_</span>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="self-end">
            <p className="text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-lg">{INTRO}</p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <Stat value="89" label="Spark 2.0 first-years" />
              <Stat value="86" label="Spark 3.0 participants" />
              <Stat value="90" label="Robo Series members" />
            </div>
          </Reveal>
        </div>

        <Timeline items={EVENTS} />

        <div className="py-14 sm:py-20">
          <PhotoMasonry
            className="columns-1 gap-3 sm:columns-2 lg:columns-4 lg:gap-4"
            photos={[
              { id: "gbot-1", alt: "GBot line follower workshop at the IEEE Malabar Hub Meet 2024", caption: "IEEE Malabar Hub Meet 2024" },
              { id: "gbot-2", alt: "A GBot member demonstrating robotics on a display screen" },
              { id: "gbot-3", alt: "GBot members in club T-shirts standing together" },
              { id: "gbot-expo", alt: "GBot projects on display at the expo in Sulthan Bathery", caption: "Expo at Sulthan Bathery" },
            ]}
          />
        </div>

        <Reveal className="mx-auto max-w-3xl border-t border-[color:var(--rule)] pb-20 pt-12 sm:pb-28">
          <p className="font-mono text-sm leading-[1.9] text-[color:var(--muted)]">{CLOSING}</p>
        </Reveal>
      </Container>
    </ReportSection>
  );
}
