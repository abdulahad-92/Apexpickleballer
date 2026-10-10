// ============================================================
// src/types/index.ts
// Central TypeScript types — MongoDB-ready (swap id → _id later)
// ============================================================

export type CampStatus = 'available' | 'limited' | 'sold-out';
export type CampLevel = 'beginner' | 'intermediate' | 'all-levels';

export interface Camp {
  id: string;
  slug: string;
  title: string;
  date: string;
  dateDisplay: string;
  time: string;
  month: number;
  city: string;
  state: string;
  stateCode: string;
  venueName: string;
  venueAddress: string;
  venueType: string;
  coachId: string;
  level: CampLevel;
  ageGroup: string;
  price: number;
  currency?: string;
  country?: string;
  parking?: string;
  seats: number;
  seatsLeft: number;
  status: CampStatus;
  featured: boolean;
  createdAt: string;
  category?: 'women' | 'senior' | 'standard';
  youtubeId?: string;
  lessonPlan?: LessonSegment[];
  gallery?: string[];
}

export interface LessonSegment {
  time: string;
  title: string;
  description: string;
}

export interface Coach {
  id: string;
  slug: string;
  name: string;
  photo: string;
  gender: 'male' | 'female';
  badges: string[];
  bio: string;
  shortBio: string;
  experience: number;
  states: string[];
  rating: number;
  campsRun: number;
  specialties: string[];
  certifications: string[];
  youtubeId?: string;
  womenOnly?: boolean;
  phone?: string;
  email?: string;
  featured?: boolean;
}

export interface StateEntry {
  code: string;
  name: string;
  campCount: number;
  slug: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  rating: number;
  quote: string;
  videoId?: string;
  campLevel: CampLevel;
  location?: string;
}

export interface FaqQuestion {
  id: string;
  q: string;
  a: string;
}

export interface FaqCategory {
  category: string;
  questions: FaqQuestion[];
}

export interface CartItem {
  campId: string;
  campSlug: string;
  campTitle: string;
  campDate: string;
  campCity: string;
  campState: string;
  price: number;
  quantity: number;
  level: CampLevel;
}

export interface FilterOptions {
  state?: string;
  coachId?: string;
  level?: CampLevel | '';
  month?: number | '';
  sort?: 'date-asc' | 'date-desc' | 'price-asc';
  category?: 'women' | 'senior' | '';
}
