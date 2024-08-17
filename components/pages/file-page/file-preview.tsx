import { IMAGE_EXTENSIONS } from '@/utils/const';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';
import { PDFPreview } from './pdf-preview';

interface FilePreviewProps {
  fileName: string;
  fileUrl: string;
}

export const FilePreview = ({ fileName, fileUrl }: FilePreviewProps) => {
  const fileType = useMemo(() => fileName.split('.').pop(), [fileName]);

  // Ensuring fileType is a valid key of defaultStyles
  const validFileType = useMemo(() => {
    return (Object.keys(defaultStyles) as Array<DefaultExtensionType>).includes(
      fileType as DefaultExtensionType
    )
      ? (fileType as DefaultExtensionType)
      : 'txt'; // Fallback to 'txt'
  }, [fileType]);

  const isImage = useMemo(
    () => IMAGE_EXTENSIONS.includes(fileType ?? ''),
    [fileType]
  );

  return validFileType === 'pdf' ? (
    <div className='w-full h-full flex justify-center items-center'>
      <PDFPreview pdfFile={fileUrl} />
    </div>
  ) : (
    <Link
      className='w-full h-full flex justify-center items-center'
      href={fileUrl}
      rel='noopener noreferrer'
      target='_blank'
    >
      {isImage ? (
        <img src={fileUrl} alt={fileName} className='w-full object-contain' />
      ) : (
        <FileIcon extension={fileType} {...defaultStyles[validFileType]} />
      )}
    </Link>
  );
};
