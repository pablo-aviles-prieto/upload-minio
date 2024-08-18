import { UploadForm } from '@/components/form/upload/upload-form';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authOptions } from '@/lib/auth-options';
import { listAllBuckets } from '@/services/minio/list-all-buckets';
import { CustomSession } from '@/types';
import { getServerSession, NextAuthOptions } from 'next-auth';

export default async function Upload() {
  const buckets = await listAllBuckets();
  const session = await getServerSession(
    authOptions as unknown as NextAuthOptions
  );

  return (
    <>
      <Heading
        title='Upload up to 3 files'
        description='10MB max size per file'
      />
      <ScrollArea className='h-[calc(100vh-161px)] w-full'>
        <div className='flex flex-col items-center justify-center max-w-xl mx-auto space-y-8 my-4 px-2'>
          <UploadForm
            bucketOptions={buckets}
            userData={session?.user as CustomSession['user']}
          />
        </div>
      </ScrollArea>
    </>
  );
}
