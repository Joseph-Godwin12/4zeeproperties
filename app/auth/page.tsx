"use client";

import { useRouter } from "next/navigation";
import { User, Home, ChevronRight } from "lucide-react";

export default function AuthRoleSelect() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="min-h-screen flex flex-col">
        {/* Minimal Header */}
        <header className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">4zeeproperties</span>
          </div>
          <a
            href="/auth/login"
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-300 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            Sign in
          </a>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20">
          <div className="w-full max-w-5xl">
            {/* Heading */}
            <div className="text-center mb-20">
              <p className="text-blue-600 text-sm font-medium tracking-widest uppercase mb-4">
                Welcome to 4zeeproperties
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance text-slate-900">
                Who are you?
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-lg mx-auto leading-relaxed">
                Choose your path and unlock a personalized experience tailored just for you.
              </p>
            </div>

            {/* Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Client Option */}
              <button
                onClick={() => router.push("/auth/clients/signup")}
                className="group relative flex flex-col p-8 md:p-10 rounded-3xl text-left overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                    <User className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">I'm a Client</h2>
                  <p className="text-slate-500 leading-relaxed mb-10 text-base md:text-lg">
                    Find your dream home, browse listings, and connect with top agents in your area.
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span>Get started</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </button>

              {/* Realtor Option */}
              <button
                onClick={() => router.push("/auth/realtor/signup")}
                className="group relative flex flex-col p-8 md:p-10 rounded-3xl text-left overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                    <Home className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">I'm a Realtor</h2>
                  <p className="text-slate-500 leading-relaxed mb-10 text-base md:text-lg">
                    List properties, manage leads, and grow your real estate business with powerful tools.
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span>Join as Pro</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 HomeBase. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-blue-600 transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
