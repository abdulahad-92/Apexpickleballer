'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PhotoGallery.module.css';
import AnimationParallax from '@/components/animations/AnimationParallax';

const photos = [
  { src: '/images/apex3.png', alt: 'Coach Cris actively coaching across 2 dedicated indoor courts with 8 players (8:1 ratio)' },
  { src: '/images/apex2.png', alt: '1-on-1 paddle angle and wrist positioning adjustment at the kitchen net' },
  { src: '/images/apex1.png', alt: 'Live kitchen line dinking and reset rally breakdown' },
  { src: '/images/apex6.png', alt: 'Supportive, high-energy group clinic debrief with Coach Cris' },
  { src: '/images/apex10.png', alt: 'Adult players learning doubles positioning and communication' },
  { src: '/images/apex13.png', alt: 'Post-session patio debrief with personalized coaching takeaways' },
];

interface PhotoGalleryProps {
  transparentBg?: boolean;
  animatedTitleBalls?: boolean;
  enableParallax?: boolean;
}

export default function PhotoGallery({
  transparentBg = false,
  animatedTitleBalls = true,
  enableParallax = true,
}: PhotoGalleryProps) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={containerRef}
      className={`section ${styles.gallerySection} ${transparentBg ? styles.transparent : 'section--dark2'}`}
    >
      {enableParallax && (
        <div className={styles.animationBackground} aria-hidden="true">
          <AnimationParallax />
        </div>
      )}
      <div className={styles.contentOverlay}>
        <div className="container">
        <div className={styles.header} data-reveal>
          <span className="section-label">Real Camp Moments</span>
          
          <div className={styles.titleWrap}>
            {animatedTitleBalls && (
              <motion.div 
                className={styles.titleBallLeft}
                animate={{
                  y: [0, -14, 0],
                  rotate: [0, 15, -10, 0],
                  scale: [1, 1.06, 1]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <div className={styles.pickleball}>
                  <div className={styles.holes}>
                    <span className={styles.hole} style={{ top: '30%', left: '35%' }} />
                    <span className={styles.hole} style={{ top: '50%', left: '20%' }} />
                    <span className={styles.hole} style={{ top: '50%', left: '55%' }} />
                    <span className={styles.hole} style={{ top: '70%', left: '40%' }} />
                  </div>
                </div>
              </motion.div>
            )}

            <h2 className={`text-white ${styles.titleText}`}>This Is What Transformation Looks Like</h2>

            {animatedTitleBalls && (
              <motion.div 
                className={styles.titleBallRight}
                animate={{
                  y: [0, 16, 0],
                  rotate: [0, -20, 12, 0],
                  scale: [1, 1.08, 1]
                }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                aria-hidden="true"
              >
                <div className={`${styles.pickleball} ${styles.pickleballLarge}`}>
                  <div className={styles.holes}>
                    <span className={styles.hole} style={{ top: '25%', left: '40%' }} />
                    <span className={styles.hole} style={{ top: '45%', left: '25%' }} />
                    <span className={styles.hole} style={{ top: '48%', left: '60%' }} />
                    <span className={styles.hole} style={{ top: '68%', left: '35%' }} />
                    <span className={styles.hole} style={{ top: '65%', left: '65%' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className={styles.grid}>
          {photos.map((photo, i) => (
            <div key={i} className={styles.item} data-reveal data-reveal-delay={String((i % 3) + 1)}>
              <Image src={photo.src} alt={photo.alt} width={600} height={400} className={styles.img} unoptimized />
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
