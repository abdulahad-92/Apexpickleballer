import type { Metadata } from 'next';
import { campRepository } from '@/lib/repositories/campRepository';
import HeroSection from '@/components/home/HeroSection';
import MarqueeTicker from '@/components/home/MarqueeTicker';
import SkillLevelCards from '@/components/home/SkillLevelCards';
import UpcomingCamps from '@/components/home/UpcomingCamps';
import WhyCampsWork from '@/components/home/WhyCampsWork';
import BlueprintSteps from '@/components/home/BlueprintSteps';
import AboutSection from '@/components/home/AboutSection';
import PhotoGallery from '@/components/home/PhotoGallery';
import ScheduleAccordion from '@/components/home/ScheduleAccordion';
import VideoTestimonials from '@/components/home/VideoTestimonials';
import CtaBanner from '@/components/home/CtaBanner';
import siteContent from '@/content/site.content.json';

const { seo } = siteContent;

export const metadata: Metadata = {
  title: seo.home.title,
  description: seo.home.description,
};

export default async function HomePage() {
  const camps = await campRepository.findFeatured();

  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <SkillLevelCards />
      <UpcomingCamps camps={camps} />
      <ScheduleAccordion />
      <WhyCampsWork />
      <BlueprintSteps />
      <AboutSection />
      <PhotoGallery />
      <VideoTestimonials />
      <CtaBanner />
    </>
  );
}
