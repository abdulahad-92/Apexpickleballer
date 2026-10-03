# ⚙️ FEATURE DETAILS & INTERACTIONS BLUEPRINT
## Reference: obsessedpickleballerscamps.com
## Purpose: Implementation Guide for Local Replica

---

## 📋 FEATURE INVENTORY OVERVIEW

| Category | Count | Priority |
|---|---|---|
| Animations & Micro-interactions | 14 | High |
| Navigation & Routing | 5 | High |
| Forms & Validation | 4 | High |
| Dynamic Filtering System | 1 | High |
| Modal & Overlay System | 1 | High |
| Sticky Elements | 4 | Medium |
| Testimonials & Social Proof | 3 | Medium |
| Content Accordion | 2 | Medium |
| Ticker / Marquee | 1 | Medium |
| Responsive Behaviors | 6 | High |
| SEO / Meta | 4 | Medium |

---

## 🎬 SECTION 1: ANIMATIONS & MICRO-INTERACTIONS

### 1.1 Scroll Reveal Animations (Global)
**Trigger**: IntersectionObserver API — element enters viewport
**Default State**: `opacity: 0; transform: translateY(30px);`
**Active State**: `opacity: 1; transform: translateY(0); transition: 0.6s ease`
**Delay stagger**: Each child within a grid gets `animation-delay: calc(index * 0.1s)`

**Elements that animate on scroll:**
- Section headings (slide up)
- Feature grid cards (stagger fade-in from bottom)
- Coach cards (stagger from left)
- Camp listing cards (stagger fade-in)
- Stat numbers (count-up animation)
- Timeline blocks (slide in from left)
- Testimonial cards (fade-in)
- Gallery images (fade-in with slight scale)

**Implementation (Vanilla JS):**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

**CSS:**
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
[data-reveal-delay="1"] { transition-delay: 0.1s; }
[data-reveal-delay="2"] { transition-delay: 0.2s; }
[data-reveal-delay="3"] { transition-delay: 0.3s; }
```

---

### 1.2 Hero Stats Counter Animation
**Trigger**: When stats section enters viewport (IntersectionObserver)
**Behavior**: Numbers count up from 0 to target value over 2 seconds with easing

**Implementation:**
```javascript
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
// HTML: <span class="stat-number" data-count="500" data-suffix="+">0</span>
```

---

### 1.3 Hero Background Video / Parallax
**Type**: Looping HTML5 video OR CSS background-attachment: fixed (parallax)
**Video attributes**: `autoplay muted loop playsinline`
**Fallback**: Static Unsplash image as poster attribute
**Overlay**: `::before` pseudo-element with `background: rgba(0,0,0,0.6)`

---

### 1.4 Navigation Sticky + Scroll Shadow
**Trigger**: `window.addEventListener('scroll', ...)`
**Threshold**: When `scrollY > 48px` (after announcement bar height)
**Behavior**: Header gains `class="scrolled"` which adds `box-shadow: 0 2px 20px rgba(0,0,0,0.3)`

```javascript
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 48);
}, { passive: true });
```

---

### 1.5 Horizontal Infinite Ticker / Marquee
**Type**: CSS-only infinite marquee (no JS needed)
**Implementation:**
```css
.ticker-track {
  display: flex;
  gap: 40px;
  animation: marquee 40s linear infinite;
  white-space: nowrap;
}
.ticker-track:hover { animation-play-state: paused; }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```
**Note**: Duplicate the content list so the loop is seamless.

---

### 1.6 Button Hover Micro-animations
**Yellow CTA Button:**
```css
.btn-primary {
  background: #F5C842;
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(245, 200, 66, 0.3);
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: #D4A800;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 200, 66, 0.5);
}
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(245, 200, 66, 0.3);
}
```

**Outline Button:**
```css
.btn-outline:hover {
  background: #F5C842;
  border-color: #F5C842;
  color: #111;
}
```

---

### 1.7 Camp Card Hover Effect
```css
.camp-card {
  transform: translateY(0);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.25s ease;
}
.camp-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}
```

---

### 1.8 Gallery Image Hover Effect
```css
.gallery-item {
  overflow: hidden;
  border-radius: 8px;
}
.gallery-item img {
  transition: transform 0.4s ease;
}
.gallery-item:hover img {
  transform: scale(1.06);
}
```

---

### 1.9 FAQ Accordion Animation
**Behavior**: Click on question → smoothly reveals answer, rotates "+" to "−"
```javascript
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');
    
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });
    
    // Open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
```
```css
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.faq-item.open .faq-icon { transform: rotate(45deg); }
.faq-icon { transition: transform 0.3s ease; }
```

---

### 1.10 Timeline/Schedule Accordion
**Same behavior as FAQ accordion above**, applied to `.timeline-block` elements.
Each block has a time badge, title, and expandable description body.

---

### 1.11 Modal Open/Close Animation
```css
.modal-overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.modal-overlay.active {
  opacity: 1;
  pointer-events: all;
}
.modal-card {
  transform: scale(0.9) translateY(20px);
  transition: transform 0.3s ease;
}
.modal-overlay.active .modal-card {
  transform: scale(1) translateY(0);
}
```
```javascript
// Open modal
document.getElementById('open-register-modal').addEventListener('click', () => {
  document.getElementById('register-modal').classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
});
// Close modal
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.getElementById('register-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});
function closeModal() {
  document.getElementById('register-modal').classList.remove('active');
  document.body.style.overflow = '';
}
// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
```

---

### 1.12 Sticky Bottom Bar (Camp Detail Page)
**Trigger**: Bar appears when user scrolls past the main booking sidebar
**Hide condition**: Bar hides when user reaches the footer

```javascript
const bookingBox = document.querySelector('.booking-box');
const stickyBar = document.querySelector('.sticky-booking-bar');
const footer = document.querySelector('.site-footer');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.target === bookingBox) {
      stickyBar.classList.toggle('visible', !entry.isIntersecting);
    }
    if (entry.target === footer) {
      if (entry.isIntersecting) stickyBar.classList.remove('visible');
    }
  });
}, { threshold: 0 });

observer.observe(bookingBox);
observer.observe(footer);
```
```css
.sticky-booking-bar {
  position: fixed;
  bottom: -80px;
  left: 0; right: 0;
  height: 72px;
  background: #111;
  transition: bottom 0.3s ease;
  z-index: 900;
}
.sticky-booking-bar.visible { bottom: 0; }
```

---

### 1.13 State Cards Hover Effect
```css
.state-card {
  border: 2px solid transparent;
  transition: all 0.2s ease;
}
.state-card:hover {
  border-color: #F5C842;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(245, 200, 66, 0.2);
}
```

---

### 1.14 Coach Card Hover
```css
.coach-card {
  transition: all 0.25s ease;
}
.coach-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.12);
}
.coach-card img {
  transition: transform 0.4s ease;
}
.coach-card:hover img {
  transform: scale(1.04);
}
```

---

## 🗂️ SECTION 2: NAVIGATION & ROUTING

### 2.1 Mobile Hamburger Menu
**Toggle**: Click hamburger icon → mobile nav overlay slides down
```css
.mobile-nav {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.mobile-nav.open { max-height: 400px; }
```
```javascript
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
  document.querySelector('.mobile-nav').classList.toggle('open');
  // Toggle icon: ☰ ↔ ✕
});
```
**Behavior**: Close mobile nav on any link click or outside click.

---

### 2.2 Active Nav State
Active page link gets `class="active"` → yellow color + underline indicator
```css
.main-nav a.active {
  color: #F5C842;
  position: relative;
}
.main-nav a.active::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0; right: 0;
  height: 2px;
  background: #F5C842;
}
```

---

### 2.3 Camp Detail Page Routing (Static HTML Approach)
For the local replica, individual camp pages are static `.html` files.
URL pattern: `/camps/camp-scottsdale-sep-13.html`
Slugs are generated: `[level]-[city]-[state]-[date].html`

---

### 2.4 "Back to All Camps" Breadcrumb
All camp detail pages show:
```html
<nav class="breadcrumb">
  <a href="/">Home</a> / <a href="/camps/">Camps</a> / <span>Scottsdale, AZ</span>
</nav>
```

---

### 2.5 Smooth Scroll
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

---

## 📝 SECTION 3: FORMS & VALIDATION

### 3.1 All Form Validation Rules (Universal)
```javascript
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const value = field.value.trim();
    const errorEl = field.nextElementSibling;
    
    if (!value) {
      showError(field, 'This field is required');
      valid = false;
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showError(field, 'Please enter a valid email address');
      valid = false;
    } else if (field.type === 'tel' && !/^\+?[\d\s\-()]{7,}$/.test(value)) {
      showError(field, 'Please enter a valid phone number');
      valid = false;
    } else {
      clearError(field);
    }
  });
  return valid;
}

function showError(field, message) {
  field.classList.add('error');
  let err = field.parentNode.querySelector('.field-error');
  if (!err) { err = document.createElement('span'); err.className = 'field-error'; field.parentNode.appendChild(err); }
  err.textContent = message;
}

function clearError(field) {
  field.classList.remove('error');
  field.parentNode.querySelector('.field-error')?.remove();
}
```

**CSS for error state:**
```css
.field-error {
  color: #EF4444;
  font-size: 12px;
  display: block;
  margin-top: 4px;
}
input.error, select.error, textarea.error {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
}
```

---

### 3.2 Contact Page Tab Switching
```javascript
const tabs = document.querySelectorAll('.contact-tab');
const panels = document.querySelectorAll('.form-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.panel).classList.add('active');
  });
});
```

---

### 3.3 Registration Modal Form Submit
```javascript
document.querySelector('#registration-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm(e.target)) return;
  
  const btn = e.target.querySelector('[type="submit"]');
  btn.textContent = 'Processing...';
  btn.disabled = true;
  
  // Simulate async submission (replace with real API)
  setTimeout(() => {
    document.querySelector('.modal-form-area').innerHTML = `
      <div class="success-state">
        <div class="success-icon">✅</div>
        <h3>You're Registered!</h3>
        <p>Check your email for confirmation. See you at the camp!</p>
      </div>
    `;
  }, 1500);
});
```

---

### 3.4 Footer Newsletter Form
```javascript
document.querySelector('#newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('[type="email"]').value;
  if (!email) return;
  e.target.innerHTML = '<p class="success-text">✅ You\'re subscribed!</p>';
});
```

---

## 🔍 SECTION 4: DYNAMIC CAMP FILTERING SYSTEM

### 4.1 Filter Architecture
**Data Structure**: Camp data stored as a JavaScript array of objects (simulating a database)

```javascript
const campsData = [
  {
    id: 'camp-001',
    slug: 'beginner-scottsdale-az-sep-13',
    title: 'Beginner Camp — Scottsdale, AZ',
    date: '2025-09-13',
    dateDisplay: 'Saturday, September 13, 2025',
    time: '12:00 PM – 4:00 PM',
    city: 'Scottsdale',
    state: 'Arizona',
    stateCode: 'AZ',
    coach: 'Mark Ianni',
    coachId: 'coach-mark',
    level: 'beginner',
    type: 'beginner',
    price: 197,
    seats: 8,
    seatsLeft: 2,
    status: 'limited', // 'available' | 'limited' | 'sold-out'
  },
  // ... 20–30 more camp objects
];
```

### 4.2 Filter Logic
```javascript
function filterCamps() {
  const state = document.getElementById('filter-state').value;
  const coach = document.getElementById('filter-coach').value;
  const level = document.getElementById('filter-level').value;
  const month = document.getElementById('filter-month').value;
  const sort = document.getElementById('filter-sort').value;

  let filtered = campsData.filter(camp => {
    return (!state || camp.state === state) &&
           (!coach || camp.coachId === coach) &&
           (!level || camp.level === level) &&
           (!month || new Date(camp.date).getMonth() + 1 === parseInt(month));
  });

  // Sort
  if (sort === 'date-asc') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sort === 'date-desc') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);

  renderCamps(filtered);
}

// Bind all filter dropdowns
document.querySelectorAll('.filter-select').forEach(select => {
  select.addEventListener('change', filterCamps);
});
document.getElementById('clear-filters').addEventListener('click', () => {
  document.querySelectorAll('.filter-select').forEach(s => s.value = '');
  filterCamps();
});
```

### 4.3 Camp Card Renderer
```javascript
function renderCamps(camps) {
  const grid = document.getElementById('camps-grid');
  
  if (camps.length === 0) {
    grid.innerHTML = `<div class="no-results"><p>No camps match your filters.</p><button onclick="clearFilters()">Clear Filters</button></div>`;
    return;
  }

  grid.innerHTML = camps.map(camp => `
    <div class="camp-card ${camp.status}" data-reveal>
      <div class="camp-card-badges">
        <span class="status-badge ${camp.status}">
          ${camp.status === 'available' ? '✓ Available' : 
            camp.status === 'limited' ? `⚠ ${camp.seatsLeft} Seats Left` : 
            '✗ Sold Out'}
        </span>
        <span class="level-badge">${camp.level}</span>
      </div>
      <div class="camp-card-body">
        <p class="camp-date">${camp.dateDisplay}</p>
        <p class="camp-time">${camp.time}</p>
        <h3>${camp.city}, ${camp.stateCode}</h3>
        <div class="camp-coach">
          <img src="https://i.pravatar.cc/48?u=${camp.coachId}" alt="${camp.coach}" />
          <span>${camp.coach}</span>
        </div>
        <p class="camp-price">$${camp.price}</p>
      </div>
      <div class="camp-card-footer">
        <a href="/camps/${camp.slug}.html" 
           class="btn btn-primary btn-full ${camp.status === 'sold-out' ? 'btn-disabled' : ''}">
          ${camp.status === 'sold-out' ? 'JOIN WAITLIST' : 'REGISTER NOW'}
        </a>
      </div>
    </div>
  `).join('');
  
  // Re-apply scroll reveal to newly rendered cards
  initScrollReveal();
}
```

---

## 💬 SECTION 5: TESTIMONIALS & SOCIAL PROOF

### 5.1 Video Testimonial Play Button
```javascript
document.querySelectorAll('.video-testimonial').forEach(card => {
  card.querySelector('.play-btn').addEventListener('click', () => {
    const videoId = card.dataset.videoId;
    card.querySelector('.video-thumbnail').innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
        frameborder="0" 
        allowfullscreen
        allow="autoplay">
      </iframe>
    `;
  });
});
```

### 5.2 Mobile Testimonial Carousel (optional)
On mobile (`< 768px`), testimonial cards switch to a horizontal scroll snap:
```css
@media (max-width: 767px) {
  .testimonials-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 16px;
  }
  .testimonial-card {
    min-width: 85%;
    scroll-snap-align: start;
  }
}
```

### 5.3 Star Rating Rendering
```javascript
function renderStars(rating = 5) {
  return Array.from({ length: 5 }, (_, i) => 
    `<span class="star ${i < rating ? 'filled' : ''}">★</span>`
  ).join('');
}
```

---

## 🖥️ SECTION 6: RESPONSIVE BEHAVIORS

### 6.1 Mobile Nav
- **< 768px**: Show hamburger icon, hide desktop nav links and CTA button
- Nav opens as full-width dropdown below header
- All links in nav are full-width, 48px touch targets
- Backdrop overlay dims content behind open nav

### 6.2 Hero Section Mobile
- Font size scales: `clamp(48px, 8vw, 96px)` for H1
- Stats row stacks into 3×1 column on mobile
- Video section hidden on very small screens (< 480px), shows poster image

### 6.3 Card Grids
```css
.camp-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1023px) { .camp-cards-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px)  { .camp-cards-grid { grid-template-columns: 1fr; } }
```

### 6.4 Camp Detail Layout
```css
.camp-detail-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 48px;
}
@media (max-width: 1023px) {
  .camp-detail-layout {
    grid-template-columns: 1fr;
  }
  .booking-box {
    position: static; /* no sticky sidebar on mobile */
    order: -1; /* booking box moves to top on mobile */
  }
}
```

### 6.5 Footer Mobile
```css
.footer-grid {
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 767px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
```

### 6.6 Filter Bar Mobile
On mobile, filter dropdowns stack vertically into a 2×3 grid instead of a horizontal row.

---

## 🔒 SECTION 7: BUSINESS LOGIC & FEATURES

### 7.1 Camp Status Logic
```javascript
function getCampStatus(camp) {
  if (camp.seatsLeft === 0) return 'sold-out';
  if (camp.seatsLeft <= 2) return 'limited';
  return 'available';
}

function getStatusBadge(status, seatsLeft) {
  const map = {
    'available':  { text: 'Available', color: '#22C55E' },
    'limited':    { text: `${seatsLeft} Seat${seatsLeft === 1 ? '' : 's'} Left`, color: '#F59E0B' },
    'sold-out':   { text: 'Sold Out', color: '#EF4444' },
  };
  return map[status];
}
```

### 7.2 Register Button State
```javascript
// On camp detail page load
function initBookingBox(camp) {
  const btn = document.getElementById('register-btn');
  if (camp.status === 'sold-out') {
    btn.textContent = 'Join Waitlist';
    btn.classList.add('btn-outline');
    btn.classList.remove('btn-primary');
    // Opens waitlist modal instead of registration modal
  }
  if (camp.status === 'limited') {
    document.querySelector('.urgency-bar').style.display = 'block';
    document.querySelector('.urgency-bar .seats-count').textContent = camp.seatsLeft;
  }
}
```

### 7.3 Booking Flow (Registration Modal Submit)
**Step 1**: User clicks "Register Now" → modal opens
**Step 2**: User fills name, email, phone → validates on submit
**Step 3**: Submit → loading spinner → success state
**Step 4**: Success state shows confirmation message + "Check your email"
**Note**: For local replica, this is simulated with `setTimeout`. Real implementation would POST to a backend API or integrate with a payment processor (Stripe) and CRM (Klaviyo/ConvertKit).

### 7.4 Email Newsletter Form
**Step 1**: User enters email → validates
**Step 2**: Submit → form replaced with "✅ You're subscribed!" message
**Note**: Real implementation connects to Mailchimp/Klaviyo API.

### 7.5 Waitlist Form (Contact Page)
Same behavior as newsletter form but collects more fields. Success triggers a full-page success message within the form area.

---

## 🗺️ SECTION 8: SEO & META IMPLEMENTATION

### 8.1 HTML Head Template (All Pages)
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Page Title] | [Brand Name]</title>
  <meta name="description" content="[150-char page description]" />
  <link rel="canonical" href="https://[yourdomain].com/[page-slug]/" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="[Page Title]" />
  <meta property="og:description" content="[Description]" />
  <meta property="og:image" content="https://[yourdomain].com/og-image.jpg" />
  <meta property="og:url" content="https://[yourdomain].com/[page-slug]/" />
  <meta property="og:type" content="website" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Page Title]" />
  <meta name="twitter:image" content="https://[yourdomain].com/og-image.jpg" />
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  
  <!-- CSS -->
  <link rel="stylesheet" href="/css/style.css" />
</head>
```

### 8.2 Camp Detail Page Schema Markup
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Beginner Pickleball Camp — Scottsdale, AZ",
  "startDate": "2025-09-13T12:00:00",
  "endDate": "2025-09-13T16:00:00",
  "location": {
    "@type": "Place",
    "name": "Scottsdale Sports Complex",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9876 E Greenway Rd",
      "addressLocality": "Scottsdale",
      "addressRegion": "AZ",
      "postalCode": "85260",
      "addressCountry": "US"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "197",
    "priceCurrency": "USD",
    "availability": "https://schema.org/LimitedAvailability"
  },
  "organizer": {
    "@type": "Organization",
    "name": "[Brand Name]"
  }
}
</script>
```

---

## 📁 SECTION 9: FILE / FOLDER STRUCTURE (LOCAL REPLICA)

```
/pickleball-camp-replica/
│
├── index.html                   ← Homepage
├── camps/
│   ├── index.html               ← Camps catalog
│   ├── camp-scottsdale-sep-13.html   ← Camp detail page
│   └── [more camp pages...]
├── states/
│   └── index.html               ← States grid
├── contact-us/
│   └── index.html               ← Contact page
│
├── css/
│   ├── style.css                ← Global styles + design system
│   ├── components.css           ← Reusable components (cards, buttons, forms)
│   └── pages/
│       ├── home.css             ← Homepage-specific
│       ├── camps.css            ← Camps page-specific
│       └── camp-detail.css      ← Detail page + sticky sidebar
│
├── js/
│   ├── main.js                  ← Global JS (nav, scroll, animations)
│   ├── camps-data.js            ← Mock camp data array
│   ├── camps-filter.js          ← Filter + render logic
│   ├── camp-detail.js           ← Detail page logic (modal, sticky bar, accordion)
│   └── utils.js                 ← Shared utilities (counter, validate, etc.)
│
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── guarantee-seal.svg
│   │   └── og-image.jpg
│   └── icons/
│       └── [svg icons]
│
└── README.md                    ← Setup and usage notes
```

---

## ⚠️ SECTION 10: IMPLEMENTATION NOTES & GOTCHAS

1. **No Framework Needed**: This entire site can be built with vanilla HTML/CSS/JS. No React, no build step needed for the replica.
2. **Camp Data as JS Array**: Treat `camps-data.js` as the "database." Filter logic reads from this. Easy to add/edit camps.
3. **Sticky Sidebar**: Use `position: sticky; top: 100px;` on `.booking-box`. This only works if parent container doesn't have `overflow: hidden`.
4. **Infinite Marquee**: Must duplicate the state list content so the loop is seamless. The animation moves `-50%` of total width.
5. **Video Autoplay**: Some browsers block autoplay with sound. Always use `muted` attribute. Add a "tap for sound" UX element.
6. **Counter Animation**: Only trigger once (use `observer.unobserve(entry.target)` after triggering).
7. **Form Submissions**: In local mode, simulate with `setTimeout`. Add `console.log` of form data for testing.
8. **Modal Scroll Lock**: Always pair modal open with `document.body.style.overflow = 'hidden'` to prevent background scrolling.
9. **Mobile Testing**: Use Chrome DevTools device toolbar. Test at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad).
10. **Font Loading**: Use `font-display: swap` to prevent invisible text during font load. Pre-connect to Google Fonts in `<head>`.
