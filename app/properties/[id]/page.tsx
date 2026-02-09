import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Check, User, Mail, Phone, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MOCK_PROPERTIES } from '@/app/utils/mockData';
import { formatCurrency } from '@/app/utils/formercurrency';
import { STATUS_COLORS } from '@/app/utils/constant';
import { cn } from '@/lib/utils';
import { formatDate } from '@/app/utils/helpers';

interface PropertyDetailsPageProps {
  params: {
    id: string;
  };
}

// In a real app with App Router + dynamic routes, params should be awaited if we were fetching async,
// but for static props or simple sync access it can be direct.
// However, in Next.js 15+ (if that's the version), params is a Promise.
// Assuming Next.js 14/standard structured.

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  // Await params if using standard Next.js 15 patterns, but for now treating as object
  // If this breaks, we wrap it.
  const { id } = await params;
  
  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  const mainImage = property.images.find((img) => img.isMain) || property.images[0];
  const otherImages = property.images.filter((img) => img.id !== mainImage.id);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero / Main Image */}
      <div className="relative h-[60vh] w-full bg-gray-100 overflow-hidden">
        {mainImage ? (
           <Image
            src={mainImage.url}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            No Image Available
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/properties">
            <Button variant="secondary" size="sm" className="gap-2 bg-white/90 hover:bg-white backdrop-blur-sm shadow-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Listings
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Col */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Price Card */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider", STATUS_COLORS[property.status] || 'bg-blue-100 text-blue-700')}>
                        {property.status}
                      </span>
                      <span className="text-sm text-gray-500 uppercase tracking-wide px-2 border-l border-gray-300">
                        {property.type}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-5 h-5 mr-2 shrink-0 text-gray-400" />
                      <p>
                        {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="text-left md:text-right shrink-0">
                    <p className="text-3xl font-bold text-blue-600">
                      {formatCurrency(property.price)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {property.status === 'RENTED' ? '/ month' : ''}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-100">
                  <div className="flex flex-col items-center justify-center text-center p-3 rounded-lg bg-gray-50">
                    <Bed className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="font-semibold text-gray-900">{property.features.bedrooms}</span>
                    <span className="text-xs text-gray-500 uppercase">Beds</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-3 rounded-lg bg-gray-50">
                     <Bath className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="font-semibold text-gray-900">{property.features.bathrooms}</span>
                    <span className="text-xs text-gray-500 uppercase">Baths</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-3 rounded-lg bg-gray-50">
                     <Square className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="font-semibold text-gray-900">{property.features.squareFootage}</span>
                    <span className="text-xs text-gray-500 uppercase">Sq Ft</span>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Listed Date</p>
                    <div className="flex items-center gap-2 font-medium">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(property.createdAt)}
                    </div>
                  </div>
                   <div className="space-y-1">
                     <p className="text-gray-500">Reference ID</p>
                     <p className="font-medium text-gray-900 uppercase">#{property.id.split('-')[1]}</p>
                   </div>
                   {property.features.parkingSpaces && (
                     <div className="space-y-1">
                        <p className="text-gray-500">Parking</p>
                        <p className="font-medium text-gray-900">{property.features.parkingSpaces} Spaces</p>
                     </div>
                   )}
                   {property.features.hasPool && (
                      <div className="space-y-1">
                        <p className="text-gray-500">Pool</p>
                        <p className="font-medium text-gray-900">Yes</p>
                     </div>
                   )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">About this property</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features List */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Features & Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   property.features.furnished ? 'Furnished' : 'Unfurnished',
                   property.features.hasPool ? 'Swimming Pool' : null,
                   property.type === 'HOUSE' ? 'Private Garden' : null,
                   property.features.parkingSpaces ? `Parking (${property.features.parkingSpaces})` : null,
                   'High Speed Internet',
                   'Air Conditioning',
                   'Central Heating',
                   'Modern Kitchen'
                 ].filter(Boolean).map((feature, idx) => (
                   <div key={idx} className="flex items-center gap-2">
                     <div className="rounded-full bg-green-50 p-1">
                        <Check className="w-3 h-3 text-green-600" />
                     </div>
                     <span className="text-gray-600">{feature}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Gallery (Small Images) */}
            {otherImages.length > 0 && (
               <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">Photo Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {otherImages.map((img) => (
                         <div key={img.id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                           <Image 
                              src={img.url}
                              alt="Property View"
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-500"
                           />
                         </div>
                     ))}
                  </div>
               </div>
            )}
          </div>

          {/* Sidebar - Right Col */}
          <div className="space-y-6">
            {/* Agent Card */}
            {property.agent && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Listing Agent</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                    {property.agent.profileImage ? (
                      <Image src={property.agent.profileImage} alt={property.agent.firstName} fill className="object-cover"/>
                    ) : (
                      <User className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{property.agent.firstName} {property.agent.lastName}</p>
                    <p className="text-sm text-blue-600 font-medium">Certified Realtor</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{property.agent.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{property.agent.email}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-4 bg-gradient-to-br from-white to-blue-50/50">
               <div className="space-y-1">
                 <h3 className="text-lg font-bold text-gray-900">Interested?</h3>
                 <p className="text-sm text-gray-500">Book an inspection or ask a question.</p>
               </div>
               
               <form className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <div className="relative">
                      <Input id="date" type="date" className="block" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="I'm interested in this property..." 
                      className="resize-none"
                      rows={3}
                    />
                 </div>
                 <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    <CalendarCheck className="w-4 h-4 mr-2" />
                    Book Inspection
                 </Button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
