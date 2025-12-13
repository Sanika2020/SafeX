import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Phone, ArrowRight, Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('driver');
  const [activeTab, setActiveTab] = useState('email');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f1f5f9] via-[#e0f2fe] to-[#ebebf0] p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="glass card rounded-2xl p-8 border border-white/40">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-[#0284C7] to-[#202c60] shadow-md">
                <Shield className="text-white" size={28} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#0d1b3e] tracking-tight">SafeX</h1>
            <p className="text-sm text-[#64748b] mt-2">Smarter, safer driving starts here</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-2 bg-[#f1f5f9] p-2 rounded-xl mb-6">
            {['driver', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                type="button"
                className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${role === r
                  ? 'bg-white text-[#0284C7] shadow-sm border border-[#e0e0e0]'
                  : 'text-[#64748b] hover:text-[#0d1b3e] bg-transparent'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Method Toggle */}
            <div className="login-tabs flex gap-2 mb-6">
              <button
                type="button"
                className={`tab-btn flex-1 ${activeTab === 'email' ? 'active' : ''}`}
                onClick={() => setActiveTab('email')}
              >
                Email
              </button>
              <button
                type="button"
                className={`tab-btn flex-1 ${activeTab === 'phone' ? 'active' : ''}`}
                onClick={() => setActiveTab('phone')}
              >
                Phone
              </button>
            </div>

            {/* Input Field */}
            <div className="space-y-2">
              <label className="form-label text-[#0284C7]">
                {activeTab === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative">
                {activeTab === 'email' ? (
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" size={18} />
                ) : (
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" size={18} />
                )}
                <input
                  type={activeTab === 'email' ? 'email' : 'text'}
                  placeholder={activeTab === 'email' ? 'Enter your email' : 'Enter your phone'}
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="form-label m-0">Password</label>
                <Link to="/forgot-password" className="text-xs font-semibold text-[#0284C7] hover:text-[#0369a1] transition">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full py-3 mt-6 shadow-sm hover:shadow-md"
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-[#e0e0e0]">
            <p className="text-sm text-[#64748b]">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[#0284C7] font-semibold hover:text-[#0369a1] transition"
              >
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
