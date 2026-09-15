"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ThamodwaramEssayPage() {
  // To ensure the page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-black text-[#e6e0d3] selection:bg-[#d99065]/30">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <Link 
          href="/#sec-q" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e6e0d3] hover:text-[#d99065] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main
        </Link>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
    </main>
  );
}

const Section1 = () => {
  return (
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl text-center relative z-10 space-y-8"
      >
        <h3 className="text-3xl md:text-5xl font-light text-[#d99065] mb-12 tracking-wider">
          അഗാധതയുടെ അപ്പുറം
        </h3>
        <p className="text-xl md:text-3xl leading-relaxed text-[#c4bcaa]">
          തമോദ്വാരം എന്നത് പ്രപഞ്ചത്തിലെ അതിഗുരുത്വാകർഷണം നിറഞ്ഞ ഒരു മേഖലയാണ്. അതിന്റെ ആകർഷണശക്തി അത്രമേൽ പ്രബലമാണ്; വെളിച്ചത്തിന് പോലും അതിൽ നിന്ന് രക്ഷപ്പെടാനാവില്ല.
        </p>
        <p className="text-lg md:text-2xl leading-relaxed text-[#a39b8c]">
          അത്യന്തം സാന്ദ്രമായി ചുരുങ്ങിക്കൂടിയ ദ്രവ്യത്തിന്റെ അദൃശ്യരൂപമാണത്. തമോദ്വാരം യഥാർത്ഥത്തിൽ എന്തിനെല്ലാം വിഴുങ്ങുന്നു? ഇന്നും ശാസ്ത്രലോകം വ്യക്തമായ ഉത്തരങ്ങൾ തേടിക്കൊണ്ടിരിക്കുകയാണ്. പ്രകാശം പുറപ്പെടുവിക്കുകയോ പ്രതിഫലിപ്പിക്കുകയോ ചെയ്യാത്തതിനാൽ, അവ മനുഷ്യന്റെ കണ്ണിനും ദൂരദർശിനികൾക്കും അദൃശ്യമാണ്.
        </p>
      </motion.div>
    </div>
  )
}

const Section2 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  
  const opacity1 = useTransform(smooth, [0, 0.25, 0.5], [0, 1, 0]);
  const scale1 = useTransform(smooth, [0, 0.25, 0.5], [0.9, 1, 1.1]);
  
  const opacity2 = useTransform(smooth, [0.5, 0.75, 1], [0, 1, 0]);
  const scale2 = useTransform(smooth, [0.5, 0.75, 1], [0.5, 1, 4]);
  const filter2 = useTransform(smooth, [0.5, 0.75, 1], ["blur(20px)", "blur(0px)", "blur(10px)"]);

  return (
    <div ref={ref} className="h-[250vh] relative w-full">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: opacity1, scale: scale1 }} className="absolute px-6 text-center w-full">
          <p className="text-3xl md:text-5xl lg:text-7xl text-[#e6e0d3] italic font-light leading-tight">
            എന്നാൽ തമോദ്വാരം ശാസ്ത്രത്തിലെ ഒരു പദം മാത്രമാണോ?
          </p>
        </motion.div>
        
        <motion.div style={{ opacity: opacity2, scale: scale2, filter: filter2 }} className="absolute text-center">
          <p className="text-7xl md:text-[150px] font-black text-[#d99065] drop-shadow-[0_0_40px_rgba(217,144,101,0.6)]">
            അല്ല.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

const Section3 = () => {
  const words = [
    { text: "ഏകാന്തത", top: "15%", left: "10%", delay: 0 },
    { text: "പരാജയം", top: "45%", left: "75%", delay: 0.2 },
    { text: "ദുഃഖം", top: "75%", left: "15%", delay: 0.4 },
    { text: "അനിശ്ചിതത്വം", top: "25%", left: "65%", delay: 0.6 },
    { text: "അർഥമില്ലായ്മ", top: "80%", left: "60%", delay: 0.8 },
  ];

  return (
    <div className="relative min-h-[150vh] flex flex-col justify-center items-center py-32 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {words.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
            whileInView={{ opacity: 0.05, y: -100, filter: "blur(2px)" }}
            transition={{ duration: 4, delay: w.delay, ease: "linear" }}
            viewport={{ once: false, margin: "200px" }}
            className="absolute text-5xl md:text-8xl lg:text-9xl font-black text-[#d99065] uppercase whitespace-nowrap"
            style={{ top: w.top, left: w.left, transform: "translate(-50%, -50%)" }}
          >
            {w.text}
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-4xl space-y-20 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-2xl md:text-4xl text-[#c4bcaa] leading-relaxed"
        >
          മനുഷ്യന്റെ ജീവിതത്തിലും അനേകം തമോദ്വാരങ്ങൾ ഉണ്ട്. ഇവയെല്ലാം പതിയെ നമ്മുടെ ഉള്ളിലേക്ക് വലിച്ചിഴച്ച്, പ്രതീക്ഷകളെയും ആത്മവിശ്വാസത്തെയും വിഴുങ്ങാൻ ശ്രമിക്കുന്ന അദൃശ്യശക്തികളാണ്.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 text-xl md:text-3xl text-[#a39b8c] leading-relaxed max-w-3xl mx-auto"
        >
          <p>
            മറ്റുള്ളവരുമായി ചേർന്നുനിൽക്കാൻ കഴിയാത്ത അവസ്ഥ, സ്വന്തമായ ഇടം കണ്ടെത്താനാകാത്ത വേദന, സ്വയം അപര്യാപ്തനാണെന്ന തോന്നൽ—ഇവയൊക്കെയാണ് മനസ്സിലെ തമോദ്വാരങ്ങളുടെ രൂപങ്ങൾ.
          </p>
          <p className="text-[#e6e0d3]">
            ഓരോ ജീവിതത്തിലും നമ്മെ വിഴുങ്ങുമെന്നു തോന്നുന്ന നിമിഷങ്ങൾ ഉണ്ടാകും. എന്നാൽ ആ ഇരുട്ടിന് അപ്പുറം മനുഷ്യൻ കണ്ടെത്തുന്നത് അതിജീവനത്തിന്റെ ശക്തിയാണ്; പുതിയൊരു കാഴ്ചപ്പാടും പുതിയ തുടക്കങ്ങളുമാണ്.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

const Section4 = () => {
  return (
    <div className="relative min-h-screen py-32 px-6 max-w-5xl mx-auto flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-24"
      >
        <p className="text-3xl md:text-5xl text-[#d99065] font-light leading-snug mb-8">
          സൂര്യൻ ഒരുനാൾ തമോദ്വാരമായി മാറിയാലും ഭൂമി അതിലേക്ക് വലിച്ചിഴക്കപ്പെടില്ല. <br/>
          <span className="text-[#e6e0d3] font-medium mt-4 inline-block">അതുപോലെ തന്നെയാണ് മനുഷ്യജീവിതവും.</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 text-lg md:text-2xl text-[#c4bcaa]">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <ul className="space-y-4 border-l-2 border-[#d99065]/30 pl-6 text-[#a39b8c] italic">
            <li>പരാജയങ്ങളുടെ പേരിൽ സ്വയം കുറ്റപ്പെടുത്തൽ...</li>
            <li>മറ്റുള്ളവരുമായി സ്വയം താരതമ്യം ചെയ്യൽ...</li>
            <li>കാണപ്പെടുന്നില്ലെന്ന തോന്നലിൽ നിന്നുള്ള അസ്തിത്വപരമായ ഏകാന്തത...</li>
            <li>അനുഭവങ്ങളിൽ നിന്ന് പഠിക്കാതെ അവയെ വിധിയെഴുതൽ...</li>
          </ul>
          <p className="mt-8 text-[#e6e0d3]">ഇവയെല്ലാം ഹൃദയത്തെ വിഴുങ്ങാൻ ശ്രമിക്കുന്ന മനസ്സിന്റെ തമോദ്വാരങ്ങളാണ്.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-6">
          <p>
            എന്നാൽ ഈ ഭൂമിയിലെ സ്വയംബോധമുള്ള ഏക ജീവിയായ മനുഷ്യന് അവയെ അതിജീവിക്കാനുള്ള കഴിവുണ്ട്. ഇരുട്ടിലേക്ക് വീഴാതെ, അതിലൂടെ നടന്ന് വെളിച്ചത്തിലെത്താൻ അവന് സാധിക്കും.
          </p>
          <p>
            പരാജയങ്ങൾ നമ്മുടെ പരിമിതികളെ കാണിച്ചുതരുന്നു. എല്ലാം നേടാൻ കഴിയില്ലെന്നും, എല്ലാം രക്ഷിക്കാനാവില്ലെന്നും അവ നമ്മെ പഠിപ്പിക്കുന്നു. എന്നാൽ അതുകൊണ്ട് യാത്ര അവസാനിക്കുന്നില്ല.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

const Section5 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <div ref={ref} className="min-h-[120vh] flex flex-col items-center justify-center py-32 px-6 relative">
      <motion.div style={{ scale, opacity, y }} className="text-center w-full max-w-5xl relative z-10">
        
        <div className="mb-24 p-8 md:p-16 border border-[#d99065]/20 bg-gradient-to-b from-[#d99065]/10 to-transparent rounded-[40px] shadow-[0_0_50px_rgba(217,144,101,0.05)]">
          <h4 className="text-3xl md:text-5xl lg:text-6xl text-[#e6e0d3] font-light leading-tight">
            പരാജയം നിർത്താനുള്ള സൂചനയല്ല; <br/> 
            <span className="text-[#d99065] font-medium mt-6 inline-block">സ്വയം പുതുക്കി മുന്നോട്ട് പോകാനുള്ള അവസരമാണ്.</span>
          </h4>
        </div>
        
        <p className="text-xl md:text-3xl text-[#c4bcaa] leading-relaxed max-w-4xl mx-auto mb-32">
          ഓരോ ഇരുളിനെയും വെളിച്ചമാക്കാനും, ഓരോ പരാജയത്തെയും വിജയമാക്കാനും, ഓരോ ദുഃഖത്തെയും സംതൃപ്തിയാക്കി മാറ്റാനും മനുഷ്യന് കഴിയുമെന്ന് വിശ്വസിക്കുന്നിടത്താണ് ജീവിതത്തിന്റെ യഥാർത്ഥ സൗന്ദര്യം. ജീവിതത്തിൽ തമോദ്വാരങ്ങൾ ഉണ്ടായിരിക്കും. എന്നാൽ അവ ഒരിക്കലും അവസാനമല്ല.
        </p>

        <div className="py-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#d99065] rounded-full blur-[150px] opacity-10 pointer-events-none" />
          
          <p className="text-2xl md:text-4xl text-[#a39b8c] mb-8 font-light italic">കാരണം,</p>
          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-bold text-white leading-tight">
            തമോദ്വാരങ്ങൾ വെളിച്ചത്തെ <span className="text-gray-600 line-through decoration-[#d99065] decoration-[6px]">വിഴുങ്ങിയേക്കാം.</span>
            <br/>
            <span className="text-[#d99065] drop-shadow-[0_0_40px_rgba(217,144,101,0.6)] mt-8 inline-block">
              എന്നാൽ പ്രതീക്ഷയെ വിഴുങ്ങാൻ അവയ്ക്കൊരിക്കലും കഴിയില്ല.
            </span>
          </h2>
        </div>

      </motion.div>
    </div>
  )
}
