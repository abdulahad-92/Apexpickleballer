'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import siteContent from '@/content/site.content.json';
import HeroLightAnimation from './HeroLightAnimation';
import VideoModalPlayer from '@/components/common/VideoModalPlayer';

const { hero } = siteContent.home;

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.badge}
        >
          {hero.badge}
        </motion.div>
        
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {hero.headline.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </motion.h1>

        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {hero.subheadline}
        </motion.p>

        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href={hero.ctaHref} className={`btn btn--primary btn--lg`}>
            {hero.ctaLabel}
          </Link>
        </motion.div>

        {/* Option 4 Paddle Court Slot below CTA button */}
        {paddleCourtSlot && (
          <motion.div
            className={styles.paddleCourtWrap}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {paddleCourtSlot}
          </motion.div>
        )}

        {/* Stats */}
        <motion.div 
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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

        {/* Guaranteed Video Embed with Poster & Play Button */}
        <motion.div 
          className={styles.videoWrap}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <VideoModalPlayer
            youtubeId={hero.videoYouTubeId}
            title={hero.videoTitle}
            caption={hero.videoCaption}
          />
        </motion.div>
      </div>
    </section>
  );
}
