'use client';

import { useState } from 'react';
import { SelectScrollable } from '../../form/select/select';
import { BucketItemFromList } from 'minio';

interface FilePageProps {
  availableBuckets: BucketItemFromList[];
  defaultSelectedBucket: BucketItemFromList;
}

export const SelectBucket = ({
  availableBuckets,
  defaultSelectedBucket,
}: FilePageProps) => {
  const [selectedBucket, setSelectedBucket] = useState<string>(
    defaultSelectedBucket.name
  );

  return (
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
  );
};
