import Link from 'next/link';
import Image from 'next/image';
import type { Camp } from '@/types';
import styles from './UpcomingCamps.module.css';

const statusConfig = {
  available:  { label: '✓ Available',   cls: 'badge--available' },
  limited:    { label: '⚠ Limited (8 Max)', cls: 'badge--limited' },
  'sold-out': { label: '✗ Clinic Full',    cls: 'badge--sold-out' },
};

const coaches: Record<string, { name: string; photo: string }> = {
  'coach-cris':  { name: "Coach Cris Abegão", photo: '/images/coach-cris.jpeg' },
  'coach-sarah': { name: 'Coach Sarah R.', photo: 'https://i.pravatar.cc/48?img=25' },
  'coach-james': { name: 'Coach James T.', photo: 'https://i.pravatar.cc/48?img=67' },
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
            Strictly limited to 8 players across 2 courts (4 per court) with Coach Cris. Reserve your spot before it fills.
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
                  <p className={styles.date}>{camp.dateDisplay}</p>
                  <p className={styles.time}>{camp.time}</p>
                  <h3 className={styles.location}>{camp.city}, {camp.stateCode} · Canada</h3>
                  {coach && (
                    <div className={styles.coachRow}>
                      <div className={styles.coachAvatar}>
                        <Image src={coach.photo} alt={coach.name} width={36} height={36} unoptimized />
                      </div>
                      <span className={styles.coachName}>{coach.name}</span>
                    </div>
                  )}
                  <p className={styles.price}>{priceLabel}</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '-8px', marginBottom: '8px' }}>
                    4-Hour Clinic · 8:1 Ratio (2 Courts)
                  </p>
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
