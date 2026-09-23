"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import styles from "./misty-paths-story.module.css";

const STORY_PARTS = [
  "വയനാട്ടിലെ മഴയ്ക്ക് ഒരു പ്രത്യേക സ്വഭാവമുണ്ട്. അത് വെറുതെ പെയ്യുകയല്ല. ഓർമ്മകളെ നനയ്ക്കും.",
  "ക്യാമ്പസിലെ ആദ്യദിവസം, മൂടൽമഞ്ഞ് കോറിഡോറിലൂടെ നടന്നു വരുന്നത് പോലെ തോന്നി. ചുറ്റും അപരിച്ചിത മുഖങ്ങൾ. പരിചയമില്ലാത്ത ക്ലാസ് റൂമുകൾ. ഭാവിയെ കുറിച്ചുള്ള നൂറുക്കണക്കിന് ചോദ്യങ്ങൾ.",
  "അവിടെ വെച്ചാണ് അവളെ ആദ്യം കണ്ടത്. ജനലരികിലെ ബെഞ്ചിൽ ഇരുന്നു മഴ നോക്കുന്ന ഒരു പെൺകുട്ടി. പേരറിയില്ല, സംസാരിച്ചിട്ടില്ല, പക്ഷേ മഴത്തുള്ളികൾ ജനലിൽ തട്ടിപ്പൊട്ടുമ്പോഴെല്ലാം അവളുടെ കണ്ണുകളിൽ ഒരു കഥയുണ്ടായിരുന്നു.",
  "കാലം കടന്നുപോയി. അപരിചിതർ സുഹൃത്തുക്കളായി. സുഹൃത്തുക്കൾ കുടുംബമായി.",
  "ക്ലാസിൽ അധ്യാപകൻ പഠിപ്പിക്കുമ്പോഴെല്ലാം, അവസാന ബെഞ്ചിലിരുന്ന് ലോകം മാറ്റാനുള്ള പദ്ധതികൾ ആസൂത്രണം ചെയ്തവർ. ലാബിൽ റീഡിങ്ങുകൾ എഴുതിയവർ. രാത്രി രണ്ടുമണിക്ക് ഹോസ്റ്റൽ മുറിയിൽ മാഗ്ഗി പങ്കുവെച്ചവർ.",
  "ആരുടെയെങ്കിലും മനസ്സ് തകരുമ്പോൾ ഒന്നും ചോദിക്കാതെ അടുത്തിരുന്നവർ. അതായിരുന്നു സൗഹൃദം.",
  "ഹോസ്റ്റൽ രാത്രികൾ മറ്റൊരു ലോകമായിരുന്നു. പരീക്ഷയുടെ തലേന്ന് പുസ്തകം തുറന്ന് ഉറങ്ങിപ്പോയവരും ഉറങ്ങാതെ ഇരുന്ന് ഭാവിയെ കുറിച്ച് സംസാരിച്ചവരും. മഴ പെയ്യുന്ന രാത്രികളിൽ ജനലരികിലിരുന്ന് ഓരോരുത്തരും അവരുടെ വീടുകളെക്കുറിച്ച് പറഞ്ഞ കഥകൾ.",
  "അവയിൽ ചിലത് സന്തോഷമായിരുന്നു, ചിലത് നിശബ്ദമായ വേദനകളും. എന്നാൽ ആരും ഒറ്റയ്ക്കായിരുന്നില്ല. കാരണം സൗഹൃദം എന്നത് ചിലപ്പോൾ ഒരു വാക്കല്ല, അടുത്തിരിക്കുന്ന ഒരാളുടെ സാന്നിധ്യമാണ്.",
  "അവളോട് സംസാരിക്കാൻ തുടങ്ങിയതും അങ്ങനെയായിരുന്നു. ഒരു മഴ ദിവസം. കാൻ്റീനിൽ ചായ വാങ്ങാൻ പോയപ്പോൾ.\n\nഅവൾ ചോദിച്ചു: \"മഴയെ ഇഷ്ടമാണോ?\"\nഅവൻ ചിരിച്ചു: \"നിനക്ക്?\"\n\"മഴയെക്കാൾ മഴയിൽ നഷ്ടപ്പെടുന്ന ആളുകളെയാണ് ഇഷ്ടം\"",
  "അന്നുമുതൽ അവളുടെ കഥ ആരംഭിച്ചു. പ്രണയം ഒരിക്കലും വലിയ പ്രഖ്യാപനങ്ങളായിരുന്നില്ല. ലൈബ്രറിയിൽ ഒരേ പുസ്തകത്തിൻ്റെ രണ്ട് അറ്റങ്ങൾ പിടിച്ചിരുന്നതായിരുന്നു. കോറിഡോറിലൂടെ നടന്നുപോകുമ്പോൾ ഒന്നും പറയാതെ ഒരുമിച്ച് മഴ നോക്കിയിരുന്നതായിരുന്നു.",
  "കാൻ്റീനിൽ ഒരു ചായ രണ്ട് പേരായി പങ്കിടുന്നതായിരുന്നു. പറയാത്ത വാക്കുകൾ മനസ്സിലാക്കുന്നതായിരുന്നു.",
  "സെമസ്റ്ററുകൾ കടന്നുപോയി. മൂടൽമഞ്ഞുകൾ വന്നുപോയി. വയനാടിന്റെ കുന്നുകൾ ഓരോ പ്രഭാതവും ക്യാമ്പസിനെ ചേർത്തുപിടിച്ചു. മഴയിന്നും പെയ്തു. സുഹൃത്തുക്കൾ ഇന്നും ചിരിച്ചു.",
  "അവസാന ദിവസം ശൂന്യമായ ക്ലാസ്റൂം. ചുവരുകളിൽ മാഞ്ഞുപ്പോകുന്ന കുറിപ്പുകൾ. കോറിഡോറിൽ മാഞ്ഞുപ്പോകുന്ന കാൽപ്പാടുകൾ. അവൻ ജനലരികിൽ നിന്നു. അവൾ അടുത്തുവന്നു. രണ്ടുപേരും പുറത്തുള്ള മഴയിലേക്ക് നോക്കി.",
  "ഒരുപാട് പറയാനുണ്ടായിരുന്നു പക്ഷേ ഒന്നും പറഞ്ഞില്ല. കാരണം ചില കഥകൾ അവസാനിക്കുമ്പോൾ വാക്കുകൾ വേണ്ടിവരില്ല. അവൾ പോകാൻ തിരിഞ്ഞു. അൽപനേരം കഴിഞ്ഞ് പിന്നിലേക്ക് നോക്കിച്ചിരിച്ചു. അത് അവരുടെ ആദ്യ കൂടിക്കാഴ്ചയിലെ അതേ ചിരിയായിരുന്നു.",
  "വർഷങ്ങൾക്കിപ്പുറം, ജീവിതം പല നഗരങ്ങളിലേക്കും മനുഷ്യരിലേക്കും വഴിത്തിരിഞ്ഞു. സുഹൃത്തുക്കൾ ഓരോരുത്തരും ഓരോ കഥകളായി മാറി.",
  "എന്നാൽ മഴ പെയ്യുമ്പോഴെല്ലാം, ഒരു പഴയ കോറിഡോർ മനസ്സിൽ തെളിയും. ഒരു ക്ലാസ് റൂമും. ഒരു ഹോസ്റ്റൽ മുറി. ഒരു കൂട്ടം സുഹൃത്തുക്കൾ. ഒരു ചായ. ഒരു പ്രണയം.",
  "അപ്പോൾ മനസ്സും മന്ദമായി പറയും:\n\n\"നമ്മൾ കോളേജിൽ പഠിച്ചത് പാഠപുസ്തകങ്ങൾ ആയിരുന്നില്ല സ്നേഹിക്കാനും നഷ്ടപ്പെടാനും ഓർമ്മിക്കാനും ആയിരുന്നു\""
];

const P = STORY_PARTS;
// Single-sentence paragraphs are the story's held breaths — set them a little larger.
const BEAT = 100;
const curly = (line: string) => line.replace(/"([^"]*)"/g, "“$1”");
const [exchangeLead, exchangeBody] = P[8].split("\n\n");
const exchangeLines = exchangeBody.split("\n").map(curly);
const [finaleLead, finaleQuote] = P[16].split("\n\n");

const PLATE_SIZES = "(max-width: 1100px) 100vw, 1040px";

function Para({ text }: { text: string }) {
  return <p className={text.length < BEAT ? `${styles.p} ${styles.beat}` : styles.p} lang="ml">{text}</p>;
}

function Ornament() {
  return <div className={styles.ornament} aria-hidden="true"><span /><span /><span /></div>;
}

function Plate({ src, alt, pos }: { src: string; alt: string; pos: string }) {
  return (
    <figure className={styles.plate} data-reveal>
      <Image src={resolveAsset(src)} alt={alt} fill sizes={PLATE_SIZES} className={styles.plateImage} style={{ objectPosition: pos }} />
    </figure>
  );
}

export function MistyPathsStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (motion.matches) return;
      // Only the images and the closing card ease in — body copy is never animated.
      const reveals = new IntersectionObserver((entries, self) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-shown", "true");
          self.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
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
    return () => { cleanup(); motion.removeEventListener("change", setup); };
  }, []);

  return (
    <section ref={root} id="sec-misty-paths-story" aria-labelledby="misty-paths-title" className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={resolveAsset("manjirangiya-vazhikal-path.webp")}
            alt="A stone path climbing through misty green hills at sunrise"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroBody}>
          <p className={styles.kicker}>Memoir</p>
          <h2 id="misty-paths-title" className={styles.title} lang="ml">മഞ്ഞിറങ്ങിയ<br />വഴികൾ</h2>
          <p className={styles.byline}>Anjali Krishna · ECE 3rd Year</p>
          <p className={styles.lede} lang="ml">{P[0]}</p>
        </div>
      </header>

      <div className={styles.prose}>
        <Para text={P[1]} />
        <Para text={P[2]} />
      </div>

      <Plate src="manjirangiya-vazhikal-path.webp" alt="A misty mountain path winding through green hills" pos="55% 52%" />

      <div className={styles.prose}>
        <Para text={P[3]} />
        <Para text={P[4]} />
        <Para text={P[5]} />
        <Para text={P[6]} />
        <Para text={P[7]} />
      </div>

      <Plate src="manjirangiya-vazhikal-dew.webp" alt="Dew on grass and ferns beside a path, with the sun rising through mist" pos="30% 50%" />

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">{exchangeLead}</p>
        <div className={styles.dialogue} lang="ml">
          {exchangeLines.map((line, index) => <p key={index}>{line}</p>)}
        </div>
        <Para text={P[9]} />
        <Para text={P[10]} />
        <Para text={P[11]} />
        <Ornament />
        <Para text={P[12]} />
        <Para text={P[13]} />
        <Ornament />
        <Para text={P[14]} />
        <Para text={P[15]} />
      </div>

      <figure className={styles.finale} data-reveal>
        <p className={styles.finaleLead} lang="ml">{finaleLead}</p>
        <blockquote lang="ml">{curly(finaleQuote)}</blockquote>
      </figure>

      <footer className={styles.end}>
        <div className={styles.author}>
          <Image src={resolveAsset("anjali.webp")} alt="" width={64} height={64} />
          <p>
            <span className={styles.written}>Written by</span>
            <strong lang="ml">അഞ്ജലി കൃഷ്ണ</strong>
            <span className={styles.role}>3rd Year · ECE</span>
          </p>
        </div>
      </footer>
    </section>
  );
}

export default MistyPathsStory;
