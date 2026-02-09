import { Property } from './property';
import { User } from './user';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';

export interface Application {
  id: string;
  propertyId: string;
  clientId: string;
  property?: Property;
  client?: User;
  status: ApplicationStatus;
  notes?: string;
  documents?: string[];
  appliedAt: string;
  updatedAt?: string;
}
