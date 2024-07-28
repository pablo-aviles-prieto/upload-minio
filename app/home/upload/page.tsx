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
  console.log('buckets', buckets);

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] max-w-xl mx-auto'>
      <div>Upload page</div>
      <UploadForm bucketOptions={buckets} />
    </div>
  );
}
