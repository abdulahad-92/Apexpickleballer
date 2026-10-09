'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './HeroSection.module.css';
import siteContent from '@/content/site.content.json';
import HeroLightAnimation from './HeroLightAnimation';

const { hero } = siteContent.home;
const { brand } = siteContent;

interface HeroSectionProps {
  transparentBg?: boolean;
  paddleCourtSlot?: React.ReactNode;
  enableLightAnimation?: boolean;
}

export default function HeroSection({
  transparentBg = false,
  paddleCourtSlot,
  enableLightAnimation = true,
}: HeroSectionProps) {
  return (
    <section className={`${styles.hero} ${transparentBg ? styles.transparent : ''}`}>
      <div className={styles.bg} aria-hidden="true" />
      {enableLightAnimation && <HeroLightAnimation />}
      <div className={`container ${styles.inner}`}>
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.badge}
        >
          <ShieldCheck size={14} />
          {hero.badge}
        </motion.div>
        
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {hero.headline.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </motion.h1>

        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {hero.subheadline}
        </motion.p>

        <motion.div 
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href={hero.ctaHref} className="btn btn--primary btn--lg">
            {hero.ctaLabel} <ArrowRight size={16} />
          </Link>
          <a href={`tel:${brand.phone}`} className={styles.contactDirect}>
            <Phone size={15} style={{ color: 'var(--clr-volt)' }} />
            <span>Call: {brand.phone}</span>
          </a>
        </motion.div>

        {paddleCourtSlot && (
          <motion.div
            className={styles.paddleCourtWrap}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            {paddleCourtSlot}
          </motion.div>
        )}

        {/* Stats */}
        <motion.div 
          className={styles.stats}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {hero.stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className={styles.statDivider} />}
              <div className={styles.stat}>
                <span className={styles.statNum} data-count={stat.count} data-suffix={stat.suffix}>
                  {stat.count}{stat.suffix}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
