'use client';

import React from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { Toaster } from '../ui/toaster';
import ThemeProvider from './theme/theme-provider';
import { ThemeOptions } from '@/utils/const';

export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme={ThemeOptions.SYSTEM}
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <Toaster />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
