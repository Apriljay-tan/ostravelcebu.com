"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TaggboxReviews from '../Reviews/TaggboxReviews';

const gallery = Array.from({ length: 15 }, (_, i) => ({
  img: `/assets/img/guests/g${i + 1}.jpg`,
  caption: `Happy Guest ${i + 1}`,
}));

const HappyGuests = () => {
  const [active, setActive] = useState<number | null>(null);

  const showPrev = () => {
    if (active === null) return;
    setActive((active - 1 + gallery.length) % gallery.length);
  };

  const showNext = () => {
    if (active === null) return;
    setActive((active + 1) % gallery.length);
  };

  return (
    <section className="os-guests section-padding fix">
      <div className="container">
        <div className="section-title text-center mb-5">
          <span className="sub-title" style={{ color: 'var(--theme)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Memories We Made Together
          </span>
          <h2 style={{ color: 'var(--header)', marginTop: '8px' }}>Happy Guests Gallery</h2>
          <p style={{ maxWidth: '700px', margin: '14px auto 0', color: 'var(--text)' }}>
            Real smiles from real travelers who explored Cebu, Moalboal, Oslob, and Bohol with
            O&apos;s Travel and Tours Services. Your adventure could be next!
          </p>
        </div>

        <div className="os-gallery-grid os-gallery-grid-15">
          {gallery.map((item, i) => (
            <button
              type="button"
              className="os-gallery-item"
              key={item.img}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
            >
              <Image
                src={item.img}
                alt={`Happy guest photo ${i + 1}`}
                fill
                sizes="(max-width: 575px) 50vw, (max-width: 991px) 33vw, 20vw"
                className="os-gallery-img"
              />
              <span className="os-gallery-overlay">
                <i className="bi bi-zoom-in"></i>
              </span>
            </button>
          ))}
        </div>

        <div className="section-title text-center mt-5 mb-4">
          <span className="sub-title" style={{ color: 'var(--theme)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Facebook Reviews
          </span>
          <h3 style={{ color: 'var(--header)', marginTop: '8px' }}>What Our Guests Say</h3>
          <p style={{ maxWidth: '640px', margin: '12px auto 0', color: 'var(--text)' }}>
            Live reviews from travelers who booked with O&apos;s Travel and Tours Services.
          </p>
        </div>
        <TaggboxReviews minHeight={600} />

        <div className="os-legit-cta text-center">
          <h3>Ready to make your own memories?</h3>
          <p>Join our happy guests and explore the best of Cebu and beyond.</p>
          <Link href="/tour-packages" className="theme-btn">
            View Tour Packages <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>

      {active !== null && (
        <div className="os-lightbox" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <button type="button" className="os-lightbox-close" onClick={() => setActive(null)} aria-label="Close">
            <i className="bi bi-x-lg"></i>
          </button>
          <button type="button" className="os-lightbox-nav os-lightbox-prev" onClick={(e) => { e.stopPropagation(); showPrev(); }} aria-label="Previous">
            <i className="bi bi-chevron-left"></i>
          </button>
          <figure className="os-lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery[active].img}
              alt={`Happy guest photo ${active + 1}`}
              width={1000}
              height={800}
              className="os-lightbox-img"
            />
            <figcaption>{active + 1} of {gallery.length}</figcaption>
          </figure>
          <button type="button" className="os-lightbox-nav os-lightbox-next" onClick={(e) => { e.stopPropagation(); showNext(); }} aria-label="Next">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </section>
  );
};

export default HappyGuests;
