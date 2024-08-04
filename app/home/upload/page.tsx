import { UploadForm } from '@/components/form/upload/upload-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { listAllBuckets } from '@/services/minio/list-all-buckets';

export default async function Upload() {
  const buckets = await listAllBuckets();

  return (
    <>
      <h1 className='text-primary font-bold text-2xl text-center my-4'>
        Upload up to 3 files{' '}
        <span className='text-xs italic'>(10MB max size per file)</span>
      </h1>
      <ScrollArea className='h-[calc(100vh-128px)] w-full'>
        <div className='flex flex-col items-center justify-center max-w-xl mx-auto space-y-8 my-4 px-2'>
          <UploadForm bucketOptions={buckets} />
        </div>
      </ScrollArea>
    </>
  );
}
