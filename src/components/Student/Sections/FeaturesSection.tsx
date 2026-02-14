import React from 'react';
import { Shield, Users, Smartphone, Check, ArrowRight, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './FeaturesSection.module.css';

const FeaturesSection: React.FC = () => {
    return (
        <section className={styles.section}>
            {/* 1. Safety Score Deep Dive */}
            <motion.div
                className={styles.featureBlock}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className={styles.contentSide}>
                    <div className={`${styles.iconBadge} ${styles.greenBadge}`}><Shield size={28} /></div>
                    <h2 className={styles.title}>Safety Isn't Just a Word.<br />It's a Score.</h2>
                    <p className={styles.desc}>
                        We measure what matters using our proprietary 50-point algorithm. If it's not safe enough for our siblings, it's not on NivasBuddy.
                    </p>
                    <ul className={styles.checkList}>
                        <li><div className={styles.checkIcon}><Check size={14} /></div> 24/7 CCTV Monitoring</li>
                        <li><div className={styles.checkIcon}><Check size={14} /></div> Biometric Entry</li>
                        <li><div className={styles.checkIcon}><Check size={14} /></div> Resident Verification</li>
                    </ul>
                    <button className={`${styles.ctaBtn} ${styles.greenBtn}`}>Explore Safety Standards <ArrowRight size={18} /></button>
                </div>
                <div className={styles.visualSide}>
                    <div className={styles.safetyCard}>
                        <div className={styles.radarEffect}></div>
                        <div className={styles.scoreCircle}>
                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring' }}
                            >9.8</motion.span>
                            <small>Safety Score</small>
                        </div>
                        <div className={styles.scanningLine}></div>
                    </div>
                </div>
            </motion.div>

            {/* 2. Roommate Matcher */}
            <motion.div
                className={`${styles.featureBlock} ${styles.reversed} ${styles.purpleBg}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className={styles.contentSide}>
                    <div className={`${styles.iconBadge} ${styles.purpleBadge}`}><Users size={28} /></div>
                    <h2 className={styles.title}>Find Your <span className={styles.highlightPurple}>Vibe Tribe</span></h2>
                    <p className={styles.desc}>
                        Living with strangers uses luck. Living with matches uses NivasBuddy. Filtering by habits, schedule, and interests.
                    </p>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Early Riser ☀️</span>
                        <span className={styles.tag}>Studious 📚</span>
                        <span className={styles.tag}>Vegetarian 🥗</span>
                        <span className={styles.tag}>Gamer 🎮</span>
                    </div>
                    <button className={`${styles.ctaBtn} ${styles.purpleBtn}`}>Try Matcher Demo <ArrowRight size={18} /></button>
                </div>
                <div className={styles.visualSide}>
                    <div className={styles.matcherVisual}>
                        <motion.div
                            className={styles.profileCard}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        >
                            <div className={styles.avatar} style={{ background: '#e9d5ff', color: '#7e22ce' }}>YOU</div>
                        </motion.div>
                        <div className={styles.heartPulse}><Heart size={32} fill="#ef4444" stroke="none" /></div>
                        <motion.div
                            className={styles.profileCard}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                        >
                            <div className={styles.avatar} style={{ background: '#dbeafe', color: '#1d4ed8' }}>DEV</div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* 3. Digital Living */}
            <motion.div
                className={styles.featureBlock}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className={styles.contentSide}>
                    <div className={`${styles.iconBadge} ${styles.blueBadge}`}><Smartphone size={28} /></div>
                    <h2 className={styles.title}>Your Entire Hostel Life.<br />In One App.</h2>
                    <p className={styles.desc}>
                        Forget paper passes and cash rent. Manage everything digital-first.
                    </p>
                    <div className={styles.gridFeatures}>
                        <div className={styles.featureItem}>
                            <Zap size={20} color="#eab308" />
                            <span>Instant Rent Pay</span>
                        </div>
                        <div className={styles.featureItem}>
                            <Shield size={20} color="#2563eb" />
                            <span>Digital Gate Pass</span>
                        </div>
                    </div>
                    <button className={`${styles.ctaBtn} ${styles.blueBtn}`}>Get The App <ArrowRight size={18} /></button>
                </div>
                <div className={styles.visualSide}>
                    <motion.div
                        className={styles.phoneMockup}
                        whileHover={{ rotateY: 10, rotateX: 5 }}
                    >
                        <div className={styles.notch}></div>
                        <div className={styles.screen}>
                            <div className={styles.appHeader}>Hello, Percival 👋</div>
                            <div className={styles.appCard}>Rent Due: ₹0</div>
                            <div className={styles.appRow}>
                                <div className={styles.appBtn}>Gate Pass</div>
                                <div className={styles.appBtn}>Food</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturesSection;
