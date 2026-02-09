"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Users,
  TrendingUp,
  MapPin,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  KeyRound,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/app/utils/constant";

const STEPS = [
  {
    icon: Sparkles,
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up as a client looking for your dream property or as a realtor ready to grow your portfolio.",
  },
  {
    icon: KeyRound,
    step: "02",
    title: "Browse & Apply",
    description:
      "Explore curated listings, schedule viewings, and submit applications — all from one dashboard.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Close the Deal",
    description:
      "Our platform handles documentation, payments, and onboarding so you can move in with confidence.",
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is vetted by our team. No scams, no surprises — just genuine opportunities.",
  },
  {
    icon: Users,
    title: "Expert Realtors",
    description:
      "Our network of certified agents provides personalized guidance from search to settlement.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description:
      "Real-time analytics and pricing data help you make confident, informed decisions.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description:
      "Access properties in the most sought-after neighborhoods with high appreciation potential.",
  },
];

const TESTIMONIALS = [
  {
    name: "Adewale Johnson",
    role: "Homeowner",
    quote:
      "4Zee Properties made buying my first home stress-free. The process was transparent and the agent was incredibly supportive.",
    avatar: "AJ",
  },
  {
    name: "Chioma Nwosu",
    role: "Real Estate Investor",
    quote:
      "I've closed three deals through 4Zee. Their platform is intuitive and the listings are always top-quality.",
    avatar: "CN",
  },
  {
    name: "Emeka Obi",
    role: "Realtor Partner",
    quote:
      "Joining as a realtor was the best career decision. The referral system and dashboard tools are excellent.",
    avatar: "EO",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ─── NAVIGATION ─── */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex h-14 items-center justify-between rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200/60 px-5 shadow-sm">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
              <Building2 className="h-5 w-5" />
              <span>{APP_NAME}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a href="#how-it-works" className="hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#features" className="hover:text-gray-900 transition-colors">
                Why Us
              </a>
              <a href="#testimonials" className="hover:text-gray-900 transition-colors">
                Testimonials
              </a>
              <Link href="/properties" className="hover:text-gray-900 transition-colors">
                Properties
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Log in
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm" className="text-sm font-semibold rounded-xl px-5">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative isolate pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/80 via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-primary/10 to-blue-200/30 blur-3xl opacity-60" />
        {/* Subtle grid */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left – Copy */}
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Nigeria&apos;s Trusted Property Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                Real Estate,{" "}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Whether you&apos;re buying your first home, investing in property, or
                growing a real estate career — 4Zee gives you the tools, listings,
                and expert support to succeed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <Button size="lg" className="h-13 px-8 text-base font-semibold rounded-xl gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                    Start For Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 px-8 text-base font-semibold rounded-xl gap-2 border-gray-300 hover:border-gray-400"
                  >
                    Explore Properties
                  </Button>
                </Link>
              </div>

              {/* Social proof mini */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2.5">
                  {["AJ", "CN", "EO", "RK"].map((initials, i) => (
                    <div
                      key={i}
                      className="h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-[11px] font-bold text-white shadow-sm"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">1,200+</span> happy
                  clients this year
                </div>
              </div>
            </div>

            {/* Right – Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10 ring-1 ring-gray-200/50">
                <Image
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury modern home"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured Listing
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-0.5">
                        Luxury 4-Bed Villa
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-3.5 w-3.5" /> Lekki Phase 1, Lagos
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-extrabold text-primary">₦85M</p>
                      <p className="text-xs text-green-600 font-medium flex items-center gap-1 justify-end mt-1">
                        <TrendingUp className="h-3 w-3" /> High demand
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative blob */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="py-10 border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Properties Listed" },
              { value: "1,200+", label: "Happy Clients" },
              { value: "120+", label: "Active Realtors" },
              { value: "₦2.5B+", label: "In Transactions" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Three steps to your next property
            </h2>
            <p className="text-gray-600 text-lg">
              We&apos;ve stripped away the complexity of real estate so you can focus on
              what matters — finding the right place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step) => (
              <div
                key={step.step}
                className="group relative bg-gray-50 hover:bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-4xl font-black text-gray-100 group-hover:text-primary/10 transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-200/50">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
                  alt="Modern real estate"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">100% Verified</p>
                  <p className="text-xs text-gray-500">All listings authenticated</p>
                </div>
              </div>
            </div>

            {/* Right — Feature cards */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                  Why Choose Us
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                  Built for modern property seekers
                </h2>
                <p className="text-gray-600 text-lg max-w-lg">
                  We combine technology with human expertise to deliver an experience
                  that&apos;s fast, secure, and genuinely helpful.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {FEATURES.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Loved by clients & realtors alike
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 px-8 py-16 md:px-16 md:py-20 text-center text-white">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Ready to find your perfect property?
              </h2>
              <p className="text-blue-100 text-lg">
                Join thousands of clients and realtors who trust 4Zee Properties.
                Create your free account today and get started in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="h-13 px-8 text-base font-semibold rounded-xl bg-white text-primary hover:bg-gray-100 gap-2 shadow-lg"
                  >
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 px-8 text-base font-semibold rounded-xl border-white/30 text-white hover:bg-white/10 gap-2"
                  >
                    Browse Listings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1 space-y-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
                <Building2 className="h-5 w-5 text-primary" />
                <span>{APP_NAME}</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nigeria&apos;s trusted property platform connecting buyers, renters, and
                realtors with verified real estate opportunities.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Platform
              </p>
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Browse Properties", href: "/properties" },
                  { label: "Become a Realtor", href: "/auth/realtor/signup" },
                  { label: "Client Sign Up", href: "/auth/clients/signup" },
                  { label: "Login", href: "/auth/login" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-primary transition-colors" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Company
              </p>
              <nav className="flex flex-col gap-3">
                {["About Us", "Careers", "Blog", "Privacy Policy", "Terms of Service"].map(
                  (text) => (
                    <span
                      key={text}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer flex items-center gap-1 group"
                    >
                      <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-primary transition-colors" />
                      {text}
                    </span>
                  )
                )}
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Contact
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hello@4zeeproperties.com"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-gray-400" />
                  hello@4zeeproperties.com
                </a>
                <a
                  href="tel:+2348000000000"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-gray-400" />
                  +234 800 000 0000
                </a>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <span
                  key={social}
                  className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
