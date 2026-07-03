import React, { Suspense } from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import BookingForm from '../../Components/Contact/BookingForm';

export const metadata = {
  title: 'Book Your Tour',
  description:
    "Book your Cebu tour with O's Travel and Tours Services. Submit a booking request for joiner or private packages.",
};

const page = () => {
  return (
    <div>
      <BreadCumb bgimg="/assets/img/breadcrumb/os-banner.jpg" Title="Book Your Tour"></BreadCumb>
      <Suspense fallback={null}>
        <BookingForm />
      </Suspense>
    </div>
  );
};

export default page;
