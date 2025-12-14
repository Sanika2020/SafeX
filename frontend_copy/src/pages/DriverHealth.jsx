import React from "react";
import {
    Heart,
    Activity,
    Moon,
    Thermometer,
    Zap
} from "lucide-react";

/* ------------------------------------ METRIC CARD ------------------------------------ */
const MetricCard = ({ icon: Icon, title, value, unit, status, colorClass, gradient }) => {
    return (
        <div className={`card ${gradient ? gradient : 'bg-white'} shadow-sm p-5 rounded-2xl relative overflow-hidden transition-all hover:shadow-md flex flex-row-reverse justify-between items-center`}>

            {/* RIGHT SIDE: Icon & Title */}
            <div className="flex flex-col items-center gap-2">
                <div className={`p-3 rounded-xl ${colorClass} bg-opacity-20 backdrop-blur-sm`}>
                    <Icon size={22} className={gradient ? 'text-white' : ''} />
                </div>
                <p className={`text-xs font-bold text-center ${gradient ? 'text-white/80' : 'text-muted'}`}>{title}</p>
                {status && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${gradient ? 'bg-white/20 text-white' : 'bg-gray-100 text-muted'}`}>
                        {status}
                    </span>
                )}
            </div>

            {/* LEFT SIDE: Value */}
            <div>
                <div className="flex items-baseline gap-1">
                    <h3 className={`text-3xl font-extrabold ${gradient ? 'text-white' : 'text-primary'}`}>{value}</h3>
                    <span className={`text-sm font-medium ${gradient ? 'text-white/80' : 'text-muted'}`}>{unit}</span>
                </div>
            </div>
        </div>
    );
};

/* ---------------------------------- MAIN COMPONENT ---------------------------------- */

const DriverHealth = () => {
    return (
        <div className="animate-fade-in pb-24">

            {/* HEADER */}
            <div className="bg-gradient-primary rounded-b-[2rem] p-8 text-white mb-8 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">Driver Health</h1>
                </div>
                <p className="text-sm opacity-90" style={{ color: 'black' }}>
                    Real-time vitals monitoring
                </p>
            </div>

            <div className="px-6 flex flex-col gap-6">

                {/* VITALS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Heart Rate (Moved to Grid) */}
                    <MetricCard
                        icon={Heart}
                        title="Heart Rate"
                        value="72"
                        unit="BPM"
                        status="Normal"
                        colorClass="bg-rose-100 text-rose-600"
                    />

                    <MetricCard
                        icon={Activity}
                        title="Blood Oxygen"
                        value="98"
                        unit="%"
                        status="Normal"
                        colorClass="bg-blue-100 text-blue-600"
                    />
                    <MetricCard
                        icon={Thermometer}
                        title="Temperature"
                        value="36.6"
                        unit="°C"
                        status="Normal"
                        colorClass="bg-orange-100 text-orange-600"
                    />
                    <MetricCard
                        icon={Zap}
                        title="Tiredness"
                        value="12"
                        unit="%"
                        status="Low"
                        colorClass="bg-yellow-100 text-yellow-600"
                    />
                    <MetricCard
                        icon={Moon}
                        title="Sleep"
                        value="7.5"
                        unit="hrs"
                        status="Good"
                        colorClass="bg-indigo-100 text-indigo-600"
                    />

                    {/* Stress Level (Moved to Grid) */}
                    <MetricCard
                        icon={Activity}
                        title="Stress Level"
                        value="Low"
                        unit="Risk"
                        status="Normal HRV"
                        colorClass="bg-purple-100 text-purple-600"
                    />
                </div>



            </div>
        </div>
    );
};

export default DriverHealth;
