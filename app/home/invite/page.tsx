import { InviteForm } from '@/components/form/invite/invite-form';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { listAllBuckets } from '@/services/minio/list-all-buckets';

export default async function Invite() {
  const buckets = await listAllBuckets();

  return (
    <>
      <Heading
        title='Invite a friend'
        description='Specify the access details for the user'
      />
      <ScrollArea className='h-[calc(100vh-161px)] w-full'>
        <div className='flex flex-col items-center justify-center max-w-xl mx-auto space-y-8 my-4 px-2'>
          <InviteForm bucketOptions={buckets} />
        </div>
      </ScrollArea>
    </>
  );
}
