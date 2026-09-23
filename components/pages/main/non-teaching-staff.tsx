"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Noto_Serif_Malayalam } from "next/font/google";
import { motion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import { cn } from "@/lib/utils";

const malayalam = Noto_Serif_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

type Profile = {
  id: string;
  index: string;
  role: string;
  name: string;
  tenure?: string;
  subtitle: string;
  /** resolveAsset key for the interview clip, once edited and uploaded. */
  video?: string;
  /** resolveAsset key for a poster frame; also used stand-alone when no video exists yet. */
  photo?: string;
};

const PROFILES: Profile[] = [
  {
    id: "suneesh",
    photo: "staff-suneesh.webp",
    video: "staff-suneesh.webm",
    index: "01",
    role: "Security",
    name: "സർജന്റ് സുനീഷ്",
    tenure: "3.5 years on campus security",
    subtitle: "കാവലിനപ്പുറം കണ്ട വളർച്ചകൾ",
  },
  {
    id: "sathish",
    photo: "staff-sathish.webp",
    video: "staff-sathish.webm",
    index: "02",
    role: "Librarian",
    name: "സതീഷ് ശിവരാജൻ",
    tenure: "1.5 years in charge of the library",
    subtitle: "അറിവിനപ്പുറം",
  },
  {
    id: "shibu",
    photo: "staff-shibu.webp",
    video: "staff-shibu.webm",
    index: "03",
    role: "Gardener",
    name: "ഷിബു",
    tenure: "Back nine months, after first working here in 2017–18",
    subtitle: "വേരുകളോട് ചേർന്ന്",
  },
  {
    id: "lissy",
    photo: "staff-lissy.webp",
    video: "staff-lissy.webm",
    index: "04",
    role: "FTS",
    name: "ലിസി മാത്യു",
    tenure: "7 years on campus",
    subtitle: "പോയവരുടെ കാൽപ്പാടുകൾ",
  },
  {
    id: "nrega",
    index: "05",
    role: "Thozhilurappu (NREGA)",
    name: "തൊഴിലുറപ്പ് ചേച്ചിമാർ",
    tenure: "21 years, since 2005",
    subtitle: "വിയർപ്പിൽ എഴുതിയ വർഷങ്ങൾ",
  },
  {
    id: "rajeswari",
    photo: "staff-rajeswari.webp",
    video: "staff-rajeswari.webm",
    index: "06",
    role: "TIC · CSE",
    name: "രാജേശ്വരി",
    tenure: "10–12 years on campus",
    subtitle: "വിട്ടുപോകുന്നവരിലും ബാക്കിയായ സ്നേഹം",
  },
  {
    id: "security-2",
    photo: "staff-security.webp",
    video: "staff-security.webm",
    index: "07",
    role: "Security",
    name: "സെക്യൂരിറ്റി",
    tenure: "2 years, 5 months on campus security",
    subtitle: "കാവലിനപ്പുറം ചില ബന്ധങ്ങൾ",
  },
  {
    id: "martin",
    photo: "staff-martin.webp",
    video: "staff-martin.webm",
    index: "08",
    role: "Bus Cleaner",
    name: "മാർട്ടിൻ",
    tenure: "8 years on campus",
    subtitle: "സ്വന്തം വഴിയിലേക്ക്",
  },
  {
    id: "vasanthakumari",
    index: "09",
    role: "PTS",
    name: "വസന്തകുമാരി",
    tenure: "13 years on campus",
    subtitle: "രക്തബന്ധമില്ലാത്ത ചില സ്നേഹങ്ങൾ",
  },
  {
    id: "sheeja",
    photo: "staff-sheeja.webp",
    video: "staff-sheeja.webm",
    index: "10",
    role: "FTS",
    name: "ഷീജ",
    tenure: "Joined this February, after 4.5 years at Perumon Polytechnic",
    subtitle: "അപരിചിതത്വത്തിൽ നിന്ന് അടുപ്പത്തിലേക്ക്",
  },
];

const INTRO_PARAGRAPHS = [
  "മാഗസിന്റെ പണികൾ ആരംഭിച്ച ദിവസം മുതൽ തന്നെ കോളേജിനെക്കുറിച്ചും ഇവിടുത്തെ വിദ്യാർത്ഥികളെക്കുറിച്ചുമുള്ള വ്യത്യസ്ത അഭിപ്രായങ്ങളും കാഴ്ചപ്പാടുകളും മാഗസിനിൽ ഉൾപ്പെടുത്തണമെന്ന ആശയം ഞങ്ങളുടെ ചർച്ചകളിൽ ഉണ്ടായിരുന്നു. ലൈബ്രേറിയൻ, ഗാർഡനർ, സുരക്ഷാ ജീവനക്കാർ, വൃത്തിയാക്കുന്ന ജീവനക്കാർ തുടങ്ങി കോളേജിന്റെ ദൈനംദിന ജീവിതത്തിന്റെ ഭാഗമായ നിരവധി പേരോട് ഞങ്ങൾ സംസാരിച്ചു.",
  "നമ്മൾ ദിവസവും കാണുകയും കടന്നുപോകുകയും ചെയ്യുന്ന ഈ മനുഷ്യരുടെ കാഴ്ചപ്പാടുകളിൽ ഒരുപക്ഷേ, നമ്മൾ ഇതുവരെ കണ്ടിട്ടില്ലാത്ത മറ്റൊരു കോളേജ് ഒളിഞ്ഞുകിടക്കുന്നുണ്ടാകാം.",
];

const CODA_LINES = [
  "സുരക്ഷാ ജീവനക്കാരൻ വിദ്യാർത്ഥികളിൽ നിന്ന് കമ്പ്യൂട്ടർ പഠിച്ച കഥ.",
  "ലൈബ്രേറിയൻ വിദ്യാർത്ഥികളിൽ കണ്ട വളർച്ച.",
  "ഗാർഡനർ സ്വന്തം മക്കളെപ്പോലെ വളർത്തിയ ചെടികൾ.",
  "വർഷങ്ങൾക്കുശേഷവും തിരികെ വരുന്ന വിദ്യാർത്ഥികളെ കാത്തുനിൽക്കുന്ന മുഖങ്ങൾ.",
];

const Kicker = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span lang="en" className={cn("font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#9a6a1f]", className)}>
    {children}
  </span>
);

/** A vertical interview clip. Loads only metadata until played, and shows the poster (or a text placeholder) otherwise. */
function VideoTile({ profile }: { profile: Profile }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!profile.video) {
    return (
      <div className="relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden rounded-md bg-[#f2ede4]">
        {profile.photo ? (
          <Image
            src={resolveAsset(profile.photo)}
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 340px"
            unoptimized
            className="object-cover"
          />
        ) : (
          <span lang="ml" className="text-4xl font-light text-[#9a6a1f]/40">
            {profile.name.trim().charAt(0)}
          </span>
        )}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-sm bg-[#1a1512]/80 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white">
          Video coming soon
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md bg-[#0a0806]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={profile.photo ? resolveAsset(profile.photo) : undefined}
        controls={playing}
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
      >
        <source src={resolveAsset(profile.video)} type="video/webm" />
      </video>

      {!playing && (
        <button
          type="button"
          aria-label={`Play ${profile.name}'s interview`}
          onClick={() => videoRef.current?.play()}
          className="group absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/25"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-[#1a1512]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

function ProfileTile({ profile }: { profile: Profile }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <VideoTile profile={profile} />

      <div className="mt-4 flex items-center gap-3">
        <span className="shrink-0 rounded-sm border border-[#9a6a1f]/30 px-1.5 py-0.5 font-mono text-[10px] text-[#9a6a1f]">
          {profile.index}
        </span>
        <Kicker>{profile.role}</Kicker>
      </div>
      <h3 lang="ml" className="mt-2 text-xl font-medium text-[#1a1512] sm:text-2xl">
        {profile.name}
      </h3>
      {profile.tenure && (
        <p lang="en" className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#1a1512]/40">
          {profile.tenure}
        </p>
      )}
      <p lang="ml" className="mt-2 text-base italic leading-snug text-[#9a6a1f]">
        {profile.subtitle}
      </p>
    </motion.article>
  );
}

export function NonTeachingStaff() {
  return (
    <section
      id="sec-non-teaching-staff"
      aria-labelledby="non-teaching-staff-title"
      className={cn(malayalam.className, "relative w-full bg-white text-[#1a1512] selection:bg-[#9a6a1f]/20 selection:text-[#1a1512]")}
    >
      {/* ───────── Header ───────── */}
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-28 text-center md:px-12 md:pt-40">
        <Kicker>Meet the College Staff</Kicker>
        <h2
          id="non-teaching-staff-title"
          lang="ml"
          className="mt-6 text-4xl font-medium leading-tight text-[#1a1512] sm:text-5xl md:text-6xl"
        >
          കോളേജിന്റെ <span className="text-[#9a6a1f]">അദൃശ്യ നായകർ</span>
        </h2>
        <p lang="en" className="mt-4 font-serif text-base italic text-[#1a1512]/50 sm:text-lg">
          The unsung heroes behind the college
        </p>

        <div className="mx-auto mt-12 max-w-2xl space-y-5 text-left">
          {INTRO_PARAGRAPHS.map((paragraph, i) => (
            <p key={i} lang="ml" className="text-[1.05em] font-light leading-[1.95] text-[#1a1512]/70">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* ───────── Video grid ───────── */}
      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILES.map((profile) => (
            <ProfileTile key={profile.id} profile={profile} />
          ))}
        </div>
      </div>

      {/* ───────── Coda ───────── */}
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <div className="mb-10 space-y-2">
          {CODA_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              lang="ml"
              className="text-sm font-light italic leading-relaxed text-[#1a1512]/45 sm:text-base"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <p lang="ml" className="text-lg font-light leading-[1.9] text-[#1a1512]/70 sm:text-xl">
            ഒരു കോളേജ് കെട്ടിടങ്ങളുടെയും ക്ലാസ് മുറികളുടെയും ലാബുകളുടെയും കൂട്ടം മാത്രമല്ല. അത് അവിടെ ജീവിച്ച
            മനുഷ്യരുടെയും, അവശേഷിക്കുന്ന ഓർമ്മകളുടെയും, പറയാതെ പോകുന്ന ബന്ധങ്ങളുടെയും ഒരു സമവാക്യമാണ്.
          </p>
          <p lang="ml" className="text-lg font-light leading-[1.9] text-[#1a1512]/50 sm:text-xl">
            അതിലെ ചില ഘടകങ്ങൾ നമുക്ക് കാണാം. ചിലത് കാണാതെ പോകും.
          </p>
          <p lang="ml" className="pt-4 text-2xl font-medium leading-tight text-[#1a1512] sm:text-3xl">
            അവിടെയാണ് <span className="text-[#9a6a1f]">അദൃശ്യ സമവാക്യം</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default NonTeachingStaff;
