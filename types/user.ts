import { User } from '@/models';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  TRIAL = 'TRIAL',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface UpdateUserPreferencesResponse {
  ok: boolean;
  updatedUser?: User;
  error?: string;
  message?: string;
}
