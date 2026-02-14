import React from 'react';
import styles from './TrustStrip.module.css';

const TrustStrip: React.FC = () => {
    return (
        <section className={styles.trustSection}>
            <div className={styles.container}>
                <p className={styles.label}>TRUSTED BY STUDENTS FROM</p>
                <div className={styles.uniLogos}>
                    <span className={styles.logoText}>IIT Bombay</span>
                    <span className={styles.logoText}>Delhi University</span>
                    <span className={styles.logoText}>BITS Pilani</span>
                    <span className={styles.logoText}>Manipal</span>
                    <span className={styles.logoText}>VIT</span>
                </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.container}>
                <p className={styles.label}>AS SEEN ON</p>
                <div className={styles.pressLogos}>
                    <span className={styles.pressLogo}>Shark Tank India</span>
                    <span className={styles.pressLogo}>YourStory</span>
                    <span className={styles.pressLogo}>Inc42</span>
                    <span className={styles.pressLogo}>Forbes</span>
                </div>
            </div>
        </section>
    );
};

export default TrustStrip;
