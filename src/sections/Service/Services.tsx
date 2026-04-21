"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Services.module.css";

interface ServiceCard {
  id: number;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
}

const cards: ServiceCard[] = [
  {
    id: 1,
    tag: "01 — Campaign Strategy",
    title: "Influencer Marketing Campaigns",
    description:
      "I help brands plan and execute high-performing influencer campaigns. From understanding the brand's goals to identifying the right creators, I manage the entire process - strategy, coordination, and execution ensuring content connects with the audience and delivers real results.",
    highlights: ["Creator Sourcing", "Campaign Strategy", "Performance Tracking"],
  },
  {
    id: 2,
    tag: "02 — Creator Management",
    title: "Talent Representation",
    description:
      "I manage creators and handle brand collaborations end-to-end. From negotiating deals to guiding content and growth strategy, I help creators build a strong online presence, secure better opportunities, and create consistent income streams.",
    highlights: ["Deal Negotiation", "Growth Strategy", "Brand Partnerships"],
  },
];


const SCROLL_MULTIPLIER = 2.5;


function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function Services() {
  const outerRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const setOuterHeight = () => {
      if (outerRef.current) {
        outerRef.current.style.height = `${SCROLL_MULTIPLIER * 100}vh`;
      }
    };
    setOuterHeight();
    window.addEventListener("resize", setOuterHeight);

    const handleScroll = () => {
      const section = outerRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }


      const scrolled = -rect.top;
      const clamped = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setOuterHeight);
    };
  }, []);


  const ANIM_START = 0.15;
  const ANIM_END = 0.85;

  const rawP = (progress - ANIM_START) / (ANIM_END - ANIM_START);
  const p = Math.max(0, Math.min(1, rawP));
  const eased = easeOutCubic(p);


  const card2TranslateY = (1 - eased) * 210;


  const card1Scale = 1 - eased * 0.03;

  return (
    <section id="services" ref={outerRef} className={styles.outer}>
      <div className={styles.stickyViewport}>


        <div className={styles.inner}>

          <div className={styles.header}>
            <span className={styles.accentLine} />
            <p className={styles.sectionLabel}>Services</p>
            <h2 className={styles.title}>
              What I <span className={styles.gradientText}>Offer</span>
            </h2>
            <p className={styles.subtitle}>
              What I offer to help brands grow and creators scale effectively.
            </p>
          </div>


          <div className={styles.stack}>

            <div
              className={styles.card}
              style={{
                transform: `scale(${card1Scale})`,
                zIndex: 1,
                transformOrigin: "top center",
              }}
            >
              <span className={styles.cardTag}>{cards[0].tag}</span>
              <h3 className={styles.cardTitle}>{cards[0].title}</h3>
              <p className={styles.cardDesc}>{cards[0].description}</p>
              <ul className={styles.highlights}>
                {cards[0].highlights.map((h) => (
                  <li key={h} className={styles.highlight}>
                    <span className={styles.dot} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>


            <div
              className={styles.card}
              style={{
                transform: `translateY(${card2TranslateY}%)`,
                zIndex: 2,
              }}
            >
              <span className={styles.cardTag}>{cards[1].tag}</span>
              <h3 className={styles.cardTitle}>{cards[1].title}</h3>
              <p className={styles.cardDesc}>{cards[1].description}</p>
              <ul className={styles.highlights}>
                {cards[1].highlights.map((h) => (
                  <li key={h} className={styles.highlight}>
                    <span className={styles.dot} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
