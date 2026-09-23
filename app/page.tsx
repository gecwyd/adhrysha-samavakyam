import { ReleaseGate } from "@/components/pages/main/release-gate";
import { ComingSoon } from "@/components/pages/main/coming-soon";
import { SecA } from "@/components/pages/main/sec-a";
import { SecB } from "@/components/pages/main/sec-b";
import { SecC } from "@/components/pages/main/sec-c";
import { SayNoToDrugs } from "@/components/pages/main/say-no-to-drugs";
import { AdrishyaBhasha } from "@/components/pages/main/adrishya-bhasha";
import { ShortFilm } from "@/components/pages/main/short-film";
import { TimeDilation } from "@/components/pages/main/time-dilation";
import { ClockEssay } from "@/components/pages/main/clock-essay";
import { TickTickTick } from "@/components/pages/main/tick-tick-tick";
import { VersionZero } from "@/components/pages/main/version-zero";
import { WritingEraAi } from "@/components/pages/main/writing-era-ai";
import { Manam } from "@/components/pages/main/manam";
import { ShedBeProud } from "@/components/pages/main/shed-be-proud";
import { Theyyam } from "@/components/pages/main/theyyam";
import { KaliStory } from "@/components/pages/main/kali-story";
import { RuiningRumours } from "@/components/pages/main/ruining-rumours";
import { Thamodwaram } from "@/components/pages/main/thamodwaram";
import { SocialMedia } from "@/components/pages/main/social-media";
import { CurseOfHope } from "@/components/pages/main/curse-of-hope";
import { OruMudanthan } from "@/components/pages/main/oru-mudanthan";
import { StitchedWings } from "@/components/pages/main/stitched-wings";
import { Dowry } from "@/components/pages/main/dowry";
import { HumanityBeyondWar } from "@/components/pages/main/humanity-beyond-war";
import { Waterlines } from "@/components/pages/main/waterlines";
import { Iruttu } from "@/components/pages/main/iruttu";
import { Nanmayude } from "@/components/pages/main/nanmayude";
import { TheGirlWhoDances } from "@/components/pages/main/the-girl-who-dances";
import { ShadowOfWar } from "@/components/pages/main/shadow-of-war";
import { MistyPathsStory } from "@/components/pages/main/misty-paths-story";
import { MistyPaths } from "@/components/pages/main/misty-paths";
import { LastBench } from "@/components/pages/main/last-bench";
import { RootsAndWings } from "@/components/pages/main/roots-and-wings";
import { InTheirImage } from "@/components/pages/main/in-their-image";
import { SeedsOfLight } from "@/components/pages/main/seeds-of-light";
import { FatherPoem } from "@/components/pages/main/father-poem";
import { BloodlessReligion } from "@/components/pages/main/bloodless-religion";
import { LastTree } from "@/components/pages/main/last-tree";
import { PromiseWeMustKeep } from "@/components/pages/main/promise-we-must-keep";
import { ChipHappens } from "@/components/pages/main/chip-happens";
import { QuantumEntanglement } from "@/components/pages/main/quantum-entanglement";
import { QuantumEntanglementStory } from "@/components/pages/main/quantum-entanglement-story";
import { Wormhole } from "@/components/pages/main/wormhole";
import { WormholeStory } from "@/components/pages/main/wormhole-story";
import { WormholeEssay } from "@/components/pages/main/wormhole-essay";
import { ArtworksGallery } from "@/components/pages/main/artworks-gallery";
import { Decibel } from "@/components/pages/main/decibel";
import { DrawingClub } from "@/components/pages/main/drawing-club";
import { IliadLiteratureClub } from "@/components/pages/main/iliad-literature-club";
import { MonochromeFilmClub } from "@/components/pages/main/monochrome-film-club";
import { Nss } from "@/components/pages/main/nss";
import { Ieee } from "@/components/pages/main/ieee";
import { Iste } from "@/components/pages/main/iste";
import { Exorque } from "@/components/pages/main/exorque";
import { Sae } from "@/components/pages/main/sae";
import { Gbot } from "@/components/pages/main/gbot";
import { Orion } from "@/components/pages/main/orion";
import { Aeronauts } from "@/components/pages/main/aeronauts";
import { Iedc } from "@/components/pages/main/iedc";
import { BhoomithraSena } from "@/components/pages/main/bhoomithra-sena";
import { Thrive } from "@/components/pages/main/thrive";
import { StudentProjects } from "@/components/pages/main/student-projects";
import { Sports } from "@/components/pages/main/sports";
import { CheruvayalRaman } from "@/components/pages/main/cheruvayal-raman";
import { NonTeachingStaff } from "@/components/pages/main/non-teaching-staff";
import { Closing } from "@/components/pages/main/closing";
import { Sathva } from "@/components/pages/main/sathva";

export default function Home() {
  const magazine = (
    <main className="w-full min-h-screen flex flex-col bg-[#d9d4c7] overflow-x-clip">
      <SecA />
      <SecB />
      <SecC />
      <SayNoToDrugs />
      <AdrishyaBhasha />
      <CheruvayalRaman />
      <ShortFilm
        id="sec-h-film"
        video="time-dilation.webm"
        poster="time-dilation-poster.webp"
        kicker="Before the Physics"
        title="A Short Film"
        hook="Old rooms, old messages — a story about what time leaves behind."
        bg="#191713"
        text="#d9d4c7"
        accent="#a84e2a"
      />
      <TimeDilation />
      <ClockEssay />
      <TickTickTick />
      <VersionZero />
      <WritingEraAi />
      <Manam />
      <ShedBeProud />
      <Theyyam />
      <KaliStory />
      <RuiningRumours />
      <ShortFilm
        id="sec-q-film"
        video="black-hole.webm"
        poster="black-hole-poster.webp"
        kicker="Before the Essay"
        title="A Short Film"
        hook="A quiet look at the black holes we carry within."
        bg="#000000"
        text="#e6e0d3"
        accent="#d99065"
      />
      <Thamodwaram />
      <SocialMedia />
      <CurseOfHope />
      <OruMudanthan />
      <StitchedWings />
      <Dowry />
      <HumanityBeyondWar />
      <Waterlines />
      <Iruttu />
      <Nanmayude />
      <TheGirlWhoDances />
      <ShadowOfWar />
      <Wormhole />
      <WormholeStory />
      <WormholeEssay />
      <MistyPathsStory />
      <MistyPaths />
      <LastBench />
      <RootsAndWings />
      <ChipHappens />
      <QuantumEntanglement />
      <QuantumEntanglementStory />
      <InTheirImage />
      <SeedsOfLight />
      <FatherPoem />
      <BloodlessReligion />
      <LastTree />
      <PromiseWeMustKeep />
      <ArtworksGallery />
      <NonTeachingStaff />
      <Decibel />
      <DrawingClub />
      <IliadLiteratureClub />
      <MonochromeFilmClub />
      <Nss />
      <Ieee />
      <Iste />
      <Exorque />
      <Sae />
      <Gbot />
      <Orion />
      <Aeronauts />
      <Iedc />
      <BhoomithraSena />
      <Thrive />
      <StudentProjects />
      <Sports />
      <Sathva />
      <Closing />
    </main>
  );

  if (process.env.NODE_ENV === "development") {
    return magazine;
  }

  return (
    <ReleaseGate>
      {magazine}
    </ReleaseGate>
  );
}
