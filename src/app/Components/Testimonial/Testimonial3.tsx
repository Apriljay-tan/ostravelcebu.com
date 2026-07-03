"use client";

import React, { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import TaggboxReviews from "../Reviews/TaggboxReviews";
import GuestSlideshow from "../Common/GuestSlideshow";
const Testimonial3 = () => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return (
    <section
      className="testimonial-section section-padding fix bg-cover"
      data-background="/assets/img/testimonial/testimonial-bg.jpg"
    >
      <div className="container">
        <div className="testimonial-wrapper-3">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6 wow fadeInUp wow" data-wow-delay=".3s">
              <div className="testimonial-image os-testimonial-guest-slideshow">
                <GuestSlideshow />
              </div>
            </div>            <div className="col-lg-6">
              <div className="testimonial-content">
                <div className="section-title">
                  <span className="sub-title wow fadeInUp">Guest Reviews</span>
                  <h2 className="wow fadeInUp wow" data-wow-delay=".2s">
                    Travelers Love Our Tours
                  </h2>
                  <p className="mt-3" style={{ color: "var(--text)" }}>
                    See what guests are saying on Facebook about their experience with O&apos;s Travel.
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

export default Testimonial3;
