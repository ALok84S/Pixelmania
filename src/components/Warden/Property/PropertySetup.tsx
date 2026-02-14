import React, { useState } from 'react';
import { useHousing } from '../../../context/HousingContext';
import { Floor, Room, Bed } from '../../../types';
import { Plus, Trash2, Save, Building } from 'lucide-react';
import styles from './PropertySetup.module.css';

const PropertySetup: React.FC = () => {
    const { listings, updateListing } = useHousing();
    const listing = listings[0]; // Warden manages first listing

    const [floors, setFloors] = useState<Floor[]>(listing?.floors || []);
    const [hasChanges, setHasChanges] = useState(false);

    if (!listing) return <div>Loading...</div>;

    const addFloor = () => {
        const newFloorNumber = floors.length + 1;
        setFloors([...floors, { floorNumber: newFloorNumber, rooms: [] }]);
        setHasChanges(true);
    };

    const addRoom = (floorIndex: number) => {
        const updatedFloors = [...floors];
        const floor = updatedFloors[floorIndex];
        const roomNumber = `${floor.floorNumber}0${floor.rooms.length + 1}`;

        const newRoom: Room = {
            id: `${listing.id}-f${floor.floorNumber}-r${roomNumber}`,
            roomNumber,
            type: 'Double',
            price: listing.price,
            features: [],
            size: '150 sq ft',
            beds: [
                { id: `b-${roomNumber}-1`, roomId: roomNumber, status: 'empty' },
                { id: `b-${roomNumber}-2`, roomId: roomNumber, status: 'empty' }
            ]
        };

        floor.rooms.push(newRoom);
        setFloors(updatedFloors);
        setHasChanges(true);
    };

    const removeFloor = (index: number) => {
        const updated = floors.filter((_, i) => i !== index);
        setFloors(updated);
        setHasChanges(true);
    };

    const saveChanges = () => {
        updateListing(listing.id, {
            floors,
            totalFloors: floors.length
        });
        setHasChanges(false);
        alert('Property structure updated successfully!');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <Building size={24} className={styles.icon} />
                    <h2>Property Setup</h2>
                </div>
                <button
                    className={styles.saveBtn}
                    disabled={!hasChanges}
                    onClick={saveChanges}
                >
                    <Save size={18} /> Save Changes
                </button>
            </header>

            <div className={styles.floorsList}>
                {floors.map((floor, floorIndex) => (
                    <div key={floorIndex} className={styles.floorCard}>
                        <div className={styles.floorHeader}>
                            <h3>Floor {floor.floorNumber}</h3>
                            <div className={styles.actions}>
                                <button className={styles.addRoomBtn} onClick={() => addRoom(floorIndex)}>
                                    <Plus size={16} /> Add Room
                                </button>
                                <button className={styles.deleteBtn} onClick={() => removeFloor(floorIndex)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className={styles.roomsGrid}>
                            {floor.rooms.map((room, roomIndex) => (
                                <div key={room.id} className={styles.roomCard}>
                                    <div className={styles.roomHeader}>
                                        <span className={styles.roomNo}>Room {room.roomNumber}</span>
                                        <span className={styles.roomType}>{room.type}</span>
                                    </div>
                                    <div className={styles.roomDetails}>
                                        <span>{room.beds.length} Beds</span>
                                        <span>₹{room.price}/mo</span>
                                    </div>
                                </div>
                            ))}
                            {floor.rooms.length === 0 && (
                                <div className={styles.emptyRoomState}>
                                    No rooms added yet
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <button className={styles.addFloorBtn} onClick={addFloor}>
                    <Plus size={24} /> Add Floor
                </button>
            </div>
        </div>
    );
};

export default PropertySetup;
