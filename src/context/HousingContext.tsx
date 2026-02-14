import React, { createContext, useContext, useEffect, useState } from 'react';
import { calculateSafetyScore } from '../utils/safety';
import { Listing, Amenity, StudentProfile } from '../types';

export interface Application {
    id: string;
    studentId: string;
    listingId: string;
    status: 'applied' | 'verified' | 'approved' | 'rejected';
    createdAt: string; // ISO date
}

interface HousingContextType {
    listings: Listing[];
    students: StudentProfile[];
    applications: Application[]; // Added
    updateListing: (id: string, updates: Partial<Listing>) => void;
    markRentPaid: (listingId: string) => void;
    markStudentRentPaid: (listingId: string, roomId: string, bedId: string) => void;
    updateBedStatus: (listingId: string, roomId: string, bedId: string, status: 'occupied' | 'empty', studentName?: string) => void;
    verifyApplication: (appId: string) => void; // Added
    approveApplication: (appId: string) => void; // Added
    rejectApplication: (appId: string) => void; // Added
}

const INITIAL_LISTINGS: Listing[] = [
    {
        id: 'h1',
        title: 'Sunrise Student Living',
        location: { lat: 28.5355, lng: 77.3910, address: 'Sec 125, Noida', city: 'Noida', distance: '500m' },
        price: 12000,
        deposit: 12000,
        description: "Premium student housing with top-tier security and modern amenities.",
        type: 'Co-ed',
        totalFloors: 2,
        floors: [
            {
                floorNumber: 1,
                rooms: [
                    { id: '101', roomNumber: '101', type: 'Double', price: 12000, features: ['AC', 'Attached Balcony'], size: '200 sq ft', beds: [] },
                    { id: '102', roomNumber: '102', type: 'Single', price: 18000, features: ['AC'], size: '120 sq ft', beds: [] }
                ]
            }
        ],
        amenities: ['Wi-Fi', 'AC', 'Gym', 'Laundry', 'Power Backup'],
        safetyFeatures: ['CCTV', 'Security Guard', 'Biometric'],
        safetyScore: 90,
        rules: {
            curfew: '10:00 PM',
            visitors: 'Allowed in common area',
            nonVeg: true,
            smoking: false,
            drinking: false,
            noticePeriod: '30 Days'
        },
        rentStatus: 'unpaid',
        images: [
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ],
        ownerId: 'w1'
    },
    {
        id: 'h2',
        title: 'Green View Hostel',
        location: { lat: 28.5365, lng: 77.3920, address: 'Sec 126, Noida', city: 'Noida', distance: '1.2km' },
        price: 9000,
        deposit: 9000,
        description: "Budget-friendly accommodation with standard facilities.",
        type: 'Boys',
        totalFloors: 3,
        floors: [],
        amenities: ['Wi-Fi', 'Mess'],
        safetyFeatures: ['CCTV'],
        safetyScore: 30,
        rules: {
            curfew: '11:00 PM',
            visitors: 'Not Allowed',
            nonVeg: true,
            smoking: false,
            drinking: false,
            noticePeriod: '15 Days'
        },
        rentStatus: 'paid',
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ],
        ownerId: 'w1'
    },
    {
        id: 'h3',
        title: 'Scholar\'s Den',
        location: { lat: 28.5345, lng: 77.3900, address: 'Sec 124, Noida', city: 'Noida', distance: '800m' },
        price: 15000,
        deposit: 15000,
        description: "Exclusive girls hostel with strict security and comfortable living.",
        type: 'Girls',
        totalFloors: 4,
        floors: [],
        amenities: ['Wi-Fi', 'AC', 'Mess', 'Laundry'],
        safetyFeatures: ['Security Guard', 'Biometric', 'CCTV'],
        safetyScore: 90,
        rules: {
            curfew: '09:00 PM',
            visitors: 'Parents only',
            nonVeg: false,
            smoking: false,
            drinking: false,
            noticePeriod: '30 Days'
        },
        rentStatus: 'unpaid',
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ],
        ownerId: 'w2'
    }
];

const HousingContext = createContext<HousingContextType | undefined>(undefined);

export const HousingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [listings, setListings] = useState<Listing[]>(() => {
        const saved = localStorage.getItem('housing-listings');
        return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    });

    const [students] = useState<StudentProfile[]>([
        { id: 's1', name: 'Student A', habits: { earlyRiser: true, nightOwl: false, clean: true, partyPerson: false }, bio: 'Quiet study type.' },
        { id: 's2', name: 'Student B', habits: { earlyRiser: false, nightOwl: true, clean: false, partyPerson: true }, bio: 'Love music and hanging out.' },
    ]);

    // Mock Applications
    const [applications, setApplications] = useState<Application[]>([
        { id: 'a1', studentId: 's1', listingId: 'h1', status: 'applied', createdAt: new Date().toISOString() },
        { id: 'a2', studentId: 's2', listingId: 'h1', status: 'verified', createdAt: new Date(Date.now() - 86400000).toISOString() },
    ]);

    const verifyApplication = (appId: string) => {
        setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'verified' } : a));
    };

    const approveApplication = (appId: string) => {
        setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'approved' } : a));
    };

    const rejectApplication = (appId: string) => {
        setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'rejected' } : a));
    };

    // Mock Occupancy Grid: listingId -> array of 12 beds
    const [occupancyGrid, setOccupancyGrid] = useState<Record<string, boolean[]>>(() => {
        const saved = localStorage.getItem('housing-occupancy');
        if (saved) return JSON.parse(saved);
        const initialGrid: Record<string, boolean[]> = {};
        INITIAL_LISTINGS.forEach(l => {
            // Random occupancy
            initialGrid[l.id] = Array(12).fill(false).map(() => Math.random() > 0.5);
        });
        return initialGrid;
    });

    // Sync with localStorage
    useEffect(() => {
        localStorage.setItem('housing-listings', JSON.stringify(listings));
        localStorage.setItem('housing-occupancy', JSON.stringify(occupancyGrid));

        // Dispatch event for other tabs
        window.dispatchEvent(new Event('storage-update'));
    }, [listings, occupancyGrid]);

    useEffect(() => {
        const handleStorage = () => {
            const savedListings = localStorage.getItem('housing-listings');
            const savedOccupancy = localStorage.getItem('housing-occupancy');
            if (savedListings) setListings(JSON.parse(savedListings));
            if (savedOccupancy) setOccupancyGrid(JSON.parse(savedOccupancy));
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('storage-update', handleStorage); // Custom event for same-tab sync
        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('storage-update', handleStorage);
        };
    }, []);

    const updateListing = (id: string, updates: Partial<Listing>) => {
        setListings(prev => prev.map(l => {
            if (l.id === id) {
                const updated = { ...l, ...updates };
                // Recalculate score if safety features changed
                if (updates.safetyFeatures) {
                    updated.safetyScore = calculateSafetyScore(updated.safetyFeatures);
                }
                return updated;
            }
            return l;
        }));
    };

    const markRentPaid = (listingId: string) => {
        updateListing(listingId, { rentStatus: 'paid' });
    };

    const markStudentRentPaid = (listingId: string, roomId: string, bedId: string) => {
        setListings(prev => prev.map(l => {
            if (l.id !== listingId) return l;
            return {
                ...l,
                floors: l.floors.map(f => ({
                    ...f,
                    rooms: f.rooms.map(r => {
                        if (r.roomNumber !== roomId) return r;
                        return {
                            ...r,
                            beds: r.beds.map(b => {
                                if (b.id !== bedId) return b;
                                return { ...b, lastPaymentDate: new Date().toISOString() };
                            })
                        };
                    })
                }))
            };
        }));
    };

    const updateBedStatus = (listingId: string, roomId: string, bedId: string, status: 'occupied' | 'empty', studentName?: string) => {
        setListings(prev => prev.map(l => {
            if (l.id !== listingId) return l;

            // Deep copy execution to find and update bed
            const newFloors = l.floors.map(f => ({
                ...f,
                rooms: f.rooms.map(r => {
                    if (r.roomNumber !== roomId) return r;
                    return {
                        ...r,
                        beds: r.beds.map(b => {
                            if (b.id !== bedId) return b;
                            return { ...b, status, studentName: status === 'empty' ? undefined : studentName };
                        })
                    };
                })
            }));

            return { ...l, floors: newFloors };
        }));
    };

    return (
        <HousingContext.Provider value={{
            listings,
            students,
            applications,
            updateListing,
            markRentPaid,
            markStudentRentPaid,
            updateBedStatus,
            verifyApplication,
            approveApplication,
            rejectApplication
        }}>
            {children}
        </HousingContext.Provider>
    );
};

export const useHousing = () => {
    const context = useContext(HousingContext);
    if (!context) throw new Error('useHousing must be used within a HousingProvider');
    return context;
};
