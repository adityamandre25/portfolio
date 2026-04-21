import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { talents } from "./talentsData";
import styles from "./TalentDetail.module.css";
import { useEffect } from "react";

const TalentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const talent = talents.find((t) => t.id === id);

  if (!talent) {
    return (
      <div className={styles.notFound}>
        <p>Talent not found.</p>
        <button
          className={styles.backBtn}
          onClick={() =>
            navigate({
              pathname: "/",
              hash: "#talents",
            })
          }
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.blobTop} aria-hidden="true" />
      <div className={styles.blobBottom} aria-hidden="true" />

      <button
        className={styles.backBtn}
        onClick={() =>
          navigate({
            pathname: "/",
            hash: "#talents",
          })
        }
        aria-label="Back to talents"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15 9H3M3 9L7 5M3 9L7 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      <div className={styles.content}>
        
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <img
              src={`/talents/${talent.id}.jpg`}
              alt={talent.name}
              className={styles.image}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    talent.name
                  )}&background=0d1b2a&color=00b4d8&size=600&bold=true&font-size=0.33`;
              }}
            />
            <div className={styles.imageGlow} aria-hidden="true" />
          </div>

          
          <div className={styles.stats}>
            {talent.stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.textCol}>
          <div className={styles.accentLine} />
          <p className={styles.niche}>{talent.niche}</p>
          <h1 className={styles.name}>{talent.name}</h1>
          <p className={styles.handle}>{talent.handle}</p>

          <div className={styles.divider} />

          <p className={styles.longDesc}>{talent.longDescription}</p>

          <div className={styles.actions}>
            <button
              className={styles.primaryBtn}
              onClick={() =>
                window.open(
                  `https://instagram.com/${talent.handle.replace("@", "")}`,
                  "_blank"
                )
              }
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDetail;