import Link from 'next/link';
import Image from 'next/image';
import type { Camp } from '@/types';
import { Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import styles from './UpcomingCamps.module.css';

const statusConfig = {
  available:  { label: '✓ Spots Available', cls: 'badge--available' },
  limited:    { label: '⚠ Limited (8 Max)',  cls: 'badge--limited' },
  'sold-out': { label: '✗ Clinic Full',      cls: 'badge--sold-out' },
};

const coaches: Record<string, { name: string; role: string; photo: string }> = {
  'coach-cris':  { name: "Coach Cris Abegão", role: '4.5–5.0 Doubles Specialist', photo: '/images/coach-cris.jpeg' },
  'coach-sarah': { name: 'Coach Sarah R.', role: 'Doubles Strategy Coach', photo: '/images/apex2.png' },
  'coach-james': { name: 'Coach James T.', role: 'Movement & Biomechanics', photo: '/images/apex5.png' },
};

export default function UpcomingCamps({ camps }: { camps: Camp[] }) {
  const featured = camps.filter((c) => c.featured).slice(0, 3);

  return (
    <section className={`section section--light`}>
      <div className="container">
        <div className={styles.header} data-reveal>
          <span className="section-label section-label--dark">Coached Clinics</span>
          <h2>Flagship Toronto Coached Sessions</h2>
          <p className={styles.subtitle}>
            Small group capped at 8 players across 2 dedicated indoor courts with Coach Cris. Zero standing in lines. 100% active court reps.
          </p>
        </div>

        <div className={styles.grid}>
          {featured.map((camp, i) => {
            const status = statusConfig[camp.status] || statusConfig.available;
            const coach = coaches[camp.coachId] || coaches['coach-cris'];
            const isSoldOut = camp.status === 'sold-out';
            const priceLabel = camp.currency === 'CAD' ? `$${camp.price} CAD` : `$${camp.price}`;

            return (
              <div key={camp.id} className={styles.card} data-reveal data-reveal-delay={String(i + 1)}>
                <div className={styles.cardTop}>
                  <span className={`badge ${status.cls}`}>{status.label}</span>
                  <span className="badge badge--level">{camp.level}</span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.dateRow}>
                    <Calendar size={15} style={{ color: 'var(--clr-text-secondary)' }} />
                    <span>{camp.dateDisplay}</span>
                  </div>

                  <div className={styles.timeRow}>
                    <Clock size={14} style={{ color: 'var(--clr-text-muted)' }} />
                    <span>{camp.time}</span>
                  </div>

                  <h3 className={styles.location}>
                    <MapPin size={18} style={{ color: '#166534', flexShrink: 0 }} />
                    {camp.city}, {camp.stateCode} · Canada
                  </h3>

                  <div className={styles.facilityBadge}>
                    <ShieldCheck size={13} />
                    <span>2 Dedicated Courts · 8 Players Max (8:1 Ratio)</span>
                  </div>

                  <div className={styles.featuresList}>
                    <div className={styles.featureItem}>
                      <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                      <span>The First 3 Shots &amp; Kitchen Resets</span>
                    </div>
                    <div className={styles.featureItem}>
                      <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                      <span>Live Observant Real-Time Feedback</span>
                    </div>
                    <div className={styles.featureItem}>
                      <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                      <span>Take-Home Personalized Coaching Plan</span>
                    </div>
                  </div>

                  {coach && (
                    <div className={styles.coachRow}>
                      <div className={styles.coachAvatar}>
                        <Image src={coach.photo} alt={coach.name} width={38} height={38} unoptimized />
                      </div>
                      <div className={styles.coachInfo}>
                        <span className={styles.coachName}>{coach.name}</span>
                        <span className={styles.coachRole}>{coach.role}</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.priceBlock}>
                    <div className={styles.price}>{priceLabel}</div>
                    <div className={styles.priceSub}>All 4 hours + equipment + notes included</div>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <Link
                    href={`/camps/${camp.slug}`}
                    className={`btn btn--primary btn--full ${isSoldOut ? 'btn--disabled' : ''}`}
                  >
                    {isSoldOut ? 'Join Waitlist' : 'Reserve Your Spot →'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.viewAll} data-reveal>
          <Link href="/camps" className={`btn btn--outline-white`} style={{ borderColor: 'var(--clr-text-primary)', color: 'var(--clr-text-primary)' }}>
            View All Toronto Clinics →
          </Link>
        </div>
      </div>
    </section>
  );
}
