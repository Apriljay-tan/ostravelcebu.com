"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  joinerPackages,
  privatePackages,
  getPackageImage,
  getPackageId,
  getPrivatePriceForPax,
  getBookingUrl,
  Block,
  JoinerPackage,
  PrivatePackage,
} from './packagesData';
import { trackInitiateCheckout } from '@/lib/meta-pixel';

type CardProps = {
  pkg: JoinerPackage | PrivatePackage;
  highlighted?: boolean;
  defaultOpen?: boolean;
  highlightPax?: number | null;
};

const PackageImage = ({ pkg }: { pkg: JoinerPackage | PrivatePackage }) => (
  <div className="os-pkg-image-wrap">
    <Image
      src={getPackageImage(pkg.id)}
      alt={pkg.title}
      width={480}
      height={280}
      className="os-pkg-image"
    />
  </div>
);

const blockIcon = (heading: string) => {
  const h = heading.toLowerCase();
  if (h.includes('inclusion')) return 'bi-check-circle-fill';
  if (h.includes('exclusion')) return 'bi-x-circle-fill';
  if (h.includes('optional')) return 'bi-stars';
  return 'bi-geo-alt-fill';
};

const PackageBlocks = ({ blocks }: { blocks: Block[] }) => (
  <div className="os-pkg-blocks">
    {blocks.map((block, i) => (
      <div className={`os-pkg-block ${blockIcon(block.heading) === 'bi-x-circle-fill' ? 'is-exclusion' : ''}`} key={i}>
        <h5 className="os-pkg-block-title">
          <i className={`bi ${blockIcon(block.heading)}`}></i> {block.heading}
        </h5>
        <ul className="os-pkg-list">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const JoinerCard = ({ pkg, highlighted = false, defaultOpen = false }: CardProps) => {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  return (
    <div
      id={pkg.id}
      className={`os-pkg-card ${open ? 'is-open' : ''} ${highlighted ? 'is-highlighted' : ''}`}
    >
      <PackageImage pkg={pkg} />
      <div className="os-pkg-body">
        <div className="os-pkg-head">
          <div className="os-pkg-head-top">
            <span className="os-pkg-tag">Joiner</span>
            {(pkg as JoinerPackage).meta.map((m, i) => (
              <span className="os-pkg-pill" key={i}>{m}</span>
            ))}
          </div>
          <h3 className="os-pkg-title">{pkg.title}</h3>
          <div className="os-pkg-price">{(pkg as JoinerPackage).price}</div>
        </div>
        {open && <PackageBlocks blocks={pkg.blocks} />}
        <div className="os-pkg-actions">
          <button type="button" className="os-pkg-toggle-btn" onClick={() => setOpen(!open)}>
            {open ? 'Hide Details' : 'View Details'}{' '}
            <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </button>
        <Link
          href={getBookingUrl({ packageId: pkg.id })}
          className="theme-btn style-2"
          onClick={() =>
            trackInitiateCheckout({
              packageId: pkg.id,
              packageName: pkg.title,
              tourType: 'joiner',
              price: (pkg as JoinerPackage).price,
              pax: 2,
            })
          }
        >
          Book Now <i className="bi bi-arrow-right"></i>
        </Link>
        </div>
      </div>
    </div>
  );
};

const PrivateCard = ({ pkg, highlighted = false, defaultOpen = false, highlightPax = null }: CardProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const privatePkg = pkg as PrivatePackage;
  const lowest = privatePkg.pricing[privatePkg.pricing.length - 1];
  const selectedTier = highlightPax ? getPrivatePriceForPax(privatePkg, highlightPax) : null;

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  return (
    <div
      id={pkg.id}
      className={`os-pkg-card ${open ? 'is-open' : ''} ${highlighted ? 'is-highlighted' : ''}`}
    >
      <PackageImage pkg={pkg} />
      <div className="os-pkg-body">
        <div className="os-pkg-head">
          <div className="os-pkg-head-top">
            <span className="os-pkg-tag is-private">Private</span>
            <span className="os-pkg-pill">Your own group</span>
          </div>
          <h3 className="os-pkg-title">{pkg.title}</h3>
          {highlighted && selectedTier ? (
            <div className="os-pkg-price os-pkg-price-selected">
              {selectedTier.price}
              <span className="os-pkg-price-note">for {selectedTier.pax}</span>
            </div>
          ) : (
            <div className="os-pkg-price">
              from {lowest.price} <span className="os-pkg-price-note">(at {lowest.pax})</span>
            </div>
          )}
          {privatePkg.intro && <p className="os-pkg-intro">{privatePkg.intro}</p>}
        </div>

        <div className="os-pkg-pricing">
          <h5 className="os-pkg-block-title">
            <i className="bi bi-people-fill"></i> Price per Pax
          </h5>
          <div className="os-pkg-price-grid">
            {privatePkg.pricing.map((p, i) => {
              const isSelected = highlightPax !== null && parseInt(p.pax, 10) === highlightPax;
              return (
                <div className={`os-pkg-price-item ${isSelected ? 'is-selected' : ''}`} key={i}>
                  <span className="pax">{p.pax}</span>
                  <span className="amt">{p.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {open && <PackageBlocks blocks={pkg.blocks} />}
        {open && privatePkg.note && <p className="os-pkg-note">{privatePkg.note}</p>}

        <div className="os-pkg-actions">
          <button type="button" className="os-pkg-toggle-btn" onClick={() => setOpen(!open)}>
            {open ? 'Hide Itinerary' : 'View Itinerary'}{' '}
            <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </button>
        <Link
          href={getBookingUrl({ packageId: pkg.id, pax: highlightPax ?? 2 })}
          className="theme-btn style-2"
          onClick={() =>
            trackInitiateCheckout({
              packageId: pkg.id,
              packageName: pkg.title,
              tourType: 'private',
              price: selectedTier?.price ?? lowest.price,
              pax: highlightPax ?? 2,
            })
          }
        >
          Book Now <i className="bi bi-arrow-right"></i>
        </Link>
        </div>
      </div>
    </div>
  );
};

const TourPackages = () => {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'joiner' | 'private'>('joiner');
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  const [highlightPax, setHighlightPax] = useState<number | null>(null);

  useEffect(() => {
    const route = searchParams.get('route');
    const type = searchParams.get('type') as 'joiner' | 'private' | null;
    const pax = parseInt(searchParams.get('pax') || '2', 10);

    if (!route || (type !== 'joiner' && type !== 'private')) return;

    const packageId = getPackageId(route, type);
    if (!packageId) return;

    setMode(type);
    setActivePackageId(packageId);
    setHighlightPax(type === 'private' ? pax : null);

    const timer = window.setTimeout(() => {
      document.getElementById(packageId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  return (
    <section className="os-packages section-padding fix">
      <div className="container">
        <div className="section-title text-center mb-4">
          <span className="sub-title">Choose Your Adventure</span>
          <h2>Cebu, Moalboal, Oslob &amp; Bohol Tour Packages</h2>
        </div>

        <div className="os-toggle-wrap">
          <span className={`os-toggle-label ${mode === 'joiner' ? 'active' : ''}`}>Joiner Packages</span>
          <button
            type="button"
            role="switch"
            aria-checked={mode === 'private'}
            aria-label="Switch between Joiner and Private packages"
            className={`os-toggle ${mode === 'private' ? 'is-private' : ''}`}
            onClick={() => {
              setMode(mode === 'joiner' ? 'private' : 'joiner');
              setActivePackageId(null);
              setHighlightPax(null);
            }}
          >
            <span className="os-toggle-knob"></span>
          </button>
          <span className={`os-toggle-label ${mode === 'private' ? 'active' : ''}`}>Private Tours</span>
        </div>

        <p className="os-mode-hint text-center">
          {mode === 'joiner'
            ? 'Shared joiner tours — minimum of 2 pax. Affordable fixed rates per person.'
            : 'Private tours for your own group only. Rate per pax decreases as your group grows (1–12 pax).'}
        </p>

        <div className="os-pkg-grid">
          {mode === 'joiner'
            ? joinerPackages.map((pkg) => (
                <JoinerCard
                  key={pkg.id}
                  pkg={pkg}
                  highlighted={activePackageId === pkg.id}
                  defaultOpen={activePackageId === pkg.id}
                />
              ))
            : privatePackages.map((pkg) => (
                <PrivateCard
                  key={pkg.id}
                  pkg={pkg}
                  highlighted={activePackageId === pkg.id}
                  defaultOpen={activePackageId === pkg.id}
                  highlightPax={activePackageId === pkg.id ? highlightPax : null}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
