"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STANZAS = [
  ["അല്ലയോ പൂവേ!", "നീ ജന്മം നൽകും", "പൂമൊട്ടുകൾക്കെന്തൊരു കാന്തി!"],
  ["ചിത്രപതംഗം തേൻ നുകരുന്ന", "എളിമയാർന്ന ഗാത്രത്തിനുടമേ!", "ആരും കൊതിക്കുന്ന ശോഭയാൽ", "തിളങ്ങുന്ന മഹിതേ!"],
  ["നിൻ പൂമൊട്ടുകൾ ഉല്ലസിക്കുന്ന", "ആതപാർന്ന ഈ വേളയിൽ", "പകരൂ നീ നന്മ തൻ തൂവെളിച്ചം"],
  ["മർത്ത്യർ കൊതിക്കുന്ന കാന്തിയാർന്ന", "പ്രിയ ലളിതേ !", "വളർന്നു തുടങ്ങുന്ന പൂമൊട്ടുകൾ", "വിടരട്ടെ നന്മയുടെ വിരിഞ്ഞ പുഷ്പങ്ങളായ്"],
  ["പറയൂ പകരൂ നീ നന്മതൻ പ്രിയസ്വപ്നങ്ങൾ", "ക്വാണമോടംബര ഛായയിൽ", "വളരും മൊട്ടുകൾ വിടരട്ടേ നന്മയാൽ"],
];

function Stanza({ lines, accent = false }: { lines: string[]; accent?: boolean }) {
  return (
    <div className={`mb-24 text-lg font-light leading-[2.2] tracking-wide md:text-2xl md:leading-[2.4] italic font-serif ${accent ? "text-[#bef264]" : "text-[#ecfccb]"}`} lang="ml">
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
}

export function Nanmayude() {
  return (
    <section 
      id="sec-nanmayude" 
      className="relative w-full bg-[#052e16] text-[#ecfccb]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#052e16]">
            <div className="absolute inset-0 bg-[#bef264]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#052e16] via-[#052e16]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#052e16]/60 lg:to-[#052e16]" />
            <Image
              src={resolveAsset("buds-of-goodness.webp")}
              alt="Green flower buds in soft morning light"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#bef264]/75">
              Inquation / Poetry · 12
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#ecfccb] uppercase xl:text-7xl" lang="ml">
              നന്മയുടെ<br />
              <span className="text-[#bef264]">പൂമൊട്ടുകൾ</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#ecfccb]/70">
              Buds of goodness.
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Poem */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-xl">
            {STANZAS.slice(0, 2).map((lines, index) => (
              <Stanza key={index} lines={lines} />
            ))}
            
            <Stanza lines={STANZAS[2]} />
            <Stanza lines={STANZAS[3]} accent />
            <Stanza lines={STANZAS[4]} accent />
          </article>
        </div>
      </div>

      {/* Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#bef264]/10 bg-[#052e16] px-6 py-32 text-center md:py-40">
        <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#bef264]/30 bg-[#bef264]/10 p-1 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image 
              src={resolveAsset("eldho.webp")} 
              alt="ഏൽദോ പോൾ ഷാജൻ" 
              width={128} 
              height={128} 
              className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
              unoptimized
            />
          </div>
        </div>
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#bef264]/70">
          Written by
        </span>
        <h3 className="font-serif text-2xl text-[#ecfccb] md:text-4xl" lang="ml">
          ഏൽദോ പോൾ ഷാജൻ
        </h3>
        <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#ecfccb]/50 md:text-base" lang="ml">
          ഒന്നാം വർഷം, മെക്കാനിക്കൽ എഞ്ചിനീയറിങ്
        </p>
      </div>
    </section>
  );
}
