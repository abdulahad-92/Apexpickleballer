import type { Coach } from '@/types';
import coachesData from '../db/coaches.json';

const coaches: Coach[] = coachesData as Coach[];

export const coachRepository = {
  async findAll(): Promise<Coach[]> {
    // TODO (MongoDB): return Coach.find()
    return coaches;
  },

  async findById(id: string): Promise<Coach | null> {
    // TODO (MongoDB): return Coach.findById(id)
    return coaches.find((c) => c.id === id) ?? null;
  },
};
