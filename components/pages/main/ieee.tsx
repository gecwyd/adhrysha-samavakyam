"use client";

import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  Timeline,
  type ReportTone,
  type TimelineItem,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#04141f",
  ink: "#e8f4fb",
  accent: "#4db8ff",
  muted: "#e8f4fbb0",
  rule: "#4db8ff30",
};

const INTRO =
  "The IEEE Student Branch of Government Engineering College Wayanad (GECW) conducted and participated in various technical, creative, professional development, and student engagement activities during 2025, providing students with opportunities for technical learning, creativity, leadership, networking, and exposure to current industry trends.";

const CLOSING =
  "Through these diverse activities, the IEEE Student Branch of Government Engineering College Wayanad provided students with valuable opportunities for technical learning, creative expression, professional development, leadership, teamwork, networking, and practical exposure. The branch continued to encourage students to explore emerging technologies and participate actively in professional activities, contributing to their overall technical and professional growth.";

const EVENTS: TimelineItem[] = [
  {
    date: "8–9 Feb 2025",
    title: "TINK-HER-HACK 3.0",
    body: "On 8–9 February 2025, IEEE SB GECW and IEEE WIE GECW organized TINK-HER-HACK 3.0, an all-Kerala, beginner-friendly 20-hour women-focused hackathon at Government Engineering College Wayanad. The event provided participants with an opportunity to collaborate, develop innovative solutions, and gain hands-on experience in problem-solving and technology. More than 30 teams participated and developed 10+ projects addressing areas such as healthcare, sustainability, and education.",
  },
  {
    date: "18 Mar 2025",
    title: "WIE Logo Designing Competition",
    body: "The IEEE Women in Engineering (WIE) Affinity Group of GECW organized a Logo Designing Competition as part of IEEE WIE Week 2025 on the theme “Equality for All: Promoting Gender Equality and Inclusivity.” The online competition encouraged students to express their creativity while creating awareness about gender equality and inclusivity. The first, second, and third positions were secured by Linda Philomina, Bhavana Manoj, and Sreelakshmi P S, respectively.",
  },
  {
    date: "28 Mar 2025",
    title: "Meet the Leaders",
    body: "IEEE WIE GECW organized the “Meet the Leaders” program as part of IEEE WIE Week 2025. The program provided participants with an opportunity to interact with women leaders from IEEE, GBOT, SHE, and NSS and gain valuable insights into leadership and teamwork. The guest leaders shared their experiences and engaged with participants through an interactive panel discussion.",
  },
  {
    date: "30 Mar 2025",
    title: "Circuitry Unleashed 2.0",
    body: "IEEE SB GEC Barton Hill, in collaboration with IEEE AP-S and MTT-S SBCs GEC Wayanad, organized “Circuitry Unleashed 2.0”, an online workshop on LTSpice through Google Meet. The session, led by Anamika K Kamath, focused on analog circuit simulation and covered basic electronics concepts, LTSpice tools, AC and transient analysis, and practical simulations of integrator, amplifier, and oscillator circuits.",
  },
  {
    date: "23–28 Jun 2025",
    title: "Essay Writing Competition",
    body: "The WIE Affinity Group conducted an Essay Writing Competition as part of International Women in Engineering Day celebrations on the topic “Pioneering Safe Cyberspace: Bridging Technology and Light for Security.” The programme encouraged students to explore cybersecurity, safer technology, and the future of cyberspace. Adil Abu, a fourth-year ECE student of GECW, secured the first position.",
  },
  {
    date: "28 Jun 2025",
    title: "Placement Prep",
    body: "The IEEE Student Branch COET, in collaboration with IEEE Student Branch GEC Wayanad, organized an online placement-oriented session titled “Placement Prep: From Paper to Placement.” The session was handled by Cerin Sara Santhosh, Software Developer at IBM, and focused on resume building, aptitude preparation, interview skills, and the importance of community involvement, helping students improve their placement readiness.",
  },
  {
    date: "3 Aug 2025",
    title: "BATTLEGROUND",
    body: "IEEE Student Branch GEC Wayanad, in collaboration with Xora Studios, organized “BATTLEGROUND: Game Development Workshop” at Government Engineering College Wayanad. Led by Ujwel C, the workshop introduced students to the fundamentals of game development, coding, creativity, and game design, with active participation from students.",
  },
  {
    date: "9 Aug 2025",
    title: "UI & UX Design Workshop",
    body: "The branch conducted a UI & UX Design Workshop, introducing students to the fundamentals of user interface and user experience design and their importance in developing user-friendly digital products. Nafih Hassan and Lulu Naas led the session and shared insights on design principles, user research, wireframing, prototyping, industry practices, and career opportunities in UI/UX design.",
  },
  {
    date: "12 Aug 2025",
    title: "Member meeting",
    body: "An IEEE-related member meeting was conducted with the participation of both Chairs, Chapter Advisor Anu Mohamad, and 17 members. The meeting focused on ongoing activities and upcoming programmes, including the STEM programme, establishment of a tinkering lab, future online sessions, MAPCON participation, and the introduction of new MTT-S members.",
  },
  {
    date: "31 Aug 2025",
    title: "Cognitive Insights: Season 3",
    body: "The IEEE Malabar Subsection, in collaboration with IEEE Student Branch GEC Wayanad, organized the fifth episode of “Cognitive Insights: Season 3”, titled “ML Driven Digital Twin Framework for Signalized Intersection.” The session was delivered by Dr. Munavar Fairooz, Assistant Professor at NIT Calicut, and covered the use of machine learning and digital twin technology for studying traffic patterns and improving signalized intersections.",
  },
  {
    date: "18 Oct 2025",
    title: "RF and Microwave Opportunities",
    body: "IEEE AP-S & MTT-S SBCs GEC Wayanad, in collaboration with IEEE AP-S and IEEE MTT-S GEC Barton Hill, organized “Shaping the Future with RF and Microwave Opportunities” through Google Meet. The session was led by Dr. Apren T J, former RF & Avionics Division Head at VSSC ISRO and President of SFO Tech, RF Division, and was attended by 52 students. The session covered RF and Microwave engineering, industry opportunities, testing and certification, AI applications, chip-level technologies, and Design for Testing.",
  },
  {
    date: "18 Oct 2025",
    title: "ALPHA 25",
    body: "The IEEE Student Branch GEC Wayanad organized ALPHA 25: “Invoke: Begin Your IEEE Journey,” led by Farshan Yoosuf, IEEE LINK Team Member (2023). The session introduced students to IEEE, its opportunities, technical growth, networking, and leadership, motivating students to actively participate in IEEE activities.",
  },
  {
    date: "2 Dec 2025",
    title: "Member meeting",
    body: "An IEEE member meeting was conducted with both Chairs, Advisor Sinith Sir, and 16 members. The meeting included an interaction session for new members and discussions on upcoming events, including a programme on Audio Processing Using Artificial Intelligence and preparations for the MAPCON event.",
  },
  {
    date: "5 Dec 2025",
    title: "Emotional Intelligence",
    body: "MTT-S GEC Wayanad organized “Engineering the Brain of Engineers: An Emotional Intelligence Approach” through Google Meet. The session was led by Dr. Sujatha Gupta Kedar, Associate Professor and Head of the Department of Human Development, Mount Carmel College, Bangalore, and was attended by 41 participants. The session focused on emotional intelligence, communication, teamwork, leadership, adaptability, self-awareness, self-regulation, decision-making, and relationship management.",
  },
  {
    date: "9 Dec 2025",
    title: "Story of Radiation",
    body: "IEEE AP-S & MTT-S GEC Wayanad organized a lecture titled “Story of Radiation” through Google Meet. The session was led by Dr. Deepti Das Krishna, Associate Professor at CUSAT, and was attended by 43 students. The lecture covered electromagnetic theory, Maxwell’s equations, electromagnetic waves, radiation principles, wireless communication, and antenna technology, followed by an interactive doubt-clearing session.",
  },
  {
    date: "19–21 Dec 2025",
    title: "AKCSSC 2025",
    body: "The IEEE Computer Society Kerala Chapter organized AKCSSC 2025 (All Kerala Computer Society Student Convention) at Government Engineering College Wayanad. The three-day convention featured technical workshops on Generative AI, DevOps, and Cybersecurity, along with leadership sessions, an industry visit, trekking, cultural night, fireside chat, and various activities, providing students with opportunities for technical learning, networking, leadership, and community engagement.",
  },
  {
    date: "11 Mar 2026",
    title: "Applied Field Theory",
    body: "IEEE AP-S & MTT-S SBC GEC Wayanad, in collaboration with IEEE AP-S & MTT-S SBC GEC Barton Hill and the IEEE AP-S, IEEE EMC & IEEE MTT-S Kerala Section, organized a lecture titled “Simulation-Driven Analysis in Applied Field Theory: Methods and Applications” through Google Meet. The session was led by Swapnil Gaul, Founder of NUMEREGION (TaraNG) and Quest EdTech, and introduced participants to modern electromagnetic simulation techniques, solver methods, optimization approaches, and applications in antenna design, RFIC/MMIC design, and GPR systems.",
  },
];

export function Ieee() {
  return (
    <ReportSection id="sec-ieee" tone={TONE}>
      {/* Faint circuit grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#4db8ff 1px, transparent 1px), linear-gradient(90deg, #4db8ff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <Container className="relative">
        <Rail left="IEEE Student Branch" right="Clubs & Activities / 06" />

        <div className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-24">
          <Reveal>
            <Kicker>Student Branch · GECW</Kicker>
            <h2 className="font-heading text-[clamp(7rem,22vw,19rem)] uppercase leading-[0.75] tracking-[-0.01em]">
              IE<span className="text-[color:var(--accent)]">EE</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-lg">{INTRO}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 items-start gap-3 pb-16 sm:gap-5 md:grid-cols-4 sm:pb-24">
          <Reveal>
            <ReportPhoto id="ieee-alpha25" alt="ALPHA 25 poster with Farshan Yoosuf" caption="ALPHA’25" sizes="(max-width: 768px) 50vw, 25vw" />
          </Reveal>
          <Reveal delay={0.07}>
            <ReportPhoto
              id="ieee-akcssc-workshop"
              alt="AKCSSC 2025 workshop poster on workflows and agentic AI"
              caption="AKCSSC 2025 · Workshop"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Reveal>
          <Reveal delay={0.14}>
            <ReportPhoto
              id="ieee-akcssc-complete"
              alt="AKCSSC 2025 successfully completed poster"
              caption="IEEE AKCSSC 2025, under IEEE CS Kerala Section, held at GECW"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Reveal>
          <Reveal delay={0.21}>
            <ReportPhoto
              id="ieee-tinkerhack"
              alt="Participants of Tink-Her-Hack 3.0 gathered behind an IEEE banner"
              caption="Tink-Her-Hack 3.0"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Reveal>
        </div>

        <Timeline items={EVENTS} className="mb-16" />

        <Reveal className="mx-auto max-w-3xl pb-20 pt-4 sm:pb-28">
          <p className="border-l-2 border-[color:var(--accent)] pl-6 font-serif text-xl italic leading-[1.7] sm:text-2xl">
            {CLOSING}
          </p>
        </Reveal>
      </Container>
    </ReportSection>
  );
}
