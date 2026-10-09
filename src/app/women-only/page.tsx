import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import siteContent from '@/content/site.content.json';
import coachesData from '@/lib/db/coaches.json';
import type { Coach } from '@/types';
import styles from './women-only.module.css';
import { MessageCircle, Users, TrendingUp, Trophy, Star } from 'lucide-react';

const { seo, womenOnly } = siteContent;

const reasonIcons = [
  <MessageCircle key="1" size={26} style={{ color: 'var(--clr-volt)' }} />,
  <Users key="2" size={26} style={{ color: 'var(--clr-volt)' }} />,
  <TrendingUp key="3" size={26} style={{ color: 'var(--clr-volt)' }} />,
  <Trophy key="4" size={26} style={{ color: 'var(--clr-volt)' }} />,
];

export const metadata: Metadata = {
  title: seo.womenOnly.title,
  description: seo.womenOnly.description,
};

export default function WomenOnlyPage() {
  const womenCoaches = (coachesData as Coach[]).filter((c) => c.womenOnly);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.badge} data-reveal>{womenOnly.pageHero.badge}</span>
          <h1 className={styles.heroTitle} data-reveal data-reveal-delay="1">
            {womenOnly.pageHero.heading.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
          <p className={styles.heroSub} data-reveal data-reveal-delay="2">
            {womenOnly.pageHero.subheading}
          </p>
          <div data-reveal data-reveal-delay="3">
            <Link href={womenOnly.pageHero.ctaHref} className={`${styles.heroCta} btn btn--lg`}>
              {womenOnly.pageHero.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={`container ${styles.statsInner}`}>
          <div className={styles.statItem}>
            <strong>200+</strong>
            <span>Women&apos;s Camps Run</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <strong>4,000+</strong>
            <span>Women Trained</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <strong>All Female</strong>
            <span>Coaching Staff</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              4.9 <Star size={18} fill="var(--clr-volt)" stroke="var(--clr-volt)" />
            </strong>
            <span>Average Rating</span>
          </div>
        </div>
      </div>

      {/* Why Women's Only */}
      <section className={styles.whySection}>
        <div className="container">
          <h2 className={styles.sectionTitle} data-reveal>{womenOnly.whySection.heading}</h2>
          <div className={styles.reasonsGrid}>
            {womenOnly.whySection.reasons.map((r, i) => (
              <div key={r.title} className={styles.reasonCard} data-reveal data-reveal-delay={String(i + 1)}>
                <span className={styles.reasonIcon}>{reasonIcons[i % reasonIcons.length]}</span>
                <h3 className={styles.reasonTitle}>{r.title}</h3>
                <p className={styles.reasonDesc}>{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial strip */}
      <section className={styles.testimonialStrip}>
        <div className={`container ${styles.testimonials}`}>
          {[
            { quote: '"I was nervous it would be competitive and intimidating. It was the exact opposite — welcoming, fun, and I learned so much about soft-touch dinking and reset positioning."', name: 'Patricia L.', location: 'Toronto, ON' },
            { quote: '"Finally, a clinic where I could ask questions freely without feeling rushed. Having 2 dedicated courts with 4 players per court made every drill so focused."', name: 'Wendy C.', location: 'Mississauga, ON' },
            { quote: '"My game jumped a full rating level in one clinic. Coach gave us clear personal notes to take home that I still use every week."', name: 'Susan M.', location: 'Oakville, ON' },
          ].map((t) => (
            <div key={t.name} className={styles.testimonialCard}>
              <p className={styles.testimonialQuote}>{t.quote}</p>
              <div className={styles.testimonialAuthor}>
                <strong>{t.name}</strong>
                <span>{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Women Coaches */}
      <section className={styles.coachesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle} data-reveal>Meet Your Coaches</h2>
          <p className={styles.sectionSub} data-reveal data-reveal-delay="1">
            All women&apos;s-only camps are led by PPR or IPTPA certified female coaches.
          </p>
          <div className={styles.coachGrid}>
            {womenCoaches.map((coach, i) => (
              <div key={coach.id} className={styles.coachCard} data-reveal data-reveal-delay={String(i + 1)}>
                <Image
                  src={coach.photo}
                  alt={`Coach ${coach.name}`}
                  width={100}
                  height={100}
                  className={styles.coachPhoto}
                  unoptimized
                />
                <div>
                  <h3 className={styles.coachName}>{coach.name}</h3>
                  <p className={styles.coachBio}>{coach.shortBio}</p>
                  <div className={styles.coachBadges}>
                    {coach.certifications.slice(0, 2).map((c) => (
                      <span key={c} className={styles.coachBadge}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>Ready To Join The Community?</h2>
          <p className={styles.ctaSub}>Spots fill fast. Our women&apos;s camps sell out faster than any other category we run.</p>
          <div className={styles.ctaBtns}>
            <Link href={womenOnly.pageHero.ctaHref} className={`${styles.heroCta} btn btn--lg`}>
              Find a Women&apos;s Camp →
            </Link>
            <Link href="/coaches" className="btn btn--outline btn--lg">
              Meet Our Coaches
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
