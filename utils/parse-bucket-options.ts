import { BucketItemFromList } from 'minio';
import { ACCESS_TO_ALL_SCOPES } from './const';
import { UserRole } from '@/types';

interface BucketOptionsParams {
  scopes: string[];
  bucketOptions: BucketItemFromList[];
  role: UserRole;
}

export const parseBucketOptions = ({
  bucketOptions,
  scopes,
  role,
}: BucketOptionsParams) => {
  if (scopes.includes(ACCESS_TO_ALL_SCOPES) || role === UserRole.ADMIN) {
    return bucketOptions;
  }

  return bucketOptions.filter((opt) => scopes.includes(opt.name));
};
