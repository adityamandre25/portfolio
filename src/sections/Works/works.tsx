"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./works.module.css";


interface Campaign {
  id: number;
  name: string;
  metric: string;
  description: string;
  pills: string[];
  link?: string;
}


const CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: "Rakshith x Airdroid Parental Control App",
    metric: "12M+",
    description:   
      "The goal was to promote AirDroid Parental Control, where Rakshith created content showcasing how the app helps monitor device activity, track usage, and ensure better digital safety, making it useful for managing and controlling screen time effectively.",
    pills: ["270K+ Likes","Safety"],
    link: "https://www.instagram.com/reel/DRqePqvgbiI/?igsh=NmNwYjg4ZWljeWYx",
  },
  {
    id: 2,
    name: "Rakshith x Masai School",
    metric: "3.7M+",
    description:
      "The goal was to promote Masai School’s Sunday Test, where JD and Rakshith created content highlighting it as a regular evaluation that helps students test their skills, track progress, and stay consistent in their learning journey, making it valuable for those preparing for tech careers.",
    pills: ["73K+ Likes", "Students"],
    link: "https://www.instagram.com/reel/DUnbOnigSwd/?igsh=aW96ZnMwaGR6eTZr",
  },
  {
    id: 3,
    name: "JD x Niconi ",
    metric: "2M+",
    description:
      "Our Goal Was To Create Engaging Content For ACwO’s Earbuds And Smartwatches. The Client Collaborated With MrLazyTech For A Reel Where He Showcased The Features Both Verbally And Visually, Delivering Value Packed Content In An Engaging Way.",
    pills: ["20K+ Likes", "Cosmetics"],
    link: "https://www.instagram.com/reel/DOuaShkEvq5/?igsh=cGFqZGpxamlhbmhi",
  },
  {
    id: 4,
    name: "Rakshith x August Ai",
    metric: "8.3M+",
    description:
      "The goal was to promote August AI, where Rakshith explained how the app helps users understand symptoms and health queries in a simple and easy way, making it useful for everyday use.",
    pills: ["200K+ Likes", "AI"],
    link: "https://www.instagram.com/reel/DSzsvc-gffN/?igsh=MzBsNml4bGI0b3Vh",
  },
];


function useCountUp(target: string, isVisible: boolean, delay = 0) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isVisible) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    const duration = 2200;
    const steps = 80;
    const stepTime = duration / steps;
    let current = 0;
    const increment = numeric / steps;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= numeric) {
          setDisplay(numeric % 1 === 0 ? `${numeric}${suffix}` : `${numeric.toFixed(1)}${suffix}`);
          clearInterval(interval);
        } else {
          const val = current % 1 === 0 ? current.toFixed(0) : current.toFixed(1);
          setDisplay(`${val}${suffix}`);
        }
      }, stepTime);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, target, delay]);

  return display;
}


function CampaignCard({ campaign, index }: { campaign: Campaign; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const metricDisplay = useCountUp(campaign.metric, visible, index * 120 + 200);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false); 
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${visible ? styles.visible : ""}`}
      style={{ animationDelay: `${index * 120}ms` }}
      onClick={() => campaign.link && window.open(campaign.link, "_blank")}
      role={campaign.link ? "link" : "article"}
      aria-label={`${campaign.name} — ${campaign.metric} Views`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && campaign.link) window.open(campaign.link, "_blank");
      }}
    >
      <div className={styles.cardContent}>

        <div className={styles.thumbnailWrapper}>
          <img
            src={`/Works/${campaign.id}.jpg`}
            alt={campaign.name}
            className={styles.thumbnailImg}
          />
        </div>

        <div className={styles.metricBlock}>
          <span className={styles.metric} aria-label={campaign.metric + " views"}>
            {metricDisplay}
          </span>
          <span className={styles.name}>{campaign.name}</span>
        </div>

        <p className={styles.description}>{campaign.description}</p>

        <div className={styles.pills}>
          {campaign.pills.map((pill) => (
            <span key={pill} className={styles.pill}>
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function Works() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="works" aria-labelledby="work-heading">
      
      <div className={`${styles.blobTop}`} aria-hidden="true" />
      <div className={`${styles.blobBottom}`} aria-hidden="true" />
     

      <div className={styles.inner}>
        <header className={styles.headerBlock}>
          <div className={styles.accentLine} aria-hidden="true" />
          <p className={styles.sectionLabel}>Works</p>
          <h2 id="work-heading" className={styles.heading}>
  Best <span className={styles.gradientText}>Works</span>
</h2>

          <p className={styles.subtitle}>
            Campaigns that delivered measurable impact across brands
          </p>
        </header>

        
        <div className={styles.grid} role="list">
          {CAMPAIGNS.map((campaign, i) => (
            <CampaignCard key={campaign.id} campaign={campaign} index={i} />
          ))}
        </div>

        
        <div
          ref={ctaRef}
          className={`${styles.ctaWrapper} ${ctaVisible ? styles.visible : ""}`}
        >
          <a
            href="./Works/Allworks.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            aria-label="View full portfolio PDF"
          >
            View All Works
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
