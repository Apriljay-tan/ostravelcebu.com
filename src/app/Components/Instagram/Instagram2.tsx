"use client";

import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';

const Instagram2 = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
          { breakpoint: 1399, settings: { slidesToShow: 6 } },
          { breakpoint: 1199, settings: { slidesToShow: 4 } },
          { breakpoint: 575, settings: { slidesToShow: 2 } },
        ],
    };

    const guestPhotos = Array.from({ length: 15 }, (_, i) => ({
        img: `/assets/img/guests/g${i + 1}.jpg`,
    }));

    return (
        <section className="instagram-section section-padding fix section-bg">
            <div className="container-fluid">
                <div className="section-title text-center mb-4">
                    <span className="sub-title">Real Guest Moments</span>
                    <h2>More Happy Travelers</h2>
                </div>
                <Slider {...settings}>
                    {guestPhotos.map((item, i) => (
                        <div key={item.img} className="px-2">
                            <div className="os-insta-slide">
                                <Image
                                    src={item.img}
                                    alt={`Happy guest ${i + 1}`}
                                    width={280}
                                    height={280}
                                    className="os-insta-img"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Instagram2;
