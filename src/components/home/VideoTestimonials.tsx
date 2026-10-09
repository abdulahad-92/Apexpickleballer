'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import styles from './VideoTestimonials.module.css';

const Animation3D = dynamic(() => import('@/components/animations/Animation3D'), { ssr: false });

interface ReviewItem {
  name: string;
  initials: string;
  location: string;
  rating: number;
  levelBadge: string;
  headline: string;
  quote: string;
  tags: string[];
}

const reviews: ReviewItem[] = [
  {
    name: 'David & Sarah G.',
    initials: 'DG',
    location: 'Toronto, ON (Fairtree Indoor)',
    rating: 5,
    levelBadge: 'Intermediate 3.0 → 3.5',
    headline: '“The 8:1 ratio meant nowhere to hide bad habits — in the best way possible!”',
    quote: 'We took big clinics before where you stand in a queue of 20 people and hit 3 balls every 15 minutes. Apex was completely different. Cris had us on 2 active courts non-stop. Within 12 minutes, he diagnosed why my third-shot drop was popping up (too much wrist snap; needed to lift from the shoulder with a quiet paddle). Sarah finally gained the confidence to reset hard bangers at the kitchen line. The handwritten coaching checklist we received at the end is pinned to our fridge.',
    tags: ['Third-Shot Drop Fix', 'Kitchen Resets', 'Written Coaching Checklist']
  },
  {
    name: 'Elena M.',
    initials: 'EM',
    location: 'Oakville, ON',
    rating: 5,
    levelBadge: 'Adult 40+ Player (3.25)',
    headline: '“Coach Cris fixed my panic at the kitchen line in just 4 hours.”',
    quote: 'As an adult player in my 50s, I always felt rushed and panicked whenever opponent drives came speeding in. Coach Cris slowed the game down for me. He walked between our 2 courts constantly, calling out ready positions in real time. By Hour 3 during the situational transition drills, I was naturally dropping pace-absorbing resets into their kitchen instead of hitting high floaters. The atmosphere was welcoming, supportive, and zero-intimidation.',
    tags: ['Pace-Absorbing Defense', 'Kitchen Confidence', 'Zero-Intimidation']
  },
  {
    name: 'Marcus T.',
    initials: 'MT',
    location: 'Markham, ON',
    rating: 5,
    levelBadge: 'Competitive 3.5 Doubles',
    headline: '“The breakdown of the ‘First 3 Shots’ gave me a tactical playbook.”',
    quote: 'I used to rely purely on athletic reflexes and wondered why I kept losing close 11-9 games. Cris broke down the geometry of the serve, deep return of serve, and 3rd shot drop vs. drive selection with clinical precision. Having only 4 players per court with Cris directly overseeing both meant immediate correction on every single rep. You simply don’t get this level of tactical depth anywhere else in the Greater Toronto Area.',
    tags: ['The First 3 Shots', 'Tactical Doubles Depth', '4 Players Per Court']
  },
  {
    name: 'Linda K. & Paul R.',
    initials: 'LK',
    location: 'Mississauga, ON',
    rating: 5,
    levelBadge: 'Advanced Beginner (2.75 → 3.25)',
    headline: '“No wasted minutes. 100% active court time and tailored adjustments.”',
    quote: 'My husband and I were worried 4 hours might be exhausting or repetitive. It flew by because the progression was so thoughtful. Hour 1 on topspin/backspin feel, Hour 2 on drops and transitions, Hour 3 on tactical dinking, and Hour 4 on live tournament scenarios with Cris pausing play to show alternative shot options. We played rec doubles the very next Tuesday and our regular group asked who had coached us!',
    tags: ['High Rep Volume', 'Structured 4-Hour Pacing', 'Rapid Progression']
  },
  {
    name: 'Robert Chen',
    initials: 'RC',
    location: 'North York, ON',
    rating: 5,
    levelBadge: 'Recreational Doubles',
    headline: '“The personalized coaching card is worth the clinic fee alone.”',
    quote: 'Most coaches give generic tips to a crowd and send you home. Coach Cris watched my specific footwork during the mini-tournament in Hour 4, and wrote down 3 precise adjustments: widen my split-step before the opponent strikes, keep paddle head at 10 o’clock at the NVZ, and stop backing up on deep returns. That direct observational coaching has transformed my consistency.',
    tags: ['Personalized Action Plan', 'Split-Step Footwork', 'Observant Corrections']
  },
  {
    name: 'Brenda S.',
    initials: 'BS',
    location: 'Richmond Hill, ON',
    rating: 5,
    levelBadge: 'Adult Recreational 3.0',
    headline: '“Encouraging, professional, and genuinely community-driven.”',
    quote: 'I was nervous about attending solo, but the small group of 8 created an instant bond. Everyone was so encouraging, and Coach Cris creates an environment where making mistakes during drills is celebrated as learning. If you’re an adult pickleballer looking to break through a plateau without feeling judged, Apex is the only clinic I’d recommend in Ontario.',
    tags: ['Solo Attendee Friendly', 'Encouraging Community', 'Mastered Consistency']
  }
];

function Stars({ count }: { count: number }) {
  return <div className={styles.stars}>{'★'.repeat(count)}</div>;
}

interface VideoTestimonialsProps {
  transparentBg?: boolean;
  enable3D?: boolean;
}

export default function VideoTestimonials({ 
  transparentBg = false,
  enable3D = true,
}: VideoTestimonialsProps) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={containerRef}
      className={`section ${styles.testimonialsSection} ${transparentBg ? styles.transparent : 'section--dark'}`}
      id="reviews"
    >
      {enable3D && (
        <div className={styles.animationBackground} aria-hidden="true">
          <Animation3D small={true} />
        </div>
      )}
      
      <div className={styles.contentOverlay}>
        <div className="container">
          <div className={styles.header} data-reveal>
            <span className="section-label">Verified Player Reviews</span>
            <h2 className="text-white">Real Players. Real Breakthroughs. Zero Fluff.</h2>
            <p className={styles.subtitle}>
              Authentic experiences from adult recreational players across Toronto and the GTA who transformed their consistency, confidence, and doubles strategy with Coach Cris.
            </p>
          </div>

          <div className={styles.grid}>
            {reviews.map((r, i) => (
              <div 
                key={r.name} 
                className={styles.card} 
                data-reveal 
                data-reveal-delay={String((i % 3) + 1)}
              >
                <div>
                  <div className={styles.cardTop}>
                    <span className={styles.verifiedBadge}>
                      <CheckCircle2 size={12} /> Verified Clinic Attendee
                    </span>
                    <span className={styles.levelBadge}>{r.levelBadge}</span>
                  </div>

                  <Stars count={r.rating} />

                  <h3 className={styles.headline}>{r.headline}</h3>
                  <p className={styles.quote}>&ldquo;{r.quote}&rdquo;</p>
                </div>

                <div>
                  <div className={styles.tagsRow}>
                    {r.tags.map((tag) => (
                      <span key={tag} className={styles.tagPill}>
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.authorRow}>
                    <div className={styles.avatar} aria-hidden="true">
                      {r.initials}
                    </div>
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{r.name}</span>
                      <span className={styles.authorLocation}>{r.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Trust Bar */}
          <div className={styles.trustBar} data-reveal>
            <div className={styles.trustItem}>
              <ShieldCheck size={18} style={{ color: 'var(--clr-volt)' }} />
              <span>Capped at 8 Players (8:1 Player-to-Coach Ratio)</span>
            </div>
            <div className={styles.trustItem}>
              <Award size={18} style={{ color: 'var(--clr-volt)' }} />
              <span>4.9★ Average Rating from Over 85+ Clinics Run</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={18} style={{ color: 'var(--clr-volt)' }} />
              <span>100% Individual Written Takeaway Checklist</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
