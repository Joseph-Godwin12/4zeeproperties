'use client';

import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Home,
  Users,
  TrendingUp,
  Plus,
  Eye,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  UserCheck,
  Zap,
  Calendar,
  MessageSquare,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/app/cards/StatCard';
import Table from '@/app/cards/Table';
import { EmptyState } from '@/components/ui/empty-state';
import { formatCurrency } from '@/app/utils/formercurrency';
import { PropertyListings } from '@/components/realtor/PropertyListings';
import { PostPropertyModal, PropertyFormData } from '@/components/realtor/PostPropertyModal';
import { PropertyDetailsModal } from '@/components/realtor/PropertyDetailsModal';
import { Property } from '@/app/types/property';
import { cn } from '@/lib/utils';

// Mock Data
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse in Victoria Island',
    description: 'Beautiful 4-bedroom luxury penthouse with stunning views of Lagos',
    price: 250000000,
    status: 'AVAILABLE',
    type: 'APARTMENT',
    address: {
      street: '123 Lekki Palms Road',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100001',
      country: 'Nigeria',
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 3500,
      parkingSpaces: 2,
      hasPool: true,
      furnished: true,
    },
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Modern Apartment in Ikoyi',
    description: 'Spacious 3-bedroom apartment in prime Ikoyi location',
    price: 150000000,
    status: 'PENDING',
    type: 'APARTMENT',
    address: {
      street: '45 Ikoyi Drive',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100002',
      country: 'Nigeria',
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 2800,
      parkingSpaces: 2,
      hasPool: false,
      furnished: false,
    },
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Waterfront Villa in Lekki',
    description: 'Exclusive waterfront villa with garden and compound',
    price: 500000000,
    status: 'SOLD',
    type: 'HOUSE',
    address: {
      street: '67 Lekki Lagoon Road',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100003',
      country: 'Nigeria',
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      squareFootage: 5000,
      parkingSpaces: 4,
      hasPool: true,
      furnished: true,
    },
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const MOCK_SALES = [
  { id: '1', propertyId: '3', buyerName: 'Chioma Obi', salePrice: 500000000, date: '2024-01-15', status: 'COMPLETED' },
  { id: '2', propertyId: '2', buyerName: 'Segun Akande', salePrice: 150000000, date: '2024-01-20', status: 'COMPLETED' },
  { id: '3', propertyId: '1', buyerName: 'Amara Nwafor', salePrice: 250000000, date: '2024-02-01', status: 'PENDING' },
];

const MOCK_REFERRALS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'CONVERTED', date: '2024-01-10', commission: 500000 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'VERIFIED', date: '2024-01-15', commission: null },
  { id: '3', name: 'Mark Johnson', email: 'mark@example.com', status: 'PENDING', date: '2024-01-20', commission: null },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', status: 'CONVERTED', date: '2024-01-25', commission: 500000 },
];

export default function RealtorDashboard() {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPostPropertyOpen, setIsPostPropertyOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Calculate stats
  const totalSold = MOCK_SALES.filter(s => s.status === 'COMPLETED').length;
  const totalRevenue = MOCK_SALES.filter(s => s.status === 'COMPLETED').reduce((sum, s) => sum + s.salePrice, 0);
  const activeListings = properties.filter(p => p.status === 'AVAILABLE').length;
  const referrals = MOCK_REFERRALS.length;
  const convertedReferrals = MOCK_REFERRALS.filter(r => r.status === 'CONVERTED').length;

  const STATS = [
    {
      title: 'Properties Sold',
      value: totalSold.toString(),
      icon: Home,
      trend: 5,
      trendUp: true,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      trend: 12,
      trendUp: true,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Listings',
      value: activeListings.toString(),
      icon: Home,
      trend: 0,
      trendUp: false,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Referrals',
      value: referrals.toString(),
      icon: Users,
      trend: 18,
      trendUp: true,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const handlePostProperty = async (data: PropertyFormData) => {
    // Simulate API call
    const newProperty: Property = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      price: data.price,
      status: data.status,
      type: data.type,
      address: data.address as any,
      features: data.features as any,
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProperties([...properties, newProperty]);
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailsOpen(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== propertyId));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="text-gray-600 mt-1">Track your performance and manage your properties</p>
        </div>
        <Button
          onClick={() => setIsPostPropertyOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Plus size={20} />
          Post Property
        </Button>
      </div>

      {/* Key Metrics - 4 Column Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conversion Rate */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {referrals > 0 ? Math.round((convertedReferrals / referrals) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">{convertedReferrals} conversions from {referrals} referrals</p>
        </div>

        {/* Avg Sale Price */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Sale Price</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {totalSold > 0 ? formatCurrency(Math.round(totalRevenue / totalSold)) : formatCurrency(0)}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Based on {totalSold} completed sales</p>
        </div>

        {/* Active & Pending */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Pipeline</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                <span className="text-primary">{properties.filter(p => p.status === 'PENDING').length}</span>
                <span className="text-gray-400 text-base ml-2">Pending</span>
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-lg">
              <Zap className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">{properties.length} total properties</p>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Sales</h2>
            <p className="text-sm text-gray-600 mt-1">Latest property transactions</p>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <Table headers={['Buyer', 'Property', 'Sale Price', 'Date', 'Status']}>
            {MOCK_SALES.length > 0 ? (
              MOCK_SALES.map(sale => (
                <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors border-b last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-xs font-bold">
                        {sale.buyerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{sale.buyerName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">
                      {MOCK_PROPERTIES.find(p => p.id === sale.propertyId)?.title || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-primary">{formatCurrency(sale.salePrice)}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                        sale.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      )}
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">
                  <p className="text-gray-600">No sales recorded yet</p>
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>

      {/* Referrals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Referral Network</h2>
            <p className="text-sm text-gray-600 mt-1">People you've referred to the platform</p>
          </div>
          <Button variant="outline" size="sm">
            <LinkIcon size={16} />
            Copy Referral Link
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_REFERRALS.slice(0, 4).map(referral => (
            <div
              key={referral.id}
              className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-white text-sm font-bold">
                    {referral.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{referral.name}</p>
                    <p className="text-xs text-gray-600">{referral.email}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap',
                    referral.status === 'CONVERTED'
                      ? 'bg-green-100 text-green-800'
                      : referral.status === 'VERIFIED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  )}
                >
                  {referral.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t text-xs">
                <span className="text-gray-600">Referred {new Date(referral.date).toLocaleDateString()}</span>
                {referral.commission && <span className="font-semibold text-green-600">+{formatCurrency(referral.commission)}</span>}
              </div>
            </div>
          ))}
        </div>

        {MOCK_REFERRALS.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="font-medium text-gray-900">No referrals yet</p>
            <p className="text-sm text-gray-600">Share your referral link to start earning</p>
          </div>
        )}
      </div>

      {/* Properties Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Properties</h2>
            <p className="text-sm text-gray-600 mt-1">Manage and monitor your real estate portfolio</p>
          </div>
          <Button onClick={() => setIsPostPropertyOpen(true)} variant="outline" size="sm">
            <Plus size={16} />
            Add Property
          </Button>
        </div>

        <PropertyListings
          properties={properties}
          onViewDetails={handleViewDetails}
          onDelete={handleDeleteProperty}
        />
      </div>

      {/* Modals */}
      <PostPropertyModal
        isOpen={isPostPropertyOpen}
        onClose={() => setIsPostPropertyOpen(false)}
        onSubmit={handlePostProperty}
      />
      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
}
