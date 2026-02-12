'use client';

import React, { useState } from 'react';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Zap,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Share2,
} from 'lucide-react';
import { Property } from '@/app/types/property';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/app/utils/formercurrency';
import { cn } from '@/lib/utils';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !property) return null;

  const images = property.images || [];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const copyToClipboard = () => {
    const text = `${property.title} - ${formatCurrency(property.price)}\n${property.address?.street}, ${property.address?.city}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Gallery */}
        <div className="relative bg-gray-100 h-96">
          {images.length > 0 ? (
            <>
              <img
                src={currentImage?.url || ''}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} className="text-gray-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                  >
                    <ChevronRight size={24} className="text-gray-900" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={cn(
                          'w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-all',
                          idx === currentImageIndex ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-100'
                        )}
                      >
                        <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100">
              <span className="text-6xl">🏘️</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin size={18} className="text-primary" />
                  <span>
                    {property.address?.street}, {property.address?.city}, {property.address?.state}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 font-medium">Price</div>
                <div className="text-3xl font-bold text-primary">{formatCurrency(property.price)}</div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex gap-2">
              <span
                className={cn(
                  'inline-block px-4 py-2 rounded-full text-sm font-semibold',
                  property.status === 'AVAILABLE'
                    ? 'bg-green-100 text-green-800'
                    : property.status === 'SOLD'
                      ? 'bg-purple-100 text-purple-800'
                      : property.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                )}
              >
                {property.status}
              </span>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                {property.type}
              </span>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Bed size={20} className="text-primary" />
                <span className="text-sm text-gray-600">Bedrooms</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{property.features?.bedrooms || 0}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Bath size={20} className="text-blue-600" />
                <span className="text-sm text-gray-600">Bathrooms</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{property.features?.bathrooms || 0}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Maximize2 size={20} className="text-orange-600" />
                <span className="text-sm text-gray-600">Square Feet</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{property.features?.squareFootage?.toLocaleString() || 0}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={20} className="text-green-600" />
                <span className="text-sm text-gray-600">Parking</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{property.features?.parkingSpaces || 0}</p>
            </div>
          </div>

          {/* Amenities */}
          {(property.features?.hasPool || property.features?.furnished) && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-3">
                {property.features?.hasPool && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                    <Zap size={16} /> Swimming Pool
                  </span>
                )}
                {property.features?.furnished && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    <Zap size={16} /> Furnished
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {property.description && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Address Details */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Address Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Street</p>
                <p className="font-medium text-gray-900">{property.address?.street}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="font-medium text-gray-900">{property.address?.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">State</p>
                <p className="font-medium text-gray-900">{property.address?.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Zip Code</p>
                <p className="font-medium text-gray-900">{property.address?.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <Button variant="outline" size="lg" onClick={copyToClipboard} className="flex-1">
              <Copy size={18} />
              {copied ? 'Copied!' : 'Copy Details'}
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <Share2 size={18} />
              Share
            </Button>
            <Button size="lg" className="flex-1">
              <Download size={18} />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
