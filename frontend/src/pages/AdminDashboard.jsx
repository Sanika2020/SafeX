import React, { useState } from 'react';
import { Users, AlertTriangle, TrendingUp, Search, Filter, Download, Shield } from 'lucide-react';

/* ---------------------- DRIVER ROW ---------------------- */
const DriverRow = ({ name, id, status, riskScore, lastTrip }) => (
    <tr className="border-b border-white/10 hover:bg-white/10 transition-all">
        <td className="p-5">
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-teal-blue/20 text-teal-blue flex items-center justify-center font-semibold border border-teal-blue/30">
                    {name.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="text-xs text-blue-200">ID: {id}</p>
                </div>
            </div>
        </td>

        <td className="p-5">
            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                ${status === 'Active'
                    ? 'bg-green-900/40 text-green-400 border border-green-700/50'
                    : 'bg-gray-700/40 text-gray-400 border border-gray-600/50'}
            `}>
                {status}
            </span>
        </td>

        <td className="p-5">
            <div className="flex items-center gap-4">
                <div className="w-28 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                        className={`h-full rounded-full 
                            ${riskScore > 80 ? 'bg-green-500' :
                                riskScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}
                        `}
                        style={{ width: `${riskScore}%` }}
                    ></div>
                </div>
                <span className="text-sm font-semibold text-white">{riskScore}</span>
            </div>
        </td>

        <td className="p-5 text-sm text-blue-200">{lastTrip}</td>

        <td className="p-5">
            <button className="text-sm text-teal-blue hover:text-teal-blue/80 font-medium hover:underline">
                View Report
            </button>
        </td>
    </tr>
);

/* ---------------------- STAT CARD ---------------------- */
const StatCard = ({ icon: Icon, title, value, subtext, trend, trendUp }) => (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-7 backdrop-blur-md shadow-xl hover:bg-white/15 transition-all">
        <div className="flex justify-between items-start mb-5">
            <div className="p-3 rounded-xl bg-teal-blue/20 text-teal-blue">
                <Icon size={26} />
            </div>

            <span className={`text-sm flex items-center gap-1 font-medium 
                ${trendUp ? 'text-green-400' : 'text-red-400'}`}
            >
                <TrendingUp size={14} className={trendUp ? '' : 'rotate-180'} /> 
                {trend}
            </span>
        </div>

        <h3 className="text-4xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-blue-200">{title}</p>
        {subtext && <p className="text-xs text-blue-300/60 mt-2">{subtext}</p>}
    </div>
);

const AdminDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen p-10 text-white bg-primary-dark animate-fade-in">

            {/* HEADER */}
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Fleet Command Center</h1>
                    <p className="text-blue-200">Real-time monitoring • Safety automation • Risk analytics</p>
                </div>

                <div className="flex gap-4">
                    <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg 
                        text-white font-medium flex items-center gap-2 transition-all">
                        <Filter size={18} /> Filters
                    </button>

                    <button className="px-5 py-2.5 hover:bg-mughal-green/80 rounded-lg 
                        text-white font-medium flex items-center gap-2 
                        shadow-lg shadow-green-900/20 bg-mughal-green transition-all">
                        <Download size={18} /> Export Report
                    </button>
                </div>
            </header>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
                <StatCard
                    icon={Users}
                    title="Active Drivers"
                    value="1,248"
                    trend="+12%"
                    trendUp={true}
                    subtext="98% currently online"
                />
                <StatCard
                    icon={AlertTriangle}
                    title="High Risk Alerts"
                    value="24"
                    trend="+5%"
                    trendUp={false}
                    subtext="Requires immediate investigation"
                />
                <StatCard
                    icon={Shield}
                    title="Avg Safety Score"
                    value="94.2"
                    trend="+2.4%"
                    trendUp={true}
                    subtext="Top 5% across fleet industry"
                />
            </div>

            {/* TABLE BLOCK */}
            <div className="bg-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg shadow-2xl">

                {/* Table Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Driver Rankings</h3>

                    <div className="relative w-80">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                        <input
                            type="text"
                            placeholder="Search by name or driver ID…"
                            className="w-full bg-black/20 border border-white/10 rounded-lg 
                                pl-10 pr-4 py-2.5 text-white placeholder-blue-300/60 
                                focus:outline-none focus:border-teal-blue transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-blue-200 text-sm border-b border-white/10 bg-white/5">
                                <th className="p-5 font-semibold">Driver</th>
                                <th className="p-5 font-semibold">Status</th>
                                <th className="p-5 font-semibold">Safety Score</th>
                                <th className="p-5 font-semibold">Last Trip</th>
                                <th className="p-5 font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <DriverRow name="Sarah Johnson" id="DRV-001" status="Active" riskScore={98} lastTrip="2 mins ago • Downtown" />
                            <DriverRow name="Michael Chen" id="DRV-004" status="Active" riskScore={92} lastTrip="15 mins ago • Highway 101" />
                            <DriverRow name="David Smith" id="DRV-012" status="Inactive" riskScore={85} lastTrip="2 days ago • Westside" />
                            <DriverRow name="James Wilson" id="DRV-009" status="Active" riskScore={64} lastTrip="1 hour ago • Industrial Park" />
                            <DriverRow name="Emily Davis" id="DRV-023" status="Active" riskScore={45} lastTrip="Just now • Main St" />
                        </tbody>
                    </table>
                </div>

                {/* FOOTER */}
                <div className="p-5 border-t border-white/10 flex justify-between items-center text-sm text-blue-200">
                    <span>Showing 5 of 1,248 drivers</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg hover:bg-white/10 transition">Previous</button>
                        <button className="px-4 py-2 rounded-lg hover:bg-white/10 transition">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
