import React, { useState } from 'react';
import { LayoutGrid, IndianRupee, Shield, UserCheck, AlertTriangle } from 'lucide-react';
import { useHousing } from '../../context/HousingContext';
import OccupancyGrid from './Dashboard/OccupancyGrid';
import Occupancy3D from './Dashboard/Occupancy3D';
import RentTracker from './Dashboard/RentTracker';
import SafetyControl from './Safety/SafetyControl';
import styles from './WardenView.module.css';

import logo from '../../assets/image.png';

const WardenView: React.FC = () => {
    const { listings, verifyApplication, approveApplication, rejectApplication, students, applications = [] } = useHousing();
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                        <img src={logo} alt="Logo" style={{ height: '48px' }} />
                        <h2 className={styles.title} style={{ margin: 0 }}>Warden Control Panel</h2>
                    </div>
                    <p className={styles.subtitle}></p>
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

                {activeTab === 'occupancy' && (
                    <div style={{ height: '600px', width: '100%' }}>
                        <Occupancy3D />
                    </div>
                )}

                {activeTab === 'rent' && filteredListings.map((listing) => (
                    <RentTracker key={listing.id} listing={listing} />
                ))}

                {activeTab === 'safety' && filteredListings.map((listing) => (
                    <SafetyControl key={listing.id} initialListing={listing} />
                ))}

                {activeTab === 'applications' && filteredListings.map((listing) => {
                    const listingApps = applications
                        .filter((a) => a.listingId === listing.id)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                    return (
                        <div key={listing.id} className={styles.saasCard}>
                            <div className={styles.saasCardHeader}>
                                <div>
                                    <h3 className={styles.saasTitle}>{listing.title}</h3>
                                    <p className={styles.saasSubtitle}>{listing.location.address}</p>
                                </div>
                                <span className={styles.saasSubtitle}>{listingApps.length} Applications</span>
                            </div>

                            <div className={styles.saasContent}>
                                {listingApps.length === 0 ? (
                                    <div className={styles.emptyState}>No applications yet.</div>
                                ) : (
                                    <div className={styles.appList}>
                                        {listingApps.map((app) => {
                                            const student = students.find(s => s.id === app.studentId);
                                            return (
                                                <div key={app.id} className={styles.appItem}>
                                                    <div className={styles.studentInfo}>
                                                        <span className={styles.studentName}>{student?.name || 'Unknown Student'}</span>
                                                        <span className={styles.studentDate}>Applied on {new Date(app.createdAt).toLocaleDateString()}</span>
                                                    </div>

                                                    <div className={styles.actions}>
                                                        <span className={`${styles.statusPill} ${styles[app.status]}`}>
                                                            {app.status}
                                                        </span>

                                                        {app.status === 'applied' && (
                                                            <button
                                                                className={`${styles.btnAction} ${styles.btnSecondary}`}
                                                                onClick={() => verifyApplication(app.id)}
                                                            >
                                                                Verify
                                                            </button>
                                                        )}

                                                        {app.status === 'verified' && (
                                                            <>
                                                                <button
                                                                    className={`${styles.btnAction} ${styles.btnPrimary}`}
                                                                    onClick={() => approveApplication(app.id)}
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    className={`${styles.btnAction} ${styles.btnSecondary}`}
                                                                    style={{ color: '#ef4444', borderColor: '#fee2e2' }}
                                                                    onClick={() => rejectApplication(app.id)}
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WardenView;
