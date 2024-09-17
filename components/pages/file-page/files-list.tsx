import { UploadedFilesCard } from '@/components/cards/uploaded-files-card';
import { URL_LIST_FILES } from '@/utils/const';
import React, { useEffect, useState } from 'react';

interface BucketItem {
  name: string;
  size: number;
  etag: string;
  lastModified: string;
  url: string;
  prefix?: string;
}

interface FilesListProps {
  bucketName: string;
}

// TODO: Add much more files into the test bucket to check how its fetched (to check
// the pagination basically)
export const FilesList = ({ bucketName }: FilesListProps) => {
  const [files, setFiles] = useState<BucketItem[]>([]);

  useEffect(() => {
    // Clear the files state when the bucket changes
    setFiles([]);

    const fetchStream = async () => {
      const response = await fetch(
        `${URL_LIST_FILES}?bucketName=${bucketName}`
      );
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const objects = chunk
          .trim()
          .split('\n')
          .filter(Boolean)
          .map((line) => JSON.parse(line));

        setFiles((prevFiles) => [...prevFiles, ...objects]);
      }
    };

    fetchStream();
  }, [bucketName]);

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
      {files.map((file, i) => (
        <li key={`${file.name} ${i}`}>
          <UploadedFilesCard
            fileName={file.name}
            fileUrl={file.url}
            fileSize={file.size}
          />
        </li>
      ))}
    </ul>
  );
};
