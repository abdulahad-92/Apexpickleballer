'use client';
import { useState } from 'react';
import styles from './ScheduleAccordion.module.css';

const blocks = [
  {
    step: '1',
    duration: '30 mins',
    title: 'Meet and Greet & Full Warm Up',
    breakNote: 'Quick 1-min water break at the end',
    desc: 'Meet and greet Cris, the coach, and the rest of the community. Pickleball is a social sport at its heart. We will also be going through a complete warm up that consists of: Dinking, Dropping, Volleying, Hitting Long balls, Serving and Returning.',
  },
  {
    step: '2',
    duration: '1 hour',
    title: 'The First 3 Shots: Serve, Return & 3rd Shot',
    breakNote: '1-min water breaks between drills',
    desc: 'The most important shots in Pickleball: the Serve, the Return, and the 3rd shot. We will be going through the technical and strategic aspects of these 3 shots. You will learn how to hit backspin and topspin off of your backhand and forehand—4 different new weapons going into your Pickleball arsenal.',
  },
  {
    step: '3',
    duration: '45 mins',
    title: 'Punch, Roll and Smash Volleys',
    breakNote: '1-min water breaks between drills',
    desc: 'Working on how to attack and keep your opponent back at the baseline with these three essential tools. You will learn when to hit each of the three shots and for what specific tactical purpose.',
  },
  {
    step: '4',
    duration: '45 mins',
    title: 'Resets — Slow Down The Game Like A Pro',
    breakNote: '1-min water break between drills',
    desc: 'One of the most underrated and useful skills in Pickleball. Learn how to slow down fast-paced balls coming at you and your partner, off the bounce or off the volley when at the baseline or transition zone. Master the soft hands required to neutralize heavy hitters.',
  },
  {
    step: '5',
    duration: '30 mins',
    title: 'Court Positioning and Footwork',
    breakNote: '1-min water break between drills',
    desc: 'We will be going through who covers what part of the court and why, while working on where to position yourself while dinking. Learn how to use your feet to your Team’s distinct advantage and eliminate confusion with your partner.',
  },
  {
    step: '6',
    duration: '30 mins',
    title: 'Doubles Tournament & Personal Coaching Notes',
    breakNote: '1-min water break between matches',
    desc: 'Hone all the skills learnt and experience the new strategic mindset while playing a doubles tournament with different players. Coach Cris will evaluate each individual’s performance while taking notes. You will receive a personalized list of things to work on, so you know exactly what you need to get to the next level.',
  },
];

export default function ScheduleAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="curriculum" className={`section section--white`}>
      <div className="container">
        <div className={styles.header} data-reveal>
          <span className="section-label section-label--dark">Curriculum &amp; Schedule</span>
          <h2>4-Hour Coached Clinic Breakdown</h2>
          <p className={styles.subtitle}>
            Developed by Coach Cris: 4 hours of structured drills, scheduled water breaks, and individual coaching notes.
          </p>
        </div>
        <div className={styles.accordion} data-reveal>
          {blocks.map((block, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`accordion-item ${isOpen ? 'is-open' : ''} ${styles.item}`}>
                <button
                  className={styles.trigger}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  suppressHydrationWarning
                >
                  <span className={styles.timeBadge}>{block.duration}</span>
                  <span className={styles.blockTitle}>
                    {block.step}. {block.title}
                  </span>
                  <span className={`accordion-icon ${styles.icon}`}>{isOpen ? '−' : '+'}</span>
                </button>
                <div className={`accordion-body ${styles.body}`}>
                  <p className={styles.bodyText}>{block.desc}</p>
                  <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 600, color: 'var(--clr-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>💧</span>
                    <span>{block.breakNote}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
