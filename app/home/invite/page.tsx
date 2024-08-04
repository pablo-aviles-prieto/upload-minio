import { InviteForm } from '@/components/form/invite/invite-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authOptions } from '@/lib/auth-options';
import { listAllBuckets } from '@/services/minio/list-all-buckets';
import { CustomSession, UserRole } from '@/types';
import { HEADER_OPTIONS } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';
import { redirect } from 'next/navigation';

const ACCESS_ROLES =
  HEADER_OPTIONS.find((opt) => opt.key === 'invite')?.roleAccess ?? [];

export default async function Invite() {
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  if (
    !ACCESS_ROLES.includes(
      (session as CustomSession)?.user?.role ?? UserRole.USER
    )
  ) {
    redirect('/home');
  }

  const buckets = await listAllBuckets();

  return (
    <>
      <h1 className='text-primary font-bold text-2xl text-center my-4'>
        Invite a friend
      </h1>
      <ScrollArea className='h-[calc(100vh-128px)] w-full'>
        <div className='flex flex-col items-center justify-center max-w-xl mx-auto space-y-8 my-4 px-2'>
          <InviteForm bucketOptions={buckets} />
        </div>
      </ScrollArea>
    </>
  );
}
