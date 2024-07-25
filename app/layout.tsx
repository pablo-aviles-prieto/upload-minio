import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/layout/providers';
import { getServerSession } from 'next-auth';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Upload data',
  description: 'Upload data to minio s3 bucket',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
