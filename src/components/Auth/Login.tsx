import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ShieldCheck } from 'lucide-react';
import styles from './Login.module.css';

import logo from '../../assets/image.png';

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.decoration}></div>
            <div className={styles.decoration2}></div>

            <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <img src={logo} alt="NivasBuddy Logo" style={{ height: '80px' }} />
                </div>
                <h1 className={styles.logo}>NIVASBUDDY</h1>
                <p className={styles.subtitle}>Choose your role to continue</p>

                <div className={styles.roleGrid}>
                    <button
                        className={`${styles.roleButton} ${styles.student}`}
                        onClick={() => navigate('/student')}
                    >
                        <div className={styles.iconWrapper}>
                            <GraduationCap size={32} />
                        </div>
                        <span className={styles.label}>Student</span>
                    </button>

                    <button
                        className={`${styles.roleButton} ${styles.warden}`}
                        onClick={() => navigate('/warden')}
                    >
                        <div className={styles.iconWrapper}>
                            <ShieldCheck size={32} />
                        </div>
                        <span className={styles.label}>Warden</span>
                    </button>
                </div>

                <div className={styles.footer}>
                    Secure Campus Housing Platform
                </div>
            </div>
        </div>
    );
};

export default Login;
