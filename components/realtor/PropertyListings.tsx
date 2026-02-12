'use client';

import React, { useState } from 'react';
import { MapPin, Bed, Bath, Maximize2, Eye, Trash2, Edit2 } from 'lucide-react';
import { Property, PropertyStatus } from '@/app/types/property';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/app/utils/formercurrency';
import { cn } from '@/lib/utils';

interface PropertyListingsProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (propertyId: string) => void;
  loading?: boolean;
}

const statusColors: Record<PropertyStatus, { bg: string; text: string; label: string }> = {
  AVAILABLE: { bg: 'bg-green-100', text: 'text-green-800', label: 'Available' },
  SOLD: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Sold' },
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  RENTED: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Rented' },
};

export const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties,
  onViewDetails,
  onEdit,
  onDelete,
  loading = false,
}) => {
  return (
    <div className="space-y-4">
      {properties.length === 0 ? (
        <div className="text-center py-16 bg-gray-50/50 rounded-xl border border-dashed border-gray-300">
          <div className="space-y-3">
            <div className="text-4xl">🏠</div>
            <h3 className="font-semibold text-gray-900">No properties yet</h3>
            <p className="text-sm text-gray-600">Start adding properties to grow your portfolio</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => {
            const status = statusColors[property.status];
            const mainImage = property.images?.find(img => img.isMain)?.url || property.images?.[0]?.url;

            return (
              <div
                key={property.id}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden bg-gray-100 h-48">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-100">
                      <span className="text-4xl">🏘️</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className={cn('absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold', status.bg, status.text)}>
                    {status.label}
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onViewDetails(property)}
                      className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(property)}
                        className="p-3 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                        title="Edit"
                      >
                        <Edit2 size={20} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(property.id)}
                        className="p-3 bg-white rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3">
                  {/* Title */}
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                      {property.title}
                    </h3>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="shrink-0 mt-0.5 text-primary/70" />
                    <span className="line-clamp-1">
                      {property.address?.city}, {property.address?.state}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50/50 rounded-lg p-3">
                    <div className="flex items-center gap-1">
                      <Bed size={16} className="text-primary/70" />
                      <span>{property.features?.bedrooms || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={16} className="text-primary/70" />
                      <span>{property.features?.bathrooms || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 size={16} className="text-primary/70" />
                      <span>{property.features?.squareFootage || 0} sqft</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline justify-between pt-3 border-t">
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Listed at</p>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(property.price)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(property)}
                      className="text-primary hover:bg-primary/10"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
