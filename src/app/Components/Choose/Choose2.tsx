"use client"
import React, { useEffect } from 'react';
import loadBackgroudImages from '../Common/loadBackgroudImages';
import Image from 'next/image';

const Choose2 = () => {

            useEffect(() => {
                loadBackgroudImages();
            }, []);

    return (
        <section className="choose-us-section section-padding bg-cover fix" data-background="/assets/img/choose-us-bg-2.jpg" >
            <div className="container">
                <div className="choose-us-wrapper">
                    <div className="row g-4 align-items-center">
                        <div className="col-xl-7 col-lg-6">
                            <div className="choose-us-content">
                                <div className="section-title">
                                    <span className="sub-title wow fadeInUp">
                                        Why Choose Us
                                    </span>
                                    <h2 className="wow fadeInUp wow" data-wow-delay=".3s">
                                        Get The Best Travel Experience
                                    </h2>
                                </div>
                                <p className="wow fadeInUp wow" data-wow-delay=".3s">
                                    We are a Cebu-based team offering joiner and private tours with clear pricing, reliable pickups, and guides who know Cebu, Moalboal, Oslob, and Bohol firsthand.
                                </p>
                                <div className="choose-us-area">
                                    <div className="line-shape">
                                        <Image src="/assets/img/line-shape2.png" alt="img" width={2} height={279}   />
                                    </div>
                                    <div className="choose-us-items wow fadeInUp wow" data-wow-delay=".3s">
                                        <h3 className="number">
                                            01
                                        </h3>
                                        <div className="content">
                                            <h4>
                                                Joiner or Private — Your Choice
                                            </h4>
                                            <p>
                                                Pick affordable joiner tours or a private package for your own group. Every rate is listed clearly on our Tour Packages page.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="choose-us-items wow fadeInUp wow" data-wow-delay=".5s">
                                        <h3 className="number">
                                            02
                                        </h3>
                                        <div className="content">
                                            <h4>
                                                Travel With More Confidence
                                            </h4>
                                            <p>
                                                Registered business with permits on our Legitimacy Corner. Real local guides, drivers, and transparent inclusions on every itinerary.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="choose-us-items wow fadeInUp wow" data-wow-delay=".7s">
                                        <h3 className="number">
                                            03
                                        </h3>
                                        <div className="content">
                                            <h4>
                                                See What You Really Get From Us
                                            </h4>
                                            <p>
                                                Full itineraries, optional activities, and exclusions are listed per package — no hidden charges, ever.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 wow fadeInUp wow" data-wow-delay=".3s">
                            <div className="choose-us-thumb">
                                <Image src="/assets/img/guests/g12.jpg" className="wow img-custom-anim-left" alt="Happy guests on a Cebu tour" width={828} height={620}   />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Choose2;