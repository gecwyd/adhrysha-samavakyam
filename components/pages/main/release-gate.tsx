"use client";

import React, { useEffect, useState } from "react";
import { ComingSoon } from "./coming-soon";

// Set target to Sep 23, 2026, 4:30 PM IST
const TARGET_TIME = new Date("2026-09-23T16:30:00+05:30").getTime();

export function ReleaseGate({ children }: { children: React.ReactNode }) {
  const [isLive, setIsLive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkTime = async () => {
      let offset = 0;
      try {
        const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata", {
          cache: "no-store",
        });
        const data = await res.json();
        const serverTime = new Date(data.datetime).getTime();
        offset = Date.now() - serverTime;
      } catch (err) {
        // Fallback to local device time (offset = 0) if API fails
      }

      const updateCounter = () => {
        const now = Date.now() - offset;
        const diff = TARGET_TIME - now;
        
        if (diff <= 0) {
          setIsLive(true);
          if (interval) clearInterval(interval);
        } else {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft({ h, m, s });
          setIsLive(false);
        }
        setIsChecking(false);
      };

      updateCounter();
      interval = setInterval(updateCounter, 1000);
    };

    checkTime();
    return () => clearInterval(interval);
  }, []);

  if (isLive) {
    return <>{children}</>;
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-[#d9d4c7]">
      <ComingSoon timeLeft={timeLeft} />
    </main>
  );
}
