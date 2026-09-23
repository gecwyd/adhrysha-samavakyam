"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const PARAGRAPHS = [
  "ഇന്ന് നമ്മുടെ സമൂഹം വിദ്യാഭ്യാസത്തിലും സാങ്കേതികവിദ്യയിലും ജീവിത നിലവാരത്തിലും വളരെയധികം മുന്നേറിയിട്ടുണ്ട്. എന്നാൽ ഇത്രയും പുരോഗതി ഉണ്ടായിട്ടും സ്ത്രീധനം എന്ന ദുരാചാരം ഇന്നും സമൂഹത്തിൽ നിലനിൽക്കുന്നു. അതുകൊണ്ടാണ് സ്ത്രീധനത്തെ പുരോഗതിയുടെ മറവിലെ പഴഞ്ചൻ ചങ്ങല എന്ന് വിശേഷിപ്പിക്കുന്നത്. വിവാഹസമയത്ത് വധുവിന്റെ വീട്ടുകാർ വരന്റെ വീട്ടുകാർക്ക് പണം, സ്വർണം, വാഹനം, ഭൂമി തുടങ്ങിയവ നൽകുന്ന രീതിയാണ് സ്ത്രീധനം. ഇത് ഒരു ആചാരമെന്ന പേരിൽ തുടരുന്നുണ്ടെങ്കിലും യഥാർത്ഥത്തിൽ ഇത് സ്ത്രീകളോടുള്ള അനീതിയാണ്.",
  "സ്ത്രീധനം കാരണം നിരവധി കുടുംബങ്ങൾ സാമ്പത്തിക ബുദ്ധിമുട്ടുകൾ നേരിടുന്നു. മകളുടെ വിവാഹത്തിനായി മാതാപിതാക്കൾ കടം വാങ്ങുകയും ജീവിതകാല സമ്പാദ്യം ചെലവഴിക്കുകയും ചെയ്യുന്നു. പല കുടുംബങ്ങളും ഇതുമൂലം കടബാധ്യതകളിൽ അകപ്പെടുന്നു. കേരളത്തെ ഞെട്ടിച്ച വിസ്മയ എന്ന പെൺകുട്ടിയുടെ സംഭവം സ്ത്രീധനത്തിന്റെ ഭീകരത സമൂഹത്തിന് മുന്നിൽ തുറന്നുകാട്ടിയ ഒന്നായിരുന്നു. ഉന്നത വിദ്യാഭ്യാസം നേടിയ ഒരു യുവതിക്ക് പോലും സ്ത്രീധനത്തിന്റെ പേരിൽ പീഡനങ്ങൾ നേരിടേണ്ടി വന്നത് ഈ ദുരാചാരം എത്രമാത്രം ആഴത്തിൽ സമൂഹത്തിൽ വേരൂന്നിയിട്ടുണ്ടെന്ന് കാണിക്കുന്നു. ആ സംഭവം കേരള സമൂഹത്തിന് വലിയൊരു തിരിച്ചറിവും മുന്നറിയിപ്പും ആയിരുന്നു.",
  "വിവാഹശേഷവും കൂടുതൽ സ്ത്രീധനം ആവശ്യപ്പെട്ട് പല സ്ത്രീകളും മാനസികവും ശാരീരികവുമായ പീഡനങ്ങൾ അനുഭവിക്കുന്നു. ചിലർക്ക് സ്വന്തം വീട്ടിൽ പോലും സുരക്ഷിതമായി ജീവിക്കാൻ കഴിയാത്ത അവസ്ഥ വരുന്നു. കുടുംബ തർക്കങ്ങൾ, വിവാഹമോചനം, ആത്മഹത്യകൾ തുടങ്ങിയ പല ദുരന്തങ്ങൾക്കും സ്ത്രീധനം കാരണമാകുന്നു. സ്ത്രീധനം സ്ത്രീകളുടെ ആത്മാഭിമാനത്തെയും സ്വാതന്ത്ര്യത്തെയും ബാധിക്കുന്നു. സ്ത്രീയും പുരുഷനും തുല്യരാണെന്ന് പറയുന്ന സമൂഹത്തിൽ സ്ത്രീധനം പോലുള്ള ആചാരങ്ങൾക്ക് സ്ഥാനമില്ല.",
  "നിയമം സ്ത്രീധനത്തെ നിരോധിച്ചിട്ടുണ്ടെങ്കിലും അത് പൂർണമായും ഇല്ലാതായിട്ടില്ല. അതിനാൽ നിയമത്തോടൊപ്പം സമൂഹത്തിന്റെ മനോഭാവവും മാറണം. സ്ത്രീധനം വാങ്ങുകയോ നൽകുകയോ ചെയ്യില്ലെന്ന് ഓരോ യുവാവും യുവതിയും തീരുമാനിക്കണം. ഒരു വിദ്യാർത്ഥി എന്ന നിലയിൽ, സ്ത്രീധനം വാങ്ങുന്നതും നൽകുന്നതും ഒരുപോലെ തെറ്റാണെന്ന് ഞാൻ വിശ്വസിക്കുന്നു.",
];

function P({ children }: { children: string }) {
  return (
    <p
      className="mb-12 font-serif text-[1.15rem] font-light leading-[2.2] tracking-wide text-[#d5d9e2] md:text-[1.25rem] md:leading-[2.4]"
      lang="ml"
    >
      {children}
    </p>
  );
}

export function Dowry() {
  return (
    <section
      id="sec-dowry"
      className="relative w-full bg-[#111827] text-[#f8fafc]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#111827]">
            <div className="absolute inset-0 bg-[#e11d48]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#111827]/60 lg:to-[#111827]" />
            <Image
              src={resolveAsset("dowry-balance.webp")}
              alt="A balance scale weighing books against gold beside a woman"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fb7185]">
              Opinion · 08
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#f8fafc] uppercase xl:text-7xl">
              Dowry<br />
              <span className="text-[#e11d48]">Ends.</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#d5d9e2]/70" lang="ml">
              സ്ത്രീധനം: പുരോഗതിയുടെ മറവിലെ പഴഞ്ചൻ ചങ്ങല
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Article */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-2xl">
            <P>{PARAGRAPHS[0]}</P>

            <div className="my-16 border-l-2 border-[#e11d48]/70 bg-gradient-to-r from-[#e11d48]/5 to-transparent py-10 pl-8 md:my-24 md:pl-12">
              <p className="font-serif text-2xl font-light italic leading-relaxed text-[#fb7185] md:text-3xl lg:text-4xl" lang="ml">
                "ഒരു പെൺകുട്ടിയുടെ കഴിവിനോ വിദ്യാഭ്യാസത്തിനോ പകരം അവൾക്ക് നൽകാൻ കഴിയുന്ന സ്ത്രീധനത്തിന്റെ അളവാണ് പലപ്പോഴും വിലയിരുത്തപ്പെടുന്നത്."
              </p>
            </div>

            {PARAGRAPHS.slice(1).map((paragraph, index) => (
              <P key={index}>{paragraph}</P>
            ))}
          </article>
        </div>
      </div>

      {/* Finale & Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#e11d48]/10 bg-[#111827] px-6 py-32 text-center md:py-48">
        
        <div className="mb-32 max-w-4xl">
          <p className="mb-10 font-serif text-3xl font-light leading-[1.7] text-[#f8fafc] md:text-5xl" lang="ml">
            സ്ത്രീയെ സ്വർണത്തിന്റെയോ പണത്തിന്റെയോ അടിസ്ഥാനത്തിൽ വിലയിരുത്തുന്ന മനോഭാവം മാറണം.
          </p>
          <p className="font-serif text-lg font-light leading-[2] text-white/55 md:text-2xl" lang="ml">
            വിദ്യാഭ്യാസവും പുരോഗതിയും യഥാർത്ഥ അർഥത്തിൽ നേടണമെങ്കിൽ സ്ത്രീധനം എന്ന പഴഞ്ചൻ ചങ്ങല പൊട്ടിച്ചെറിയണം. സ്ത്രീധനം അവസാനിപ്പിക്കേണ്ട ഒരു സാമൂഹിക ദുരാചാരമാണ്.
          </p>
          <p className="mt-16 font-serif text-2xl font-normal leading-[1.5] text-[#fb7185] md:text-4xl" lang="ml">
            സ്ത്രീയുടെ മൂല്യം സ്വർണത്തിലും പണത്തിലും അല്ല,<br/>അവളുടെ വ്യക്തിത്വത്തിലും കഴിവുകളിലുമാണ്.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-[#e11d48]/10 pt-24 w-full">
          <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#e11d48]/30 bg-[#e11d48]/10 p-1 md:h-32 md:w-32">
            <div className="h-full w-full overflow-hidden rounded-full">
              <Image 
                src={resolveAsset("shaheer.webp")} 
                alt="അഹമ്മദ് ഷഹീർ" 
                width={128} 
                height={128} 
                className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
                unoptimized
              />
            </div>
          </div>
          <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fb7185]">
            Written by
          </span>
          <h3 className="font-serif text-2xl text-[#f8fafc] md:text-4xl" lang="ml">
            അഹമ്മദ് ഷഹീർ
          </h3>
          <p className="mt-2 font-sans text-sm tracking-widest uppercase text-white/50 md:text-base" lang="ml">
            രണ്ടാം വർഷം, മെക്കാനിക്കൽ എഞ്ചിനീയറിങ്
          </p>
        </div>
      </div>
    </section>
  );
}
