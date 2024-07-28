import { authOptions } from '@/lib/auth-options';
import { CustomSession, UserRole } from '@/types';
import { HEADER_OPTIONS } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';
import Link from 'next/link';

export const Header = async () => {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );
  console.log('session header', session);

  return (
    <nav
      className='flex items-center justify-between px-8 min-h-16'
      aria-label='Main Navigation'
    >
      <Link className='hover:text-primary' href='/home'>
        Uploader
      </Link>
      <div className='flex items-center gap-x-4'>
        {HEADER_OPTIONS.filter((opt) => {
          const typedSession = session as CustomSession;
          return (
            !opt.roleAccess ||
            opt.roleAccess.includes(typedSession?.user?.role ?? UserRole.USER)
          );
        }).map((opt) => (
          <Link
            className='hover:underline hover:text-primary underline-offset-8'
            key={opt.key}
            href={opt.href}
          >
            {opt.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
