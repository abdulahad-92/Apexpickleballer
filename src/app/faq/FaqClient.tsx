'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './faq.module.css';
import type { FaqCategory } from '@/types';

interface Props {
  faqData: FaqCategory[];
  hero: { heading: string; subheading: string };
  cta: { heading: string; subheading: string; ctaLabel: string; ctaHref: string };
}

export default function FaqClient({ faqData, cta }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Flatten all questions for this layout
  const allQuestions = faqData.flatMap(c => c.questions);

  return (
    <>
      <section className={`section section--white`}>
        <div className={`container ${styles.layout}`}>
          
          {/* Left Column */}
          <div className={styles.leftCol}>
            <div className={styles.pill}>Common Questions</div>
            <h1 className={styles.heading}>ANSWERS FOR EVERY PICKLEBALL PLAYER</h1>
            
            <div className={styles.accordionList}>
              {allQuestions.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
                    <button
                      className={styles.accordionTrigger}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                    >
                      <span className={styles.question}>{item.q}</span>
                      <span className={styles.chevron} aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    <div className={styles.accordionPanel} hidden={!isOpen}>
                      <p className={styles.answer}>{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightCol}>
            <p className={styles.rightText}>
              Choosing the right pickleball camp is an important decision, and we want you to feel completely confident before you register. Below you'll find answers to the most common questions our players ask about our camps, safety, scheduling, and what to expect.
            </p>
            <div className={styles.imageWrap}>
              <Image 
                src="/images/apex13.png" 
                alt="Apex Pickleballers players and coach in debrief" 
                width={800} 
                height={600} 
                unoptimized
              />
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaHeading}>{cta.heading}</h2>
          <p className={styles.ctaSub}>{cta.subheading}</p>
          <Link href={cta.ctaHref} className="btn btn--primary btn--lg">{cta.ctaLabel}</Link>
        </div>
      </section>
    </>
  );
}
