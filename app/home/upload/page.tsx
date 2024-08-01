import { UploadForm } from '@/components/form/upload/upload-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { retrieveMinioClient } from '@/lib/minio-client';

async function listAllBuckets() {
  try {
    const buckets = await retrieveMinioClient().listBuckets();
    return buckets;
  } catch (err) {
    console.error('Error listing buckets:', err);
  }
}

export default async function Upload() {
  const buckets = await listAllBuckets();

  return (
    <>
      <h1 className='text-primary font-bold text-2xl text-center mb-4'>
        Upload up to 3 files
      </h1>
      <ScrollArea className='h-[calc(100vh-112px)] w-full'>
        <div className='flex flex-col items-center justify-center max-w-xl mx-auto space-y-8 my-4 px-4 sm:px-2'>
          <UploadForm bucketOptions={buckets} />
        </div>
      </ScrollArea>
    </>
  );
}
