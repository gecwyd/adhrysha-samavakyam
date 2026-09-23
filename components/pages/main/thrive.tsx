"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Container,
  Kicker,
  PhotoMasonry,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#f2e8d8",
  ink: "#2b1a11",
  accent: "#a8481e",
  muted: "#2b1a11b5",
  rule: "#2b1a1129",
};

const SUBTITLE = "Tribal higher education and interactive ventures for excellence";

const INTRO =
  "പതിവായി കണ്ടുവരുന്ന പഠന രീതിയിൽ നിന്ന് വ്യത്യസ്തമയാണ് ത്രൈവ് രൂപകല്പന ചെയ്തിരിക്കുന്നത്. സിലബസുകൾക്ക് അപ്പുറമുള്ള അറിവ് കുട്ടികളിലേക്ക് എത്തിക്കണം എന്ന ആശയമാണ് ത്രൈവ് എന്ന പ്രൊജക്ടിനാധാരം. ആസ്പിരേഷൻ ഗ്യാപ് നികത്തുക, ആറ്റിട്യുഡ് ഗ്യാപ് കുറയ്ക്കുക, ഉന്നത വിദ്യാഭ്യാസ മേഖലയിൽ കൂടുതൽ എക്സ്പോഷർ നൽകുക, സന്നദ്ധ സേവനം വളർത്തുക, സെൻഡ് ഓഫ്‌ ഓണർഷിപ് എന്നതൊക്കെയാണ് ഈ പദ്ധതിയുടെ ലക്ഷ്യങ്ങൾ. മൂന്ന് ഘട്ടമായാണ് ത്രൈവ് ആദ്യമായി പ്രാബല്യത്തിൽ കൊണ്ട് വന്നത്";

const GOALS = [
  { ml: "ആസ്പിരേഷൻ ഗ്യാപ് നികത്തുക", en: "Bridge the aspiration gap" },
  { ml: "ആറ്റിട്യുഡ് ഗ്യാപ് കുറയ്ക്കുക", en: "Reduce the attitude gap" },
  { ml: "ഉന്നത വിദ്യാഭ്യാസ എക്സ്പോഷർ", en: "Higher-education exposure" },
  { ml: "സന്നദ്ധ സേവനം വളർത്തുക", en: "Grow volunteerism" },
  { ml: "ഓണർഷിപ്പ് ബോധം", en: "A sense of ownership" },
];

const PHASES = [
  { label: "ഘട്ടം 1", range: "ജനുവരി 1 – മാർച്ച്‌ 31, 2024" },
  { label: "ഘട്ടം 2", range: "ഏപ്രിൽ 1 – മെയ്‌ 15, 2024" },
  { label: "ഘട്ടം 3", range: "ജൂൺ 1, 2024 – ഫെബ്രുവരി 28, 2025" },
];

const STATS = [
  { value: "33", label: "Students in the first team" },
  { value: "02", label: "MRS schools · Thirunelli & Nallurnad" },
  { value: "2024", label: "Year of the first batch" },
];

const FIRST_YEAR =
  "2024 ൽ ആണ് ത്രൈവ് ആദ്യമായി ഗവണ്മെന്റ് എഞ്ചിനീയറിംഗ് കോളേജിൽ നടക്കുന്നത്. 33 വിദ്യാർത്ഥികൾ അടങ്ങുന്ന ടീമാണ് ആദ്യമായി പ്രവർത്തനത്തിൽ പങ്കെടുത്തത്. തിരുനെല്ലി, നല്ലൂർനാട് എന്നീ രണ്ട് MRS ൽ ആയിരുന്നു ആദ്യ പ്രവർത്തനം ആരംഭിച്ചത്.";

const VOLUNTEERS =
  "വിദ്യാർത്ഥികളുമായി ഇടപ്പെട്ട് പൊതുവിവരങ്ങളും, നിർദേശിക്കപ്പെട്ട വിഷയങ്ങളിൽ വ്യക്തത വരുത്തുകയാണ് ഓരോ വോളന്റീയറുടെയും ചുമതല. ഓരോ സന്ദർശനത്തിലും വിദ്യാർഥികൾ അനുകൂലമായ മാറ്റങ്ങൾ പ്രകടിപ്പിച്ചിരുന്നു. ഇത് വോളന്റീയേഴ്സിന് കൂടുതൽ പ്രജോദനമായി. കൂടാതെ വോളന്റീയെഴ്സിന് ഇത് നല്ല മാറ്റങ്ങൾ സമ്മാനിച്ചു.ശനിയാഴ്ചകളിലാണ് കൂടുതൽ ക്ലാസുകൾ നടക്കാറുള്ളത്. 8 മുതൽ 10 വരെ ഉള്ള വിദ്യാർത്ഥികൾക്കാണ് ക്ലാസുകൾ നടത്താറുള്ളത്. പൊതുജ്ഞാനം, വിനോദ വിജ്ഞാന പരിപാടികളും അടങ്ങുന്ന ക്ലാസുകൾ 9:30 മുതൽ 12:30 വരെയാണ് നടക്കുന്നത്. ഇതിൽ വിദ്യാർത്ഥികളുടെ കഴിവുകൾ മെച്ചപ്പെടുത്താനുള്ള പ്രവർത്തനങ്ങൾക്ക് കൂടുതൽ മുൻഗണന നൽകിയിട്ടുണ്ട്.";

const SCHEDULE = [
  { label: "Day", value: "ശനി" },
  { label: "Time", value: "9:30–12:30" },
  { label: "Grade", value: "VIII–X" },
];

const OUTLINE = "[-webkit-text-stroke:1.5px_currentColor] [-webkit-text-fill-color:transparent]";

const MALAYALAM = { fontFamily: "var(--font-malayalam), 'Noto Sans Malayalam', sans-serif" };

/** Bilingual goal chips scrolling as a masthead ticker — the five aims the project rises toward. */
function GoalTicker() {
  const reduceMotion = useReducedMotion();
  const run = (
    <div className="flex shrink-0 items-center">
      {GOALS.map((goal) => (
        <span key={goal.en} className="flex items-center whitespace-nowrap">
          <span style={MALAYALAM} className="text-sm text-[color:var(--paper)]/80 sm:text-base">
            {goal.ml}
          </span>
          <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--paper)]/45">
            {goal.en}
          </span>
          <span aria-hidden className="mx-7 h-1.5 w-1.5 rotate-45 bg-[color:var(--paper)]/40 sm:mx-10" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y-2 border-[color:var(--ink)] bg-[color:var(--ink)] py-4">
      <div
        className="flex w-max"
        style={reduceMotion ? undefined : { animation: "marquee 32s linear infinite" }}
      >
        {run}
        {run}
      </div>
    </div>
  );
}

/** Three phases climbing like steps — a stair, not a data chart: the shape of a year rising toward higher education. */
function PhaseStair() {
  const lifts = ["translate-y-0", "-translate-y-6 sm:-translate-y-10", "-translate-y-12 sm:-translate-y-20"];

  return (
    <div className="relative py-20 sm:py-28">
      <svg
        aria-hidden
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-[22%] h-1/2 w-full opacity-30"
      >
        <path d="M2 27 L35 20 L67 11 L98 2" fill="none" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="1.2 1.6" />
      </svg>

      <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
        {PHASES.map((phase, index) => (
          <Reveal key={phase.label} delay={index * 0.1} className={`${lifts[index]} transition-transform`}>
            <div className="border-2 border-[color:var(--ink)] bg-[color:var(--paper)] p-6 sm:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                Phase {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-6 font-heading text-6xl leading-none sm:text-7xl">
                0{index + 1}
              </p>
              <p className="mt-6 border-t border-[color:var(--rule)] pt-4 text-lg leading-relaxed text-[color:var(--muted)]" style={MALAYALAM}>
                {phase.range}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Thrive() {
  const reduceMotion = useReducedMotion();
  const word = "THRIVE".split("");

  return (
    <ReportSection id="sec-thrive" tone={TONE}>
      <Container>
        <Rail left="THRIVE" right="Clubs & Activities / 15" />

        <div className="relative grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <Reveal>
            <Kicker>ത്രൈവ് · 2024–25</Kicker>
            <h2 className="flex items-end font-heading uppercase leading-[0.78] tracking-[-0.01em]">
              {word.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="text-[clamp(3.2rem,12vw,10rem)]"
                  style={{
                    transform: `translateY(${-index * (index === word.length - 1 ? 1.15 : 1)}rem)`,
                    color: index === word.length - 1 ? "var(--accent)" : undefined,
                  }}
                >
                  {letter}
                </span>
              ))}
            </h2>
            <p className="mt-10 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.26em] text-[color:var(--muted)]">
              ({SUBTITLE})
            </p>
          </Reveal>
          <Reveal delay={0.12} className="lg:justify-self-end">
            <motion.div
              initial={reduceMotion ? false : { rotate: -3, opacity: 0, y: 24 }}
              whileInView={{ rotate: -3, opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md border-2 border-[color:var(--ink)] p-2 sm:p-3"
            >
              <ReportPhoto
                id="thrive-1"
                alt="Volunteers and students gathered in front of a tiled-roof building"
                ratio="4 / 3"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </motion.div>
          </Reveal>
        </div>
      </Container>

      <GoalTicker />

      <Container>
        <div className="grid gap-10 border-b border-[color:var(--rule)] py-16 sm:py-24 lg:grid-cols-[0.5fr_1.5fr] lg:gap-24">
          <Reveal>
            <h3 className="font-heading text-4xl uppercase leading-none sm:text-5xl">
              The<br />idea
            </h3>
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
              Why Thrive exists
            </p>
          </Reveal>
          <Reveal delay={0.08} className="relative">
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-10 -left-2 font-heading text-[7rem] leading-none text-[color:var(--accent)] sm:text-[9rem] ${OUTLINE}`}
            >
              &ldquo;
            </span>
            <p className="relative text-[17px] leading-[2.05] sm:text-xl" style={MALAYALAM}>
              {INTRO}
            </p>
          </Reveal>
        </div>

        <PhaseStair />

        <div className="grid gap-x-10 gap-y-16 border-y border-[color:var(--rule)] py-16 sm:py-24 md:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} className="border-t border-[color:var(--rule)] pt-6">
              <p className="font-heading text-7xl leading-none text-[color:var(--accent)] sm:text-8xl">
                {stat.value}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-[color:var(--muted)]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-16 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
              First batch
            </p>
            <p className="text-[16px] leading-[2.05] text-[color:var(--muted)] sm:text-lg" style={MALAYALAM}>
              {FIRST_YEAR}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
              Volunteers
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              {SCHEDULE.map((item) => (
                <div
                  key={item.label}
                  className="border-2 border-dashed border-[color:var(--ink)] px-4 py-2"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    {item.label}
                  </p>
                  <p className="mt-1 font-heading text-2xl uppercase leading-none" style={MALAYALAM}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[16px] leading-[2.05] text-[color:var(--muted)] sm:text-lg" style={MALAYALAM}>
              {VOLUNTEERS}
            </p>
          </Reveal>
        </div>

        <div className="pb-20 sm:pb-28">
          <PhotoMasonry
            className="columns-1 gap-3 sm:columns-3 lg:gap-4"
            photos={[
              { id: "thrive-2", alt: "Students seated in a hall during a THRIVE session" },
              { id: "thrive-3", alt: "A speaker addressing students at a THRIVE class" },
              { id: "thrive-4", alt: "Large group of students in white shirts seated together outdoors" },
            ]}
          />
        </div>
      </Container>

      <div className="relative h-[clamp(7rem,20vw,14rem)] overflow-hidden border-t-2 border-[color:var(--ink)]">
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[clamp(4rem,14vw,11rem)] uppercase leading-none ${OUTLINE}`}
        >
          Aim Higher
        </span>
      </div>
    </ReportSection>
  );
}
