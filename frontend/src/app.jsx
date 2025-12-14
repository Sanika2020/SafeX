import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, User, Car, Settings as SettingsIcon, LogOut, Home, Activity, AlertTriangle, Phone, Heart } from 'lucide-react';
import Signup from './pages/signup';
import Login from './pages/loginpage';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/profilepage';
import VehicleInfo from './pages/VehicleInfo';
import Settings from './pages/Settings';
import HomeDashboard from './pages/HomeDashboard';
import LiveDriving from './pages/LiveDriving';
import DriverRisk from './pages/DriverRisk';
import DriverHealth from './pages/DriverHealth';

import AdminDashboard from './pages/AdminDashboard';

const Navbar = () => {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

    if (isAuthPage) return null;

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Shield className="icon" />
                <span>SafeX</span>
            </div>
            <div className="nav-links">
                <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                    <Home size={20} />
                    <span>Home</span>
                </Link>
                <Link to="/live" className={`nav-item ${location.pathname === '/live' ? 'active' : ''}`}>
                    <Activity size={20} />
                    <span>Live</span>
                </Link>
                <Link to="/risk" className={`nav-item ${location.pathname === '/risk' ? 'active' : ''}`}>
                    <AlertTriangle size={20} />
                    <span>Risk</span>
                </Link>
                <Link to="/health" className={`nav-item ${location.pathname === '/health' ? 'active' : ''}`}>
                    <Heart size={20} />
                    <span>Health</span>
                </Link>

                <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
                    <User size={20} />
                    <span>Profile</span>
                </Link>
                <Link to="/vehicle" className={`nav-item ${location.pathname === '/vehicle' ? 'active' : ''}`}>
                    <Car size={20} />
                    <span>Vehicle</span>
                </Link>
                <Link to="/settings" className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}>
                    <SettingsIcon size={20} />
                    <span>Settings</span>
                </Link>
                <Link to="/login" className="nav-item logout">
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
            </div>
        </nav>
    );
};

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/dashboard" element={<HomeDashboard />} />
                        <Route path="/live" element={<LiveDriving />} />
                        <Route path="/risk" element={<DriverRisk />} />
                        <Route path="/health" element={<DriverHealth />} />

                        <Route path="/profile" element={<Profile />} />
                        <Route path="/vehicle" element={<VehicleInfo />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
