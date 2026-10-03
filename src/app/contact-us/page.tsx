import type { Metadata } from 'next';
import ContactClientPage from '@/components/contact/ContactClientPage';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Join the Apex Pickleballers waitlist or get in touch with Coach Cris and the team about our Toronto pickleball clinics.',
};

export default function ContactPage() {
  return (
    <>
      <section className={`section section--dark ${styles.pageHero}`}>
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1 className="text-white">We&apos;re Here To Help</h1>
          <p className={styles.heroSubtitle}>Join the waitlist for upcoming Toronto clinics or just ask a question — we respond within 24 hours.</p>
        </div>
      </section>
      <ContactClientPage />
    </>
  );
}
