
export type SafetyFeature = 'CCTV' | 'Security Guard' | 'Biometric' | 'Fire Extinguisher';
export type Amenity = 'Wi-Fi' | 'AC' | 'Gym' | 'Laundry' | 'Mess' | 'Power Backup' | 'Lift' | 'Parking';

export const SAFETY_WEIGHTS: Record<SafetyFeature, number> = {
    'CCTV': 30,
    'Security Guard': 40,
    'Biometric': 20,
    'Fire Extinguisher': 10,
};

export interface Listing {
    id: string;
    images: string[];
    title: string;
    price: number;
    deposit: number;
    location: { lat: number; lng: number; address: string; city: string; distance: string };
    description: string;
    type: 'Boys' | 'Girls' | 'Co-ed';

    // Structure
    totalFloors: number;
    floors: Floor[];

    // Amenities & Features
    amenities: Amenity[];
    safetyFeatures: SafetyFeature[];

    // Rules
    rules: {
        curfew: string;
        visitors: string;
        nonVeg: boolean;
        smoking: boolean;
        drinking: boolean;
        noticePeriod: string;
    };

    // Stats
    safetyScore: number;
    rentStatus: 'paid' | 'unpaid' | 'pending';
    ownerId: string;
}

export interface Floor {
    floorNumber: number;
    rooms: Room[];
}

export interface Room {
    id: string;
    roomNumber: string;
    type: 'Single' | 'Double' | 'Triple';
    price: number;
    beds: Bed[];
    features: string[]; // e.g. "Attached Balcony", "AC"
    size: string; // "150 sq ft"
}

export interface Bed {
    id: string;
    roomId: string; // e.g., '101'
    status: 'occupied' | 'empty';
    studentName?: string;
    lastPaymentDate?: string;
}

export interface StudentProfile {
    id: string;
    name: string; // Anonymous: "Student #123"
    habits: {
        earlyRiser: boolean;
        nightOwl: boolean;
        clean: boolean;
        partyPerson: boolean;
    };
    bio: string;
}

export const AMENITY_WEIGHTS: Record<string, number> = {}; // Deprecated in favor of SAFETY_WEIGHTS
