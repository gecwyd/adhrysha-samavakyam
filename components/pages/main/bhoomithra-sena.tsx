"use client";

import {
  Container,
  Kicker,
  PhotoMasonry,
  Rail,
  ReportSection,
  Reveal,
  Timeline,
  type ReportTone,
  type TimelineItem,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#e9f0df",
  ink: "#12261a",
  accent: "#2c7a3f",
  muted: "#12261aab",
  rule: "#12261a26",
};

const INTRO =
  "The Bhoomithra Sena Club at Government Engineering College, Wayanad, turned environmental awareness into meaningful action during the academic year 2025–2026. Through field activities, conservation programmes and awareness sessions, students explored biodiversity, sustainable living and environmental responsibility.";

const CLOSING =
  "The activities of Bhoomithra Sena Club demonstrate that environmental conservation begins with small, collective actions. By stepping beyond classrooms and engaging directly with nature and communities, students learned not only to understand the environment, but also to become responsible friends of the Earth: Bhoomithras.";

const EVENTS: TimelineItem[] = [
  {
    date: "20–21 Jul 2025",
    title: "People’s Biodiversity Register",
    body: "The year began with the People’s Biodiversity Register (PBR) Programme at Thavinjal Panchayat, where students documented local flora, fauna, agricultural practices, water resources and traditional ecological knowledge in association with the Panchayat and Keystone Foundation.",
  },
  {
    date: "Begur–Thirunelli",
    title: "Eco Restoration",
    body: "The Eco Restoration Programme at Begur–Thirunelli Panchayat focused on removing invasive plants and planting native saplings, giving students hands-on experience in forest restoration.",
  },
  {
    date: "26 Aug 2025",
    title: "Tree Tagging Internship",
    body: "The Tree Tagging Internship Programme combined technology and conservation as students identified and digitally documented trees using the Tree Tagging App.",
  },
  {
    date: "Campus",
    title: "Campus Beautification",
    body: "Through the Campus Beautification Programme, students cleaned the campus, removed plastic waste and maintained green spaces.",
  },
  {
    date: "Thrissilery",
    title: "Vith Muthal Vipani Vare",
    body: "The Vith Muthal Vipani Vare Programme at Thrissilery introduced students to the complete journey of paddy, from seed selection and cultivation to harvesting, processing and marketing.",
  },
  {
    date: "22 Nov 2025",
    title: "Bird-Watching",
    body: "Nature became the classroom during the Bird-Watching Programme at Thirunelli Forest Range, where students learned about bird diversity and forest ecosystems.",
  },
  {
    date: "16 Jan 2026",
    title: "Carbon Neutrality Awareness",
    body: "The Carbon Neutrality Awareness Class explored carbon emissions, climate change, carbon-footprint assessment and sustainable practices.",
  },
  {
    date: "17 Jan 2026",
    title: "Brahmagiri Trekking & Nature Camp",
    body: "The Brahmagiri Trekking and Nature Camp offered students an opportunity to experience the Western Ghats while learning about forests, wildlife and conservation.",
  },
  {
    date: "7 Mar 2026",
    title: "Fire and Safety Awareness",
    body: "The Fire and Safety Awareness Class at Munneshwaram Kunn focused on forest-fire prevention, emergency response and basic firefighting.",
  },
  {
    date: "Competition",
    title: "Scrap to Craft",
    body: "Creativity met sustainability through the Scrap to Craft Competition, which promoted the principles of Reduce, Reuse and Recycle by transforming discarded materials into useful crafts.",
  },
  {
    date: "Makkimala",
    title: "School Garden Initiative",
    body: "The year concluded with the School Garden Initiative at Government School, Makkimala, encouraging students to practise gardening, cleanliness, organic farming and environmental responsibility.",
  },
];

export function BhoomithraSena() {
  return (
    <ReportSection id="sec-bhoomithra-sena" tone={TONE}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18vw] -top-[18vw] h-[52vw] w-[52vw] rounded-full bg-[var(--accent)] opacity-[0.1]"
      />
      <Container className="relative">
        <Rail left="Bhoomithra Sena Club" right="Clubs & Activities / 14" />

        <div className="py-16 sm:py-24">
          <Reveal>
            <Kicker>Where young minds meet the rhythm of nature</Kicker>
            <h2 className="font-heading text-[clamp(5rem,16vw,15rem)] uppercase leading-[0.8] tracking-[-0.01em]">
              Bhoomithra
              <span className="block pl-[0.15em] text-[color:var(--accent)]">Sena</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-3xl">
            <p className="font-serif text-xl leading-[1.7] text-[color:var(--muted)] sm:text-2xl">{INTRO}</p>
          </Reveal>
        </div>

        <Timeline items={EVENTS} />

        <div className="py-14 sm:py-20">
          <PhotoMasonry
            className="columns-1 gap-3 sm:columns-3 lg:gap-4"
            photos={[
              { id: "bhoomithra-1", alt: "Bhoomithra Sena members and guests posing together indoors" },
              { id: "bhoomithra-2", alt: "Students gathered in a green field during a field programme" },
              { id: "bhoomithra-3", alt: "Club members and mentors under decorated eaves" },
            ]}
          />
        </div>

        <Reveal className="mx-auto max-w-3xl border-t border-[color:var(--rule)] pb-20 pt-12 text-center sm:pb-28">
          <p className="font-serif text-xl italic leading-[1.7] sm:text-2xl">{CLOSING}</p>
        </Reveal>
      </Container>
    </ReportSection>
  );
}
