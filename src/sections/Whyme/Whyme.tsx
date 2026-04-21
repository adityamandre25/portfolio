"use client";

import { useState, useCallback } from "react";
import styles from "./Whyme.module.css";


type CardKey = "brand" | "influencer";

interface ContentItem {
  title: string;
  text: string;
}

interface MainCardData {
  key: CardKey;
  badge: string;
  title: string;
  hint: string;
  cta: string;
  icon: React.ReactNode;
  content: [ContentItem, ContentItem];
}


const BrandIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  </svg>
);

const InfluencerIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    <path d="M18 2l1.5 3.5L23 7l-3.5 1.5L18 12l-1.5-3.5L13 7l3.5-1.5L18 2z" />
  </svg>
);


const CARDS: MainCardData[] = [
  {
    key: "brand",
    badge: "For Brands",
    title: "Brand Managers",
    hint: "Scale campaigns with the right creators for impactful results.",
    cta: "See how I help",
    icon: <BrandIcon />,
    content: [
      {
        title: "Right Influencer Selection",
        text: "I select influencers who align with your brand and audience, ensuring your campaign connects with the right people.",
      },
      {
        title: "Hassle-Free Campaign Management",
        text: "I handle the entire campaign from coordination to execution, ensuring everything runs smoothly and on time.",
      },
    ],
  },
  {
    key: "influencer",
    badge: "For Creators",
    title: "Influencers",
    hint: "Grow your profile and secure consistent brand partnerships.",
    cta: "See how I help",
    icon: <InfluencerIcon />,
    content: [
      {
        title: "Growth & Revenue",
        text: "I help you grow your profile and connect you with the right brand deals so you can earn consistently.",
      },
      {
        title: "End-to-End Support",
        text: "I handle all brand communication and collaborations so you can focus on creating content stress-free.",
      },
    ],
  },
];


const ChevronRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);


function ContentCard({
  item,
  visible,
  index,
}: {
  item: ContentItem;
  visible: boolean;
  index: number;
}) {
  return (
    <div
      className={`${styles.contentCard} ${visible ? styles.visible : ""}`}
      style={visible ? { animationDelay: `${index * 90}ms` } : undefined}
    >
      <div className={styles.contentCardTop}>
        <div className={styles.contentDot} />
        <h4 className={styles.contentTitle}>{item.title}</h4>
      </div>
      <p className={styles.contentText}>{item.text}</p>
    </div>
  );
}


function MainCard({
  card,
  isActive,
  onToggle,
}: {
  card: MainCardData;
  isActive: boolean;
  onToggle: (key: CardKey) => void;
}) {
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle(card.key);
      }
    },
    [card.key, onToggle]
  );

  return (
    <div className={styles.mainCardWrapper}>

      <div
        className={`${styles.mainCard} ${isActive ? styles.active : ""}`}
        onClick={() => onToggle(card.key)}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        aria-controls={`whyme-panel-${card.key}`}
      >

        <div className={styles.cardTop}>
          <div className={styles.iconBox}>{card.icon}</div>
          <span className={styles.badge}>{card.badge}</span>
        </div>


        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardHint}>{card.hint}</p>


        <div className={styles.cardDivider} />


        <div className={styles.cardBottom}>
          <span className={styles.cardCta}>
            {isActive ? "Collapse" : card.cta}
          </span>
          <div className={styles.arrowBox}>
            <ChevronRight />
          </div>
        </div>
      </div>


      <div
        id={`whyme-panel-${card.key}`}
        className={`${styles.revealWrapper} ${isActive ? styles.open : ""}`}
        aria-hidden={!isActive}
      >
        <div className={styles.revealInner}>
          <div className={styles.contentRow}>
            {card.content.map((item, i) => (
              <ContentCard
                key={item.title}
                item={item}
                visible={isActive}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function WhyMe() {
  const [active, setActive] = useState<CardKey | null>(null);

  const handleToggle = useCallback((key: CardKey) => {
    setActive((prev) => (prev === key ? null : key));
  }, []);

  return (
    <section
      id="why-me"
      className={styles.section}
      aria-labelledby="whyme-heading"
    >

      <div className={`${styles.blobTop}`} aria-hidden="true" />
      <div className={`${styles.blobBottom}`} aria-hidden="true" />

      <div className={styles.inner}>

        <header className={styles.header}>
          <div className={styles.accentLine} aria-hidden="true" />
          <p className={styles.sectionLabel}>Why Me</p>
          <h2 id="whyme-heading" className={styles.title}>
            Why <span className={styles.gradientText}>Me?</span>
          </h2>
          <p className={styles.subtitle}>
            Choose who you are , I'll show you exactly how I deliver value.
          </p>
        </header>


        <div className={styles.mainRow}>
          {CARDS.map((card) => (
            <MainCard
              key={card.key}
              card={card}
              isActive={active === card.key}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
