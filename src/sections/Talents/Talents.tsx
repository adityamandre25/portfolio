import React from "react";
import { useNavigate } from "react-router-dom";
import { talents } from "./talentsData";
import styles from "./Talents.module.css";

const Talents: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="talents" className={styles.section}>
      <div className={styles.blobTop} aria-hidden="true" />
      <div className={styles.blobBottom} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.accentLine} />
          <p className={styles.sectionLabel}>Talents</p>
          <h2 className={styles.title}>
            Talents I <span className={styles.gradientText}>Represent</span>
          </h2>
          <p className={styles.subtitle}>
            A curated roster of creators we believe in. Each one bringing
            something real to the table.
          </p>
        </div>

        <div className={styles.grid}>
          {talents.map((talent, index) => (
            <div
              key={talent.id}
              className={styles.card}
              style={{ animationDelay: `${index * 0.12}s` }}
              onClick={() => navigate(`/talent/${talent.id}`)}
              role="button"
              tabIndex={0}
              aria-label={`View ${talent.name}'s profile`}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/talent/${talent.id}`)}
            >
              <div className={styles.imageWrap}>
                <img
                  src={`/talents/${talent.id}.jpg`}
                  alt={talent.name}
                  className={styles.image}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(talent.name)}&background=0d1b2a&color=00b4d8&size=400&bold=true&font-size=0.33`;
                  }}
                />
                <div className={styles.imageOverlay} />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.name}>{talent.name}</h3>
              </div>

              <div className={styles.glowBorder} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Talents;