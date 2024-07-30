'use client';

import { useEffect, useRef, useState } from 'react';
import { FilePond } from 'react-filepond';
import type { FilePondFile, FilePondInitialFile } from 'filepond';
import { URL_PROCESS_FILE } from '@/utils/const';
import { useToast } from '../../ui/use-toast';

type InputFileBlock = {
  files: (FilePondInitialFile | Blob | File)[];
  setFiles: React.Dispatch<
    React.SetStateAction<(FilePondInitialFile | File | Blob)[]>
  >;
};

export const InputFileBlock = ({ files, setFiles }: InputFileBlock) => {
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();
  const pondRef = useRef<FilePond>(null);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    const updatedFiles: Array<FilePondInitialFile | File | Blob> =
      fileItems.map((fileItem) => fileItem.file);
    setFiles(updatedFiles);
  };

  const handleFileProcessed = (response: any) => {
    const parsedRes = JSON.parse(response);
    console.log('parsedRes', parsedRes);
    return 'success';
  };

  const handleFileRemoved = (uniqueFileId: string) => {
    console.log('uniqueFileId', uniqueFileId);
    fetch(`${URL_PROCESS_FILE}?file=${uniqueFileId}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('File removed:', data);
      })
      .catch((error) => {
        console.error('Error removing file:', error);
      });
  };

  const handleUploadFiles = () => {
    if (pondRef.current) {
      pondRef.current.processFiles();
    }
  };

  return (
    <>
      <div
        className='file-wrapper max-w-[400px] mx-auto pt-4'
        style={isReady ? { opacity: 1 } : undefined}
      >
        <FilePond
          ref={pondRef}
          files={files}
          allowMultiple
          maxFiles={3}
          maxParallelUploads={3}
          onupdatefiles={handleUpdateFiles}
          credits={false}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action"> Browse </span>'
          labelFileProcessing='Uploading'
          labelFileProcessingComplete='Upload completed'
          labelTapToCancel='Please wait...'
          name='files'
          allowProcess={false} // Disable individual upload buttons
          instantUpload={false}
          server={{
            process: {
              url: URL_PROCESS_FILE,
              method: 'POST',
              withCredentials: false,
              onload: handleFileProcessed,
              onerror: (response) => {
                try {
                  const parsedRes = JSON.parse(response);
                  toast({
                    title: 'There was an error uploading the file',
                    description: parsedRes.error,
                    variant: 'destructive',
                  });
                } catch (error) {
                  // Meaning that the response its not a stringified object
                  console.log('ERROR UPLOADING THE FILE:', response);
                  toast({
                    title: 'There was an error uploading the file',
                    description: `Please, try again later`,
                    variant: 'destructive',
                  });
                }
              },
            },
            revert: (uniqueFileId, load, error) => {
              handleFileRemoved(uniqueFileId);
            },
          }}
        />
      </div>
      <button type='button' onClick={handleUploadFiles}>
        Upload Files
      </button>
    </>
  );
};
