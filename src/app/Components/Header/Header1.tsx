"use client";

import { useEffect, useState } from 'react';
import Nav from './Nav';
import Link from 'next/link';
import Image from 'next/image';

function useMobileMenu() {
  const [mobileToggle, setMobileToggle] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileToggle ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileToggle]);

  return { mobileToggle, setMobileToggle };
}

export default function Header1({ variant }: { variant?: string }) {
  const { mobileToggle, setMobileToggle } = useMobileMenu();
  const [isSticky, setIsSticky] = useState<string>("");
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [searchToggle, setSearchToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        setIsSticky('cs-gescout_sticky');
      } else if (currentScrollPos !== 0) {
        setIsSticky('cs-gescout_show cs-gescout_sticky');
      } else {
        setIsSticky('');
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div>
      {mobileToggle && (
        <button
          type="button"
          className="os-mobile-backdrop"
          onClick={() => setMobileToggle(false)}
          aria-label="Close menu"
        />
      )}

      <header
        className={`cs_site_header header_style_2 header_style_2_0 cs_style_1 header_sticky_style1 ${
          variant ? variant : ''
        } cs_sticky_header cs_site_header_full_width ${
          mobileToggle ? 'cs_mobile_toggle_active' : ''
        } ${isSticky ? isSticky : ''}`}
      >
        <div className="cs_main_header">
          <div className="container-fluid">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" href="/">
                  <Image src="/assets/img/logo/os-logo.png" alt="O's Travel and Tours Services" width={90} height={70} priority />
                </Link>
              </div>
              <div className="cs_main_header_center">
                <div className="cs_nav cs_primary_font fw-medium">
                  <button
                    type="button"
                    className={`cs-munu_toggle os-hamburger ${mobileToggle ? 'cs_teggle_active' : ''}`}
                    onClick={() => setMobileToggle(!mobileToggle)}
                    aria-label={mobileToggle ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileToggle}
                  >
                    <span></span>
                  </button>
                  <Nav setMobileToggle={setMobileToggle} mobileOpen={mobileToggle} />
                </div>
              </div>
              <div className="cs_main_header_right">
                <div className="header-btn d-flex align-items-center">
                  <div className="main-button header-btn-1">
                    <a onClick={() => setSearchToggle(!searchToggle)} className="search-trigger search-icon"><i className="bi bi-search"></i></a>
                    <Link href="/contact" className="theme-btn">
                      <span> Request A Quote <i className="bi bi-arrow-right"></i></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`search-wrap ${searchToggle ? 'active' : ''}`}>
        <div className="search-inner">
          <i onClick={() => setSearchToggle(!searchToggle)} id="search-close" className="bi bi-x-lg search-close"></i>
          <div className="search-cell">
            <form method="get">
              <div className="search-field-holder">
                <input type="search" className="main-search-input" placeholder="Search..." />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
