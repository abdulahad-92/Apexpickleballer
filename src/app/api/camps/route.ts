import { NextResponse } from 'next/server';
import { campRepository } from '@/lib/repositories/campRepository';
import type { FilterOptions, CampLevel } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters: FilterOptions = {
    state:   searchParams.get('state')   || undefined,
    coachId: searchParams.get('coachId') || undefined,
    level:   (searchParams.get('level')  as CampLevel) || undefined,
    month:   searchParams.get('month')   ? Number(searchParams.get('month')) : undefined,
    sort:    (searchParams.get('sort') as FilterOptions['sort']) || 'date-asc',
  };
  const camps = await campRepository.findAll(filters);
  return NextResponse.json(camps);
}
