import React, { useState, useMemo } from 'react';
import HousingMap from './Map/HousingMap';
import ListingCard from './Listing/ListingCard';
import RoommateMatcher from './Matcher/RoommateMatcher';
import MyBooking from './Booking/MyBooking';
import StudentHero from './Hero/StudentHero';
import { useHousing } from '../../context/HousingContext';
import TrustStrip from './Sections/TrustStrip';
import HowItWorks from './Sections/HowItWorks';
import FeaturesSection from './Sections/FeaturesSection';
import DiscoverySection from './Sections/DiscoverySection';
import SocialFooter from './Sections/SocialFooter';
import styles from './StudentView.module.css';

import logo from '../../assets/image.png';

const StudentView: React.FC = () => {
    const { listings } = useHousing();
    const [activeTab, setActiveTab] = useState<'discover' | 'match' | 'booking'>('discover');

    const [filters, setFilters] = useState<{
        minRent: number;
        maxRent: number;
        minSafety: number;
        roomType: string[];
        gender: string[];
        location?: string;
    }>({
        minRent: 0,
        maxRent: 50000,
        minSafety: 0,
        roomType: [],
        gender: [],
        location: '',
    });

    const handleHeroSearch = (searchTerm: string, type: string) => {
        const newFilters = { ...filters };
        newFilters.location = searchTerm;

        if (type === 'Shared (Find Roommate)') {
            newFilters.roomType = ['Double', 'Triple'];
            setActiveTab('discover'); // Keep on discover for now
        } else {
            newFilters.roomType = ['Single'];
            setActiveTab('discover');
        }
        setFilters(newFilters);

        const listingsElement = document.getElementById('listings-section');
        if (listingsElement) {
            listingsElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filteredListings = useMemo(() => {
        return listings.filter(l => {
            if (l.price < filters.minRent || l.price > filters.maxRent) return false;
            if (l.safetyScore < filters.minSafety) return false;
            if (filters.gender.length > 0 && !filters.gender.includes(l.type)) return false;

            if (filters.location) {
                const loc = filters.location.toLowerCase();
                const matchesLoc = l.location.city.toLowerCase().includes(loc) ||
                    l.location.address.toLowerCase().includes(loc) ||
                    l.title.toLowerCase().includes(loc);
                if (!matchesLoc) return false;
            }

            if (filters.roomType.length > 0) {
                const hasType = l.floors?.some(f => f.rooms.some(r => filters.roomType.includes(r.type)));
                if (!hasType && l.floors.length > 0) return false;
            }
            return true;
        });
    }, [listings, filters]);

    return (
        <div className={styles.container}>
            {activeTab !== 'discover' && (
                <header className={styles.header}>
                    <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={logo} alt="NivasBuddy" style={{ height: '40px' }} />
                        <span>NIVASBUDDY</span>
                    </div>
                    <nav className={styles.nav}>
                        <button className={`${styles.navBtn} ${activeTab === 'discover' ? styles.active : ''}`} onClick={() => setActiveTab('discover')}>Discover</button>
                        <button className={`${styles.navBtn} ${activeTab === 'match' ? styles.active : ''}`} onClick={() => setActiveTab('match')}>Match</button>
                        <button className={`${styles.navBtn} ${activeTab === 'booking' ? styles.active : ''}`} onClick={() => setActiveTab('booking')}>Booking</button>
                    </nav>
                </header>
            )}

            <main className={styles.main} style={{ padding: activeTab === 'discover' ? 0 : undefined }}>
                {activeTab === 'discover' ? (
                    <div className={styles.discoverContainer}>
                        {/* 1. Hero Section */}
                        <StudentHero onSearch={handleHeroSearch} />

                        {/* 2. Trust Strip */}
                        <TrustStrip />

                        {/* 3. Listings Section */}
                        <div id="listings-section" className={styles.contentWrapper} style={{ padding: '40px' }}>
                            <div className={styles.discoverGrid}>
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionTitle}>
                                        Available Housing
                                        <span className={styles.count}> ({filteredListings.length})</span>
                                    </h2>
                                    <div className={styles.inlineNav}>
                                        <button onClick={() => setActiveTab('match')}>Find Roommate</button>
                                        <button onClick={() => setActiveTab('booking')}>My Booking</button>
                                    </div>
                                </div>

                                <div className={styles.cards}>
                                    {filteredListings.map(listing => (
                                        <ListingCard key={listing.id} listing={listing} />
                                    ))}
                                    {filteredListings.length === 0 && (
                                        <div className={styles.noResults}>
                                            No listings match your search.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 4. How It Works */}
                        <HowItWorks />

                        {/* 5. Features Section */}
                        <FeaturesSection />

                        {/* 6. Discovery Section */}
                        <DiscoverySection />

                        {/* 7. Footer */}
                        <SocialFooter />
                    </div>
                ) : activeTab === 'match' ? (
                    <div className={styles.matcherSection}>
                        <RoommateMatcher />
                    </div>
                ) : (
                    <MyBooking />
                )}
            </main>
        </div>
    );
};

export default StudentView;
