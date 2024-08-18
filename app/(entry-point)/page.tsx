import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import { UserStatus } from '@/types';

export default async function Home() {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  redirect(
    !session?.user
      ? '/auth'
      : (session.user as any)?.status === UserStatus.INACTIVE
      ? '/inactive-user'
      : '/home'
  );
}
