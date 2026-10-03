'use client';
import { useState } from 'react';
import styles from './ContactClientPage.module.css';

type TabKey = 'waitlist' | 'coach' | 'partnership';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'waitlist', label: 'Waitlist Form' },
  { key: 'coach', label: 'Coach Form' },
  { key: 'partnership', label: 'Brand Partnership Form' },
];
const states = ['Arizona','Texas','California','Florida','Colorado','Nevada','Georgia','North Carolina','New York','Illinois','Washington','Oregon','Pennsylvania','Virginia','Tennessee','Minnesota','Utah','Missouri','Wisconsin','Massachusetts','New Jersey','Maryland','Connecticut'];
const levels = ['Beginner (2.0 - 2.5)', 'Intermediate (3.0 - 3.5)', 'Advanced (4.0+)'];

export default function ContactClientPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('waitlist');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  return (
    <section className={`section section--white`}>
      <div className={`container ${styles.layout}`}>
        
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.pill}>Get In Touch</div>
          <h1 className={styles.heading}>REACH US AT</h1>
          <p className={styles.description}>
            At Obsessed Pickleballers, real people answer real questions because your journey matters to us. Whether you're brand new to the game or ready to take your skills to the next level, our team is happy to guide you every step of the way. Reach out below and let's start a conversation that moves your game and your confidence forward.
          </p>

          <div className={styles.contactCard}>
            <div className={styles.iconBox}>📞</div>
            <div className={styles.cardText}>
              <span className={styles.cardLabel}>Phone</span>
              <span className={styles.cardValue}>(430) 297 1026</span>
            </div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconBox}>✉️</div>
            <div className={styles.cardText}>
              <span className={styles.cardLabel}>Email</span>
              <span className={styles.cardValue}>help@obsessedpickleballers.com</span>
            </div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconBox}>📸</div>
            <div className={styles.cardText}>
              <span className={styles.cardLabel}>Instagram</span>
              <span className={styles.cardValue}>@obsessedpickleballers</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          <div className={styles.radioTabs}>
            {tabs.map(tab => (
              <button 
                key={tab.key}
                type="button"
                className={`${styles.radioTab} ${activeTab === tab.key ? styles.active : ''}`}
                onClick={() => { setActiveTab(tab.key); setSuccess(false); }}
              >
                <div className={styles.radioCircle} />
                {tab.label}
              </button>
            ))}
          </div>

          {success ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✅</div>
              <h3>Message Received!</h3>
              <p>We&apos;ll be in touch within 24 hours.</p>
              <button className="btn btn--primary" onClick={() => setSuccess(false)}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formGrid}>
              
              <div>
                <label className={styles.formLabel}>Full Name <span className={styles.required}>*</span></label>
                <input className={styles.inputBase} type="text" placeholder="Enter your full name" required />
              </div>

              <div>
                <label className={styles.formLabel}>Email Address <span className={styles.required}>*</span></label>
                <input className={styles.inputBase} type="email" placeholder="Enter your email address" required />
              </div>

              <div>
                <label className={styles.formLabel}>Phone Number <span className={styles.required}>*</span></label>
                <input className={styles.inputBase} type="tel" placeholder="Enter your phone number" required />
              </div>

              <div>
                <label className={styles.formLabel}>City <span className={styles.required}>*</span></label>
                <input className={styles.inputBase} type="text" placeholder="Enter your City" required />
              </div>

              <div>
                <label className={styles.formLabel}>State <span className={styles.required}>*</span></label>
                <input className={styles.inputBase} type="text" placeholder="Enter your State" required />
              </div>

              <div>
                <label className={styles.formLabel}>Levels <span className={styles.required}>*</span></label>
                <select className={styles.inputBase} required>
                  <option value="">Select Level</option>
                  {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.formLabel}>Any Message</label>
                <textarea className={styles.inputBase} rows={5} placeholder="Write your message here" />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'SUBMITTING...' : 'SUBMIT'}
              </button>

            </form>
          )}
        </div>
        
      </div>
    </section>
  );
}
