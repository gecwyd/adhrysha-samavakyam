"use client";

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

const PHASES = [
  { label: "ഘട്ടം 1", range: "ജനുവരി 1, 2024- മാർച്ച്‌ 31,2024" },
  { label: "ഘട്ടം 2", range: "ഏപ്രിൽ 1,2024-മെയ്‌ 15,2024" },
  { label: "ഘട്ടം 3", range: "ജൂൺ 1,2024-ഫെബ്രുവരി 28,2025" },
];

const FIRST_YEAR =
  "2024 ൽ ആണ് ത്രൈവ് ആദ്യമായി ഗവണ്മെന്റ് എഞ്ചിനീയറിംഗ് കോളേജിൽ നടക്കുന്നത്. 33 വിദ്യാർത്ഥികൾ അടങ്ങുന്ന ടീമാണ് ആദ്യമായി പ്രവർത്തനത്തിൽ പങ്കെടുത്തത്. തിരുനെല്ലി, നല്ലൂർനാട് എന്നീ രണ്ട് MRS ൽ ആയിരുന്നു ആദ്യ പ്രവർത്തനം ആരംഭിച്ചത്.";

const VOLUNTEERS =
  "വിദ്യാർത്ഥികളുമായി ഇടപ്പെട്ട് പൊതുവിവരങ്ങളും, നിർദേശിക്കപ്പെട്ട വിഷയങ്ങളിൽ വ്യക്തത വരുത്തുകയാണ് ഓരോ വോളന്റീയറുടെയും ചുമതല. ഓരോ സന്ദർശനത്തിലും വിദ്യാർഥികൾ അനുകൂലമായ മാറ്റങ്ങൾ പ്രകടിപ്പിച്ചിരുന്നു. ഇത് വോളന്റീയേഴ്സിന് കൂടുതൽ പ്രജോദനമായി. കൂടാതെ വോളന്റീയെഴ്സിന് ഇത് നല്ല മാറ്റങ്ങൾ സമ്മാനിച്ചു.ശനിയാഴ്ചകളിലാണ് കൂടുതൽ ക്ലാസുകൾ നടക്കാറുള്ളത്. 8 മുതൽ 10 വരെ ഉള്ള വിദ്യാർത്ഥികൾക്കാണ് ക്ലാസുകൾ നടത്താറുള്ളത്. പൊതുജ്ഞാനം, വിനോദ വിജ്ഞാന പരിപാടികളും അടങ്ങുന്ന ക്ലാസുകൾ 9:30 മുതൽ 12:30 വരെയാണ് നടക്കുന്നത്. ഇതിൽ വിദ്യാർത്ഥികളുടെ കഴിവുകൾ മെച്ചപ്പെടുത്താനുള്ള പ്രവർത്തനങ്ങൾക്ക് കൂടുതൽ മുൻഗണന നൽകിയിട്ടുണ്ട്.";

const MALAYALAM = { fontFamily: "var(--font-malayalam), 'Noto Sans Malayalam', sans-serif" };

export function Thrive() {
  return (
    <ReportSection id="sec-thrive" tone={TONE}>
      <Container>
        <Rail left="THRIVE" right="Clubs & Activities / 15" />

        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <Kicker>ത്രൈവ് · 2024–25</Kicker>
            <h2 className="font-heading text-[clamp(6rem,19vw,17rem)] uppercase leading-[0.78] tracking-[-0.01em]">
              Thr<span className="text-[color:var(--accent)]">ive</span>
            </h2>
            <p className="mt-6 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.26em] text-[color:var(--muted)]">
              ({SUBTITLE})
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ReportPhoto
              id="thrive-1"
              alt="Volunteers and students gathered in front of a tiled-roof building"
              ratio="4 / 3"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Reveal>
        </div>

        <div className="grid gap-10 border-t border-[color:var(--rule)] py-16 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24" style={MALAYALAM}>
          <Reveal>
            <h3 className="font-heading text-4xl uppercase leading-none sm:text-5xl">
              The idea
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[17px] leading-[2.05] sm:text-xl">{INTRO}</p>
          </Reveal>
        </div>

        <div className="grid border-y border-[color:var(--rule)] md:grid-cols-3 md:divide-x md:divide-[color:var(--rule)]" style={MALAYALAM}>
          {PHASES.map((phase, index) => (
            <Reveal key={phase.label} delay={index * 0.08} className="p-6 sm:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                Phase {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-2xl font-medium leading-snug">{phase.label}</p>
              <p className="mt-2 text-lg leading-relaxed text-[color:var(--muted)]">{phase.range}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20" style={MALAYALAM}>
          <Reveal>
            <p className="text-[16px] leading-[2.05] text-[color:var(--muted)] sm:text-lg">{FIRST_YEAR}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[16px] leading-[2.05] text-[color:var(--muted)] sm:text-lg">{VOLUNTEERS}</p>
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
    </ReportSection>
  );
}
