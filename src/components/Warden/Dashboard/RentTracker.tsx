import React from 'react';
import { useHousing } from '../../../context/HousingContext';
import { Listing } from '../../../types';
import { CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import styles from './RentTracker.module.css';

interface RentTrackerProps {
    listing: Listing;
}

const RentTracker: React.FC<RentTrackerProps> = ({ listing }) => {
    const { markStudentRentPaid } = useHousing();
    // Removed listings[0] hardcoding

    if (!listing) return <div>Loading...</div>;

    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    // Flatten beds to get all occupants
    const occupants = listing.floors.flatMap(f =>
        f.rooms.flatMap(r =>
            r.beds
                .filter(b => b.status === 'occupied')
                .map(b => ({
                    ...b,
                    roomNo: r.roomNumber,
                    price: r.price // assuming room price is per bed or adjust logic
                }))
        )
    );

    const isPaidThisMonth = (dateString?: string) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    };

    const handleMarkPaid = (roomNo: string, bedId: string) => {
        markStudentRentPaid(listing.id, roomNo, bedId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Rent Status - {currentMonth}</h3>
                <div className={styles.summary}>
                    {occupants.filter(o => isPaidThisMonth(o.lastPaymentDate)).length} / {occupants.length} Paid
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Room</th>
                            <th>Student</th>
                            <th>Rent Amount</th>
                            <th>Status</th>
                            <th>Last Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {occupants.map((student) => {
                            const isPaid = isPaidThisMonth(student.lastPaymentDate);
                            return (
                                <tr key={student.id}>
                                    <td>{student.roomNo}</td>
                                    <td className={styles.studentName}>{student.studentName}</td>
                                    <td>₹{student.price.toLocaleString()}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${isPaid ? styles.paid : styles.pending}`}>
                                            {isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className={styles.dateCell}>
                                        {student.lastPaymentDate ? new Date(student.lastPaymentDate).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td>
                                        {!isPaid && (
                                            <button
                                                className={styles.markPaidBtn}
                                                onClick={() => handleMarkPaid(student.roomNo, student.id)}
                                            >
                                                <CheckCircle size={16} /> Mark Paid
                                            </button>
                                        )}
                                        {isPaid && (
                                            <span className={styles.paidText}>
                                                <CheckCircle size={16} /> Done
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {occupants.length === 0 && (
                            <tr>
                                <td colSpan={6} className={styles.emptyState}>No students assigned yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RentTracker;
