import type { Metadata } from 'next';
import Link from 'next/link';
import { stateRepository } from '@/lib/repositories/stateRepository';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Find Camps By State',
  description: 'Pickleball camps available across 35+ states. Find a camp in your state.',
};

const dummyStories = [
  { id: 1, state: 'Texas', author: 'Mark T.', quote: '"The Austin camp completely transformed my backhand dink. Highly recommend to anyone stuck at 3.5!"' },
  { id: 2, state: 'Arizona', author: 'Sarah J.', quote: '"I traveled from out of state just for this Scottsdale camp. Best pickleball weekend ever."' },
  { id: 3, state: 'Florida', author: 'David L.', quote: '"The drills we learned in Miami are now my daily warm-up. My game has never been sharper."' },
  { id: 4, state: 'California', author: 'Emily R.', quote: '"Finally broke through to 4.0 after the San Diego intensive. The coaches actually care."' },
  { id: 5, state: 'New York', author: 'James W.', quote: '"Incredible structure. We didn\'t waste a single minute standing around."' },
  { id: 6, state: 'Colorado', author: 'Lisa M.', quote: '"The altitude was tough, but the coaching was top tier. Loved every second of it!"' }
];

export default async function StatesPage() {
  const states = await stateRepository.findAll();

  return (
    <>
      <section className={`section section--dark ${styles.pageHero}`}>
        <div className="container">
          <span className="section-label">All States</span>
          <h1 className="text-white">Find Camps By State</h1>
          <p className={styles.heroSubtitle}>We run camps in 35+ states. Find the one closest to you.</p>
        </div>
      </section>
      <section className={`section section--light`}>
        <div className="container">
          <div className={styles.grid}>
            {states.map((state, i) => (
              <Link
                key={state.code}
                href={`/states/${state.slug}`}
                className={styles.card}
                data-reveal
                data-reveal-delay={String((i % 5) + 1)}
              >
                <div 
                  className={styles.imageWrapper}
                  style={{ backgroundImage: `url(${state.image})` }}
                ></div>
                <div className={styles.cardContent}>
                  <h3 className={styles.name}>{state.name}</h3>
                  <p className={styles.count}>{state.campCount} Camp{state.campCount !== 1 ? 's' : ''}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dummy Stories Section */}
      <section className={styles.storiesSection}>
        <div className="container">
          <div className={styles.sectionTitle}>
            <span className="section-label">Success Stories</span>
            <h2>Campers From Across The Country</h2>
          </div>
          <div className={styles.storiesGrid}>
            {dummyStories.map((story, i) => (
              <div 
                key={story.id} 
                className={styles.storyCard}
                data-reveal
                data-reveal-delay={String((i % 3) + 1)}
              >
                <div className={styles.storyState}>📍 {story.state}</div>
                <p className={styles.storyQuote}>{story.quote}</p>
                <div className={styles.storyAuthor}>— {story.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
