import { SAFETY_WEIGHTS, SafetyFeature } from '../types';

export const calculateSafetyScore = (features: SafetyFeature[]): number => {
    let score = 0;
    features.forEach((feature) => {
        if (SAFETY_WEIGHTS[feature]) {
            score += SAFETY_WEIGHTS[feature];
        }
    });
    return Math.min(100, score);
};

export const getSafetyLevel = (score: number) => {
    if (score >= 80) return { label: 'Extremely Safe', color: 'var(--color-success)' };
    if (score >= 50) return { label: 'Moderate Safety', color: 'var(--color-warning)' };
    return { label: 'Incomplete Safety', color: 'var(--color-danger)' };
};
