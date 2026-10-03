'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from './VideoTestimonials.module.css';
import CustomCursor from '@/components/animations/CustomCursor';

const Animation3D = dynamic(() => import('@/components/animations/Animation3D'), { ssr: false });

const testimonials = [
  { name: 'Barbara M.', photo: 'https://i.pravatar.cc/300?img=5', rating: 5, quote: 'I went from barely keeping the ball in play to winning my first recreational tournament — in 6 weeks after just 2 camps. I still can\'t believe it.' },
  { name: 'Tom R.', photo: 'https://i.pravatar.cc/300?img=70', rating: 5, quote: 'I\'ve been playing 3 years and was stuck at 3.0 forever. After the intermediate camp, I played the next week and everyone asked what happened to my game.' },
  { name: 'Linda K.', photo: 'https://i.pravatar.cc/300?img=9', rating: 5, quote: 'The ratio makes all the difference. It\'s not a big class where you get lost. The coach saw my forehand issue within 10 minutes and fixed it in an hour.' },
];

function Stars({ count }: { count: number }) {
  return <span className="star-rating">{'★'.repeat(count)}</span>;
}

interface VideoTestimonialsProps {
  transparentBg?: boolean;
  enable3D?: boolean;
  enableCursor?: boolean;
}

export default function VideoTestimonials({ 
  transparentBg = false,
  enable3D = true,
  enableCursor = true,
}: VideoTestimonialsProps) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={containerRef}
      className={`section ${styles.testimonialsSection} ${transparentBg ? styles.transparent : 'section--dark'}`}
    >
      {enable3D && (
        <div className={styles.animationBackground} aria-hidden="true">
          <Animation3D small={true} />
        </div>
      )}
      {enableCursor && <CustomCursor containerRef={containerRef} dotOnly={true} />}
      <div className={styles.contentOverlay}>
        <div className="container">
          <div className={styles.header} data-reveal>
            <span className="section-label">Player Stories</span>
            <h2 className="text-white">Real Players. Real Results. Zero Fluff.</h2>
            <p className={styles.subtitle}>We don&apos;t cherry-pick success stories. These are typical outcomes from our structured curriculum.</p>
          </div>
          <div className={styles.grid}>
            {testimonials.map((t, i) => (
              <div key={t.name} className={styles.card} data-reveal data-reveal-delay={String(i + 1)}>
                <div className={styles.photoWrap}>
                  <Image src={t.photo} alt={t.name} width={80} height={80} className={styles.photo} unoptimized />
                  <div className={styles.playBtn} aria-label="Play testimonial video">▶</div>
                </div>
                <div className={styles.content}>
                  <Stars count={t.rating} />
                  <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                  <p className={styles.name}>— {t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
