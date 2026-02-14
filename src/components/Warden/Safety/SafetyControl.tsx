import React, { useState, useEffect } from 'react';
import { useHousing } from '../../../context/HousingContext';
import { SafetyFeature, SAFETY_WEIGHTS, Listing } from '../../../types';
import { Shield, ShieldCheck, ShieldAlert, CheckCircle } from 'lucide-react';
import { calculateSafetyScore, getSafetyLevel } from '../../../utils/safety';
import styles from './SafetyControl.module.css';

interface SafetyControlProps {
    initialListing: Listing;
}

const SafetyControl: React.FC<SafetyControlProps> = ({ initialListing }) => {
    const { updateListing, listings } = useHousing(); // Need listings to get live updates
    // Find the current version of the passed listing from context to stay reactive
    const listing = listings.find(l => l.id === initialListing.id) || initialListing;

    if (!listing) return <div>No property assigned.</div>;

    const safetyLevel = getSafetyLevel(listing.safetyScore);

    const toggleFeature = (feature: SafetyFeature) => {
        const currentFeatures = listing.safetyFeatures || [];
        const exists = currentFeatures.includes(feature);

        let newFeatures;
        if (exists) {
            newFeatures = currentFeatures.filter(f => f !== feature);
        } else {
            newFeatures = [...currentFeatures, feature];
        }

        updateListing(listing.id, { safetyFeatures: newFeatures });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Safety Control Panel</h2>

            {/* 3D Score Card */}
            <div className={styles.scoreCard}>
                <div className={styles.scoreHeader}>
                    <span className={styles.scoreLabel}>Current Safety Score</span>
                    <span className={styles.scoreValue}>
                        {listing.safetyScore}/100
                    </span>
                </div>

                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${listing.safetyScore}%` }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#636e72', fontWeight: 600 }}>
                    <ShieldCheck size={20} color={safetyLevel.color} />
                    <span>Status: <span style={{ color: safetyLevel.color }}>{safetyLevel.label}</span></span>
                </div>
            </div>

            {/* 3D Feature Grid */}
            <div className={styles.featuresGrid}>
                {Object.keys(SAFETY_WEIGHTS).map((key) => {
                    const feature = key as SafetyFeature;
                    const isActive = listing.safetyFeatures?.includes(feature);

                    return (
                        <div
                            key={feature}
                            className={`${styles.featureCard} ${isActive ? styles.active : ''}`}
                            onClick={() => toggleFeature(feature)}
                        >
                            <div className={styles.featureIcon}>
                                {isActive ? <CheckCircle size={28} /> : <Shield size={28} />}
                            </div>
                            <div className={styles.featureInfo}>
                                <h3>{feature}</h3>
                                <p>+{SAFETY_WEIGHTS[feature]} pts</p>
                            </div>
                            <div className={styles.toggle}>
                                {isActive ? 'Active' : 'Enable'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SafetyControl;
