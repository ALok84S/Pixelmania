import React, { useState } from 'react';
import { Search, ShieldCheck, FileCheck, Home, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

const HowItWorks: React.FC = () => {
    const [userType, setUserType] = useState<'student' | 'owner'>('student');

    const steps = userType === 'student' ? [
        {
            icon: <Search size={32} />,
            title: "Search & Discover",
            desc: "Filter by college, budget, and amenities to find your perfect home.",
            color: "blue"
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Verify Safety",
            desc: "Check our proprietary Safety Scores and take a virtual tour.",
            color: "green"
        },
        {
            icon: <FileCheck size={32} />,
            title: "Book & Sign",
            desc: "Pay a token amount and sign the digital agreement instantly.",
            color: "purple"
        }
    ] : [
        {
            icon: <Home size={32} />,
            title: "List Property",
            desc: "Add your property details, photos, and amenities in minutes.",
            color: "orange"
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Get Verified",
            desc: "Our team verifies your property for the Safety Score badge.",
            color: "green"
        },
        {
            icon: <Key size={32} />,
            title: "Manage Rent",
            desc: "Receive rent payments and manage tenants via the app.",
            color: "blue"
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.title}
                >
                    How NivasBuddy Works
                </motion.h2>
                <div className={styles.toggleWrapper}>
                    <button
                        className={`${styles.toggleBtn} ${userType === 'student' ? styles.active : ''}`}
                        onClick={() => setUserType('student')}
                    >
                        For Students
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${userType === 'owner' ? styles.active : ''}`}
                        onClick={() => setUserType('owner')}
                    >
                        For Owners
                    </button>
                </div>
            </div>

            <div className={styles.stepsGrid}>
                {steps.map((step, index) => (
                    <motion.div
                        key={`${userType}-${index}`}
                        className={`${styles.stepCard} ${styles[step.color]}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -10 }}
                    >
                        <div className={styles.iconCircle}>
                            {step.icon}
                        </div>
                        <h3 className={styles.stepTitle}>{step.title}</h3>
                        <p className={styles.stepDesc}>{step.desc}</p>
                        {index < steps.length - 1 && <div className={styles.connector}></div>}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
