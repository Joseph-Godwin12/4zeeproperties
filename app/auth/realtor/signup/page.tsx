"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Briefcase, Ticket } from "lucide-react";
import { api } from "@/lib/api";

export default function RealtorSignup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    referral: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.realtorSignup(form);
      if (response?.success) {
        router.push("/auth/realtor/login");
      } else {
        setError(response?.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Briefcase size={32} className="text-blue-600" />
            <span className="text-2xl font-bold tracking-tighter text-slate-900">HomeBase Pro</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Partner With Us</h2>
            <p className="text-slate-500 mt-2">Create your professional realtor profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <User size={20} />
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  placeholder="e.g. Sarah Jenkins"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Mail size={20} />
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  placeholder="sarah@agency.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Lock size={20} />
                </span>
                <input
                  required
                  type="password"
                  value={form.password}
                  placeholder="••••••••"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-semibold mb-2 text-blue-600">
                Referral Code <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Ticket size={20} />
                </span>
                <input
                  type="text"
                  value={form.referral}
                  placeholder="PRO-2024"
                  onChange={(e) => setForm({ ...form, referral: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all placeholder:text-emerald-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 group mt-4"
            >
              <span>{loading ? "Registering Pro Profile..." : "Complete Registration"}</span>
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-slate-600 mt-8">
            Already a partner?{" "}
            <a href="/auth/realtor/login" className="text-blue-600 font-bold hover:text-blue-700">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}