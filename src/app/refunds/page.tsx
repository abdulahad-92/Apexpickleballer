import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Apex Pickleballers',
  description: 'Understand the Apex Pickleballers cancellation and refund policy for our Toronto coached pickleball clinics.',
};

export default function RefundsPage() {
  return (
    <div style={{ background: 'var(--clr-bg-light)', minHeight: '80vh', padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link href="/" style={{ color: 'var(--clr-text-secondary)', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Home
          </Link>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--clr-border)',
          padding: '40px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'var(--clr-text-secondary)'
          }}>
            Official Policy
          </span>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 900,
            color: 'var(--clr-text-primary)',
            margin: '8px 0 24px',
            fontFamily: 'var(--font-heading)'
          }}>
            Refund &amp; Cancellation Policy
          </h1>

          <div style={{
            background: '#F4F7F5',
            borderLeft: '4px solid var(--clr-volt)',
            padding: '20px 24px',
            borderRadius: '0 12px 12px 0',
            marginBottom: '32px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111813', margin: '0 0 8px' }}>
              Quick Summary
            </h3>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#374151' }}>
              <strong>Up to 1 Day Prior:</strong> 100% full refund available with zero hassle.<br />
              <strong>On Clinic Day:</strong> Refunds are not accepted, but we will gladly adjust and transfer you to the next upcoming clinic session so your investment is never lost.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#4B5563', lineHeight: 1.7, fontSize: '15px' }}>
            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111813', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                1. Cancellations Up to 1 Day Before the Clinic
              </h2>
              <p>
                We understand that schedules can change. If you need to cancel your attendance, you are eligible for a <strong>100% full refund</strong> provided your request is made at least <strong>1 day (24 hours)</strong> prior to the scheduled start time of the clinic.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111813', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                2. Same-Day Cancellations &amp; Adjustments
              </h2>
              <p>
                Because our clinics are strictly capped at <strong>8 players maximum across 2 courts (an 8:1 coaching ratio)</strong>, last-minute cancellations directly impact court reservations and class structure. Therefore, <strong>refunds are not accepted on the day of the clinic</strong>.
              </p>
              <p>
                However, if you cannot make it on the day of the clinic, you will not lose your registration! We will gladly <strong>adjust and transfer you to the next upcoming clinic date</strong> so you can still participate and improve your game with Coach Cris.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111813', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                3. How to Request a Refund or Adjustment
              </h2>
              <p>
                To cancel or adjust your registration, simply reach out to Coach Cris and the Apex Pickleballers team:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                <li><strong>Phone / Text:</strong> <a href="tel:+15875002973" style={{ color: '#111813', fontWeight: 700 }}>+1 (587) 500-2973</a></li>
                <li><strong>Email:</strong> <a href="mailto:hello@apexpickleballers.com" style={{ color: '#111813', fontWeight: 700 }}>hello@apexpickleballers.com</a></li>
              </ul>
              <p style={{ marginTop: '8px' }}>
                Please include your full name and the date of the clinic session in your message. Refunds are processed back to your original payment method.
              </p>
            </section>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--clr-border)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/camps/toronto-beginner-clinic" className="btn btn--primary">
              Reserve Your Spot →
            </Link>
            <Link href="/contact-us" className="btn btn--outline">
              Contact Coach Cris
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
