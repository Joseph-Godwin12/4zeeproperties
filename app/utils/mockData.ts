import { Property, PropertyStatus, PropertyType } from '@/app/types/property';
import { User, Role } from '@/app/types/user';

export const MOCK_USER: User = {
  id: 'user-123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  role: 'CLIENT',
  phoneNumber: '+1 (555) 123-4567',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
  createdAt: new Date().toISOString(),
};

export const MOCK_AGENT: User = {
  id: 'agent-456',
  firstName: 'Sarah',
  lastName: 'Smith',
  email: 'sarah.smith@4zeeproperties.com',
  role: 'REALTOR',
  phoneNumber: '+1 (555) 987-6543',
  profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
  createdAt: new Date().toISOString(),
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Modern Luxury Villa with Pool',
    description: 'Experience luxury living in this stunning modern villa featuring floor-to-ceiling windows, a private infinity pool, and breathtaking mountain views. The open-concept living area is perfect for entertaining, while the master suite offers a private retreat.',
    price: 1250000,
    status: 'AVAILABLE',
    type: 'HOUSE',
    address: {
      street: '123 Highland Drive',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
    images: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
        isMain: true,
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
        isMain: false,
      },
      {
        id: 'img-1-3',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        isMain: false,
      }
    ],
    features: {
      bedrooms: 5,
      bathrooms: 4.5,
      squareFootage: 4200,
      parkingSpaces: 3,
      hasPool: true,
      furnished: true,
    },
    agent: MOCK_AGENT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prop-2',
    title: 'Downtown Penthouse Apartment',
    description: 'Luxurious penthouse in the heart of the city. Walking distance to the best restaurants and shops. Features a private roof terrace with panoramic skyline views.',
    price: 850000,
    status: 'AVAILABLE',
    type: 'APARTMENT',
    address: {
      street: '456 Urban Ave, Unit PH2',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    images: [
      {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
        isMain: true,
      },
      {
        id: 'img-2-2',
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
        isMain: false,
      }
    ],
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1500,
      parkingSpaces: 1,
      hasPool: false,
      furnished: false,
    },
    agent: MOCK_AGENT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prop-3',
    title: 'Cozy Family Home in Suburbs',
    description: 'Charming 3-bedroom home with a large backyard, perfect for families. Recently renovated kitchen and bathrooms. Located in a top-rated school district.',
    price: 450000,
    status: 'PENDING',
    type: 'HOUSE',
    address: {
      street: '789 Maple Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78704',
      country: 'USA',
    },
    images: [
      {
        id: 'img-3',
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop',
        isMain: true,
      }
    ],
    features: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1800,
      parkingSpaces: 2,
      hasPool: false,
      furnished: false,
    },
    agent: MOCK_AGENT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prop-4',
    title: 'Secluded Commercial Office Space',
    description: 'Modern office space suitable for startups or small businesses. High-speed internet infrastructure and conference rooms included.',
    price: 2500,
    status: 'AVAILABLE',
    type: 'COMMERCIAL',
    address: {
      street: '101 Tech Blvd',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    images: [
      {
        id: 'img-4',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        isMain: true,
      }
    ],
    features: {
      bedrooms: 0,
      bathrooms: 2,
      squareFootage: 1200,
      parkingSpaces: 10,
    },
    agent: MOCK_AGENT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prop-5',
    title: 'Beautiful Land for Development',
    description: '5 acres of prime land ready for development. Utilities available at the street. Great investment opportunity.',
    price: 150000,
    status: 'AVAILABLE',
    type: 'LAND',
    address: {
      street: 'Lot 5, Country Road',
      city: 'Nashville',
      state: 'TN',
      zipCode: '37209',
      country: 'USA',
    },
    images: [
      {
        id: 'img-5',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop',
        isMain: true,
      }
    ],
    features: {
      bedrooms: 0,
      bathrooms: 0,
      squareFootage: 217800, // 5 acres
    },
    agent: MOCK_AGENT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const MOCK_STATS = [
  { label: 'Properties Sold', value: '1,200+' },
  { label: 'Happy Clients', value: '5,000+' },
  { label: 'Years Experience', value: '15+' },
  { label: 'Awards Won', value: '25' },
];
