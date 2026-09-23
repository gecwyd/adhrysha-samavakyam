"use client";

import { Container, Kicker, Rail, ReportSection, type ReportTone } from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#050505",
  ink: "#ece6d8",
  accent: "#c9a56b",
  muted: "#ece6d8b0",
  rule: "#c9a56b26",
};

export function Closing() {
  return (
    <ReportSection id="sec-closing" tone={TONE}>
      <Container>
        <Rail left="Closing" right="Sathva Magazine 2025–26" />

        <div className="py-24 sm:py-32">
          <Kicker>Conclusion</Kicker>

          <h2 className="font-heading text-[clamp(2.75rem,8vw,6rem)] uppercase leading-[0.95] tracking-[-0.01em]">
            One Year, <span className="text-[color:var(--accent)]">Many Voices</span>
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
            <p>
              This year&rsquo;s magazine moved between two worlds without much warning, from an essay
              on why light bends around a black hole, to a photograph of a kabaddi team catching its
              breath after a final. From a centuries-old Theyyam ritual to a robot competing in a
              national round. That was never an accident. A college is exactly this kind of place:
              too many things happening at once, all of it equally real.
            </p>
            <p>
              &lsquo;Adrishya Samavakyam&rsquo;, the invisible equation, was the name we gave this year, but
              it was always bigger than four physics chapters. It was the unseen effort behind every
              club meeting, every practice session, every late edit. Some of it made it to these
              pages. Most of it didn&rsquo;t, and that&rsquo;s fine. Not everything needs to be written down
              to matter.
            </p>
          </div>

          <h2 className="mt-20 font-heading text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.85] tracking-[-0.01em]">
            Thank
            <br />
            <span className="text-[color:var(--accent)]">You.</span>
          </h2>

          <p className="mt-10 max-w-xl text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
            Seventeen clubs, four sporting campaigns, and a handful of essays. None of it was
            really about the trophies or the equations. It was about a campus deciding, together,
            that this year was worth writing down. If you read this far, you were part of that too.
          </p>

          <div className="mt-16 border-t border-[color:var(--rule)] pt-6 font-mono text-[9px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:text-[10px]">
            <p>Sathva &middot; College Union &middot; Govt. Engineering College, Wayanad &middot; 2025&ndash;26</p>
            <p className="mt-2 text-[color:var(--accent)]/70">
              Edited by Adhil Muhammed K &middot; Staff Advisor Dr. Brijmohan K
            </p>
          </div>

          <p className="mt-20 font-mono text-[10px] uppercase tracking-[0.5em] text-[color:var(--ink)]/20 sm:text-xs">
            Fin.
          </p>
        </div>
      </Container>
    </ReportSection>
  );
}

export default Closing;
