import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import { UserStatus } from '@/types';
import { GenericPage } from '@/components/pages/generic-page/generic-page';

export default async function Home() {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  if (session?.user && (session.user as any).status === UserStatus.ACTIVE) {
    redirect('/home');
  }

  return (
    <GenericPage text='Your account is inactive. Contact an administrator to see if there was an error' />
  );
}
