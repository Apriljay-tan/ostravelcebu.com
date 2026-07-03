"use client"
import React, { useEffect } from 'react';
import loadBackgroudImages from '../Common/loadBackgroudImages';
import Link from 'next/link';
import Image from 'next/image';

const Cta3 = () => {

    useEffect(() => {
        loadBackgroudImages();
    }, []);

    return (
        <section className="cta-section-2 section-padding fix">
        <div className="left-shape float-bob-x">
            <Image src="/assets/img/tree-shape.png" alt="img" width={180} height={134}   />
        </div>
        <div className="container">
            <div className="cta-wrapper-2 bg-cover" data-background="/assets/img/cta-color-bg.jpg">
                <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                        <div className="cta-content">
                            <div className="section-title">
                                <span className="sub-title text-white wow fadeInUp">
                                    Ready when you are
                                </span>
                                <h2 className="text-white wow fadeInUp wow" data-wow-delay=".3s">
                                    Ready For Your <br/>
                                    Cebu Adventure?
                                </h2>
                            </div>
                            <p className="text-white wow fadeInUp wow" data-wow-delay=".5s">
                                Tell us your travel dates and group size — our local Cebuano team will put together a joiner or private tour that fits your budget. No app to download, just message us and we&apos;ll handle the rest.
                            </p>
                            <div className="cta-actions wow fadeInUp wow" data-wow-delay=".7s">
                                <Link href="/contact" className="theme-btn">
                                    <span>Request A Quote <i className="bi bi-arrow-right"></i></span>
                                </Link>
                                <a href="tel:+639334591419" className="cta-call">
                                    <span className="cta-call-icon"><i className="bi bi-telephone-fill"></i></span>
                                    <span className="cta-call-text">
                                        <small>Call or message us</small>
                                        0933 459 1419
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="cta-image">
                            <div className="cta-travel-photo">
                                <Image src="/assets/img/cta-travel.jpg" alt="Traveler kayaking in a Cebu lagoon" width={560} height={520} className="wow img-custom-anim-right" />
                            </div>
                            <div className="shape float-bob-y">
                                <Image src="/assets/img/cta-shape.png" alt="img" width={254} height={145}   />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </section>
    );
};

export default Cta3;