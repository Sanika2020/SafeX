import React, { useState } from 'react';
import { Bell, Moon, Volume2, Shield, ChevronRight, Lock, Eye } from 'lucide-react';

const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-primary font-semibold text-lg mb-4">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

const ToggleItem = ({ icon: Icon, label, description, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-all shadow-sm
                ${checked ? 'bg-teal-50 text-teal' : 'bg-gray-100 text-gray-400'}
            `}>
                <Icon size={20} />
            </div>
            <div>
                <p className="font-semibold text-primary text-sm">{label}</p>
                {description && (
                    <p className="text-xs text-gray-500">{description}</p>
                )}
            </div>
        </div>

        {/* Toggle Switch */}
        <button
            onClick={onChange}
            className={`w-14 h-7 rounded-full flex items-center transition-all px-1 
                ${checked ? 'bg-teal-500' : 'bg-gray-300'}
            `}
        >
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all
                    ${checked ? 'translate-x-7' : 'translate-x-0'}
                `}
            ></div>
        </button>
    </div>
);

const Settings = () => {
    const [settings, setSettings] = useState({
        pushNotifications: true,
        emailAlerts: false,
        darkMode: false,
        soundEffects: true,
        privacyMode: true,
        locationHistory: true,
    });

    const toggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="animate-fade-in max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-primary mb-1">Settings</h1>
            <p className="text-gray-500 mb-8">Customise your preferences and privacy controls</p>

            {/* Notifications */}
            <Section title="Notifications">
                <ToggleItem
                    icon={Bell}
                    label="Push Notifications"
                    description="Receive real-time safety alerts"
                    checked={settings.pushNotifications}
                    onChange={() => toggle('pushNotifications')}
                />
                <ToggleItem
                    icon={Bell}
                    label="Email Weekly Reports"
                    description="Summary of driving behaviour"
                    checked={settings.emailAlerts}
                    onChange={() => toggle('emailAlerts')}
                />
            </Section>

            {/* Appearance */}
            <Section title="Appearance & Sound">
                <ToggleItem
                    icon={Moon}
                    label="Dark Mode"
                    description="Better for night driving"
                    checked={settings.darkMode}
                    onChange={() => toggle('darkMode')}
                />
                <ToggleItem
                    icon={Volume2}
                    label="Sound Effects"
                    description="Audio cues for hazards"
                    checked={settings.soundEffects}
                    onChange={() => toggle('soundEffects')}
                />
            </Section>

            {/* Privacy */}
            <Section title="Privacy & Security">
                <ToggleItem
                    icon={Eye}
                    label="Privacy Mode"
                    description="Hide personal details from dashboard"
                    checked={settings.privacyMode}
                    onChange={() => toggle('privacyMode')}
                />

                <ToggleItem
                    icon={Shield}
                    label="Location History"
                    description="Save routes for analytics"
                    checked={settings.locationHistory}
                    onChange={() => toggle('locationHistory')}
                />

                {/* Password Button */}
                <button className="w-full p-4 mt-3 flex items-center justify-between rounded-xl hover:bg-gray-50 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gray-100 text-gray-500 group-hover:bg-teal-50 group-hover:text-teal transition-all">
                            <Lock size={20} />
                        </div>
                        <div>
                            <p className="font-semibold text-primary text-sm">Change Password</p>
                            <p className="text-xs text-gray-500">Update your credentials</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </button>
            </Section>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 mt-8">
                <p>SafeX App Version 2.4.0</p>
                <p>© 2024 SafeX Inc. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Settings;
