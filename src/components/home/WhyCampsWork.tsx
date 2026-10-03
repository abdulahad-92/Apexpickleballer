'use client';

import React from 'react';
import styles from './WhyCampsWork.module.css';
import { Trophy, ClipboardList, Target, Zap } from 'lucide-react';
import AnimationPhysics from '@/components/sandbox/AnimationPhysics';

const features = [
  {
    icon: <Trophy className={styles.iconSvg} />,
    title: '8:1 Player-to-Coach Ratio',
    desc: 'Strictly 8 players across 2 dedicated courts (4 per court). Coach Cris works continuously across both courts for maximum attention.',
  },
  {
    icon: <ClipboardList className={styles.iconSvg} />,
    title: 'Observant Real-Time Coaching',
    desc: 'Coach Cris spots technical and tactical habits in real-time, providing on-the-spot adjustments so you fix mistakes immediately.',
  },
  {
    icon: <Target className={styles.iconSvg} />,
    title: 'The First 3 Shots & Resets',
    desc: 'We drill the foundational shots that dictate 80% of pickleball points: the serve, return, 3rd shot, and pace-absorbing resets.',
  },
  {
    icon: <Zap className={styles.iconSvg} />,
    title: 'Personalized Action Plan',
    desc: 'During the doubles mini-tournament, Coach Cris notes your specific habits and delivers a personal checklist for your next level.',
  },
];

interface WhyCampsWorkProps {
  transparentBg?: boolean;
  enablePhysics?: boolean;
}

export default function WhyCampsWork({ transparentBg = false, enablePhysics = true }: WhyCampsWorkProps) {
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
                <div className={styles.icon}>{f.icon}</div>
                <h3 className={`text-white ${styles.title}`}>{f.title}</h3>
                <p className={styles.desc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {enablePhysics && (
        <div className={styles.animationForeground} aria-hidden="true">
          <AnimationPhysics />
        </div>
      )}
    </section>
  );
}
