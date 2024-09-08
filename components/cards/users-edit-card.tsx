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
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';

type CardProps = React.ComponentProps<typeof Card>;

interface UsersEditCardProps extends Omit<CardProps, 'onClick'> {
  user: User;
  isProtectedUser: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, user: User) => void;
}

export const UsersEditCard = ({
  user,
  isProtectedUser,
  onClick,
  ...props
}: UsersEditCardProps) => {
  return (
    <Card className={cn('w-full')} {...props}>
      <CardHeader>
        <CardTitle className={getEllipsed}>{user.email}</CardTitle>
        <CardDescription>
          {isProtectedUser
            ? `${user.role}, (NOT EDITABLE)`
            : `${user.role} (${capitalizeFirstLetter(user.status)})`}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant='secondary'
          className='w-full'
          onClick={(e) => onClick(e, user)}
          disabled={isProtectedUser}
        >
          <Icons.userEdit className='mr-1 h-4 w-4' />
          Edit User
        </Button>
      </CardFooter>
    </Card>
  );
};
