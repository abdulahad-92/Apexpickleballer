import styles from './MarqueeTicker.module.css';
import siteContent from '@/content/site.content.json';

const { ticker } = siteContent.home;

export default function MarqueeTicker() {
  // Repeat items for seamless loop
  const items = [...ticker.items, ...ticker.items];

  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        {items.map((item, i) => (
          <span key={i} className={styles.item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
