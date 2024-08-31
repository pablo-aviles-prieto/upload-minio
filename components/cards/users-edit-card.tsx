'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '../icons/icons';
import { type User } from '@/models';
import { getEllipsed } from '@/utils/const';

type CardProps = React.ComponentProps<typeof Card>;

interface UsersEditCardProps extends Omit<CardProps, 'onClick'> {
  user: User;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, user: User) => void;
}

export const UsersEditCard = ({
  user,
  onClick,
  ...props
}: UsersEditCardProps) => {
  return (
    <Card className={cn('w-full')} {...props}>
      <CardHeader>
        <CardTitle className={getEllipsed}>{user.email}</CardTitle>
        <CardDescription>{user.role}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant='secondary'
          className='w-full'
          onClick={(e) => onClick(e, user)}
        >
          <Icons.userEdit className='mr-1 h-4 w-4' />
          Edit User
        </Button>
      </CardFooter>
    </Card>
  );
};
