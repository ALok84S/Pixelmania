import React from 'react';
import { useHousing } from '../../../context/HousingContext';
import { BarChart, Users, Bed, CreditCard } from 'lucide-react';
import styles from './DashboardAnalytics.module.css';

const DashboardAnalytics: React.FC = () => {
    const { listings, students } = useHousing();
    // Assuming warden owns the first listing
    const listing = listings[0];

    if (!listing) return null;

    // Calculate stats
    const totalBeds = 50; // Mock total capacity if not dynamically calculated from floors
    const occupiedBeds = students.length;
    const vacancyRate = Math.round(((totalBeds - occupiedBeds) / totalBeds) * 100);
    const revenue = students.reduce((acc, s) => {
        // Ideally link student to room price, but for now use listing base price or mock
        return acc + (listing.price || 10000);
    }, 0);

    const stats = [
        { title: 'Total Revenue', value: `₹${revenue.toLocaleString()}`, icon: <CreditCard size={24} />, color: '#10b981' },
        { title: 'Occupancy Rate', value: `${100 - vacancyRate}%`, icon: <Users size={24} />, color: '#3b82f6' },
        { title: 'Available Beds', value: totalBeds - occupiedBeds, icon: <Bed size={24} />, color: '#f59e0b' },
        { title: 'Pending Dues', value: '₹12,000', icon: <BarChart size={24} />, color: '#ef4444' },
    ];

    return (
        <div className={styles.grid}>
            {stats.map((stat, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                        {stat.icon}
                    </div>
                    <div className={styles.content}>
                        <p className={styles.label}>{stat.title}</p>
                        <h3 className={styles.value}>{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardAnalytics;
