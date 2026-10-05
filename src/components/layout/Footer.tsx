'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import siteContent from '@/content/site.content.json';
import PaddleLogo from '@/components/common/PaddleLogo';
import FooterLightAnimation from './FooterLightAnimation';

const { footer, brand } = siteContent;

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };
  return (
    <footer className={styles.footer}>
      <FooterLightAnimation />
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <PaddleLogo size={36} />
            <div>
              <p className={styles.logoName}>{brand.name}</p>
              <p className={styles.logoTagline}>{brand.tagline}</p>
            </div>
          </div>
          <p className={styles.tagline}>{footer.tagline}</p>
          <div className={styles.socials}>
            <a href={brand.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.social}>f</a>
            <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.social}>ig</a>
            <a href={brand.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.social}>yt</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            {footer.quickLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Recent Locations */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Recent Camps</h4>
          <ul className={styles.linkList}>
            {footer.recentLocations.map((l) => (
              <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>{footer.newsletter.heading}</h4>
          <p className={styles.newsletterText}>{footer.newsletter.subtext}</p>
          {subscribed ? (
            <p className={styles.subscribeSuccess}>{footer.newsletter.successMessage}</p>
          ) : (
          <form className={styles.newsletterForm} onSubmit={handleNewsletter} suppressHydrationWarning>
            <input type="email" placeholder={footer.newsletter.placeholder} className={`form-input ${styles.newsletterInput}`} required suppressHydrationWarning />
            <button type="submit" className={`btn btn--primary btn--full`} suppressHydrationWarning>{footer.newsletter.buttonLabel}</button>
          </form>
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copy}>© {new Date().getFullYear()} {brand.copyright}. All Rights Reserved.</p>
            <div className={styles.bottomLinks}>
              {footer.legalLinks.map((l) => (
                <a key={l.href} href={l.href} className={styles.bottomLink}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
