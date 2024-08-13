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

export function UploadedFilesCard({
  fileName,
  fileUrl,
  fileSize,
  className,
  ...props
}: UploadedFilesCardProps) {
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader className='flex flex-row gap-x-4'>
        <div className='w-[100px]'>
          <FilePreview fileName={fileName} />
        </div>
        <div className='w-[calc(100%-116px)] max-h-[113px] flex flex-col justify-between break-all'>
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
