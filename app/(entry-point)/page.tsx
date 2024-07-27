import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { getServerSession, type NextAuthOptions } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );
  console.log('session entry point', session);
  redirect(session?.user ? '/home' : '/auth');
}
