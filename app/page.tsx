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
            <div className="flex flex-col sm:flex-row items-center justify-center max-w-xl w-full gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  className="pl-10 h-12 bg-white text-gray-900 border-none placeholder:text-gray-500 focus-visible:ring-0" 
                  placeholder="Search by location..." 
                />
              </div>
              <Link href="/properties">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700">
                  Search
                </Button>
              </Link>
            </div>

            {/* Role Selection CTA */}
            <Link href="/auth">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-900 hover:border-white transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {MOCK_STATS.map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm md:text-base text-gray-600 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Properties</h2>
              <p className="text-gray-600 max-w-2xl">
                Explore our hand-picked selection of properties available for sale and rent. 
                These listings are verified and ready for viewing.
              </p>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="gap-2 group">
                View All Properties 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden">
               <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop)' 
                  }}
                />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Why Choose 4Zee Properties?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Wide Range of Properties</h3>
                    <p className="text-gray-600">
                      We have a vast database of residential and commercial properties to suit every budget and requirement.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Trusted Agents</h3>
                    <p className="text-gray-600">
                      Our experienced agents are here to guide you through every step of the buying or renting process.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
                    <p className="text-gray-600">
                      We focus on properties in key locations with great potential for appreciation and quality of life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
