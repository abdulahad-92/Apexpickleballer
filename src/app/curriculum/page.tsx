import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Clock, 
  Users, 
  ShieldCheck, 
  Trophy, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  ArrowRight,
  Zap,
  Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: '4-Hour Coached Clinic Curriculum | Apex Pickleballers Toronto',
  description: 'Explore the comprehensive 4-hour coached clinic curriculum developed by Coach Cris. 8 players, 2 courts, 1 coach. The First 3 Shots, Attack Volleys, Pro Resets, and personalized notes.',
};

const curriculumBlocks = [
  {
    step: '01',
    duration: '30 mins',
    title: 'Meet and Greet & Full Warm-Up',
    breakNote: 'Scheduled 1-min water break at completion',
    focus: 'Dynamic movement, soft hands, and stroke recalibration',
    description: 'Meet Coach Cris and the rest of the community. Pickleball is a social sport at its heart, and we set a warm, welcoming, and encouraging tone from minute one. We work through a complete, progressive warm-up covering dinking touch, kitchen drops, punch volleys, depth hitting from the baseline, and active serving and returning.',
    takeaways: [
      'Warm up small muscles and shoulder girdle safely',
      'Dial in sweet-spot contact and paddle grip pressure',
      'Establish friendly court chemistry with fellow players'
    ]
  },
  {
    step: '02',
    duration: '60 mins',
    title: 'The First 3 Shots: Serve, Return & 3rd Shot',
    breakNote: '1-min hydration breaks between drilling sequences',
    focus: 'Technical consistency & 4 new spin weapons',
    description: 'The serve, return, and 3rd shot dictate over 80% of all pickleball points. Coach Cris breaks down the biomechanics and strategic targets for each shot. You will learn how to generate controlled backspin and topspin off both your backhand and forehand—unlocking 4 distinct new weapons in your pickleball arsenal.',
    takeaways: [
      'Deep, high-percentage returns that pin opponents back',
      '3rd shot drop vs. 3rd shot drive: exact decision trees',
      'Forehand & backhand topspin dip and backspin bite'
    ]
  },
  {
    step: '03',
    duration: '45 mins',
    title: 'Punch, Roll and Smash Volleys',
    breakNote: '1-min water break between drill progressions',
    focus: 'Net offense, aggressive precision & overhead power',
    description: 'Learn how to attack opportunities and pin your opponents at the baseline with three essential volley techniques. Coach Cris provides real-time adjustments on paddle prep, contact point in front of the body, and weight transfer so your attacks stay inside the lines.',
    takeaways: [
      'The compact punch volley for low, skidding balls',
      'The topspin roll volley to lift balls at shoe-top height',
      'Safe, decisive overhead smash mechanics'
    ]
  },
  {
    step: '04',
    duration: '45 mins',
    title: 'Resets — Slow Down The Game Like A Pro',
    breakNote: '1-min water break between drills',
    focus: 'Pace absorption, soft grip pressure & transition defense',
    description: 'One of the most underrated and game-changing skills in pickleball. Learn how to neutralize hard hitters and heavy drives coming at you and your partner, whether taking the ball off the bounce in the transition zone or off the volley out of the air. Master the relaxed hands that absorb speed effortlessly.',
    takeaways: [
      'Eliminate paddle recoil on high-speed shots',
      'Transition zone ball placement into the kitchen',
      'Turning an opponent\'s attack into your offensive kitchen setup'
    ]
  },
  {
    step: '05',
    duration: '30 mins',
    title: 'Court Positioning and Footwork',
    breakNote: '1-min water break between court rotations',
    focus: 'Doubles court coverage, team footwork & partner chemistry',
    description: 'We demystify who covers what part of the court and why, while practicing where to position yourself as dinking rallies shift left and right. Learn how to move in tandem with your partner like a linked rope, avoiding middle confusion and court poaching errors.',
    takeaways: [
      'The "string theory" of lateral doubles movement',
      'Covering the middle without colliding or giving up angles',
      'Proper recovery steps after wide defensive reaches'
    ]
  },
  {
    step: '06',
    duration: '30 mins',
    title: 'Doubles Tournament & Personalized Coaching Notes',
    breakNote: '1-min rest intervals between match rounds',
    focus: 'Live match application & individualized coach assessment',
    description: 'Hone all the skills learned and test your new strategic mindset in a fun, friendly doubles mini-tournament with rotating partners. While you play, Coach Cris observes each individual\'s performance, taking detailed notes on your habits, shot selection, and movement. At the end, you receive a personalized list of things to work on next.',
    takeaways: [
      'Real-time match pressure testing of your new shots',
      'Direct feedback from Coach Cris on tactical choices',
      'Your take-home written action checklist for future practice'
    ]
  },
];

export default function CurriculumPage() {
  return (
    <div style={{ background: '#F8FAF9', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Hero Banner */}
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
              Comprehensive 4-Hour System
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
            The 4-Hour Coached Clinic Curriculum
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '820px',
            lineHeight: 1.6,
            margin: '0 0 28px'
          }}>
            Developed by Coach Cristóvão &quot;Cris&quot; Abegão: 8 players across 2 dedicated courts with 1 master coach. Every drill is intentional, building directly toward confident doubles play, clean contact, and lasting consistency.
          </p>

          {/* Quick Pillar Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            maxWidth: '920px'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--clr-volt)', fontWeight: 800, fontSize: '13px' }}>
                <Users size={16} /> 8:1 Ratio
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '4px 0 0' }}>
                4 players per court · 2 courts · 1 coach
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--clr-volt)', fontWeight: 800, fontSize: '13px' }}>
                <Clock size={16} /> 4 Hours Immersive
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '4px 0 0' }}>
                1-min scheduled water breaks throughout
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--clr-volt)', fontWeight: 800, fontSize: '13px' }}>
                <Trophy size={16} /> Equipment Provided
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '4px 0 0' }}>
                Bring your own paddle if you prefer
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--clr-volt)', fontWeight: 800, fontSize: '13px' }}>
                <ShieldCheck size={16} /> 100% Refund Prior 24h
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '4px 0 0' }}>
                Zero questions asked · Transfer options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blocks List */}
      <section className="container" style={{ maxWidth: '960px', marginTop: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#4B5563' }}>
            Hour-By-Hour Roadmap
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#111813', margin: '8px 0 10px', fontFamily: 'var(--font-heading)' }}>
            Every Minute Engineered For Breakthroughs
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', maxWidth: '640px', margin: '0 auto' }}>
            No standing in long lines. With 4 players per court and Coach Cris moving between them, you get continuous ball contacts and immediate real-time adjustments.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {curriculumBlocks.map((block) => (
            <div 
              key={block.step}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '28px 32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#111813',
                    color: 'var(--clr-volt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '15px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {block.step}
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111813', margin: 0 }}>
                    {block.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    background: 'rgba(200, 255, 0, 0.2)',
                    color: '#111813',
                    fontWeight: 800,
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(0,0,0,0.08)'
                  }}>
                    ⏱ {block.duration}
                  </span>
                  <span style={{
                    background: '#F3F4F6',
                    color: '#4B5563',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    {block.breakNote}
                  </span>
                </div>
              </div>

              <div style={{
                background: '#F9FAFB',
                borderLeft: '3px solid var(--clr-volt)',
                padding: '10px 14px',
                borderRadius: '0 8px 8px 0',
                fontSize: '13px',
                fontWeight: 700,
                color: '#1F2937',
                marginBottom: '14px'
              }}>
                Key Focus: {block.focus}
              </div>

              <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 16px' }}>
                {block.description}
              </p>

              <div>
                <strong style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#111813', marginBottom: '8px' }}>
                  What You Will Master:
                </strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                  {block.takeaways.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#374151' }}>
                      <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Takeaways and CTA Card */}
        <div style={{
          marginTop: '48px',
          background: '#111813',
          color: '#FFFFFF',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '20px'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--clr-volt)' }}>
            Reserve Your Spot
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-heading)' }}>
            Experience This 4-Hour System In Toronto
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '640px', lineHeight: 1.6, margin: 0 }}>
            Spots in our flagship clinic are limited to 8 players to preserve the 8:1 coaching ratio. Equipment is provided, or you are welcome to bring your own paddle.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
            <Link href="/camps/toronto-beginner-clinic" className="btn btn--primary btn--lg">
              Reserve Your Spot For $195 CAD →
            </Link>
            <a href="tel:+15875002973" className="btn btn--outline-white btn--lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} /> Direct Call: +1 (587) 500-2973
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
