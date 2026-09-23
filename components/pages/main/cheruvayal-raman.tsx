"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import styles from "./cheruvayal-raman.module.css";

type Shot = { file: string; alt: string; ratio: "portrait" | "landscape" };

const SHOTS = {
  portrait: {
    file: "cheruvayal-raman-portrait.webp",
    alt: "Cheruvayal Raman, seated, wearing his Padma Shri medal pinned to a soil-stained white shirt and a pale turban, looking away in profile with a quiet, weathered expression.",
    ratio: "portrait",
  },
  interview: {
    file: "cheruvayal-raman-interview.webp",
    alt: "Cheruvayal Raman seated in a plastic chair outside his thatched-roof home in Kammana, Wayanad, gesturing as he speaks to five college students from the magazine team gathered around him on a red-earth courtyard.",
    ratio: "landscape",
  },
  speaking: {
    file: "cheruvayal-raman-speaking.webp",
    alt: "Close shot of Cheruvayal Raman mid-sentence, one hand raised and pointing upward, in front of his thatched hut with clothes drying in the background.",
    ratio: "portrait",
  },
  fieldsWalk: {
    file: "cheruvayal-raman-fields-walk.webp",
    alt: "Cheruvayal Raman and the visiting students walking single file along a narrow mud bund between flooded paddy fields, framed by tall areca and forest trees in the morning haze.",
    ratio: "portrait",
  },
  honour: {
    file: "cheruvayal-raman-honour.webp",
    alt: "Cheruvayal Raman smiling gently, his Padma Shri medal visible on his shirt pocket, seated in the shade of his home.",
    ratio: "portrait",
  },
  team: {
    file: "cheruvayal-raman-team.webp",
    alt: "Cheruvayal Raman standing barefoot on a paddy-field bund with the visiting magazine team on either side, lush green rice fields and forest behind them.",
    ratio: "landscape",
  },
} satisfies Record<string, Shot>;

function Plate({ shot, className, priority }: { shot: Shot; className: string; priority?: boolean }) {
  return (
    <figure className={className} data-reveal="photo">
      <Image
        src={resolveAsset(shot.file)}
        alt={shot.alt}
        fill
        priority={priority}
        sizes="(max-width: 1140px) 100vw, 1100px"
        className={styles.photo}
      />
    </figure>
  );
}

const FACTS = [
  { label: "സ്ഥലം", value: "കമ്മന, വയനാട്" },
  { label: "പുരസ്കാരം", value: "പത്മശ്രീ" },
  { label: "പദവി", value: "ഓണററി പ്രൊഫസർ, കേരള കാർഷിക സർവകലാശാല" },
  { label: "സൂക്ഷിക്കുന്ന വിത്തിനങ്ങൾ", value: "100–300 വർഷം പഴക്കമുള്ളവ" },
];

export function CheruvayalRaman() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (motion.matches) return;
      const reveals = new IntersectionObserver(
        (entries, self) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.removeAttribute("data-idle");
            entry.target.setAttribute("data-shown", "true");
            self.unobserve(entry.target);
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -12% 0px" },
      );
      section.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        if (element.getBoundingClientRect().top <= window.innerHeight) return;
        element.setAttribute("data-idle", "true");
        reveals.observe(element);
      });
      cleanup = () => {
        reveals.disconnect();
        section.querySelectorAll("[data-idle]").forEach((element) => element.removeAttribute("data-idle"));
      };
    };

    setup();
    motion.addEventListener("change", setup);
    return () => {
      cleanup();
      motion.removeEventListener("change", setup);
    };
  }, []);

  return (
    <section ref={root} id="sec-cheruvayal-raman" aria-labelledby="cheruvayal-raman-title" className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Profile · Interview</p>
        <h2 id="cheruvayal-raman-title" className={styles.title} lang="ml">
          ചെറുവയൽ രാമൻ
        </h2>
        <p className={styles.epigraph} lang="ml">
          ഒരു കൈയിൽ ഏന്തണം പുസ്തകം, മറുകൈയിലേന്തണം പണിയായുധം.
        </p>
      </header>

      <Plate shot={SHOTS.portrait} className={`${styles.plate} ${styles.heroPlate}`} priority />

      <div className={styles.facts} data-reveal="facts">
        {FACTS.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <span className={styles.factLabel}>{fact.label}</span>
            <p className={styles.factValue} lang="ml">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className={styles.prose}>
        <p className={styles.lede} lang="ml">
          കാലത്തിന്റെ കുത്തൊഴുക്കിൽ ഓർമ്മകളുടെ പത്തായങ്ങൾ ഓരോന്നായി ശൂന്യമായപ്പോൾ, ഒരു മനുഷ്യൻ മാത്രം തന്റെ നെഞ്ചിലെ നനവുള്ള മണ്ണിൽ കുറച്ചു വിത്തുകൾ ഒളിച്ചുവെച്ചു. ലാഭനഷ്ടങ്ങളുടെ കണക്കുപുസ്തകങ്ങൾക്കപ്പുറം, മണ്ണിന്റെ താളമറിയുന്ന, മഴയുടെ സ്പർശമറിയുന്ന ഒരാൾ. വയനാടൻ ചുരം കയറിച്ചെല്ലുമ്പോൾ കമ്മനയിലെ ആ കൊച്ചുവീട്ടുമുറ്റത്ത് കാലം ഒരുനിമിഷം കാത്തുനിൽക്കുന്നതായി തോന്നും. അവിടെ, മണ്ണിലേക്ക് വേരിറങ്ങിയ ഒരു വടവൃക്ഷം പോലെ അദ്ദേഹമുണ്ട്, ജീവന്റെ കാവൽക്കാരനായ ചെറുവയൽ രാമൻ. തലമുറകൾക്കായി അദ്ദേഹം കാത്തുവെച്ച ആ ജീവസ്പന്ദനങ്ങളിലൂടെ ഒരു യാത്ര…
        </p>
      </div>

      <div className={styles.sectionLabel} data-reveal="label"><span>കൂടിക്കാഴ്ച</span></div>
      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          ചില വീടുകളിലേക്ക് നമ്മൾ കയറിച്ചെല്ലുന്നത് ഒരു മനുഷ്യനെ കാണാനാണ്. എന്നാൽ അവിടെ നിന്ന് മടങ്ങുമ്പോഴാണ്, കണ്ടത് ആ മനുഷ്യനെ മാത്രമല്ലെന്ന് തിരിച്ചറിയുന്നത്. ഒരു കാലം, ഒരു ജീവിതരീതി, മറന്നുപോകുന്ന ചില ഓർമ്മകൾ, ഇതെല്ലാം അവിടെ നമ്മളെ കാത്തിരിക്കുന്നുണ്ടാകും.
        </p>
        <p className={styles.p} lang="ml">
          വയനാട്ടിലെ കമ്മനയിലേക്കുള്ള ഞങ്ങളുടെ യാത്ര അങ്ങനെയൊരു കൂടിക്കാഴ്ചയ്ക്കായിരുന്നു. നാടൻ നെൽവിത്തുകളുടെ സംരക്ഷകനായി അറിയപ്പെടുന്ന, പാരമ്പര്യ കൃഷിരീതികളെ തന്റെ ജീവിതത്തിന്റെ ഭാഗമാക്കി മാറ്റിയ ചെറുവയൽ രാമേട്ടനെ നേരിൽ കാണാനായിരുന്നു ഞങ്ങൾ പോയത്. അദ്ദേഹത്തെക്കുറിച്ച് കേട്ടിട്ടുണ്ടായിരുന്നു; വായിച്ചിട്ടുമുണ്ടായിരുന്നു. എന്നാൽ കേട്ടറിഞ്ഞ ഒരു മനുഷ്യനെ നേരിൽ കാണാൻ പോകുമ്പോൾ മനസ്സിലുണ്ടാകുന്ന ആ ചെറിയ കൗതുകവും ആകാംക്ഷയും വേറെയായിരുന്നു.
        </p>
        <p className={styles.p} lang="ml">
          മാനന്തവാടിയിൽ നിന്ന് കമ്മനയിലേക്കുള്ള യാത്ര അവസാനിച്ച് അദ്ദേഹത്തിന്റെ വീട്ടിലെത്തിയപ്പോൾ, ഞങ്ങളുടെ മുന്നിൽ തുറന്നത് ഒരു വീടിന്റെ വാതിൽ മാത്രമായിരുന്നില്ല. ഏകദേശം നൂറ്റിയൻപത് വർഷം പഴക്കമുള്ള ആ വീട് തന്നെ ഒരു കാലത്തിന്റെ ഓർമ്മപോലെ തോന്നി. അതിനുള്ളിൽ സൂക്ഷിച്ചിരിക്കുന്ന വിത്തുകൾക്ക് വർഷങ്ങളുടെ കഥകളുണ്ടായിരുന്നു.
        </p>
      </div>

      <Plate shot={SHOTS.interview} className={`${styles.plate} ${styles.wideBelow} ${styles.landscape}`} />
      <p className={styles.caption}>ഞങ്ങളുടെ ചോദ്യങ്ങളെക്കാൾ വലുതായിരുന്നു അദ്ദേഹത്തിന്റെ ഉത്തരങ്ങൾ.</p>

      <div className={styles.sectionLabel} data-reveal="label"><span>മണ്ണ് പഠിപ്പിച്ച ജീവിതം</span></div>
      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          രാമേട്ടന്റെ ജീവിതത്തിന് ഒരു കൃത്യമായ തുടക്കബിന്ദു കണ്ടെത്തുക എളുപ്പമല്ല. കൃഷിയിലേക്ക് എപ്പോഴാണ് എത്തിയതെന്ന് ചോദിച്ചാൽ ഒരു പ്രത്യേക ദിവസം ചൂണ്ടിക്കാണിക്കാനാവില്ല. കാരണം, കൃഷി അദ്ദേഹത്തിന്റെ ജീവിതത്തിലേക്ക് പിന്നീട് കടന്നുവന്ന ഒന്നായിരുന്നില്ല. കൃഷിക്കിടയിലാണ് അദ്ദേഹത്തിന്റെ ജീവിതം വളർന്നത്.
        </p>
        <p className={styles.p} lang="ml">
          1958-ലാണ് സ്കൂളിൽ ഒന്നാം ക്ലാസിൽ ചേർന്നത്. പഠനം അഞ്ചാം ക്ലാസ് വരെ. അതിനുശേഷം പുസ്തകത്തിലെ പഠനത്തേക്കാൾ ജീവിതം തന്നെയായിരുന്നു മുന്നിൽ. ചെറുപ്പത്തിൽ തന്നെ മണ്ണിലേക്കിറങ്ങി. കാലം മാറിയപ്പോഴും ജീവിതത്തിന്റെ വഴികൾ പലതവണ തിരിഞ്ഞപ്പോഴും, അദ്ദേഹം മണ്ണിൽ നിന്ന് അകന്നില്ല.
        </p>
      </div>

      <blockquote className={styles.quote} data-reveal="quote" lang="ml">
        <p>മണ്ണാണ് ജീവിതം പഠിപ്പിച്ചത്.”</p>
      </blockquote>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          മണ്ണിൽ ഒരു വിത്ത് വിതച്ചാൽ, അതിന്റെ ഫലം ഉടനെ ലഭിക്കില്ല. അതിന് ഒരു സമയമുണ്ട്. മഴ വേണം, മുളയ്ക്കണം, വളരണം, പിന്നെ വിളവാകണം. ചിലപ്പോൾ പ്രതീക്ഷിച്ചതുപോലെ സംഭവിക്കില്ല. എന്നിട്ടും അടുത്ത കാലത്തേക്കുള്ള വിത്ത് കൈവിടാനാവില്ല. വീണ്ടും മണ്ണിലേക്ക് മടങ്ങേണ്ടി വരും. കാത്തിരിക്കുക, അധ്വാനിക്കുക, നഷ്ടപ്പെട്ടാലും വീണ്ടും തുടങ്ങുക, മണ്ണ് പഠിപ്പിച്ച പാഠങ്ങൾ ഒരുപക്ഷേ ഇതൊക്കെയായിരുന്നു.
        </p>
      </div>

      <div className={styles.sectionLabel} data-reveal="label"><span>വിത്ത് ഒരു തുടർച്ചയാണ്</span></div>
      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          സംസാരം പതിയെ വിത്തുകളിലേക്ക് എത്തുമ്പോഴാണ് രാമേട്ടന്റെ വാക്കുകൾക്ക് മറ്റൊരു ആഴം ലഭിച്ചത്. നമ്മൾ ഒരു വിത്തിനെ കാണുമ്പോൾ ഒരു ചെറിയ ധാന്യമണി മാത്രമാണ് കാണുന്നത്. എന്നാൽ രാമേട്ടൻ അതിൽ കാണുന്നത് ഒരു തുടർച്ചയാണ്.
        </p>
      </div>

      <blockquote className={styles.quote} data-reveal="quote" lang="ml">
        <p>വിത്തിന് വിലയില്ലേ? നീ ഒരു വിത്തല്ലേ? അപ്പോൾ നിനക്കൊരു വിലയില്ലേ?”</p>
        <footer>വിത്തിന്റെ വില എത്ര രൂപയാണെന്നല്ല അദ്ദേഹം ചോദിക്കുന്നത്. അതിന്റെ മൂല്യം നമ്മൾ തിരിച്ചറിയുന്നുണ്ടോ എന്നായിരുന്നു ആ ചോദ്യം.</footer>
      </blockquote>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          ഒരു ചെറിയ വിത്തിനുള്ളിൽ ഒരു ചെടിയുണ്ട്. ആ ചെടിയിൽ ഒരു വിളവുണ്ട്. ആ വിളവിനുള്ളിൽ വീണ്ടും അനേകം വിത്തുകളുണ്ട്. ഒരു തലമുറയിൽ നിന്ന് മറ്റൊരു തലമുറയിലേക്ക് നീളാനുള്ള സാധ്യതയുണ്ട്. അതുകൊണ്ടാണ് വിത്തുകൾ കൊണ്ടാണ് പ്രകൃതി നിലനിൽക്കുന്നതെന്ന് അദ്ദേഹം പറയുന്നത്.
        </p>
        <p className={styles.p} lang="ml">
          പണ്ടുകാലത്ത് വിത്തുകൾ കൊടുത്തും വാങ്ങിയും കൈമാറിയിരുന്നു. ഒരാളുടെ കൈയിൽ നിന്ന് മറ്റൊരാളുടെ കൈയിലേക്ക് പോകുമ്പോൾ അതിനൊപ്പം ഒരു വിശ്വാസവും യാത്ര ചെയ്തിരുന്നു. ഇന്ന് ഒരു വിത്ത് വാങ്ങുമ്പോൾ അതിന്റെ വിലയും പേരും പാക്കറ്റിന് പുറത്താണ് നമ്മൾ നോക്കുന്നത്. പക്ഷേ ഒരു കാലത്ത് വിത്തിനൊപ്പം ഒരു മനുഷ്യന്റെ അനുഭവവും മറ്റൊരാളുടെ വിശ്വാസവും കൈമാറിയിരുന്നു. രാമേട്ടൻ സംരക്ഷിക്കുന്നത് അതേ കൈമാറ്റത്തിന്റെ ഒരു തുടർച്ചയാണ്.
        </p>
        <p className={styles.p} lang="ml">
          വർഷങ്ങൾക്കു മുമ്പ് പല ഇടങ്ങളിൽ നിന്ന് ശേഖരിച്ച വിത്തുകൾ കൃഷിയിലേക്ക് തിരിച്ചെത്തിച്ചു. വിളവെടുത്തപ്പോൾ അതിൽ നിന്ന് വീണ്ടും വിത്ത് മാറ്റിവെച്ചു. ഉണക്കി സൂക്ഷിച്ചു. അടുത്ത കാലത്ത് വീണ്ടും മണ്ണിലിട്ടു. അതുകൊണ്ടുതന്നെ അദ്ദേഹത്തിന്റെ വീട്ടിലെ വിത്തുകൾ വെറുതെ സൂക്ഷിച്ചുവെച്ചിരിക്കുന്ന ധാന്യമണികളല്ല. ഓരോന്നിനും പിന്നിൽ ഒരു കാലമുണ്ട്. ഒരു വിളവെടുപ്പിന്റെ ഓർമ്മയുണ്ട്. ഒരാളിൽ നിന്ന് മറ്റൊരാളിലേക്കെത്തിയ ഒരു യാത്രയുണ്ട്.
        </p>
      </div>

      <Plate shot={SHOTS.speaking} className={`${styles.plate} ${styles.wideBelow} ${styles.portrait}`} />

      <div className={styles.sectionLabel} data-reveal="label"><span>അധ്വാനം</span></div>
      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          അദ്ദേഹത്തിന്റെ ജീവിതത്തെ ഒരു വാക്കിൽ പറയാൻ ആവശ്യപ്പെട്ടപ്പോൾ മറുപടി വളരെ ലളിതമായിരുന്നു.
        </p>
      </div>

      <blockquote className={styles.quote} data-reveal="quote" lang="ml">
        <p>അധ്വാനം.”</p>
        <footer>ആ ഒരു വാക്കിനൊപ്പം അദ്ദേഹം ഓർത്തെടുത്തത് പഴമൊഴിയായിരുന്നു: &ldquo;എല്ലുമുറിയെ പണിയെടുത്ത് പല്ലുമുറിയെ തിന്നാം.&rdquo;</footer>
      </blockquote>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          ആ അധ്വാനത്തിനിടയിൽ അദ്ദേഹത്തെ തേടി നിരവധി അംഗീകാരങ്ങളും എത്തി. പത്മശ്രീ ഉൾപ്പെടെയുള്ള ബഹുമതികൾ ലഭിച്ചു. കേരള കാർഷിക സർവകലാശാല അദ്ദേഹത്തെ ഓണററി പ്രൊഫസറായി നിയമിച്ചു. എന്നാൽ ഈ അംഗീകാരങ്ങൾ പറയുമ്പോഴും, അവയൊന്നും അദ്ദേഹത്തിന്റെ സംസാരത്തിൽ വലിയൊരു അകലമുണ്ടാക്കിയതായി തോന്നിയില്ല. ബഹുമാനം ലഭിച്ചാൽ അതിനൊപ്പം വിനയവും വേണം, പക്വതയും ക്ഷമയും വേണം, താൻ വലിയ ആളാണെന്ന ചിന്ത ഉപേക്ഷിക്കണം, അദ്ദേഹത്തിന്റെ വാക്കുകളുടെ ഉള്ളടക്കം അതായിരുന്നു.
        </p>
      </div>

      <Plate shot={SHOTS.honour} className={`${styles.plate} ${styles.wideBelow} ${styles.portrait}`} />

      <div className={styles.prose}>
        <p className={styles.echo} lang="ml">
          &ldquo;ഇനിയും വലിയൊരു പുരസ്കാരം കിട്ടിയാലും ഞാൻ മാറില്ല.&rdquo;
        </p>
        <p className={styles.p} lang="ml" style={{ marginTop: "1.4em" }}>
          ആ നിലപാടിൽ പുരസ്കാരത്തെക്കാൾ വലുതായി തോന്നിയത്, മനുഷ്യൻ തന്റെ വേരുകളെ മറക്കരുതെന്ന ചിന്തയായിരുന്നു. മണ്ണിൽ നിന്ന് ഉയർന്ന ഒരാൾക്ക് മണ്ണിൽ തന്നെ കാലുറപ്പിച്ചുനിൽക്കാനാകണം. രാമേട്ടന്റെ കാര്യത്തിൽ അത് വെറുമൊരു ആശയമല്ല. അദ്ദേഹത്തിന്റെ ജീവിതം തന്നെയാണ് അതിന്റെ തെളിവ്.
        </p>
      </div>

      <div className={styles.sectionLabel} data-reveal="label"><span>മാറുന്ന കാലം</span></div>
      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          കാലാവസ്ഥ മാറിയതോടെ കൃഷിയുടെ സമയവും മാറിയിരിക്കുന്നു. പഴയ കാലക്രമങ്ങൾ ഇന്നത്തെ കാലാവസ്ഥയുമായി എല്ലായ്പ്പോഴും പൊരുത്തപ്പെടുന്നില്ല. കൊയ്ത്തിന്റെ സമയത്ത് മഴ എത്തുന്നു. &ldquo;കാലാവസ്ഥാ വ്യതിയാനം&rdquo; എന്ന വാക്ക് നമ്മൾ പുസ്തകങ്ങളിൽ വായിക്കുമ്പോൾ അത് വലിയൊരു ആശയമായി തോന്നാം. പക്ഷേ ഒരു കർഷകന്റെ ജീവിതത്തിലേക്ക് അത് കടന്നുവരുമ്പോൾ അതിന്റെ അർത്ഥം വളരെ നേരിട്ടുള്ളതാണ്.
        </p>
        <p className={styles.p} lang="ml">
          തന്റെ അനുഭവത്തിൽ പരമ്പരാഗത വിത്തുകൾക്ക് വലിയൊരു നിലനിൽപ്പുണ്ടെന്നും, തലമുറകളായി കൈമാറിയെത്തിയ ചില വിത്തുകൾ നൂറും ഇരുന്നൂറും മുന്നൂറും വർഷങ്ങളുടെ പഴക്കമുള്ളവയാണെന്നും അദ്ദേഹം പറയുന്നു. തന്റെ കൃഷിയിൽ ഹൈബ്രിഡ് വിത്തുകൾ ഉപയോഗിച്ചിട്ടില്ലെന്നും അദ്ദേഹം പങ്കുവെച്ചു.
        </p>
        <p className={styles.p} lang="ml">
          വിത്തുകളെക്കുറിച്ചുള്ള സംസാരം പിന്നീട് കൃഷിയോടൊപ്പം വളർന്ന ഒരു വലിയ ലോകത്തേക്കും എത്തി, സംസ്കാരത്തിലേക്ക്. ഒരുകാലത്ത് കൃഷി ഒരു ജോലി മാത്രമായിരുന്നില്ല. അതിനൊപ്പം ഞാറ്റുപാട്ടുകളും നെല്ലുകുത്തുപാട്ടുകളും ഉണ്ടായിരുന്നു. ഒരുമിച്ച് അധ്വാനിച്ചിരുന്ന മനുഷ്യരുടെ സന്തോഷങ്ങളും ക്ഷീണവും പ്രതീക്ഷകളും കൃഷിയുടെ ജീവിതത്തിൽ തന്നെ കലർന്നിരുന്നു. അതുകൊണ്ടാണ് രാമേട്ടൻ പറയുന്ന ഒരു ചെറിയ വാക്കിന് ഇത്രയും അർത്ഥം തോന്നുന്നത്, Agriculture-ൽ &lsquo;culture&rsquo; കൂടിയുണ്ട്.
        </p>
      </div>

      <Plate shot={SHOTS.fieldsWalk} className={`${styles.plate} ${styles.wideBelow} ${styles.portrait}`} />
      <p className={styles.caption}>അടുത്ത തലമുറ മണ്ണിലേക്കിറങ്ങണമെന്ന് അദ്ദേഹം പറയുമ്പോൾ, ആ വഴി ഞങ്ങൾക്കൊപ്പം നടന്നു.</p>

      <div className={styles.sectionLabel} data-reveal="label"><span>അടുത്ത തലമുറയിലേക്ക്</span></div>
      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          അവസാനം സംസാരമെത്തിയത് ഞങ്ങളിലേക്കും, ഞങ്ങളിലൂടെ വരുന്ന തലമുറയിലേക്കുമായിരുന്നു. താൻ സംരക്ഷിച്ചതെല്ലാം തന്നോടൊപ്പം അവസാനിക്കരുത്. വിത്തുകൾ പുതിയ തലമുറയിലേക്ക് പോകണം. കൃഷിയുടെ അറിവ് അവരിലേക്ക് എത്തണം. യുവാക്കൾ മണ്ണിലേക്കിറങ്ങണം. സ്വന്തം ഭക്ഷണം എവിടെ നിന്നാണ് വരുന്നതെന്ന് അറിയണം.
        </p>
        <p className={styles.p} lang="ml">
          അപ്പോഴാണ് ആ വരി ഞങ്ങൾ കേട്ടത്, അവിടെ എത്തുന്നതിന് മുമ്പ് കേട്ടിരുന്നില്ലാത്ത, ആ സംഭാഷണത്തിനിടയിൽ വളരെ സ്വാഭാവികമായി വന്ന ഒരു വാക്ക്.
        </p>
      </div>

      <blockquote className={styles.quote} data-reveal="quote" lang="ml">
        <p>ഒരു കൈയിൽ ഏന്തണം പുസ്തകം, മറുകൈയിലേന്തണം പണിയായുധം.”</p>
      </blockquote>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">
          പുസ്തകത്തെ അദ്ദേഹം നിരസിക്കുന്നില്ല. പഠനത്തെ ചെറുതാക്കുന്നുമില്ല. പക്ഷേ അറിവ് മണ്ണിൽ നിന്ന് അകന്നുപോകരുതെന്നാണ് പറയുന്നത്. ഒരു കൈയിൽ പുസ്തകം, അറിവിനായി. മറ്റേ കൈയിൽ പണിയായുധം, അധ്വാനത്തിനായി. ഒന്ന് ലോകത്തെ മനസ്സിലാക്കാൻ. മറ്റൊന്ന് ആ ലോകത്തെ നിലനിർത്താൻ.
        </p>
        <p className={styles.p} lang="ml">
          കമ്മനയിലെ ആ വീട്ടിൽ നിന്ന് പുറത്തേക്ക് ഇറങ്ങുമ്പോൾ, ഞങ്ങൾ വന്ന അതേ വഴിയായിരുന്നു മുന്നിൽ. പക്ഷേ മടങ്ങുന്ന യാത്രയ്ക്ക് വരുമ്പോഴുണ്ടായിരുന്ന അതേ മനസ്സായിരുന്നില്ല. ഒരു മനുഷ്യനെ കാണാൻ പോയി. ഒരു ജീവിതത്തെ കേട്ടു. അതിലൂടെ ഒരു കാലത്തെ കുറച്ചെങ്കിലും തൊട്ടറിഞ്ഞു.
        </p>
        <p className={styles.p} lang="ml">
          അന്ന് ഞങ്ങളുടെ കൈയിൽ കുറിപ്പുകളുണ്ടായിരുന്നു. എഴുതിവെക്കാനുള്ള ഒരുപാട് വാക്കുകളും. പക്ഷേ മടങ്ങുമ്പോൾ മനസ്സിൽ ബാക്കിയായത് വാക്കുകളേക്കാൾ ചെറിയ ഒന്നായിരുന്നു, ഒരു വിത്ത്. കൈയിൽ ഒതുങ്ങുന്നത്ര ചെറിയത്. പക്ഷേ അതിനുള്ളിൽ ഒരു വിളയും, ഒരു കാലവും, ഒരുപക്ഷേ ഒരു തലമുറയും ഒളിഞ്ഞിരിക്കുന്നു.
        </p>
        <p className={styles.echo} lang="ml">
          രാമേട്ടൻ കാത്തുസൂക്ഷിക്കുന്നത് അതാണ്.
        </p>
      </div>

      <Plate shot={SHOTS.team} className={`${styles.plate} ${styles.wideBelow} ${styles.landscape}`} />

      <footer className={styles.end}>
        <div className={styles.credit} data-reveal="credit">
          <span className={styles.written}>Interview &amp; Words</span>
          <strong className={styles.creditName} lang="ml">മാഗസിൻ ടീം</strong>
          <span className={styles.role}>Kammana, Wayanad</span>
        </div>
      </footer>
    </section>
  );
}

export default CheruvayalRaman;
