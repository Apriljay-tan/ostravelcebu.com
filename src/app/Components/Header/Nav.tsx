"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: 'bi-house-door-fill' },
  { href: '/tour-packages', label: 'Tour Packages', icon: 'bi-map-fill' },
  { href: '/legitimacy-corner', label: 'Legitimacy Corner', icon: 'bi-patch-check-fill' },
  { href: '/about', label: 'About', icon: 'bi-info-circle-fill' },
  { href: '/happy-guests', label: 'Happy Guests', icon: 'bi-camera-fill' },
  { href: '/contact', label: 'Contact Us', icon: 'bi-envelope-fill' },
];

type NavProps = {
  setMobileToggle: (open: boolean) => void;
  mobileOpen?: boolean;
};

export default function Nav({ setMobileToggle, mobileOpen = false }: NavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <ul className={`cs_nav_list fw-medium ${mobileOpen ? 'os-nav-open' : ''}`}>
      <li className="os-mobile-nav-head">
        <div className="os-mobile-nav-brand">
          <span className="os-mobile-nav-title">Menu</span>
          <span className="os-mobile-nav-sub">O&apos;s Travel &amp; Tours</span>
        </div>
        <button
          type="button"
          className="os-mobile-nav-close"
          onClick={() => setMobileToggle(false)}
          aria-label="Close menu"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </li>

      {navItems.map((item) => (
        <li key={item.href} className={isActive(item.href) ? 'is-active' : ''}>
          <Link href={item.href} onClick={() => setMobileToggle(false)}>
            <i className={`bi ${item.icon} os-nav-icon`} aria-hidden="true"></i>
            {item.label}
          </Link>
        </li>
      ))}

      <li className="os-mobile-nav-cta">
        <Link href="/contact" className="theme-btn os-mobile-quote-btn" onClick={() => setMobileToggle(false)}>
          <span>Request A Quote <i className="bi bi-arrow-right"></i></span>
        </Link>
        <a href="tel:+639334591419" className="os-mobile-call-btn" onClick={() => setMobileToggle(false)}>
          <i className="bi bi-telephone-fill"></i> 0933 459 1419
        </a>
      </li>
    </ul>
  );
}
