# 🏓 WEBSITE STRUCTURE BLUEPRINT
## Reference: obsessedpickleballerscamps.com
## Purpose: Local Replica Foundation — "Steal Like an Artist"

---

## 🌐 SITE MAP & ROUTING

```
/                          → Homepage (Primary Landing Page / Sales Funnel)
/camps/                    → Camps Catalog Page (Filterable Listings)
/states/                   → States Grid Page (Location Discovery)
/contact-us/               → Contact Page (Lead Capture Forms)
/[camp-slug]/              → Individual Camp Detail Page (Booking/Sales Page)
```

---

## 🎨 GLOBAL DESIGN SYSTEM

### Color Palette
```
Primary Yellow:    #F5C842  (buttons, CTAs, highlights, badge backgrounds)
Dark Yellow:       #D4A800  (hover states on yellow buttons)
Announcement Bar:  #F5C842  (background) + #111111 (text)
Background Dark:   #0E0E0E  (hero sections, dark backgrounds)
Background White:  #FFFFFF  (card backgrounds, light sections)
Background Light:  #F7F7F7  (alternating section backgrounds)
Background Gray:   #EFEFEF  (subtle card backgrounds)
Section Dark:      #1A1A1A  (dark content sections)
Accent Green:      #22C55E  (availability indicators — seats left)
Accent Red:        #EF4444  (SOLD OUT badges)
Text Primary:      #111111  (headings)
Text Secondary:    #555555  (body copy, descriptions)
Text White:        #FFFFFF  (text on dark backgrounds)
Border Light:      #E5E7EB  (card borders, separators)
Star/Rating:       #F59E0B  (star icons)
```

### Typography
```
Primary Font:      'Barlow Condensed', sans-serif (headings, navigation, badges)
Secondary Font:    'Barlow', sans-serif (body text, descriptions)
Google Fonts CDN:  https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap

Type Scale:
  - Hero Heading:        72px–96px / font-weight: 900 / uppercase / letter-spacing: -1px
  - Section Heading:     42px–56px / font-weight: 800 / uppercase
  - Card Heading:        22px–28px / font-weight: 700
  - Body Copy:           16px–18px / font-weight: 400–500 / line-height: 1.6
  - Label/Badge:         11px–13px / font-weight: 700 / uppercase / letter-spacing: 2px
  - Button Text:         14px–16px / font-weight: 700 / uppercase / letter-spacing: 1.5px
  - Navigation:          14px / font-weight: 600 / uppercase / letter-spacing: 1px
```

### Spacing & Containers
```
Section Padding:   80px–120px vertical
Card Padding:      24px–32px
Gap (Grid):        24px–32px
Container Max-W:   1200px (centered, 20px side padding on mobile)
Border Radius:     8px (cards), 4px (buttons), 50% (avatars)
```

### Shadows
```
Card Shadow:       0 4px 20px rgba(0,0,0,0.08)
Card Hover Shadow: 0 8px 32px rgba(0,0,0,0.15)
Button Shadow:     0 4px 12px rgba(245,200,66,0.4)
```

---

## 📄 PAGE 1: HOMEPAGE (/)

### Sections in Order:
1. Announcement Bar (fixed top stripe)
2. Main Navigation Header (sticky)
3. Hero Section (full-screen dark, video bg, headline + stats)
4. States/Location Ticker (horizontal infinite marquee)
5. "Who It's For" — Skill Level Cards (2-col grid)
6. Upcoming Camps Preview (3-col camp card grid)
7. "Why Our Camps Work" — 4-feature dark section
8. "The Blueprint" — 3-step numbered framework
9. Featured Coaches (3-col grid)
10. "Real Camp Moments" — Photo Gallery Grid
11. "Structured To Transform" — Timeline Accordion
12. "Player Stories" — Video Testimonials (3-col dark section)
13. Bottom CTA Banner (dark/yellow full-width)
14. Footer (4-col dark)

### 1.1 Announcement Bar
- Height: 40px, full-width
- Background: #F5C842 (yellow), text: #111111
- Content: "🔥 [Stat Count] · [X]★ Rating · [Social Proof Statement]"
- Font: 13px, 700 weight, uppercase, letter-spacing: 1px
- Position: Above header, not sticky

### 1.2 Main Navigation Header (Sticky)
- Height: 80px, full-width
- Background: #111111 (dark), position: sticky top: 0
- Logo: Round emblem left-aligned, text tagline next to it
- Nav items: HOME / CAMPS / STATES / CONTACT US (white, 14px, 600, uppercase)
- CTA: "FIND A CAMP" yellow pill button, right-aligned
- Mobile: Hamburger icon → full overlay dropdown
- Scroll behavior: Adds box-shadow after scrolling past announcement bar

### 1.3 Hero Section
- Height: 100vh minimum
- Background: Dark overlay (#000 at 60% opacity) over looping video
- Content (centered):
  - Small badge/pill: "ELITE TRAINING CAMPS" (yellow text, dark border)
  - H1: Large uppercase headline (900 weight, 72–96px)
  - P: Subheadline value proposition (20px, 400 weight, white/gray)
  - CTA Button: "FIND A CAMP →" (yellow, large, pill shape)
  - Stats Row: 3 stat columns (number in yellow, label in white/gray)
  - Video embed or YouTube embed below stats
- Animations: Badge fades in → H1 slides up → stats count up on view

### 1.4 States Ticker
- Full-width dark strip
- Label: "Camps across [X+] states:"
- Infinite horizontal marquee of state names separated by dots/pipes
- Speed: ~40s loop, pausable on hover

### 1.5 "Who It's For" — Skill Cards
- Background: White (#FFFFFF)
- Section label: uppercase pill "WHO IT'S FOR"
- H2: "Built For Players Who Are Ready To Level Up"
- 2-column grid of level cards:
  - Card 1: Beginner (2.0–2.5) — dark card, yellow badge
  - Card 2: Intermediate (3.0–3.5) — yellow card, dark badge
  - Each card: level badge, rating range, h3, 4–5 bullet benefits, CTA button

### 1.6 Upcoming Camps Preview
- Background: #F7F7F7 (light)
- Section label: "UPCOMING CAMPS"
- H2: "Find a Camp Near You"
- 3-column grid of camp cards (white cards, shadow, border)
- Each card: status badge, level badge, date, city/state, coach avatar+name, price, register button
- "View All Camps →" outline button below grid

### 1.7 "Why Our Camps Work"
- Background: #1A1A1A (dark)
- Section label: "WHY IT WORKS" (yellow)
- H2: Large white headline
- 4-column feature grid:
  - Each cell: Icon (emoji or SVG), bold heading, short body copy
  - Feature examples: Small group ratio, Expert coaching, Structured curriculum, Real game play

### 1.8 "The Blueprint" — 3-Step Framework
- Background: #FFFFFF
- H2: "Our 3-Step Framework" / "The Blueprint"
- 3-column horizontal steps with large step numbers (01, 02, 03) in yellow/gray
- Each step: Number, title, 2–3 sentence description
- Connecting line/divider between steps on desktop

### 1.9 Featured Coaches
- Background: #F7F7F7
- Section label: "MEET YOUR COACHES"
- H2: "Trained by the Best"
- 3-column coach card grid:
  - Each card: coach photo (cropped circle), name, credentials (PPR Certified, etc.), short bio, optional link

### 1.10 Photo Gallery ("Real Camp Moments")
- Background: #1A1A1A (dark)
- 3–4 column image grid (masonry or even grid)
- Images: Action shots from real camps, grouped play, coaching moments
- Hover: Slight zoom + brightness overlay

### 1.11 Schedule Accordion ("Structured To Transform You")
- Background: #FFFFFF
- H2: "4-Hour Transformation Timeline"
- Vertical list of time blocks, each expandable:
  - Time badge (e.g., "0:00–0:20"), block title, expand/collapse icon
  - Expanded: Short description paragraph

### 1.12 Video Testimonials ("Player Stories")
- Background: #1A1A1A (dark)
- H2: "Don't Take Our Word For It"
- 3-column grid of testimonial cards:
  - Video thumbnail with play button overlay
  - Player name, 5-star rating, quote excerpt
- Optional: Carousel/slider on mobile

### 1.13 CTA Banner
- Background: #F5C842 or #0E0E0E + yellow accents
- Large H2: Urgency-driven headline
- Subheadline
- Large yellow/dark CTA button
- No padding on sides (full bleed)

### 1.14 Footer
- Background: #0E0E0E
- 4-column layout:
  - Col 1: Logo + tagline + social icons (FB, IG, YT)
  - Col 2: Quick links
  - Col 3: Recent camp locations
  - Col 4: Email newsletter form
- Divider line above footer bottom
- Footer bottom: copyright text + privacy/terms links
- Text: White, links: #999 → yellow on hover

---

## 📄 PAGE 2: CAMPS CATALOG (/camps/)

### Sections:
1. Sticky Header
2. Page Hero (title + subtitle)
3. Yellow Filter Bar (sticky below header)
4. Camp Cards Grid (filterable)
5. Load More / Pagination
6. Footer

### Filter Controls:
- Dropdowns: State, Coach, Type (Beginner/Intermediate), Month, Level, Sort Order
- Background: #F5C842 (yellow), 56px height, sticky
- "CLEAR FILTERS" pill button (dark)

### Camp Card Structure:
- Status badge (top-left): green/amber/red
- Level badge (top-right)
- Date, time, city/state
- Coach row (avatar + name)
- Price
- Register button (yellow, full-width within card)
- Card states: available, limited, sold out (visual changes to whole card)

---

## 📄 PAGE 3: STATES (/states/)

### Sections:
1. Sticky Header
2. Page Hero: "Find Camps By State"
3. States Grid (35+ state cards)
4. Footer

### State Card:
- State abbreviation large (e.g., "AZ") or flag icon
- State name
- Camp count (e.g., "6 Camps Available")
- Dark card, hover: yellow border + lift shadow

---

## 📄 PAGE 4: CONTACT (/contact-us/)

### Sections:
1. Sticky Header
2. Page Hero: "Get In Touch"
3. Tab Navigation: 4 inquiry types
4. Form Panel (changes per tab)
5. Footer

### Tab Types:
- Join Waitlist (default active)
- Become a Coach
- Brand Partnership
- General Support

### Waitlist Form Fields:
- Full Name (required)
- Email Address (required)
- Phone Number
- Preferred State (dropdown)
- Skill Level (dropdown)
- Message (textarea, optional)
- Submit button: yellow "Join The Waitlist →"

---

## 📄 PAGE 5: CAMP DETAIL (/[slug]/)

### Sections in Order:
1. Sticky Header
2. Urgency Banner (yellow, full-width: "⚡ Last [X] Spots Left")
3. Camp Hero (title, date, location breadcrumb)
4. 6-Cell Specs Grid (venue, date/time, who it's for, level, class size, bonuses)
5. Content + Sticky Sidebar Layout:
   - Left (60%): 4-Hour Timeline Accordion → Coach Profile → Bonuses → Guarantee → FAQ
   - Right (40%): Sticky Pricing/Booking Box
6. CTA Banner
7. Sticky Bottom Bar (visible on scroll: price + register button)
8. Registration Modal (overlay popup)
9. Footer

### Sticky Sidebar Booking Box:
- Price display (large, bold)
- 3 bullet includes
- Register button (yellow, large, full-width)
- Guarantee note
- Seats badge

### FAQ Accordion:
- 6–10 questions
- Toggle on click
- Icon: "+" → "–" transition
- Question bold, 18px
- Answer: 16px, gray, revealed below

### Registration Modal:
- Overlay: rgba(0,0,0,0.8)
- Card: white, centered, 480px max-width, 40px border-radius
- Close button (top-right ×)
- H2: Motivational headline
- 3 inputs: Name, Email, Phone
- Submit: yellow full-width button
- Disclaimer: lock icon + security text

### Sticky Bottom Bar:
- Fixed bottom, full-width, dark background
- Left: Event date + location
- Right: "Register now for only $[XXX] →" yellow button
- Appears after scrolling past main booking box, disappears on footer

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:   0–767px    — 1-column, stacked, hamburger nav, no sticky sidebar
Tablet:   768–1023px — 2-column grids, side-by-side cards, condensed header
Desktop:  1024px+    — Full multi-column, sticky sidebar, expanded nav
Wide:     1200px+    — Max container width cap, content centered
```

---

## ♿ ACCESSIBILITY & SEO

- Single `<h1>` per page
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`
- All images: descriptive `alt=""` attributes
- Icon-only buttons: `aria-label` attributes
- `lang="en"` on `<html>`
- OG meta tags for social sharing
- Schema.org `Event` markup on detail pages
- Canonical URLs on all pages
