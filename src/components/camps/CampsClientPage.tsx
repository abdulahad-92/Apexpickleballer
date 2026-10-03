'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Camp } from '@/types';
import styles from './CampsClientPage.module.css';

const statusConfig = {
  available:  { label: '✓ Available',   cls: 'badge--available' },
  limited:    { label: '⚠ Limited',      cls: 'badge--limited' },
  'sold-out': { label: '✗ Sold Out',    cls: 'badge--sold-out' },
};

const coaches: Record<string, { name: string; photo: string }> = {
  'coach-cris':  { name: "Coach Cris Abegão", photo: '/images/coach-cris.jpeg' },
  'coach-sarah': { name: 'Coach Sarah R.', photo: 'https://i.pravatar.cc/48?img=25' },
  'coach-james': { name: 'Coach James T.', photo: 'https://i.pravatar.cc/48?img=67' },
};

const months = [
  { val: '', label: 'All Months' },
  { val: '10', label: 'October' },
  { val: '11', label: 'November' },
  { val: '12', label: 'December' },
];
const levels = [
  { val: '', label: 'All Levels' },
  { val: 'beginner', label: 'Beginner (Consistency & Confidence)' },
  { val: 'intermediate', label: 'Intermediate (Level 3.0–4.0)' },
];
const sorts = [
  { val: 'date-asc',  label: 'Date (Earliest First)' },
  { val: 'date-desc', label: 'Date (Latest First)' },
  { val: 'price-asc', label: 'Price (Low to High)' },
];

interface Filters {
  state: string;
  coachId: string;
  level: string;
  month: string;
  sort: string;
}

export default function CampsClientPage({ initialCamps }: { initialCamps: Camp[] }) {
  const allStates = Array.from(new Set(initialCamps.map((c) => c.state))).sort();
  const allCoaches = [
    { id: 'coach-cris', name: "Coach Cris Abegão" },
    { id: 'coach-sarah', name: 'Coach Sarah R.' },
    { id: 'coach-james', name: 'Coach James T.' },
  ];

  const [filters, setFilters] = useState<Filters>({
    state: '', coachId: '', level: '', month: '', sort: 'date-asc',
  });
  const [camps, setCamps] = useState<Camp[]>(initialCamps);

  useEffect(() => {
    let result = [...initialCamps];
    if (filters.state)   result = result.filter((c) => c.state === filters.state);
    if (filters.coachId) result = result.filter((c) => c.coachId === filters.coachId);
    if (filters.level)   result = result.filter((c) => c.level === filters.level);
    if (filters.month)   result = result.filter((c) => c.month === parseInt(filters.month));
    if (filters.sort === 'date-asc')  result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (filters.sort === 'date-desc') result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    setCamps(result);
  }, [filters, initialCamps]);

  const set = (key: keyof Filters) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((f) => ({ ...f, [key]: e.target.value }));

  const clearFilters = () => setFilters({ state: '', coachId: '', level: '', month: '', sort: 'date-asc' });
  const hasFilters = Object.entries(filters).some(([k, v]) => k !== 'sort' && v !== '');

  return (
    <>
      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={`container ${styles.filterInner}`}>
          <div className={styles.selectGroup}>
            <select className={styles.filterSelect} value={filters.state} onChange={set('state')}>
              <option value="">ALL STATES</option>
              {allStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>

          <div className={styles.selectGroup}>
            <select className={styles.filterSelect} value={filters.coachId} onChange={set('coachId')}>
              <option value="">ALL COACHES</option>
              {allCoaches.map(c => <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>)}
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>

          <div className={styles.selectGroup}>
            <select className={styles.filterSelect} defaultValue="">
              <option value="">ALL TYPES</option>
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>

          <div className={styles.selectGroup}>
            <select className={styles.filterSelect} value={filters.month} onChange={set('month')}>
              <option value="">ALL MONTHS</option>
              {months.slice(1).map(m => <option key={m.val} value={m.val}>{m.label.toUpperCase()}</option>)}
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>

          <div className={styles.selectGroup}>
            <select className={styles.filterSelect} value={filters.level} onChange={set('level')}>
              <option value="">ALL SKILL LEVELS</option>
              {levels.slice(1).map(l => <option key={l.val} value={l.val}>{l.label.toUpperCase()}</option>)}
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>

          <div className={styles.selectGroup}>
            <select className={styles.filterSelect} value={filters.sort} onChange={set('sort')}>
              {sorts.map(s => <option key={s.val} value={s.val}>{s.label.toUpperCase()}</option>)}
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>

          <button className={styles.clearBtn} onClick={clearFilters}>CLEAR FILTERS</button>
        </div>
        <div className={`container`}>
          <p className={styles.resultCountText}>{camps.length} camps found</p>
        </div>
      </div>

      {/* Results */}
      <section className={`section section--light`}>
        <div className="container">
          {camps.length === 0 ? (
            <div className={styles.noResults}>
              <p className={styles.noResultsIcon}>🔍</p>
              <h3>No camps match your filters.</h3>
              <p>Try adjusting your filters or browse all upcoming camps.</p>
              <button className="btn btn--primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className={styles.grid}>
              {camps.map((camp) => {
                const status = statusConfig[camp.status];
                const coach = coaches[camp.coachId];
                const isSoldOut = camp.status === 'sold-out';
                return (
                  <div key={camp.id} className={styles.card}>
                    <div className={styles.cardTop}>
                      <h3 className={styles.location}>{camp.city.toUpperCase()}, {camp.stateCode}</h3>
                      <p className={styles.levelBadge}>{camp.level.toUpperCase()}</p>
                      <p className={styles.dateText}>{camp.dateDisplay.toUpperCase()}</p>
                      <div className={styles.tornEdge}></div>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.date}>{camp.dateDisplay}</p>
                      <p className={styles.time}>{camp.time}</p>
                      <h3 className={styles.location}>{camp.city}, {camp.stateCode}</h3>
                      {coach && (
                        <div className={styles.coachRow}>
                          <div className={styles.coachAvatar}>
                            <Image src={coach.photo} alt={coach.name} width={36} height={36} unoptimized />
                          </div>
                          <span className={styles.coachName}>{coach.name}</span>
                        </div>
                      )}
                      <p className={styles.price}>${camp.price} CAD</p>
                    </div>
                    <div className={styles.cardFooter}>
                      <Link
                        href={`/camps/${camp.slug}`}
                        className={`btn btn--primary btn--full ${isSoldOut ? 'btn--disabled' : ''}`}
                      >
                        {isSoldOut ? 'Clinic Full (8/8)' : 'Reserve Your Spot →'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
