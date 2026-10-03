import styles from './BlueprintSteps.module.css';

const steps = [
  {
    num: '01',
    title: 'Observe & Diagnose',
    desc: 'During the warm-up and dinking drills, Coach Cris observes your technique in real time across both courts to pinpoint the exact habits limiting your game.',
  },
  {
    num: '02',
    title: 'Drill & Rebuild',
    desc: 'We drill the first 3 shots, attack volleys, and defensive resets with on-the-spot corrections so you develop clean mechanics and muscle memory.',
  },
  {
    num: '03',
    title: 'Tournament & Action Plan',
    desc: 'Apply your new tactical mindset in a doubles mini-tournament. Coach Cris takes notes and delivers your personal list of things to work on next.',
  },
];

export default function BlueprintSteps() {
  return (
    <section className={`section section--white`}>
      <div className="container">
        <div className={styles.header} data-reveal>
          <span className="section-label section-label--dark">Coaching Methodology</span>
          <h2>How Coach Cris Elevates Your Game</h2>
          <p className={styles.subtitle} style={{ maxWidth: '640px', margin: '8px auto 0', color: 'var(--clr-text-secondary)', fontSize: '16px' }}>
            Structured drills, observant real-time feedback, and guided tournament play across 2 dedicated courts.
          </p>
        </div>
        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div key={step.num} className={styles.step} data-reveal data-reveal-delay={String(i + 1)}>
              {i < steps.length - 1 && <div className={styles.connector} aria-hidden="true" />}
              <div className={styles.numBadge}>{step.num}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
