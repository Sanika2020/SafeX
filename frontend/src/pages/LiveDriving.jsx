import React, { useState, useEffect } from "react";
import {
    Navigation,
    AlertTriangle,
    Wind,
    AlertOctagon,
    MapPin,
    Camera,
} from "lucide-react";

const LiveDriving = () => {
    const [speed, setSpeed] = useState(65);
    const [hazardDistance, setHazardDistance] = useState(500);

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed((prev) =>
                Math.min(120, Math.max(0, prev + (Math.random() - 0.5) * 5))
            );
            setHazardDistance((prev) => (prev > 0 ? prev - 5 : 500));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen bg-black text-white relative overflow-hidden flex flex-col">

            {/* TOP BAR */}
            <div className="absolute top-0 left-0 right-0 z-20 p-5 bg-gradient-to-b from-black/80 to-transparent flex justify-between">

                {/* Recording Chip */}
                <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs tracking-wider text-gray-300">
                        REC 00:14:23
                    </span>
                </div>

                {/* Location + Weather */}
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <MapPin size={16} className="text-teal-300" />
                        <span className="font-semibold">I-95 Northbound</span>
                    </div>
                    <p className="text-xs text-gray-400">Sunny • 24°C</p>
                </div>
            </div>

            {/* CAMERA FEED */}
            <div className="flex-1 relative">

                {/* Video Placeholder / Background */}
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80')",
                    }}
                ></div>

                {/* Lane Indicators */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-1/4 w-1 h-1/2 bg-teal-300/40 transform -skew-x-[50deg]"></div>
                    <div className="absolute bottom-0 right-1/4 w-1 h-1/2 bg-teal-300/40 transform skew-x-[50deg]"></div>
                </div>

                {/* Hazard Popup */}
                <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-pulse">
                    <div className="bg-red-500/30 backdrop-blur-xl border border-red-500/50 p-3 rounded-full shadow-xl">
                        <AlertTriangle size={34} className="text-red-400" />
                    </div>
                    <div className="mt-2 bg-black/70 px-3 py-1 rounded text-xs font-semibold tracking-wider border border-white/10">
                        Obstacle {hazardDistance}m
                    </div>
                </div>
            </div>

            {/* BOTTOM HUD */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-8 pb-28 bg-gradient-to-t from-black via-black/80 to-transparent">

                <div className="max-w-5xl mx-auto grid grid-cols-3 gap-10 items-end">

                    {/* LEFT : Navigation Box */}
                    <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg">
                        <div className="flex items-center gap-4 mb-3">
                            <Navigation size={36} className="text-teal-300" />
                            <div>
                                <p className="text-3xl font-bold">300m</p>
                                <p className="text-sm text-gray-400">Turn Right</p>
                            </div>
                        </div>
                        <p className="text-sm border-t border-white/10 pt-3 mt-2 text-gray-300">
                            Exit 42B • Downtown
                        </p>
                    </div>

                    {/* CENTER : Speedometer */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-56 h-28 overflow-hidden">
                            {/* Base Arc */}
                            <div className="absolute bottom-0 w-56 h-56 rounded-full border-[12px] border-white/10"></div>

                            {/* Dynamic Arc */}
                            <div
                                className="absolute bottom-0 w-56 h-56 rounded-full border-[12px] border-teal-300"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                                    transform: `rotate(${(speed / 140) * 180 - 90}deg)`,
                                    transformOrigin: "bottom center",
                                    transition: "transform 0.4s ease-out",
                                }}
                            ></div>
                        </div>

                        <div className="-mt-10 relative z-10 text-center">
                            <span className="text-7xl font-bold font-mono">
                                {Math.round(speed)}
                            </span>
                            <span className="text-xl text-gray-400 ml-2">km/h</span>
                        </div>
                    </div>

                    {/* RIGHT : Alerts */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex items-center gap-3">
                            <AlertOctagon size={26} className="text-yellow-400" />
                            <div>
                                <p className="text-xs text-gray-400">Road Context</p>
                                <p className="font-semibold text-yellow-400">Curvy Mountain</p>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex items-center gap-3">
                            <Wind size={26} className="text-blue-300" />
                            <div>
                                <p className="text-xs text-gray-400">Wind Speed</p>
                                <p className="font-semibold">12 km/h NW</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LiveDriving;
