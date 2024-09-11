import { authOptions } from '@/lib/auth-options';
import { CustomSession, UserRole } from '@/types';
import { HEADER_HEIGHT, HEADER_OPTIONS } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';
import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';

export const Header = async () => {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  // TODO: Set as primary color the option with the current path
  // TODO: Add logout button
  // TODO: Add logo for uploader
  return (
    <nav
      className={`flex items-center justify-between px-8`}
      style={{ height: HEADER_HEIGHT }}
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
        <ThemeToggle />
        {/* TODO: Add a logout button with a tooltip?¿ */}
      </div>
    </nav>
  );
};
