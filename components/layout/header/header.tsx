import { authOptions } from '@/lib/auth-options';
import { CustomSession, UserRole } from '@/types';
import { HEADER_HEIGHT, HEADER_OPTIONS } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';
import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';
import { Icons } from '@/components/icons/icons';

export const Header = async () => {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  // TODO: Set as primary color the option with the current path
  // TODO: Add logout button
  // TODO: Add logo for uploader
  // TODO: Add a burger menu for mobile
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
        }).map((opt) => {
          const Icon = Icons[(opt.icon || 'arrowRight') as keyof typeof Icons];
          return (
            <Link
              className='hover:border-b border-orange-600 hover:text-primary flex items-center gap-x-2'
              key={opt.key}
              href={opt.href}
            >
              <Icon className='w-4 h-4' />
              <span>{opt.label}</span>
            </Link>
          );
        })}
        <ThemeToggle />
      </div>
    </nav>
  );
};
