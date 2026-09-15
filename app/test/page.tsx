"use client";

import { useState } from "react";
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
import { Thamodwaram } from "@/components/pages/main/thamodwaram";

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
    <main className="w-full min-h-screen flex flex-col bg-[#d9d4c7]">
      <SecA />
      <SecB />
      <SecC />
      {/* <SecD /> */}
      {/* <SecE /> */}
      {/* <SecG /> */}
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
    </main>
  );
}
