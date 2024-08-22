import { AccordionSection } from '@/components/pages/profile-page/accordion-section';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authOptions } from '@/lib/auth-options';
import { CustomSession } from '@/types';
import type { AccordionData } from '@/types/accordion';
import { getServerSession, NextAuthOptions } from 'next-auth';

export default async function Profile() {
  const session = (await getServerSession(
    authOptions as unknown as NextAuthOptions
  )) as CustomSession;

  return (
    <div>
      <Heading title='Profile' description='Manage your account settings' />
      <ScrollArea className='h-[calc(100vh-163px)] max-w-[80%] mx-auto'>
        <AccordionSection userId={session?.user?.id ?? ''} />
      </ScrollArea>
    </div>
  );
}
