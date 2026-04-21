import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Talents", href: "#talents" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Clients", href: "#clients" },
  { label: "Why Me", href: "#why-me" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["hero", "about", "talents", "services", "works", "clients", "why-me", "contact"];

/* showing and hiding the navbar(feature lol) and this ticking used so that many same time scrolls r ignored ie performance improvement by no re-rendering each time for no meaningfull chnage in value*/
export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const isHeroActive = activeSection === "hero";
  
  const lastScrollY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          setIsHidden(true);
          setMenuOpen(false);
        } else {
          setIsHidden(false);
        }
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
  const sections = SECTION_IDS
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  if (!sections.length) return;

  /* This thing used for knowing the current section and highlight it */
  const observer = new IntersectionObserver(
    (entries) => {
      let maxRatio = 0;
      let visibleSection = "";

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          visibleSection = entry.target.id;
        }
      });
      /* its like pick the section that is highest visible */
      if (visibleSection) {
        setActiveSection(visibleSection);
      }
    },
    {
      threshold: [0.2, 0.4, 0.6, 0.8],
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);

  /* this is for scrolling to sections and closing menu when clicked on mobile and disable scrollwhen menu open */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navClass = [
    styles.navbar,
    isHidden ? styles.hidden : "",
  ].filter(Boolean).join(" ");

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <div className={styles.navContainer}>

        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, "#hero")}
          aria-label="Go to top"
        >
          <span
            className={[
              styles.logoText,
              isHeroActive ? styles.logoActive : styles.logoInactive
            ].join(" ")}
          >
            Sid
          </span>
          <span className={styles.logoDot} aria-hidden="true">.</span>
        </a>

        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={[styles.link, isActive ? styles.active : ""].filter(Boolean).join(" ")}
                  onClick={(e) => handleNavClick(e, href)}
                  aria-current={isActive ? "true" : undefined}
                >
                  {label}
                  <span className={styles.linkUnderline} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          className={[styles.hamburger, menuOpen ? styles.hamburgerOpen : ""].filter(Boolean).join(" ")}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={[styles.mobileMenu, menuOpen ? styles.mobileMenuOpen : ""].filter(Boolean).join(" ")}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileNavLinks} role="list">
          {NAV_LINKS.map(({ label, href }, i) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li
                key={href}
                className={styles.mobileNavItem}
                style={{ "--item-index": i } as React.CSSProperties}
              >
                <a
                  href={href}
                  className={[styles.mobileLink, isActive ? styles.active : ""].filter(Boolean).join(" ")}
                  onClick={(e) => handleNavClick(e, href)}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className={styles.mobileLinkIndex}>0{i + 1}</span>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}


