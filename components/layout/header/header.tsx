import { authOptions } from '@/lib/auth-options';
import { CustomSession } from '@/types';
import { HEADER_HEIGHT } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';
import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';
import { HeaderOptions } from './header-options';
import { LogoutButton } from '../logout-button/logout-button';
import { MobileSidebar } from './mobile-sidebar';
import Image from 'next/image';

export const Header = async () => {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  return (
    <nav
      className={`flex items-center justify-between px-8`}
      style={{ height: HEADER_HEIGHT }}
      aria-label='Main Navigation'
    >
      <Link
        className='min-w-[4.5rem] hover:text-primary sm:mt-6 flex flex-col items-center justify-center'
        href='/home'
      >
        <Image
          className='rounded-lg'
          src='/assets/logo.webp'
          alt='Uploader logo'
          width={50}
          height={50}
          priority
        />
        <span className='hidden sm:inline'>Uploader</span>
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
