'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import siteContent from '@/content/site.content.json';
import PaddleLogo from '@/components/common/PaddleLogo';

const { nav, brand } = siteContent;


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoEmblem}>
            <PaddleLogo size={36} />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>{brand.name}</span>
            <span className={styles.logoTagline}>{brand.tagline}</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {nav.links.map((link) => (
            <div key={link.label} className={styles.navItem}>
              {link.items ? (
                <div className={styles.dropdownContainer}>
                  <button className={`${styles.navLink} ${styles.dropdownTrigger}`}>
                    {link.label}
                  </button>
                  <div className={styles.dropdownMenu}>
                    {link.items.map(subItem => (
                      <Link 
                        key={subItem.href} 
                        href={subItem.href}
                        className={styles.dropdownItem}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href!}
                  className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <Link href={nav.ctaHref} className={`btn btn--primary ${styles.ctaBtn}`}>
          {nav.ctaLabel}
        </Link>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar1} ${menuOpen ? styles.open1 : ''}`} />
          <span className={`${styles.bar2} ${menuOpen ? styles.open2 : ''}`} />
          <span className={`${styles.bar3} ${menuOpen ? styles.open3 : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {nav.links.map((link) => (
            <div key={link.label}>
              {link.items ? (
                <>
                  <div className={styles.mobileNavGroupLabel}>{link.label}</div>
                  <div className={styles.mobileNavSubMenu}>
                    {link.items.map(subItem => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`${styles.mobileNavLink} ${styles.mobileSubLink} ${pathname === subItem.href ? styles.active : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href!}
                  className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <Link href={nav.ctaHref} className={`btn btn--primary btn--full ${styles.mobileCta}`}>
            {nav.ctaLabel}
          </Link>
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
