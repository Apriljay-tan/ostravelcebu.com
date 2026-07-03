"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  tourRouteOptions,
  getPackageId,
  getBookingDetailsByPackageId,
  resolveBookingFromSearchParams,
  type BookingDetails,
} from '../TourPackages/packagesData';
import { trackCompleteRegistration, trackLead } from '@/lib/meta-pixel';

type FormState = {
  guestName: string;
  fbName: string;
  contactNumber: string;
  email: string;
  address: string;
  travelDate: string;
  paxAdult: string;
  paxKids: string;
  kidsBelow3: string;
  kids4to12: string;
  pickupPlace: string;
  pickupTime: string;
  specialRequest: string;
};

const initialForm: FormState = {
  guestName: '',
  fbName: '',
  contactNumber: '',
  email: '',
  address: '',
  travelDate: '',
  paxAdult: '2',
  paxKids: '0',
  kidsBelow3: '0',
  kids4to12: '0',
  pickupPlace: '',
  pickupTime: '',
  specialRequest: '',
};

const helpItems = [
  {
    icon: 'bi-telephone-fill',
    label: 'Contact Number',
    value: '0933 459 1419',
    href: 'tel:+639334591419',
  },
  {
    icon: 'bi-envelope-fill',
    label: 'Email Address',
    value: 'ostravelandtoursservices@gmail.com',
    href: 'mailto:ostravelandtoursservices@gmail.com',
  },
  {
    icon: 'bi-globe',
    label: 'Website',
    value: "O's Travel & Tours Services",
    href: '/',
  },
  {
    icon: 'bi-geo-alt-fill',
    label: 'Location',
    value: 'Talamban, Cebu City, Philippines 6000',
    href: 'https://maps.google.com/?q=Talamban,+Cebu+City,+Philippines',
  },
];

function addDays(dateStr: string, days: number): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BookingForm = () => {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initialForm);
  const [openHelp, setOpenHelp] = useState<number | null>(0);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedType, setSelectedType] = useState<'joiner' | 'private'>('joiner');
  const [selectedPax, setSelectedPax] = useState(2);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const pkg = searchParams.get('pkg');
    const route = searchParams.get('route');
    const type = searchParams.get('type');
    const pax = searchParams.get('pax');
    const { details, pax: paxNum } = resolveBookingFromSearchParams(pkg, route, type, pax);

    if (details) {
      setBooking(details);
      setSelectedRoute(details.routeKey);
      setSelectedType(details.type);
      setSelectedPax(paxNum);
      setForm((f) => ({ ...f, paxAdult: String(paxNum) }));
    } else if (route && (type === 'joiner' || type === 'private')) {
      setSelectedRoute(route);
      setSelectedType(type);
      setSelectedPax(paxNum);
    }
  }, [searchParams]);

  const packageOptions = useMemo(
    () =>
      tourRouteOptions.flatMap((r) => [
        { id: r.joinerId, label: `${r.label} — Joiner`, routeKey: r.routeKey, type: 'joiner' as const },
        { id: r.privateId, label: `${r.label} — Private`, routeKey: r.routeKey, type: 'private' as const },
      ]),
    []
  );

  const handlePackageChange = (packageId: string) => {
    const opt = packageOptions.find((o) => o.id === packageId);
    if (!opt) return;
    setSelectedRoute(opt.routeKey);
    setSelectedType(opt.type);
    const pax = parseInt(form.paxAdult, 10) || 2;
    setSelectedPax(pax);
    setBooking(getBookingDetailsByPackageId(packageId, pax));
  };

  const handlePaxChange = (pax: number) => {
    setSelectedPax(pax);
    const packageId = getPackageId(selectedRoute, selectedType);
    if (packageId) setBooking(getBookingDetailsByPackageId(packageId, pax));
  };

  const travelEndDate = useMemo(() => {
    if (!form.travelDate || !booking) return '';
    if (booking.nights > 0) return addDays(form.travelDate, booking.nights);
    return form.travelDate;
  }, [form.travelDate, booking]);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'paxAdult') {
      const pax = parseInt(value, 10) || 1;
      handlePaxChange(pax);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          booking,
          selectedRoute,
          selectedType,
          selectedPax,
          travelEndDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit booking');

      const leadPayload = {
        packageId: booking?.packageId,
        packageName: booking?.title ?? 'Tour Booking',
        tourType: selectedType,
        routeKey: selectedRoute,
        price: booking?.price,
        pax: selectedPax,
      };

      await trackLead(leadPayload, {
        email: form.email,
        phone: form.contactNumber,
        firstName: form.guestName,
        city: 'cebu city',
        country: 'ph',
        externalId: form.email,
      });

      await trackCompleteRegistration(leadPayload, {
        email: form.email,
        phone: form.contactNumber,
        firstName: form.guestName,
        country: 'ph',
      });

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const selectedPackageId = booking?.packageId ?? getPackageId(selectedRoute, selectedType) ?? '';

  if (status === 'success') {
    return (
      <section className="os-booking-section section-padding fix">
        <div className="container">
          <div className="os-booking-success">
            <div className="os-booking-success-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h2>Booking Request Received!</h2>
            <p>
              Thank you! A confirmation email has been sent to your inbox. Our team will review
              your request and contact you shortly to finalize your tour.
            </p>
            <div className="os-booking-success-actions">
              <Link href="/tour-packages" className="theme-btn style-2">
                Browse More Tours
              </Link>
              <Link href="/" className="theme-btn">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="os-booking-section section-padding fix">
      <div className="container">
        <div className="row g-4">
          {/* Help sidebar */}
          <div className="col-lg-4">
            <div className="os-booking-help">
              <h3>Need Help?</h3>
              <p>Click the info below for faster booking assistance.</p>
              <div className="os-help-list">
                {helpItems.map((item, i) => (
                  <div className="os-help-item" key={item.label}>
                    <button
                      type="button"
                      className={`os-help-trigger ${openHelp === i ? 'is-open' : ''}`}
                      onClick={() => setOpenHelp(openHelp === i ? null : i)}
                    >
                      <span className="os-help-trigger-left">
                        <i className={`bi ${item.icon}`}></i>
                        {item.label}
                      </span>
                      <i className={`bi bi-chevron-down os-help-chevron ${openHelp === i ? 'is-open' : ''}`}></i>
                    </button>
                    {openHelp === i && (
                      <div className="os-help-body">
                        {item.href.startsWith('http') || item.href.startsWith('mailto') || item.href.startsWith('tel') ? (
                          <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                            {item.value}
                          </a>
                        ) : (
                          <Link href={item.href}>{item.value}</Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="col-lg-8">
            <div className="os-booking-card">
              <div className="os-booking-card-head">
                <h2>Book Your Tour</h2>
                <p>Fill out the form and our team will contact you for confirmation within 24 hours.</p>
              </div>

              {/* Selected package summary */}
              <div className="os-booking-package-summary">
                <div className="os-booking-package-row">
                  <span className="label">Selected Package</span>
                  <strong>{booking ? booking.title : 'No package selected yet'}</strong>
                </div>
                {booking && (
                  <>
                    <div className="os-booking-package-meta">
                      <span className="os-booking-badge">{booking.tourTypeLabel}</span>
                      <span className="os-booking-badge is-price">{booking.price} {booking.priceNote}</span>
                      <span className="os-booking-badge is-duration">
                        <i className="bi bi-calendar3"></i> {booking.durationLabel}
                      </span>
                    </div>
                    {booking.nights > 0 && (
                      <p className="os-booking-date-rule">
                        Date rule: {booking.durationLabel} — select start date only; end date is calculated automatically.
                      </p>
                    )}
                  </>
                )}
                {!booking && (
                  <p className="os-booking-date-rule">
                    Package selection is optional. Choose a tour below or browse our{' '}
                    <Link href="/tour-packages">Tour Packages</Link> page first.
                  </p>
                )}
              </div>

              <form className="os-booking-form" onSubmit={handleSubmit}>
                {/* Package picker */}
                <div className="os-form-group">
                  <label htmlFor="package-select">Tour Package</label>
                  <select
                    id="package-select"
                    value={selectedPackageId}
                    onChange={(e) => handlePackageChange(e.target.value)}
                  >
                    <option value="">Select a tour package (optional)</option>
                    {packageOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="os-form-row">
                  <div className="os-form-group">
                    <label htmlFor="tour-type">Tour Type</label>
                    <select
                      id="tour-type"
                      value={selectedType}
                      onChange={(e) => {
                        const type = e.target.value as 'joiner' | 'private';
                        setSelectedType(type);
                        const id = getPackageId(selectedRoute, type);
                        if (id) handlePackageChange(id);
                      }}
                      disabled={!selectedRoute}
                    >
                      <option value="joiner">Joiner</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="os-form-group">
                    <label htmlFor="pax-select">Number of Pax (Adult)</label>
                    <select
                      id="pax-select"
                      value={selectedPax}
                      onChange={(e) => {
                        const pax = parseInt(e.target.value, 10);
                        handlePaxChange(pax);
                        update('paxAdult', e.target.value);
                      }}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} Pax</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Travel date */}
                <div className="os-form-group">
                  <label htmlFor="travel-date">Travel Date</label>
                  <input
                    id="travel-date"
                    type="date"
                    value={form.travelDate}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => update('travelDate', e.target.value)}
                    required
                  />
                  <span className="os-form-hint">
                    {booking && booking.nights > 0
                      ? 'Select the start date only. End date is set automatically.'
                      : 'Select your preferred travel date.'}
                  </span>
                </div>
                {form.travelDate && (
                  <div className="os-booking-date-preview">
                    {booking && booking.nights > 0 ? (
                      <>
                        <span><strong>Start:</strong> {formatDate(form.travelDate)}</span>
                        <span><strong>End:</strong> {formatDate(travelEndDate)}</span>
                      </>
                    ) : (
                      <span><strong>Date:</strong> {formatDate(form.travelDate)}</span>
                    )}
                  </div>
                )}

                <div className="os-form-row">
                  <div className="os-form-group">
                    <label htmlFor="guest-name">Name of Guest</label>
                    <input id="guest-name" type="text" placeholder="Enter guest full name" value={form.guestName} onChange={(e) => update('guestName', e.target.value)} required />
                  </div>
                  <div className="os-form-group">
                    <label htmlFor="fb-name">FB Name</label>
                    <input id="fb-name" type="text" placeholder="Enter Facebook name" value={form.fbName} onChange={(e) => update('fbName', e.target.value)} />
                  </div>
                </div>

                <div className="os-form-row">
                  <div className="os-form-group">
                    <label htmlFor="contact-number">Contact Number</label>
                    <input id="contact-number" type="tel" placeholder="Enter contact number" value={form.contactNumber} onChange={(e) => update('contactNumber', e.target.value)} required />
                  </div>
                  <div className="os-form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Enter email address" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                  </div>
                </div>

                <div className="os-form-group">
                  <label htmlFor="address">Address</label>
                  <input id="address" type="text" placeholder="Enter complete address" value={form.address} onChange={(e) => update('address', e.target.value)} />
                </div>

                <div className="os-form-row">
                  <div className="os-form-group">
                    <label htmlFor="pax-adult">Number of Pax Adult</label>
                    <input id="pax-adult" type="number" min="1" max="99" placeholder="Adult pax" value={form.paxAdult} onChange={(e) => update('paxAdult', e.target.value)} required />
                  </div>
                  <div className="os-form-group">
                    <label htmlFor="pax-kids">Number of Pax Kids</label>
                    <input id="pax-kids" type="number" min="0" max="99" placeholder="Kids pax" value={form.paxKids} onChange={(e) => update('paxKids', e.target.value)} />
                  </div>
                </div>

                <div className="os-form-row">
                  <div className="os-form-group">
                    <label htmlFor="kids-below-3">Kids 3 YO Below</label>
                    <input id="kids-below-3" type="number" min="0" max="99" placeholder="Kids 3 years old below" value={form.kidsBelow3} onChange={(e) => update('kidsBelow3', e.target.value)} />
                  </div>
                  <div className="os-form-group">
                    <label htmlFor="kids-4-12">Kids 4 YO to 12 YO</label>
                    <input id="kids-4-12" type="number" min="0" max="99" placeholder="Kids 4 to 12 years old" value={form.kids4to12} onChange={(e) => update('kids4to12', e.target.value)} />
                  </div>
                </div>

                <div className="os-form-row">
                  <div className="os-form-group">
                    <label htmlFor="pickup-place">Pick Up Place</label>
                    <input id="pickup-place" type="text" placeholder="Hotel, airport, or exact location" value={form.pickupPlace} onChange={(e) => update('pickupPlace', e.target.value)} />
                  </div>
                  <div className="os-form-group">
                    <label htmlFor="pickup-time">Pick Up Time</label>
                    <input id="pickup-time" type="time" value={form.pickupTime} onChange={(e) => update('pickupTime', e.target.value)} />
                  </div>
                </div>

                <div className="os-form-group">
                  <label htmlFor="special-request">Special Request</label>
                  <textarea id="special-request" rows={4} placeholder="Write your special request here..." value={form.specialRequest} onChange={(e) => update('specialRequest', e.target.value)} />
                </div>

                {status === 'error' && (
                  <div className="os-booking-error" role="alert">
                    <i className="bi bi-exclamation-triangle-fill"></i> {errorMsg}
                  </div>
                )}

                <button type="submit" className="os-booking-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Submit Booking Request'}
                </button>
                <p className="os-booking-footer-note">
                  Our team will review your booking request and contact you for final confirmation.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
