"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./black-hole.module.css";

export function BlackHole() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });
  const holeScale = useTransform(progress, [0, 0.4, 0.72, 1], [0.8, 1.1, 2.3, 5]);
  const holeOpacity = useTransform(progress, [0, 0.6, 0.82, 1], [0.85, 1, 0.4, 0]);
  const starsScale = useTransform(progress, [0, 1], [1, 1.65]);
  const starsOpacity = useTransform(progress, [0, 0.5, 0.8], [0.6, 0.3, 0]);
  const openingOpacity = useTransform(progress, [0, 0.2, 0.3], [1, 1, 0]);
  const openingY = useTransform(progress, [0.2, 0.3], [0, -60]);
  const horizonOpacity = useTransform(progress, [0.3, 0.4, 0.58, 0.68], [0, 1, 1, 0]);
  const horizonY = useTransform(progress, [0.3, 0.4, 0.58, 0.68], [50, 0, 0, -50]);
  const hopeOpacity = useTransform(progress, [0.72, 0.84, 1], [0, 1, 1]);
  const hopeY = useTransform(progress, [0.72, 0.84], [40, 0]);

  return (
    <div ref={sceneRef} className={styles.journey}>
      <div className={styles.stage}>
        <div className={styles.scene} aria-hidden="true">
          <motion.div className={styles.stars} style={{ scale: starsScale, opacity: starsOpacity }} />
          <div className={styles.holePosition}>
            <motion.div className={styles.hole} style={{ scale: holeScale, opacity: holeOpacity }}>
              <div className={styles.halo} />
              <div className={styles.farDisk} />
              <div className={styles.photonRing} />
              <div className={styles.shadow} />
              <div className={styles.nearDisk} />
            </motion.div>
          </div>
          <div className={styles.shade} />
        </div>

        <div className={styles.topline}>
          <span>INQUATION / 10</span>
          <span>അഗാധതയുടെ അപ്പുറം</span>
        </div>

        <motion.div className={`${styles.panel} ${styles.opening}`} style={{ opacity: openingOpacity, y: openingY }} aria-hidden="true">
          <p className={styles.eyebrow}>Beyond the light</p>
          <p className={styles.title}>BLACK<br /><span>HOLE.</span></p>
          <p className={styles.malayalamTitle} lang="ml">തമോദ്വാരം</p>
          <p className={styles.cue}>Scroll into the unknown ↓</p>
        </motion.div>

        <motion.div className={`${styles.panel} ${styles.horizon}`} style={{ opacity: horizonOpacity, y: horizonY }} aria-hidden="true">
          <p className={styles.eyebrow}>The event horizon</p>
          <p className={styles.statement}>EVEN LIGHT<br />CANNOT <span>ESCAPE.</span></p>
          <p className={styles.caption} lang="ml">വെളിച്ചത്തിന് പോലും അതിൽ നിന്ന് രക്ഷപ്പെടാനാവില്ല.</p>
        </motion.div>

        <motion.div className={`${styles.panel} ${styles.hope}`} style={{ opacity: hopeOpacity, y: hopeY }} aria-hidden="true">
          <p className={styles.eyebrow}>From the universe to ourselves</p>
          <p className={styles.hopeText} lang="ml">തമോദ്വാരങ്ങൾ വെളിച്ചത്തെ വിഴുങ്ങിയേക്കാം.<br /><span>എന്നാൽ പ്രതീക്ഷയെ വിഴുങ്ങാൻ അവയ്ക്കൊരിക്കലും കഴിയില്ല.</span></p>
          <p className={styles.cue}>Continue to the essay ↓</p>
        </motion.div>

        <div className={styles.bottomline}>
          <span>തമോദ്വാരം · 27–29</span>
          <div className={styles.progress} aria-hidden="true"><motion.div style={{ scaleX: scrollYProgress }} /></div>
          <span>Artistic illustration</span>
        </div>
        <a className={styles.skip} href="#thamodwaram-essay">Read the essay ↓</a>
      </div>
    </div>
  );
}
