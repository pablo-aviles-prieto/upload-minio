import { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb-config';
import { User } from '@/models';
import { JWT, encode } from 'next-auth/jwt';
import { CustomSession } from '@/types';
import { compare } from 'bcrypt';

type EnhancedToken = CustomSession['user'] & JWT;

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      id: 'user-pw',
      name: 'user/password',
      async authorize(credentials, req) {
        const client = await clientPromise;
        const user = (await client
          .db()
          .collection('users')
          .findOne({ email: credentials?.email })) as User | null;
        if (!user) return null;
        const passwordMatches = await compare(
          credentials?.password || '',
          user.password
        );
        if (!passwordMatches) return null;

        // Update the lastLoginDate property
        await client
          .db()
          .collection<User>('users')
          .updateOne(
            { _id: user._id },
            { $set: { lastLoginDate: new Date().toISOString() } }
          );

        const returnedUser = {
          ...user,
          id: user._id,
        };
        return returnedUser;
      },
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  theme: {
    colorScheme: 'dark',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({
      token,
      trigger,
      user,
      session,
    }: {
      token: JWT;
      trigger: string;
      user?: CustomSession['user'];
      session: any;
    }) {
      // This callback is called whenever a JWT is created or updated.
      // When signing in, `user` will contain the user data returned by the `authorize` function.
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.scopes = user.scopes;
        token.theme = user.theme;
        token.status = user.status;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: EnhancedToken;
    }) {
      // This callback is called whenever the session data is accessed.
      // You can include additional user information from the `token` object.
      if (session.user) {
        const jwtString = await encode({
          token,
          secret: process.env.JWT_SECRET || '',
        });
        const customSession: Partial<CustomSession> & DefaultSession = {
          ...session,
          accessToken: jwtString,
          user: {
            id: token.id,
            email: token.email,
            role: token.role,
            scopes: token.scopes,
            status: token.status,
            theme: token.theme,
          },
        };
        return customSession;
      }
      return session;
    },
  },
  debug: false,
  pages: {
    signIn: '/',
  },
};
