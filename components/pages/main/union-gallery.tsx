"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { InstagramEmbed } from "@/components/ui/instagram-embed";
import { cn } from "@/lib/utils";

type MediaKind = "Reel" | "Post";

interface GalleryItem {
  code: string;
  kind: MediaKind;
  date: string;
  title: string;
  account: string;
  group: "Football" | "Union" | "Onam" | "Convocation" | "Freshers" | "Campus" | "Magazine";
}

const GALLERY_ITEMS: GalleryItem[] = [
  { code: "DaaBV8lpahc", kind: "Reel", date: "05 Jul", title: "FIFA Fanshow", account: "clipsby.sr", group: "Football" },
  { code: "DaajWGnvA78", kind: "Reel", date: "05 Jul", title: "College Fanshow", account: "diya.vlogss", group: "Football" },
  { code: "Daqin-SSP5M", kind: "Post", date: "11 Jul", title: "League Auction Day", account: "sathva_collegeunion", group: "Football" },
  { code: "Da0IUhsTIKG", kind: "Reel", date: "15 Jul", title: "Auction", account: "iamnetnn", group: "Football" },
  { code: "Da65ctcxMnZ", kind: "Post", date: "18 Jul", title: "Aswin Memorial League", account: "sathva_collegeunion", group: "Football" },
  { code: "Da-ZQAxJsN3", kind: "Reel", date: "19 Jul", title: "College World Cup", account: "diya.vlogss", group: "Football" },
  { code: "DbAMm_pRNGo", kind: "Reel", date: "20 Jul", title: "A Tribute to the Game", account: "sathva_collegeunion", group: "Football" },
  { code: "DbA2lQOgTTe", kind: "Reel", date: "20 Jul", title: "World Cup Screening", account: "diya.vlogss", group: "Football" },
  { code: "DbIwcI2R3f2", kind: "Reel", date: "23 Jul", title: "FIFA 26 Final", account: "sathva_collegeunion", group: "Football" },
  { code: "DcAcHznxqKV", kind: "Post", date: "14 Aug", title: "Union Inauguration", account: "sathva_collegeunion", group: "Union" },
  { code: "DcCnueqzy9x", kind: "Reel", date: "15 Aug", title: "The Plot Peaked Here", account: "sreyes.mov", group: "Union" },
  { code: "DcDAFImBteN", kind: "Reel", date: "15 Aug", title: "Union Night", account: "yshuu.storiess", group: "Union" },
  { code: "DcDO4v4xOEY", kind: "Reel", date: "15 Aug", title: "Voices That Melt Us", account: "zahlstories", group: "Union" },
  { code: "DcDx17UzJgp", kind: "Reel", date: "15 Aug", title: "The Night Heals", account: "_shnvn_", group: "Union" },
  { code: "DcD8T0AAsfs", kind: "Reel", date: "15 Aug", title: "Just Fire", account: "heyyshamill", group: "Union" },
  { code: "DcEb-7oJWwU", kind: "Reel", date: "15 Aug", title: "Live at GECW", account: "microo.filmss", group: "Union" },
  { code: "DcEqIn5zdgd", kind: "Reel", date: "15 Aug", title: "Pure Chaos", account: "framesofavin", group: "Union" },
  { code: "DcFXZ26Bone", kind: "Reel", date: "16 Aug", title: "Show at Its Peak", account: "yshuu.storiess", group: "Union" },
  { code: "DcF835_xgSV", kind: "Reel", date: "16 Aug", title: "Stun DJ Night", account: "sathva_collegeunion", group: "Union" },
  { code: "DcGPLUfuvgv", kind: "Reel", date: "16 Aug", title: "Union Day at GECW", account: "diya.vlogss", group: "Union" },
  { code: "DcGTjzURSAL", kind: "Reel", date: "16 Aug", title: "Damn Bloody Band", account: "zahlstories", group: "Union" },
  { code: "DcGYUplPkCd", kind: "Reel", date: "16 Aug", title: "Thank You for Choosing Us", account: "film_club_gecw", group: "Union" },
  { code: "DcG_5QnAUvT", kind: "Reel", date: "16 Aug", title: "Union Stage", account: "clipsby.sr", group: "Union" },
  { code: "DcH9-EfRU0V", kind: "Reel", date: "17 Aug", title: "Dance Club Performance", account: "dance.club.gecw", group: "Union" },
  { code: "DcI1hygxJ4l", kind: "Reel", date: "17 Aug", title: "Sathva College Union", account: "sathva_collegeunion", group: "Union" },
  { code: "DcOVuoVS1L7", kind: "Reel", date: "19 Aug", title: "GIG2GROW", account: "tentaclespvtltd", group: "Campus" },
  { code: "DcOSXVlpn7p", kind: "Reel", date: "19 Aug", title: "Aaravam Name Reveal", account: "microo.filmss", group: "Onam" },
  { code: "DcOYpotgFDS", kind: "Reel", date: "19 Aug", title: "Aaravam ’26", account: "clipsby.sr", group: "Onam" },
  { code: "DcOc1AQyI4F", kind: "Reel", date: "19 Aug", title: "Aaravam ’26", account: "sathva_collegeunion", group: "Onam" },
  { code: "DcOdceVg8B3", kind: "Reel", date: "19 Aug", title: "Aaravam 2K26", account: "heyyshamill", group: "Onam" },
  { code: "DcOgu3UBJNF", kind: "Reel", date: "19 Aug", title: "Aaravam Is Coming", account: "yshuu.storiess", group: "Onam" },
  { code: "DcOj3uIPBc8", kind: "Reel", date: "19 Aug", title: "Onam Dance", account: "dance.club.gecw", group: "Onam" },
  { code: "DcO4ly5TPxK", kind: "Reel", date: "19 Aug", title: "Aaravam", account: "iamnetnn", group: "Onam" },
  { code: "DcRGR8Cpjge", kind: "Reel", date: "20 Aug", title: "Waiting for the End", account: "microo.filmss", group: "Onam" },
  { code: "DcRHr4wNrEc", kind: "Post", date: "20 Aug", title: "Pookkalam Competition", account: "sathva_collegeunion", group: "Onam" },
  { code: "DcT6W_LSq8q", kind: "Reel", date: "21 Aug", title: "Aaravam at GECW", account: "filmzby_m", group: "Onam" },
  { code: "DcXRrzpTWVf", kind: "Reel", date: "23 Aug", title: "Aaravam ’26", account: "sreyes.mov", group: "Onam" },
  { code: "DcXfo77Jjlt", kind: "Reel", date: "23 Aug", title: "College Onam Vlog", account: "diya.vlogss", group: "Onam" },
  { code: "DcYJuONx0T-", kind: "Reel", date: "23 Aug", title: "Aaravam Vibes", account: "_shnvn_", group: "Onam" },
  { code: "DcZPjrtz4Uf", kind: "Reel", date: "23 Aug", title: "Onam 2K26", account: "heyyshamill", group: "Onam" },
  { code: "DcabDuNB6nF", kind: "Reel", date: "24 Aug", title: "Onakkali", account: "yshuu.storiess", group: "Onam" },
  { code: "DcagjNyA9D1", kind: "Reel", date: "24 Aug", title: "Behind the Scenes", account: "heyyshamill", group: "Onam" },
  { code: "Dca228vBC1P", kind: "Reel", date: "24 Aug", title: "College Onam: Part 2", account: "diya.vlogss", group: "Onam" },
  { code: "Dcxsw6oxDtt", kind: "Post", date: "02 Sep", title: "Convocation Ceremony", account: "sathva_collegeunion", group: "Convocation" },
  { code: "Dc1ZbakyznW", kind: "Reel", date: "03 Sep", title: "Welcoming New Faces", account: "sathva_collegeunion", group: "Freshers" },
  { code: "Dc1hg_vzQoo", kind: "Reel", date: "03 Sep", title: "Graduation Day", account: "heyyshamill", group: "Convocation" },
  { code: "Dc528Q0pW9q", kind: "Reel", date: "05 Sep", title: "Convocation Vlog", account: "diya.vlogss", group: "Convocation" },
  { code: "Dc6cyTbktkE", kind: "Post", date: "05 Sep", title: "Convocation Day", account: "sathva_collegeunion", group: "Convocation" },
  { code: "Dc_qVfoSVAz", kind: "Reel", date: "07 Sep", title: "Freshers Week ’26", account: "sathva_collegeunion", group: "Freshers" },
  { code: "DdCRcBty6k3", kind: "Reel", date: "08 Sep", title: "Freshers Week: Day 2", account: "sathva_collegeunion", group: "Freshers" },
  { code: "DdDFbTBzLD_", kind: "Reel", date: "09 Sep", title: "The Rhythm Begins", account: "sathva_collegeunion", group: "Freshers" },
  { code: "DdDRrrxRSBD", kind: "Reel", date: "09 Sep", title: "Day 3 Awaits", account: "sathva_collegeunion", group: "Freshers" },
  { code: "DdGmhvKSdPY", kind: "Post", date: "10 Sep", title: "Movie Night", account: "sathva_collegeunion", group: "Freshers" },
  { code: "DdF8tbVKbGn", kind: "Reel", date: "10 Sep", title: "Freshers Day", account: "heyyshamill", group: "Freshers" },
  { code: "DdGwktFRkKZ", kind: "Reel", date: "10 Sep", title: "Freshers Week", account: "sathva_collegeunion", group: "Freshers" },
  { code: "DdNoaQmBN_d", kind: "Reel", date: "13 Sep", title: "Muneswaram Vlog", account: "diya.vlogss", group: "Campus" },
  { code: "DdOTRjZRUIM", kind: "Reel", date: "13 Sep", title: "The Lights Went Down", account: "sathva_collegeunion", group: "Campus" },
  { code: "DdRImBxMXm7", kind: "Reel", date: "14 Sep", title: "Muneswaram Vlog: Part 2", account: "diya.vlogss", group: "Campus" },
  { code: "DdWi3JJSf7S", kind: "Reel", date: "16 Sep", title: "Magazine Teaser", account: "sathva_collegeunion", group: "Magazine" },
  { code: "DdgNtUcSawr", kind: "Reel", date: "20 Sep", title: "The Untold Story", account: "magazinegecw26", group: "Magazine" },
  { code: "DdjUs3bSey2", kind: "Post", date: "21 Sep", title: "Magazine Release", account: "sathva_collegeunion", group: "Magazine" },
  { code: "DdnMDyhRtMy", kind: "Reel", date: "23 Sep", title: "Dastha ’26", account: "sathva_collegeunion", group: "Freshers" },
];

const FILTERS = ["All", "Reel", "Post"] as const;
type Filter = (typeof FILTERS)[number];

const GROUP_COLORS: Record<GalleryItem["group"], string> = {
  Football: "#315b4b",
  Union: "#a84e2a",
  Onam: "#af7b21",
  Convocation: "#3c5575",
  Freshers: "#70486e",
  Campus: "#53614a",
  Magazine: "#8a3b35",
};

export function UnionGallery() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedCode, setSelectedCode] = useState(GALLERY_ITEMS[0].code);

  const visibleItems = useMemo(
    () => (filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.kind === filter)),
    [filter]
  );

  const selected = GALLERY_ITEMS.find((item) => item.code === selectedCode) ?? visibleItems[0];
  const selectedIndex = visibleItems.findIndex((item) => item.code === selected.code);

  function move(direction: -1 | 1) {
    const current = Math.max(0, selectedIndex);
    const next = (current + direction + visibleItems.length) % visibleItems.length;
    setSelectedCode(visibleItems[next].code);
  }

  function changeFilter(next: Filter) {
    setFilter(next);
    const first = next === "All" ? GALLERY_ITEMS[0] : GALLERY_ITEMS.find((item) => item.kind === next);
    if (first) setSelectedCode(first.code);
  }

  const selectedUrl = `https://www.instagram.com/${selected.kind === "Reel" ? "reel" : "p"}/${selected.code}/`;

  return (
    <section className="relative overflow-hidden bg-black py-24 text-[#d9d4c7] sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid gap-8 border-b border-white/15 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9d4c7]/40">Captured by the campus</p>
            <h3 className="font-heading text-6xl uppercase leading-[0.82] tracking-tight sm:text-8xl">
              Union<br />Gallery
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changeFilter(item)}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors",
                  filter === item ? "border-[#d9d4c7] bg-[#d9d4c7] text-black" : "border-white/20 text-white/45 hover:border-white/60 hover:text-white"
                )}
              >
                {item} · {item === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((entry) => entry.kind === item).length}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-12 pt-12 lg:grid-cols-[minmax(360px,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <div className="lg:sticky lg:top-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.code}
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="border border-white/15 bg-[#111] p-1"
              >
                <InstagramEmbed url={selectedUrl} caption={selected.title} />
              </motion.div>
            </AnimatePresence>

            <div className="border-x border-b border-white/15 bg-[#0b0b0b] p-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">{selected.date} · {selected.kind} · @{selected.account}</p>
                  <h4 className="mt-2 font-heading text-3xl uppercase leading-none">{selected.title}</h4>
                </div>
                <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: GROUP_COLORS[selected.group] }} />
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <button type="button" onClick={() => move(-1)} className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 hover:text-white">&larr; Prev</button>
                <span className="font-mono text-[9px] tabular-nums tracking-[0.2em] text-white/30">{String(Math.max(0, selectedIndex) + 1).padStart(2, "0")} / {String(visibleItems.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => move(1)} className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 hover:text-white">Next &rarr;</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">
            {visibleItems.map((item, index) => {
              const active = item.code === selected.code;
              return (
                <motion.button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedCode(item.code)}
                  initial={reduce ? undefined : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min((index % 9) * 0.025, 0.2) }}
                  className={cn(
                    "group relative min-h-44 overflow-hidden bg-[#111] p-4 text-left transition-colors sm:min-h-52 sm:p-5",
                    active && "bg-[#d9d4c7] text-black"
                  )}
                >
                  <span className="absolute -right-2 -top-5 font-heading text-8xl tabular-nums text-white/[0.035] group-hover:text-white/[0.07]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("font-mono text-[8px] uppercase tracking-[0.2em]", active ? "text-black/45" : "text-white/35")}>{item.date}</span>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GROUP_COLORS[item.group] }} />
                    </div>
                    <div>
                      <p className={cn("mb-2 font-mono text-[8px] uppercase tracking-[0.18em]", active ? "text-black/45" : "text-white/30")}>{item.kind} · {item.group}</p>
                      <h5 className="font-heading text-xl uppercase leading-[0.95] sm:text-2xl">{item.title}</h5>
                      <p className={cn("mt-3 truncate font-mono text-[8px] tracking-[0.12em]", active ? "text-black/40" : "text-white/25")}>@{item.account}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
