<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'message' => $message,
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

$raw = file_get_contents('php://input');
if ($raw === false || trim($raw) === '') {
    respond(400, false, 'Empty request body.');
}

$body = json_decode($raw, true);
if (!is_array($body)) {
    respond(400, false, 'Invalid JSON payload.');
}

$guestName = trim((string)($body['guestName'] ?? ''));
$fbName = trim((string)($body['fbName'] ?? ''));
$contactNumber = trim((string)($body['contactNumber'] ?? ''));
$email = trim((string)($body['email'] ?? ''));
$address = trim((string)($body['address'] ?? ''));
$travelDate = trim((string)($body['travelDate'] ?? ''));
$travelEndDate = trim((string)($body['travelEndDate'] ?? ''));
$paxAdult = trim((string)($body['paxAdult'] ?? ''));
$paxKids = trim((string)($body['paxKids'] ?? ''));
$kidsBelow3 = trim((string)($body['kidsBelow3'] ?? ''));
$kids4to12 = trim((string)($body['kids4to12'] ?? ''));
$pickupPlace = trim((string)($body['pickupPlace'] ?? ''));
$pickupTime = trim((string)($body['pickupTime'] ?? ''));
$specialRequest = trim((string)($body['specialRequest'] ?? ''));
$booking = $body['booking'] ?? null;
$selectedRoute = trim((string)($body['selectedRoute'] ?? ''));
$selectedType = trim((string)($body['selectedType'] ?? ''));
$selectedPax = trim((string)($body['selectedPax'] ?? ''));

if ($guestName === '' || $contactNumber === '' || $email === '' || $travelDate === '') {
    respond(400, false, 'Please fill in all required fields.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, false, 'Please provide a valid email address.');
}

if ($travelEndDate === '') {
    $travelEndDate = $travelDate;
}

$adminEmail = 'info@ostravelcebu.com';
$fromEmail = 'info@ostravelcebu.com';
$siteName = "O's Travel and Tours Services";

$packageTitle = 'General Inquiry';
$tourTypeLabel = $selectedType !== '' ? $selectedType : 'Not specified';
$packagePrice = 'Not specified';
$packageDuration = 'Not specified';

if (is_array($booking)) {
    $packageTitle = trim((string)($booking['title'] ?? $packageTitle));
    $tourTypeLabel = trim((string)($booking['tourTypeLabel'] ?? $tourTypeLabel));
    $price = trim((string)($booking['price'] ?? ''));
    $priceNote = trim((string)($booking['priceNote'] ?? ''));
    if ($price !== '') {
        $packagePrice = $price . ($priceNote !== '' ? ' (' . $priceNote . ')' : '');
    }
    $packageDuration = trim((string)($booking['durationLabel'] ?? $packageDuration));
}

$safe = static function (string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$adminSubject = "New Booking Lead - {$packageTitle} - {$guestName}";
$adminHtml = "
<html><body style=\"font-family:Arial,sans-serif;background:#f5f7fa;padding:20px;\">
  <h2 style=\"color:#113d48;\">New Booking Lead</h2>
  <table cellpadding=\"8\" cellspacing=\"0\" border=\"1\" style=\"border-collapse:collapse;background:#fff;border-color:#e5e7eb;\">
    <tr><td><strong>Guest Name</strong></td><td>{$safe($guestName)}</td></tr>
    <tr><td><strong>Facebook Name</strong></td><td>{$safe($fbName)}</td></tr>
    <tr><td><strong>Contact Number</strong></td><td>{$safe($contactNumber)}</td></tr>
    <tr><td><strong>Email</strong></td><td>{$safe($email)}</td></tr>
    <tr><td><strong>Address</strong></td><td>{$safe($address)}</td></tr>
    <tr><td><strong>Package</strong></td><td>{$safe($packageTitle)}</td></tr>
    <tr><td><strong>Tour Type</strong></td><td>{$safe($tourTypeLabel)}</td></tr>
    <tr><td><strong>Price</strong></td><td>{$safe($packagePrice)}</td></tr>
    <tr><td><strong>Duration</strong></td><td>{$safe($packageDuration)}</td></tr>
    <tr><td><strong>Travel Start</strong></td><td>{$safe($travelDate)}</td></tr>
    <tr><td><strong>Travel End</strong></td><td>{$safe($travelEndDate)}</td></tr>
    <tr><td><strong>Adult Pax</strong></td><td>{$safe($paxAdult)}</td></tr>
    <tr><td><strong>Kids Pax</strong></td><td>{$safe($paxKids)}</td></tr>
    <tr><td><strong>Kids 3 & Below</strong></td><td>{$safe($kidsBelow3)}</td></tr>
    <tr><td><strong>Kids 4-12</strong></td><td>{$safe($kids4to12)}</td></tr>
    <tr><td><strong>Pick Up Place</strong></td><td>{$safe($pickupPlace)}</td></tr>
    <tr><td><strong>Pick Up Time</strong></td><td>{$safe($pickupTime)}</td></tr>
    <tr><td><strong>Special Request</strong></td><td>{$safe($specialRequest)}</td></tr>
    <tr><td><strong>Selected Route</strong></td><td>{$safe($selectedRoute)}</td></tr>
    <tr><td><strong>Selected Type</strong></td><td>{$safe($selectedType)}</td></tr>
    <tr><td><strong>Selected Pax</strong></td><td>{$safe($selectedPax)}</td></tr>
  </table>
</body></html>";

$clientSubject = "Booking Request Received - {$siteName}";
$clientHtml = "
<html><body style=\"font-family:Arial,sans-serif;background:#f5f7fa;padding:20px;\">
  <div style=\"max-width:640px;margin:0 auto;background:#fff;padding:24px;border-radius:12px;\">
    <h2 style=\"color:#113d48;margin-top:0;\">Booking Request Received</h2>
    <p>Hi {$safe($guestName)},</p>
    <p>Thank you for choosing {$safe($siteName)}. We received your booking request and our team will contact you soon.</p>
    <p><strong>Package:</strong> {$safe($packageTitle)}<br>
       <strong>Tour Type:</strong> {$safe($tourTypeLabel)}<br>
       <strong>Travel Date:</strong> {$safe($travelDate)}" . ($travelEndDate !== $travelDate ? " to {$safe($travelEndDate)}" : "") . "</p>
    <p>If you have questions, reply to this email or contact {$safe($adminEmail)}.</p>
    <p style=\"margin-top:24px;color:#6b7280;font-size:13px;\">{$safe($siteName)} - Cebu, Philippines</p>
  </div>
</body></html>";

$headersAdmin = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    "From: {$siteName} <{$fromEmail}>",
    "Reply-To: {$email}",
];

$headersClient = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    "From: {$siteName} <{$fromEmail}>",
    "Reply-To: {$adminEmail}",
];

$adminSent = @mail($adminEmail, $adminSubject, $adminHtml, implode("\r\n", $headersAdmin));
$clientSent = @mail($email, $clientSubject, $clientHtml, implode("\r\n", $headersClient));

if (!$adminSent || !$clientSent) {
    respond(500, false, 'Failed to send booking request. Please try again.');
}

respond(200, true, 'Booking request submitted successfully.');

