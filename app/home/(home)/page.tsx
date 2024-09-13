import { LogoutBtn } from '@/components/auth/logout-btn';
import { NavOptionsCards } from '@/components/pages/home-page/nav-options-cards';

// TODO: Remove logout button and put it along the theme button
// so the div should be removed?
export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 min-h-[calc(100vh-64px)]'>
      <NavOptionsCards />
      <LogoutBtn />
    </div>
  );
}
