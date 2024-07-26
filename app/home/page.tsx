import { LogoutBtn } from '@/components/auth/logout-btn';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center gap-y-12 p-24'>
      <div>Page home</div>
      <LogoutBtn />
    </div>
  );
}
