import styles from './HeroOverlay.module.css';

export default function HeroOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.badge}>🏆 America's #1 Pickleball Camps</div>
        <h1 className={styles.headline}>Stop Guessing.<br/>Start Winning.</h1>
        <p className={styles.subheadline}>Our structured 4-hour camps deliver more breakthrough moments than months of casual play. Guaranteed.</p>
        <button className={styles.cta}>Find a Camp Near You →</button>
      </div>
    </div>
  );
}
