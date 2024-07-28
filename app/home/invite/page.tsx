import { authOptions } from '@/lib/auth-options';
import { CustomSession, UserRole } from '@/types';
import { HEADER_OPTIONS } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';
import { redirect } from 'next/navigation';

const ACCESS_ROLES =
  HEADER_OPTIONS.find((opt) => opt.key === 'invite')?.roleAccess ?? [];

export default async function Invite() {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  if (
    !ACCESS_ROLES.includes(
      (session as CustomSession)?.user?.role ?? UserRole.USER
    )
  ) {
    redirect('/home');
  }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-64px)]'>
      <div>Invite page</div>
    </div>
  );
}
