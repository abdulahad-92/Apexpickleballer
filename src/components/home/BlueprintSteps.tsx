import React from 'react';
import { CheckCircle2, Eye, Wrench, Trophy } from 'lucide-react';
import styles from './BlueprintSteps.module.css';

const steps = [
  {
    num: '01',
    phase: 'Hour 1: Assessment',
    title: 'Observe & Diagnose',
    icon: <Eye size={18} style={{ color: '#166534' }} />,
    desc: 'During warm-up and foundational dinking rallies, Coach Cris observes your mechanics in real time across both courts to identify the exact technical habits holding your game back.',
    highlights: [
      'Grip tension & paddle face control',
      'Split-step timing & transition footwork',
      'Non-volley zone ready positioning'
    ]
  },
  {
    num: '02',
    phase: 'Hour 2–3: Technical Reps',
    title: 'Drill & Rebuild',
    icon: <Wrench size={18} style={{ color: '#166534' }} />,
    desc: 'We break down the first 3 shots, attack volleys, and defensive resets with on-the-spot corrections so you develop clean mechanics and repeatable muscle memory.',
    highlights: [
      'Topspin and backspin generation',
      'Third shot drops vs. driving transitions',
      'Pace absorption off fast bangers'
    ]
  },
  {
    num: '03',
    phase: 'Hour 4: Live Application',
    title: 'Tournament & Action Plan',
    icon: <Trophy size={18} style={{ color: '#166534' }} />,
    desc: 'Apply your new skills in a guided doubles mini-tournament. Coach Cris halts points to show strategic options, and hands you your personalized written checklist to practice.',
    highlights: [
      'Competitive doubles scenarios',
      'Situational decision-making under pressure',
      'Individual written takeaway action plan'
    ]
  },
];

export default function BlueprintSteps() {
  return (
    <section className={`section section--white`}>
      <div className="container">
        <div className={styles.header} data-reveal>
          <span className="section-label section-label--dark">Coaching Methodology</span>
          <h2>How Coach Cris Elevates Your Game</h2>
          <p className={styles.subtitle}>
            Structured progression, observant real-time feedback, and guided match play across 2 dedicated indoor courts.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div key={step.num} className={styles.stepCard} data-reveal data-reveal-delay={String(i + 1)}>
              <div className={styles.cardTop}>
                <span className={styles.numBadge}>{step.num}</span>
                <span className={styles.phaseBadge}>{step.phase}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {step.icon}
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>

              <p className={styles.stepDesc}>{step.desc}</p>

              <div className={styles.highlightsList}>
                {step.highlights.map((h, idx) => (
                  <div key={idx} className={styles.highlightItem}>
                    <CheckCircle2 size={13} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
