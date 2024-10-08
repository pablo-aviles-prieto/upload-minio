'use client';

import { RefObject, useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import type { FilePondFile, FilePondInitialFile } from 'filepond';
import { errorMessages, URL_PROCESS_FILE } from '@/utils/const';
import { useToast } from '../../ui/use-toast';
import type { ProcessedFiles, UploadedFiles } from '@/types';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';

interface InputFileBlock {
  files: (FilePondInitialFile | Blob | File)[];
  setFiles: React.Dispatch<
    React.SetStateAction<(FilePondInitialFile | File | Blob)[]>
  >;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFiles[]>>;
  inputFileRef: RefObject<FilePond>;
  fileEndpoint?: string;
}

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation
);

export const InputFileBlock = ({
  files,
  inputFileRef,
  setFiles,
  setUploadedFiles,
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

  const handleFileProcessed = (response: string) => {
    const parsedRes = JSON.parse(response) as ProcessedFiles;
    setUploadedFiles((prevState) => [...prevState, ...parsedRes.uploadedFiles]);
    return parsedRes.uploadedFiles[0].name;
  };

  const handleFileRemoved = (uniqueFileId: string) => {
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
          imagePreviewMaxFileSize='2MB'
          maxFileSize='10MB'
          instantUpload={false}
          allowProcess={false} // Disable individual upload buttons
          allowRevert={false} // Hides the undo button after upload a file
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
                    title: errorMessages.genericFileErrorTitle,
                    description: parsedRes.error,
                    variant: 'destructive',
                  });
                } catch (error) {
                  // Meaning that the response its not a stringified object
                  console.log('ERROR UPLOADING THE FILE:', response);
                  toast({
                    title: errorMessages.genericFileErrorTitle,
                    description: errorMessages.tryAgain,
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
