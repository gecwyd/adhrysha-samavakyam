"use client";

import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import { REPORT_PHOTOS } from "@/lib/report-photos";
import {
  Container,
  Kicker,
  Rail,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#f5efe3",
  ink: "#26181a",
  accent: "#8a2233",
  muted: "#26181aa8",
  rule: "#26181a26",
};

const INTRO =
  "The Iliad Literature Club of Government Engineering College Wayanad aims to encourage reading, creative expression, literary appreciation and active participation in literary activities among students. The club provides a platform for students to explore their interests in literature and express their creativity through various activities.";

const NATIONAL_READING_DAY =
  "During the academic year 2025–2026, the club conducted a programme in connection with National Reading Day, observed on June 19. The programme was designed to promote the habit of reading among students and to encourage them to engage creatively with their favourite books.";

const CONTEST = [
  "As part of the National Reading Day observance, the Iliad Literature Club conducted a “Book Mark with a Quote from Your Favourite Book” Design Contest for students.",
  "The contest encouraged students to select a meaningful quote from a book they enjoyed and creatively incorporate it into a bookmark design. Through this activity, students were given an opportunity to combine their love for reading with artistic and creative expression.",
  "The programme highlighted the importance of books and reading in enriching one's imagination, knowledge and perspective. It also provided students with a simple yet engaging way to celebrate reading and share the literary works that inspired them.",
  "The activity successfully reflected the spirit of National Reading Day and the objectives of the Iliad Literature Club by encouraging students to read, create and inspire others through literature.",
];

const CLOSING =
  "The activities of the academic year 2025–2026, though limited to a single programme, reflected the club's commitment to promoting a culture of reading and creativity among students. The Iliad Literature Club looks forward to conducting more engaging literary activities and providing students with opportunities to discover, appreciate and express themselves through literature.";

export function IliadLiteratureClub() {
  const { width, height } = REPORT_PHOTOS["iliad-logo"];

  return (
    <ReportSection id="sec-iliad" tone={TONE}>
      <Container>
        <Rail left="Literature Club" right="Clubs & Activities / 03" />

        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal className="mx-auto w-full max-w-sm bg-white p-6 shadow-[0_30px_80px_-40px_rgba(38,24,26,0.5)] sm:p-8 lg:max-w-none">
            <Image
              src={resolveAsset("iliad-logo.webp")}
              alt="Iliad Literature Club of GECW logo"
              width={width}
              height={height}
              priority
              className="h-auto w-full"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Kicker>Academic Year 2025–26</Kicker>
            <h2 className="font-serif text-[clamp(3.25rem,8vw,7rem)] font-normal leading-[0.95] tracking-[-0.03em]">
              Iliad
              <em className="block italic text-[color:var(--accent)]">Literature Club</em>
            </h2>
            <p className="mt-8 max-w-xl font-serif text-lg leading-[1.8] text-[color:var(--muted)] sm:text-xl">
              {INTRO}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-12 border-t border-[color:var(--rule)] py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:py-24">
          <Reveal className="lg:sticky lg:top-16 lg:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
              National Reading Day · 19 June
            </p>
            <h3 className="mt-5 font-serif text-4xl italic leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              A bookmark with a quote from your favourite book.
            </h3>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.85] text-[color:var(--muted)]">{NATIONAL_READING_DAY}</p>
          </Reveal>

          <div className="space-y-6 font-serif text-lg leading-[1.85] sm:text-xl">
            <Reveal y={14}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Book Mark with a Quote – Design Contest
              </h4>
            </Reveal>
            {CONTEST.map((text, index) => (
              <Reveal key={index} y={14}>
                <p className={index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-[color:var(--accent)]" : ""}>
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mx-auto max-w-3xl border-t border-[color:var(--rule)] pb-20 pt-14 text-center sm:pb-28">
          <p className="font-serif text-xl italic leading-[1.7] text-[color:var(--accent)] sm:text-2xl">{CLOSING}</p>
        </Reveal>
      </Container>
    </ReportSection>
  );
}
