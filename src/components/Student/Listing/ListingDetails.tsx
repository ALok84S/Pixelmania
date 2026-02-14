import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHousing } from '../../../context/HousingContext';
import { getSafetyLevel } from '../../../utils/safety';
import {
    MapPin, ShieldCheck, Wifi, Wind, ArrowLeft, CheckCircle,
    Calendar, Info, AlertTriangle, FileText, X
} from 'lucide-react';
import styles from './ListingDetails.module.css';

const ListingDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { listings, updateBedStatus, students } = useHousing();

    const listing = listings.find(l => l.id === id);
    const [currentImage, setCurrentImage] = useState(0);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Mock logging in student
    const currentStudent = students[0];

    if (!listing) return <div className={styles.container}>Listing not found</div>;

    const safety = getSafetyLevel(listing.safetyScore);

    const handleBooking = () => {
        if (!selectedRoomId) return;
        const floor = listing.floors.find(f => f.rooms.some(r => r.roomNumber === selectedRoomId));
        const room = floor?.rooms.find(r => r.roomNumber === selectedRoomId);

        if (!room) return;

        // Find first empty bed
        const emptyBed = room.beds.find(b => b.status === 'empty');
        if (!emptyBed) {
            alert('Selected room has no empty beds!');
            return;
        }

        updateBedStatus(listing.id, room.roomNumber, emptyBed.id, 'occupied', currentStudent.name);
        setShowBookingModal(false);
        navigate('/student'); // Redirect to student view (where MyBooking tab is)
        // Note: We should ideally redirect to /student?tab=booking
    };

    return (
        <div className={styles.container}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                <ArrowLeft size={20} /> Back to Search
            </button>

            <div className={styles.imageWrapper}>
                <img src={listing.images[currentImage]} alt={listing.title} className={styles.mainImage} />
                <div className={styles.safetyBadge} style={{ backgroundColor: safety.color }}>
                    <ShieldCheck size={20} />
                    <span>Safety Score: {listing.safetyScore}/100</span>
                </div>
                <div className={styles.imageDots}>
                    {listing.images.map((_, idx) => (
                        <button
                            key={idx}
                            className={`${styles.dot} ${idx === currentImage ? styles.activeDot : ''}`}
                            onClick={() => setCurrentImage(idx)}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.header}>
                <h1 className={styles.title}>{listing.title}</h1>
                <div className={styles.location}>
                    <MapPin size={20} />
                    {listing.location.address}, {listing.location.city} ({listing.location.distance} from college)
                </div>
                <div className={styles.typeTag}>{listing.type} Hostel</div>
            </div>

            <div className={styles.grid}>
                <div className={styles.mainContent}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>About this Hostel</h2>
                        <p className={styles.description}>{listing.description}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Amenities</h2>
                        <div className={styles.amenitiesGrid}>
                            {listing.amenities.map(amenity => (
                                <div key={amenity} className={styles.amenityItem}>
                                    <CheckCircle size={16} color="var(--color-primary)" /> {amenity}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>House Rules</h2>
                        <div className={styles.rulesGrid}>
                            <div className={styles.ruleItem}>
                                <span className={styles.ruleLabel}>Curfew:</span> {listing.rules.curfew}
                            </div>
                            <div className={styles.ruleItem}>
                                <span className={styles.ruleLabel}>Visitors:</span> {listing.rules.visitors}
                            </div>
                            <div className={styles.ruleItem}>
                                <span className={styles.ruleLabel}>Notice Period:</span> {listing.rules.noticePeriod}
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Available Rooms</h2>
                        {listing.floors.map(floor => (
                            <div key={floor.floorNumber} className={styles.floorBlock}>
                                <h3>Floor {floor.floorNumber}</h3>
                                <div className={styles.roomList}>
                                    {floor.rooms.map(room => {
                                        const availableBeds = room.beds.filter(b => b.status === 'empty').length;
                                        return (
                                            <div key={room.id} className={styles.roomItem}>
                                                <div className={styles.roomInfo}>
                                                    <span className={styles.roomNo}>Room {room.roomNumber}</span>
                                                    <span className={styles.roomType}>{room.type}</span>
                                                </div>
                                                <div className={styles.roomMeta}>
                                                    <span>{availableBeds} beds available</span>
                                                    <span className={styles.roomPrice}>₹{room.price}/mo</span>
                                                </div>
                                                {availableBeds > 0 ? (
                                                    <button
                                                        className={styles.selectRoomBtn}
                                                        onClick={() => {
                                                            setSelectedRoomId(room.roomNumber);
                                                            setShowBookingModal(true);
                                                        }}
                                                    >
                                                        Book Now
                                                    </button>
                                                ) : (
                                                    <span className={styles.noStock}>Full</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.priceCard}>
                        <div className={styles.priceHeader}>
                            <span className={styles.price}>₹{listing.price}</span>
                            <span className={styles.period}>/month</span>
                        </div>
                        <div className={styles.deposit}>+ ₹{listing.deposit} Security Deposit</div>

                        <button
                            className={styles.bookBtn}
                            onClick={() => setShowBookingModal(true)}
                        >
                            Request Booking
                        </button>
                        <p className={styles.infoText}>No payment required today</p>
                    </div>
                </div>
            </div>

            {showBookingModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Complete Your Booking</h2>
                            <button className={styles.closeBtn} onClick={() => setShowBookingModal(false)}><X /></button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.modalSection}>
                                <h3>1. Select Room</h3>
                                <select
                                    className={styles.select}
                                    value={selectedRoomId}
                                    onChange={(e) => setSelectedRoomId(e.target.value)}
                                >
                                    <option value="">Select a Room...</option>
                                    {listing.floors.flatMap(f => f.rooms).filter(r => r.beds.some(b => b.status === 'empty')).map(r => (
                                        <option key={r.roomNumber} value={r.roomNumber}>
                                            Room {r.roomNumber} ({r.type}) - ₹{r.price}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.modalSection}>
                                <h3>2. Review Terms & Conditions</h3>
                                <div className={styles.termsBox}>
                                    <h4>General Hostel Terms</h4>
                                    <ul>
                                        <li>Rent must be paid by the 5th of every month.</li>
                                        <li>Security deposit is refundable subject to no damage.</li>
                                        <li>Visitor entry must be logged at security.</li>
                                        <li>No structural changes allowed in rooms.</li>
                                        <li>30-day notice period required before vacating.</li>
                                    </ul>
                                    <h4>Safety & Conduct</h4>
                                    <ul>
                                        <li>Zero tolerance for substance abuse.</li>
                                        <li>Respect quiet hours (10 PM - 6 AM).</li>
                                        <li>Emergency exits must be kept clear.</li>
                                    </ul>
                                </div>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    />
                                    I agree to the Terms & Conditions and Hostel Rules.
                                </label>
                            </div>

                            <button
                                className={styles.confirmBtn}
                                disabled={!agreedToTerms || !selectedRoomId}
                                onClick={handleBooking}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingDetails;
