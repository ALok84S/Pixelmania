import React, { useState } from 'react';
import styles from './Occupancy3D.module.css';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

// --- Types & Interfaces ---
interface Position {
    x: number;
    y: number;
    z: number;
}

interface Dimensions {
    w: number;
    h: number;
    d: number;
}

interface Bed {
    id: string;
    status: 'available' | 'occupied';
    occupantName?: string;
    pos: Position;
}

// --- Cube Component ---
const Cube: React.FC<{
    pos: Position;
    dim: Dimensions;
    color: string;
    glow?: 'green' | 'red';
    className?: string;
    children?: React.ReactNode;
}> = ({ pos, dim, color, glow, className, children }) => {

    const style = {
        width: dim.w,
        height: dim.h,
        transform: `translate3d(${pos.x}px, ${-pos.y - dim.h}px, ${pos.z}px)`,
        '--half-width': `${dim.w / 2}px`,
        '--half-height': `${dim.h / 2}px`,
        '--half-depth': `${dim.d / 2}px`,
    } as React.CSSProperties;

    // Helper to darken colors for shading
    // Note: We are using CSS filters in the module for brightness, so just passing base color is fine.

    return (
        <div className={`${styles.cube} ${className || ''}`} style={style}>
            <div className={`${styles.face} ${styles.faceFront} ${styles.pixelEdge} ${glow === 'green' ? styles.glowGreen : glow === 'red' ? styles.glowRed : ''}`} style={{ backgroundColor: color }}></div>
            <div className={`${styles.face} ${styles.faceBack} ${styles.pixelEdge}`} style={{ backgroundColor: color }}></div>
            <div className={`${styles.face} ${styles.faceRight} ${styles.pixelEdge} ${glow === 'green' ? styles.glowGreen : glow === 'red' ? styles.glowRed : ''}`} style={{ backgroundColor: color }}></div>
            <div className={`${styles.face} ${styles.faceLeft} ${styles.pixelEdge}`} style={{ backgroundColor: color }}></div>
            <div className={`${styles.face} ${styles.faceTop} ${styles.pixelEdge}`} style={{ backgroundColor: color }}>{children}</div>
            <div className={`${styles.face} ${styles.faceBottom} ${styles.pixelEdge}`} style={{ backgroundColor: color }}></div>
        </div>
    );
};

// --- Avatar Component (A little block person) ---
const Avatar: React.FC = () => {
    return (
        <div className={styles.avatar} style={{ transformStyle: 'preserve-3d' }}>
            {/* Head */}
            <Cube pos={{ x: 10, y: 40, z: 10 }} dim={{ w: 20, h: 20, d: 20 }} color="#fca5a5" />
            {/* Body */}
            <Cube pos={{ x: 5, y: 0, z: 5 }} dim={{ w: 30, h: 40, d: 20 }} color="#3b82f6" />
        </div>
    );
};

// --- Main Occupancy3D View ---
const Occupancy3D: React.FC = () => {
    const [rotation, setRotation] = useState(45);
    const [zoom, setZoom] = useState(1);

    const [beds, setBeds] = useState<Bed[]>([
        { id: '1', status: 'available', pos: { x: -100, y: 0, z: -100 } },
        { id: '2', status: 'occupied', occupantName: 'Percival', pos: { x: 50, y: 0, z: -100 } },
        { id: '3', status: 'available', pos: { x: 50, y: 0, z: 50 } },
    ]);

    const toggleBed = (id: string) => {
        setBeds(prev => prev.map(bed => {
            if (bed.id !== id) return bed;
            const newStatus = bed.status === 'available' ? 'occupied' : 'available';
            return {
                ...bed,
                status: newStatus,
                occupantName: newStatus === 'occupied' ? 'New Student' : undefined
            };
        }));
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-3xl overflow-hidden text-white relative shadow-2xl border-4 border-slate-800">
            {/* Header / Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start pointer-events-none">
                <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl pointer-events-auto border border-slate-700 shadow-xl">
                    <h2 className="text-xl font-bold text-slate-100 mb-1">Room 101</h2>
                    <p className="text-slate-400 text-sm">Interactive Inspection</p>
                </div>

                <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl pointer-events-auto flex flex-col gap-4 border border-slate-700 shadow-xl w-64">
                    <div className="flex items-center gap-3">
                        <RotateCw size={18} className="text-slate-400" />
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={rotation}
                            onChange={(e) => setRotation(Number(e.target.value))}
                            className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Zoom</span>
                        <div className="flex gap-2">
                            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 active:scale-95 transition">
                                <ZoomOut size={16} />
                            </button>
                            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 active:scale-95 transition">
                                <ZoomIn size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D Scene Viewport */}
            <div className={`flex-1 flex items-center justify-center ${styles.sceneContainer}`}>
                {/* World Scale & Rotation Wrapper */}
                <div
                    className={styles.room}
                    style={{
                        transform: `scale(${zoom}) rotateX(-20deg) rotateY(${rotation}deg)`,
                    }}
                >
                    {/* --- FLOOR --- */}
                    <Cube pos={{ x: -250, y: -20, z: -250 }} dim={{ w: 500, h: 20, d: 500 }} color="#334155" /> {/* Base */}
                    <Cube pos={{ x: -240, y: 0, z: -240 }} dim={{ w: 480, h: 2, d: 480 }} color="#475569" /> {/* Carpet/Tiles */}

                    {/* --- WALLS (Back-Left and Back-Right) --- */}
                    <Cube pos={{ x: -250, y: 0, z: -250 }} dim={{ w: 500, h: 150, d: 20 }} color="#1e293b" /> {/* Back Wall */}
                    <Cube pos={{ x: -250, y: 0, z: -230 }} dim={{ w: 20, h: 150, d: 480 }} color="#1e293b" /> {/* Left Wall */}

                    {/* Decorative Windows */}
                    <Cube pos={{ x: -248, y: 60, z: -100 }} dim={{ w: 5, h: 50, d: 80 }} color="#93c5fd" glow="green" />

                    {/* --- BEDS --- */}
                    {beds.map((bed) => (
                        <div
                            key={bed.id}
                            style={{
                                transformStyle: 'preserve-3d',
                                position: 'absolute',
                                transform: `translate3d(${bed.pos.x}px, ${-bed.pos.y}px, ${bed.pos.z}px)`,
                                cursor: 'pointer'
                            }}
                            onClick={() => toggleBed(bed.id)}
                        >
                            {/* Bed Frame */}
                            <Cube
                                pos={{ x: 0, y: 0, z: 0 }}
                                dim={{ w: 80, h: 15, d: 140 }}
                                color="#78350f" // Wood brown
                                glow={bed.status === 'available' ? 'green' : 'red'}
                            />

                            {/* Mattress */}
                            <Cube
                                pos={{ x: 5, y: 15, z: 5 }}
                                dim={{ w: 70, h: 10, d: 130 }}
                                color={bed.status === 'available' ? '#f1f5f9' : '#334155'}
                            />

                            {/* Pillow */}
                            <Cube
                                pos={{ x: 10, y: 25, z: 10 }}
                                dim={{ w: 60, h: 5, d: 30 }}
                                color="#e2e8f0"
                            />

                            {/* Avatar (if occupied) */}
                            {bed.status === 'occupied' && (
                                <div style={{ position: 'absolute', transform: 'translate3d(20px, -60px, 40px)' }}>
                                    <Avatar />
                                </div>
                            )}

                            {/* Billboard Label */}
                            <div
                                className={styles.billboard}
                                style={{ transform: `translateX(-50%) rotateY(${-rotation}deg)` }} // Counter-rotate
                            >
                                <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm 
                                    ${bed.status === 'available'
                                        ? 'bg-green-500/80 text-white'
                                        : 'bg-red-500/80 text-white'}`
                                }>
                                    {bed.status === 'occupied' ? bed.occupantName : 'Empty'}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* --- WARDROBE --- */}
                    <Cube pos={{ x: 150, y: 0, z: -220 }} dim={{ w: 80, h: 120, d: 40 }} color="#57534e" />

                </div>
            </div>

            {/* Legend / Instructions */}
            <div className="absolute bottom-6 left-6 z-50">
                <div className="bg-slate-800/90 backdrop-blur p-4 rounded-xl border border-slate-700 text-xs text-slate-300">
                    <p className="flex items-center gap-2 mb-2"><span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span> Available</p>
                    <p className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]"></span> Occupied</p>
                    <p className="mt-2 text-slate-500 italic">Click a bed to toggle status</p>
                </div>
            </div>
        </div>
    );
};

export default Occupancy3D;
