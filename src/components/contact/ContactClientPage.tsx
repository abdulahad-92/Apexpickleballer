'use client';
import { useState } from 'react';
import styles from './ContactClientPage.module.css';
import siteContent from '@/content/site.content.json';

const { brand, contact } = siteContent;

const levels = ['Beginner (2.0 - 2.5)', 'Intermediate (3.0 - 3.5)', 'Advanced (4.0+)'];

export default function ContactClientPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: 'waitlist', ...data }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSuccess(true);
      form.reset();
    } catch {
      setError(`Something went wrong. Please try again, or contact us directly at ${brand.email}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section section--white`}>
      <div className={`container ${styles.layout}`}>

        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.pill}>Get In Touch</div>
          <h2 className={styles.heading}>REACH US AT</h2>
          <p className={styles.description}>
            At {brand.fullName}, real people answer real questions because your journey matters to us. Whether you&apos;re brand new to the game or ready to take your skills to the next level, Coach Cris and the team are happy to guide you every step of the way. Join the waitlist below, or reach us directly, and let&apos;s start a conversation that moves your game and your confidence forward.
          </p>

          {contact.methods.map((method) => {
            const isLink = method.href && method.href !== '#';
            const inner = (
              <>
                <div className={styles.iconBox}>{method.icon}</div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>{method.label}</span>
                  <span className={styles.cardValue}>{method.value}</span>
                </div>
              </>
            );
            return isLink ? (
              <a key={method.label} href={method.href} className={`${styles.contactCard} ${styles.contactCardLink}`}>
                {inner}
              </a>
            ) : (
              <div key={method.label} className={styles.contactCard}>{inner}</div>
            );
          })}
        </div>

        {/* Right Column: Waitlist form (the only form) */}
        <div className={styles.rightCol}>
          <div>
            <h2 className={styles.formHeading}>Join the Waitlist</h2>
            <p className={styles.formSub}>
              Be first to hear when new Toronto clinic dates and coaching spots open up.
            </p>
          </div>

          {success ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✅</div>
              <h3>You&apos;re on the waitlist!</h3>
              <p>We&apos;ll be in touch within 24 hours.</p>
              <button className="btn btn--primary" onClick={() => setSuccess(false)}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formGrid}>

              <div>
                <label htmlFor="wl-name" className={styles.formLabel}>Full Name <span className={styles.required}>*</span></label>
                <input id="wl-name" name="name" className={styles.inputBase} type="text" placeholder="Enter your full name" required />
              </div>

              <div>
                <label htmlFor="wl-email" className={styles.formLabel}>Email Address <span className={styles.required}>*</span></label>
                <input id="wl-email" name="email" className={styles.inputBase} type="email" placeholder="Enter your email address" required />
              </div>

              <div>
                <label htmlFor="wl-phone" className={styles.formLabel}>Phone Number <span className={styles.required}>*</span></label>
                <input id="wl-phone" name="phone" className={styles.inputBase} type="tel" placeholder="Enter your phone number" required />
              </div>

              <div>
                <label htmlFor="wl-city" className={styles.formLabel}>City <span className={styles.required}>*</span></label>
                <input id="wl-city" name="city" className={styles.inputBase} type="text" placeholder="Enter your city" required />
              </div>

              <div>
                <label htmlFor="wl-province" className={styles.formLabel}>Province <span className={styles.required}>*</span></label>
                <input id="wl-province" name="province" className={styles.inputBase} type="text" placeholder="Enter your province" required />
              </div>

              <div>
                <label htmlFor="wl-level" className={styles.formLabel}>Level <span className={styles.required}>*</span></label>
                <select id="wl-level" name="level" className={styles.inputBase} required defaultValue="">
                  <option value="" disabled>Select Level</option>
                  {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className={styles.fullWidth}>
                <label htmlFor="wl-message" className={styles.formLabel}>Any Message</label>
                <textarea id="wl-message" name="message" className={styles.inputBase} rows={5} placeholder="Write your message here" />
              </div>

              {error && <p className={`${styles.fullWidth} ${styles.formError}`} role="alert">{error}</p>}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'SUBMITTING...' : 'JOIN THE WAITLIST'}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
