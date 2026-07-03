"use client"
import React, { useEffect } from 'react';
import loadBackgroudImages from '../Common/loadBackgroudImages';
import Link from 'next/link';

const Footer1 = () => {

    useEffect(() => {
        loadBackgroudImages();
    }, []);

    return (
        <footer className="footer-section fix bg-cover" data-background="/assets/img/footer/footer-bg.jpg">
            <div className="container">
                <div className="footer-widget-wrapper-new">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5 col-md-8 col-sm-12 wow fadeInUp wow" data-wow-delay=".2s">
                            <div className="single-widget-items os-footer-about">
                                <div className="widget-head os-footer-logo">
                                    <Link href="/">
                                        <img src="/assets/img/logo/os-logo.png" alt="O's Travel and Tours Services" />
                                    </Link>
                                </div>
                                <div className="footer-content">
                                    <p>
                                        O&apos;s Travel and Tours Services is your friendly local team for joiner and private tours across Cebu, Bohol, Moalboal and Oslob — with transparent, all-honest pricing.
                                    </p>
                                    <div className="social-icon d-flex align-items-center os-footer-social">
                                        <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                                        <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                                        <a href="#" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
                                        <a href="mailto:ostravelandtoursservices@gmail.com" aria-label="Email"><i className="bi bi-envelope-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 ps-lg-5 wow fadeInUp wow" data-wow-delay=".4s">
                            <div className="single-widget-items">
                                <div className="widget-head">
                                   <h4>Quick Links</h4>
                                </div>
                                <ul className="list-items">
                                    <li>
                                        <Link href="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/tour-packages">
                                            Tour Packages
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/legitimacy-corner">
                                            Legitimacy Corner
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/happy-guests">
                                            Happy Guests
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ps-lg-5 wow fadeInUp wow" data-wow-delay=".6s">
                            <div className="single-widget-items">
                                <div className="widget-head">
                                   <h4>Popular Tours</h4>
                                </div>
                                <ul className="list-items">
                                    <li>
                                    <Link href="/tour-packages">
                                            Cebu City Tour
                                    </Link>
                                    </li>
                                    <li>
                                    <Link href="/tour-packages">
                                            Moalboal Tour
                                    </Link>
                                    </li>
                                    <li>
                                    <Link href="/tour-packages">
                                            Oslob Whale Shark Tour
                                    </Link>
                                    </li>
                                    <li>
                                    <Link href="/tour-packages">
                                            Bohol Countryside Tour
                                    </Link>
                                    </li>
                                    <li>
                                    <Link href="/tour-packages">
                                            Private &amp; Joiner Packages
                                    </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ps-xl-5 wow fadeInUp wow" data-wow-delay=".6s">
                            <div className="single-widget-items">
                                <div className="widget-head">
                                   <h4>Contact Us</h4>
                                </div>
                                <div className="contact-info">
                                    <div className="contact-items">
                                        <div className="icon">
                                        <i className="bi bi-geo-alt-fill"></i>
                                        </div>
                                        <div className="content">
                                            <h6>Talamban, Cebu City, <br/>
                                                Philippines, 6000
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="contact-items">
                                        <div className="icon">
                                        <i className="bi bi-envelope-fill"></i>
                                        </div>
                                        <div className="content">
                                         <h6>
                                             <a href="mailto:ostravelandtoursservices@gmail.com">ostravelandtoursservices@gmail.com</a>
                                         </h6>
                                      </div>
                                    </div>
                                    <div className="contact-items">
                                       <div className="icon">
                                       <i className="bi bi-telephone-fill"></i>
                                       </div>
                                       <div className="content">
                                           <h6>
                                               <a href="tel:+639334591419">0933 459 1419</a>
                                           </h6>
                                       </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-wrapper">
                        <p className="wow fadeInUp" data-wow-delay=".3s">
                            Copyright © <span>O&apos;s Travel and Tours Services,</span> All Rights Reserved.
                        </p>
                        <p className="os-credit wow fadeInUp" data-wow-delay=".5s">
                            Website developed by <a href="https://syntrixph.com" target="_blank" rel="noopener noreferrer">SYNTRIX PH</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer1;