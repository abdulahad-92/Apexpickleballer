import type { StateEntry } from '@/types';
import statesData from '../db/states.json';

// Deduplicate by code (states.json has Arizona twice for demo)
const uniqueMap = new Map<string, StateEntry>();
(statesData as StateEntry[]).forEach((s) => {
  if (!uniqueMap.has(s.code)) uniqueMap.set(s.code, s);
});
const states: StateEntry[] = Array.from(uniqueMap.values()).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export const stateRepository = {
  async findAll(): Promise<StateEntry[]> {
    // TODO (MongoDB): return State.find().sort({ name: 1 })
    return states;
  },

  async findByCode(code: string): Promise<StateEntry | null> {
    // TODO (MongoDB): return State.findOne({ code })
    return states.find((s) => s.code === code) ?? null;
  },

  async findBySlug(slug: string): Promise<StateEntry | null> {
    return states.find((s) => s.slug === slug) ?? null;
  }
};
