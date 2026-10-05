import type { Metadata } from 'next';
import { campRepository } from '@/lib/repositories/campRepository';
import Link from 'next/link';
import styles from './upcoming.module.css';

export const metadata: Metadata = {
  title: 'Upcoming Pickleball Camps Schedule',
  description: 'View our full calendar of upcoming pickleball camps grouped by month.',
};

export default async function UpcomingCampsPage() {
  const camps = await campRepository.findAll();
  
  // Sort camps by date
  camps.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group by Month/Year
  const groupedCamps = camps.reduce((acc, camp) => {
    const d = new Date(camp.date);
    const monthYear = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(camp);
    return acc;
  }, {} as Record<string, typeof camps>);

  return (
    <>
      <section className={`section section--dark ${styles.hero}`}>
        <div className="container">
          <h1 className="text-white">Upcoming Camp Schedule</h1>
          <p className={styles.heroSub}>
            Plan your next pickleball getaway. All clinics maintain an intimate small group of 8 players for maximum personalized coaching.
          </p>
        </div>
      </section>

      <section className={`section section--light`}>
        <div className={`container ${styles.timelineContainer}`}>
          {Object.entries(groupedCamps).map(([monthYear, monthCamps], mIndex) => (
            <div key={monthYear} className={styles.monthGroup} data-reveal data-reveal-delay={String((mIndex % 3) + 1)}>
              <div className={styles.monthSticky}>
                <h2 className={styles.monthTitle}>{monthYear}</h2>
                <div className={styles.monthLine}></div>
              </div>
              
              <div className={styles.campsList}>
                {monthCamps.map((camp) => (
                  <Link href={`/camps/${camp.slug}`} key={camp.id} className={styles.campRow}>
                    <div className={styles.dateCol}>
                      <span className={styles.dayNum}>{new Date(camp.date).getDate()}</span>
                      <span className={styles.dayName}>{new Date(camp.date).toLocaleString('en-US', { weekday: 'short' })}</span>
                    </div>
                    
                    <div className={styles.infoCol}>
                      <div className={styles.infoTop}>
                        <h3>{camp.city}, {camp.stateCode}</h3>
                        <span className={`badge badge--level`}>{camp.level}</span>
                      </div>
                      <p className={styles.venueText}>{camp.venueName}</p>
                    </div>

                    <div className={styles.statusCol}>
                      {camp.status === 'sold-out' ? (
                        <span className={styles.statusSoldOut}>Sold Out</span>
                      ) : camp.status === 'limited' ? (
                        <span className={styles.statusLimited}>Only {camp.seatsLeft} spots left</span>
                      ) : (
                        <span className={styles.statusAvail}>Available</span>
                      )}
                    </div>
                    
                    <div className={styles.actionCol}>
                      <span className="btn btn--outline">Details →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
