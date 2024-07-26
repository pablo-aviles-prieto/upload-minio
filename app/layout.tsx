import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/layout/providers';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} overflow-hidden min-h-screen antialiased`}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
