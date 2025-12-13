import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, Shield, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Logic to send reset email involves backend integration, simulating success here
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
                        <p className="text-sm text-[#64748b] mt-2">Recover your account application</p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-[#0d1b3e]">Forgot Password?</h2>
                                <p className="text-sm text-[#64748b] mt-2">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="form-label text-[#0284C7]">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="form-input pl-10"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary w-full py-3 mt-6 shadow-sm hover:shadow-md"
                            >
                                Send Reset Link <ArrowRight size={18} />
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 animate-fade-in">
                            <div className="flex justify-center">
                                <div className="p-4 bg-[var(--fresh-green)]/10 rounded-full text-[var(--fresh-green)]">
                                    <CheckCircle size={48} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#0d1b3e]">Check Your Inbox</h2>
                                <p className="text-sm text-[#64748b] mt-2">
                                    We have sent a password reset link to <strong>{email}</strong>.
                                </p>
                            </div>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-[#0284C7] font-semibold hover:text-[#0369a1] text-sm"
                            >
                                Try a different email
                            </button>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="text-center mt-8 pt-6 border-t border-[#e0e0e0]">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-[#64748b] hover:text-[#0d1b3e] transition text-sm font-medium"
                        >
                            <ArrowLeft size={16} /> Back to Login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
