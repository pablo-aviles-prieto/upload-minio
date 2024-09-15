import { NavOptionsCards } from '@/components/pages/home-page/nav-options-cards';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 min-h-[calc(100vh-64px)]'>
      <NavOptionsCards />
    </div>
  );
}
