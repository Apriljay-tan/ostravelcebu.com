"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const trustPoints = [
  {
    icon: 'bi-patch-check-fill',
    title: 'Registered Travel Agency',
    text: "O's Travel and Tours Services is a duly registered travel and tours business operating in Cebu City, Philippines.",
  },
  {
    icon: 'bi-people-fill',
    title: 'Real Local Team',
    text: 'A Cebu-based team with professional guides and drivers who know every destination we offer first-hand.',
  },
  {
    icon: 'bi-shield-lock-fill',
    title: 'Safe & Transparent',
    text: 'Clear inclusions, exclusions, and pricing on every package — no hidden charges, ever.',
  },
  {
    icon: 'bi-chat-heart-fill',
    title: 'Verified Happy Guests',
    text: 'Hundreds of guests have toured Cebu, Moalboal, Oslob, and Bohol with us. See their photos and reviews.',
  },
];

const documents = [
  {
    img: '/assets/img/legitimacy/DTI_cert.jpg',
    title: 'DTI Certificate of Business Name Registration',
  },
  {
    img: '/assets/img/legitimacy/TOURISM_CERTIFICATE.jpg',
    title: 'Tourism Certificate',
  },
  {
    img: '/assets/img/legitimacy/BARANGAY_CLEARANCE.jpg',
    title: 'Barangay Clearance',
  },
  {
    img: '/assets/img/legitimacy/owner_id.jpg',
    title: "Owner's Valid ID",
  },
  {
    img: '/assets/img/legitimacy/DL_owner.jpg',
    title: "Owner's Driver's License",
  },
];

const Legitimacy = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + documents.length) % documents.length));
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % documents.length));
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const activeDoc = activeIndex !== null ? documents[activeIndex] : null;

  return (
    <section className="os-legitimacy section-padding fix">
      <div className="container">
        <div className="section-title text-center mb-5">
          <span className="sub-title" style={{ color: 'var(--theme)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Why You Can Trust Us
          </span>
          <h2 style={{ color: 'var(--header)', marginTop: '8px' }}>Legitimacy Corner</h2>
          <p style={{ maxWidth: '720px', margin: '14px auto 0', color: 'var(--text)' }}>
            We believe trust is earned through transparency. Below is everything that shows
            O&apos;s Travel and Tours Services is a legitimate, locally-operated travel agency
            based in Talamban, Cebu City.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {trustPoints.map((point, i) => (
            <div className="col-lg-3 col-md-6" key={i}>
              <div className="os-trust-card">
                <div className="os-trust-icon">
                  <i className={`bi ${point.icon}`}></i>
                </div>
                <h4>{point.title}</h4>
                <p>{point.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title text-center mb-4">
          <h3 style={{ color: 'var(--header)' }}>Our Credentials &amp; Permits</h3>
          <p style={{ color: 'var(--text)' }}>
            Official documents that prove our legitimacy. Click any document to view it full size.
          </p>
        </div>
        <div className="row g-4 justify-content-center">
          {documents.map((doc, i) => (
            <div className="col-lg-4 col-md-6" key={doc.img}>
              <button
                type="button"
                className="os-doc-card os-doc-card-btn"
                onClick={() => setActiveIndex(i)}
                aria-label={`View ${doc.title}`}
              >
                <div className="os-doc-img">
                  <Image
                    src={doc.img}
                    alt={doc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="os-doc-thumb"
                  />
                  <span className="os-doc-badge">
                    <i className="bi bi-patch-check-fill"></i> Verified
                  </span>
                  <span className="os-doc-zoom">
                    <i className="bi bi-zoom-in"></i> Click to enlarge
                  </span>
                </div>
                <h5>{doc.title}</h5>
              </button>
            </div>
          ))}
        </div>

        <div className="os-legit-cta text-center">
          <h3>Have questions before you book?</h3>
          <p>
            We&apos;re always happy to show our documents and answer any concern. Reach out to us
            anytime — we want you to feel 100% safe traveling with us.
          </p>
          <Link href="/contact" className="theme-btn">
            Talk To Us <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>

      {activeDoc && activeIndex !== null && (
        <div
          className="os-doc-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activeDoc.title}
        >
          <div className="os-doc-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="os-doc-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {documents.length > 1 && (
              <button
                type="button"
                className="os-doc-lightbox-nav os-doc-lightbox-prev"
                onClick={showPrev}
                aria-label="Previous document"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            )}

            <div className="os-doc-lightbox-img-wrap">
              <Image
                src={activeDoc.img}
                alt={activeDoc.title}
                width={1200}
                height={1600}
                className="os-doc-lightbox-img"
                priority
              />
            </div>

            {documents.length > 1 && (
              <button
                type="button"
                className="os-doc-lightbox-nav os-doc-lightbox-next"
                onClick={showNext}
                aria-label="Next document"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            )}

            <div className="os-doc-lightbox-caption">
              <h4>{activeDoc.title}</h4>
              <p>
                {activeIndex + 1} of {documents.length} — use arrow keys or buttons to browse
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Legitimacy;
