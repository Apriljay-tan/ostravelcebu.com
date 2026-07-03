import React, { Suspense } from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import TourPackages from '../../Components/TourPackages/TourPackages';

export const metadata = {
  title: 'Tour Packages',
  description:
    "O's Travel and Tours Services — Joiner and Private tour packages for Cebu City, Moalboal, Oslob, and Bohol.",
};

const page = () => {
  return (
    <div>
      <BreadCumb bgimg="/assets/img/breadcrumb/os-banner.jpg" Title="Tour Packages"></BreadCumb>
      <Suspense fallback={null}>
        <TourPackages></TourPackages>
      </Suspense>
    </div>
  );
};

export default page;
