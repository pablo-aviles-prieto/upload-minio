'use client';

import { RefObject, useEffect, useState } from 'react';
import { FilePond } from 'react-filepond';
import type { FilePondFile, FilePondInitialFile } from 'filepond';
import { URL_PROCESS_FILE } from '@/utils/const';
import { useToast } from '../../ui/use-toast';

type InputFileBlock = {
  files: (FilePondInitialFile | Blob | File)[];
  setFiles: React.Dispatch<
    React.SetStateAction<(FilePondInitialFile | File | Blob)[]>
  >;
  inputFileRef: RefObject<FilePond>;
  fileEndpoint?: string;
};

export const InputFileBlock = ({
  files,
  setFiles,
  inputFileRef,
  fileEndpoint = undefined,
}: InputFileBlock) => {
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

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
    // TODO: Return the file name in this function even if its not used in the remove
    // TODO: Set the data of the uplaoded files in a setter
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

  return (
    <>
      <div
        className='file-wrapper mx-auto'
        style={isReady ? { opacity: 1 } : undefined}
      >
        <FilePond
          ref={inputFileRef}
          files={files}
          allowMultiple
          maxFiles={3}
          maxParallelUploads={3}
          onupdatefiles={handleUpdateFiles}
          credits={false}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action" tabindex="0" role="button"> Browse </span>'
          labelFileProcessing='Uploading'
          labelFileProcessingComplete='Upload completed'
          labelTapToCancel='Please wait...'
          name='files'
          allowProcess={false} // Disable individual upload buttons
          instantUpload={false}
          server={{
            process: {
              url: fileEndpoint ?? URL_PROCESS_FILE,
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
    </>
  );
};
