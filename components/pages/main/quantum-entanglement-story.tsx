"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STORY_SECTIONS = [
  {
    image: resolveAsset("quantum_thread.jpg"),
    paragraphs: [
      "പ്രപഞ്ചത്തിന്റെ അതിരുകളില്ലാത്ത വിസ്മയങ്ങൾക്കിടയിൽ, നമ്മുടെ സാധാരണ ധാരണകളെ തന്നെ ചോദ്യം ചെയ്യുന്ന ചില പ്രതിഭാസങ്ങളുണ്ട്. അവയിൽ ഏറ്റവും കൗതുകകരമായ ഒന്നാണ് ക്വാണ്ടം എന്റാംഗിൾമെന്റ്. ഒരിക്കൽ പരസ്പരം ബന്ധിക്കപ്പെട്ട രണ്ട് കണങ്ങൾ എത്ര വലിയ ദൂരത്തിൽ വേർപിരിഞ്ഞാലും, അവയുടെ അവസ്ഥകൾ തമ്മിൽ ഒരു വിചിത്രമായ പരസ്പരബന്ധം നിലനിൽക്കുന്നു.",
      "ദൂരവും വേർപാടും ഒരു ബന്ധത്തിന്റെ അവസാനമാകണമെന്നില്ലെന്ന ആശയത്തിലേക്കാണ് ഈ പ്രതിഭാസം നമ്മെ കൂട്ടിക്കൊണ്ടുപോകുന്നത്. പക്ഷേ, കണങ്ങളുടെ ഈ വിചിത്രമായ ബന്ധത്തിന് മനുഷ്യജീവിതവുമായി എന്താണ് സാമ്യം?",
      "ബന്ധം എന്ന വാക്ക് കേൾക്കുമ്പോൾ ആദ്യം നമ്മുടെ മനസ്സിലെത്തുന്നത് അടുപ്പമാണ്. ഒരുമിച്ചുള്ള നിമിഷങ്ങൾ, സംഭാഷണങ്ങൾ, സാന്നിധ്യം—ഇവയൊക്കെയാണ് ഒരു ബന്ധത്തെ നമുക്ക് പരിചിതമാക്കുന്നത്. അതുകൊണ്ടുതന്നെ ദൂരം കൂടുമ്പോൾ ബന്ധവും മങ്ങിപ്പോകുമെന്നാണ് നാം പലപ്പോഴും കരുതുന്നത്.",
      "എന്നാൽ ഒരിക്കൽ നമ്മുടെ ജീവിതത്തിന്റെ ഭാഗമായിത്തീർന്ന ഒരാളെ, കിലോമീറ്ററുകൾക്ക് അകലെ എന്നൊരു കാരണംകൊണ്ട് മാത്രം നമ്മുടെ മനസ്സിൽ നിന്ന് അകറ്റാനാകുമോ?"
    ]
  },
  {
    image: resolveAsset("college_corridor.jpg"),
    paragraphs: [
      "ഒരുപക്ഷേ, അതിനുള്ള ഉത്തരം നമ്മുടെ കോളേജ് ജീവിതത്തിന്റെ ഇടനാഴികളിലൊളിഞ്ഞിരിപ്പുണ്ടാകാം. അപരിചിതരായാണ് നമ്മൾ കോളേജിലേക്ക് കടന്നുവരുന്നത്. ഓരോരുത്തരുടെയും ഉള്ളിൽ ഓരോ കഥയും, ഓരോ സ്വപ്നവും, ഓരോ ഭയവും. പിന്നെ, അറിയാത്ത മുഖങ്ങൾ പതിയെ പരിചിതമാകുന്നു. പരിചയങ്ങൾ സൗഹൃദങ്ങളാകുന്നു.",
      "ക്ലാസുകൾക്കിടയിലെ ചെറിയ സംഭാഷണങ്ങൾ, ഇടനാഴിയിൽ പൊട്ടിച്ചിരിച്ച നിമിഷങ്ങൾ, പരീക്ഷയ്ക്ക് മുമ്പുള്ള പരിഭ്രമം, കാന്റീനിൽ പങ്കിട്ട ഭക്ഷണം, ക്ഷീണിച്ച ഒരു ദിവസത്തെ പോലും ചിരിയാക്കി മാറ്റിയ ഒരു തമാശ—അന്നൊക്കെ നിസ്സാരമെന്ന് തോന്നിയ നിമിഷങ്ങളാണ് പിന്നീട് ജീവിതത്തിലെ ഏറ്റവും വിലപ്പെട്ട ഓർമ്മകളായി മാറുന്നത്.",
      "പിന്നെ, പതിവുപോലെ സമയം മുന്നോട്ട് ഒഴുകുന്നു. ഒരിക്കൽ ശബ്ദങ്ങളാൽ നിറഞ്ഞിരുന്ന ക്ലാസ് മുറികൾ നിശ്ശബ്ദമാകുന്നു. ഒരുമിച്ച് നടന്നിരുന്ന ഇടനാഴികൾ പിന്നിലാകുന്നു. ദിവസവും കണ്ടിരുന്ന മുഖങ്ങൾ ഓരോന്നായി അകലങ്ങളിലേക്ക് യാത്രതിരിക്കുന്നു.",
      "അപ്പോഴാണ് ഒരു ചോദ്യം പതിയെ മനസ്സിൽ ഉയരുന്നത്— ദൂരം നമ്മെ വേർതിരിക്കുമ്പോൾ, നമ്മെ ബന്ധിപ്പിച്ചിരുന്ന ആ നൂലിഴയും മുറിഞ്ഞുപോകുമോ?"
    ]
  },
  {
    image: resolveAsset("distant_connection.jpg"),
    paragraphs: [
      "എല്ലായ്പ്പോഴും അങ്ങനെയല്ല. വർഷങ്ങളായി സംസാരിക്കാത്ത ഒരാളുടെ ഒരു ചിത്രം കണ്ടാൽ, മനസ്സ് പെട്ടെന്ന് പഴയൊരു കാലത്തിലേക്ക് മടങ്ങിപ്പോകും. ഒരിക്കൽ ഒരുമിച്ച് കേട്ട പാട്ട് ഒരു സായാഹ്നത്തെ വീണ്ടും നമ്മുടെ മുന്നിലെത്തിക്കും. സമയം കടന്നുപോകുന്നു. പക്ഷേ ചില ഓർമ്മകൾ സമയത്തോടൊപ്പം കടന്നുപോകുന്നില്ല.",
      "അതിലും അത്ഭുതകരമായത്, നമ്മൾ കണ്ടുമുട്ടുന്ന ആളുകൾ നമ്മിൽ അവശേഷിപ്പിക്കുന്ന അടയാളങ്ങളാണ്. നാം കണ്ടുമുട്ടുന്ന ഓരോ മനുഷ്യനും നമ്മിൽ ഒരു ചെറിയ ഭാഗം അവശേഷിപ്പിച്ചാണ് കടന്നുപോകുന്നത്. നാം പിന്നീട് ആയിത്തീരുന്ന വ്യക്തിയിൽ, ഒരിക്കൽ നമ്മോടൊപ്പം നടന്നിരുന്ന പലരുടെയും ചെറിയ അടയാളങ്ങൾ ഉണ്ടാകും.",
      "ക്വാണ്ടം എന്റാംഗിൾമെന്റ് മനുഷ്യസൗഹൃദത്തിന്റെയോ ഓർമ്മകളുടെയോ ശാസ്ത്രീയ വിശദീകരണമല്ല. എന്നിരുന്നാലും, ബന്ധം എന്നത് സാന്നിധ്യത്തിൽ മാത്രം ഒതുങ്ങുന്നതാണോ എന്നൊരു ചോദ്യം അത് നമുക്ക് മുന്നിൽ വയ്ക്കുന്നു.",
      "ഒരുപക്ഷേ ബന്ധം എന്നത് എപ്പോഴും അരികിലുണ്ടാകുന്നതല്ല. അത് ഒരാളിൽ നിന്ന് മറ്റൊരാളിലേക്ക് പകരുന്ന സ്വാധീനമായിരിക്കാം. കാലം മായ്ച്ചുകളയാത്ത ഓർമ്മയായിരിക്കാം. നിശ്ശബ്ദമായി നമ്മിൽ അവശേഷിക്കുന്ന ഒരു അടയാളമായിരിക്കാം."
    ]
  },
  {
    image: resolveAsset("quantum_thread.jpg"),
    paragraphs: [
      "ജീവിതം മുന്നോട്ട് പോകുമ്പോൾ നമ്മൾ പലരെയും കണ്ടുമുട്ടുന്നു. ചിലർ വീണ്ടും അപരിചിതരാകുന്നു. ചിലർ സുഹൃത്തുക്കളായി തുടരുന്നു. ചിലർ നമ്മുടെ ദൈനംദിന ജീവിതത്തിൽ നിന്ന് അകന്നുപോകുന്നു. എന്നിട്ടും, അവർ നമ്മുടെ ഓർമ്മകളിൽ എവിടെയോ തുടരുന്നു.",
      "നമ്മുടെ കഥകൾ ആരംഭിച്ചിടത്തുനിന്ന് ഒരിക്കൽ ആയിരക്കണക്കിന് കിലോമീറ്ററുകൾ അകലെ നാം എത്തിയേക്കാം. എങ്കിലും ഭൂതകാലം എല്ലായ്പ്പോഴും പിന്നിലായിരിക്കണമെന്നില്ല.",
      "ഒരുപക്ഷേ, അതുകൊണ്ടുതന്നെ നാമെല്ലാവരും കാലത്തിൽ കുരുങ്ങിയ ബന്ധങ്ങളാണ്—ദൂരങ്ങളാൽ വേർപെട്ടിട്ടും, നമ്മെ രൂപപ്പെടുത്തിയ നിമിഷങ്ങളാൽ പരസ്പരം ബന്ധിക്കപ്പെട്ടവർ.",
      "കാരണം ചില ബന്ധങ്ങൾക്ക് കിലോമീറ്ററുകൾ അളവുകോലാകില്ല. ചില ബന്ധങ്ങൾക്ക് വർഷങ്ങളും അതിരാകില്ല. ചിലത് വെറുതെ നിലനിൽക്കും— നമ്മുടെ ഓർമ്മകളിൽ, നമ്മുടെ സ്വഭാവത്തിൽ, നാം ആയിത്തീർന്ന മനുഷ്യനിൽ, നിശ്ശബ്ദമായി നെയ്തുചേർന്നുകൊണ്ട്."
    ]
  }
];

export function QuantumEntanglementStory() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="sec-quantum-story"
      aria-labelledby="quantum-story-title"
      className="relative w-full bg-[#050505] text-[#fafafa] selection:bg-white selection:text-black"
    >
      {/* Sticky Background Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="sticky top-0 left-0 w-full md:w-1/2 h-[100dvh] overflow-hidden">
          {STORY_SECTIONS.map((section, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={section.image}
                alt={`Quantum entanglement imagery section ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient Overlay for text readability on mobile and blending on desktop */}
              <div className="absolute inset-0 bg-[#050505]/80 md:bg-transparent" />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]" />
              <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full md:w-1/2 md:ml-auto flex flex-col pt-32 pb-32 px-6 sm:px-10 lg:px-16">
        
        {/* Mobile Title */}
        <div className="md:hidden flex flex-col gap-4 mb-[40vh]">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
            The Invisible Thread
          </p>
          <h2
            id="quantum-story-title"
            className="font-sans text-5xl font-light leading-[1.2] tracking-wide text-white drop-shadow-lg"
            lang="ml"
          >
            ബന്ധങ്ങളുടെ
            <br />
            <span className="font-serif italic text-white/80">അദൃശ്യനൂൽ</span>
          </h2>
        </div>

        {/* Desktop Title */}
        <div className="hidden md:flex flex-col gap-6 mb-32 pt-12">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            The Invisible Thread
          </p>
          <h2
            className="font-sans text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.2] tracking-wide text-white"
            lang="ml"
          >
            ബന്ധങ്ങളുടെ
            <br />
            <span className="font-serif italic text-white/60">അദൃശ്യനൂൽ</span>
          </h2>
          <p
            className="mt-4 font-serif text-xl text-white/40 italic"
            lang="ml"
          >
            ദൂരങ്ങൾക്കപ്പുറവും ചില ബന്ധങ്ങൾ നിലനിൽക്കുമോ?
          </p>
        </div>

        {/* Scrollable Story Blocks */}
        <div className="flex flex-col gap-[40vh] md:gap-[60vh] pb-[20vh]">
          {STORY_SECTIONS.map((section, sectionIdx) => (
            <motion.div 
              key={sectionIdx}
              onViewportEnter={() => setActiveIndex(sectionIdx)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              className="flex flex-col gap-12 sm:gap-16 relative"
            >
              {section.paragraphs.map((para, paraIdx) => (
                <motion.p
                  key={paraIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans font-light text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] leading-[1.9] text-white/90 tracking-wide text-justify sm:text-left drop-shadow-sm"
                  lang="ml"
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>
          ))}
        </div>
        
        {/* Footer for the component */}
        <div className="mt-20 pt-10 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/30 gap-4">
          <span>Inquation 2025–26</span>
          <span>End of Chapter</span>
        </div>

      </div>
    </section>
  );
}

export default QuantumEntanglementStory;
