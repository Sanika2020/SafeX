import React from 'react';
import { TrendingUp, AlertTriangle, MapPin, Activity, Wind } from 'lucide-react';

// Safe color maps for Tailwind (dynamic classes won't work)
const colorClasses = {
    teal: "bg-teal-100 text-teal-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
};

const StatCard = ({ icon: Icon, title, value, subtext, color }) => {
    const colorClass = colorClasses[color] || colorClasses.blue;

    return (
        <div className="card bg-white shadow-sm rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-1">
            <div className="flex justify-between items-start mb-2">
                <div className={`p-3 rounded-xl ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <span className="text-xs font-bold text-success">+2.4%</span>
            </div>

            <h3 className="text-2xl font-bold text-primary">{value}</h3>
            <p className="text-xs text-muted">{title}</p>
            {subtext && <p className="text-[11px] text-muted mt-1">{subtext}</p>}
        </div>
    );
};

const HazardItem = ({ type, distance, level }) => {
    const isHigh = level.toLowerCase() === "high";

    return (
        <div className="flex items-center justify-between p-4 bg-silver rounded-xl mb-3 hover:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isHigh ? 'bg-red-100 text-danger' : 'bg-yellow-100 text-warning'}`}>
                    <AlertTriangle size={18} />
                </div>
                <div>
                    <p className="font-bold text-primary text-sm">{type}</p>
                    <p className="text-xs text-muted">{distance} away</p>
                </div>
            </div>

            <span className={`text-[11px] font-bold px-2 py-1 rounded ${isHigh ? 'bg-red-100 text-danger' : 'bg-yellow-100 text-warning'}`}>
                {level} Risk
            </span>
        </div>
    );
};

const HomeDashboard = () => {
    return (
        <div className="animate-fade-in pb-24">
            {/* HERO */}
            <div className="bg-gradient-primary rounded-b-[3rem] p-8 pb-28 text-white shadow-lg mb-[-2.5rem] relative z-0">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Hello, Alex! 👋</h1>

                    </div>

                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-md shadow-sm">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                            alt="Profile"
                            className="w-11 h-11 rounded-full bg-white"
                        />
                    </div>
                </div>
            </div>

            {/* STATS GRID */}
            <div className="px-6 relative z-10 grid grid-cols-2 gap-4 mt-4">
                <StatCard icon={Activity} title="Safety Score" value="94/100" subtext="Top 5% of drivers" color="teal" />
                <StatCard icon={Wind} title="Total Distance" value="1,240 km" subtext="This month" color="blue" />
            </div>

            {/* MAIN CONTENT */}
            <div className="px-6 grid gap-6 mt-4">

                {/* CURRENT TRIP */}
                <div className="card bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-primary flex items-center gap-2">
                            <MapPin size={20} className="text-teal" />
                            Current Trip
                        </h3>
                        <span className="bg-green-100 text-success text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                            Live
                        </span>
                    </div>

                    <div className="h-36 bg-silver rounded-xl relative overflow-hidden">
                        {/* Decorative Map */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover"></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
                                <div>
                                    <p className="text-xs text-muted">Current Road</p>
                                    <p className="font-semibold text-primary">Main Street, Downtown</p>
                                </div>

                                <div className="bg-gray-100 p-3 rounded-lg text-right">
                                    <p className="text-xs text-muted">Speed Limit</p>
                                    <p className="font-semibold text-primary">50 km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HAZARDS */}
                <div className="card bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-primary">Nearby Hazards</h3>
                        <span className="text-xs text-danger font-bold">2 Active</span>
                    </div>

                    <HazardItem type="Pothole" distance="200m" level="Medium" />
                    <HazardItem type="Pedestrian Crossing" distance="500m" level="High" />
                </div>

                {/* AI INSIGHT */}
                <div className="card bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={20} className="text-warning" />
                        <h3 className="font-bold">AI Insight</h3>
                    </div>

                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        High traffic density predicted in 2km. Reduce speed to maintain your safety rating.
                    </p>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                        <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Safety Probability</span>
                        <span>85%</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomeDashboard;
