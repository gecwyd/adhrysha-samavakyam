"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { DriveImage } from "@/components/ui/drive-image";
import { InstagramEmbed } from "@/components/ui/instagram-embed";
import { UnionGallery } from "@/components/pages/main/union-gallery";
import { preload } from "@/lib/preload";
import { cn } from "@/lib/utils";

const UNION_LOGO_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/union-logo.webp";
const MARQUEE_TEXT = "SATHVA · MEANS UNION · @SATHVA_COLLEGEUNION · ON INSTAGRAM · ";

const EASE = [0.16, 1, 0.3, 1] as const;
const CREAM = "#d9d4c7";

interface TimelineEntry {
  date: string;
  month: "March" | "July" | "August" | "September";
  category: "Community" | "Sports" | "Culture" | "Academic" | "Advocacy" | "Milestone";
  title: string;
  body: string;
  media?: { url: string; label: string };
}

const TIMELINE: TimelineEntry[] = [
  { date: "09 Mar", month: "March", category: "Community", title: "Ahlan: Iftar Party", body: "An evening of togetherness, gratitude and shared moments during Ramadan, hosted by the GECW College Union 2025–26." },
  { date: "05 Jul", month: "July", category: "Sports", title: "FIFA Fanshow", body: "The campus came together for football, fandom and the World Cup atmosphere.", media: { url: "https://www.instagram.com/p/DaaBV8lpahc/", label: "FIFA Fanshow" } },
  { date: "07 Jul", month: "July", category: "Advocacy", title: "Hostel Road Repair", body: "A formal representation was submitted to the Principal requesting immediate repair of the road leading to the Men’s Hostel." },
  { date: "14–19 Jul", month: "July", category: "Sports", title: "Aswin Memorial Football League", body: "From the player auction to the tournament at Royal Turf, the league included men’s and women’s competitions. Germany and Brazil emerged as winners.", media: { url: "https://www.instagram.com/p/Da65ctcxMnZ/", label: "Aswin Memorial Football League" } },
  { date: "23 Jul", month: "July", category: "Sports", title: "FIFA 26 Final Screening", body: "A shared final-night screening filled with cheers, energy and football fever.", media: { url: "https://www.instagram.com/p/DbIwcI2R3f2/", label: "FIFA 26 Final Screening" } },
  { date: "23 Jul", month: "July", category: "Advocacy", title: "A Better Central Library", body: "The Union submitted a memorandum to MP Priyanka Gandhi seeking support for books, digital resources, computers and improved library infrastructure." },
  { date: "25 Jul", month: "July", category: "Academic", title: "Academic Calendar Representation", body: "The Union’s representation was followed by KTU publishing the upcoming odd-semester academic calendar." },
  { date: "13 Aug", month: "August", category: "Advocacy", title: "Engineering Seat Vacancies", body: "A request was submitted for internal branch transfers to fill vacancies arising after medical allotments." },
  { date: "14 Aug", month: "August", category: "Milestone", title: "Sathva Union Inauguration", body: "The College Union was inaugurated at the Main Stage by Minister T. Siddique, followed by cultural programmes, live music and a DJ night.", media: { url: "https://www.instagram.com/p/DcAcHznxqKV/", label: "Sathva Union Inauguration" } },
  { date: "16 Aug", month: "August", category: "Academic", title: "GIG2GROW", body: "A student–industry initiative connecting campus life with technology, careers, entrepreneurship and real-world opportunities.", media: { url: "https://www.instagram.com/p/DcOVuoVS1L7/", label: "GIG2GROW inauguration" } },
  { date: "19–24 Aug", month: "August", category: "Culture", title: "Aaravam ’26", body: "The Union’s Onam celebration brought together campus traditions, performances and the Pookkalam competition.", media: { url: "https://www.instagram.com/p/DcT6W_LSq8q/", label: "Aaravam ’26" } },
  { date: "03 Sep", month: "September", category: "Milestone", title: "Convocation Ceremony", body: "The 2025 and 2026 graduating batches celebrated their journey at Anugraha Auditorium.", media: { url: "https://www.instagram.com/p/Dcxsw6oxDtt/", label: "Convocation Ceremony 2026" } },
  { date: "07 Sep", month: "September", category: "Advocacy", title: "Student Sports Allowances", body: "A request was made for early disbursement of TA and DA to students who represented GECW at F-Zone, Inter-Zone and University competitions." },
  { date: "07–10 Sep", month: "September", category: "Community", title: "Freshers Week", body: "A week of introductions, campus connection and a movie night for the newest students.", media: { url: "https://www.instagram.com/p/DdGmhvKSdPY/", label: "Freshers Week Movie Night" } },
  { date: "08 Sep", month: "September", category: "Advocacy", title: "Campus Maintenance", body: "The Chairperson requested removal of overgrown grass and bushes, along with proper upkeep of the college campus." },
  { date: "13 Sep", month: "September", category: "Academic", title: "Sathva Connect", body: "The Union launched its Student Assistance Cell for placement updates, scholarships, career opportunities and important student information.", media: { url: "https://www.instagram.com/p/DdOzFfTSNuc/", label: "Sathva Connect" } },
  { date: "16–22 Sep", month: "September", category: "Sports", title: "F-Zone Podium Finishes", body: "The Women’s Kabaddi team finished runners-up, while the Chess and Women’s Table Tennis teams secured second runners-up finishes." },
  { date: "20 Sep", month: "September", category: "Academic", title: "GATE Question Bank", body: "A subject-wise collection of previous-year GATE questions was launched to help students prepare with focused practice.", media: { url: "https://www.instagram.com/p/DdgjIpMy2Cu/", label: "GATE Question Bank" } },
  { date: "23 Sep", month: "September", category: "Milestone", title: "College Magazine ’26", body: "The year’s magazine is released with special guest Sheethal Joseph, bringing together the work of the editorial, content, design and media teams.", media: { url: "https://www.instagram.com/p/DdjUs3bSey2/", label: "College Magazine ’26" } },
];

const MONTHS = ["March", "July", "August", "September"] as const;
const MONTH_NUMBERS: Record<(typeof MONTHS)[number], string> = {
  March: "03",
  July: "07",
  August: "08",
  September: "09",
};

const CATEGORY_STYLES: Record<TimelineEntry["category"], string> = {
  Community: "bg-[#b7492f] text-[#f4eee1]",
  Sports: "bg-[#1c4d3e] text-[#f4eee1]",
  Culture: "bg-[#7b3f72] text-[#f4eee1]",
  Academic: "bg-[#234d73] text-[#f4eee1]",
  Advocacy: "bg-[#d2a93f] text-black",
  Milestone: "bg-black text-[#f4eee1]",
};

function Marquee({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden border-y py-3 select-none pointer-events-none",
        isDark ? "border-[#d9d4c7]/15 bg-black" : "border-black/10 bg-[#d9d4c7]"
      )}
    >
      {[0, 1].map((track) => (
        <div key={track} className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap" aria-hidden={track === 1}>
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className={cn(
                "font-heading text-xs uppercase tracking-[0.3em] sm:text-sm",
                isDark ? "text-[#d9d4c7]/40" : "text-black/30"
              )}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Sathva() {
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} id="sec-sathva" className="relative w-full bg-[#d9d4c7] text-black">
      {/* ───────── Hero Section ───────── */}
      <div className="relative min-h-[100svh] w-full flex flex-col justify-between px-6 py-12 sm:px-12 sm:py-16 overflow-hidden">
        {/* Top Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 w-full">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] max-w-xs text-black/50 leading-relaxed">
            The union&apos;s own feed, tech fest, magazine, arts and everything else.
          </p>
          <a 
            href="https://www.instagram.com/sathva_collegeunion/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-3 rounded-full border border-black/15 bg-transparent px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] hover:bg-black hover:text-[#d9d4c7] transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-[#d9d4c7] transition-colors" />
            @sathva_collegeunion
          </a>
        </div>

        {/* Center Typography */}
        <motion.div 
          style={{ y: reduce ? undefined : heroY }}
          className="relative z-10 w-full mt-24 mb-20 flex flex-col items-center justify-center flex-1"
        >
          {/* Centered Logo in background */}
          <motion.div 
            style={{ y: reduce ? undefined : logoY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[500px] aspect-square opacity-[0.07] pointer-events-none"
          >
            <DriveImage src={preload(UNION_LOGO_URL)} alt="" fill sz="w800" className="object-contain" />
          </motion.div>

          <h2 className="font-heading text-[22vw] leading-[0.75] tracking-tight uppercase text-black text-center mix-blend-multiply">
            Sathva
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-4">
            <h3 className="font-heading text-[12vw] leading-[0.8] tracking-tight uppercase text-transparent [-webkit-text-stroke:1px_black] sm:[-webkit-text-stroke:2px_black]">
              College
            </h3>
            <h3 className="font-heading text-[12vw] leading-[0.8] tracking-tight uppercase text-black">
              Union
            </h3>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="relative z-20 w-full flex justify-between items-end">
           <div className="flex flex-col gap-1.5">
             <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-black/40">Established</span>
             <span className="font-mono text-xs sm:text-sm tracking-widest text-black/80">1999</span>
           </div>
           <div className="flex flex-col gap-1.5 text-right">
             <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-black/40">Location</span>
             <span className="font-mono text-xs sm:text-sm tracking-widest text-black/80">GEC Wayanad</span>
           </div>
        </div>
      </div>

      <Marquee tone="light" />

      {/* ───────── Union Timeline ───────── */}
      <div className="relative border-t border-black/10 bg-[#d9d4c7] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="mb-20 grid gap-8 border-b border-black/15 pb-12 sm:mb-28 sm:grid-cols-2 sm:items-end">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-black/40">March to September 2026</p>
              <h3 className="font-heading text-6xl uppercase leading-[0.82] tracking-tight text-black sm:text-8xl">
                The year,<br />as it happened
              </h3>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-black/55 sm:justify-self-end sm:text-base">
              Programmes, student support, representations and milestones from the GEC Wayanad College Union 2025–26. Selected moments open as playable Instagram posts and reels.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-black/10 pb-8">
            {(Object.keys(CATEGORY_STYLES) as TimelineEntry["category"][]).map((category) => (
              <span key={category} className={cn("rounded-full px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.2em]", CATEGORY_STYLES[category])}>
                {category}
              </span>
            ))}
          </div>

          {MONTHS.map((month) => {
            const entries = TIMELINE.filter((entry) => entry.month === month);
            return (
              <div key={month} className="grid border-b border-black/15 lg:grid-cols-[220px_1fr]">
                <div className="py-12 lg:sticky lg:top-0 lg:h-fit lg:py-20">
                  <p className="font-heading text-5xl uppercase tracking-tight text-black sm:text-6xl">{month}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-black/35">2026 / {MONTH_NUMBERS[month]}</p>
                </div>

                <div className="border-black/15 lg:border-l">
                  {entries.map((entry, index) => (
                    <motion.article
                      key={`${entry.date}-${entry.title}`}
                      initial={reduce ? undefined : { opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.7, delay: Math.min(index * 0.04, 0.16), ease: EASE }}
                      className="grid gap-8 border-t border-black/10 py-10 first:border-t-0 lg:grid-cols-[120px_minmax(0,1fr)] lg:px-12 lg:py-14"
                    >
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/45">{entry.date}</p>
                        <span className={cn("mt-4 inline-flex rounded-full px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em]", CATEGORY_STYLES[entry.category])}>
                          {entry.category}
                        </span>
                      </div>

                      <div className={cn("grid gap-8", entry.media && "xl:grid-cols-[minmax(0,0.8fr)_minmax(320px,1fr)] xl:items-start")}>
                        <div>
                          <h4 className="font-heading text-3xl uppercase leading-[0.95] tracking-tight text-black sm:text-5xl">{entry.title}</h4>
                          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-black/60 sm:text-[15px]">{entry.body}</p>
                        </div>

                        {entry.media && (
                          <div className="overflow-hidden border border-black/15 bg-black p-1 shadow-[8px_8px_0_rgba(0,0,0,0.10)]">
                            <InstagramEmbed url={entry.media.url} caption={entry.media.label} />
                            <a
                              href={entry.media.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between px-4 py-3 font-mono text-[8px] uppercase tracking-[0.2em] text-[#d9d4c7]/60 transition-colors hover:text-[#d9d4c7]"
                            >
                              <span>{entry.media.label}</span>
                              <span>Open post &nearr;</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <UnionGallery />

      <Marquee tone="dark" />
    </section>
  );
}

export default Sathva;
