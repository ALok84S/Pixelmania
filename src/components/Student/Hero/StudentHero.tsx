import React, { useState } from 'react';
import { Search, ShieldCheck, MapPin, Users, Heart } from 'lucide-react';
import styles from './StudentHero.module.css';

interface StudentHeroProps {
    onSearch: (searchTerm: string, type: string) => void;
}

const StudentHero: React.FC<StudentHeroProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Single Room');

    const handleSearch = () => {
        onSearch(searchTerm, searchType);
    };

    return (
        <div className={styles.heroContainer}>
            <div className={styles.contentGrid}>
                {/* Left Side: Copy */}
                <div className={styles.leftColumn}>
                    <div className={styles.trustBadge}>
                        <span className={styles.greenDot}></span>
                        <span className={styles.trustText}>LIVE IN 12+ UNIVERSITY HUBS</span>
                    </div>

                    <h1 className={styles.heading}>
                        Safe Spaces for <br />
                        <span className={styles.headingHighlight}>Smart Students.</span>
                    </h1>

                    <p className={styles.subheading}>
                        The only platform combining <strong>Verified Safety Scores</strong> with
                        <strong> AI Roommate Matching</strong>. Find your home, not just a bed.
                    </p>

                    {/* Glass Search Bar */}
                    <div className={styles.searchBar}>
                        <div className={styles.searchInputWrapper}>
                            <MapPin className={styles.iconViolet} size={22} />
                            <input
                                type="text"
                                placeholder="Enter University or City..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className={styles.searchSelectWrapper}>
                            <Users className={styles.iconViolet} size={22} />
                            <select
                                className={styles.searchSelect}
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                            >
                                <option>Single Room</option>
                                <option>Shared (Find Roommate)</option>
                            </select>
                        </div>
                        <button className={styles.searchButton} onClick={handleSearch}>
                            <Search size={28} />
                        </button>
                    </div>
                </div>

                {/* Right Side: 3D Scene */}
                <div className={styles.rightColumn}>
                    <div className={styles.heroScene}>
                        {/* Main 3D Card */}
                        <div className={styles.imageCard}>
                            <img
                                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800"
                                alt="Premium Student Housing"
                                className={styles.heroImage}
                            />
                        </div>

                        {/* Floating "Orbit" Widgets */}

                        {/* 1. Safety Score (Left Orbit) */}
                        <div className={`${styles.floatingWidget} ${styles.safetyCard}`}>
                            <div className={`${styles.widgetIcon} ${styles.bgOrange}`}>
                                <ShieldCheck size={28} />
                            </div>
                            <div className={styles.widgetText}>
                                <h4>Safety Score</h4>
                                <p>9.8/10</p>
                            </div>
                        </div>

                        {/* 2. Roommate Match (Right Orbit) */}
                        <div className={`${styles.floatingWidget} ${styles.matchCard}`}>
                            <div className={styles.avatarGroup}>
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=1)' }} />
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=5)' }} />
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=8)' }} />
                            </div>
                            <h3 className={styles.matchLabel}>Ideal Roommate!</h3>
                            <p className={styles.matchSub}>95% Compatibility Match</p>
                            <div style={{
                                position: 'absolute',
                                top: -15,
                                right: -15,
                                background: '#FF9F43',
                                padding: 8,
                                borderRadius: '50%',
                                color: 'white',
                                boxShadow: '0 8px 16px rgba(255, 159, 67, 0.4)'
                            }}>
                                <Heart size={20} fill="white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHero;
