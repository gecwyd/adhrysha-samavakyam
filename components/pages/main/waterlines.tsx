"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STANZAS = [
  [
    "തനിച്ചീ കാറ്റിൻ പടിയിൽ",
    "ഞാൻ നീറുമാ പ്രണയമോർക്കവേ",
    "പ്രണയം പറഞ്ഞു നീ പലപ്പോഴും",
    "വിശ്വസിച്ചു ഞാൻ ആ വാക്കുകൾ",
    "പ്രണയം നടിച്ചു നീ പലപ്പോഴും",
    "കവർന്നിരുന്നു എന്റെ ഹൃദയത്തെ",
    "നിൻ വാക്കുകളിൽ ഞാൻ മന്ദമാം",
    "പ്രണയത്താൽ ലയിച്ചുപോയീടവെ.",
  ],
  [
    "ആ അന്ധപ്രണയത്തിൽ ഞാൻ",
    "സർവ്വം നിനക്കായ് തന്നു പോയ്",
    "നിൻ പ്രണയം അതെൻ",
    "ഹൃദയത്തിൽ മാത്രമെന്ന് കരുതവേ",
    "ഒരുമിക്കും നാം ആ രാത്രിയിൽ",
    "നീ എൻ ഹൃദയത്തിൽ ദൃഢമാക്കി",
    "നീ എന്റേതു മാത്രമെന്ന്",
  ],
  [
    "എന്നാൽ ഏതോ ഒരു കാറ്റിൻ പടിയിൽ",
    "നീ അകറ്റിചൊന്നു ഞാൻ ചണ്ടിയെന്ന്",
    "ഞാൻ വെറും വേശ്യയെന്ന്",
    "എന്നാൽ ഓർക്കാതെ പോയ് നീ",
    "എന്നെ ചണ്ടിയാക്കിയതു നീ തന്നെയെന്ന്",
    "എന്നോട് ചേർത്തു വക്കാനായ്",
    "എൻ ശരീരം പോലും കവർന്നു നീ",
    "പലപ്പോഴും നീ പറഞ്ഞ നിന്നിലെ",
    "പ്രണയം ഇന്നെവിടെ",
  ],
  [
    "ഇന്നീക്കാറ്റിൻ പടിയിൽ ഇരിക്കുമ്പോൾ",
    "ഞാൻ അറിയുന്നു.",
    "നിന്നിലെ എന്നോടുള്ള പ്രണയം",
  ],
];

function Stanza({ lines, highlightedLine }: { lines: string[], highlightedLine?: string }) {
  return (
    <div className="mb-24 text-lg font-light leading-[2.2] tracking-wide text-[#e0f2fe] md:text-2xl md:leading-[2.4] italic font-serif" lang="ml">
      {highlightedLine && (
        <p className="mb-8 block text-2xl text-[#38bdf8] not-italic lg:text-4xl">
          {highlightedLine}
        </p>
      )}
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
}

export function Waterlines() {
  return (
    <section 
      id="sec-waterlines" 
      className="relative w-full bg-[#061325] text-[#e0f2fe]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#061325]">
            <div className="absolute inset-0 bg-[#38bdf8]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061325] via-[#061325]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#061325]/60 lg:to-[#061325]" />
            <Image
              src={resolveAsset("waterlines-moonlit.webp")}
              alt="A woman beside moonlit water as a letter dissolves into ripples"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#38bdf8]">
              Poetry · 10
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#e0f2fe] uppercase xl:text-7xl">
              Water<br />
              <span className="text-[#38bdf8]">Lines.</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#e0f2fe]/70" lang="ml">
              ജലരേഖകൾ
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Poem */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-xl">
            {STANZAS.map((stanza, index) => (
              <Stanza 
                key={index} 
                lines={stanza} 
              />
            ))}
            
            <Stanza 
              highlightedLine="വെറും ജലരേഖകൾ മാത്രമെന്ന്"
              lines={[
                "അവ ഓളംവെട്ടി ഇളകിമറിയും",
                "നിശ്ചലസമയത്തിൽ അതു",
                "കാണാമറയത്താവുന്നു"
              ]} 
            />
          </article>
        </div>
      </div>

      {/* Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#38bdf8]/10 bg-[#061325] px-6 py-32 text-center md:py-40">
        <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#38bdf8]/30 bg-[#38bdf8]/10 p-1 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image 
              src={resolveAsset("anagha.webp")} 
              alt="അനഘ ടി. ജെ" 
              width={128} 
              height={128} 
              className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
              unoptimized
            />
          </div>
        </div>
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#38bdf8]">
          Written by
        </span>
        <h3 className="font-serif text-2xl text-[#e0f2fe] md:text-4xl" lang="ml">
          അനഘ ടി. ജെ
        </h3>
        <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#e0f2fe]/50 md:text-base" lang="ml">
          രണ്ടാം വർഷം, സിവിൽ എഞ്ചിനീയറിങ്
        </p>
      </div>
    </section>
  );
}
