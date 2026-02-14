import React, { useState } from 'react';
import { BedDouble, User } from 'lucide-react';
import { useHousing } from '../../../context/HousingContext';
import { Listing, Bed, Room } from '../../../types';
import styles from './OccupancyGrid.module.css';

interface OccupancyGridProps {
    listing: Listing;
}

const OccupancyGrid: React.FC<OccupancyGridProps> = ({ listing }) => {
    const { students, updateBedStatus } = useHousing();
    const [selectedBed, setSelectedBed] = useState<{ roomId: string, bed: Bed } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState('');

    const handleBedClick = (roomId: string, bed: Bed) => {
        setSelectedBed({ roomId, bed });
        setIsModalOpen(true);
    };

    const handleAssign = () => {
        if (selectedBed && listing) {
            const student = students.find(s => s.id === selectedStudentId);
            updateBedStatus(listing.id, selectedBed.roomId, selectedBed.bed.id, 'occupied', student?.name);
            setIsModalOpen(false);
            setSelectedStudentId('');
        }
    };

    const handleVacate = () => {
        if (selectedBed && listing) {
            updateBedStatus(listing.id, selectedBed.roomId, selectedBed.bed.id, 'empty');
            setIsModalOpen(false);
        }
    };

    if (!listing || !listing.floors) {
        return <div className={styles.container}>Loading occupancy data...</div>;
    }

    return (
        <div className={styles.container}>
            {listing.floors.map((floor) => (
                <div key={floor.floorNumber} className={styles.floorSection}>
                    <h3 className={styles.floorTitle}>Floor {floor.floorNumber}</h3>
                    <div className={styles.roomsGrid}>
                        {floor.rooms.map((room) => (
                            <div key={room.id} className={styles.roomCard}>
                                <div className={styles.roomHeader}>
                                    <span className={styles.roomNo}>Unit {room.roomNumber}</span>
                                    <span className={styles.roomType}>{room.type}</span>
                                </div>
                                <div className={styles.bedsGrid}>
                                    {room.beds.map((bed) => (
                                        <div
                                            key={bed.id}
                                            className={`${styles.bed} ${styles[bed.status]}`}
                                            onClick={() => handleBedClick(room.id, bed)}
                                        >
                                            {bed.status === 'occupied' ? (
                                                <User size={20} />
                                            ) : (
                                                <BedDouble size={20} />
                                            )}
                                            <span className={styles.bedLabel}>
                                                {bed.status === 'occupied' ? (bed.studentName || 'Occupied') : 'Vacant'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Modal */}
            {isModalOpen && selectedBed && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Manage Bed</h3>
                            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>✕</button>
                        </div>
                        <div className={styles.modalBody}>
                            <p><strong>Room:</strong> {selectedBed.bed.roomId}</p>
                            <p><strong>Current Status:</strong> {selectedBed.bed.status}</p>

                            {selectedBed.bed.status === 'empty' ? (
                                <>
                                    <select
                                        className={styles.select}
                                        value={selectedStudentId}
                                        onChange={(e) => setSelectedStudentId(e.target.value)}
                                    >
                                        <option value="">Select Student</option>
                                        {students.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.bio})</option>
                                        ))}
                                    </select>
                                    <button className={styles.assignBtn} onClick={handleAssign}>
                                        Assign Bed
                                    </button>
                                </>
                            ) : (
                                <button className={styles.vacateBtn} onClick={handleVacate}>
                                    Vacate Bed
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OccupancyGrid;
