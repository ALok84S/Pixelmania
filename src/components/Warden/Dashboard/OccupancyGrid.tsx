import React, { useState } from 'react';
import { useHousing } from '../../../context/HousingContext';
import { Listing, Bed, Room } from '../../../types'; // Add Listing import
import { User, UserMinus, X } from 'lucide-react';
import styles from './OccupancyGrid.module.css';

interface OccupancyGridProps {
    listing: Listing;
}

const OccupancyGrid: React.FC<OccupancyGridProps> = ({ listing }) => {
    const { students, updateBedStatus } = useHousing();
    // Removed listings[0] hardcoding

    const [selectedBed, setSelectedBed] = useState<{ bed: Bed; room: Room } | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState('');

    if (!listing) return <div>No property data available.</div>;

    const handleBedClick = (bed: Bed, room: Room) => {
        setSelectedBed({ bed, room });
        setShowModal(true);
        setSelectedStudentId('');
    };

    const handleAssign = () => {
        if (!selectedBed || !selectedStudentId) return;
        const studentName = students.find(s => s.id === selectedStudentId)?.name || 'Unknown';

        updateBedStatus(listing.id, selectedBed.room.roomNumber, selectedBed.bed.id, 'occupied', studentName);
        setShowModal(false);
        setSelectedBed(null);
    };

    const handleVacate = () => {
        if (!selectedBed) return;
        updateBedStatus(listing.id, selectedBed.room.roomNumber, selectedBed.bed.id, 'empty');
        setShowModal(false);
        setSelectedBed(null);
    };

    const availableStudents = students; // In real app, filter out already assigned students

    return (
        <div className={styles.container}>
            {listing.floors.map((floor) => (
                <div key={floor.floorNumber} className={styles.floorSection}>
                    <h3 className={styles.floorTitle}>Floor {floor.floorNumber}</h3>
                    <div className={styles.roomsGrid}>
                        {floor.rooms.map((room) => (
                            <div key={room.id} className={styles.roomCard}>
                                <div className={styles.roomHeader}>
                                    <span className={styles.roomNo}>{room.roomNumber}</span>
                                    <span className={styles.roomType}>{room.type}</span>
                                </div>
                                <div className={styles.bedsGrid}>
                                    {room.beds.map((bed) => (
                                        <div
                                            key={bed.id}
                                            className={`${styles.bed} ${bed.status === 'occupied' ? styles.occupied : styles.empty}`}
                                            onClick={() => handleBedClick(bed, room)}
                                            title={bed.status === 'occupied' ? bed.studentName : 'Empty'}
                                        >
                                            {bed.status === 'occupied' ? <User size={16} /> : <div className={styles.emptyDot} />}
                                            <span className={styles.bedLabel}>
                                                {bed.status === 'occupied' ? bed.studentName?.split(' ')[0] : 'Free'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {showModal && selectedBed && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3>Manage Bed {selectedBed.room.roomNumber}-{selectedBed.bed.id.split('-').pop()}</h3>
                            <button className={styles.closeBtn} onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>

                        <div className={styles.modalBody}>
                            <p>Type: {selectedBed.room.type}</p>
                            <p>Status: <strong>{selectedBed.bed.status.toUpperCase()}</strong></p>

                            {selectedBed.bed.status === 'empty' ? (
                                <div className={styles.assignSection}>
                                    <label>Assign Student:</label>
                                    <select
                                        value={selectedStudentId}
                                        onChange={(e) => setSelectedStudentId(e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="">Select Student...</option>
                                        {availableStudents.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        className={styles.assignBtn}
                                        disabled={!selectedStudentId}
                                        onClick={handleAssign}
                                    >
                                        Assign Bed
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.vacateSection}>
                                    <p>Occupant: {selectedBed.bed.studentName}</p>
                                    <button className={styles.vacateBtn} onClick={handleVacate}>
                                        <UserMinus size={16} /> Vacate Bed
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OccupancyGrid;
