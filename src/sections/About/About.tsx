import React from "react";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.accentLine} />
          <p className={styles.sectionLabel}>About</p>
          <h2 className={styles.title}>
            About <span className={styles.gradientText}>Me</span>
          </h2>
        </div>

        <div className={styles.contentWrapper}>
          <p className={styles.intro}>
            Hey, I'm <span className={styles.name}>Siddharth M Iyer</span>, an
            Independent Influencer Marketer and Talent Manager based in
            Bengaluru with over 4 years of experience in the creator economy.
          </p>

          <p className={styles.body}>
            I started early at 17, When most were still figuring things out
            exploring how brands and creators work together. Over time, I worked
            across agencies and handled projects independently, gaining hands-on
            experience in planning and executing influencer campaigns from the
            ground up.
          </p>

          <p className={styles.body}>
            I've managed brand collaborations, worked closely with creators, and
            handled end-to-end campaign execution. Currently, I work
            independently representing and managing creators while helping
            brands build effective influencer marketing strategies.
          </p>

          <div className={styles.divider} />

          <p className={styles.body}>
            Over the last 12 months, I've been primarily focused on{" "}
            <span className={styles.highlight}>
              technology and gadget-based influencer talent management
            </span>
            , building strong partnerships within the tech space. Moving
            forward, I'm expanding into new niches — entertainment, fashion, and
            beauty with a focus on identifying{" "}
            <span className={styles.highlight}>
              underdog creators in their early stages
            </span>
            .
          </p>

          <p className={styles.body}>
            My aim is to support them with the right strategy, guidance, and
            opportunities to help them grow consistently and build a stable
            revenue stream.
          </p>

          <div className={styles.philosophy}>
            <p className={styles.philosophyText}>
              My approach is simple:{" "}
              <span className={styles.philosophyItem}>clear strategy</span>
              <span className={styles.dot}>·</span>
              <span className={styles.philosophyItem}>strong execution</span>
              <span className={styles.dot}>·</span>
              <span className={styles.philosophyItem}>
                meaningful collaborations
              </span>
            </p>
          </div>

          <p className={styles.cta}>
            If you're looking to work on something valuable and result-driven,
            I'd be happy to connect.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
