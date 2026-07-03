"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { tourRouteOptions } from '../TourPackages/packagesData';
import { trackSearch } from '@/lib/meta-pixel';

const heroImages = [
    '/assets/img/hero/hero-1.jpg',
    '/assets/img/hero/hero-2.jpg',
    '/assets/img/hero/hero-3.jpg',
    '/assets/img/hero/hero-4.jpg',
];

const HeroBanner2 = () => {
    const router = useRouter();
    const [active, setActive] = useState(0);
    const [routeKey, setRouteKey] = useState('');
    const [tourType, setTourType] = useState<'joiner' | 'private'>('joiner');
    const [pax, setPax] = useState('2');

    useEffect(() => {
        setActive(Math.floor(Math.random() * heroImages.length));
        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!routeKey) return;
        const route = tourRouteOptions.find((r) => r.routeKey === routeKey);
        trackSearch(route?.label ?? routeKey, {
            routeKey,
            tourType,
            packageName: route?.label,
            pax: parseInt(pax, 10) || 2,
        });
        const params = new URLSearchParams({
            route: routeKey,
            type: tourType,
            pax,
        });
        router.push(`/tour-packages?${params.toString()}`);
    };

    return (
        <section className="hero-section-2">
            <div className="hero-2 os-hero-inner">
                <div className="os-hero-bg" aria-hidden="true">
                    {heroImages.map((src, i) => (
                        <div
                            key={src}
                            className={`os-hero-slide ${i === active ? 'is-active' : ''}`}
                            style={{ backgroundImage: `url(${src})` }}
                        />
                    ))}
                </div>
                <div className="os-hero-overlay" aria-hidden="true"></div>
                <div className="container custom-container-3">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="hero-content">
                                <div className="sub-title wow fadeInUp">
                                    Explore Cebu &amp; Beyond With Us
                                </div>
                                <h1 className="wow fadeInUp" data-wow-delay=".3s">
                                    Discover Cebu, Bohol, <br/>
                                    Moalboal &amp; Oslob
                                </h1>
                                <p className="wow fadeInUp" data-wow-delay=".5s">
                                    O&apos;s Travel and Tours Services brings you affordable joiner tours and flexible <br/> private packages across Cebu and nearby islands — handled by your friendly local Cebuano team.
                                </p>
                                <div className="os-hero-btns wow fadeInUp" data-wow-delay=".7s">
                                    <Link href="/tour-packages" className="theme-btn os-btn-primary">
                                        <span>View Tour Packages <i className="bi bi-arrow-right"></i></span>
                                    </Link>
                                    <Link href="/contact" className="theme-btn os-btn-outline">
                                        <span>Request A Quote <i className="bi bi-arrow-right"></i></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="best-price-section os-package-search mb-0">
                <div className="container custom-container-3">
                    <form className="os-search-form" onSubmit={handleSearch}>
                        <div className="os-search-head">
                            <h2>Find Your Perfect Tour</h2>
                            <p>Select your package and tour type — we&apos;ll take you straight to the right price.</p>
                        </div>
                        <div className="os-search-fields">
                            <div className="os-field os-field-select">
                                <label htmlFor="os-pkg">Tour Package</label>
                                <select
                                    id="os-pkg"
                                    name="route"
                                    value={routeKey}
                                    onChange={(e) => setRouteKey(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select a tour package</option>
                                    {tourRouteOptions.map((route) => (
                                        <option key={route.routeKey} value={route.routeKey}>
                                            {route.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="os-field os-field-select">
                                <label htmlFor="os-type">Tour Type</label>
                                <select
                                    id="os-type"
                                    name="type"
                                    value={tourType}
                                    onChange={(e) => setTourType(e.target.value as 'joiner' | 'private')}
                                >
                                    <option value="joiner">Joiner</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                            <div className="os-field os-field-select">
                                <label htmlFor="os-pax">Number of Pax</label>
                                <select
                                    id="os-pax"
                                    name="pax"
                                    value={pax}
                                    onChange={(e) => setPax(e.target.value)}
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                                        <option key={n} value={String(n)}>{n} Pax</option>
                                    ))}
                                </select>
                            </div>
                            <div className="os-field os-field-btn">
                                <button type="submit" className="theme-btn w-100" disabled={!routeKey}>
                                    <span>Find Package <i className="bi bi-search"></i></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner2;
