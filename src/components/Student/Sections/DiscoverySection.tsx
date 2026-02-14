import React, { useState } from 'react';
import { MapPin, TrendingUp, ChevronRight } from 'lucide-react';
import styles from './DiscoverySection.module.css';

const CAMPUS_HUBS = ["North Campus, Delhi", "Koramangala, Bangalore", "Powai, Mumbai", "Hinjewadi, Pune", "Sector 125, Noida"];

const TRENDING_HOSTELS = [
    { title: "Zolo Stays Premium", price: "₹18,000", score: 9.9, loc: "Mumbai", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Stanza Living Tokyo", price: "₹14,500", score: 9.5, loc: "Delhi", img: "https://images.unsplash.com/photo-1522771753018-be8071801d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "YourSpace Elite", price: "₹22,000", score: 9.7, loc: "Bangalore", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Oxford Caps", price: "₹12,000", score: 9.2, loc: "Pune", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
];

const DiscoverySection: React.FC = () => {
    const [activeHub, setActiveHub] = useState(CAMPUS_HUBS[0]);

    return (
        <section className={styles.section}>

            {/* Campus Selector */}
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.title}>Explore Top Student Hubs</h2>
                    <p className={styles.subtitle}>Popular areas near major universities</p>
                </div>

                <div className={styles.pillsScroll}>
                    {CAMPUS_HUBS.map(hub => (
                        <button
                            key={hub}
                            className={`${styles.pill} ${activeHub === hub ? styles.active : ''}`}
                            onClick={() => setActiveHub(hub)}
                        >
                            <MapPin size={16} /> {hub}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trending Carousel */}
            <div className={styles.trendingContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.title}>Trending This Week <TrendingUp size={24} color="#ef4444" /></h2>
                    <a href="#" className={styles.viewAll}>View All <ChevronRight size={16} /></a>
                </div>

                <div className={styles.carousel}>
                    {TRENDING_HOSTELS.map((hostel, i) => (
                        <div key={i} className={styles.trendCard}>
                            <div className={styles.cardImageWrapper}>
                                <img src={hostel.img} alt={hostel.title} className={styles.cardImage} />
                                <div className={styles.scoreBadge}>{hostel.score}</div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{hostel.title}</h3>
                                <p className={styles.cardLoc}>{hostel.loc}</p>
                                <div className={styles.cardPrice}>
                                    <span>{hostel.price}</span>/mo
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default DiscoverySection;
