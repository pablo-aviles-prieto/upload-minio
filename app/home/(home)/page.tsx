import { LogoutBtn } from '@/components/auth/logout-btn';

// TODO: Cards with the different options
// Using the size of the payment method mini cards
export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 min-h-[calc(100vh-64px)]'>
      <div>Page home</div>
      <LogoutBtn />
    </div>
  );
}
