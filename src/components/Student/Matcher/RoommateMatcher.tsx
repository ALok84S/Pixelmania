import React, { useState } from 'react';
import { useHousing } from '../../../context/HousingContext';
import { StudentProfile } from '../../../types';
import { Heart, X, Check, MessageCircle, Star } from 'lucide-react';
import styles from './RoommateMatcher.module.css';

const RoommateMatcher: React.FC = () => {
    const { students } = useHousing();
    // Mock current student as the first one
    const currentStudent = students[0];

    // Filter out self
    const potentialMatches = students.filter(s => s.id !== currentStudent.id);

    const calculateMatchScore = (student: StudentProfile) => {
        let score = 50; // Base score
        // Mock logic
        if (student.habits.earlyRiser === currentStudent.habits.earlyRiser) score += 15;
        if (student.habits.clean === currentStudent.habits.clean) score += 15;
        if (student.habits.nightOwl === currentStudent.habits.nightOwl) score += 10;
        if (student.habits.partyPerson === currentStudent.habits.partyPerson) score += 10;
        return Math.min(100, score);
    };

    const [matches, setMatches] = useState<string[]>([]);

    const handleConnect = (id: string) => {
        setMatches([...matches, id]);
        alert('Request sent! They will be notified.');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Find Your Vibe Tribe</h1>
                <p className={styles.subtitle}>Connect with students who match your lifestyle.</p>
            </header>

            <div className={styles.grid}>
                {potentialMatches.map(student => {
                    const matchScore = calculateMatchScore(student);
                    const isConnected = matches.includes(student.id);

                    return (
                        <div key={student.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.avatar}>{student.name.charAt(0)}</div>
                                <div className={styles.matchBadge} style={{ backgroundColor: matchScore > 80 ? '#dcfce7' : '#fef9c3', color: matchScore > 80 ? '#166534' : '#854d0e' }}>
                                    <Star size={12} fill="currentColor" /> {matchScore}% Match
                                </div>
                            </div>

                            <h2 className={styles.name}>{student.name}</h2>
                            <p className={styles.bio}>"{student.bio}"</p>

                            <div className={styles.habits}>
                                {Object.entries(student.habits).map(([key, value]) => (
                                    value && (
                                        <span key={key} className={styles.habitTag}>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    )
                                ))}
                            </div>

                            <div className={styles.actions}>
                                {isConnected ? (
                                    <button className={styles.connectedBtn} disabled>
                                        <Check size={18} /> Request Sent
                                    </button>
                                ) : (
                                    <button className={styles.connectBtn} onClick={() => handleConnect(student.id)}>
                                        <MessageCircle size={18} /> Connect
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RoommateMatcher;
