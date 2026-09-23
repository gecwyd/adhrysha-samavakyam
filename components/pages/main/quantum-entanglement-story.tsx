"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

const ML: CSSProperties = {
  fontFamily: "var(--font-malayalam), 'Noto Sans Malayalam', 'Manjari', 'Meera', system-ui, sans-serif",
};

const ACCENT = "#c1443b";

type Passage = { text: string; quote?: boolean };
type Chapter = { tag: string; image: string; alt: string; paragraphs: Passage[] };

const CHAPTERS: Chapter[] = [
  {
    tag: "01",
    image: "invisible-thread-entangled.webp",
    alt: "Two tiny points of soft white light far apart on a pure black field, joined by a single hair-thin thread",
    paragraphs: [
      { text: "പ്രപഞ്ചത്തിന്റെ അതിരുകളില്ലാത്ത വിസ്മയങ്ങൾക്കിടയിൽ, നമ്മുടെ സാധാരണ ധാരണകളെ തന്നെ ചോദ്യം ചെയ്യുന്ന ചില പ്രതിഭാസങ്ങളുണ്ട്. അവയിൽ ഏറ്റവും കൗതുകകരമായ ഒന്നാണ് ക്വാണ്ടം എന്റാംഗിൾമെന്റ്. ഒരിക്കൽ പരസ്പരം ബന്ധിക്കപ്പെട്ട രണ്ട് കണങ്ങൾ എത്ര വലിയ ദൂരത്തിൽ വേർപിരിഞ്ഞാലും, അവയുടെ അവസ്ഥകൾ തമ്മിൽ ഒരു വിചിത്രമായ പരസ്പരബന്ധം നിലനിൽക്കുന്നു." },
      { text: "ദൂരവും വേർപാടും ഒരു ബന്ധത്തിന്റെ അവസാനമാകണമെന്നില്ലെന്ന ആശയത്തിലേക്കാണ് ഈ പ്രതിഭാസം നമ്മെ കൂട്ടിക്കൊണ്ടുപോകുന്നത്. പക്ഷേ, കണങ്ങളുടെ ഈ വിചിത്രമായ ബന്ധത്തിന് മനുഷ്യജീവിതവുമായി എന്താണ് സാമ്യം?" },
      { text: "ബന്ധം എന്ന വാക്ക് കേൾക്കുമ്പോൾ ആദ്യം നമ്മുടെ മനസ്സിലെത്തുന്നത് അടുപ്പമാണ്. ഒരുമിച്ചുള്ള നിമിഷങ്ങൾ, സംഭാഷണങ്ങൾ, സാന്നിധ്യം, ഇവയൊക്കെയാണ് ഒരു ബന്ധത്തെ നമുക്ക് പരിചിതമാക്കുന്നത്. അതുകൊണ്ടുതന്നെ ദൂരം കൂടുമ്പോൾ ബന്ധവും മങ്ങിപ്പോകുമെന്നാണ് നാം പലപ്പോഴും കരുതുന്നത്." },
      { text: "എന്നാൽ ഒരിക്കൽ നമ്മുടെ ജീവിതത്തിന്റെ ഭാഗമായിത്തീർന്ന ഒരാളെ, കിലോമീറ്ററുകൾക്ക് അകലെ എന്നൊരു കാരണംകൊണ്ട് മാത്രം നമ്മുടെ മനസ്സിൽ നിന്ന് അകറ്റാനാകുമോ?", quote: true },
    ],
  },
  {
    tag: "02",
    image: "invisible-thread-corridor.webp",
    alt: "An empty college corridor at dusk, long soft shadows, two blurred silhouettes far away as if laughing",
    paragraphs: [
      { text: "ഒരുപക്ഷേ, അതിനുള്ള ഉത്തരം നമ്മുടെ കോളേജ് ജീവിതത്തിന്റെ ഇടനാഴികളിലൊളിഞ്ഞിരിപ്പുണ്ടാകാം. അപരിചിതരായാണ് നമ്മൾ കോളേജിലേക്ക് കടന്നുവരുന്നത്. ഓരോരുത്തരുടെയും ഉള്ളിൽ ഓരോ കഥയും, ഓരോ സ്വപ്നവും, ഓരോ ഭയവും. പിന്നെ, അറിയാത്ത മുഖങ്ങൾ പതിയെ പരിചിതമാകുന്നു. പരിചയങ്ങൾ സൗഹൃദങ്ങളാകുന്നു." },
      { text: "ക്ലാസുകൾക്കിടയിലെ ചെറിയ സംഭാഷണങ്ങൾ, ഇടനാഴിയിൽ പൊട്ടിച്ചിരിച്ച നിമിഷങ്ങൾ, പരീക്ഷയ്ക്ക് മുമ്പുള്ള പരിഭ്രമം, കാന്റീനിൽ പങ്കിട്ട ഭക്ഷണം, ക്ഷീണിച്ച ഒരു ദിവസത്തെ പോലും ചിരിയാക്കി മാറ്റിയ ഒരു തമാശ, അന്നൊക്കെ നിസ്സാരമെന്ന് തോന്നിയ നിമിഷങ്ങളാണ് പിന്നീട് ജീവിതത്തിലെ ഏറ്റവും വിലപ്പെട്ട ഓർമ്മകളായി മാറുന്നത്." },
      { text: "പിന്നെ, പതിവുപോലെ സമയം മുന്നോട്ട് ഒഴുകുന്നു. ഒരിക്കൽ ശബ്ദങ്ങളാൽ നിറഞ്ഞിരുന്ന ക്ലാസ് മുറികൾ നിശ്ശബ്ദമാകുന്നു. ഒരുമിച്ച് നടന്നിരുന്ന ഇടനാഴികൾ പിന്നിലാകുന്നു. ദിവസവും കണ്ടിരുന്ന മുഖങ്ങൾ ഓരോന്നായി അകലങ്ങളിലേക്ക് യാത്രതിരിക്കുന്നു." },
      { text: "അപ്പോഴാണ് ഒരു ചോദ്യം പതിയെ മനസ്സിൽ ഉയരുന്നത്: ദൂരം നമ്മെ വേർതിരിക്കുമ്പോൾ, നമ്മെ ബന്ധിപ്പിച്ചിരുന്ന ആ നൂലിഴയും മുറിഞ്ഞുപോകുമോ?", quote: true },
    ],
  },
  {
    tag: "03",
    image: "invisible-thread-trace.webp",
    alt: "Close-up of two hands, not touching, with dust motes drifting in a thin beam of light",
    paragraphs: [
      { text: "എല്ലായ്പ്പോഴും അങ്ങനെയല്ല. വർഷങ്ങളായി സംസാരിക്കാത്ത ഒരാളുടെ ഒരു ചിത്രം കണ്ടാൽ, മനസ്സ് പെട്ടെന്ന് പഴയൊരു കാലത്തിലേക്ക് മടങ്ങിപ്പോകും. ഒരിക്കൽ ഒരുമിച്ച് കേട്ട പാട്ട് ഒരു സായാഹ്നത്തെ വീണ്ടും നമ്മുടെ മുന്നിലെത്തിക്കും. സമയം കടന്നുപോകുന്നു. പക്ഷേ ചില ഓർമ്മകൾ സമയത്തോടൊപ്പം കടന്നുപോകുന്നില്ല." },
      { text: "അതിലും അത്ഭുതകരമായത്, നമ്മൾ കണ്ടുമുട്ടുന്ന ആളുകൾ നമ്മിൽ അവശേഷിപ്പിക്കുന്ന അടയാളങ്ങളാണ്. നാം കണ്ടുമുട്ടുന്ന ഓരോ മനുഷ്യനും നമ്മിൽ ഒരു ചെറിയ ഭാഗം അവശേഷിപ്പിച്ചാണ് കടന്നുപോകുന്നത്. നാം പിന്നീട് ആയിത്തീരുന്ന വ്യക്തിയിൽ, ഒരിക്കൽ നമ്മോടൊപ്പം നടന്നിരുന്ന പലരുടെയും ചെറിയ അടയാളങ്ങൾ ഉണ്ടാകും." },
      { text: "ക്വാണ്ടം എന്റാംഗിൾമെന്റ് മനുഷ്യസൗഹൃദത്തിന്റെയോ ഓർമ്മകളുടെയോ ശാസ്ത്രീയ വിശദീകരണമല്ല. എന്നിരുന്നാലും, ബന്ധം എന്നത് സാന്നിധ്യത്തിൽ മാത്രം ഒതുങ്ങുന്നതാണോ എന്നൊരു ചോദ്യം അത് നമുക്ക് മുന്നിൽ വയ്ക്കുന്നു." },
      { text: "ഒരുപക്ഷേ ബന്ധം എന്നത് എപ്പോഴും അരികിലുണ്ടാകുന്നതല്ല. അത് ഒരാളിൽ നിന്ന് മറ്റൊരാളിലേക്ക് പകരുന്ന സ്വാധീനമായിരിക്കാം. കാലം മായ്ച്ചുകളയാത്ത ഓർമ്മയായിരിക്കാം. നിശ്ശബ്ദമായി നമ്മിൽ അവശേഷിക്കുന്ന ഒരു അടയാളമായിരിക്കാം.", quote: true },
    ],
  },
  {
    tag: "04",
    image: "invisible-thread-woven.webp",
    alt: "Macro photograph of dark grey fabric with a single thread woven through it, running edge to edge",
    paragraphs: [
      { text: "ജീവിതം മുന്നോട്ട് പോകുമ്പോൾ നമ്മൾ പലരെയും കണ്ടുമുട്ടുന്നു. ചിലർ വീണ്ടും അപരിചിതരാകുന്നു. ചിലർ സുഹൃത്തുക്കളായി തുടരുന്നു. ചിലർ നമ്മുടെ ദൈനംദിന ജീവിതത്തിൽ നിന്ന് അകന്നുപോകുന്നു. എന്നിട്ടും, അവർ നമ്മുടെ ഓർമ്മകളിൽ എവിടെയോ തുടരുന്നു." },
      { text: "നമ്മുടെ കഥകൾ ആരംഭിച്ചിടത്തുനിന്ന് ഒരിക്കൽ ആയിരക്കണക്കിന് കിലോമീറ്ററുകൾ അകലെ നാം എത്തിയേക്കാം. എങ്കിലും ഭൂതകാലം എല്ലായ്പ്പോഴും പിന്നിലായിരിക്കണമെന്നില്ല." },
      { text: "ഒരുപക്ഷേ, അതുകൊണ്ടുതന്നെ നാമെല്ലാവരും കാലത്തിൽ കുരുങ്ങിയ ബന്ധങ്ങളാണ്, ദൂരങ്ങളാൽ വേർപെട്ടിട്ടും, നമ്മെ രൂപപ്പെടുത്തിയ നിമിഷങ്ങളാൽ പരസ്പരം ബന്ധിക്കപ്പെട്ടവർ.", quote: true },
    ],
  },
];

const CLOSING =
  "കാരണം ചില ബന്ധങ്ങൾക്ക് കിലോമീറ്ററുകൾ അളവുകോലാകില്ല. ചില ബന്ധങ്ങൾക്ക് വർഷങ്ങളും അതിരാകില്ല. ചിലത് വെറുതെ നിലനിൽക്കും: നമ്മുടെ ഓർമ്മകളിൽ, നമ്മുടെ സ്വഭാവത്തിൽ, നാം ആയിത്തീർന്ന മനുഷ്യനിൽ, നിശ്ശബ്ദമായി നെയ്തുചേർന്നുകൊണ്ട്.";

/* Continuous scroll-scrubbed line: brightness and position track scroll
   position directly (in and back out), never a one-shot viewport trigger. */
function ScrollLine({
  children,
  className,
  style,
  lang,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  lang?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 30%"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.18, 1, 1, 0.18]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [22, 0, 0, -22]);

  return (
    <motion.p
      ref={ref}
      lang={lang}
      style={reduce ? style : { ...style, opacity, y }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

/* A gentle vertical drift on the image as it crosses the viewport. */
function ParallaxImage({ image, alt }: { image: string; alt: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <div ref={ref} className="relative mb-14 aspect-[4/3] w-full overflow-hidden bg-white/5 sm:mb-16">
      <motion.div style={reduce ? undefined : { y }} className="absolute -top-6 -bottom-6 left-0 right-0">
        <Image
          src={resolveAsset(image)}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

function ChapterBlock({ chapter }: { chapter: Chapter }) {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-white/35">{chapter.tag}</p>

      <ParallaxImage image={chapter.image} alt={chapter.alt} />

      <div className="space-y-8">
        {chapter.paragraphs.map((passage, index) =>
          passage.quote ? (
            <ScrollLine
              key={index}
              lang="ml"
              style={{ ...ML, color: ACCENT }}
              className="text-2xl font-light italic leading-[1.6] sm:text-3xl"
            >
              {passage.text}
            </ScrollLine>
          ) : (
            <ScrollLine
              key={index}
              lang="ml"
              style={ML}
              className="text-[1.05rem] font-light leading-[2] text-white/80 sm:text-lg"
            >
              {passage.text}
            </ScrollLine>
          ),
        )}
      </div>
    </article>
  );
}

/* The hero recedes — fading and lifting away — as the page scrolls past it. */
function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <header ref={ref} className="mx-auto flex min-h-[70dvh] max-w-2xl flex-col justify-center px-6 py-32 text-center">
      <motion.div style={reduce ? undefined : { opacity, y }}>
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.35em] text-white/35">Phenomenon · 03B</p>
        <h2 id="quantum-story-title" className="text-3xl font-light leading-[1.4] sm:text-5xl" style={ML} lang="ml">
          ബന്ധങ്ങളുടെ അദൃശ്യനൂൽ
        </h2>
        <p className="mt-8 text-lg font-light italic leading-[1.8] text-white/50 sm:text-xl" style={ML} lang="ml">
          ദൂരങ്ങൾക്കപ്പുറവും ചില ബന്ധങ്ങൾ നിലനിൽക്കുമോ?
        </p>
      </motion.div>
    </header>
  );
}

export function QuantumEntanglementStory() {
  return (
    <section
      id="sec-quantum-story"
      aria-labelledby="quantum-story-title"
      className="relative w-full bg-black text-[#f2ede2] selection:bg-[#c1443b] selection:text-white"
    >
      <Hero />

      {CHAPTERS.map((chapter) => (
        <ChapterBlock key={chapter.tag} chapter={chapter} />
      ))}

      <footer className="mx-auto max-w-2xl px-6 py-32 text-center">
        <ScrollLine lang="ml" style={ML} className="text-2xl font-light italic leading-[1.7] sm:text-3xl">
          {CLOSING}
        </ScrollLine>
        <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">2025–26</p>
      </footer>
    </section>
  );
}

export default QuantumEntanglementStory;
