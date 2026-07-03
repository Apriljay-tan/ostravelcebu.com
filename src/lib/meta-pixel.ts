/**
 * Meta (Facebook) Pixel — client-side tracking helpers.
 * Pixel ID: set NEXT_PUBLIC_META_PIXEL_ID in .env (falls back to site default).
 */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '1480207500806617';

export type MetaUserDataInput = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  externalId?: string;
};

export type TourEventPayload = {
  packageId?: string;
  packageName?: string;
  tourType?: 'joiner' | 'private';
  routeKey?: string;
  price?: string;
  pax?: number;
  currency?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function hasFbq(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

async function sha256(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  if (!normalized || typeof window === 'undefined' || !window.crypto?.subtle) {
    return '';
  }
  const data = new TextEncoder().encode(normalized);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Normalize PH numbers to digits with country code (no +) for Meta hashing. */
export function normalizePhoneForMeta(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) digits = `63${digits.slice(1)}`;
  else if (!digits.startsWith('63')) digits = `63${digits}`;
  return digits;
}

function splitGuestName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

/** Build SHA-256 hashed fields for Meta Advanced Matching. */
export async function buildAdvancedMatchingData(
  input: MetaUserDataInput
): Promise<Record<string, string>> {
  const data: Record<string, string> = {};

  let firstName = input.firstName?.trim() ?? '';
  let lastName = input.lastName?.trim() ?? '';
  if (firstName && !lastName) {
    const split = splitGuestName(firstName);
    firstName = split.firstName;
    lastName = split.lastName;
  }
  const email = input.email?.trim().toLowerCase();
  if (email) {
    const hashed = await sha256(email);
    if (hashed) data.em = hashed;
  }

  const phone = input.phone ? normalizePhoneForMeta(input.phone) : '';
  if (phone) {
    const hashed = await sha256(phone);
    if (hashed) data.ph = hashed;
  }

  if (firstName) {
    const hashed = await sha256(firstName.toLowerCase());
    if (hashed) data.fn = hashed;
  }

  if (lastName) {
    const hashed = await sha256(lastName.toLowerCase());
    if (hashed) data.ln = hashed;
  }

  if (input.city?.trim()) {
    const hashed = await sha256(input.city.trim().toLowerCase());
    if (hashed) data.ct = hashed;
  }

  const country = (input.country ?? 'ph').trim().toLowerCase();
  if (country) {
    const hashed = await sha256(country);
    if (hashed) data.country = hashed;
  }

  if (input.externalId?.trim()) {
    const hashed = await sha256(input.externalId.trim().toLowerCase());
    if (hashed) data.external_id = hashed;
  }

  return data;
}

export function createMetaEventId(prefix = 'os'): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function parseTourPrice(price?: string): number {
  if (!price) return 0;
  const cleaned = price.replace(/[^\d.]/g, '');
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function tourEventParams(payload: TourEventPayload) {
  const value = parseTourPrice(payload.price);
  return {
    content_name: payload.packageName ?? 'Tour Package',
    content_ids: payload.packageId ? [payload.packageId] : undefined,
    content_type: 'product',
    content_category: payload.tourType ? `${payload.tourType} tour` : 'tour',
    num_items: payload.pax ?? 1,
    value,
    currency: payload.currency ?? 'PHP',
  };
}

/** Re-init pixel with hashed user data before high-value events (Advanced Matching). */
export async function applyAdvancedMatching(input: MetaUserDataInput): Promise<void> {
  if (!hasFbq()) return;
  const userData = await buildAdvancedMatchingData(input);
  if (Object.keys(userData).length === 0) return;
  window.fbq!('init', META_PIXEL_ID, userData);
}

export function trackPageView(): void {
  if (!hasFbq()) return;
  window.fbq!('track', 'PageView');
}

export function trackViewContent(payload: TourEventPayload & { contentName?: string }): void {
  if (!hasFbq()) return;
  window.fbq!('track', 'ViewContent', {
    ...tourEventParams(payload),
    content_name: payload.contentName ?? payload.packageName ?? 'Tour Package',
  });
}

export function trackSearch(searchString: string, payload?: TourEventPayload): void {
  if (!hasFbq()) return;
  window.fbq!('track', 'Search', {
    search_string: searchString,
    ...tourEventParams(payload ?? {}),
  });
}

export function trackInitiateCheckout(payload: TourEventPayload): void {
  if (!hasFbq()) return;
  window.fbq!('track', 'InitiateCheckout', tourEventParams(payload));
}

export function trackContact(payload?: TourEventPayload): void {
  if (!hasFbq()) return;
  window.fbq!('track', 'Contact', tourEventParams(payload ?? { packageName: 'Contact' }));
}

export async function trackLead(
  payload: TourEventPayload & { eventId?: string },
  user: MetaUserDataInput
): Promise<string> {
  const eventId = payload.eventId ?? createMetaEventId('lead');
  if (!hasFbq()) return eventId;

  await applyAdvancedMatching({
    email: user.email,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    city: user.city,
    country: user.country,
    externalId: user.externalId ?? user.email,
  });

  window.fbq!(
    'track',
    'Lead',
    {
      ...tourEventParams(payload),
      content_name: payload.packageName ?? 'Booking Request',
    },
    { eventID: eventId }
  );

  return eventId;
}

export async function trackCompleteRegistration(
  payload: TourEventPayload,
  user: MetaUserDataInput
): Promise<void> {
  if (!hasFbq()) return;
  await applyAdvancedMatching(user);
  window.fbq!('track', 'CompleteRegistration', {
    ...tourEventParams(payload),
    status: 'submitted',
  });
}

/** Contextual events fired when users land on key pages (in addition to PageView). */
export function trackPageContext(pathname: string, search?: string): void {
  const path = pathname.replace(/\/$/, '') || '/';
  const params = new URLSearchParams(search?.replace(/^\?/, '') ?? '');

  if (path === '/tour-packages') {
    trackViewContent({
      packageName: 'Tour Packages',
      contentName: 'Tour Packages Catalog',
    });
    return;
  }

  if (path === '/contact') {
    const pkg = params.get('pkg');
    const route = params.get('route');
    const type = params.get('type') as 'joiner' | 'private' | null;
    const pax = parseInt(params.get('pax') ?? '2', 10) || 2;

    if (pkg || route) {
      trackInitiateCheckout({
        packageId: pkg ?? undefined,
        routeKey: route ?? undefined,
        tourType: type ?? undefined,
        packageName: pkg ?? route ?? 'Tour Booking',
        pax,
      });
    } else {
      trackContact();
    }
    return;
  }

  if (path === '/happy-guests') {
    trackViewContent({ packageName: 'Happy Guests', contentName: 'Guest Gallery' });
    return;
  }

  if (path === '/legitimacy-corner') {
    trackViewContent({ packageName: 'Legitimacy Corner', contentName: 'Business Credentials' });
  }
}
