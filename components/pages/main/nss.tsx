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
  paper: "#f3eee4",
  ink: "#15193d",
  accent: "#c8281f",
  muted: "#15193dae",
  rule: "#15193d26",
};

const INTRO = [
  "During the academic year 2025–26, NSS Units 168 & 263 of Government Engineering College Wayanad carried out a broad programme of community service, campus development, health awareness, environmental action, humanitarian assistance, student engagement and social responsibility.",
  "The year brought together activities ranging from campus improvement and waste-management drives to community visits, technical service, food distribution, health awareness, volunteering initiatives, cultural programmes and student-oriented events. The activities reflect the NSS objective of learning through service and encouraging students to respond to community and institutional needs through collective action.",
  "This annual report records 59 programmes conducted during the year, with detailed profiles of the major programmes for which individual reports or supporting records were supplied.",
];

const CONCLUSION = [
  "The academic year 2025–26 was a year of varied service and active student participation for NSS Units 168 & 263 of Government Engineering College Wayanad. The consolidated record of 59 programmes demonstrates the breadth of the units’ engagement across campus development, community welfare, environmental responsibility, health awareness, humanitarian service, civic engagement and student activities.",
  "Major initiatives such as Punarjani, Canteen Renovation, Scrap Collection, Godhavari community interventions, Jeevanudaanam, Plastic Collection, Sustainability and Carbon Neutrality, food distribution and the Children Home Onam Celebration connected volunteerism with practical outcomes. The documented Punarjani programme reclaimed public property worth ₹1.15 lakh, while the three Jeevanudaanam programmes together recorded 160 successful blood donations.",
  "The year also provided opportunities for volunteers to participate in civic and educational initiatives, environmental action, sports, cultural activities and meaningful interactions with children and communities. Through these experiences, NSS continued to provide a platform for students to learn through service and translate collective effort into socially useful action.",
];

const PROGRAMMES: { name: string; photos: ReportPhotoItem[] }[] = [
  {
    name: "Canteen Renovation",
    photos: [
      { id: "nss-canteen-1", alt: "Volunteer painting a mural on the renovated canteen wall" },
      { id: "nss-canteen-2", alt: "Cartoon face painted on the canteen wall" },
      { id: "nss-canteen-3", alt: "Volunteers painting a quote on the canteen wall" },
    ],
  },
  {
    name: "Scrap Collection",
    photos: [{ id: "nss-scrap", alt: "NSS volunteers with collected plastic waste bags and a banner" }],
  },
  {
    name: "Punarjani",
    photos: [
      { id: "nss-punarjani-1", alt: "Volunteers handling a hospital bed during Punarjani" },
      { id: "nss-punarjani-2", alt: "Newspaper coverage of the Punarjani programme" },
    ],
  },
  {
    name: "Jeevanudaanam",
    photos: [
      { id: "nss-blood-1", alt: "A student donating blood at the Jeevanudaanam camp" },
      { id: "nss-blood-2", alt: "A volunteer assisting a blood donor" },
      { id: "nss-blood-3", alt: "Volunteers gathered behind a Red Ribbon Club GECW Wayanad banner" },
    ],
  },
  {
    name: "Hearing Aid Handover",
    photos: [
      { id: "nss-hearing-aid-1", alt: "Newspaper clipping on the hearing aid handover" },
      { id: "nss-hearing-aid-2", alt: "Handover of hearing aids reported in the press" },
    ],
  },
  {
    name: "Godhavari Electrification",
    photos: [{ id: "nss-godhavari", alt: "Poster of the Godhavari electrification programme by NSS units 168 & 263" }],
  },
  {
    name: "Hridayapoorvam Pothichoru",
    photos: [
      { id: "nss-pothichoru-1", alt: "Volunteers packing food parcels" },
      { id: "nss-pothichoru-2", alt: "Volunteers carrying food parcels for distribution" },
    ],
  },
  {
    name: "Plastic Collection",
    photos: [{ id: "nss-plastic", alt: "Volunteers walking along a road collecting plastic waste" }],
  },
  {
    name: "Sustainability and Carbon Neutrality",
    photos: [{ id: "nss-carbon", alt: "Participants of the sustainability and carbon neutrality session in a hall" }],
  },
  {
    name: "Annual Sports Meet",
    photos: [{ id: "nss-sports-meet", alt: "Students running on the track during the annual sports meet" }],
  },
  {
    name: "Voters Day",
    photos: [
      { id: "nss-voters-day-1", alt: "Students seated in an auditorium for National Voters Day" },
      { id: "nss-voters-day-2", alt: "Students and officials at the Voters Day programme" },
    ],
  },
  {
    name: "Anganwadi Visit",
    photos: [{ id: "nss-anganwadi", alt: "Volunteers with a tricolour banner and children at an anganwadi" }],
  },
  {
    name: "Clothes Collection",
    photos: [{ id: "nss-clothes", alt: "Volunteers sorting collected clothes" }],
  },
  {
    name: "Children Home Onam Celebration",
    photos: [{ id: "nss-onam", alt: "Children gathered at the children’s home for Onam celebration" }],
  },
];

const GRID_COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1 sm:max-w-xl",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

export function Nss() {
  return (
    <ReportSection id="sec-nss" tone={TONE}>
      <Container>
        <Rail left="National Service Scheme" right="Clubs & Activities / 05" />

        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <Kicker>Units 168 &amp; 263 · 2025–26</Kicker>
            <h2 className="font-heading text-[clamp(7rem,22vw,20rem)] uppercase leading-[0.72] tracking-[-0.02em] text-[color:var(--accent)]">
              NSS
            </h2>
            <p className="mt-6 max-w-md font-serif text-2xl italic leading-snug sm:text-3xl">
              Learning through service.
            </p>
          </Reveal>
          <div className="space-y-5 text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
            {INTRO.map((text, index) => (
              <Reveal key={index} y={16} delay={index * 0.05}>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pb-16 sm:grid-cols-3 sm:gap-10 sm:pb-24">
          <Reveal><Stat value="59" label="Programmes recorded" /></Reveal>
          <Reveal delay={0.08}><Stat value="160" label="Successful blood donations" /></Reveal>
          <Reveal delay={0.16}><Stat value="₹1.15L" label="Public property reclaimed · Punarjani" /></Reveal>
        </div>

        <div className="border-t border-[color:var(--rule)]">
          {PROGRAMMES.map((programme, index) => (
            <div
              key={programme.name}
              className="grid gap-6 border-b border-[color:var(--rule)] py-10 md:grid-cols-[16rem_1fr] md:gap-12 md:py-14"
            >
              <Reveal y={12}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-heading text-3xl uppercase leading-[0.95] sm:text-4xl">{programme.name}</h3>
              </Reveal>
              <div className={`grid grid-cols-1 items-start gap-3 sm:gap-4 ${GRID_COLUMNS[programme.photos.length]}`}>
                {programme.photos.map((photo, photoIndex) => (
                  <Reveal key={photo.id} delay={photoIndex * 0.07} y={18}>
                    <ReportPhoto {...photo} sizes="(max-width: 768px) 100vw, 30vw" />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
          <Reveal>
            <h3 className="font-heading text-5xl uppercase leading-[0.9] sm:text-6xl">
              Conclusion
              <span className="block text-[color:var(--accent)]">2025–26</span>
            </h3>
          </Reveal>
          <div className="space-y-5 text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
            {CONCLUSION.map((text, index) => (
              <Reveal key={index} y={16}>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </ReportSection>
  );
}
