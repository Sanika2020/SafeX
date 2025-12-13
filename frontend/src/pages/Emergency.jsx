import React, { useState } from "react";
import {
    AlertTriangle,
    Phone,
    MapPin,
    Shield,
    Bell,
    Share2,
    Plus
} from "lucide-react";

const Emergency = () => {
    const [sosActive, setSosActive] = useState(false);

    const handleSOS = () => {
        setSosActive(!sosActive);
    };

    return (
        <div className="animate-fade-in pb-24 bg-gradient-to-b from-red-50 to-red-100 min-h-screen">

            {/* Header */}
            <div className="bg-red-100 p-8 rounded-b-[2rem] mb-8 text-center border-b border-red-200 shadow-md">
                <h1 className="text-3xl font-extrabold text-red-700 mb-1">
                    Emergency Center
                </h1>
                <p className="text-gray-700 text-sm">Quick access to critical safety tools</p>
            </div>

            <div className="px-6 flex flex-col gap-8">

                {/* SOS Button */}
                <div className="flex flex-col items-center justify-center py-6">
                    <button
                        onClick={handleSOS}
                        className={`w-52 h-52 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 
                        ${sosActive
                                ? "bg-red-700 animate-pulse shadow-red-500/60"
                                : "bg-gradient-to-br from-red-500 to-red-700 shadow-red-900/30"
                            }`}
                    >
                        <div className="bg-white/30 p-5 rounded-full mb-3 backdrop-blur-md shadow-inner">
                            <AlertTriangle size={46} className="text-white" />
                        </div>
                        <span className="text-3xl font-extrabold text-white tracking-widest">
                            SOS
                        </span>
                        <span className="text-[10px] text-red-100 mt-1 uppercase font-semibold">
                            Hold 3 sec
                        </span>
                    </button>

                    {sosActive && (
                        <p className="mt-6 text-red-700 font-semibold animate-pulse">
                            Broadcasting Emergency Signal...
                        </p>
                    )}
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-5">
                    <button className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all flex flex-col items-center group">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3 group-hover:bg-blue-200 transition">
                            <Share2 size={24} />
                        </div>
                        <span className="font-semibold text-gray-700 text-sm">
                            Share Location
                        </span>
                    </button>

                    <button className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all flex flex-col items-center group">
                        <div className="p-3 bg-green-100 text-green-600 rounded-full mb-3 group-hover:bg-green-200 transition">
                            <Phone size={24} />
                        </div>
                        <span className="font-semibold text-gray-700 text-sm">
                            Call Support
                        </span>
                    </button>
                </div>

                {/* Active Protocols */}
                <div className="bg-white shadow-md rounded-2xl p-6 border-t-4 border-teal-500">
                    <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-teal-600" />
                        Active Protocols
                    </h3>

                    <div className="space-y-4">

                        {/* Crash Detection */}
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl shadow-inner">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-200 text-red-700 rounded-lg">
                                    <Plus size={18} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">Crash Detection</p>
                                    <p className="text-xs text-gray-500">Auto-alert enabled</p>
                                </div>
                            </div>
                            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        </div>

                        {/* Severe Violation */}
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl shadow-inner">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-200 text-blue-700 rounded-lg">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">Severe Violation</p>
                                    <p className="text-xs text-gray-500">Manager alert active</p>
                                </div>
                            </div>
                            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        </div>

                    </div>
                </div>

                {/* Medical ID */}
                <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex justify-between mb-3">
                        <div>
                            <h3 className="text-xl font-bold">Medical ID</h3>
                            <p className="text-teal-600 text-sm">Alex Morgan</p>
                        </div>
                        <Shield size={24} className="text-teal-600" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                        <div>
                            <p className="text-gray-500 text-[11px] uppercase">Blood Type</p>
                            <p className="font-bold text-gray-900">O+</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-[11px] uppercase">Allergies</p>
                            <p className="font-bold text-gray-900">None</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Emergency;
