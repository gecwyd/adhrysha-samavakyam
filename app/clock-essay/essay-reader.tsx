"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { clockEssay } from "@/lib/clock-essay";
import styles from "@/components/pages/main/time-editorial.module.css";

export default function EssayReader() {
  const searchParams = useSearchParams();
  const isMalayalam = searchParams.get("lang") === "ml";
  const language = isMalayalam ? "ml" : "en";

  return (
    <>
      <div className={styles.simpleEssayLanguageNav} aria-label="Choose essay language">
        <span className={styles.simpleEssayLanguageLabel}>Read in</span>
        <div className={styles.simpleEssayLanguageLinks}>
          <Link
            href="/clock-essay?lang=en"
            className={`${styles.simpleEssayLanguageLink} ${!isMalayalam ? styles.simpleEssayLanguageLinkActive : ""}`}
            aria-current={!isMalayalam ? "page" : undefined}
          >
            English
          </Link>
          <Link
            href="/clock-essay?lang=ml"
            lang="ml"
            className={`${styles.simpleEssayLanguageLink} ${isMalayalam ? styles.simpleEssayLanguageLinkActive : ""}`}
            aria-current={isMalayalam ? "page" : undefined}
          >
            മലയാളം
          </Link>
        </div>
      </div>

      <div className={styles.simpleEssayContent} lang={language}>
        {clockEssay.map((paragraph, index) => (
          <article className={styles.simpleEssayParagraph} key={index}>
            <p>{isMalayalam ? paragraph.malayalam : paragraph.english}</p>
          </article>
        ))}
      </div>
    </>
  );
}
