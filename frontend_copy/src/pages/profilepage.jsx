import React from "react";
import {
    User,
    Phone,
    Car,
    Edit2,
    Shield,
    Mail,
    MapPin,
    LogOut
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-10 flex flex-col gap-8">

            {/* Profile Header */}
            <div className="bg-[#0284C7] rounded-2xl p-8 md:p-10 text-white mb-8 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-black/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Alex Morgan
                        </h1>
                        <p className="text-white/90 flex items-center gap-2 text-sm font-medium">
                            <Shield size={18} /> Premium Driver • 4.9 Rating
                        </p>
                    </div>

                    <button className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all backdrop-blur-sm font-medium self-start md:self-auto">
                        <Edit2 size={16} /> Edit Profile
                    </button>
                </div>
            </div>

            {/* Cards stacked vertically */}
            <div className="flex flex-col gap-6">

                {/* Personal Info */}
                <div className="card bg-white shadow-md rounded-2xl p-6 border border-[#e0e0e0]">
                    <h3 className="text-black mb-5 flex items-center gap-2 font-semibold text-lg">
                        <User size={20} className="text-[#307B8E]" /> Personal Information
                    </h3>

                    <div className="space-y-3">
                        {[
                            { icon: Mail, label: "Email Address", value: "alex.morgan@example.com" },
                            { icon: Phone, label: "Phone Number", value: "+1 (555) 123-4567" },
                            { icon: MapPin, label: "Address", value: "123 Safety Blvd, Tech City" },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 bg-[#f9fafb] rounded-lg border border-[#e0e0e0] hover:bg-[#f5f6f8] transition-colors"
                                >
                                    <div className="p-2 bg-white rounded-full text-[#307B8E] shadow-xs">
                                        <Icon size={18} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-black/70 font-medium">{item.label}</p>
                                        <p className="font-semibold text-black text-sm">{item.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Vehicle Info */}
                <div className="card bg-white shadow-md rounded-2xl p-6 border border-[#e0e0e0]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-black flex items-center gap-2 font-semibold text-lg">
                            <Car size={20} className="text-[#307B8E]" /> Vehicle Details
                        </h3>
                        <button className="text-[#2f5f25] text-sm font-semibold hover:text-[#35602b] transition-colors">
                            Manage
                        </button>
                    </div>

                    <div className="bg-[#e5eaf0] rounded-xl p-6 text-black relative overflow-hidden shadow-md border border-[#c0c8d0]">
                        <div className="relative z-10">
                            <h4 className="text-2xl font-bold mb-1">Tesla Model 3</h4>
                            <p className="text-black/60 text-sm mb-4">License: ABC-1234</p>

                            <div className="flex gap-4">
                                <div className="bg-white/10 px-4 py-2 rounded-lg text-xs border border-white/10">
                                    <span className="block text-black/70">Insurance</span>
                                    <span className="font-semibold text-[#35602b]">Active</span>
                                </div>

                                <div className="bg-white/10 px-4 py-2 rounded-lg text-xs border border-white/10">
                                    <span className="block text-black/70">Next Service</span>
                                    <span className="font-semibold">Dec 15, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Contacts */}
                <div className="card bg-white shadow-md rounded-2xl p-6 border border-[#e0e0e0]">
                    <h3 className="text-black mb-4 flex items-center gap-2 font-semibold text-lg">
                        <Phone size={20} className="text-[#D9534F]" /> Emergency Contacts
                    </h3>

                    <div className="space-y-3">
                        {[
                            { name: "Jane Morgan", role: "Spouse" },
                            { name: "Emergency Line", role: "Hospital" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#f9fafb] p-3 rounded-lg flex items-center justify-between shadow-xs border border-[#e0e0e0] hover:shadow-sm transition-shadow"
                            >
                                <div>
                                    <p className="font-semibold text-black text-sm">{item.name}</p>
                                    <p className="text-xs text-black/70">{item.role}</p>
                                </div>

                                <button className="p-2 bg-[#f5f6f8] rounded-full text-[#307B8E] hover:bg-[#307B8E] hover:text-white shadow-xs transition-all">
                                    <Phone size={16} />
                                </button>
                            </div>
                        ))}

                        <button className="w-full py-2.5 rounded-lg border-2 border-dashed border-[#d0dcd5] text-black font-medium text-sm hover:bg-[#fafbfc] transition-colors">
                            + Add New Contact
                        </button>
                    </div>
                </div>

                {/* Logout Button */}
                <Link
                    to="/signup"
                    className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-[#D9534F] hover:bg-[#c12e2e] text-white font-semibold transition-colors text-sm shadow-md"
                >
                    <LogOut size={18} /> Logout
                </Link>

            </div>
        </div>
    );
};

export default Profile;
