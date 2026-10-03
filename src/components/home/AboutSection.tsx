'use client';

import React from 'react';
import styles from './AboutSection.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import siteContent from '@/content/site.content.json';
import { Phone, Award, Users, CheckCircle, ShieldCheck } from 'lucide-react';

const { brand } = siteContent;

export default function AboutSection() {
  return (
    <section id="about-us" className={styles.about}>
      <div className="container">
        {/* Brand Story Top Row */}
        <div className={styles.storyGrid}>
          <motion.div 
            className={styles.storyContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.label}>About Apex Pickleballers</div>
            <h2 className={styles.title}>Play With Purpose.<br />Improve Together.</h2>
            
            <p className={styles.leadParagraph}>
              {brand.story.p1}
            </p>
            <p className={styles.description}>
              {brand.story.p2}
            </p>
            <p className={styles.description}>
              {brand.story.p3}
            </p>
            <p className={styles.description}>
              {brand.story.p4}
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>8:1</div>
                <div className={styles.statLabel}>Player-to-Coach Ratio</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>2 Courts</div>
                <div className={styles.statLabel}>4 Players Per Court</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>4 Hours</div>
                <div className={styles.statLabel}>Structured Drills</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>100%</div>
                <div className={styles.statLabel}>Personal Takeaways</div>
              </div>
            </div>
          </motion.div>

          {/* Coach Cris Spotlight Card */}
          <motion.div 
            id="coach-cris"
            className={styles.coachCard}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.coachCardHeader}>
              <div className={styles.coachAvatarWrap}>
                <img 
                  src="/images/coach-cris.jpeg" 
                  alt="Coach Cristóvão 'Cris' Abegão" 
                  className={styles.coachAvatar}
                  loading="lazy"
                />
                <div className={styles.activeBadge}>Pro Coach</div>
              </div>
              <div className={styles.coachTitleBlock}>
                <span className={styles.coachGreeting}>Meet Your Lead Coach</span>
                <h3 className={styles.coachName}>Cristóvão &quot;Cris&quot; Abegão</h3>
                <span className={styles.coachRole}>Professional Pickleball Coach · Canada</span>
              </div>
            </div>

            <div className={styles.credentialsList}>
              <div className={styles.credential}>
                <Award className={styles.credIcon} size={18} />
                <span><strong>Doubles Specialist:</strong> Skill Level 4.5 – 5.0</span>
              </div>
              <div className={styles.credential}>
                <Users className={styles.credIcon} size={18} />
                <span><strong>Mentored by:</strong> Christina Chin (CNPL Pro / &ldquo;Pickleball On Ice&rdquo;) &amp; Alex Stojkov (Master Canadian Coach)</span>
              </div>
              <div className={styles.credential}>
                <CheckCircle className={styles.credIcon} size={18} />
                <span><strong>Coaching Experience:</strong> 4–5 years at top private Canadian facilities</span>
              </div>
              <div className={styles.credential}>
                <ShieldCheck className={styles.credIcon} size={18} />
                <span><strong>Superpower:</strong> Real-time observation &amp; on-the-spot technical adjustments</span>
              </div>
            </div>

            <p className={styles.coachBioExcerpt}>
              &ldquo;I pride myself on being very observant. I notice what players are doing in real time and give immediate feedback to adjust on the spot—improving both technical mechanics and strategic decision-making.&rdquo;
            </p>

            <div className={styles.coachCardFooter}>
              <div className={styles.phoneBox}>
                <Phone size={16} className={styles.phoneIcon} />
                <a href="tel:+15875002973" className={styles.phoneLink}>+1 (587) 500-2973</a>
              </div>
              <Link href="/camps/toronto-beginner-clinic" className="btn btn--primary btn--full">
                Reserve Your Spot with Coach Cris →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
