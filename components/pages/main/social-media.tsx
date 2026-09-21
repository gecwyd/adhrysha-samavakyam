"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

function P({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return (
    <p
      className={`mb-8 font-light leading-[2] tracking-wide md:leading-[2.2] ${
        lead ? "text-[1.3em] text-[#e0e1dd] md:text-[1.45em]" : "text-[#c9cac5]"
      }`}
    >
      {children}
    </p>
  );
}

function Quote({ text, translation }: { text: string; translation?: string }) {
  return (
    <div className="my-16 flex flex-col items-center justify-center border-y border-[#78a890]/20 py-16 text-center md:my-24 md:py-24">
      <p className="max-w-4xl font-sans text-2xl font-light leading-relaxed text-[#78a890] md:text-4xl lg:text-5xl">
        &ldquo;{text}&rdquo;
      </p>
      {translation && (
        <p className="mt-8 max-w-2xl font-serif text-sm italic text-[#e0e1dd]/50 md:text-lg">
          {translation}
        </p>
      )}
    </div>
  );
}

export function SocialMedia() {
  const containerRef = useRef<HTMLElement>(null);
  
  // A subtle parallax for the hero image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <section 
      ref={containerRef}
      id="sec-social-media" 
      className="relative min-h-screen w-full bg-[#1e2329] text-[#e0e1dd]"
    >
      <header className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden border-b border-[#78a890]/20 pb-20 pt-32">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: heroY }} className="h-full w-full">
            <Image
              src={resolveAsset("social-media-hero.webp")}
              alt="Silhouette of a person standing before a massive digital display of flowing data and glowing nodes"
              fill
              sizes="100vw"
              priority
              unoptimized
              className="object-cover opacity-30"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2329]/40 via-[#1e2329]/80 to-[#1e2329]" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[#78a890]">
            Inquation / Perspective · 04
          </p>
          <h2 className="mb-8 font-heading text-4xl leading-[1.2] tracking-tight text-[#e0e1dd] md:text-6xl lg:text-7xl" lang="ml">
            സോഷ്യൽ മീഡിയ,<br />
            സാധ്യതയോ ബാധ്യതയോ...?
          </h2>
          <p className="font-serif text-xl italic tracking-wide text-[#78a890] md:text-2xl">
            A critical view on connection
          </p>
        </div>
      </header>

      <article className="relative mx-auto max-w-[42rem] px-6 py-24 text-[1.15rem] md:px-8 md:py-32 md:text-[1.25rem]">
        <P lead>
          അറിവിന്റെ വിസ്ഭോടനം പ്രാവർത്തികമായിക്കൊണ്ടിരികുന്ന വർത്തമാന കാലഘട്ടത്തിൽ വേരൂന്നി അനന്തസാധ്യതകളുള്ള ഒരു ആശയവിനിമയ ഉപാധിയായി അനുദിനം പടർന്നുപണ്ടലിച്ചുകൊണ്ടിരികുന്നു സോഷ്യൽ മീഡിയ. ജാതി മത ലിംഗ ഭാഷ വേഷ- ഭേദമെന്യേ ആബാലവൃദ്ധം ആളുകളും ഈ വിർച്വൽ ലോകത്തേക്ക് ചേക്കേറുമ്പോൾ ഭാവിലോകത്ത് ഉണ്ടാകാൻ പോകുന്ന മാറ്റം ചിന്തകൾക്കതീതമാണ്.
        </P>
        
        <P>
          അതിർവരമ്പുകളെ മായ്ച്ചുകളഞ്ഞ് മനുഷ്യനെന്ന മഹത്തായ വിശേഷണത്തിൻകീഴിൽ ഒരുമിച്ച് ചേരാൻ, അല്ലെങ്കിൽ സ്വസ്ഥമായി ഒരൽപനേരം ഇരിക്കാൻ നാം ഇന്ന് സോഷ്യൽമീഡിയ ആശ്രയിക്കുമ്പോൾ, സാധ്യതകൾക്കൊപ്പം ബാധ്യതകൾകൂടി തുറന്നുതരുന്നു ഈ അനന്തലോകം.
        </P>

        <P>
          സോഷ്യൽമീഡിയയുടെ സിരാകേന്ദ്രമായ ഇന്റർനെറ്റ് ഉപയോഗപ്പെടുത്തുന്ന ബ്ലോഗും ഫേസ്ബുക്കും ഇൻസ്റ്റഗ്രാമും വാട്സ്ആപ്പുമൊക്കെ പുതുതലമുറയുടെ ആവേശമാണ് ഇന്ന്. കേരളത്തിലെ ഏതൊരു തെരുവിലൂടെയും നടന്നുപോകുന്ന ഒരനുഭവമാണ് സോഷ്യൽമീഡിയ സമ്മാനിക്കുന്നതെന്ന് fb യിൽ സജീവമായി എഴുതുന്ന ഒരു യുവതി പറഞ്ഞതിൽ പരമ മാർഥമുണ്ടെന്ന് കാണാം. എല്ലാതരം ആളുകളും അവിടകാണാം നല്ലതും ചീത്തയും ഒക്കെ അവിടെ പ്രദർശിപ്പിക്കപ്പെടുന്നു. ചിത്രമായും വരയായും മറുപടിയായും ചോദ്യമായും പ്രസ്താവനയായും പങ്കുവെക്കലായുമൊക്കെ നമ്മുടെ മനസ് വെളിപ്പെടുന്ന ഇടമായി ഇവിടം മാറിക്കഴിഞ്ഞു.
        </P>
        
        <div className="my-16 border-l border-[#78a890]/40 pl-6 md:pl-10">
          <p className="text-xl font-light italic leading-relaxed text-[#78a890] md:text-2xl">
            പക്ഷേ എനിക് അഞ്ഞൂറ് ഫോളോവേർസ് ഉണ്ടെന്ന് അഭിമാനിക്കുന്ന യുവതലമുറ യഥാർത്ഥ ജീവിതത്തിൽ 5 സുഹൃത്തുക്കളെങ്കിലും ഉണ്ടോയെന്ന ചോദ്യത്തിന് മുന്നിൽ മുട്ടുകുത്തുന്ന അവസ്ഥയാണ്.
          </p>
        </div>

        <P>
          സാധ്യതകളുടെ ഒരു സമാഹാരമാണ് സോഷ്യൽമീഡിയ എന്ന് നിസ്സംശയം പറയാം. വിവരസാങ്കേതികവിദ്യയുടെ അത്യുജ്ജലമായ കടന്നുകയറ്റം ഉള്ള ഇക്കാലത്ത് ലോകത്തെവിടെയുമുള്ള വിവരങ്ങൾ വിരൽത്തുമ്പിലെത്തിക്കാനും, ആശയവിനിമയം നടത്താനും സോഷ്യൽമീഡിയ ആവശ്യമാണ്. എത്രയോ അകലെയാണെങ്കിലും സുഹൃത്തുക്കളുമായും കുടുംബാംഗങ്ങളുമായും തത്സമയം സംസാരിക്കാനും ചിത്രങ്ങളും വീഡിയോകളും പങ്കിടാനും സാധിക്കുന്നു. വിദ്യാർത്ഥികൾക്ക് പഠനസംബന്ധമായ സംശയങ്ങൾ തീർക്കാനും, അറിവ് വർദ്ധിപ്പിക്കുന്ന വിവരങ്ങൾ ശേഖരിക്കാനും സോഷ്യൽ മീഡിയ സഹായിക്കുന്നു.
        </P>
        
        <P>
          കൂടാതെ ചെറുകിട സംരംഭകർക്ക് വളരെ കുറഞ്ഞ ചെലവിൽ തങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ വിപണനം ചെയ്യാനും, ഉപഭോക്താക്കളെ കണ്ടെത്താനും സോഷ്യൽ മീഡിയ മാർക്കറ്റിംഗ് പ്രയോജനപ്പെടുന്നു. ആർക്കും സ്വന്തം അഭിപ്രായങ്ങൾ ആരെയും പേടിക്കാതെ തുറന്നുപറയാനും അടിച്ചമർത്തലിൻ്റെയും അനീതികളുടെയും കരങ്ങളെ വേരോടെ പിഴുതെറിയാൻ സോഷ്യൽമീഡിയ വഴിയൊരുക്കുന്നുണ്ട്. മാത്രമല്ല സാമൂഹ്യ പ്രതിബദ്ധതയുള്ള ഒട്ടേറെ നല്ല പ്രവർത്തനങ്ങള് സോഷ്യൽമീഡിയ ഇന്ന് കാരണമാവുന്നുണ്ട്.
        </P>

        <Quote 
          text="മറുവശത്തോ സോഷ്യൽമീഡിയോടുള്ള അമിതമായ ആസക്തി ഒരു മാനസികരോഗ അവസ്ഥയായി മാറുന്നു." 
          translation="On the other hand, extreme addiction to social media turns into a psychological condition."
        />

        <P>
          അനേകം ചതിക്കുഴികൾക്കുള്ള വേദി കൂടിയായി സോഷ്യൽമീഡിയ മാറുന്നതിനെപ്പറ്റി ഗൗരവമായി ചിന്തിക്കേണ്ടിയിരിക്കുന്നു. ലൈക്കുകൾക്കും കമന്റുകൾക്കും വേണ്ടിയുള്ള ഓട്ടത്തിനിടയിൽ പകർന്നുനൽകുന്ന സ്വകാര്യ വിവരങ്ങൾ മൂലം ഉണ്ടാകുന്ന സൈബർ തട്ടിപ്പുകളുടെ എണ്ണം അനുദിനം ഉയരുന്നുണ്ട്. പ്രണയം നടിക്കാനും പണം കാട്ടി പ്രലോഭിപ്പിക്കാനും കപട വാഗ്ദാനങ്ങൾ നൽകി വഞ്ചിക്കാനും ആൾമാറാട്ടം നടത്താനുമൊക്കെ വിരുത്ള്ളവർ വലവിരിക്കാനുള്ള ഇടമായി ഇതിനെ ഉപയോഗിക്കാറുണ്ട്. മാത്രമല്ല വ്യാജവാർത്തകളുടെ സിരാകേന്ദ്രമായി മാറുന്നതും അനുജരണശീലം യുവതലമുറയിൽ വളർത്തുന്നതും സോഷ്യൽമീഡിയയുടെ ഇരുണ്ടവശമാണ്.
        </P>

        <P>
          അപകട സാധ്യതയുള്ളതിനാൽ അതൊഴിവാക്കുന്നതിനേക്കാൾ അഭികാമ്യം എതൊന്നിനെയും അതിജീവിക്കുന്നതാണ്. അതിനാൽത്തന്നെ സോഷ്യൽമീഡിയയും നമുക്ക് സാധ്യതകളെ കണ്ടെത്തി ഉപയോഗിക്കാൻ ശീലിക്കണം. ഇതിനായി നമുക്ക് ബോധവൽക്കരണ പരിപാടികൾ സംഘടിപ്പിക്കാം. സോഷ്യൽമീഡിയ ഉപയോഗത്തിനായി ഒരു നിശ്ചിത സമയപരിധി കണ്ടെത്തണം. ചാറ്റിംഗ് ചീറ്റിംഗ് ആകാതെയും സ്നേഹം ദ്വേഷമാകാതെയും ഉള്ള വിവേകം എല്ലാ ഉപയോക്താക്കളും ശ്രദ്ധിക്കണം.
        </P>
      </article>

      {/* Finale / Conclusion Block */}
      <div className="relative flex w-full flex-col items-center justify-center bg-[#181c21] px-6 py-32 text-center md:px-12 md:py-48">
        <p className="mb-12 max-w-4xl text-3xl font-light leading-relaxed text-[#e0e1dd] md:text-5xl lg:text-6xl" lang="ml">
          സോഷ്യൽ മീഡിയ ഒരു ശാപമോ വരമോ അല്ല,<br />
          അത് ഉപയോഗിക്കുന്ന മനുഷ്യന്റെ കൈകളിലെ ഒരു ഉപകരണമാണ്.
        </p>
        <p className="max-w-3xl text-lg font-light leading-relaxed text-[#a3a59d] md:text-2xl" lang="ml">
          അറിവും അവസരങ്ങളും പകരുന്ന ശക്തിയായി അതിനെ മാറ്റാനും, ജീവിതത്തെ വഴിതെറ്റിക്കുന്ന ബാധ്യതയാക്കാനും നമുക്കുതന്നെയാണ് കഴിയുക. അതിനാൽ സോഷ്യൽ മീഡിയയുടെ ഭാവി സാങ്കേതികവിദ്യയിലല്ല, നമ്മുടെ ഉത്തരവാദിത്തമുള്ള ഉപയോഗത്തിലാണുള്ളത്.
        </p>
        
        <p className="mt-16 max-w-4xl text-2xl font-light leading-relaxed text-[#78a890] drop-shadow-[0_0_15px_rgba(120,168,144,0.3)] md:text-4xl" lang="ml">
          സോഷ്യൽ മീഡിയ നമ്മുടെ ജീവിതത്തെ നിയന്ത്രിക്കരുത്; മറിച്ച് നാം തന്നെയാണ് സോഷ്യൽ മീഡിയയെ നിയന്ത്രിക്കേണ്ടത്.
        </p>
      </div>

      {/* Author Profile */}
      <div className="flex flex-col items-center justify-center border-t border-[#78a890]/10 bg-[#1e2329] px-6 py-24 text-center">
        <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#78a890]/30 bg-[#78a890]/10 p-1 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image 
              src={resolveAsset("adharsh.png")} 
              alt="Adharsh P" 
              width={128} 
              height={128} 
              className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>
        </div>
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#78a890]">
          Written by
        </span>
        <h3 className="font-serif text-2xl text-[#e0e1dd] md:text-4xl">
          Adharsh . P
        </h3>
        <p className="mt-2 font-sans text-sm text-[#e0e1dd]/50 md:text-base">
          1st Year, Civil Engineering
        </p>
      </div>
    </section>
  );
}
