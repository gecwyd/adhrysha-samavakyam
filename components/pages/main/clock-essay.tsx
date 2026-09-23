"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { preload } from "@/lib/preload";
import { resolveAsset } from "@/lib/asset-registry";
import { clockEssay } from "@/lib/clock-essay";

const HERO_IMAGE = resolveAsset("clock-essay-hero.webp");

function ArticleParagraph({ text, isFirst }: { text: string; isFirst?: boolean }) {
  return (
    <div className="relative">
      <p
        lang="ml"
        className={`font-serif leading-[1.85] text-[#e0ddd6]/90 ${
          isFirst
            ? "text-[21px] sm:text-[25px] md:text-[27px] text-[#f5f1e8]"
            : "text-[18px] sm:text-[21px] md:text-[23px]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

export function ClockEssay() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    preload(HERO_IMAGE, "image");
  }, []);

  return (
    <section
      ref={containerRef}
      id="sec-i"
      aria-labelledby="clock-essay-title"
      className="relative w-full bg-[#0a0806] text-[#e0ddd6] selection:bg-[#c96a45]/30 selection:text-white"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-12 sm:pb-16">
        <motion.div
          className="flex flex-col items-center text-center mb-20 sm:mb-28"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#c96a45]">
              ഒരു ചിന്ത · Reflection
            </span>
          </div>

          <h2
            id="clock-essay-title"
            className="font-heading text-[16vw] sm:text-[13vw] md:text-[100px] lg:text-[120px] leading-[0.9] tracking-tight text-[#f5f1e8]"
          >
            ഘടികാരം
            <br />
            <span className="text-[#c96a45] italic">പറയാത്ത</span>
            <br />
            സമയം
          </h2>
        </motion.div>

        <div className="relative w-full max-w-[1300px] mx-auto lg:grid lg:grid-cols-12 gap-10 lg:gap-20 pb-0">
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-32 w-full h-[75vh] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-[1.5s] border border-[#e0ddd6]/10">
              <img
                src={HERO_IMAGE}
                alt="Clock Essay Art"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a0806]/30 mix-blend-overlay" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-10 sm:gap-14">
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden grayscale border border-[#e0ddd6]/10 lg:hidden mb-6">
              <img
                src={HERO_IMAGE}
                alt="Clock Essay Art"
                className="w-full h-full object-cover"
              />
            </div>

            {clockEssay.map((item, i) => (
              <div key={i} className="flex flex-col gap-10 sm:gap-14">
                {i === 6 && (
                  <blockquote className="border-l-[3px] border-[#c96a45] pl-6 sm:pl-8 my-4 py-2">
                    <p
                      lang="ml"
                      className="font-serif text-[24px] sm:text-[30px] md:text-[34px] text-[#f5f1e8] leading-[1.4] tracking-tight"
                    >
                      "അള�ക്കാൻ കഴിയുന്നത് സമയത്തിന്റെ ദൈർഘ്യമാണ്; എന്നാൽ അതിന്റെ ആഴമല്ല. ആ ആഴം സൃഷ്ടിക്കുന്നത് അനുഭവങ്ങളാണ്."
                    </p>
                  </blockquote>
                )}

                {i === 10 && (
                  <blockquote className="border-l-[3px] border-[#c96a45] pl-6 sm:pl-8 my-4 py-2">
                    <p
                      lang="ml"
                      className="font-serif text-[24px] sm:text-[30px] md:text-[34px] text-[#c96a45] leading-[1.4] tracking-tight"
                    >
                      "ഒടുവിൽ, സമയം അളക്കുന്നത് ഘടികാരമാണ്. പക്ഷേ സമയത്തിന്റെ യഥാർത്ഥ കഥ എഴുതുന്നത് മനുഷ്യജീവിതമാണ്."
                    </p>
                  </blockquote>
                )}

                {i !== 6 && i !== 10 && (
                  <ArticleParagraph text={item.malayalam} isFirst={i === 0} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClockEssay;
