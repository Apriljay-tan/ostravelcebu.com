import React from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import HappyGuests from '../../Components/HappyGuests/HappyGuests';

export const metadata = {
  title: 'Happy Guests',
  description:
    "Photos and reviews from happy guests who toured Cebu, Moalboal, Oslob, and Bohol with O's Travel and Tours Services.",
};

const page = () => {
  return (
    <div>
      <BreadCumb bgimg="/assets/img/breadcrumb/os-banner.jpg" Title="Happy Guests"></BreadCumb>
      <HappyGuests></HappyGuests>
    </div>
  );
};

export default page;
