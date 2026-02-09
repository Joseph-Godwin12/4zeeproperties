export type Role = 'ADMIN' | 'REALTOR' | 'CLIENT';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  phoneNumber?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt?: string;
}
