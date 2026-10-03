import type { Metadata } from 'next';
import { campRepository } from '@/lib/repositories/campRepository';
import CampsClientPage from '@/components/camps/CampsClientPage';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Find a Pickleball Camp',
  description: 'Browse all upcoming pickleball camps. Filter by state, coach, skill level, and month. Spots are limited.',
};

export default async function CampsPage() {
  const camps = await campRepository.findAll({ sort: 'date-asc' });

  return (
    <>
      <section className={`section section--dark ${styles.pageHero}`}>
        <div className="container">
          <span className="section-label">All Camps</span>
          <h1 className="text-white">Find Your Camp</h1>
          <p className={styles.heroSubtitle}>
            Filter by state, level, coach, or month. Spots are limited — don&apos;t wait.
          </p>
        </div>
      </section>
      <CampsClientPage initialCamps={camps} />
    </>
  );
}
