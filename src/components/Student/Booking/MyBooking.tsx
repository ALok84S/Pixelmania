import React, { useEffect, useState } from 'react';
import { useHousing } from '../../../context/HousingContext';
import { Bed, Listing, Room } from '../../../types';
import { CheckCircle, Clock, MapPin, Box, Home } from 'lucide-react';
import styles from './MyBooking.module.css';

const MyBooking: React.FC = () => {
    const { listings, students } = useHousing();
    // Mock logged-in student
    const currentStudent = students[0];

    const [booking, setBooking] = useState<{
        listing: Listing;
        room: Room;
        bed: Bed;
    } | null>(null);

    useEffect(() => {
        // Find booking for current student
        // Note: In real app, search by studentId using backend query
        // Here we search by studentName matching the bed's studentName
        if (!currentStudent) return;

        for (const listing of listings) {
            for (const floor of listing.floors) {
                for (const room of floor.rooms) {
                    const bed = room.beds.find(b => b.studentName === currentStudent.name);
                    if (bed) {
                        setBooking({ listing, room, bed });
                        return;
                    }
                }
            }
        }
        setBooking(null);
    }, [listings, currentStudent]);

    if (!booking) {
        return (
            <div className={styles.emptyContainer}>
                <Box size={64} className={styles.emptyIcon} />
                <h2>No Active Booking</h2>
                <p>You haven't booked a room yet. Go to Discover to find your new home!</p>
            </div>
        );
    }

    const { listing, room, bed } = booking;
    const isRentPaid = (date?: string) => {
        if (!date) return false;
        const paymentDate = new Date(date);
        const now = new Date();
        return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
    };

    const paidStatus = isRentPaid(bed.lastPaymentDate);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Booking</h1>

            <div className={styles.card}>
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.hostelName}>{listing.title}</h2>
                        <p className={styles.location}>
                            <MapPin size={16} /> {listing.location.address}, {listing.location.city}
                        </p>
                    </div>
                    <div className={styles.statusBadge}>
                        <CheckCircle size={16} /> Active
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.infoBlock}>
                        <span className={styles.label}>Room Number</span>
                        <span className={styles.value}>{room.roomNumber}</span>
                    </div>
                    <div className={styles.infoBlock}>
                        <span className={styles.label}>Floor</span>
                        <span className={styles.value}>{listing.floors.find(f => f.rooms.includes(room))?.floorNumber || 'N/A'}</span>
                    </div>
                    <div className={styles.infoBlock}>
                        <span className={styles.label}>Bed ID</span>
                        <span className={styles.value}>{bed.id}</span>
                    </div>
                    <div className={styles.infoBlock}>
                        <span className={styles.label}>Room Type</span>
                        <span className={styles.value}>{room.type}</span>
                    </div>
                </div>

                <div className={styles.rentSection}>
                    <div className={styles.rentHeader}>
                        <h3>Rent Status</h3>
                        <span className={`${styles.rentStatus} ${paidStatus ? styles.paid : styles.pending}`}>
                            {paidStatus ? 'Paid' : 'Pending'}
                        </span>
                    </div>

                    <div className={styles.paymentDetails}>
                        <div className={styles.paymentRow}>
                            <span>Monthly Rent</span>
                            <span>₹{room.price.toLocaleString()}</span>
                        </div>
                        <div className={styles.paymentRow}>
                            <span>Last Payment</span>
                            <span>{bed.lastPaymentDate ? new Date(bed.lastPaymentDate).toLocaleDateString() : 'No record'}</span>
                        </div>
                        <div className={styles.paymentRow}>
                            <span>Next Due Date</span>
                            <span>5th {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('default', { month: 'long' })}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.supportBtn}>Contact Warden</button>
                    <button className={styles.rulesBtn}>View Rules</button>
                </div>
            </div>
        </div>
    );
};

export default MyBooking;
