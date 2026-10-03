'use client';

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Video, 
  Palette, 
  Layers, 
  CheckCircle2,
  Crown
} from 'lucide-react';
import styles from './Sandbox.module.css';

// Components for Tabs 1, 2, 3
import HeroLightAnimation from '@/components/home/HeroLightAnimation';
import HeroSection from '@/components/home/HeroSection';
import VideoModalPlayer from '@/components/common/VideoModalPlayer';
import AnimationPaddlePhysics from '@/components/sandbox/AnimationPaddlePhysics';

// Components for Section Integrated Animations
import WhyCampsWork from '@/components/home/WhyCampsWork';
import PhotoGallery from '@/components/home/PhotoGallery';
import VideoTestimonials from '@/components/home/VideoTestimonials';
import LuxuryWebsitePreview from '@/components/sandbox/LuxuryWebsitePreview';
import LightThemeShowcase from '@/components/sandbox/LightThemeShowcase';

type TabType = 'light' | 'luxury' | 'hero' | 'video' | 'theme' | 'sections';
type SectionFilter = 'all' | 'why' | 'moments' | 'stories';

export default function SandboxPage() {
  const [activeTab, setActiveTab] = useState<TabType>('light');
  const [heroSubOption, setHeroSubOption] = useState<'light' | 'paddle' | 'full'>('light');
  const [themeMode, setThemeMode] = useState<'gold' | 'rose'>('gold');
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>('all');

  return (
    <div className={`${styles.container} ${activeTab === 'light' ? styles.containerLight : ''}`}>
      {/* Dashboard Nav Bar */}
      <div className={styles.dashboardNav}>
        <div className={styles.navInner}>
          <div className={styles.brandBadge}>
            <span>Apex Pickleball Sandbox Suite</span>
            <span className={styles.pillTag}>Testing Bench</span>
          </div>

          <div className={styles.tabList} role="tablist">
            <button
              className={`${styles.tabBtn} ${activeTab === 'light' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('light')}
              role="tab"
              aria-selected={activeTab === 'light'}
              style={{
                borderColor: activeTab === 'light' ? '#1958c7' : 'rgba(25, 88, 199, 0.35)',
                color: activeTab === 'light' ? '#fff' : '#1958c7',
                background: activeTab === 'light' ? '#1958c7' : 'rgba(25, 88, 199, 0.08)',
                fontWeight: 800
              }}
            >
              <Sparkles size={16} />
              ☀️ Light Themes (11 Palettes — Courts & Balls)
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === 'luxury' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('luxury')}
              role="tab"
              aria-selected={activeTab === 'luxury'}
              style={{
                borderColor: activeTab === 'luxury' ? '#e8e6e3' : 'rgba(232, 230, 227, 0.35)',
                color: activeTab === 'luxury' ? '#0b0b0c' : '#e8e6e3',
                background: activeTab === 'luxury' ? '#e8e6e3' : 'rgba(232, 230, 227, 0.08)',
                fontWeight: 800
              }}
            >
              <Crown size={16} />
              🌑 Dark Themes (Obsidian/Sandstone)
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === 'hero' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('hero')}
              role="tab"
              aria-selected={activeTab === 'hero'}
            >
              <Sparkles size={16} />
              1. Hero Animations
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === 'video' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('video')}
              role="tab"
              aria-selected={activeTab === 'video'}
            >
              <Video size={16} />
              2. Video Player Bench
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === 'theme' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('theme')}
              role="tab"
              aria-selected={activeTab === 'theme'}
            >
              <Palette size={16} />
              3. Dynamic Theme Switch
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === 'sections' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('sections')}
              role="tab"
              aria-selected={activeTab === 'sections'}
            >
              <Layers size={16} />
              4. Section Animations (Page Integrated)
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB: LIGHT THEME SHOWCASE (5 PALETTES)                   */}
      {/* ======================================================== */}
      {activeTab === 'light' && <LightThemeShowcase />}

      {/* ======================================================== */}
      {/* TAB: DARK LUXURY DESIGN PREVIEW                          */}
      {/* ======================================================== */}
      {activeTab === 'luxury' && <LuxuryWebsitePreview />}

      {/* ======================================================== */}
      {/* TAB 1: HERO ANIMATIONS                                    */}
      {/* ======================================================== */}
      {activeTab === 'hero' && (
        <main className={styles.tabPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Hero Section Animation Testing</h2>
              <p className={styles.panelSub}>
                Compare the 3rd Light 2D beacon with drifting pickleballs, interactive paddle court physics, and the full hero.
              </p>
            </div>
            <div className={styles.subControls}>
              <button
                className={`${styles.subControlBtn} ${heroSubOption === 'light' ? styles.subControlBtnActive : ''}`}
                onClick={() => setHeroSubOption('light')}
              >
                Option A: 2D Court Light & Particles
              </button>
              <button
                className={`${styles.subControlBtn} ${heroSubOption === 'paddle' ? styles.subControlBtnActive : ''}`}
                onClick={() => setHeroSubOption('paddle')}
              >
                Option B: Interactive Paddle Court
              </button>
              <button
                className={`${styles.subControlBtn} ${heroSubOption === 'full' ? styles.subControlBtnActive : ''}`}
                onClick={() => setHeroSubOption('full')}
              >
                Option C: Full Hero Combined
              </button>
            </div>
          </div>

          <div className={styles.testCard}>
            <div className={styles.cardTopBar}>
              <span className={styles.cardTitle}>
                {heroSubOption === 'light' && 'Option A: 2D Neon Court Light & Interactive Floating Pickleballs'}
                {heroSubOption === 'paddle' && 'Option B: Matter.js Split-Screen Paddle Court (Move mouse on left side)'}
                {heroSubOption === 'full' && 'Option C: Complete Production Hero (With 2D Light + Guaranteed Video Player)'}
              </span>
              <div className={styles.statusIndicator}>
                <span className={styles.statusDot} />
                Live Physics Active
              </div>
            </div>

            <div className={styles.previewContainer}>
              {heroSubOption === 'light' && (
                <div style={{ position: 'relative', height: '620px', background: '#0a0f18', overflow: 'hidden' }}>
                  <HeroLightAnimation />
                  <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '160px', paddingLeft: '20px', paddingRight: '20px' }}>
                    <span style={{ 
                      display: 'inline-block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '13px', 
                      letterSpacing: '2px', 
                      color: 'var(--clr-yellow)', 
                      padding: '8px 20px', 
                      borderRadius: '9999px', 
                      border: '1px solid rgba(255, 213, 79, 0.4)',
                      background: 'rgba(255, 213, 79, 0.08)'
                    }}>
                      ⚡ 2D KINETIC LIGHT & DRIFTING PICKLEBALLS
                    </span>
                    <h1 style={{ fontSize: '56px', fontWeight: 900, color: '#fff', marginTop: '20px', lineHeight: 1 }}>
                      STOP GUESSING.<br />START WINNING.
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '580px', margin: '20px auto', fontSize: '18px' }}>
                      Hover anywhere on the court. The glowing neon pickleballs react to your mouse velocity while court lines pulse at the bottom.
                    </p>
                  </div>
                </div>
              )}

              {heroSubOption === 'paddle' && (
                <div style={{ padding: '40px 24px', background: '#0b111e' }}>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h3 style={{ color: '#fff', margin: '0 0 8px 0' }}>Interactive Court Arena</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '14px' }}>
                      Move your cursor over the left side of the court to control the player paddle. The AI controls the right paddle!
                    </p>
                  </div>
                  <AnimationPaddlePhysics />
                </div>
              )}

              {heroSubOption === 'full' && (
                <HeroSection
                  transparentBg={true}
                  enableLightAnimation={true}
                />
              )}
            </div>
          </div>
        </main>
      )}

      {/* ======================================================== */}
      {/* TAB 2: VIDEO PLAYER TEST BENCH                            */}
      {/* ======================================================== */}
      {activeTab === 'video' && (
        <main className={styles.tabPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>YouTube & Video Player Test Bench</h2>
              <p className={styles.panelSub}>
                Testing verified pickleball video embeds with `referrerPolicy` optimization and custom click-to-play posters.
              </p>
            </div>
            <div className={styles.statusIndicator}>
              <CheckCircle2 size={16} color="#4ade80" />
              <span>All 3 Videos Verified Embeddable</span>
            </div>
          </div>

          <div className={styles.testCard}>
            <div className={styles.cardTopBar}>
              <span className={styles.cardTitle}>Verified Public Pickleball Match Videos</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                Click any thumbnail to test instant high-res playback
              </span>
            </div>

            <div className={styles.videoGrid}>
              <div className={styles.videoCardWrap}>
                <VideoModalPlayer
                  youtubeId="cQTEJKlKzCM"
                  title="The most viewed pickleball point EVER"
                  caption="🔥 Hero Video: Most Viewed Point Ever"
                />
                <div className={styles.videoMeta}>
                  <h4>1. The Most Viewed Pickleball Point EVER</h4>
                  <p>ID: <code>cQTEJKlKzCM</code> • Assigned to Hero Section</p>
                </div>
              </div>

              <div className={styles.videoCardWrap}>
                <VideoModalPlayer
                  youtubeId="A8x_1QXq8Sw"
                  title="Drop Shot Gold Medal Match"
                  caption="🥇 Player Story: Gold Medal Match"
                />
                <div className={styles.videoMeta}>
                  <h4>2. Drop Shot Destroying Ben Johns</h4>
                  <p>ID: <code>A8x_1QXq8Sw</code> • Assigned to Testimonials</p>
                </div>
              </div>

              <div className={styles.videoCardWrap}>
                <VideoModalPlayer
                  youtubeId="quHQ3XyQlhs"
                  title="Top 100 Pickleball Shots of the Year"
                  caption="🏆 Camp Highlights: Top 100 Shots"
                />
                <div className={styles.videoMeta}>
                  <h4>3. Top 100 Shots of the Year</h4>
                  <p>ID: <code>quHQ3XyQlhs</code> • Assigned to Testimonials</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ======================================================== */}
      {/* TAB 3: DYNAMIC THEME SWITCHER                             */}
      {/* ======================================================== */}
      {activeTab === 'theme' && (
        <main className={styles.tabPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Dynamic Theme Switcher Test</h2>
              <p className={styles.panelSub}>
                Experience how camps switch between the Apex Gold Theme and the Women&apos;s Only Rose Theme seamlessly.
              </p>
            </div>
            <div className={styles.subControls}>
              <button
                className={`${styles.subControlBtn} ${themeMode === 'gold' ? styles.subControlBtnActive : ''}`}
                onClick={() => setThemeMode('gold')}
              >
                ⚡ Standard Apex Gold Theme
              </button>
              <button
                className={`${styles.subControlBtn} ${themeMode === 'rose' ? styles.subControlBtnActive : ''}`}
                onClick={() => setThemeMode('rose')}
              >
                🌸 Women&apos;s Only Rose Theme
              </button>
            </div>
          </div>

          <div className={`${styles.testCard} ${themeMode === 'gold' ? styles.themeGold : styles.themeRose}`}>
            <div className={styles.cardTopBar}>
              <span className={styles.cardTitle}>
                Active Theme: {themeMode === 'gold' ? 'Apex High-Performance Gold (#ffd54f)' : 'Women\'s Exclusive Rose (#e91e8c)'}
              </span>
              <span className={styles.statusIndicator}>
                Theme Token Sync: Active
              </span>
            </div>

            <div className={styles.themeDemoWrap}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span className={styles.themedBadge}>
                    {themeMode === 'gold' ? 'Standard 4-Hour Camp' : 'Women\'s Only Intensive'}
                  </span>
                  <h3 style={{ fontSize: '32px', color: '#fff', margin: '12px 0 6px 0' }}>
                    {themeMode === 'gold' ? 'Austin, TX · Intermediate Camp' : 'Scottsdale, AZ · Women\'s Only Camp'}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {themeMode === 'gold' 
                      ? 'Structured breakthrough curriculum for co-ed competitive players.' 
                      : 'Empowering, all-female coaching staff in a focused, high-energy environment.'}
                  </p>
                </div>
                <button className={styles.themedBtn}>
                  Register Now — $199
                </button>
              </div>

              <div className={styles.themeCardsGrid}>
                <div className={styles.themedCampCard}>
                  <span className={styles.themedBadge}>Curriculum</span>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>8:1 Player to Coach Ratio</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
                    Guaranteed hands-on feedback every drill so you never get lost in a crowd.
                  </p>
                  <button className={styles.themedBtn}>Explore Drills</button>
                </div>

                <div className={styles.themedCampCard}>
                  <span className={styles.themedBadge}>Guarantee</span>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>100% Satisfaction</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
                    If you don&apos;t feel noticeable improvement in your game, we refund your registration.
                  </p>
                  <button className={styles.themedBtn}>Read Policy</button>
                </div>

                <div className={styles.themedCampCard}>
                  <span className={styles.themedBadge}>Coaching</span>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>PPR Certified Staff</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
                    Every coach has run at least 50 camps with proven breakthrough results.
                  </p>
                  <button className={styles.themedBtn}>Meet Coaches</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ======================================================== */}
      {/* TAB 4: SECTION ANIMATIONS (PAGE INTEGRATED)              */}
      {/* ======================================================== */}
      {activeTab === 'sections' && (
        <main className={styles.tabPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Section Animations (Page Integrated)</h2>
              <p className={styles.panelSub}>
                Previewing authentic interactive pickleball animations layered seamlessly with their respective homepage sections.
              </p>
            </div>
            <div className={styles.subControls}>
              <button
                className={`${styles.subControlBtn} ${sectionFilter === 'all' ? styles.subControlBtnActive : ''}`}
                onClick={() => setSectionFilter('all')}
              >
                All 3 Sections
              </button>
              <button
                className={`${styles.subControlBtn} ${sectionFilter === 'why' ? styles.subControlBtnActive : ''}`}
                onClick={() => setSectionFilter('why')}
              >
                1. Why It Works + Physics
              </button>
              <button
                className={`${styles.subControlBtn} ${sectionFilter === 'moments' ? styles.subControlBtnActive : ''}`}
                onClick={() => setSectionFilter('moments')}
              >
                2. Camp Moments + Parallax
              </button>
              <button
                className={`${styles.subControlBtn} ${sectionFilter === 'stories' ? styles.subControlBtnActive : ''}`}
                onClick={() => setSectionFilter('stories')}
              >
                3. Player Stories + 3D Ball
              </button>
            </div>
          </div>

          {/* Section 1: Why It Works + Foreground Physics Balls */}
          {(sectionFilter === 'all' || sectionFilter === 'why') && (
            <section className={styles.sectionWrapper}>
              <div className={styles.sectionLabel}>Why It Works + Foreground Physics Balls</div>
              <WhyCampsWork transparentBg={true} enablePhysics={true} />
            </section>
          )}

          {/* Section 2: Real Camp Moments + Flanking Titles + Cursor */}
          {(sectionFilter === 'all' || sectionFilter === 'moments') && (
            <section className={styles.sectionWrapper}>
              <div className={styles.sectionLabel}>Camp Moments + Flanking Titles + Cursor</div>
              <PhotoGallery transparentBg={true} animatedTitleBalls={true} enableParallax={true} enableCursor={true} />
            </section>
          )}

          {/* Section 3: Player Stories + Small 3D Ball + Neon Dot Cursor */}
          {(sectionFilter === 'all' || sectionFilter === 'stories') && (
            <section className={styles.sectionWrapper}>
              <div className={styles.sectionLabel}>Player Stories + Small 3D Ball + Dot Cursor</div>
              <VideoTestimonials transparentBg={true} enable3D={true} enableCursor={true} />
            </section>
          )}
        </main>
      )}
    </div>
  );
}
