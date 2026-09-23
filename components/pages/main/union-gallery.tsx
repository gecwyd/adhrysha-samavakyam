"use client";

import { useMemo, useState, useEffect } from "react";
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
  const [filter, setFilter] = useState<Filter>("All");
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);
  const [resetKeys, setResetKeys] = useState<Record<string, number>>({});

  const visibleItems = useMemo(
    () => (filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.kind === filter)),
    [filter]
  );

  useEffect(() => {
    let lastActive = document.activeElement;
    
    const interval = setInterval(() => {
      const currentActive = document.activeElement;
      
      if (currentActive !== lastActive) {
        lastActive = currentActive;
        
        if (currentActive && currentActive.tagName === 'IFRAME') {
          const src = currentActive.getAttribute('src');
          if (src) {
            const match = src.match(/\/(p|reel|tv)\/([^/?#]+)/i);
            if (match && match[2]) {
              const clickedCode = match[2];
              
              setActiveEmbed((prev) => {
                // If we focused a new iframe, reset the previous one to pause it
                if (prev && prev !== clickedCode) {
                  setResetKeys((keys) => ({
                    ...keys,
                    [prev]: (keys[prev] || 0) + 1
                  }));
                }
                return clickedCode;
              });
            }
          }
        }
      }
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="sec-union-gallery" className="relative w-full bg-black text-white selection:bg-[#ff4500] selection:text-white pb-24">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Maximalist Header */}
      <div className="px-5 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Giant background text for maximalism */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
          <h2 className="font-heading text-[35vw] leading-none tracking-tighter">UNION GALLERY</h2>
        </div>
        
        <div className="relative flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 z-10">
          <div>
            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/40 mb-3 sm:mb-5">
              Captured by the campus · 2025–26
            </p>
            <h2 className="font-heading text-[18vw] sm:text-[12vw] lg:text-[10vw] font-light uppercase leading-none tracking-tight text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)', WebkitTextFillColor: 'transparent' }}>
              UNION
            </h2>
            <h2 className="font-heading text-[18vw] sm:text-[12vw] lg:text-[10vw] font-light uppercase leading-none tracking-tight text-[#ff4500] -mt-2 sm:-mt-4">
              GALLERY
            </h2>
          </div>

          <div className="flex flex-col gap-5 pb-2">
            <div className="flex flex-wrap gap-2 xl:justify-end">
              {FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cn(
                    "rounded-full px-5 py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all border",
                    filter === item 
                      ? "border-[#ff4500] bg-[#ff4500] text-white shadow-[0_0_20px_rgba(255,69,0,0.4)]" 
                      : "border-white/20 text-white/50 hover:border-white/80 hover:text-white bg-black/50 backdrop-blur-sm"
                  )}
                >
                  {item} <span className="ml-2 opacity-50">{(item === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((entry) => entry.kind === item)).length}</span>
                </button>
              ))}
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] text-white/40 xl:text-right uppercase tracking-widest">
              Explore our social footprint
            </p>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="px-5 sm:px-10 lg:px-16 mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
          {visibleItems.map((item, index) => {
            const selectedUrl = `https://www.instagram.com/${item.kind === "Reel" ? "reel" : "p"}/${item.code}/`;
            const itemResetKey = resetKeys[item.code] || 0;
            
            return (
              <div
                key={item.code}
                className="break-inside-avoid mb-6 group relative"
              >
                {/* Customized Brutalist Browser Frame */}
                <div className="border-[1.5px] border-white/20 bg-[#0f0f0f] rounded-xl overflow-hidden transition-all duration-300 group-hover:border-[#ff4500] group-hover:shadow-[8px_8px_0_0_rgba(255,69,0,0.8)] sm:group-hover:-translate-y-1 sm:group-hover:-translate-x-1">
                  
                  {/* Frame Header (Browser-like) */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#1a1a1a]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors duration-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors duration-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-green-500 transition-colors duration-300" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 truncate max-w-[120px]">
                        instagram.com/{item.account}
                      </span>
                    </div>
                  </div>

                  {/* Top Metadata Tab */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#111]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 shrink-0 rounded bg-[#ff4500] flex items-center justify-center font-heading text-xl text-white">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading text-lg uppercase leading-none tracking-tight text-white mb-1 truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GROUP_COLORS[item.group] }} />
                          <p className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] truncate">
                            {item.group}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 ml-3">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#ff4500] border border-[#ff4500]/30 px-2 py-1 rounded-sm">
                        {item.kind}
                      </span>
                    </div>
                  </div>

                  {/* The actual iframe, embedded cleanly without captions */}
                  <div className="bg-[#050505] border-t border-white/10">
                    <div className="relative overflow-hidden pointer-events-auto">
                      {/* Negative margins can slightly crop the iframe if needed, but removing /captioned/ does the heavy lifting */}
                      <InstagramEmbed 
                        key={`${item.code}-${itemResetKey}`}
                        url={selectedUrl} 
                        caption={item.title} 
                        className="bg-transparent" 
                      />
                    </div>
                  </div>
                  
                  {/* Footer metadata */}
                  <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-t border-white/10">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                      {item.date}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                      GECW
                    </p>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

