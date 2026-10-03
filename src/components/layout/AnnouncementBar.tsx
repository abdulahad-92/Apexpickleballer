import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className="container">
        <p className={styles.text}>
          🔥 <strong>500+ Camps Nationwide</strong> &nbsp;·&nbsp; ⭐ <strong>4.9 Stars</strong> &nbsp;·&nbsp; Trusted by <strong>10,000+ Players</strong>
        </p>
      </div>
    </div>
  );
}
