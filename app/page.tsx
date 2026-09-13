import { SecA } from "@/components/pages/main/sec-a";
import { SecB } from "@/components/pages/main/sec-b";
import { SecC } from "@/components/pages/main/sec-c";
import { SecD } from "@/components/pages/main/sec-d";
import { SecE } from "@/components/pages/main/sec-e";
import { SecF } from "@/components/pages/main/sec-f";
import { SecG } from "@/components/pages/main/sec-g";
import { TimeDilation } from "@/components/pages/main/time-dilation";
import { ClockEssay } from "@/components/pages/main/clock-essay";
import { TickTickTick } from "@/components/pages/main/tick-tick-tick";
import { VersionZero } from "@/components/pages/main/version-zero";
import { WritingEraAi } from "@/components/pages/main/writing-era-ai";
import { Manam } from "@/components/pages/main/manam";
import { ShedBeProud } from "@/components/pages/main/shed-be-proud";
import { Theyyam } from "@/components/pages/main/theyyam";
import { RuiningRumours } from "@/components/pages/main/ruining-rumours";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#d9d4c7]">
      <SecA />
      <SecB />
      <SecC />
      {/* <SecD /> */}
      <SecE />
      <SecG />
      <TimeDilation />
      <ClockEssay />
      <TickTickTick />
      <VersionZero />
      <WritingEraAi />
      <Manam />
      <ShedBeProud />
      <Theyyam />
      <RuiningRumours />
    </main>
  );
}
