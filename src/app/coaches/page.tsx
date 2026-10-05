import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import coachesData from '@/lib/db/coaches.json';
import type { Coach } from '@/types';
import { 
  Award, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Sparkles, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Video
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meet with Our Coaches | Apex Pickleballers',
  description: 'Meet Coach Cristóvão "Cris" Abegão and the Apex Pickleballers coaching team. Mentored by CNPL Pros and master instructors in Canada. Observant, on-the-spot feedback.',
};

export default function CoachesPage() {
  const coaches = coachesData as Coach[];
  const leadCoach = coaches.find((c) => c.id === 'coach-cris') || coaches[0];
  const otherCoaches = coaches.filter((c) => c.id !== leadCoach.id);

  return (
    <div style={{ background: '#F8FAF9', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Hero */}
      <section style={{
        background: '#111813',
        color: '#FFFFFF',
        padding: '70px 0 60px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200, 255, 0, 0.12)', border: '1px solid var(--clr-volt)', borderRadius: '9999px', padding: '6px 14px', marginBottom: '18px' }}>
            <Sparkles size={15} style={{ color: 'var(--clr-volt)' }} />
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--clr-volt)' }}>
              World-Class Instruction
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#FFFFFF',
            margin: '0 0 16px',
            fontFamily: 'var(--font-heading)'
          }}>
            Meet with Our Coaches
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '820px',
            lineHeight: 1.6,
            margin: '0 0 24px'
          }}>
            At Apex Pickleballers, we stand for quality coaching, encouragement, and connection. Our coaches are exceptionally observant professionals who spot technical and tactical habits in real-time, giving you instantaneous, personalized adjustments on the spot.
          </p>
        </div>
      </section>

      {/* Lead Coach Spotlight: Cristóvão "Cris" Abegão */}
      <section className="container" style={{ maxWidth: '1060px', marginTop: '-30px', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          {/* Top Banner Tag */}
          <div style={{
            background: 'linear-gradient(90deg, #111813 0%, #1c2e22 100%)',
            padding: '12px 28px',
            color: 'var(--clr-volt)',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span>★ Lead Coach &amp; Master Instructor</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', textTransform: 'none', fontWeight: 600 }}>
              Toronto, Ontario · Canada
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 360px) 1fr',
            gap: '36px',
            padding: '36px',
          }}>
            {/* Left Column: Photo & Direct Info */}
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '1/1',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: '2px solid rgba(0,0,0,0.05)'
              }}>
                <Image
                  src={leadCoach.photo}
                  alt={leadCoach.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                  unoptimized
                />
              </div>

              {/* Direct Contact Card */}
              <div style={{
                marginTop: '20px',
                background: '#F9FAFB',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid #E5E7EB'
              }}>
                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7280', margin: '0 0 12px', fontWeight: 800 }}>
                  Direct Contact &amp; Questions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                  <a href={`tel:${leadCoach.phone || '+15875002973'}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#111813', textDecoration: 'none', fontWeight: 700 }}>
                    <Phone size={16} style={{ color: '#10B981' }} /> {leadCoach.phone || '+1 (587) 500-2973'}
                  </a>
                  <a href="mailto:hello@apexpickleballers.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4B5563', textDecoration: 'none' }}>
                    <Mail size={16} style={{ color: '#6B7280' }} /> hello@apexpickleballers.com
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4B5563' }}>
                    <MapPin size={16} style={{ color: '#6B7280' }} /> Toronto &amp; GTA, ON
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <Link href="/camps/toronto-beginner-clinic" className="btn btn--primary btn--full">
                    Reserve Spot With Cris →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Mentorship, Credentials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#111813', margin: '0 0 8px', fontFamily: 'var(--font-heading)' }}>
                  {leadCoach.name}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  <span className="badge badge--dark" style={{ background: '#111813', color: 'var(--clr-volt)' }}>
                    Doubles Pro (4.5–5.0)
                  </span>
                  <span className="badge badge--outline">
                    Mentored by Christina Chin
                  </span>
                  <span className="badge badge--outline">
                    Mentored by Alex Stojkov
                  </span>
                  <span className="badge badge--outline">
                    12+ Years in Canada
                  </span>
                </div>
              </div>

              {/* Bio Text */}
              <div style={{ color: '#374151', fontSize: '15px', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p>
                  My name is Cristóvão Abegão, but you can call me <strong>Cris</strong>! I was born in Portugal in 1994 and have been living in Canada for the past twelve years. I am a Professional Pickleball Coach at some of the biggest and most private gyms in Canada.
                </p>
                <p>
                  My mission is to elevate your pickleball game—something I take very seriously and passionately. I was mentored by some of the most respected professionals in Canada: <strong>Christina Chin</strong>, a CNPL Pro player and influencer (known as <em>&ldquo;Pickleball On Ice&rdquo;</em> on Instagram), and <strong>Alex Stojkov</strong>, one of the best pickleball coaches in the world and co-creator of Canadian Pickleball Instructor certification courses.
                </p>
                <p>
                  I pride myself on being exceptionally observant. I notice what players are doing in real time and give immediate feedback to adjust on the spot, improving both technical execution and strategic decision-making. I coach players of all ages (from 5 and up), and <strong>doubles pickleball is my specialty (doubles rating 4.5 to 5.0)</strong>. Providing personalized feedback to each player is why I have excelled in this profession for the past 4 to 5 years.
                </p>
              </div>

              {/* Core Specialties Grid */}
              <div style={{ background: '#F4F7F5', borderRadius: '16px', padding: '20px 24px', borderLeft: '4px solid var(--clr-volt)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111813', margin: '0 0 12px' }}>
                  Coach Cris’s Core Teaching Focus
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1F2937', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                    <span>The First 3 Shots &amp; Spin Control</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1F2937', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                    <span>Pace-Absorbing Defense &amp; Resets</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1F2937', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                    <span>Observant Real-Time Corrections</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1F2937', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                    <span>Take-Home Personalized Checklists</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extensible Coaching Network Section */}
      <section className="container" style={{ maxWidth: '1060px', marginTop: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#4B5563' }}>
            Apex Coaching Team
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111813', margin: '8px 0 10px', fontFamily: 'var(--font-heading)' }}>
            Expanding Roster Across Canada
          </h2>
          <p style={{ fontSize: '15px', color: '#4B5563', maxWidth: '640px', margin: '0 auto' }}>
            As Apex Pickleballers grows across Canadian cities, every coach is selected and trained around our core philosophy: small groups (8:1 ratio), active feedback, and encouraging community.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
          {otherCoaches.map((coach) => (
            <div
              key={coach.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--clr-volt)' }}>
                    <Image
                      src={coach.photo}
                      alt={coach.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111813', margin: '0 0 4px' }}>
                      {coach.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={13} /> {coach.states?.join(', ') || 'Ontario'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {coach.badges?.slice(0, 2).map((b, idx) => (
                    <span key={idx} style={{ background: '#F3F4F6', color: '#374151', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                      {b}
                    </span>
                  ))}
                </div>

                <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                  {coach.shortBio || coach.bio}
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>
                  ★ 5.0 Rated Instructor
                </span>
                <Link href="/camps" style={{ fontSize: '13px', fontWeight: 700, color: '#111813', textDecoration: 'none' }}>
                  View Clinics →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Join Coach Roster Callout */}
        <div style={{
          marginTop: '48px',
          background: '#111813',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Interested in Coaching with Apex Pickleballers?
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', maxWidth: '580px', margin: 0 }}>
            We are always looking for passionate, observant, and encouraging coaches to lead small-group clinics as we expand across Canada.
          </p>
          <a href="mailto:hello@apexpickleballers.com" className="btn btn--outline-white" style={{ marginTop: '8px' }}>
            Contact Us Regarding Coaching Opportunities →
          </a>
        </div>
      </section>
    </div>
  );
}
