'use client';
import { useState, useEffect, useRef } from 'react';
import type { Camp, Coach } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CampDetailClient.module.css';
import siteContent from '@/content/site.content.json';
import { ShieldCheck, Users, Clock, MapPin, CheckCircle2, Award, Phone, Calendar, Trophy, Sparkles } from 'lucide-react';

const statusConfig = {
  available:  { label: '✓ Spots Available',   cls: 'badge--available' },
  limited:    { label: '⚠ Limited (8 Max)',   cls: 'badge--limited' },
  'sold-out': { label: '✗ Clinic Full (8/8)', cls: 'badge--sold-out' },
};

const timelineBlocks = [
  {
    time: 'Block 1 · 30 mins',
    title: 'Meet and Greet & Full Warm Up',
    desc: 'Meet and greet Cris, the coach, and the rest of the community. Pickleball is a social sport at its heart. We will go through a complete warm-up: Dinking, Dropping, Volleying, Hitting Long balls, Serving and Returning. (Quick 1-min water break at the end).',
  },
  {
    time: 'Block 2 · 1 hour',
    title: 'The First 3 Shots: Serve, Return & 3rd Shot',
    desc: 'The most important shots in Pickleball: the Serve, the Return, and the 3rd shot. Technical and strategic aspects. Learn how to hit backspin and topspin off your backhand and forehand—4 new weapons in your pickleball arsenal. (1-min water breaks between drills).',
  },
  {
    time: 'Block 3 · 45 mins',
    title: 'Punch, Roll and Smash Volleys',
    desc: 'Work on how to attack and keep your opponent back at the baseline with these three essential tools. Learn exactly when to hit each of the three shots and for what tactical purpose. (1-min water breaks between drills).',
  },
  {
    time: 'Block 4 · 45 mins',
    title: 'Resets — Slow Down The Game Like A Pro',
    desc: 'One of the most underrated and useful skills in Pickleball. Learn how to slow down fast-paced balls coming at you and your partner, off the bounce or off the volley when at the baseline or transition zone. (1-min water break between drills).',
  },
  {
    time: 'Block 5 · 30 mins',
    title: 'Court Positioning and Footwork',
    desc: 'Who covers what part of the court and why, while working on where to position yourself while dinking. Learn how to use your feet to your Team’s distinct advantage. (1-min water break between drills).',
  },
  {
    time: 'Block 6 · 30 mins',
    title: 'Doubles Tournament & Personalized Coaching Notes',
    desc: 'Hone all the skills learnt and experience the new strategic mindset while playing a doubles tournament with different players. Coach Cris will evaluate each individual’s performance while taking notes. You will receive a personalized list of things to work on. (1-min water break between matches).',
  },
];

export default function CampDetailClient({ camp, coach }: { camp: Camp; coach: Coach | null }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTimeline, setOpenTimeline] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Registration form state with experience question
  const [experience, setExperience] = useState('know-basics');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [ctaVisible, setCtaVisible] = useState(true); // immediate access for clean UX
  const [tickets, setTickets] = useState(1);
  const vslRef = useRef<HTMLIFrameElement>(null);
  
  const status = statusConfig[camp.status] || statusConfig.available;
  const isSoldOut = camp.status === 'sold-out' || camp.seatsLeft <= 0;
  const isLimited = camp.status === 'limited';

  const { campDetail } = siteContent;
  const priceDisplay = `${camp.price} CAD`;

  useEffect(() => {
    const handleScroll = () => {
      const bookingBox = document.getElementById('booking-box');
      const footer = document.querySelector('footer');
      if (!bookingBox) return;
      const boxRect = bookingBox.getBoundingClientRect();
      const footerRect = footer?.getBoundingClientRect();
      const boxGone = boxRect.bottom < 0;
      const footerNear = footerRect ? footerRect.top < window.innerHeight : false;
      setStickyBarVisible(boxGone && !footerNear);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const totalPrice = camp.price * tickets;

  return (
    <>
      {/* Urgency Bar */}
      <div className={styles.urgencyBar}>
        {isSoldOut ? (
          '🔒 This Toronto clinic has reached full capacity (8/8 spots filled).'
        ) : (
          `⚡ Only ${camp.seatsLeft} of 8 spots remaining · 2 Courts, 1 Coach (8:1 Coaching Ratio) · Toronto, Canada`
        )}
      </div>

      {/* Breadcrumb (no Home link: the header already provides it) */}
      <nav className={`container ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/camps">Clinics</Link> <span aria-hidden="true">/</span>
        <span className={styles.crumbCurrent} aria-current="page">{camp.city}, {camp.stateCode}</span>
      </nav>

      {/* Page Hero with Coached Clinic Highlights */}
      <section className={`section--dark ${styles.pageHero}`}>
        <div className="container">
          <div className={styles.heroTop}>
            <span className={`badge ${status.cls}`}>{status.label}</span>
            <span className="badge badge--level">8 Players Max (8:1 Ratio)</span>
            <span className="badge" style={{ background: 'rgba(200,255,0,0.15)', color: 'var(--clr-volt)', border: '1px solid var(--clr-volt)' }}>
              ${priceDisplay} Confirmed
            </span>
          </div>
          
          <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', margin: '14px 0 10px' }}>
            {camp.title}
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', maxWidth: '820px', lineHeight: 1.5, marginBottom: '24px' }}>
            A focused 4-hour coached pickleball clinic in Toronto: eight players, two courts, and one coach. Structured practice, live corrections on the spot, and an enjoyable community atmosphere.
          </p>

          {/* Quick Snapshot Specs Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '28px'
          }}>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--clr-volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} /> Date &amp; Time
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>{camp.dateDisplay}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{camp.time}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--clr-volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} /> Toronto Venue
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>{camp.venueName}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Free on-site parking</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--clr-volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Users size={13} /> Class Format
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>8 Players · 2 Courts</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>4 players per court · 1 coach</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--clr-volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Trophy size={13} /> Skill Level
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>Beginner &amp; Consistency</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>No official rating required</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--clr-volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={13} /> CAD Pricing
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--clr-volt)', marginTop: '2px' }}>${priceDisplay}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>All 4 hours + notes included</div>
            </div>
          </div>
          
          {/* Prominent Video with Captions */}
          <div className={styles.vslContainer}>
            <div className={styles.videoWrapper}>
              <iframe
                ref={vslRef}
                src="https://www.youtube.com/embed/kJQP7kiw5Fk?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1"
                title="Coach Cris Clinic Demonstration"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>
              🎥 Watch Coach Cris demonstrate the first 3 shots, live on-court corrections, and resets. (Captions available)
            </p>
            <div className={`${styles.vslCtaWrap} ${styles.vslCtaVisible}`} style={{ marginTop: '16px' }}>
              <button
                className={`btn btn--primary btn--lg ${isSoldOut ? 'btn--disabled' : ''}`}
                onClick={() => !isSoldOut && setModalOpen(true)}
                disabled={isSoldOut}
              >
                {isSoldOut ? 'Clinic Full (8/8 Spots Filled)' : `Reserve Your Spot For $${priceDisplay} →`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 'Is this clinic for me?' & Key Details Strip */}
      <section className={`section--white ${styles.specsSection}`}>
        <div className="container">
          <div style={{
            background: '#F4F7F5',
            border: '2px solid rgba(200, 255, 0, 0.4)',
            borderRadius: '16px',
            padding: '28px 32px',
            marginBottom: '36px'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#111813' }}>
              Self-Assessment
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#111813', margin: '6px 0 10px' }}>
              Is This Clinic For Me?
            </h3>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#1F2937', marginBottom: '14px', borderLeft: '3px solid var(--clr-volt)', paddingLeft: '12px' }}>
              &ldquo;Ideal for players who know the basics and want to build consistency and confidence. No official rating required.&rdquo;
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', fontSize: '14px', color: '#374151' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                <span>You know the basic rules of pickleball and can sustain a short rally.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                <span>You want to eliminate unforced errors and feel confident at the kitchen line.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                <span>You are an adult player (marketing focus 40+) looking for an encouraging, social setting.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                <span>You want an 8:1 coaching ratio where you receive personalized notes from a pro.</span>
              </div>
            </div>
          </div>

          {/* 6-Cell Specs Grid */}
          <div className={styles.specsGrid}>
            <div className={styles.specCell}>
              <div className={styles.specIcon}><MapPin size={24} /></div>
              <h4 className={styles.specLabel}>Toronto Venue</h4>
              <p className={styles.specVal}>{camp.venueName}</p>
              <p className={styles.specSub}>Greater Toronto Area, ON</p>
              <p className={styles.specSub}>Free Dedicated On-Site Parking</p>
            </div>
            <div className={styles.specCell}>
              <div className={styles.specIcon}><Calendar size={24} /></div>
              <h4 className={styles.specLabel}>Date &amp; Schedule</h4>
              <p className={styles.specVal}>{camp.dateDisplay}</p>
              <p className={styles.specSub}>{camp.time}</p>
              <p className={styles.specSub}>1-min scheduled water breaks between drills</p>
            </div>
            <div className={styles.specCell}>
              <div className={styles.specIcon}><Users size={24} /></div>
              <h4 className={styles.specLabel}>Format &amp; Ratio</h4>
              <p className={styles.specVal}>8 Players · 2 Courts</p>
              <p className={styles.specSub}>4 players per court</p>
              <p className={styles.specSub}>Coach Cris works across both courts</p>
            </div>
            <div className={styles.specCell}>
              <div className={styles.specIcon}><Trophy size={24} /></div>
              <h4 className={styles.specLabel}>Equipment &amp; Attire</h4>
              <p className={styles.specVal}>Equipment Provided</p>
              <p className={styles.specSub}>Bring your own paddle if you prefer</p>
              <p className={styles.specSub}>Court/athletic shoes required · Balls provided</p>
            </div>
            <div className={styles.specCell}>
              <div className={styles.specIcon}><ShieldCheck size={24} /></div>
              <h4 className={styles.specLabel}>Cancellation Policy</h4>
              <p className={styles.specVal}>100% Refund Prior to 24h</p>
              <p className={styles.specSub}>Zero questions asked up to 24h before</p>
              <p className={styles.specSub}>Clinic day: transfer to next session</p>
            </div>
            <div className={`${styles.specCell} ${styles.specCellBonus}`}>
              <div className={styles.specIcon}><Sparkles size={24} /></div>
              <h4 className={styles.specLabel}>Included Takeaways</h4>
              <ul className={styles.bonusList}>
                {campDetail.bonuses.map((b) => (
                  <li key={b.title}>✓ {b.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout: Content + Sticky Sidebar */}
      <section className={`section section--light`}>
        <div className={`container ${styles.detailLayout}`}>
          {/* Left Column */}
          <div className={styles.mainContent}>
            {/* Timeline Accordion */}
            <div className={styles.contentBlock}>
              <h2>4-Hour Coached Clinic Curriculum</h2>
              <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '16px' }}>
                Every segment has been structured by Coach Cris to build directly upon the previous drill, complete with 1-minute water breaks.
              </p>
              <div className={styles.timeline}>
                {timelineBlocks.map((block, i) => (
                  <div key={i} className={`accordion-item ${openTimeline === i ? 'is-open' : ''} ${styles.timelineItem}`}>
                    <button className={styles.timelineTrigger} onClick={() => setOpenTimeline(openTimeline === i ? null : i)}>
                      <span className={styles.timeBadge}>{block.time}</span>
                      <span className={styles.timelineTitle}>{block.title}</span>
                      <span className={`accordion-icon ${styles.timelineIcon}`}>{openTimeline === i ? '−' : '+'}</span>
                    </button>
                    <div className={`accordion-body ${styles.timelineBody}`}>
                      <p className={styles.timelineDesc}>{block.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coach Profile */}
            <div className={styles.contentBlock}>
              <h2>Your Coach — Cristóvão &quot;Cris&quot; Abegão</h2>
              <div className={styles.coachCard}>
                <div className={styles.coachPhotoWrap}>
                  <Image 
                    src={coach?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop'} 
                    alt="Coach Cris Abegão" 
                    width={140} 
                    height={140} 
                    className={styles.coachPhoto} 
                    unoptimized 
                  />
                </div>
                <div className={styles.coachInfo}>
                  <h3>Cristóvão &quot;Cris&quot; Abegão</h3>
                  <div className={styles.coachBadges}>
                    <span className="badge badge--outline">Doubles Pro (4.5–5.0)</span>
                    <span className="badge badge--outline">Mentored by Christina Chin</span>
                    <span className="badge badge--outline">Mentored by Alex Stojkov</span>
                  </div>
                  <p className={styles.coachBio}>
                    Born in Portugal and coaching in Canada for over 12 years, Cris is a Professional Pickleball Coach at some of the biggest and most private gyms in Canada. Mentored by CNPL Pro Christina Chin (&ldquo;Pickleball On Ice&rdquo;) and Alex Stojkov (co-creator of Canadian certification courses), Cris is exceptionally observant—noticing what players do in real time to provide instantaneous, actionable adjustments on the spot.
                  </p>
                  <div style={{ marginTop: '12px', fontSize: '13px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={15} />
                    <span>Direct questions? Call Coach Cris at <strong>+1 (587) 500-2973</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bonuses */}
            <div className={styles.contentBlock}>
              <h2>Everything Included With Your Registration</h2>
              <div className={styles.bonusGrid}>
                {campDetail.bonuses.map((bonus) => (
                  <div key={bonus.title} className={styles.bonusCard}>
                    <div className={styles.bonusTag}>{bonus.tag}</div>
                    <h3 className={styles.bonusTitle}>{bonus.title}</h3>
                    <p className={styles.bonusValue}>{bonus.value}</p>
                    <p className={styles.bonusDesc}>{bonus.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className={`${styles.contentBlock} ${styles.guaranteeBlock}`}>
              <div className={styles.guaranteeSeal}>
                <ShieldCheck size={36} style={{ color: 'var(--clr-volt)' }} />
              </div>
              <div>
                <h3>100% Satisfaction Guarantee</h3>
                <p>{campDetail.guaranteeText}</p>
              </div>
            </div>

            {/* FAQ */}
            <div className={styles.contentBlock}>
              <h2>Frequently Asked Questions</h2>
              <div className={styles.faq}>
                {campDetail.genericFaqs.map((item, i) => (
                  <div key={i} className={`accordion-item ${openFaq === i ? 'is-open' : ''} ${styles.faqItem}`}>
                    <button className={styles.faqTrigger} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span className={styles.faqQ}>{item.q}</span>
                      <span className={`accordion-icon ${styles.faqIcon}`}>{openFaq === i ? '−' : '+'}</span>
                    </button>
                    <div className={`accordion-body ${styles.faqBody}`}>
                      <p className={styles.faqA}>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className={styles.sidebar}>
            <div id="booking-box" className={styles.bookingBox}>
              <div className={styles.priceDisplay}>
                <span className={styles.price}>${camp.price}</span>
                <span className={styles.pricePer}>CAD / person</span>
              </div>
              <ul className={styles.includes}>
                <li>✓ 4-Hour Coached Clinic</li>
                <li>✓ 8 Players Max (8:1 Coaching Ratio)</li>
                <li>✓ 2 Dedicated Courts (4 per court)</li>
                <li>✓ Personalized Written Notes from Coach Cris</li>
                <li>✓ Free On-Site Parking &amp; Scheduled Breaks</li>
              </ul>
              
              {!isSoldOut && (
                <button
                  className={`btn btn--primary btn--full btn--lg`}
                  onClick={() => setModalOpen(true)}
                >
                  Reserve Your Spot (8 Max) →
                </button>
              )}
              {isSoldOut && (
                <button className={`btn btn--primary btn--full btn--lg btn--disabled`} disabled>
                  Clinic Full (8/8 Filled)
                </button>
              )}
              
              <p className={styles.guarantee}>
                <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px', color: 'var(--clr-volt)' }} />
                {campDetail.guaranteeText}
              </p>
              {!isSoldOut && (
                <div className={`badge ${status.cls} ${styles.seatsBadge}`}>
                  {camp.seatsLeft <= 3 ? `⚠ Only ${camp.seatsLeft} Spots Left!` : `${camp.seatsLeft} of 8 Spots Available`}
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className={`${styles.stickyBar} ${stickyBarVisible ? styles.stickyBarVisible : ''}`}>
        <div className={`container ${styles.stickyBarInner}`}>
          <div className={styles.stickyBarLeft}>
            <p className={styles.stickyDate}>{camp.dateDisplay} · {camp.time}</p>
            <p className={styles.stickyLocation}>Toronto, ON · 8:1 Ratio · ${camp.price} CAD</p>
          </div>
          <button
            className={`btn btn--primary btn--lg ${isSoldOut ? 'btn--disabled' : ''}`}
            onClick={() => !isSoldOut && setModalOpen(true)}
            disabled={isSoldOut}
          >
            {isSoldOut ? 'Clinic Full' : `Reserve Your Spot for $${camp.price} CAD →`}
          </button>
        </div>
      </div>

      {/* Registration Modal with Experience Inquiries */}
      <div className={`modal-overlay ${modalOpen ? 'is-active' : ''}`} onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
        <div className="modal-card modal-card--lg">
          <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close modal">✕</button>
          
          <div className={styles.modalScroll}>
          {submitted ? (
            <div className={styles.modalSuccess}>
              <div className={styles.modalSuccessIcon}>🎉</div>
              <h2>Your Spot Is Reserved!</h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.5, margin: '12px 0 20px' }}>
                Thank you, <strong>{fullName || 'Player'}</strong>! We have saved your spot for Coach Cris’s Toronto Coached Clinic on <strong>{camp.dateDisplay}</strong>. A confirmation email with facility directions and arrival notes has been sent to <strong>{email}</strong>.
              </p>
              <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px', marginBottom: '20px', textAlign: 'left', fontSize: '13px' }}>
                <div><strong>Coach:</strong> Cristóvão &quot;Cris&quot; Abegão</div>
                <div><strong>Direct Contact:</strong> +1 (587) 500-2973</div>
                <div><strong>Format:</strong> 8 Players · 2 Courts · 4 Hours</div>
              </div>
              <button className="btn btn--primary" onClick={() => { setModalOpen(false); setSubmitted(false); }}>Done</button>
            </div>
          ) : (
            <div className={styles.checkoutLayout}>
              {/* Left: Summary */}
              <div className={styles.checkoutSummary}>
                <h3 className={styles.checkoutHeading}>Clinic Registration</h3>
                <div className={styles.checkoutCampInfo}>
                  <strong style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>{camp.title}</strong>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={13} /> {camp.dateDisplay}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={13} /> {camp.time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={13} /> {camp.venueName} (Toronto, ON)</span>
                  <span style={{ color: 'var(--clr-volt)', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={13} /> 8:1 Ratio (4 Players per Court · 1 Coach)
                  </span>
                </div>
                
                <div className={styles.ticketSelector}>
                  <span>Spots</span>
                  <div className={styles.qtyControl}>
                    <button type="button" onClick={() => setTickets(Math.max(1, tickets - 1))}>-</button>
                    <span>{tickets}</span>
                    <button type="button" onClick={() => setTickets(Math.min(camp.seatsLeft, tickets + 1))}>+</button>
                  </div>
                </div>

                <div className={styles.checkoutTotals}>
                  <div className={styles.checkoutRow}>
                    <span>Subtotal</span>
                    <span>${totalPrice} CAD</span>
                  </div>
                  <div className={styles.checkoutRow}>
                    <span>Coaching Notes &amp; Bonuses</span>
                    <span style={{ color: '#10B981', fontWeight: 700 }}>FREE</span>
                  </div>
                  <div className={`${styles.checkoutRow} ${styles.checkoutRowTotal}`}>
                    <span>Total (CAD)</span>
                    <span>${totalPrice} CAD</span>
                  </div>
                </div>
              </div>

              {/* Right: Payment & Experience Form */}
              <div className={styles.checkoutFormWrapper}>
                <h3 className={styles.checkoutHeading}>Player Information</h3>
                <form className={styles.checkoutForm} onSubmit={handleRegister}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      className="form-input" 
                      type="text" 
                      placeholder="e.g. Maria Santos" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      className="form-input" 
                      type="email" 
                      placeholder="e.g. maria@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number (for SMS clinic updates)</label>
                    <input 
                      className="form-input" 
                      type="tel" 
                      placeholder="e.g. +1 (416) 555-0123" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  {/* Playing Experience Selector */}
                  <div className="form-group">
                    <label>What is your current playing experience?</label>
                    <select 
                      className="form-input" 
                      value={experience} 
                      onChange={(e) => setExperience(e.target.value)}
                      style={{ color: '#111813', fontWeight: 500 }}
                    >
                      <option value="know-basics">I know the basic rules &amp; want to build consistency</option>
                      <option value="casual-rec">Casual recreational play (played 5–15 times)</option>
                      <option value="weekly-player">Consistent weekly player (under 1 year)</option>
                      <option value="intermediate">Level 3.0+ player looking to sharpen competitive weapons</option>
                      <option value="racket-sports">Strong background in tennis/badminton/squash</option>
                    </select>
                    <small style={{ color: '#6B7280', display: 'block', marginTop: '4px', fontSize: '11px' }}>
                      Coach Cris uses this to calibrate drill groups and prepare your personal notes.
                    </small>
                  </div>
                  
                  <div className={styles.cardBox}>
                    <div className="form-group">
                      <label>Payment Information (Demo Checkout)</label>
                      <input className="form-input" type="text" placeholder="Card Number (4242 •••• •••• 4242)" required defaultValue="4242 4242 4242 4242" />
                    </div>
                    <div className={styles.cardSplit}>
                      <input className="form-input" type="text" placeholder="MM/YY" required defaultValue="12/28" />
                      <input className="form-input" type="text" placeholder="CVC" required defaultValue="789" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn btn--primary btn--full btn--lg ${submitting ? 'btn--disabled' : ''}`} 
                    disabled={submitting}
                  >
                    {submitting ? 'Reserving Your Spot...' : `Reserve Spot · $${totalPrice} CAD`}
                  </button>
                  
                  <div className={styles.secureBadge}>
                    <span>🔒</span> 256-bit Secure Checkout · 100% Satisfaction Guarantee
                  </div>
                </form>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
