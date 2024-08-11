'use client';

import { useState } from 'react';
import { SelectScrollable } from '../../form/select/select';
import { BucketItemFromList } from 'minio';
import { FilesList } from './files-list';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  return (
    <>
      <SelectScrollable
        maxWidth='max-w-[300px]'
        classes='mx-auto'
        options={availableBuckets.map((bucket) => ({
          value: bucket.name,
          label: bucket.name,
        }))}
        selectedOption={selectedBucket}
        onChange={(opt) => setSelectedBucket(opt)}
        placeholder='Available buckets'
      />
      <ScrollArea className='h-[calc(100vh-100px)] w-full pt-4 pb-2 px-2 pr-3'>
        <FilesList bucketName={selectedBucket} />
      </ScrollArea>
    </>
  );
};
