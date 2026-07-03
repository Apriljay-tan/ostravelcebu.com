import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildClientEmailHtml, buildStaffEmailHtml } from '@/lib/booking-emails';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      guestName,
      fbName,
      contactNumber,
      email,
      address,
      travelDate,
      travelEndDate,
      paxAdult,
      paxKids,
      kidsBelow3,
      kids4to12,
      pickupPlace,
      pickupTime,
      specialRequest,
      booking,
    } = body;

    if (!guestName || !contactNumber || !email || !travelDate) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us directly at ostravelandtoursservices@gmail.com.' },
        { status: 503 }
      );
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json({ error: 'Email service unavailable.' }, { status: 503 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fromEmail = process.env.BOOKING_FROM_EMAIL || "O's Travel <onboarding@resend.dev>";
    const staffEmail = process.env.BOOKING_STAFF_EMAIL || 'ostravelandtoursservices@gmail.com';

    const payload = {
      guestName,
      fbName: fbName || '',
      contactNumber,
      email,
      address: address || '',
      travelDate,
      travelEndDate: travelEndDate || travelDate,
      paxAdult: String(paxAdult),
      paxKids: String(paxKids || '0'),
      kidsBelow3: String(kidsBelow3 || '0'),
      kids4to12: String(kids4to12 || '0'),
      pickupPlace: pickupPlace || '',
      pickupTime: pickupTime || '',
      specialRequest: specialRequest || '',
      booking: booking || null,
    };

    const pkgLabel = booking?.title ?? 'General Inquiry';

    // Email to staff (lead)
    await resend.emails.send({
      from: fromEmail,
      to: staffEmail,
      replyTo: email,
      subject: `New Booking Lead — ${pkgLabel} — ${guestName}`,
      html: buildStaffEmailHtml(payload, siteUrl),
    });

    // Confirmation email to client
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Booking Request Received — ${pkgLabel} | O's Travel and Tours Services`,
      html: buildClientEmailHtml(payload, siteUrl),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking email error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
