import { IMAGE_EXTENSIONS } from '@/utils/const';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

interface FilePreviewProps {
  fileName: string;
  fileUrl: string;
}

// TODO: Add preview for pdfs with react-pdf??? https://github.com/wojtekmaj/react-pdf
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

  return isImage ? (
    <Link
      className='w-full h-full flex justify-center items-center'
      href={fileUrl}
      rel='noopener noreferrer'
      target='_blank'
    >
      <img src={fileUrl} alt={fileName} className='w-full object-contain' />
    </Link>
  ) : (
    <FileIcon extension={fileType} {...defaultStyles[validFileType]} />
  );
};
