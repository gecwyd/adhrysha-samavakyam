"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const DISK_OUTER = "min(64vw, 520px)";
const SHADOW = "min(23vw, 188px)";
const RING = "min(24.5vw, 200px)";

function SpinningDisk() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: `conic-gradient(
          from 90deg,
          rgba(255,255,210,0.95) 0deg,
          rgba(255,195,75,1)     22deg,
          rgba(245,110,25,0.9)   60deg,
          rgba(180,50,12,0.65)   110deg,
          rgba(90,18,5,0.25)     155deg,
          rgba(50,8,2,0.06)      180deg,
          rgba(75,15,5,0.22)     210deg,
          rgba(160,42,10,0.6)    260deg,
          rgba(235,105,22,0.85)  315deg,
          rgba(255,195,75,0.95)  345deg,
          rgba(255,255,210,0.95) 360deg
        )`,
        maskImage:
          "radial-gradient(circle, transparent 30%, black 33%, black 52%, transparent 68%)",
        WebkitMaskImage:
          "radial-gradient(circle, transparent 30%, black 33%, black 52%, transparent 68%)",
        filter: "blur(2px)",
        animation: "bhSpinDisk 12s linear infinite",
      }}
    />
  );
}

function DiskGlow() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, transparent 30%, rgba(255,130,45,0.45) 41%, rgba(200,70,18,0.2) 58%, transparent 72%)",
        filter: "blur(18px)",
        animation: "bhSpinDisk 12s linear infinite",
      }}
    />
  );
}

export function BlackHole() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

  const sectionOpacity = useTransform(smooth, [0.95, 1], [1, 0]);
  const starsOpacity = useTransform(smooth, [0, 0.35, 0.65], [0.09, 0.04, 0]);

  const headlineOpacity = useTransform(smooth, [0, 0.2, 0.3], [1, 1, 0]);
  const headlineY = useTransform(smooth, [0.2, 0.3], [0, -90]);
  const headlineScale = useTransform(smooth, [0, 0.3], [1, 1.1]);

  const holeOpacity = useTransform(smooth, [0.28, 0.42, 0.88, 0.95], [0, 1, 1, 0]);
  const holeScale = useTransform(smooth, [0.28, 0.52, 0.88], [0.5, 1, 1.05]);
  const holeY = useTransform(smooth, [0.28, 0.42, 0.88, 0.95], [60, 0, 0, -60]);

  const jetOpacity = useTransform(smooth, [0.38, 0.52, 0.82, 0.9], [0, 1, 1, 0]);
  const jetScaleY = useTransform(smooth, [0.38, 0.62], [0.05, 1]);

  const statOpacity = useTransform(smooth, [0.48, 0.60, 0.80, 0.88], [0, 1, 1, 0]);
  const statY = useTransform(smooth, [0.48, 0.60, 0.80, 0.88], [50, 0, 0, -50]);

  const hopeOpacity = useTransform(smooth, [0.88, 0.96], [0, 1]);
  const hopeY = useTransform(smooth, [0.88, 0.96], [30, 0]);

  const proximity = useTransform(smooth, [0.45, 0.82], [10, 1]);
  const [distanceDisplay, setDistanceDisplay] = useState("10.0");
  const barWidth = useTransform(smooth, [0.45, 0.82], ["0%", "100%"]);

  useMotionValueEvent(proximity, "change", (v) => {
    setDistanceDisplay(v.toFixed(1));
  });

  return (
    <section
      ref={containerRef}
      aria-label="Black Hole visual exploration"
      className="relative h-[500vh] w-full bg-black text-[#e6e0d3]"
    >
      <style>{`
        @keyframes bhSpinDisk {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bhPulseGlow {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
      `}</style>

      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 90% at 50% 55%, #0e0707 0%, #000 65%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute inset-[-8%]"
          style={{
            opacity: starsOpacity,
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 8%  18%, #fff, transparent),
              radial-gradient(1px  1px  at 23% 72%, #e6e0d3, transparent),
              radial-gradient(2px  2px  at 55% 11%, #fff, transparent),
              radial-gradient(1px  1px  at 74% 55%, #e6e0d3, transparent),
              radial-gradient(1.5px 1.5px at 91% 28%, #fff, transparent),
              radial-gradient(1px  1px  at 38% 88%, #e6e0d3, transparent),
              radial-gradient(1px  1px  at 62% 65%, #fff, transparent),
              radial-gradient(2px  2px  at 16% 42%, #c9a080, transparent),
              radial-gradient(1px  1px  at 84% 80%, #fff, transparent),
              radial-gradient(1.5px 1.5px at 47% 33%, #e6e0d3, transparent),
              radial-gradient(1px  1px  at 5%  58%, #fff, transparent),
              radial-gradient(1px  1px  at 92% 72%, #e6e0d3, transparent)
            `,
            backgroundSize:
              "360px 330px, 490px 450px, 530px 500px, 390px 370px, 620px 580px, 300px 320px, 450px 430px, 570px 540px, 340px 360px, 500px 470px, 280px 300px, 610px 590px",
          }}
        />

        <motion.div
          aria-hidden="true"
          style={{ opacity: holeOpacity, scale: holeScale, y: holeY }}
          className="absolute flex items-center justify-center"
        >
          <div
            style={{
              position: "relative",
              width: DISK_OUTER,
              height: DISK_OUTER,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "-20%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, transparent 35%, rgba(200,80,25,0.22) 50%, rgba(140,40,10,0.08) 68%, transparent 80%)",
                filter: "blur(40px)",
                animation: "bhPulseGlow 5s ease-in-out infinite",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: "inset(0 0 50% 0)",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "-18%",
                  transform: "perspective(700px) rotateX(74deg)",
                }}
              >
                <SpinningDisk />
                <DiskGlow />
              </div>
            </div>

            {([
              { scale: 1.24, opacity: 0.06, blur: 8 },
              { scale: 1.13, opacity: 0.10, blur: 5 },
              { scale: 1.05, opacity: 0.16, blur: 3 },
            ] as const).map(({ scale, opacity, blur }, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: RING,
                  height: RING,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  borderRadius: "50%",
                  boxShadow: `0 0 ${blur}px ${Math.ceil(blur / 3)}px rgba(255,200,110,${opacity})`,
                  zIndex: 2,
                }}
              />
            ))}

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: RING,
                height: RING,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                boxShadow: `
                  0 0 0 1.5px rgba(255,232,190,0.35),
                  0 0 6px   2px  rgba(255,220,150,0.55),
                  0 0 16px  4px  rgba(220,140,55,0.38),
                  0 0 36px  8px  rgba(175,75,20,0.22),
                  inset 0 0 8px 2px rgba(255,200,100,0.12)
                `,
                zIndex: 3,
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: SHADOW,
                height: SHADOW,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "#000",
                boxShadow:
                  "0 0 0 2px #000, 0 0 50px 18px rgba(0,0,0,0.85)",
                zIndex: 4,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: "inset(50% 0 0 0)",
                zIndex: 5,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "-18%",
                  transform: "perspective(700px) rotateX(74deg)",
                }}
              >
                <SpinningDisk />
                <DiskGlow />
              </div>
            </div>

            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                opacity: jetOpacity,
                scaleY: jetScaleY,
                transformOrigin: "center center",
                zIndex: 6,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "50%",
                  transform: "translateX(-50%)",
                  transformOrigin: "bottom center",
                  width: "5px",
                  height: "130%",
                  background:
                    "linear-gradient(to top, rgba(160,210,255,0.85) 0%, rgba(120,185,255,0.5) 35%, rgba(100,170,255,0.15) 70%, transparent 100%)",
                  filter: "blur(4px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "50%",
                  transform: "translateX(-50%)",
                  transformOrigin: "bottom center",
                  width: "1.5px",
                  height: "110%",
                  background:
                    "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(210,235,255,0.7) 45%, transparent 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translateX(-50%)",
                  transformOrigin: "top center",
                  width: "5px",
                  height: "130%",
                  background:
                    "linear-gradient(to bottom, rgba(160,210,255,0.85) 0%, rgba(120,185,255,0.5) 35%, rgba(100,170,255,0.15) 70%, transparent 100%)",
                  filter: "blur(4px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translateX(-50%)",
                  transformOrigin: "top center",
                  width: "1.5px",
                  height: "110%",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(210,235,255,0.7) 45%, transparent 100%)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY, scale: headlineScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
        >
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#d99065]/60 mb-8">
            Beyond the darkness
          </p>
          <h2
            id="black-hole-title"
            className="font-heading text-[22vw] sm:text-[16vw] md:text-[12vw] leading-[0.85] tracking-tight"
          >
            BLACK
            <br />
            <span className="text-[#d99065]">HOLE.</span>
          </h2>
          <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#e6e0d3]/20 mt-10">
            Scroll into the unknown ↓
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: statOpacity, y: statY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none z-10"
        >
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#d99065]/70 mb-4">
            The event horizon
          </p>
          <p className="font-heading text-[11vw] sm:text-[8vw] md:text-[6vw] leading-[0.88] tracking-tight mb-6">
            EVEN LIGHT
            <br />
            CANNOT <span className="text-[#d99065]">ESCAPE.</span>
          </p>
          <p
            className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] text-[#e6e0d3]/40 mb-8"
            lang="ml"
          >
            വെളിച്ചത്തിന് പോലും അതിൽ നിന്ന് രക്ഷപ്പെടാനാവില്ല.
          </p>

          <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm mt-4">
            <div className="w-full h-px bg-[#e6e0d3]/10 relative overflow-hidden mb-4">
              <motion.div
                style={{ width: barWidth }}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#d99065]/20 via-[#d99065] to-[#ff9966] shadow-[0_0_10px_rgba(217,144,101,0.5)]"
              />
            </div>
            <div className="flex justify-between w-full font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#e6e0d3]/50">
              <span>Radius: <span className="text-[#d99065] font-bold">{distanceDisplay} r_s</span></span>
              <span>r_s = 2GM / c²</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hopeOpacity, y: hopeY }}
          className="absolute bottom-[15%] left-0 right-0 flex flex-col items-center text-center px-6 pointer-events-none select-none z-10"
        >
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#d99065]/60 mb-5">
            Beyond the darkness
          </p>
          <p
            className="text-base sm:text-lg md:text-xl leading-[2] text-[#e6e0d3]/80 max-w-lg"
            lang="ml"
          >
            തമോദ്വാരങ്ങൾ വെളിച്ചത്തെ വിഴുങ്ങിയേക്കാം.
            <br />
            <span className="text-[#d99065]">
              എന്നാൽ പ്രതീക്ഷയെ വിഴുങ്ങാൻ അവയ്ക്കൊരിക്കലും കഴിയില്ല.
            </span>
          </p>
        </motion.div>

        <div className="absolute top-7 left-6 sm:left-10 font-mono text-[8px] tracking-[0.15em] uppercase text-[#e6e0d3]/[0.18] pointer-events-none">
          INQUATION / 10
        </div>
        <div className="absolute top-7 right-6 sm:right-10 font-mono text-[8px] tracking-[0.15em] uppercase text-[#d99065]/40 pointer-events-none">
          SINGULARITY
        </div>

        <div className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10 flex justify-between font-mono text-[7px] sm:text-[8px] tracking-[0.15em] uppercase text-[#e6e0d3]/15 pointer-events-none">
          <span>GEC Wayanad · 2025–26</span>
          <span>Pages 27–29</span>
        </div>
      </motion.div>
    </section>
  );
}
