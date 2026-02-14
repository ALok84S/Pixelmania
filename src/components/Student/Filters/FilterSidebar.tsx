import React from 'react';
import styles from './FilterSidebar.module.css';

interface FilterProps {
    filters: {
        minRent: number;
        maxRent: number;
        minSafety: number;
        roomType: string[];
        gender: string[];
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const FilterSidebar: React.FC<FilterProps> = ({ filters, setFilters }) => {
    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev: any) => ({ ...prev, [name]: Number(value) }));
    };

    const handleCheckboxChange = (category: string, value: string) => {
        setFilters((prev: any) => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter((item: string) => item !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Filters</h3>

            <div className={styles.section}>
                <h4 className={styles.label}>Rent Range (₹)</h4>
                <div className={styles.rangeInputs}>
                    <input
                        type="number"
                        name="minRent"
                        value={filters.minRent}
                        onChange={handleRangeChange}
                        className={styles.input}
                        placeholder="Min"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        name="maxRent"
                        value={filters.maxRent}
                        onChange={handleRangeChange}
                        className={styles.input}
                        placeholder="Max"
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h4 className={styles.label}>Safety Score</h4>
                <div className={styles.rangeWrapper}>
                    <input
                        type="range"
                        name="minSafety"
                        min="0"
                        max="100"
                        value={filters.minSafety}
                        onChange={handleRangeChange}
                        className={styles.slider}
                    />
                    <span>{filters.minSafety}+ Score</span>
                </div>
            </div>

            <div className={styles.section}>
                <h4 className={styles.label}>Sharing Type</h4>
                {['Single', 'Double', 'Triple'].map(type => (
                    <label key={type} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={filters.roomType.includes(type)}
                            onChange={() => handleCheckboxChange('roomType', type)}
                        />
                        {type}
                    </label>
                ))}
            </div>

            <div className={styles.section}>
                <h4 className={styles.label}>Hostel Type</h4>
                {['Boys', 'Girls', 'Co-ed'].map(type => (
                    <label key={type} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={filters.gender.includes(type)}
                            onChange={() => handleCheckboxChange('gender', type)}
                        />
                        {type}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;
