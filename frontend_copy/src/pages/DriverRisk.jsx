import React from "react";
import { AlertTriangle, TrendingUp, Activity, Shield } from "lucide-react";

/* ------------------------------------ LOG ITEM ------------------------------------ */
const LogItem = ({ time, type, severity }) => {
    const color =
        severity === "High"
            ? "bg-red-100 text-danger border-red-200"
            : severity === "Medium"
                ? "bg-yellow-100 text-warning border-yellow-200"
                : "bg-blue-100 text-blue-600 border-blue-200";

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full border ${color}`}>
                    <AlertTriangle size={18} />
                </div>

                <div>
                    <p className="font-semibold text-primary text-sm">{type}</p>
                    <p className="text-xs text-muted">{time}</p>
                </div>
            </div>

            <span className={`text-xs font-bold px-2 py-1 rounded border ${color}`}>
                {severity}
            </span>
        </div>
    );
};

/* ---------------------------------- MAIN COMPONENT ---------------------------------- */

const DriverRisk = () => {
    return (
        <div className="animate-fade-in pb-24">

            {/* HEADER */}
            <div className="bg-gradient-primary rounded-b-[2rem] p-8 text-white mb-24 shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Risk Analysis</h1>
                <p className="text-sm" style={{ color: 'black' }}>
                    Detailed breakdown of your driving performance
                </p>
            </div>
            <br />

            <div className="px-6 flex flex-col gap-8">

                {/* OVERALL SCORE */}
                <div className="card bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-xl p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />

                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                            <p className="text-teal-100 text-sm mb-1">Overall Safety Score</p>
                            <h2 className="text-6xl font-extrabold leading-tight">A+</h2>
                        </div>

                        <div className="bg-white/20 p-4 rounded-xl backdrop-blur-xl shadow-inner">
                            <Shield size={34} />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-teal-100">Top 5% of all drivers</span>
                            <span className="font-bold text-white text-lg">98/100</span>
                        </div>

                        <div className="w-full bg-white/20 rounded-full h-2.5">
                            <div
                                className="bg-white h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                                style={{ width: "98%" }}
                            />
                        </div>
                    </div>
                </div>

                {/* METRICS CARD */}
                <div className="card bg-white shadow-sm p-8 rounded-2xl">
                    <h3 className="text-primary font-bold mb-6 flex items-center gap-2 text-lg">
                        <Activity size={20} className="text-teal" />
                        Performance Metrics
                    </h3>

                    <div className="space-y-6">

                        {/* Metric */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted font-medium">Speed Control</span>
                                <span className="font-bold text-primary">95%</span>
                            </div>
                            <div className="w-full bg-silver rounded-full h-2.5">
                                <div
                                    className="bg-teal h-2.5 rounded-full"
                                    style={{ width: "95%" }}
                                />
                            </div>
                        </div>

                        {/* Metric */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted font-medium">Braking Smoothness</span>
                                <span className="font-bold text-primary">88%</span>
                            </div>
                            <div className="w-full bg-silver rounded-full h-2.5">
                                <div
                                    className="bg-mughal-green h-2.5 rounded-full"
                                    style={{ width: "88%" }}
                                />
                            </div>
                        </div>

                        {/* Metric */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted font-medium">Cornering Stability</span>
                                <span className="font-bold text-primary">92%</span>
                            </div>
                            <div className="w-full bg-silver rounded-full h-2.5">
                                <div
                                    className="bg-blue-500 h-2.5 rounded-full"
                                    style={{ width: "92%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* LOGS */}
                <div className="card bg-white shadow-sm rounded-2xl overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-primary text-lg">Recent Safety Events</h3>
                        <button className="text-xs font-bold text-teal tracking-wide hover:text-primary uppercase transition">
                            View All
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <LogItem time="Today, 10:42 AM" type="Sudden Braking" severity="Medium" />
                        <LogItem time="Yesterday, 4:15 PM" type="Speed Limit Violation (+15 km/h)" severity="High" />
                        <LogItem time="Yesterday, 2:30 PM" type="Sharp Turn" severity="Low" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DriverRisk;
