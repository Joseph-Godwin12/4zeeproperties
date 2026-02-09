'use client';

import React from 'react';
import StatCard from '@/app/cards/StatCard';
import PropertyCard from '@/app/cards/PropertyCard';
import { FileText, Heart } from 'lucide-react';
import { Property } from '@/app/types/property';

const MOCK_STATS = [
  { title: "Applications Submitted", value: "3", icon: FileText, trend: 12, trendUp: true },
  { title: "Saved Homes", value: "12", icon: Heart, trend: 5, trendUp: true },
];

const MOCK_PROPERTY: Property = {
    id: '1',
    title: 'Modern Apartment in Lekki',
    description: 'Beautiful 3 bedroom apartment',
    price: 45000000,
    status: 'AVAILABLE',
    type: 'APARTMENT',
    address: { street: '123 Admiralty Way', city: 'Lekki', state: 'Lagos', zipCode: '105102', country: 'Nigeria' },
    images: [{ id: '1', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80', isMain: true }],
    features: { bedrooms: 3, bathrooms: 3, squareFootage: 1500, parkingSpaces: 2 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

export default function ClientDashboard() {
  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {MOCK_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Saved Properties */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">My Saved Properties</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <PropertyCard key={i} property={{...MOCK_PROPERTY, id: String(i), title: `Saved Property ${i}`}} />
          ))}
        </div>
      </div>
    </div>
  );
}
