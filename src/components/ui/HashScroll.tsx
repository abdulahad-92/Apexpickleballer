'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Makes deep links such as /#curriculum reliable.
 *
 * On a cold load the browser jumps to the anchor once, but the page keeps
 * changing height afterwards (web fonts, lazy images, WebGL/physics canvases,
 * hydration), so that single jump lands in the wrong place or gets cancelled by
 * the smooth-scroll setting. We re-align a few times while the layout settles,
 * and stop as soon as the visitor scrolls or presses a key themselves.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const getTarget = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
      return id ? document.getElementById(id) : null;
    };

    const align = () => {
      // 'instant' avoids fighting the global `scroll-behavior: smooth` while the page is still shifting.
      getTarget()?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
    };

    if (!window.location.hash) return;

    const timers = [0, 150, 400, 900, 1600, 2600].map((delay) => window.setTimeout(align, delay));

    const stop = () => timers.forEach(window.clearTimeout);
    const stopEvents: (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'keydown', 'mousedown'];
    stopEvents.forEach((evt) => window.addEventListener(evt, stop, { passive: true, once: true }));

    // Same-page hash changes (e.g. editing the URL) should scroll smoothly.
    const onHashChange = () => getTarget()?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.addEventListener('hashchange', onHashChange);

    return () => {
      stop();
      stopEvents.forEach((evt) => window.removeEventListener(evt, stop));
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [pathname]);

  return null;
}
