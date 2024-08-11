'use client';

import { useState } from 'react';
import { SelectScrollable } from '../../form/select/select';
import { BucketItemFromList } from 'minio';
import { FilesList } from './files-list';

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
    <div>
      <SelectScrollable
        maxWidth='max-w-[300px]'
        options={availableBuckets.map((bucket) => ({
          value: bucket.name,
          label: bucket.name,
        }))}
        selectedOption={selectedBucket}
        onChange={(opt) => setSelectedBucket(opt)}
        placeholder='Available buckets'
      />
      <div className='pt-4'>
        <FilesList bucketName={selectedBucket} />
      </div>
    </div>
  );
};
