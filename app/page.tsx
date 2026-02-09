"use client";

import Link from 'next/link';
import { ArrowRight, Search, Home, Building2, MapPin } from 'lucide-react';
import PropertyCard from '@/app/cards/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_PROPERTIES, MOCK_STATS } from '@/app/utils/mockData';

export default function LandingPage() {
  const featuredProperties = MOCK_PROPERTIES.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop)' 
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Discover a wide range of properties selected just for you. 
            From luxury villas to cozy apartments.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            {/* Search Box */}
            {/* Role Selection CTA */}
            <Link href="/auth">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold border-white text-blue-700 hover:bg-white hover:text-blue-900 hover:border-white transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

     
      
    </div>
  );
}
