import { authOptions } from '@/lib/auth-options';
import { CustomSession } from '@/types';
import { HEADER_HEIGHT } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';
import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';
import { HeaderOptions } from './header-options';

export const Header = async () => {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

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
        <HeaderOptions session={session as CustomSession} />
        <ThemeToggle />
      </div>
    </nav>
  );
};
