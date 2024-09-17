'use client';

import { Icons } from '@/components/icons/icons';
import { type CustomSession } from '@/types';
import { filteredHeaderOptions } from '@/utils/filtered-header-options';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderOptionsProps {
  session: CustomSession;
}

export const HeaderOptions = ({ session }: HeaderOptionsProps) => {
  const pathname = usePathname();

  return (
    <>
      {filteredHeaderOptions(session).map((opt) => {
        const Icon = Icons[(opt.icon || 'arrowRight') as keyof typeof Icons];
        const isPathActive = opt.href === pathname;
        return (
          <Link
            className={`${
              isPathActive
                ? 'text-primary/85 border-orange-600/85'
                : 'border-transparent hover:text-primary hover:border-orange-600'
            } flex items-center gap-x-2 border-b`}
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
