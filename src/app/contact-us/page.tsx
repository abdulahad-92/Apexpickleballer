import type { Metadata } from 'next';
import ContactClientPage from '@/components/contact/ContactClientPage';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Join a waitlist, become a coach, or get in touch with our team.',
};

export default function ContactPage() {
  return (
    <>
      <section className={`section section--dark ${styles.pageHero}`}>
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1 className="text-white">We&apos;re Here To Help</h1>
          <p className={styles.heroSubtitle}>Whether you want to join a waitlist, coach with us, partner with us, or just have a question — we respond within 24 hours.</p>
        </div>
      </section>
      <ContactClientPage />
    </>
  );
}
