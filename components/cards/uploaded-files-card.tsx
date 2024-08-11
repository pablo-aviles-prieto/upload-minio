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
import { getEllipsed } from '@/utils/const';

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
      <CardHeader>
        <CardTitle className={`${getEllipsed} text-sm`}>{fileName}</CardTitle>
        <CardDescription className='text-xs'>
          {formatFileSize(fileSize)}
        </CardDescription>
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
