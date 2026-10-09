'use client';

import React from 'react';
import styles from './WhyCampsWork.module.css';
import { Trophy, ClipboardList, Target, Zap } from 'lucide-react';

const features = [
  {
    icon: <Trophy className={styles.iconSvg} />,
    tag: '8 Players Max',
    title: '8:1 Player-to-Coach Ratio',
    desc: 'Focused small group across 2 dedicated courts (4 per court). Coach Cris works continuously across both courts for maximum personalized reps.',
  },
  {
    icon: <ClipboardList className={styles.iconSvg} />,
    tag: 'On-The-Spot',
    title: 'Observant Real-Time Coaching',
    desc: 'Coach Cris spots technical and tactical habits in real-time, providing immediate adjustments so you fix mistakes on the spot.',
  },
  {
    icon: <Target className={styles.iconSvg} />,
    tag: '80% of Game Points',
    title: 'The First 3 Shots & Resets',
    desc: 'We drill the foundational shots that dictate modern doubles: the serve, return, third shot drop/drive selection, and pace-absorbing resets.',
  },
  {
    icon: <Zap className={styles.iconSvg} />,
    tag: 'Written Takeaways',
    title: 'Personalized Action Plan',
    desc: 'During the doubles mini-tournament, Coach Cris notes your specific habits and hands you a personalized checklist for your next level.',
  },
];

interface WhyCampsWorkProps {
  transparentBg?: boolean;
}

export default function WhyCampsWork({ transparentBg = false }: WhyCampsWorkProps) {
  return (
    <section className={`section ${styles.whySection} ${transparentBg ? styles.transparent : 'section--dark2'}`}>
      <div className={styles.contentOverlay}>
        <div className="container">
          <div className={styles.header} data-reveal>
            <span className="section-label">Why It Works</span>
            <h2 className="text-white">We Built The System.<br />You Get The Results.</h2>
            <p className={styles.subtitle}>
              Every element of our camps is engineered for breakthroughs — not just fun.
            </p>
          </div>
          <div className={styles.grid}>
            {features.map((f, i) => (
              <div key={i} className={styles.card} data-reveal data-reveal-delay={String(i + 1)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div className={styles.icon}>{f.icon}</div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    color: 'var(--clr-volt)',
                    background: 'rgba(226, 249, 82, 0.1)',
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    {f.tag}
                  </span>
                </div>
                <h3 className={`text-white ${styles.title}`}>{f.title}</h3>
                <p className={styles.desc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
