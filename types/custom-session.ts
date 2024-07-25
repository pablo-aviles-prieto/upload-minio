import { DefaultSession, User as NextAuthUser } from 'next-auth';

interface CustomUser extends NextAuthUser {
  theme?: string;
}

export interface CustomSession extends DefaultSession {
  user?: CustomUser;
  accessToken?: string;
}
