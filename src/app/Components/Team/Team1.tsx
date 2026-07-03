import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Team1 = () => {
    const teamContent = [
        { img: '/assets/img/team/eric-o.jpg', name: "Eric O.", role: 'CEO' },
        { img: '/assets/img/team/02.jpg', name: 'Local Guide Team', role: 'Cebu City & Heritage Tours' },
        { img: '/assets/img/team/03.jpg', name: 'Ocean Adventures Crew', role: 'Moalboal & Oslob Tours' },
        { img: '/assets/img/team/04.jpg', name: 'Bohol Countryside Team', role: 'Ferry & Countryside Tours' },
    ];

    return (
        <section className="team-section fix section-padding">
            <div className="container">
                <div className="section-title text-center">
                    <span className="sub-title wow fadeInUp">
                        The People Behind Your Trip
                    </span>
                    <h2 className="wow fadeInUp wow" data-wow-delay=".2s">Meet O&apos;s Travel Team</h2>
                    <p style={{ maxWidth: '640px', margin: '12px auto 0', color: 'var(--text)' }}>
                        A friendly Cebu-based crew of coordinators, guides, and drivers who make every joiner and private tour smooth from pickup to drop-off.
                    </p>
                </div>
                <div className="row">
                {teamContent.map((item, i) => (
                    <div key={i} className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp wow" data-wow-delay=".2s">
                        <div className="team-card-item os-team-card">
                            <div className="team-image">
                                <Image src={item.img} alt={item.name} width={306} height={348} />
                            </div>
                            <div className="team-content">
                                <h4>{item.name}</h4>
                                <p>{item.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <div className="text-center mt-4">
                    <Link href="/happy-guests" className="theme-btn style-2">
                        See Happy Guests <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Team1;
