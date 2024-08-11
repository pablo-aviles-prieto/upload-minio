import { FilesPage } from '@/components/pages/file-page/files-page';
import { authOptions } from '@/lib/auth-options';
import { listAllBuckets } from '@/services/minio/list-all-buckets';
import { CustomSession, UserRole } from '@/types';
import { HEADER_HEIGHT } from '@/utils/const';
import { parseBucketOptions } from '@/utils/parse-bucket-options';
import { getServerSession, NextAuthOptions } from 'next-auth';

interface FilesProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function Files({ searchParams }: FilesProps) {
  const { bucket } = searchParams;

  const session = (await getServerSession(
    authOptions as unknown as NextAuthOptions
  )) as CustomSession;

  const allBuckets = await listAllBuckets();

  const availableBuckets = parseBucketOptions({
    bucketOptions: allBuckets ?? [],
    scopes: session?.user?.scopes ?? [],
    role: session?.user?.role ?? UserRole.TRIAL,
  });

  if (availableBuckets.length === 0) {
    return (
      <div
        className={`flex flex-col gap-y-4 items-center justify-center px-2`}
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT} * 2)` }}
      >
        <p className='text-6xl'>🥺</p>
        <p>
          There are no available buckets for your account. Please, contact the
          administrator.
        </p>
      </div>
    );
  }

  const selectedBucket =
    availableBuckets.find((bckt) => bckt.name === bucket) ??
    availableBuckets[0];

  return (
    <div
      className='flex items-center justify-center px-2'
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT} * 2)` }}
    >
      <FilesPage
        availableBuckets={availableBuckets}
        defaultSelectedBucket={selectedBucket}
      />
    </div>
  );
}
