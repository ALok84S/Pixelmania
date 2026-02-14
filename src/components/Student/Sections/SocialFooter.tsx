import React from 'react';
import { Star, Quote, Download } from 'lucide-react';
import styles from './SocialFooter.module.css';

const TESTIMONIALS = [
    { text: "Finding a roommate who matches my sleep schedule was a game changer. NivasBuddy made it so easy.", author: "Arjun K.", role: "Student, IIT Bombay", rating: 5 },
    { text: "The safety score gave my parents peace of mind. I booked my hostel without even visiting.", author: "Sneha R.", role: "Student, DU", rating: 5 },
    { text: "My occupancy rates increased by 40% within two months of listing here. Highly recommend!", author: "Mr. Sharma", role: "Owner, Sharma Residency", rating: 5 },
];

const SocialFooter: React.FC = () => {
    return (
        <footer>
            {/* Testimonials */}
            <section className={styles.testimonialsSection}>
                <h2 className={styles.sectionTitle}>Don't Just Take Our Word For It</h2>
                <div className={styles.testimonialGrid}>
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className={styles.testimonialCard}>
                            <div className={styles.stars}>
                                {[...Array(t.rating)].map((_, k) => <Star key={k} size={16} fill="#fbbf24" stroke="none" />)}
                            </div>
                            <p className={styles.quote}>"{t.text}"</p>
                            <div className={styles.author}>
                                <strong>{t.author}</strong>
                                <span>{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* App Conversion */}
            <section className={styles.appSection}>
                <div className={styles.appContent}>
                    <h2>Get the Full Experience on App</h2>
                    <p>Unlock features like Digital Gate Pass, Rent Payments, and Instant Chat.</p>
                    <div className={styles.storeButtons}>
                        <button className={styles.storeBtn}>App Store</button>
                        <button className={styles.storeBtn}>Google Play</button>
                    </div>
                </div>
                <div className={styles.qrCode}>
                    <div className={styles.qrPlaceholder}>
                        <Download size={32} />
                        <span>Scan to Download</span>
                    </div>
                </div>
            </section>

            {/* Main Footer */}
            <div className={styles.mainFooter}>
                <div className={styles.footerLinks}>
                    <div className={styles.col}>
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                    </div>
                    <div className={styles.col}>
                        <h4>Support</h4>
                        <a href="#">Help Center</a>
                        <a href="#">Safety Center</a>
                        <a href="#">Contact Us</a>
                    </div>
                    <div className={styles.col}>
                        <h4>Legal</h4>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
                <div className={styles.copy}>
                    &copy; 2026 NivasBuddy. All rights reserved. Made with ❤️ for Students.
                </div>
            </div>
        </footer>
    );
};

export default SocialFooter;
