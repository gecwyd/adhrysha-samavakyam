"use client";

import {
  Container,
  Kicker,
  Rail,
  ReportSection,
  Reveal,
  Stat,
  Timeline,
  type ReportTone,
  type TimelineItem,
} from "@/components/ui/report-kit";
import { InstagramEmbed } from "@/components/ui/instagram-embed";

const TONE: ReportTone = {
  paper: "#120b14",
  ink: "#f5f0e8",
  accent: "#e1306c",
  muted: "#f5f0e8ac",
  rule: "#f5f0e826",
};

const SUB_ACCOUNTS = [
  { label: "Tech Fest", handle: "astra_gecw" },
  { label: "Magazine", handle: "magazinegecw26" },
  { label: "Arts", handle: "thouryathrikam_gecw" },
];

const TIMELINE: TimelineItem[] = [
  { date: "27 Feb 2026", title: "Meet the Leaders", body: "The new College Union 2025–26 takes charge at GEC Wayanad." },
  { date: "17 Sep 2026", title: "On Camera", body: "A dance reel from campus, shared on the union's page." },
  { date: "18 Sep 2026", title: "Checkmate", body: "A campus chess meet." },
  { date: "19 Sep 2026", title: "Freshers' Party", body: "Welcoming the newest batch to GEC Wayanad." },
  {
    date: "20 Sep 2026",
    title: "Sathva Connect",
    body: "A GATE-prep question-bank drive for CSE, ECE, EEE, CE and ME students.",
  },
  {
    date: "21 Sep 2026",
    title: "Open Stage 2026",
    body: "The magazine's release night, with Principal Dr. V. R. Rajeev, editor Adhil Muhammed K, and actress Sheethal Joseph as guest.",
  },
  { date: "22 Sep 2026", title: "Podium & Print", body: "The sports results and this magazine go up on the same page." },
];

const REELS = [
  { url: "https://www.instagram.com/sathva_collegeunion/reel/DdZOU9YyBRo/", caption: "17 Sep 2026 — On Camera" },
  { url: "https://www.instagram.com/sathva_collegeunion/p/DdjUs3bSey2/", caption: "21 Sep 2026 — Open Stage 2026" },
  { url: "https://www.instagram.com/sathva_collegeunion/p/Ddd5m9aSPf8/", caption: "19 Sep 2026 — Freshers' Party" },
];

export function Sathva() {
  return (
    <ReportSection id="sec-sathva" tone={TONE}>
      <Container>
        <Rail left="Sathva" right="@sathva_collegeunion" />

        <div className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-24">
          <Reveal>
            <Kicker>College Union · GECW · 2025–26</Kicker>
            <h2 className="font-heading text-[clamp(5rem,18vw,15rem)] uppercase leading-[0.8] tracking-[-0.01em]">
              Sathva
              <span className="block text-[color:var(--accent)]">Means Union.</span>
            </h2>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
              The official Instagram of College Union GECW — the body behind the tech fest, the
              magazine, the arts fest, and everything else running under it this year.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-3 gap-6">
            <Stat value="938" label="Followers" />
            <Stat value="24" label="Following" />
            <Stat value="230" label="Posts" />
          </Reveal>
        </div>

        <Reveal className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[color:var(--rule)] py-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
          {SUB_ACCOUNTS.map((account) => (
            <a
              key={account.handle}
              href={`https://www.instagram.com/${account.handle}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[color:var(--accent)]"
            >
              {account.label} <span className="text-[color:var(--accent)]">@{account.handle}</span>
            </a>
          ))}
          <a
            href="https://collegeunion.gecwyd.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--accent)]"
          >
            collegeunion.gecwyd.ac.in
          </a>
        </Reveal>

        <div className="border-t border-[color:var(--rule)] pt-14 sm:pt-20">
          <Reveal className="mb-10 sm:mb-14">
            <Kicker>Union Timeline</Kicker>
            <h3 className="font-heading text-[clamp(2.5rem,7vw,4.5rem)] uppercase leading-[0.9] tracking-[-0.01em]">
              The Year, As Posted
            </h3>
          </Reveal>
          <Timeline items={TIMELINE} />
        </div>

        <div className="border-t border-[color:var(--rule)] py-14 sm:py-20">
          <Reveal className="mb-10 sm:mb-14">
            <Kicker>From the Feed</Kicker>
            <h3 className="font-heading text-[clamp(2.5rem,7vw,4.5rem)] uppercase leading-[0.9] tracking-[-0.01em]">
              Reels &amp; Posts
            </h3>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {REELS.map((reel, index) => (
              <Reveal key={reel.url} delay={index * 0.08} y={18}>
                <InstagramEmbed url={reel.url} caption={reel.caption} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </ReportSection>
  );
}

export default Sathva;
