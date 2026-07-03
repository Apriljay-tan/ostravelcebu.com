"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";
import { trackInitiateCheckout } from "@/lib/meta-pixel";

const destinationContent = [
  {
    img: "/assets/img/destination/new/01.jpg",
    location: "Moalboal",
    title: "Kawasan Falls & Sardine Run",
    routeKey: "1d-moalboal",
    href: "/tour-packages?route=1d-moalboal&type=joiner",
  },
  {
    img: "/assets/img/destination/new/02.jpg",
    location: "Oslob",
    title: "Whale Shark Watching",
    routeKey: "1d-oslob",
    href: "/tour-packages?route=1d-oslob&type=joiner",
  },
  {
    img: "/assets/img/destination/new/03.jpg",
    location: "Bohol",
    title: "Chocolate Hills Countryside",
    routeKey: "1d-bohol",
    href: "/tour-packages?route=1d-bohol&type=joiner",
  },
  {
    img: "/assets/img/destination/new/04.jpg",
    location: "Cebu",
    title: "Island & Nature Tours",
    routeKey: "1d-cebu-city",
    href: "/tour-packages?route=1d-cebu-city&type=joiner",
  },
];

const Destination2 = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 767,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "28px" },
      },
    ],
  };

  return (
    <section className="os-destinations-section section-padding fix">
      <div className="container">
        <div className="os-dest-header">
          <div className="os-dest-header-text">
            <span className="sub-title wow fadeInUp">Our Destinations</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">
              Top Places We Take You To
            </h2>
            <p className="wow fadeInUp" data-wow-delay=".3s">
              Swim with whale sharks, chase sardine runs, and cross to Bohol — handpicked
              spots our guests love most across Cebu and nearby islands.
            </p>
          </div>
          <div className="os-dest-header-actions wow fadeInUp" data-wow-delay=".4s">
            <div className="os-dest-nav" aria-label="Destination carousel controls">
              <button type="button" className="os-dest-nav-btn" onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous destination">
                <i className="bi bi-arrow-left"></i>
              </button>
              <button type="button" className="os-dest-nav-btn" onClick={() => sliderRef.current?.slickNext()} aria-label="Next destination">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <Link href="/tour-packages" className="theme-btn">
              View Packages <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="os-dest-carousel-outer">
        <div className="os-dest-fade os-dest-fade-left" aria-hidden="true"></div>
        <div className="os-dest-fade os-dest-fade-right" aria-hidden="true"></div>
        <div className="container os-dest-carousel-inner">
          <Slider ref={sliderRef} {...settings} className="os-dest-slider">
            {destinationContent.map((item, i) => (
              <div key={item.location} className="os-dest-slide">
                <Link
                  href={item.href}
                  className="os-dest-card"
                  onClick={() =>
                    trackInitiateCheckout({
                      packageName: `${item.location} — ${item.title}`,
                      routeKey: item.routeKey,
                      tourType: 'joiner',
                    })
                  }
                >
                  <div className="os-dest-card-media">
                    <Image
                      src={item.img}
                      alt={`${item.location} — ${item.title}`}
                      fill
                      sizes="(max-width: 767px) 88vw, (max-width: 1199px) 45vw, 32vw"
                      className="os-dest-card-img"
                    />
                    <span className="os-dest-card-index">0{i + 1}</span>
                    <span className="os-dest-card-badge">
                      <i className="bi bi-geo-alt-fill"></i> {item.location}
                    </span>
                    <div className="os-dest-card-overlay">
                      <div className="os-dest-card-copy">
                        <h3>{item.location}</h3>
                        <p>{item.title}</p>
                      </div>
                      <span className="os-dest-card-arrow" aria-hidden="true">
                        <i className="bi bi-arrow-up-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Destination2;
