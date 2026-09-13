import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import styles from "@/components/pages/main/time-editorial.module.css";
import EssayReader from "./essay-reader";

export const metadata: Metadata = {
  title: "The Time a Clock Doesn't Tell | Inquation",
  description: "A bilingual reflection on measured time, experienced time, and the memories that give it depth.",
};

export default function ClockEssayPage() {
  return (
    <main className={styles.simpleEssayPage}>
      <header className={styles.simpleEssayHeader}>
        <Link href="/" className={styles.fullEssayBack}>
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to the magazine
        </Link>
        <h1 className={styles.simpleEssayTitle}>
          THE TIME
          <br />
          A CLOCK
          <br />
          <em>DOESN&apos;T TELL.</em>
        </h1>
        <p className={styles.simpleEssayDek}>
          A clock can measure how much time has passed. It cannot measure what that time meant.
        </p>
      </header>

      <section className={styles.simpleEssayReading} aria-labelledby="full-essay-reading-title">
        <h2 id="full-essay-reading-title" className="sr-only">The full bilingual essay</h2>
        <Suspense fallback={<div className={styles.simpleEssayFallback}>Loading the essay…</div>}>
          <EssayReader />
        </Suspense>
      </section>
    </main>
  );
}
