"use client";

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
  paper: "#0a0f0c",
  ink: "#eef3ec",
  accent: "#d4ff3a",
  muted: "#eef3ecb0",
  rule: "#eef3ec26",
};

type Placing = "Runners up" | "Second runners up";

interface Result extends ReportPhotoItem {
  sport: string;
  category: string;
  placing: Placing;
}

// Zone labels (Fzone / Interzone) are kept exactly as they appear in the source.
const RESULTS: Result[] = [
  { id: "sports-chess-women", sport: "Chess", category: "Fzone · Women", placing: "Runners up", alt: "Women’s chess team with the runners-up trophy" },
  { id: "sports-chess-men", sport: "Chess", category: "Fzone · Men", placing: "Runners up", alt: "Men’s chess team with the runners-up trophy" },
  { id: "sports-basketball-men", sport: "Basketball", category: "Fzone · Men", placing: "Second runners up", alt: "Men’s basketball team on the court with the trophy" },
  { id: "sports-yoga-women", sport: "Yoga", category: "Interzone · Women", placing: "Runners up", alt: "Women’s yoga team holding the runners-up trophy" },
  { id: "sports-yoga-men", sport: "Yoga", category: "Interzone · Men", placing: "Second runners up", alt: "Men’s yoga team holding the second runners-up trophy" },
  { id: "sports-tt-men", sport: "Table Tennis", category: "Fzone · Men", placing: "Runners up", alt: "Men’s table tennis team with the runners-up trophy" },
  { id: "sports-volleyball-men", sport: "Volleyball", category: "Fzone · Men", placing: "Runners up", alt: "Men’s volleyball team standing on the court with the trophy" },
  { id: "sports-tt-women", sport: "Table Tennis", category: "Fzone · Women", placing: "Second runners up", alt: "Women’s table tennis team with the trophy" },
  { id: "sports-handball-women", sport: "Handball", category: "Fzone · Women", placing: "Second runners up", alt: "Women’s handball team posing with the trophy on the ground" },
  { id: "sports-kho-men", sport: "Kho-Kho", category: "Fzone · Men", placing: "Second runners up", alt: "Men’s kho-kho team posing together with the trophy" },
  { id: "sports-handball-men", sport: "Handball", category: "Fzone · Men", placing: "Runners up", alt: "Men’s handball team posing under a tree with the trophy" },
  { id: "sports-football-men", sport: "Football", category: "Fzone · Men", placing: "Second runners up", alt: "Men’s football team lined up in striped jerseys" },
  { id: "sports-kabaddi-women", sport: "Kabaddi", category: "Fzone · Women", placing: "Second runners up", alt: "Women’s kabaddi team in pink jerseys with the trophy" },
];

const RUNNERS_UP = RESULTS.filter((result) => result.placing === "Runners up").length;
const SECOND_RUNNERS_UP = RESULTS.length - RUNNERS_UP;

const PLACING_STYLE: Record<Placing, string> = {
  "Runners up": "border-[#cfd6d9]/60 text-[#cfd6d9]",
  "Second runners up": "border-[#d58a49]/60 text-[#d58a49]",
};

function ResultCard({ result, index }: { result: Result; index: number }) {
  return (
    <Reveal delay={(index % 4) * 0.06} y={18} className="mb-6 break-inside-avoid sm:mb-8">
      <ReportPhoto id={result.id} alt={result.alt} sizes="(max-width: 640px) 50vw, 25vw" />
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-2xl uppercase leading-none sm:text-3xl">{result.sport}</h3>
          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            {result.category}
          </p>
        </div>
        <span
          className={`shrink-0 border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em] ${PLACING_STYLE[result.placing]}`}
        >
          {result.placing}
        </span>
      </div>
    </Reveal>
  );
}

export function Sports() {
  return (
    <ReportSection id="sec-sports" tone={TONE}>
      <Container>
        <Rail left="Sports" right="Podium finishes 2025–26" />

        <div className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-24">
          <Reveal>
            <Kicker>Fzone &amp; Interzone · 2025–26</Kicker>
            <h2 className="font-heading text-[clamp(6rem,20vw,18rem)] uppercase leading-[0.78] tracking-[-0.01em]">
              Sports
              <span className="block text-[color:var(--accent)]">2025-26</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-3 gap-6">
            <Stat value={String(RESULTS.length)} label="Podium finishes" />
            <Stat value={String(RUNNERS_UP)} label="Runners up" />
            <Stat value={String(SECOND_RUNNERS_UP)} label="Second runners up" />
          </Reveal>
        </div>

        <div className="columns-2 gap-4 border-t border-[color:var(--rule)] pt-10 sm:gap-8 sm:pt-14 lg:columns-4">
          {RESULTS.map((result, index) => (
            <ResultCard key={result.id} result={result} index={index} />
          ))}
        </div>

        <div className="pb-16 sm:pb-24" />
      </Container>
    </ReportSection>
  );
}
