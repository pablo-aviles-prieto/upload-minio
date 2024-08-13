import React from 'react';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

interface FilePreviewProps {
  fileName: string;
}

export const FilePreview = ({ fileName }: FilePreviewProps) => {
  const fileType = fileName.split('.').pop();

  // Ensure fileType is a valid key of defaultStyles
  const validFileType = (
    Object.keys(defaultStyles) as Array<DefaultExtensionType>
  ).includes(fileType as DefaultExtensionType)
    ? (fileType as DefaultExtensionType)
    : 'txt'; // Fallback to 'txt' or any default type if not valid

  return <FileIcon extension={fileType} {...defaultStyles[validFileType]} />;
};
