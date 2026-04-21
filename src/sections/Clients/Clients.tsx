"use client";

import { useRef } from "react";
import styles from "./Clients.module.css";

interface StatItem {
  value: string;
  label: string;
}

interface LogoItem {
  src: string;
  alt: string;
}

const STATS: StatItem[] = [
  { value: "450+", label: "Deals" },
  { value: "47+", label: "Projects" },
  { value: "500+", label: "Influencers" },
];


const LOGOS: LogoItem[] = [
  { src: "/logo/logo_1.png", alt: "Client 1" },
  { src: "/logo/logo_2.png", alt: "Client 2" },
  { src: "/logo/logo_3.png", alt: "Client 3" },
  { src: "/logo/logo_4.png", alt: "Client 4" },
  { src: "/logo/logo_5.png", alt: "Client 5" },
  { src: "/logo/logo_6.png", alt: "Client 6" },
  { src: "/logo/logo_7.png", alt: "Client 7" },
  { src: "/logo/logo_8.png", alt: "Client 8" },
  { src: "/logo/logo_9.png", alt: "Client 9" },
  { src: "/logo/logo_10.png", alt: "Client 10" },
  { src: "/logo/logo_11.png", alt: "Client 11" },
  { src: "/logo/logo_12.png", alt: "Client 12" },
  { src: "/logo/logo_13.png", alt: "Client 13" },
  { src: "/logo/logo_14.png", alt: "Client 14" },
  { src: "/logo/logo_15.png", alt: "Client 15" },
  { src: "/logo/logo_16.png", alt: "Client 16" },
  { src: "/logo/logo_17.png", alt: "Client 17" },
  { src: "/logo/logo_18.png", alt: "Client 18" },
  { src: "/logo/logo_19.png", alt: "Client 19" },
  { src: "/logo/logo_20.png", alt: "Client 20" },
  { src: "/logo/logo_21.png", alt: "Client 21" },
  { src: "/logo/logo_22.png", alt: "Client 22" },
  { src: "/logo/logo_23.png", alt: "Client 23" },
  { src: "/logo/logo_24.png", alt: "Client 24" },
];


function StatCard({ stat }: { stat: StatItem; index: number }) {
  return (
    <div
      className={styles.statCard}
      aria-label={`${stat.value} ${stat.label}`}
    >
      <span className={styles.statNum}>{stat.value}</span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

function LogoCard({ logo }: { logo: LogoItem }) {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleError = () => {
    const img = imgRef.current;
    if (!img) return;
    const parent = img.parentElement;
    if (!parent) return;
    img.style.display = "none";
    const fallback = document.createElement("span");
    fallback.className = styles.logoPlaceholder;
    fallback.textContent = logo.alt;
    parent.appendChild(fallback);
  };

  return (
    <div className={styles.logoCard}>
      <img
        ref={imgRef}
        src={logo.src}
        alt={logo.alt}
        className={styles.logoImg}
        onError={handleError}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
}: {
  logos: LogoItem[];
  direction: "left" | "right";
}) {
  const doubled = [...logos, ...logos];

  return (
    <div
      className={`${styles.marqueeRow} ${direction === "left" ? styles.left : styles.right
        }`}
      aria-hidden={direction === "right"}
    >
      {doubled.map((logo, i) => (
        <LogoCard key={`${logo.src}-${i}`} logo={logo} />
      ))}
    </div>
  );
}

export default function Clients() {
  const mid = Math.ceil(LOGOS.length / 2);
  const row1 = LOGOS.slice(0, mid);
  const row2 = LOGOS.slice(mid);

  return (
    <section
      id="clients"
      className={styles.section}
      aria-labelledby="clients-heading"
    >
      <div className={styles.blobTop} aria-hidden="true" />
      <div className={styles.blobBottom} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.accentLine} aria-hidden="true" />
          <p className={styles.eyebrow}>Clients</p>
          <h2 id="clients-heading" className={styles.title}>
            Trusted By{" "}
            <span className={styles.titleGradient}>Brands</span>
          </h2>
          <p className={styles.subtitle}>
            Partnered with companies that care about measurable results and
            authentic reach.
          </p>
        </header>

        <div className={styles.fanWrapper} role="list" aria-label="Key statistics">
          <div className={styles.fanStack}>
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={styles.marqueeSection}
        aria-label="Client logos"
        role="region"
      >
        {row1.length > 0 && <MarqueeRow logos={row1} direction="left" />}
        {row2.length > 0 && <MarqueeRow logos={row2} direction="right" />}
      </div>
    </section>
  );
}
