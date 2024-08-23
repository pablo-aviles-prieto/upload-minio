import { ProfileAccordionSection } from '@/components/pages/profile-page/profile-accordion-section';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authOptions } from '@/lib/auth-options';
import { CustomSession, UserRole } from '@/types';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { ACCESS_TO_ALL_SCOPES, getEllipsed } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';

export default async function Profile() {
  const session = (await getServerSession(
    authOptions as unknown as NextAuthOptions
  )) as CustomSession;

  const availableScopes = (session: CustomSession) => {
    if (
      session.user?.role === UserRole.ADMIN ||
      session.user?.role.includes(ACCESS_TO_ALL_SCOPES)
    ) {
      return `${ACCESS_TO_ALL_SCOPES} scopes`;
    }
    return `${session.user?.scopes.join(', ')} scopes`;
  };

  return (
    <div className='sm:max-w-[80%] mx-auto'>
      <Heading
        customClasses='w-full my-6 px-2'
        title='Profile'
        description='Manage your account settings'
      />
      <ScrollArea className='h-[calc(100vh-177px)] w-full px-2'>
        <div className='w-full'>
          <h4 className='text-xl text-muted-foreground'>Account details</h4>
          <ul>
            <li className={getEllipsed}>
              <span className='text-muted-foreground'>Email:</span>{' '}
              {session.user?.email}
            </li>
            <li className={getEllipsed}>
              <span className='text-muted-foreground'>Role:</span>{' '}
              {capitalizeFirstLetter(session.user?.role ?? '')}
            </li>
            <li className={getEllipsed}>
              <span className='text-muted-foreground'>Available scopes:</span>{' '}
              {availableScopes(session)}
            </li>
          </ul>
        </div>
        <ProfileAccordionSection userId={session?.user?.id ?? ''} />
        <div className='my-4'>Admin section</div>
        {/* 
          TODO: Add an input to search for users by email to change 
          their role, scopes and status (maybe after searching for the user
          it might open the accordion with the options to be changed).
          The user must be searched by a concrete email, not a part of it
        */}
      </ScrollArea>
    </div>
  );
}
