import { getEllipsed } from '@/utils/const';
import { Separator } from './separator';

interface HeadingProps {
  title: string;
  description: string;
  customClasses?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  customClasses = undefined,
}) => {
  return (
    <div className={customClasses ?? 'mx-auto max-w-xl px-2 my-4'}>
      <h2 className='text-xl font-bold tracking-tight sm:text-3xl'>{title}</h2>
      <p className={`text-sm text-muted-foreground ${getEllipsed}`}>
        {description}
      </p>
      <Separator className='my-2' />
    </div>
  );
};
