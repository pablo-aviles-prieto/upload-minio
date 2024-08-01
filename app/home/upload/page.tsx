import { UploadForm } from '@/components/form/upload/upload-form';
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
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] max-w-xl mx-auto space-y-10'>
      <h1 className='text-primary font-bold text-2xl opacity-85'>
        Upload up to 3 files
      </h1>
      <UploadForm bucketOptions={buckets} />
    </div>
  );
}
