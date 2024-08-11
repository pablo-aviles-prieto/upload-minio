import { URL_LIST_FILES } from '@/utils/const';
import React, { useEffect, useState } from 'react';

interface BucketItem {
  name: string;
  size: number;
  etag: string;
  lastModified: string;
  prefix?: string;
}

interface FilesListProps {
  bucketName: string;
}

export const FilesList = ({ bucketName }: FilesListProps) => {
  const [files, setFiles] = useState<BucketItem[]>([]);
  console.log('files', files);

  useEffect(() => {
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
    <div>
      <h2>Files in {bucketName}</h2>
      <ul>
        {files.map((file, i) => (
          <li key={`${file.name} ${i}`}>
            {file.name} (Size: {file.size} bytes)
          </li>
        ))}
      </ul>
    </div>
  );
};
