import { Property } from './property';

export interface RealtorStats {
  totalSold: number;
  totalRevenue: number;
  activeListings: number;
  referrals: number;
  closeRate: number;
}

export interface RealtorProperty extends Property {
  realtorId: string;
  soldDate?: string;
  salePrice?: number;
  commissionRate?: number;
}

export interface Sale {
  id: string;
  propertyId: string;
  property?: Property;
  salePrice: number;
  commissionRate: number;
  commissionAmount: number;
  soldDate: string;
  buyerName: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
}

export interface Referral {
  id: string;
  referredEmail: string;
  referredName?: string;
  createdAt: string;
  status: 'PENDING' | 'VERIFIED' | 'CONVERTED';
  commission?: number;
}

export interface RealtorDashboardData {
  stats: RealtorStats;
  properties: RealtorProperty[];
  sales: Sale[];
  referrals: Referral[];
}
