"use client";

import styles from "./Contact.module.css";

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className={`${styles.blobTop}`} aria-hidden="true" />
      <div className={`${styles.blobBottom}`} aria-hidden="true" />

      <div className={styles.inner}>

        <header className={styles.header}>
          <div className={styles.accentLine} aria-hidden="true" />
          <p className={styles.sectionLabel}>Contact</p>
          <h2 id="contact-heading" className={styles.title}>
            Let's Work <span className={styles.gradientText}>Together</span>
          </h2>
          <p className={styles.subtitle}>
            Have a campaign in mind or want to grow your profile? Drop a message - I respond within 24 hours.
          </p>
        </header>

        <a
          href="mailto:Siddharthiyer.work@gmail.com"
          className={styles.emailHero}
          aria-label="Send an email to Siddharthiyer.work@gmail.com"
        >
          <div className={styles.emailLeft}>
            <div className={styles.emailIconBox}>
              <EmailIcon />
            </div>
            <div className={styles.emailMeta}>
              <span className={styles.emailLabel}>Email me at</span>
              <span className={styles.emailAddress}>
                Siddharthiyer.work@gmail.com
              </span>
            </div>
          </div>
          <div className={styles.emailArrow} aria-hidden="true">
            <ArrowUpRight />
          </div>
        </a>

        <div className={styles.socialRow}>

          <a
            href="https://www.instagram.com/thesiddharthiyer"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialCard} ${styles.instagram}`}
            aria-label="Follow on Instagram"
          >
            <div className={styles.socialTop}>
              <div className={styles.socialIconBox}>
                <InstagramIcon />
              </div>
              <div className={styles.socialArrow}>
                <ArrowUpRight />
              </div>
            </div>
            <span className={styles.socialPlatform}>Instagram</span>
            <span className={styles.socialHandle}>@thesiddharthiyer</span>
            <span className={styles.socialDesc}>
              Behind-the-scenes, campaigns & manager life.
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/siddharth-m-iyer/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialCard} ${styles.linkedin}`}
            aria-label="Connect on LinkedIn"
          >
            <div className={styles.socialTop}>
              <div className={styles.socialIconBox}>
                <LinkedInIcon />
              </div>
              <div className={styles.socialArrow}>
                <ArrowUpRight />
              </div>
            </div>
            <span className={styles.socialPlatform}>LinkedIn</span>
            <span className={styles.socialHandle}>Siddharth M Iyer</span>
            <span className={styles.socialDesc}>
              Professional updates, work and collaborations.
            </span>
          </a>

        </div>

        <div className={styles.ctaWrapper}>
          <a
            href="https://calendly.com/siddharthiyer-work"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Book an appointment
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>



        <div className={styles.divider} aria-hidden="true" />

        <footer className={styles.footer}>
          <span className={styles.footerName}>
            Siddharth&nbsp;<span>M Iyer</span><br />
            Bengaluru, India{" "}
            <img src="/india-flag.svg" alt="India" width={20} height={14} style={{ display: "inline", verticalAlign: "middle" }} />
          </span>
          <span className={styles.footerCopy}>
            © {year} · All rights reserved
          </span>
        </footer>

      </div>
    </section>
  );
}
