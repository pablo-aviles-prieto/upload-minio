'use client';

import { Icons } from '@/components/icons/icons';
import { UserRole, type CustomSession } from '@/types';
import { HEADER_OPTIONS } from '@/utils/const';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderOptionsProps {
  session: CustomSession;
}

export const HeaderOptions = ({ session }: HeaderOptionsProps) => {
  const pathname = usePathname();
  console.log('pathname', pathname);

  return (
    <>
      {HEADER_OPTIONS.filter((opt) => {
        return (
          !opt.roleAccess ||
          opt.roleAccess.includes(session?.user?.role ?? UserRole.USER)
        );
      }).map((opt) => {
        const Icon = Icons[(opt.icon || 'arrowRight') as keyof typeof Icons];
        const isPathActive = opt.href === pathname;
        return (
          <Link
            className={`${
              isPathActive
                ? 'text-primary/85 border-b border-orange-600/85'
                : 'hover:text-primary hover:border-b border-orange-600'
            } flex items-center gap-x-2`}
            key={opt.key}
            href={opt.href}
          >
            <Icon className='w-4 h-4' />
            <span>{opt.label}</span>
          </Link>
        );
      })}
    </>
  );
};
