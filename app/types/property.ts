import { User } from './user';

export type PropertyStatus = 'AVAILABLE' | 'SOLD' | 'RENTED' | 'PENDING';
export type PropertyType = 'HOUSE' | 'APARTMENT' | 'LAND' | 'COMMERCIAL';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  isMain: boolean;
}

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  parkingSpaces?: number;
  hasPool?: boolean;
  furnished?: boolean;
  [key: string]: any;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  status: PropertyStatus;
  type: PropertyType;
  address: Address;
  images: PropertyImage[];
  features: PropertyFeatures;
  agent?: User;
  owner?: User;
  createdAt: string;
  updatedAt: string;
}
