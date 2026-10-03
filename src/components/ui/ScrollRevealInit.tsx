'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealInit() {
  const pathname = usePathname();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = document.querySelectorAll('[data-reveal]');
    targets.forEach((el) => observer.observe(el));

    // Counter animation
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset.count || '0', 10);
            const suffix = el.dataset.suffix || '';
            let start = 0;
            const duration = 2000;
            const startTime = performance.now();
            const update = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.floor(eased * target) + suffix;
              if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
