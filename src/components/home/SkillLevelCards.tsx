import Link from 'next/link';
import styles from './SkillLevelCards.module.css';

const levels = [
  {
    id: 'beginner',
    badge: 'Flagship Toronto Clinic',
    range: 'Beginner & Foundational',
    title: 'Building Consistency & Confidence',
    quote: 'Ideal for players who know the basics and want to build consistency and confidence. No official rating required.',
    body: 'Designed with a warm, encouraging approach for adults (marketing focus 40+) who want to play more smoothly, eliminate unforced errors, and meet enthusiastic fellow players in Toronto.',
    benefits: [
      'Ideal for players who know the basics — no official rating required',
      'Welcoming, patient, and ego-free coaching environment',
      'Master kitchen control, soft-touch dinking, and clean contact',
      'Strict 8:1 player-to-coach ratio across 2 courts (4 per court)',
      'Real-time live corrections and personal take-home notes',
    ],
    cta: 'Reserve Your Spot (8 Max) →',
    href: '/camps/toronto-beginner-clinic',
    dark: true,
  },
  {
    id: 'intermediate',
    badge: 'Progression Track',
    range: 'Camp Level 3.0 – 4.0',
    title: 'Doubles Strategy & Match Arsenal',
    quote: 'Sharpen your competitive doubles weapons with Pro-level technique.',
    body: 'For players ready to turn rallies into strategic points: master the first 3 shots, attack with punch, roll, and smash volleys, reset heavy pace, and run court positioning.',
    benefits: [
      'The First 3 Shots: Serve, return, and 3rd shot drop/drive mastery',
      'Learn backspin and topspin off both forehand and backhand',
      'Attack tools: Punch, roll, and smash volley execution',
      'Pace resets: Absorb fast balls off the bounce and off the volley',
      'Doubles mini-tournament with individual coach assessment',
    ],
    cta: 'Explore 3.0 – 4.0 Clinic →',
    href: '/camps/toronto-beginner-clinic',
    dark: false,
  },
];

export default function SkillLevelCards() {
  return (
    <section className={`section section--white`}>
      <div className="container">
        <div className={styles.header} data-reveal>
          <span className="section-label section-label--dark">Is This Clinic For Me?</span>
          <h2>The Right Training For Your Game</h2>
          <p className={styles.subtitle}>
            Welcoming, encouraging, and focused. Whether you are building confidence or sharpening your competitive game, improvement should be challenging, enjoyable, and shared.
          </p>
        </div>

        {/* Quick Self-Assessment Helper */}
        <div style={{
          background: '#F4F7F5',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <strong style={{ display: 'block', fontSize: '15px', color: '#111813', marginBottom: '4px' }}>
              💡 Not sure if your level fits?
            </strong>
            <span style={{ fontSize: '14px', color: '#4B5563' }}>
              If you know how to serve, keep score, and sustain a short rally, you will feel completely at home. No official rating or tournament experience needed.
            </span>
          </div>
          <a
            href="tel:+15875002973"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#111813',
              textDecoration: 'none',
              padding: '8px 16px',
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '9999px',
              whiteSpace: 'nowrap'
            }}
          >
            Ask Coach Cris: +1 (587) 500-2973
          </a>
        </div>

        <div className={styles.grid}>
          {levels.map((level, i) => (
            <div
              key={level.id}
              className={`${styles.card} ${level.dark ? styles.cardDark : styles.cardYellow}`}
              data-reveal
              data-reveal-delay={String(i + 1)}
            >
              <div className={styles.cardTop}>
                <span className={`${styles.badge} ${level.dark ? styles.badgeYellow : styles.badgeDark}`}>
                  {level.badge}
                </span>
                <span className={styles.range}>{level.range}</span>
              </div>
              <h3 className={styles.cardTitle}>{level.title}</h3>
              
              {/* Highlighted Quote Box */}
              <div style={{
                background: level.dark ? 'rgba(200, 255, 0, 0.1)' : 'rgba(17, 24, 19, 0.05)',
                borderLeft: `3px solid ${level.dark ? 'var(--clr-volt)' : '#111813'}`,
                padding: '10px 14px',
                borderRadius: '0 8px 8px 0',
                margin: '12px 0',
                fontSize: '13px',
                fontWeight: 600,
                color: level.dark ? '#FFFFFF' : '#111813'
              }}>
                &ldquo;{level.quote}&rdquo;
              </div>

              <p className={styles.cardBody}>{level.body}</p>
              
              <ul className={styles.benefits}>
                {level.benefits.map((b, j) => (
                  <li key={j} className={styles.benefit}>
                    <span className={styles.check}>✓</span> {b}
                  </li>
                ))}
              </ul>
              
              <Link
                href={level.href}
                className={`btn ${level.dark ? 'btn--primary' : 'btn--dark'} btn--full`}
              >
                {level.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
