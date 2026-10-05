import type { Metadata } from 'next';
import '@/styles/globals.css';
import UrgencyBar from '@/components/layout/UrgencyBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollRevealInit from '@/components/ui/ScrollRevealInit';
import HashScroll from '@/components/ui/HashScroll';
import siteContent from '@/content/site.content.json';

const { seo, brand } = siteContent;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: seo.home.title,
    template: `%s | ${brand.fullName}`,
  },
  description: seo.home.description,
  keywords: ['pickleball camps', 'pickleball lessons', 'pickleball training'],
  openGraph: {
    type: 'website',
    siteName: brand.fullName,
    images: [{ url: '/images/apex_logo.jpeg' }],
  },
  icons: {
    icon: '/images/apex_logo.jpeg',
    shortcut: '/images/apex_logo.jpeg',
    apple: '/images/apex_logo.jpeg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <UrgencyBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollRevealInit />
        <HashScroll />
      </body>
    </html>
  );
}
