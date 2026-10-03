import type { Metadata } from 'next';
import siteContent from '@/content/site.content.json';
import faqData from '@/lib/db/faq.json';
import FaqClient from './FaqClient';

const { seo, faq } = siteContent;

export const metadata: Metadata = {
  title: seo.faq.title,
  description: seo.faq.description,
};

export default function FaqPage() {
  return <FaqClient faqData={faqData} hero={faq.pageHero} cta={faq.ctaSection} />;
}
