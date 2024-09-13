import { Icons } from '@/components/icons/icons';
import { filteredHeaderOptions } from '@/utils/filtered-header-options';
import { authOptions } from '@/lib/auth-options';
import { CustomSession } from '@/types';
import { getServerSession, NextAuthOptions } from 'next-auth';
import Link from 'next/link';

export const NavOptionsCards = async () => {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  return (
    <div
      className={`grid grid-cols-2 gap-5 sm:flex sm:justify-center sm:items-center`}
    >
      {filteredHeaderOptions(session as CustomSession).map((opt) => {
        const Icon = Icons[(opt.icon || 'arrowRight') as keyof typeof Icons];
        return (
          <Link
            key={opt.key}
            href={opt.href}
            className='flex flex-col items-center min-w-[96px] justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-primary/70 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
          >
            <Icon className='mb-3 h-6 w-6' />
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
};
