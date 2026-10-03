import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { stateRepository } from '@/lib/repositories/stateRepository';
import { campRepository } from '@/lib/repositories/campRepository';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const state = await stateRepository.findBySlug(slug);
  if (!state) return { title: 'State Not Found' };
  
  return {
    title: `Pickleball Clinics in ${state.name} | Apex Pickleballers`,
    description: `Find structured pickleball training clinics in ${state.name}. Enhance your skills with our 4-hour coached curriculum.`,
  };
}

export default async function StatePage({ params }: Props) {
  const { slug } = await params;
  const state = await stateRepository.findBySlug(slug);
  
  if (!state) notFound();

  // Find camps for this state
  const stateCamps = await campRepository.findByState(state.name);
  
  // Sort by date
  const sortedCamps = stateCamps.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <>
      <section className={`section section--dark ${styles.stateHero}`} style={{ backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.85), rgba(13, 27, 42, 0.95)), url(${state.image})` }}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> <span>/</span>
            <Link href="/states">States</Link> <span>/</span>
            <span>{state.name}</span>
          </div>
          <span className="section-label">State Locations</span>
          <h1 className="text-white">Pickleball Camps in {state.name}</h1>
          <p className={styles.heroSub}>
            Join {state.name}&apos;s fastest-growing pickleball community. We bring our proven 4-hour intensive camps to top facilities across the state.
          </p>
        </div>
      </section>

      <section className={`section section--light`}>
        <div className="container">
          <div className={styles.campsHeader}>
            <h2>Upcoming Camps in {state.name}</h2>
            <p>{sortedCamps.length} camp{sortedCamps.length !== 1 ? 's' : ''} available</p>
          </div>
          
          {sortedCamps.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎾</div>
              <h3>No camps scheduled right now</h3>
              <p>We&apos;re finalizing our upcoming schedule for {state.name}. Check back soon or browse camps in nearby states.</p>
              <Link href="/states" className="btn btn--outline">Browse All States</Link>
            </div>
          ) : (
            <div className={styles.campGrid}>
              {sortedCamps.map((camp, i) => (
                <div key={camp.id} className={styles.campCard} data-reveal data-reveal-delay={String((i % 4) + 1)}>
                  <div className={styles.campHeader}>
                    <div className={styles.dateWrap}>
                      <span className={styles.month}>{new Date(camp.date).toLocaleString('en-US', { month: 'short' })}</span>
                      <span className={styles.day}>{new Date(camp.date).getDate()}</span>
                    </div>
                    <div className={styles.headerInfo}>
                      <h3>{camp.city}, {camp.stateCode}</h3>
                      <p>{camp.level === 'beginner' ? 'Beginner (2.0–3.0)' : 'Intermediate (3.0–4.0)'}</p>
                    </div>
                  </div>
                  <div className={styles.campBody}>
                    <p className={styles.venue}><strong>Venue:</strong> {camp.venueName}</p>
                    <p className={styles.time}><strong>Time:</strong> {camp.time}</p>
                    <div className={styles.seats}>
                      {camp.seatsLeft <= 2 ? (
                        <span className={styles.urgentSeats}>⚡ Only {camp.seatsLeft} spots left</span>
                      ) : (
                        <span className={styles.goodSeats}>{camp.seatsLeft} spots available</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.campFooter}>
                    <Link href={`/camps/${camp.slug}`} className="btn btn--primary btn--full">
                      View Details & Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className={styles.ctaSection}>
        <div className="container">
          <h2>Don&apos;t see your city?</h2>
          <p>We are constantly expanding our footprint in {state.name}. Subscribe to get notified when we add new dates near you.</p>
          <form className={styles.subscribeForm}>
            <input type="email" placeholder="Your Email Address" className="form-input" required />
            <button type="submit" className="btn btn--primary">Get Notified</button>
          </form>
        </div>
      </section>
    </>
  );
}
