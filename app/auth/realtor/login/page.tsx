"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Mail, Lock, ArrowRight, Briefcase, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RealtorLogin() {
  const router = useRouter();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.realtorLogin(form);
      if (response?.success) {
        router.push("/realtor/dashboard");
      } else {
        setError(response?.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans">
      
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
             <div className="flex items-center gap-2">
                <Briefcase className="text-emerald-600" size={28} />
                <span className="text-2xl font-bold text-slate-900">HomeBase PRO</span>
             </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Agent Login</h2>
            <p className="text-slate-500 mt-2 font-medium">Please enter your professional details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  placeholder="agent@homebase.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">Password</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  placeholder="••••••••"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 group mt-2"
            >
              <span className="tracking-wide">{loading ? "Verifying..." : "Sign In to Dashboard"}</span>
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Not a registered partner?{" "}
              <a href="/auth/realtor/signup" className="text-blue-600 font-bold hover:text-blue-700 transition-colors border-b-2 border-emerald-100 hover:border-emerald-600 pb-0.5">
                Apply to join
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}