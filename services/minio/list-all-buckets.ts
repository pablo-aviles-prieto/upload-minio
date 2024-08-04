import { retrieveMinioClient } from '@/lib/minio-client';

export const listAllBuckets = async () => {
  try {
    const buckets = await retrieveMinioClient().listBuckets();
    return buckets;
  } catch (err) {
    console.error('Error listing buckets:', err);
  }
};
