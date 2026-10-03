'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { 
  Sparkles, 
  Palette, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Trophy, 
  Users, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Play, 
  Search, 
  Activity, 
  Zap, 
  Award,
  Crown,
  Heart
} from 'lucide-react';
import styles from './LuxuryWebsitePreview.module.css';

// Dynamic animation imports
const HeroLightAnimation = dynamic(() => import('@/components/home/HeroLightAnimation'), { ssr: false });
const AnimationPhysics = dynamic(() => import('@/components/sandbox/AnimationPhysics'), { ssr: false });
const Animation3D = dynamic(() => import('@/components/sandbox/Animation3D'), { ssr: false });
const VideoModalPlayer = dynamic(() => import('@/components/common/VideoModalPlayer'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/sandbox/CustomCursor'), { ssr: false });

export default function LuxuryWebsitePreview() {
  const [theme, setTheme] = useState<'volt' | 'rose'>('volt');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'intermediate' | 'beginner'>('all');
  const [activeHour, setActiveHour] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const storiesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Sample Camp Data with luxury attributes
  const camps = [
    {
      id: 'c-1',
      title: 'Intermediate Breakthrough Camp',
      city: 'Scottsdale',
      state: 'Arizona',
      stateCode: 'AZ',
      date: 'Sat, Oct 11, 2025',
      time: '9:00 AM – 1:00 PM',
      venue: 'Scottsdale Sports Complex',
      coach: 'Coach Mark R.',
      coachCert: 'PPR Certified Pro',
      level: 'intermediate',
      isWomenOnly: false,
      price: 249,
      seatsLeft: 2,
      totalSeats: 8,
    },
    {
      id: 'c-2',
      title: "Women's Only Master Intensive",
      city: 'Austin',
      state: 'Texas',
      stateCode: 'TX',
      date: 'Sat, Oct 18, 2025',
      time: '12:00 PM – 4:00 PM',
      venue: 'Austin Racquet Club',
      coach: 'Coach Sarah T.',
      coachCert: 'National Medalist & PPR Pro',
      level: 'intermediate',
      isWomenOnly: true,
      price: 269,
      seatsLeft: 3,
      totalSeats: 8,
    },
    {
      id: 'c-3',
      title: 'Beginner Fundamental Foundations',
      city: 'San Diego',
      state: 'California',
      stateCode: 'CA',
      date: 'Sat, Oct 25, 2025',
      time: '9:00 AM – 1:00 PM',
      venue: 'Bobby Riggs Racket Club',
      coach: 'Coach David L.',
      coachCert: 'PPR Level 2 Specialist',
      level: 'beginner',
      isWomenOnly: false,
      price: 199,
      seatsLeft: 4,
      totalSeats: 8,
    },
    {
      id: 'c-4',
      title: 'Advanced Dink & Transition Camp',
      city: 'Miami',
      state: 'Florida',
      stateCode: 'FL',
      date: 'Sat, Nov 01, 2025',
      time: '1:00 PM – 5:00 PM',
      venue: 'Miami Pickleball Center',
      coach: 'Coach Carlos M.',
      coachCert: 'PPR Elite Instructor',
      level: 'intermediate',
      isWomenOnly: false,
      price: 249,
      seatsLeft: 1,
      totalSeats: 8,
    },
    {
      id: 'c-5',
      title: "Women's Competitive Strategy Camp",
      city: 'Denver',
      state: 'Colorado',
      stateCode: 'CO',
      date: 'Sat, Nov 08, 2025',
      time: '9:00 AM – 1:00 PM',
      venue: 'Apex Tennis & Pickleball Park',
      coach: 'Coach Elena B.',
      coachCert: 'PPR Pro & Former D1 Athlete',
      level: 'intermediate',
      isWomenOnly: true,
      price: 269,
      seatsLeft: 2,
      totalSeats: 8,
    },
    {
      id: 'c-6',
      title: 'Zero-To-Consistent Novice Intensive',
      city: 'Chicago',
      state: 'Illinois',
      stateCode: 'IL',
      date: 'Sat, Nov 15, 2025',
      time: '10:00 AM – 2:00 PM',
      venue: 'Lakeshore Pickleball Arena',
      coach: 'Coach Brian K.',
      coachCert: 'PPR Certified Specialist',
      level: 'beginner',
      isWomenOnly: false,
      price: 199,
      seatsLeft: 5,
      totalSeats: 8,
    }
  ];

  // Filter camps based on user actions
  const filteredCamps = camps.filter((c) => {
    if (activeTab === 'women' && !c.isWomenOnly) return false;
    if (activeTab === 'intermediate' && c.level !== 'intermediate') return false;
    if (activeTab === 'beginner' && c.level !== 'beginner') return false;
    if (selectedState !== 'All' && c.state !== selectedState) return false;
    if (selectedLevel !== 'All' && c.level !== selectedLevel.toLowerCase()) return false;
    if (searchQuery && !c.city.toLowerCase().includes(searchQuery.toLowerCase()) && !c.state.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Blueprint Hour Breakdown
  const hoursData = [
    {
      hour: 1,
      tag: 'BIOMECHANICS & CALIBRATION',
      title: 'Paddle Face Control & Stroke Biomechanics',
      desc: 'Most amateur players leak points through erratic wrist angles. In Hour 1, we conduct individual video diagnostic loops to calibrate your grip, contact point, and follow-through.',
      takeaways: [
        'Eliminate wrist flick on high-pressure dinks',
        'Master the compact forward stroke that produces repeatable topspin',
        'Video recorded benchmark of your initial contact point'
      ],
      metric: '92% of students correct their contact height within 35 minutes'
    },
    {
      hour: 2,
      tag: 'NO-MAN’S LAND MASTERY',
      title: 'The Transition Zone & Reset Architecture',
      desc: 'Stop getting stranded between the baseline and kitchen. Hour 2 teaches you how to absorb 60mph drives, drop your paddle into the ready position, and drop soft resets into the kitchen.',
      takeaways: [
        'Dynamic split-step footwork to absorb hard smashes',
        'Soft hands physics: redirecting speed into dead drops',
        'Partner communication patterns when scrambling'
      ],
      metric: 'Reduces unforced transition errors by an average of 4.5 points per game'
    },
    {
      hour: 3,
      tag: 'OFFENSIVE DRILLS & DISGUISE',
      title: 'Third Shot Drops, Drives & Attack Angles',
      desc: 'Learn when to drive to create chaos, and when to drop to buy kitchen positioning. We build automatic trigger-reading so you never hesitate on the 3rd shot.',
      takeaways: [
        'The dipping topspin drop from the baseline',
        'Disguised speedups to attack opponents with low paddles',
        'Kitchen edge control and poaching timing'
      ],
      metric: 'Over 80% higher 3rd-shot conversion in subsequent matches'
    },
    {
      hour: 4,
      tag: 'TOURNAMENT SCENARIOS',
      title: 'High-Pressure Game Simulation & Live Video Playback',
      desc: 'No more generic drills. Hour 4 puts you into simulated 9-9 match pressure with active coach intervention after every 2 points, reviewing your real-time decisions.',
      takeaways: [
        'Live coached match play with real-time refereeing',
        'Side-by-side comparison with your Hour 1 video footage',
        'Personalized 30-day Post-Camp Practice Blueprint to take home'
      ],
      metric: '100% Satisfaction or full instant refund guaranteed on site'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Barbara M.',
      city: 'Scottsdale, AZ',
      photo: 'https://i.pravatar.cc/300?img=5',
      gain: '2.5 ➔ 3.5 in 6 Weeks',
      quote: 'I was stuck at rec play for almost a year. The coach spotted my backhand roll error in 10 minutes. 6 weeks later I took Gold in my first 3.5 bracket.',
      ytId: 'A8x_1QXq8Sw'
    },
    {
      name: 'Tom R.',
      city: 'Austin, TX',
      photo: 'https://i.pravatar.cc/300?img=70',
      gain: '3.0 ➔ 3.8 Tournament Medalist',
      quote: 'The 8:1 ratio is real. This isn’t a 40-person clinic where someone shouts through a megaphone. Every single drop shot was scrutinized and perfected.',
      ytId: 'cQTEJKlKzCM'
    },
    {
      name: 'Linda K.',
      city: 'San Diego, CA',
      photo: 'https://i.pravatar.cc/300?img=9',
      gain: 'Kitchen Win Rate +40%',
      quote: 'The women’s camp was the highest energy athletic weekend of my year. The transition zone drills alone changed how I see every single point.',
      ytId: 'quHQ3XyQlhs'
    }
  ];

  // Concierge FAQs
  const faqs = [
    {
      q: 'How does the 100% Breakthrough Guarantee work?',
      a: 'We are completely confident in our curriculum. If you attend the 4 hours and do not feel a measurable breakthrough in your paddle mechanics and tactical confidence, notify your lead coach before leaving and you will receive a full, hassle-free refund.'
    },
    {
      q: 'What skill level should I select (Beginner vs. Intermediate)?',
      a: 'If you are newer to the game or still struggle with consistent serving and dinking, choose Beginner (2.0–3.0). If you play regular rec games, understand kitchen rules, and want to master third-shot drops and tournament strategy, choose Intermediate (3.0–4.0+).'
    },
    {
      q: 'What is the player-to-coach ratio at each camp?',
      a: 'We strictly enforce an 8:1 maximum ratio. Each camp is capped at 8 players per court/coach so you receive dedicated, hands-on mechanical feedback on every single drill.'
    },
    {
      q: 'What happens if there is rain or inclement weather?',
      a: 'All outdoor locations have guaranteed rainout backups or indoor venue holds. In the rare event of weather postponement, you can reschedule to any upcoming date or claim an immediate 100% refund.'
    }
  ];

  return (
    <div className={`${styles.luxuryWrapper} ${theme === 'rose' ? styles.themeRose : styles.themeVolt}`}>
      {/* ======================================================== */}
      {/* LUXURY PREVIEW CONTROL CONSOLE                           */}
      {/* ======================================================== */}
      <div className={styles.previewConsole}>
        <div className={styles.consoleInner}>
          <div className={styles.consoleLeft}>
            <span className={styles.statusBadge}>
              <Sparkles size={13} />
              NEW LUXURY CONCEPT PREVIEW
            </span>
            <span className={styles.consoleTitle}>
              Interactive Website Structuring & Color Theming
            </span>
          </div>

          <div className={styles.consoleControls}>
            {/* Live Theme Switcher */}
            <div className={styles.themeSelector}>
              <span className={styles.selectorLabel}>Theme Mode:</span>
              <button
                className={`${styles.themeOptionBtn} ${theme === 'volt' ? styles.themeActiveVolt : ''}`}
                onClick={() => setTheme('volt')}
              >
                <Zap size={14} />
                Obsidian
              </button>
              <button
                className={`${styles.themeOptionBtn} ${theme === 'rose' ? styles.themeActiveRose : ''}`}
                onClick={() => setTheme('rose')}
              >
                <Heart size={14} />
                Sandstone
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CHAPTER 1: THE EDITORIAL COMMAND HERO                    */}
      {/* ======================================================== */}
      <section className={styles.heroChapter}>
        <div className={styles.heroAnimationLayer} aria-hidden="true">
          <HeroLightAnimation />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroPillBadge}>
            <Crown size={13} className={styles.badgeIcon} />
            <span>AMERICA&apos;S MOST DISCIPLINED PICKLEBALL INTENSIVE</span>
          </div>

          <h1 className={styles.heroTitle}>
            THE BREAKTHROUGH.<br />
            <span className={styles.heroTitleItalic}>IN ONE FOCUSED MORNING.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            No crowded clinics. No random dinking. An elite 4-hour coaching architecture engineered to rebuild your mechanics, master the transition zone, and unlock tournament-level confidence.
          </p>

          <div className={styles.heroTrustCapsule}>
            <div className={styles.trustItem}>
              <Star size={16} fill="currentColor" className={styles.starIcon} />
              <span><strong>4.98 / 5.0</strong> (2,400+ Alumni)</span>
            </div>
            <div className={styles.trustDivider}>•</div>
            <div className={styles.trustItem}>
              <Users size={16} />
              <span><strong>Strict 8:1</strong> Ratio</span>
            </div>
            <div className={styles.trustDivider}>•</div>
            <div className={styles.trustItem}>
              <ShieldCheck size={16} />
              <span><strong>100%</strong> Money-Back Guarantee</span>
            </div>
          </div>

          {/* Interactive Concierge Camp Finder Bar */}
          <div className={styles.conciergeBar}>
            <div className={styles.conciergeField}>
              <label>
                <MapPin size={14} />
                <span>Select State</span>
              </label>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className={styles.conciergeSelect}
              >
                <option value="All">All 35+ States</option>
                <option value="Arizona">Arizona (Scottsdale, Phoenix)</option>
                <option value="Texas">Texas (Austin, Dallas)</option>
                <option value="California">California (San Diego, LA)</option>
                <option value="Florida">Florida (Miami, Tampa)</option>
                <option value="Colorado">Colorado (Denver)</option>
                <option value="Illinois">Illinois (Chicago)</option>
              </select>
            </div>

            <div className={styles.conciergeDivider} />

            <div className={styles.conciergeField}>
              <label>
                <Activity size={14} />
                <span>Skill Level</span>
              </label>
              <select 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={styles.conciergeSelect}
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner (2.0 – 3.0)</option>
                <option value="Intermediate">Intermediate (3.0 – 4.0+)</option>
              </select>
            </div>

            <button 
              className={styles.conciergeBtn}
              onClick={() => {
                const target = document.getElementById('experience-selector');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore Available Camps</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* CHAPTER 2: THE MINIMALIST AUTHORITY METRIC RIBBON        */}
      {/* ======================================================== */}
      <section className={styles.authorityRibbon}>
        <div className={styles.ribbonGrid}>
          <div className={styles.ribbonItem}>
            <span className={styles.ribbonVal}>35+</span>
            <span className={styles.ribbonLbl}>US States On Tour</span>
          </div>
          <div className={styles.ribbonDivider} />
          <div className={styles.ribbonItem}>
            <span className={styles.ribbonVal}>8 : 1</span>
            <span className={styles.ribbonLbl}>Max Player-To-Coach Ratio</span>
          </div>
          <div className={styles.ribbonDivider} />
          <div className={styles.ribbonItem}>
            <span className={styles.ribbonVal}>14,000+</span>
            <span className={styles.ribbonLbl}>Alumni Transformed</span>
          </div>
          <div className={styles.ribbonDivider} />
          <div className={styles.ribbonItem}>
            <span className={styles.ribbonVal}>PPR</span>
            <span className={styles.ribbonLbl}>Certified Master Coaches</span>
          </div>
          <div className={styles.ribbonDivider} />
          <div className={styles.ribbonItem}>
            <span className={styles.ribbonVal}>100%</span>
            <span className={styles.ribbonLbl}>Breakthrough Guarantee</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* CHAPTER 3: THE 4-HOUR SYSTEM (BENTO GRID ARCHITECTURE)   */}
      {/* ======================================================== */}
      <section className={styles.bentoChapter}>
        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionPill}>THE BREAKTHROUGH ARCHITECTURE</span>
          <h2 className={styles.sectionTitle}>THE 4-HOUR SYSTEM.</h2>
          <p className={styles.sectionDesc}>
            Most clinics waste 3 hours on unstructured games. We designed a four-phase biomechanical blueprint where every minute has a targeted purpose.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {/* Tile 1: Hero Large - 8:1 Ratio & Video Diagnostics */}
          <div className={`${styles.bentoTile} ${styles.bentoTileLarge}`}>
            <div className={styles.bentoBadge}>PILLAR 01 · PROPRIETARY METHOD</div>
            <h3 className={styles.bentoTitle}>Strict 8:1 Player-to-Coach Ratio & Video Diagnostics</h3>
            <p className={styles.bentoText}>
              You never get lost in a crowd. With exactly 8 players per court, your coach analyzes your contact point, body angle, and paddle trajectory after every single drill.
            </p>
            <div className={styles.bentoMetricRow}>
              <div className={styles.bentoStatPill}>
                <Users size={16} />
                <span>8 Players Max</span>
              </div>
              <div className={styles.bentoStatPill}>
                <CheckCircle2 size={16} />
                <span>Personal Video Replay</span>
              </div>
              <div className={styles.bentoStatPill}>
                <Award size={16} />
                <span>PPR Certified Staff</span>
              </div>
            </div>
          </div>

          {/* Tile 2: Interactive Court Physics & Transition Zone */}
          <div className={`${styles.bentoTile} ${styles.bentoTileInteractive}`}>
            <div className={styles.physicsOverlay}>
              <AnimationPhysics />
            </div>
            <div className={styles.bentoContentAbove}>
              <div className={styles.bentoBadge}>PILLAR 02 · REAL-TIME INTERACTION</div>
              <h3 className={styles.bentoTitle}>Transition Zone & Soft Hand Physics</h3>
              <p className={styles.bentoText}>
                Learn how to absorb 60mph baseline power drives and reset them dead into the kitchen. Interactive physics simulation active below.
              </p>
            </div>
          </div>

          {/* Tile 3: Tournament Attack Angles & Kitchen Dominance */}
          <div className={styles.bentoTile}>
            <div className={styles.bentoBadge}>PILLAR 03 · TACTICAL IQ</div>
            <h3 className={styles.bentoTitle}>Kitchen Dominance & Speedup Defense</h3>
            <p className={styles.bentoText}>
              Turn defensive scrambling into aggressive kitchen positioning with precise footwork triggers and roll volleys.
            </p>
            <div className={styles.bentoTag}>+40% Attack Conversion</div>
          </div>

          {/* Tile 4: Ironclad Guarantee */}
          <div className={`${styles.bentoTile} ${styles.bentoTileHighlight}`}>
            <div className={styles.bentoBadge}>PILLAR 04 · ZERO RISK</div>
            <h3 className={styles.bentoTitle}>100% Breakthrough Guarantee</h3>
            <p className={styles.bentoText}>
              If you don&apos;t feel a decisive breakthrough in your shot mechanics and confidence by 1:00 PM, we refund 100% of your fee on site.
            </p>
            <div className={styles.guaranteePill}>
              <ShieldCheck size={18} />
              <span>Full Refund Protection</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* CHAPTER 4: THE CURATED CAMP EXPERIENCE SELECTOR          */}
      {/* ======================================================== */}
      <section id="experience-selector" className={styles.experienceChapter}>
        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionPill}>UPCOMING BOOTCAMPS</span>
          <h2 className={styles.sectionTitle}>SELECT YOUR CAMP EXPERIENCE.</h2>
          <p className={styles.sectionDesc}>
            Reserve your court before spots fill. Every intensive is capped at 8 seats to guarantee coaching quality.
          </p>
        </div>

        {/* Experience Tab Filter */}
        <div className={styles.experienceTabs}>
          <button 
            className={`${styles.expTabBtn} ${activeTab === 'all' ? styles.expTabActive : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Breakthrough Camps ({camps.length})
          </button>
          <button 
            className={`${styles.expTabBtn} ${activeTab === 'women' ? styles.expTabActive : ''}`}
            onClick={() => {
              setActiveTab('women');
              setTheme('rose'); // Auto-switch to luxury rose theme!
            }}
          >
            🌸 Women&apos;s Only Intensives (2)
          </button>
          <button 
            className={`${styles.expTabBtn} ${activeTab === 'intermediate' ? styles.expTabActive : ''}`}
            onClick={() => setActiveTab('intermediate')}
          >
            Intermediate (3.0 – 4.0+)
          </button>
          <button 
            className={`${styles.expTabBtn} ${activeTab === 'beginner' ? styles.expTabActive : ''}`}
            onClick={() => setActiveTab('beginner')}
          >
            Beginner Foundations (2.0 – 3.0)
          </button>
        </div>

        {/* Camp Cards Grid */}
        <div className={styles.campCardsGrid}>
          {filteredCamps.map((camp) => (
            <div key={camp.id} className={styles.luxuryCampCard}>
              <div className={styles.cardHeaderRow}>
                <span className={styles.stateTag}>{camp.stateCode}</span>
                <span className={`${styles.levelTag} ${camp.isWomenOnly ? styles.womenTag : ''}`}>
                  {camp.isWomenOnly ? "Women's Only" : camp.level.toUpperCase()}
                </span>
                {camp.seatsLeft <= 2 && (
                  <span className={styles.urgencyTag}>
                    <Flame size={12} />
                    Only {camp.seatsLeft} Spots Left
                  </span>
                )}
              </div>

              <h4 className={styles.campCardTitle}>{camp.title}</h4>

              <div className={styles.campMetaStack}>
                <div className={styles.metaRow}>
                  <Calendar size={14} />
                  <span>{camp.date}</span>
                </div>
                <div className={styles.metaRow}>
                  <Clock size={14} />
                  <span>{camp.time}</span>
                </div>
                <div className={styles.metaRow}>
                  <MapPin size={14} />
                  <span>{camp.city}, {camp.stateCode} · {camp.venue}</span>
                </div>
              </div>

              {/* Coach Credentials */}
              <div className={styles.coachPreview}>
                <div className={styles.coachAvatar}>
                  {camp.coach.charAt(6)}
                </div>
                <div>
                  <div className={styles.coachName}>{camp.coach}</div>
                  <div className={styles.coachCert}>{camp.coachCert}</div>
                </div>
              </div>

              {/* Card Footer */}
              <div className={styles.cardFooterRow}>
                <div>
                  <div className={styles.cardPrice}>${camp.price}</div>
                  <div className={styles.priceSub}>All-Inclusive · 100% Guaranteed</div>
                </div>
                <button className={styles.cardRegisterBtn}>
                  <span>Reserve Seat</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* CHAPTER 5: THE HOUR-BY-HOUR BLUEPRINT STEPPER            */}
      {/* ======================================================== */}
      <section className={styles.stepperChapter}>
        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionPill}>MINUTE-BY-MINUTE METHODOLOGY</span>
          <h2 className={styles.sectionTitle}>THE 4-HOUR TIMELINE.</h2>
          <p className={styles.sectionDesc}>
            Click through each hour to see the deliberate progression of drills and tactical milestones.
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className={styles.stepperNav}>
          {hoursData.map((h) => (
            <button
              key={h.hour}
              className={`${styles.stepNavBtn} ${activeHour === h.hour ? styles.stepNavActive : ''}`}
              onClick={() => setActiveHour(h.hour)}
            >
              <div className={styles.stepNum}>0{h.hour}</div>
              <div className={styles.stepTitle}>Hour {h.hour}: {h.tag}</div>
            </button>
          ))}
        </div>

        {/* Active Hour Details Showcase */}
        {(() => {
          const current = hoursData.find((h) => h.hour === activeHour) || hoursData[0];
          return (
            <div className={styles.hourDetailCard}>
              <div className={styles.hourCardHeader}>
                <span className={styles.hourBadge}>PHASE 0{current.hour} · {current.tag}</span>
                <h3 className={styles.hourHeadline}>{current.title}</h3>
                <p className={styles.hourSummary}>{current.desc}</p>
              </div>

              <div className={styles.takeawaysBox}>
                <div className={styles.takeawaysTitle}>Core Technical Focus:</div>
                <ul className={styles.takeawaysList}>
                  {current.takeaways.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className={styles.takeawayCheck} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.hourMetricCallout}>
                <Zap size={16} />
                <span><strong>Key Outcome:</strong> {current.metric}</span>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ======================================================== */}
      {/* CHAPTER 6: VERIFIED TRANSFORMATIONS & PLAYER STORIES     */}
      {/* ======================================================== */}
      <section ref={storiesRef} className={styles.storiesChapter}>
        {/* Our refined Small 3D Pickleball Accent */}
        <div className={styles.ball3DLayer} aria-hidden="true">
          <Animation3D small={true} position={[2.6, 2.3, 0]} />
        </div>
        <CustomCursor containerRef={storiesRef} dotOnly={true} />

        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionPill}>VERIFIED PROOF</span>
          <h2 className={styles.sectionTitle}>REAL PLAYERS. ZERO FLUFF.</h2>
          <p className={styles.sectionDesc}>
            These are typical outcomes from players who completed our 4-hour curriculum.
          </p>
        </div>

        <div className={styles.storiesGrid}>
          {testimonials.map((t, idx) => (
            <div key={idx} className={styles.storyCard}>
              <div className={styles.storyTopRow}>
                <div className={styles.storyAvatarWrap}>
                  <Image 
                    src={t.photo} 
                    alt={t.name} 
                    width={56} 
                    height={56} 
                    className={styles.storyAvatar} 
                    unoptimized 
                  />
                  <div className={styles.playDot} title="Click to watch verified play video">
                    <Play size={10} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <div className={styles.storyName}>{t.name}</div>
                  <div className={styles.storyCity}>{t.city}</div>
                  <div className={styles.storyGain}>{t.gain}</div>
                </div>
              </div>

              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className={styles.storyQuote}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className={styles.videoPlayerWrap}>
                <VideoModalPlayer 
                  youtubeId={t.ytId}
                  title={`${t.name} — Video Testimonial`}
                  caption="▶ Watch 45s Student Breakdown Video"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* CHAPTER 7: CAMP ATMOSPHERE & COMMUNITY (GALLERY)         */}
      {/* ======================================================== */}
      <section ref={galleryRef} className={styles.galleryChapter}>
        <CustomCursor containerRef={galleryRef} />

        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionPill}>COMMUNITY & COURTS</span>
          <h2 className={styles.sectionTitle}>MOMENTS FROM REAL CAMPS.</h2>
          <p className={styles.sectionDesc}>
            High-energy coaching, dedicated courts, and genuine breakthrough breakthroughs across 35+ states.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <Image 
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80" 
              alt="Intensive Transition Drills" 
              width={600} 
              height={400} 
              className={styles.galleryImg} 
              unoptimized
            />
            <div className={styles.galleryCaption}>Transition Zone Mastery · Scottsdale, AZ</div>
          </div>
          <div className={styles.galleryItem}>
            <Image 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" 
              alt="Video Diagnostic Feedback" 
              width={600} 
              height={400} 
              className={styles.galleryImg} 
              unoptimized
            />
            <div className={styles.galleryCaption}>1-on-1 Stroke Diagnostics · Austin, TX</div>
          </div>
          <div className={styles.galleryItem}>
            <Image 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80" 
              alt="Women's Camp Team" 
              width={600} 
              height={400} 
              className={styles.galleryImg} 
              unoptimized
            />
            <div className={styles.galleryCaption}>Women&apos;s Intensive Graduation · San Diego, CA</div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* CHAPTER 8: CONCIERGE FAQ & VIP ZERO-RISK GUARANTEE       */}
      {/* ======================================================== */}
      <section className={styles.faqChapter}>
        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionPill}>COMMON QUESTIONS</span>
          <h2 className={styles.sectionTitle}>TRANSPARENCY & POLICIES.</h2>
          <p className={styles.sectionDesc}>
            Everything you need to know before stepping onto the court.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`${styles.faqCard} ${openFaq === idx ? styles.faqCardOpen : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className={styles.faqHeader}>
                <span className={styles.faqQuestion}>{faq.q}</span>
                <span className={styles.faqIcon}>
                  {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </div>
              {openFaq === idx && (
                <div className={styles.faqBody}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* CHAPTER 9: SIGNATURE CONVERSION BANNER                   */}
      {/* ======================================================== */}
      <section className={styles.finalCtaChapter}>
        <div className={styles.finalCtaCard}>
          <span className={styles.ctaPill}>LIMITED SEATS REMAINING</span>
          <h2 className={styles.ctaTitle}>YOUR BREAKTHROUGH STARTS HERE.</h2>
          <p className={styles.ctaDesc}>
            Capped at 8 players per court. Backed by our 100% money-back satisfaction guarantee.
          </p>
          <div className={styles.ctaButtonRow}>
            <button 
              className={styles.primaryCtaBtn}
              onClick={() => {
                const target = document.getElementById('experience-selector');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Find A Camp In Your State</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className={styles.ctaGuarText}>
            <ShieldCheck size={16} />
            <span>Zero-risk registration · Instant refund if not 100% satisfied</span>
          </div>
        </div>
      </section>
    </div>
  );
}
