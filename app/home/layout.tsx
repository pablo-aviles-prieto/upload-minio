import { Header } from '@/components/layout/header/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='overflow-hidden'>{children}</main>
    </>
  );
}
