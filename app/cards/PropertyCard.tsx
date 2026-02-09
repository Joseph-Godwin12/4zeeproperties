import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { Property } from '@/app/types/property';
import { STATUS_COLORS } from '@/app/utils/constant';
import { formatCurrency } from '@/app/utils/formercurrency';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className }) => {
  const {
    id,
    title,
    address,
    price,
    status,
    images,
    features,
  } = property;

  const mainImage = images.find((img) => img.isMain) || images[0];
  const imageUrl = mainImage ? mainImage.url : '/placeholder-property.jpg'; 
  const addressString = `${address.street}, ${address.city}, ${address.state}`;
  
  const statusColor = STATUS_COLORS[status] || 'bg-gray-100 text-gray-700';

  return (
    <div className={cn("group flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all duration-300", className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-10">
          <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider shadow-sm", statusColor)}>
            {status}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight truncate" title={title}>
            {title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-primary/70" />
            <span className="truncate" title={addressString}>{addressString}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-border/60 mt-auto">
           <div className="flex items-center gap-x-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5" title={`${features.bedrooms} Bedrooms`}>
                <Bed className="h-4 w-4" />
                <span>{features.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1.5" title={`${features.bathrooms} Bathrooms`}>
                <Bath className="h-4 w-4" />
                <span>{features.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1.5" title={`${features.squareFootage} Sq Ft`}>
                <Square className="h-4 w-4" />
                <span>{features.squareFootage.toLocaleString()}</span>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-xl font-bold text-primary tracking-tight">
            {formatCurrency(price)}
          </p>
          <Link 
            href={`/properties/${id}`} 
            className="inline-flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground h-9 w-9 transition-colors duration-300"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
