"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STANZAS = [
  ["യുദ്ധത്തിന്റെ നിഴലിൽ മിന്നലൊച്ച മുഴങ്ങുന്നു..", "തകർന്ന വാതിലുകൾക്കു പുറകിൽ", "സ്നേഹമിപ്പോഴും ചലിച്ചുകൊണ്ടേയിരിക്കുന്നുണ്ട്..", "നല്ല പാതിയെ കാത്തിരിക്കുന്ന ഹൃദയങ്ങളുണ്ട്..", "അവരിൽ നിന്നും അവസാന ശ്വാസവും", "അറ്റുപോകും വരെ പോരാട്ടം തുടർന്നുകൊണ്ടേയിരിക്കും.."],
  ["കളിപ്പാട്ടങ്ങൾ വീണ നിലങ്ങൾ", "ചിതറിത്തെറിച്ച് വിണ്ടുകീറി കിടക്കുന്നു.."],
  ["പ്രിയപ്പെട്ടവർക്കു നൽകിയ വാഗ്ദാനങ്ങൾ", "ദൂരങ്ങൾക്കപ്പുറം കേൾക്കുന്നുണ്ട്..", "ഭീതിയുടെ രാത്രികളിലും", "പ്രത്യാശയുടെ ചെറുകനലിൽ അവർ ചിരി കണ്ടെത്തി.."],
  ["നിറഞ്ഞ നിഷ്കളങ്കതയെ ഒരമ്മ", "യുദ്ധത്തിന്റെ ഭീകര ശബ്ദങ്ങളിൽ", "നിന്ന് തന്റെ താരാട്ടു കൊണ്ട് മറച്ചുപിടിക്കുന്നു.."],
  ["ഉള്ളിൽ തുടിച്ച ജീവനെയും കൊണ്ട്", "പാഞ്ഞ മറ്റൊരമ്മ സമാധാനത്തിന്റെ", "പുതുലോകം സ്വപ്നം കാണുന്നു..", "ഹൃദയത്തിൽ നിറച്ചും", "ഭയമാണെങ്കിലും നാളെയുടെ പുലരി സന്തോഷം നൽകുമെന്ന് വിശ്വസിച്ചുകൊണ്ട് ..", "അവളുടെ കണ്ണുനീർ ഒരു നദിപോലെ കാണപ്പെട്ടു.."],
  ["രക്തം നിറച്ച പേനകൾ കൊണ്ടവർ", "കവിതയെഴുതി ഒരിക്കലും", "മായ്ക്കാനാകാത്ത കവിതകൾ.."],
  ["ഇരുട്ട് പടരുന്നിടത്ത്, യുദ്ധത്തിന്റെ നിഴലിൽ,", "പ്രത്യാശയുടെ പാത തെളിയുന്നുണ്ട്..", "ഒന്നിനും തോൽപ്പിക്കാനാവാത്ത പ്രത്യാശയുടെ പാത..", "പ്രണയവും സൗഹൃദവും കുടുംബവും,"],
];

function Stanza({ lines, accent = false }: { lines: string[]; accent?: boolean }) {
  return (
    <div className={`mb-24 text-lg font-light leading-[2.2] tracking-wide md:text-2xl md:leading-[2.4] italic font-serif ${accent ? "text-[#f97316]" : "text-[#fafaf9]"}`} lang="ml">
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
}

export function ShadowOfWar() {
  return (
    <section 
      id="sec-shadow-of-war" 
      className="relative w-full bg-[#1c1917] text-[#fafaf9]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#1c1917]">
            <div className="absolute inset-0 bg-[#f97316]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#1c1917]/60 lg:to-[#1c1917]" />
            <Image
              src={resolveAsset("shadow-of-war-candle.webp")}
              alt="A candle glowing in a damaged room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#f97316]/75">
              Inquation / Poetry · 14
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#fafaf9] uppercase xl:text-7xl" lang="ml">
              യുദ്ധത്തിന്റെ<br />
              <span className="text-[#f97316]">നിഴലിൽ</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#fafaf9]/70">
              Where hope outlives the shadow.
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Poem */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-xl">
            {STANZAS.slice(0, 2).map((lines, index) => (
              <Stanza key={index} lines={lines} />
            ))}
            
            {STANZAS.slice(2, 6).map((lines, index) => (
              <Stanza key={index} lines={lines} />
            ))}
            
            <Stanza lines={STANZAS[6]} accent />
          </article>
        </div>
      </div>

      {/* Finale & Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#f97316]/10 bg-[#1c1917] px-6 py-32 text-center md:py-48">
        
        <div className="mb-32 max-w-4xl">
          <p className="mb-10 font-serif text-3xl font-light leading-[1.7] text-[#f97316] md:text-5xl italic" lang="ml">
            സമരത്തിന്റെ ഹൃദയത്തിൽ സദാ ശക്തമായിരിക്കും..!!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-[#f97316]/10 pt-24 w-full">
          <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#f97316]/30 bg-[#f97316]/10 p-1 md:h-32 md:w-32">
            <div className="h-full w-full overflow-hidden rounded-full">
              <Image 
                src={resolveAsset("hadin.webp")} 
                alt="ഹാദിൻ മുഹമ്മദ്" 
                width={128} 
                height={128} 
                className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
                unoptimized
              />
            </div>
          </div>
          <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#f97316]/70">
            Written by
          </span>
          <h3 className="font-serif text-2xl text-[#fafaf9] md:text-4xl" lang="ml">
            ഹാദിൻ മുഹമ്മദ്
          </h3>
          <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#fafaf9]/50 md:text-base" lang="ml">
            മൂന്നാം വർഷം, സിവിൽ എഞ്ചിനീയറിങ്
          </p>
        </div>
      </div>
    </section>
  );
}
