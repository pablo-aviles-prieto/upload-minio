import { BucketItemFromList } from 'minio';

export interface ListBucketsResponse {
  ok: boolean;
  buckets?: BucketItemFromList[];
  error?: string;
}
