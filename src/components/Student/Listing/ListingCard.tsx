import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Listing } from '../../../types';
import { ShieldCheck, MapPin, Wifi, Armchair, Wind } from 'lucide-react';
import styles from './ListingCard.module.css';

interface ListingCardProps {
    listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.card} onClick={() => navigate(`/student/listing/${listing.id}`)}>
            {/* Image Section */}
            <div className={styles.imageWrapper}>
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className={styles.mainImage}
                />
                <div className={styles.genderTag}>
                    <ShieldCheck size={14} />
                    <span>Boys</span> {/* Placeholder or derived from data */}
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.content}>
                <div>
                    <h3 className={styles.title}>{listing.title}</h3>
                    <div className={styles.location}>
                        <MapPin size={14} />
                        {listing.location.address}
                    </div>
                </div>

                <div className={styles.amenitiesGrid}>
                    <span className={styles.amenityPill}><Wifi size={14} /> Wifi</span>
                    <span className={styles.amenityPill}><Armchair size={14} /> Furnished</span>
                    <span className={styles.amenityPill}><Wind size={14} /> AC</span>
                </div>

                <div className={styles.footer}>
                    <div className={styles.priceInfo}>
                        <div className={styles.priceRow}>
                            <span className={styles.currentPrice}>₹{listing.price.toLocaleString()}/-</span>
                            <span className={styles.originalPrice}>₹{(listing.price + 2000).toLocaleString()}/-</span>
                        </div>
                        <span className={styles.rentLabel}>Monthly Rent From</span>
                    </div>
                    <button className={styles.reserveBtn}>Reserve</button>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
