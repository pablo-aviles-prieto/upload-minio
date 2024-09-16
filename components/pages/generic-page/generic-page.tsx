'use client';

import { HEADER_HEIGHT } from '@/utils/const';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface GenericPageProps {
  text: string;
}

export const GenericPage = ({ text }: GenericPageProps) => {
  return (
    <>
      <div
        className={`flex flex-col gap-y-4 items-center justify-center px-2`}
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT} * 2)` }}
      >
        <p className='text-6xl'>🥺</p>
        <p>{text}</p>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    </>
  );
};
