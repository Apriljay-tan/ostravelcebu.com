import Image from 'next/image';
import React from 'react';

const Contact = () => {
    return (
        <div>
            
         <section className="contact-us-section fix section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="contact-us-main">
                            <div className="contact-box-items">
                                <div className="icon">
                                    <Image src="/assets/img/icon/18.svg" alt="img" width={70} height={70}   />
                                </div>
                                <div className="content">
                                    <h3>
                                        Our Office
                                    </h3>
                                    <p>
                                        Talamban, Cebu City, Philippines, 6000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="contact-us-main style-2">
                            <div className="contact-box-items">
                                <div className="icon">
                                    <Image src="/assets/img/icon/19.svg" alt="img" width={70} height={70}   />
                                </div>
                                <div className="content">
                                    <h3>
                                        <a href="mailto:ostravelandtoursservices@gmail.com">ostravelandtoursservices@gmail.com</a>
                                    </h3>
                                    <p>
                                        Email us anytime for any kind <br/> of inquiry.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="contact-us-main">
                            <div className="contact-box-items">
                                <div className="icon">
                                    <Image src="/assets/img/icon/20.svg" alt="img" width={70} height={70}   />
                                </div>
                                <div className="content">
                                    <h3>
                                        <a href="tel:+639334591419">0933 459 1419</a>
                                    </h3>
                                    <p>
                                        Call or text us anytime, we&apos;re happy to help.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </section>           

          <section className="contact-us-section-2 section-bg-2 fix">
            <div className="container">
                <div className="contact-us-wrapper">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="contact-us-contact">
                                <div className="section-title">
                                    <span className="sub-title text-white wow fadeInUp">
                                        Contact us
                                    </span>
                                    <h2 className=" text-white wow fadeInUp wow" data-wow-delay=".2s">
                                        Send Message Anytime
                                    </h2>
                                </div>
                                <div className="comment-form-wrap">
                                    <form action="#" id="contact-form" method="POST">
                                        <div className="row g-4">
                                            <div className="col-lg-6">
                                                <div className="form-clt">
                                                    <input type="text" name="name" id="name" placeholder="Your Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-clt">
                                                    <input type="text" name="email" id="email4" placeholder="Your Email" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-clt">
                                                   <input type="text" name="subject" id="name" placeholder="Subject" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-clt">
                                                    <textarea name="message" id="message" placeholder="Your Message"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <button type="submit" className="theme-btn">
                                                    Submit Massage
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="map-area">
                                <div className="google-map">
                                    <iframe src="https://www.google.com/maps?q=Talamban,+Cebu+City,+Philippines&output=embed" loading="lazy" title="O's Travel and Tours Services - Talamban, Cebu City"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </section>           
        </div>
    );
};

export default Contact;