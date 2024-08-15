'use client';

import { useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';
import Link from 'next/link';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

interface PDFPreviewProps {
  pdfFile: string;
}

export const PDFPreview = ({ pdfFile }: PDFPreviewProps) => {
  const [maxPages, setMaxPages] = useState<number>();
  const [actualPage, setActualPage] = useState(1);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: nextNumPages }: PDFDocumentProxy) => setMaxPages(nextNumPages),
    []
  );

  const changePageHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
      e.stopPropagation();
      setActualPage(page);
    },
    []
  );

  return (
    <div className='relative'>
      <Link
        className='w-full h-full flex justify-center items-center'
        href={pdfFile}
        rel='noopener noreferrer'
        target='_blank'
      >
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page pageNumber={actualPage} width={107} />
        </Document>
      </Link>
      <div className='z-10 flex items-center absolute bottom-0 w-full bg-slate-700/75 justify-between'>
        <Button
          className='w-6 h-6'
          variant='outline'
          size='icon'
          onClick={(e) => changePageHandler(e, actualPage - 1)}
          disabled={actualPage === 1}
        >
          <Icons.chevronLeft className='h-4 w-4' />
        </Button>
        <span className='text-xs text-[11px]'>
          {actualPage} of {maxPages}
        </span>
        <Button
          className='w-6 h-6'
          variant='outline'
          size='icon'
          onClick={(e) => changePageHandler(e, actualPage + 1)}
          disabled={actualPage === maxPages}
        >
          <Icons.chevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};
