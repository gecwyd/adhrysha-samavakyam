"use client";

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
  paper: "#e9e7e2",
  ink: "#151515",
  accent: "#8a5a2b",
  muted: "#151515a6",
  rule: "#15151526",
};

// Two staggered columns keep the mixed portrait / landscape sheets balanced.
const COLUMN_A = [
  { id: "drawing-club-1", alt: "Graphite portrait of a man in a wide-brimmed hat with a cigarette", ratio: "4 / 5" },
  { id: "drawing-club-4", alt: "Wall mural of two figures painted by club members on campus", ratio: "3 / 5" },
  { id: "drawing-club-3", alt: "Graphite portrait of a woman in round sunglasses", ratio: "4 / 5" },
] as const;

const COLUMN_B = [
  { id: "drawing-club-2", alt: "Detailed pencil study of a helmeted racing driver", ratio: "16 / 9" },
  { id: "drawing-club-6", alt: "Pencil portrait of a young man drawn in a spiral sketchbook", ratio: "3 / 4" },
  { id: "drawing-club-5", alt: "A student painting a caricature on a campus pillar", ratio: "3 / 5" },
] as const;

export function DrawingClub() {
  return (
    <ReportSection id="sec-drawing-club" tone={TONE}>
      <Container>
        <Rail left="Drawing Club" right="Clubs & Activities / 02" />

        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-16 lg:self-start">
            <Kicker>Art · Graphite &amp; Wall</Kicker>
            <h2 className="font-heading text-[clamp(5rem,13vw,11rem)] uppercase leading-[0.8] tracking-[-0.01em]">
              Drawing
              <span className="block pl-[0.2em] text-[color:var(--accent)]">Club</span>
            </h2>
            <div className="mt-10 max-w-md space-y-4 border-l border-[color:var(--accent)] pl-5 font-serif text-[17px] leading-[1.8] text-[color:var(--muted)] sm:text-lg">
              <p>
                This club exists to give the students an artistic outlet and to help enrich and foster an interest
                for art and personal expression through art. Though the club is for artists, it can be enjoyed by
                all who appreciate art.
              </p>
              <p>
                Drawing club is chartered to serve the diverse needs and interests of our students. There are
                avenues for forming friendships, cultural expression, skill development or aiding the students for
                their future career.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 items-start gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              {COLUMN_A.map((photo, index) => (
                <Reveal key={photo.id} delay={index * 0.06} y={18}>
                  <ReportPhoto {...photo} sizes="(max-width: 1024px) 45vw, 28vw" />
                </Reveal>
              ))}
            </div>
            <div className="mt-10 space-y-3 sm:mt-16 sm:space-y-4">
              {COLUMN_B.map((photo, index) => (
                <Reveal key={photo.id} delay={index * 0.06} y={18}>
                  <ReportPhoto {...photo} sizes="(max-width: 1024px) 45vw, 28vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="pb-16 sm:pb-24">
          <div className="grid items-end gap-6 border-t border-[color:var(--rule)] pt-8 md:grid-cols-[1fr_auto] md:gap-10">
            <ReportPhoto
              id="drawing-club-7"
              alt="Club members standing beside a black-and-white wall mural"
              caption="Mural by the Drawing Club"
              ratio="16 / 9"
              position="center 35%"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
            <p className="max-w-[16rem] font-heading text-4xl uppercase leading-[0.95] text-[color:var(--accent)] sm:text-5xl">
              Art for all who appreciate it.
            </p>
          </div>
        </Reveal>
      </Container>
    </ReportSection>
  );
}
