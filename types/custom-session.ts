import { DefaultSession, User as NextAuthUser } from 'next-auth';

export interface CustomSession extends DefaultSession {
  user?: NextAuthUser;
  accessToken?: string;
}
