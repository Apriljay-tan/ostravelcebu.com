import React from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import About2 from '../../Components/About/About2';
import Choose1 from '../../Components/Choose/Choose1';
import Counter4 from '../../Components/Counter/Counter4';
import Team1 from '../../Components/Team/Team1';
import Testimonial3 from '../../Components/Testimonial/Testimonial3';
import Instagram2 from '../../Components/Instagram/Instagram2';

export const metadata = {
  title: 'About',
  description:
    "About O's Travel and Tours Services — a Cebu-based travel agency in Talamban, Cebu City offering joiner and private tours.",
};

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/breadcrumb/os-banner.jpg"
                Title="About Us"
            ></BreadCumb>  
            <About2></About2>   
            <Choose1></Choose1> 
            <Counter4></Counter4>
            <Team1></Team1>
            <Testimonial3></Testimonial3>
            <Instagram2></Instagram2>            
    </div>
  );
};

export default page;