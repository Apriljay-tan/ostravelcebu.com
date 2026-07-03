import React from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import Legitimacy from '../../Components/Legitimacy/Legitimacy';

export const metadata = {
  title: 'Legitimacy Corner',
  description:
    "Proof that O's Travel and Tours Services is a legitimate, locally-operated travel agency in Cebu City.",
};

const page = () => {
  return (
    <div>
      <BreadCumb bgimg="/assets/img/breadcrumb/os-banner.jpg" Title="Legitimacy Corner"></BreadCumb>
      <Legitimacy></Legitimacy>
    </div>
  );
};

export default page;
