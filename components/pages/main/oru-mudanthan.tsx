"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

function P({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return (
    <p
      className={`mb-12 font-light leading-[2.2] tracking-wide text-[#e8dac7] md:leading-[2.4] ${
        lead ? "text-xl md:text-2xl text-[#e6ba95]" : "text-[1.15rem] md:text-[1.25rem]"
      }`}
      lang="ml"
    >
      {children}
    </p>
  );
}

function Quote({ text }: { text: string }) {
  return (
    <div className="my-16 flex flex-col items-start justify-center border-l-2 border-[#e6ba95]/30 bg-gradient-to-r from-[#e6ba95]/5 to-transparent py-12 pl-8 md:my-24 md:pl-12">
      <p className="max-w-3xl font-sans text-2xl font-normal leading-relaxed text-[#e6ba95] italic md:text-4xl" lang="ml">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

export function OruMudanthan() {
  return (
    <section 
      id="sec-oru-mudanthan" 
      className="relative w-full bg-[#1c1814] text-[#e8dac7]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Cinematic Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#1c1814]">
            <div className="absolute inset-0 bg-[#e6ba95]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1814] via-[#1c1814]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#1c1814]/60 lg:to-[#1c1814]" />
            <Image
              src={resolveAsset("story-of-the-lame-man.webp")}
              alt="A man resting beside a Kerala roadside and sharing food with a stray dog at sunset"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-75 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#e6ba95]">
              Short Story · 06
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#e8dac7] uppercase xl:text-7xl">
              Story Of<br />
              <span className="text-[#e6ba95]">The Lame Man.</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#e8dac7]/70" lang="ml">
              ഒരു മുടന്തൻ പറഞ്ഞ കഥ
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Story */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-2xl font-serif">
            <P lead>
              നേരം ഉച്ചയവറായിരിക്കുന്നു. രാവിലെയും വിശപ്പകറ്റാൻ ഒന്നും കിട്ടിയില്ല. വയറിന്റെ തീവ്ര നവരസങ്ങൾ രാമുവിന് കേൾക്കാമായിരുന്നു. "വയ്യാ ഇനിയും എത്ര കാലം ഞാൻ ആരുടെയൊക്കെയോ എച്ചിൽ പാത്രങ്ങൾ പരതേണ്ടിയിരിക്കുന്നു? അവരുടെ ഭാവമാറ്റങ്ങൾ എന്നെ അലട്ടേണ്ടിയിരിക്കുന്നു?". പാതി നെരങ്ങിയും അല്ലെങ്കിൽ ഒരു വടിയെ താങ്ങുമായ് കൊണ്ടു നടന്നിരുന്ന രാമുവിന് ജീവിതത്തെക്കുറിച്ച് മറ്റ് പരാതികളും പരിഭവങ്ങളും ഉണ്ടായിരുന്നില്ല.
            </P>
            
            <P>
              ഇന്നലത്തെത്തിനേക്കാൾ വേദനയുണ്ടെങ്കിലും വിശപ്പിന്റെ കാഠിന്യം വേദനയെ ശമിപ്പിക്കാൻ കഴിവുള്ളതായിരിന്നു. എത്രമാത്രം സായാഹ്നങ്ങൾ കടന്നുപോയിരുന്നെങ്കിലും പിച്ചയെടുത്ത് ജീവിക്കുക എന്നത് രാമുവിന് ചിന്തിക്കാൻ പോലും കഴിയുമായിരുന്നില്ല. പണ്ട് മുതലേ അമ്മ പറഞ്ഞിട്ടുണ്ട് "ആരുടെ മുന്നിലും യാചിക്കരുതെന്ന്". അമ്മയെ കുറിച്ചാലോചിക്കുമ്പോൾ രാമുവിന്റെ കണ്ണ് കവിയാറുണ്ട്.
            </P>

            <Quote text="ഇനിയും എത്രകാലം ആളുകളുടെ നിസ്സഹായത നിറഞ്ഞ മുടന്തൻ എന്ന വിളി ഞാൻ കേൾക്കേണ്ടിയിരിക്കുന്നു?" />

            <P>
              രാമുവിന്റെ ഏഴാം വയസ്സിലാണ് അമ്മയുടെ വിടവാങ്ങൽ. അമ്മയുടെ മരണാനന്തരകർമ്മങ്ങൾക്ക് പോലും ആരും ഉണ്ടായിരുന്നില്ല. നഗരവീതിയിൽ വെയിലെല്ലാം വ്യാപിച്ച് തുടങ്ങിയിരിക്കുന്നു. നഗരത്തിന്റെ ആളൊഴിഞ്ഞ ഒരു ദിശയിലായിട്ട് ഉസ്മാനിക്കാക്ക് ഒരു ചെറുകടയുണ്ട്. അവിടെയെത്തിയാൽ ഉസ്മാനിക്കാ വെറും കൈയ്യോടെ പറഞ്ഞയക്കാറില്ല. വാർദ്ധക്യത്തിന്റെ പടുകുഴിയിൽ എത്തിയ ഉസ്മാനിക്കാ മാനവികതയുടെ മൂല്യം മനസ്സിലാക്കിയിട്ടുണ്ടാവണം. തന്നെ കാണുമ്പോഴേക്കെ "ഈശ്വരൻ കൂടെയുണ്ടാവുമെന്ന്" ഉസ്മാനിക്കാ പറയാറുള്ളത് രാമുവിന് ഓർത്തെടുക്കാൻ പറ്റുന്നുണ്ട്.
            </P>
            
            <P>
              ഇന്നേക്ക് രണ്ടാഴ്ചയാവുന്നു ഉസ്മാനിക്ക വേർപിരിഞ്ഞിട്ട്. വിശപ്പിന്റെ കാഠിന്യം കൂടികൊണ്ടെയിരിക്കുന്നു. ആളുകളുടെ ചവറുകൂമ്പാരമായ റോഡരികിലൂടെ രാമു നടത്തം ആരംഭിച്ചു. എത്രയെത്ര ബസ്സുകൾ, കാറുകൾ ചീറിപ്പായുന്നു. നഗരം വ്യത്യസ്തമാം ശബ്ദങ്ങളാൽ നിറഞ്ഞിരിക്കുന്നു. എവിടെ നിന്നോ ചീറിപ്പായുന്ന ഒരു കാർ തന്നരിക്കിൽ എത്തിയപ്പോൾ ചലനമറ്റപോലെ പതുങ്ങുന്നതായ് രാമു ശ്രദ്ധിച്ചു. ആരുടെയോ കൈകൾ.... ആവശ്യല്ലാത്തതെന്നൊണം എന്തോ ഒന്ന് വലിച്ചെറിയുന്നതിൽ രാമു ശ്രദ്ധ കേന്ദ്രികരിച്ചു.
            </P>

            <P>
              വലിച്ചെറിയപ്പെട്ടത് എന്തോ ഒരു പൊതിയായിരുന്നു. വികാര രൂപീതനായ രാമു അത് വലിച്ചുകീറുന്നത് ശ്രദ്ധിക്കാൻ തിരക്കു പിടിച്ച മനുഷ്യർക്കൊന്നും നേരം കിട്ടികാണില്ല. ഓരോ കെട്ടും അഴിയുന്നതോടുകൂടി അതിന്റെ ഗന്ധം അന്തരീക്ഷത്തിൽ വ്യാപിച്ചിരിക്കുന്നു. തന്റെ കയ്യിലുള്ളത് എന്തോ ഭക്ഷണ പദാർത്ഥമാണെന്ന് രാമു തിരിച്ചറിഞ്ഞ നിമിഷം കണ്ണുനീർ പൊടിയാൻ തുടങ്ങി. ഏതോ പണക്കാർ കഴിച്ചതിന്റെ ബാക്കിയാണ്, രാമു മറുത്തൊന്നും ചിന്തിച്ചില്ല.
            </P>

            <Quote text="വിശക്കുന്നവന് ആഹാരം കൊടുക്കുന്നവൻ ദൈവമാണെന്ന് കേട്ടിട്ടുണ്ട്. താൻ ദൈവമാണോയെന്ന് അറിയാതെയാണെങ്കിൽ ആരും ആട്ടിയോടിക്കുകയില്ലല്ലോ..." />

            <P>
              വിശപ്പെന്ന മഹാമാരിയുടെ മുന്നിൽ താനിന്ന് തോറ്റു പോയില്ലാ എന്ന് രാമുവിന് തോന്നി. അന്നേരമതാ എവിടെ നിന്നോ ആട്ടിയൊടിക്കപ്പെട്ട തെരുവുപട്ടി രാമുവിന്റെ മുന്നിൽ പ്രത്യക്ഷപ്പെട്ടിരിക്കുന്നു. അങ്ങനെയിരിക്കെ നിശ്കളങ്ക ഭാവം നടിച്ച ഒരു ജീവി തന്റെ മുന്നിൽ പതുങ്ങിയത് രാമുവിന്റെ മനസ്സലിയിച്ചു. രാമു ഭക്ഷണത്തിന്റെ പാതി ആ ജീവിയുടെ മുന്നിലേക്കെന്നോണം നീട്ടി. ആർത്തിയോടടുകൂടിയ ആഹാരപ്രിയം കണ്ടപ്പോൾ രാമുവിന്റെ കണ്ണ് നിറഞ്ഞു.
            </P>

            <P>
              വെട്ടന്നെന്തോ ദുസ്വപ്നമെന്നോണം രാമു കൺതുറന്നു. നേരം സന്ധ്യ പിന്നിട്ടിരിക്കുന്നു. കിളികളെല്ലാം കൂടുകളിലേക്ക് ചേക്കേറി കൊണ്ടിരിക്കുന്നു. അപ്പോഴാണ് രാമുവിന് താൻ ഉച്ചയൂണ്ട് കഴിഞ്ഞ് മയങ്ങിയതാണെന്ന ബോധം ഉണ്ടായ. പെട്ടന്നാണ് ആ ജീവിയെ ശ്രദ്ധിച്ചത്. തന്നെ പറ്റി പിടിച്ചെന്നോണം മയങ്ങുന്നു. ഒരു നേരത്തെ ഭക്ഷണത്തിന് വകയില്ലാത്ത ആ ജീവി താൻ ദൈവമാണോയെന്ന് കരുതി കാണുമോ?... അറിയില്ലാ.. ആ സായാഹ്ന അവസാനത്തിൽ രാമു ചിന്തിച്ചു.
            </P>
          </article>
        </div>
      </div>

      {/* Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#e6ba95]/10 bg-[#1c1814] px-6 py-32 text-center md:py-40">
        <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#e6ba95]/30 bg-[#e6ba95]/10 p-1 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image 
              src={resolveAsset("sifna.png")} 
              alt="Sifna Ameesha V K" 
              width={128} 
              height={128} 
              className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
            />
          </div>
        </div>
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#e6ba95]">
          Written by
        </span>
        <h3 className="font-serif text-2xl text-[#e8dac7] md:text-4xl" lang="ml">
          സിഫ്ന അമീഷ വി . കെ
        </h3>
        <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#e8dac7]/50 md:text-base" lang="ml">
          രണ്ടാം വർഷം, ഇലക്ട്രികൽ & ഇലക്ട്രോണിക്സ്
        </p>
      </div>
    </section>
  );
}
