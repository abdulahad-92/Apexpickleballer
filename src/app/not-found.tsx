import Link from 'next/link';
import PaddleLogo from '@/components/common/PaddleLogo';

export default function NotFound() {
  return (
    <section className="section section--light" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <PaddleLogo size={72} />
        </div>
        <h1 style={{ marginTop: '24px', marginBottom: '16px' }}>Page Not Found</h1>
        <p style={{ color: 'var(--clr-text-secondary)', fontSize: '18px', marginBottom: '32px' }}>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s find you a camp instead.
        </p>
        <Link href="/camps" className="btn btn--primary btn--lg">Browse All Camps →</Link>
      </div>
    </section>
  );
}
