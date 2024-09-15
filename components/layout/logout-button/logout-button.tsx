'use client';

import { Button } from '@/components/ui/button';
import { ExitIcon } from '@radix-ui/react-icons';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()} variant='outline' size='icon'>
      <ExitIcon className='h-[1.2rem] w-[1.2rem]' />
      <span className='sr-only'>Logout button</span>
    </Button>
  );
};
