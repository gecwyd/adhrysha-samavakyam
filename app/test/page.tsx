"use client";

import { useState } from "react";
import { ComingSoon } from "@/components/pages/main/coming-soon";
import { SecA } from "@/components/pages/main/sec-a";
import { SecB } from "@/components/pages/main/sec-b";
import { SecC } from "@/components/pages/main/sec-c";
import { TimeDilation } from "@/components/pages/main/time-dilation";
import { ClockEssay } from "@/components/pages/main/clock-essay";
import { TickTickTick } from "@/components/pages/main/tick-tick-tick";
import { VersionZero } from "@/components/pages/main/version-zero";
import { WritingEraAi } from "@/components/pages/main/writing-era-ai";
import { Manam } from "@/components/pages/main/manam";
import { ShedBeProud } from "@/components/pages/main/shed-be-proud";
import { Theyyam } from "@/components/pages/main/theyyam";
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
import { GecwMist } from "@/components/pages/main/gecw-mist";
import { MistyPathsStory } from "@/components/pages/main/misty-paths-story";
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

export default function TestPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "748596") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#d9d4c7] px-4 font-sans text-black">
        <div className="w-full max-w-sm p-8 bg-[#ebe7dc] border border-black/10 rounded-2xl shadow-xl flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl tracking-wider uppercase">
              Protected Access
            </h1>
            <p className="text-xs text-black/60 tracking-widest uppercase font-mono">
              Enter password to unlock
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="password"
              inputMode="numeric"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="••••••"
              autoFocus
              className="w-full text-center tracking-[0.3em] font-mono text-xl py-3 px-4 bg-white/80 border border-black/15 rounded-lg outline-none focus:border-black/50 transition-colors"
            />
            {error && (
              <p className="text-red-600 text-xs text-center font-medium">
                Incorrect password. Please try again.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg font-heading tracking-widest text-lg uppercase hover:bg-black/80 transition-colors cursor-pointer"
            >
              Unlock
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-[#d9d4c7] overflow-x-clip">
      <SecA />
      <SecB />
      <SecC />
      <TimeDilation />
      <ClockEssay />
      <TickTickTick />
      <VersionZero />
      <WritingEraAi />
      <Manam />
      <ShedBeProud />
      <Theyyam />
      <RuiningRumours />
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
      <GecwMist />
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
    </main>
  );
}
