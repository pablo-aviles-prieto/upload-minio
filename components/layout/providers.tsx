'use client';

import React from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { Toaster } from '../ui/toaster';

export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <Toaster />
      {children}
    </SessionProvider>
  );
}
