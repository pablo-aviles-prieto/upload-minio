'use client';

import { useState } from 'react';
import { SelectScrollable } from '../../form/select/select';
import { BucketItemFromList } from 'minio';
import { FilesList } from './files-list';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

interface FilePageProps {
  availableBuckets: BucketItemFromList[];
  defaultSelectedBucket: BucketItemFromList;
}

export const FilesPage = ({
  availableBuckets,
  defaultSelectedBucket,
}: FilePageProps) => {
  const [selectedBucket, setSelectedBucket] = useState<string>(
    defaultSelectedBucket.name
  );
  const router = useRouter();

  const changeSelectHandler = (bucketOpt: string) => {
    setSelectedBucket(bucketOpt);
    router.push(`/home/files?bucket=${bucketOpt}`);
  };

  return (
    <>
      <SelectScrollable
        maxWidth='max-w-[300px]'
        classes='mx-auto my-1'
        options={availableBuckets.map((bucket) => ({
          value: bucket.name,
          label: bucket.name,
        }))}
        selectedOption={selectedBucket}
        onChange={changeSelectHandler}
        placeholder='Available buckets'
      />
      <ScrollArea className='h-[calc(100vh-192px)] w-full py-3 pb-2 px-2 pr-3'>
        <FilesList bucketName={selectedBucket} />
      </ScrollArea>
    </>
  );
};
