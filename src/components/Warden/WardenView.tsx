import React, { useState } from 'react';
import { LayoutGrid, IndianRupee, Shield, UserCheck, AlertTriangle } from 'lucide-react';
import { useHousing } from '../../context/HousingContext';
// import OccupancyGrid from './Dashboard/OccupancyGrid';
// import RentTracker from './Dashboard/RentTracker';
// import SafetyControl from './Safety/SafetyControl';
import styles from './WardenView.module.css';

const WardenView: React.FC = () => {
    // Debug: Check if context loads
    const context = useHousing();
    console.log("WardenView Context:", context);

    const { listings, verifyApplication, approveApplication, students } = context;
    // Handle potential undefined context values if any (though useHousing throws)
    const applications = context.applications || [];

    const [selectedListingId, setSelectedListingId] = useState<string>("all");
    const [activeTab, setActiveTab] = useState<'occupancy' | 'rent' | 'safety' | 'applications'>('occupancy');

    const filteredListings = selectedListingId === "all"
        ? listings
        : listings.filter((l) => l.id === selectedListingId);

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <h2 className={styles.title}>Warden Control Panel (DEBUG MODE)</h2>
                    <p className={styles.subtitle}>
                        If you see this, the main view is working. Child components are disabled.
                    </p>
                </div>

                <select
                    className={styles.propertySelect}
                    value={selectedListingId}
                    onChange={(e) => setSelectedListingId(e.target.value)}
                >
                    <option value="all">All Properties</option>
                    {listings.map((l) => (
                        <option key={l.id} value={l.id}>{l.title}</option>
                    ))}
                </select>
            </div>

            {/* Tabs */}
            <div className={styles.tabsList}>
                <button
                    className={`${styles.tabTrigger} ${activeTab === 'occupancy' ? styles.active : ''}`}
                    onClick={() => setActiveTab('occupancy')}
                >
                    <LayoutGrid size={16} /> Occupancy (Disabled)
                </button>
                <button
                    className={`${styles.tabTrigger} ${activeTab === 'rent' ? styles.active : ''}`}
                    onClick={() => setActiveTab('rent')}
                >
                    <IndianRupee size={16} /> Rent (Disabled)
                </button>
                <button
                    className={`${styles.tabTrigger} ${activeTab === 'safety' ? styles.active : ''}`}
                    onClick={() => setActiveTab('safety')}
                >
                    <Shield size={16} /> Safety (Disabled)
                </button>
                <button
                    className={`${styles.tabTrigger} ${activeTab === 'applications' ? styles.active : ''}`}
                    onClick={() => setActiveTab('applications')}
                >
                    <UserCheck size={16} /> Applications
                </button>
            </div>

            {/* Content */}
            <div className={styles.grid}>
                <div style={{ padding: 20, background: '#fee2e2', borderRadius: 12, border: '1px solid #ef4444', color: '#b91c1c' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><AlertTriangle /> Diagnostic Area</h3>
                    <p>Active Tab: <strong>{activeTab}</strong></p>
                    <p>Listings Loaded: <strong>{listings.length}</strong></p>
                    <p>Applications Loaded: <strong>{applications.length}</strong></p>
                </div>

                {activeTab === 'applications' && filteredListings.map((listing) => {
                    const listingApps = applications
                        .filter((a) => a.listingId === listing.id)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                    return (
                        <div key={listing.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{listing.title}</h3>
                            </div>
                            <div className={styles.cardContent}>
                                <p>Applications found: {listingApps.length}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WardenView;
