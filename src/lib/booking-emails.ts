import type { BookingDetails } from '@/app/Components/TourPackages/packagesData';

type BookingPayload = {
  guestName: string;
  fbName: string;
  contactNumber: string;
  email: string;
  address: string;
  travelDate: string;
  travelEndDate?: string;
  paxAdult: string;
  paxKids: string;
  kidsBelow3: string;
  kids4to12: string;
  pickupPlace: string;
  pickupTime: string;
  specialRequest: string;
  booking: BookingDetails | null;
};

export function buildStaffEmailHtml(data: BookingPayload, siteUrl: string): string {
  const pkg = data.booking;
  const logo = `${siteUrl}/assets/img/logo/os-logo.png`;

  const rows = [
    ['Guest Name', data.guestName],
    ['Facebook Name', data.fbName || '—'],
    ['Contact Number', data.contactNumber],
    ['Email', data.email],
    ['Address', data.address || '—'],
    ['Package', pkg ? pkg.title : 'Not specified'],
    ['Tour Type', pkg ? pkg.tourTypeLabel : '—'],
    ['Price', pkg ? `${pkg.price} (${pkg.priceNote})` : '—'],
    ['Duration', pkg ? pkg.durationLabel : '—'],
    ['Travel Start', data.travelDate],
    ['Travel End', data.travelEndDate || data.travelDate],
    ['Adult Pax', data.paxAdult],
    ['Kids Pax', data.paxKids],
    ['Kids 3 & Below', data.kidsBelow3],
    ['Kids 4–12', data.kids4to12],
    ['Pick Up Place', data.pickupPlace || '—'],
    ['Pick Up Time', data.pickupTime || '—'],
    ['Special Request', data.specialRequest || '—'],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #eef2f4;font-weight:700;color:#113d48;width:38%;">${label}</td><td style="padding:10px 14px;border-bottom:1px solid #eef2f4;color:#334155;">${value}</td></tr>`
    )
    .join('');

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f3f8fa;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f8fa;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#113d48,#1ca8cb);padding:28px;text-align:center;">
          <img src="${logo}" alt="O's Travel" width="80" style="margin-bottom:12px;" />
          <h1 style="color:#fff;margin:0;font-size:22px;">New Booking Lead</h1>
          <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px;">A guest submitted a booking request on your website.</p>
        </td></tr>
        <tr><td style="padding:24px;">
          <table width="100%" cellpadding="0" cellspacing="0">${tableRows}</table>
          <p style="margin:20px 0 0;font-size:13px;color:#64748b;">Reply to the guest at <a href="mailto:${data.email}">${data.email}</a> or call ${data.contactNumber}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

export function buildClientEmailHtml(data: BookingPayload, siteUrl: string): string {
  const pkg = data.booking;
  const logo = `${siteUrl}/assets/img/logo/os-logo.png`;

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f3f8fa;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f8fa;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#113d48,#1ca8cb);padding:32px;text-align:center;">
          <img src="${logo}" alt="O's Travel and Tours Services" width="90" style="margin-bottom:14px;" />
          <h1 style="color:#fff;margin:0;font-size:24px;">Booking Request Received</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;margin:0 0 16px;">Hi <strong>${data.guestName}</strong>,</p>
          <p style="color:#334155;font-size:15px;line-height:1.6;margin:0 0 20px;">
            Thank you for choosing <strong>O's Travel and Tours Services</strong>! We have received your booking request and our team will contact you shortly to confirm your tour.
          </p>
          <div style="background:#f0f9fc;border:1px solid #c5e8f2;border-radius:12px;padding:18px 20px;margin-bottom:20px;">
            <p style="margin:0 0 8px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:700;">Your Selection</p>
            <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#113d48;">${pkg ? pkg.title : 'Tour package to be confirmed'}</p>
            ${pkg ? `<p style="margin:0 0 4px;color:#1ca8cb;font-weight:700;font-size:16px;">${pkg.price} <span style="color:#64748b;font-weight:600;font-size:14px;">${pkg.priceNote}</span></p>
            <p style="margin:0;color:#64748b;font-size:14px;">${pkg.tourTypeLabel} · ${pkg.durationLabel}</p>` : ''}
            <p style="margin:12px 0 0;color:#334155;font-size:14px;"><strong>Travel date:</strong> ${data.travelDate}${data.travelEndDate && data.travelEndDate !== data.travelDate ? ` to ${data.travelEndDate}` : ''}</p>
          </div>
          <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 8px;">Questions? Reach us anytime:</p>
          <p style="margin:0;font-size:14px;color:#334155;">
            <a href="mailto:ostravelandtoursservices@gmail.com" style="color:#1ca8cb;">ostravelandtoursservices@gmail.com</a><br/>
            <a href="tel:+639334591419" style="color:#1ca8cb;">0933 459 1419</a>
          </p>
          <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;">Talamban, Cebu City, Philippines</p>
        </td></tr>
        <tr><td style="background:#113d48;padding:16px;text-align:center;">
          <p style="margin:0;color:rgba(255,255,255,0.75);font-size:12px;">© O's Travel and Tours Services — Cebu Tour Packages</p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}
