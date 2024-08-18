import { FilesPage } from '@/components/pages/file-page/files-page';
import { GenericPage } from '@/components/pages/generic-page/generic-page';
import { Heading } from '@/components/ui/heading';
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
      <GenericPage text='There are no available buckets for your account. Please, contact the administrator.' />
    );
  }

  const selectedBucket =
    availableBuckets.find((bckt) => bckt.name === bucket) ??
    availableBuckets[0];

  return (
    <>
      <Heading
        customClasses='max-w-[300px] my-4 mx-auto'
        title='View files'
        description='Choose a bucket to explore the files'
      />
      <FilesPage
        availableBuckets={availableBuckets}
        defaultSelectedBucket={selectedBucket}
      />
    </>
  );
}
