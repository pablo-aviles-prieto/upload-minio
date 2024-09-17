import { authOptions } from '@/lib/auth-options';
import { CustomSession } from '@/types';
import { HEADER_HEIGHT } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';
import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';
import { HeaderOptions } from './header-options';
import { LogoutButton } from '../logout-button/logout-button';
import { MobileSidebar } from './mobile-sidebar';

export const Header = async () => {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

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
      <div className='flex items-center gap-x-2 md:gap-x-4'>
        <div className='hidden md:flex items-center gap-x-4'>
          <HeaderOptions session={session as CustomSession} />
        </div>
        <div className='md:hidden'>
          <MobileSidebar session={session as CustomSession} />{' '}
        </div>
        <div className='flex items-center gap-x-2'>
          <LogoutButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
