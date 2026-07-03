"use client";

import Image from "next/image";
import React from "react";
import TaggboxReviews from "../Reviews/TaggboxReviews";

const Testimonial2 = () => {
  return (
    <section className="testimonial-section section-padding fix section-bg">
      <div className="container">
        <div className="testimonial-wrapper-2">
          <div className="row g-4">
            <div className="col-lg-5 wow fadeInUp wow" data-wow-delay=".3s">
              <div className="testimonial-image">
                <Image src="/assets/img/testimonial/01.jpg" alt="Happy guest" width={450} height={530} />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="testimonial-content">
                <div className="section-title">
                  <span className="sub-title wow fadeInUp">Guest Reviews</span>
                  <h2 className="wow fadeInUp wow" data-wow-delay=".5s">
                    What They Say About Us
                  </h2>
                  <p className="mt-3" style={{ color: "var(--text)" }}>
                    Real Facebook reviews from guests who toured Cebu, Moalboal, Oslob, and Bohol with us.
                  </p>
                </div>
                <TaggboxReviews className="os-taggbox-embedded" minHeight={480} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial2;
