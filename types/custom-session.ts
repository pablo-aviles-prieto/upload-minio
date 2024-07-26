import { DefaultSession, User as NextAuthUser } from 'next-auth';
import { UserRole, UserStatus } from './user';
import { ThemeOptions } from '@/utils/const';

interface CustomUser extends Omit<NextAuthUser, 'name' | 'image' | 'email'> {
  email: string;
  theme: ThemeOptions;
  status: UserStatus;
  scopes: string[];
  role: UserRole;
}

export interface CustomSession extends DefaultSession {
  user?: CustomUser;
  accessToken?: string;
}
