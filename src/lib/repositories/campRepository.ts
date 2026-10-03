// ============================================================
// src/lib/repositories/campRepository.ts
// Repository pattern — swap this file to use MongoDB later.
// The API surface (findAll, findBySlug, findFeatured) stays
// identical regardless of the underlying data source.
// ============================================================

import type { Camp, FilterOptions } from '@/types';
import campsData from '../db/camps.json';

const camps: Camp[] = campsData as Camp[];

function applyFilters(data: Camp[], filters: FilterOptions = {}): Camp[] {
  let result = [...data];

  if (filters.state) {
    result = result.filter((c) => c.state === filters.state);
  }
  if (filters.coachId) {
    result = result.filter((c) => c.coachId === filters.coachId);
  }
  if (filters.level) {
    result = result.filter((c) => c.level === filters.level);
  }
  if (filters.month) {
    result = result.filter((c) => c.month === Number(filters.month));
  }

  // Sort
  const sort = filters.sort ?? 'date-asc';
  if (sort === 'date-asc') {
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } else if (sort === 'date-desc') {
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  }

  return result;
}

export const campRepository = {
  async findAll(filters: FilterOptions = {}): Promise<Camp[]> {
    // TODO (MongoDB): return Camp.find(buildMongoQuery(filters)).sort(buildSort(filters))
    return applyFilters(camps, filters);
  },

  async findBySlug(slug: string): Promise<Camp | null> {
    // TODO (MongoDB): return Camp.findOne({ slug })
    return camps.find((c) => c.slug === slug) ?? null;
  },

  async findFeatured(): Promise<Camp[]> {
    // TODO (MongoDB): return Camp.find({ featured: true }).limit(3)
    return camps.filter((c) => c.featured).slice(0, 3);
  },

  async findByState(state: string): Promise<Camp[]> {
    // TODO (MongoDB): return Camp.find({ state })
    return camps.filter((c) => c.state === state);
  },
};
