import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { formatFileSize } from '@/utils/format-file-size';
import { Icons } from '../icons/icons';
import { FilePreview } from '../pages/file-page/file-preview';

type CardProps = React.ComponentProps<typeof Card>;

interface UploadedFilesCardProps extends CardProps {
  fileName: string;
  fileUrl: string;
  fileSize: number;
}

// TODO: Check that it looks nice when uploaded files (since its modified on the /home/files page)
export function UploadedFilesCard({
  fileName,
  fileUrl,
  fileSize,
  className,
  ...props
}: UploadedFilesCardProps) {
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader className='flex flex-row gap-x-4 h-[198px]'>
        <div className='w-[125px] overflow-hidden'>
          <FilePreview fileName={fileName} fileUrl={fileUrl} />
        </div>
        <div className='w-[calc(100%-(125px+16px))] max-h-[150px] flex flex-col justify-between break-all !m-0'>
          <CardTitle
            className={`text-sm overflow-hidden text-ellipsis line-clamp-4`}
          >
            {fileName}
          </CardTitle>
          <CardDescription className='text-xs font-bold text-right'>
            {formatFileSize(fileSize)}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Link
          className='w-full'
          href={fileUrl}
          rel='noopener noreferrer'
          target='_blank'
        >
          <Button variant='secondary' className='w-full'>
            <Icons.externalLink className='mr-1 h-4 w-4' />
            Preview file
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
