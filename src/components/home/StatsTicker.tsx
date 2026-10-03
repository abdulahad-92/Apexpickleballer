import styles from './StatsTicker.module.css';

const states = [
  'Arizona','Texas','California','Florida','Colorado','Nevada','Georgia',
  'North Carolina','New York','Michigan','Ohio','Illinois','Washington',
  'Oregon','Pennsylvania','Virginia','Tennessee','Minnesota','Utah','Missouri',
  'Wisconsin','New Mexico','South Carolina','Kentucky','Indiana','Massachusetts',
  'Maryland','New Jersey','Connecticut','Idaho','Montana','Kansas','Iowa','Oklahoma',
];

export default function StatsTicker() {
  const doubled = [...states, ...states]; // Duplicate for seamless loop
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <p className={styles.label}>Camps now available across <strong>35+ states</strong> including:</p>
      </div>
      <div className={styles.tickerOuter}>
        <div className={`marquee-track ${styles.track}`}>
          {doubled.map((state, i) => (
            <span key={i} className={styles.item}>
              {state} <span className={styles.dot}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
