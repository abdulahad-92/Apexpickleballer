import Link from 'next/link';
import styles from './CtaBanner.module.css';

export default function CtaBanner() {
  return (
    <section className={styles.banner}>
      <div className={`container ${styles.inner}`}>
        <div data-reveal>
          <h2 className={styles.title}>Your Breakthrough Is<br />One Camp Away.</h2>
          <p className={styles.subtitle}>
            Spots fill up in days. Choose your camp, lock in your seat, and show up ready to level up.
          </p>
          <Link href="/camps" className={styles.ctaBtn}>
            Find Your Camp Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
