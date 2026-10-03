import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { campRepository } from '@/lib/repositories/campRepository';
import { coachRepository } from '@/lib/repositories/coachRepository';
import CampDetailClient from '@/components/camp-detail/CampDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const camp = await campRepository.findBySlug(slug);
  if (!camp) return { title: 'Camp Not Found' };
  return {
    title: camp.title,
    description: `${camp.level} pickleball camp in ${camp.city}, ${camp.stateCode} on ${camp.dateDisplay}. ${camp.seatsLeft} spots left. Register now.`,
  };
}

export default async function CampDetailPage({ params }: Props) {
  const { slug } = await params;
  const camp = await campRepository.findBySlug(slug);
  if (!camp) notFound();

  const coach = await coachRepository.findById(camp.coachId);

  return <CampDetailClient camp={camp} coach={coach} />;
}
