'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './UrgencyBar.module.css';
import siteContent from '@/content/site.content.json';

const { urgencyBar } = siteContent;

export default function UrgencyBar() {
  const [dismissed, setDismissed] = useState(false);

  if (!urgencyBar.enabled || dismissed) return null;

  return (
    <div className={styles.bar} role="alert" aria-live="polite">
      <div className={`container ${styles.inner}`}>
        <span className={styles.message}>{urgencyBar.message}</span>
        <Link href={urgencyBar.ctaHref} className={styles.cta}>
          {urgencyBar.ctaLabel}
        </Link>
        <button
          className={styles.dismiss}
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
