import { ProfileAccordionSection } from '@/components/pages/profile-page/profile-accordion-section';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authOptions } from '@/lib/auth-options';
import { CustomSession, UserRole } from '@/types';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { ACCESS_TO_ALL_SCOPES, getEllipsed } from '@/utils/const';
import { getServerSession, NextAuthOptions } from 'next-auth';

const { PROTECTED_USER_EMAIL } = process.env;

export default async function Profile() {
  const session = (await getServerSession(
    authOptions as unknown as NextAuthOptions
  )) as CustomSession;

  const availableScopes = (session: CustomSession) => {
    if (
      session.user?.role === UserRole.ADMIN ||
      session.user?.scopes.includes(ACCESS_TO_ALL_SCOPES)
    ) {
      return `${ACCESS_TO_ALL_SCOPES} buckets`;
    }

    const scopes = session.user?.scopes || [];

    // If there is only one scope, return it directly
    if (scopes.length === 1) {
      return `"${scopes[0]}" bucket`;
    }

    // If there are multiple scopes, format the output with "and" for the last item
    if (scopes.length > 1) {
      const allButLast = scopes
        .slice(0, -1)
        .map((scope) => `"${scope}"`)
        .join(', ');
      const last = `"${scopes[scopes.length - 1]}"`;
      return `${allButLast} and ${last} buckets`;
    }

    // Fallback if no scopes are available
    return 'No available buckets';
  };

  return (
    <div className='sm:max-w-[80%] mx-auto'>
      <Heading
        customClasses='w-full my-6 px-2 pr-4'
        title='Profile'
        description='Manage your account settings'
      />
      <ScrollArea className='h-[calc(100vh-179px)] w-full px-2 pr-4'>
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
              <span className='text-muted-foreground'>Available buckets:</span>{' '}
              {availableScopes(session)}
            </li>
          </ul>
        </div>
        <ProfileAccordionSection
          user={session.user}
          protectedUserMail={PROTECTED_USER_EMAIL ?? ''}
        />
      </ScrollArea>
    </div>
  );
}
