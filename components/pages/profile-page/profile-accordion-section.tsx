'use client';

import { AccordionBlock } from '@/components/accordion/accordion-block';
import { AccordionData, CustomSession, UserRole } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { ChangePasswordBlock } from './change-password-block';
import { AdminBlock } from './admin-block';

interface AccordionSectionProps {
  user: CustomSession['user'] | undefined;
  protectedUserMail: string;
}

export const ProfileAccordionSection = ({
  user,
  protectedUserMail,
}: AccordionSectionProps) => {
  const [accordionValue, setAccordionValue] = useState<string>('');

  const resetAccordion = useCallback(
    () => setAccordionValue(''),
    [setAccordionValue]
  );

  const isAdmin = useMemo(() => user?.role === UserRole.ADMIN, [user]);

  const accordionData: AccordionData[] = useMemo(() => {
    // Base accordion item for users
    const baseItems: AccordionData[] = [
      {
        key: 'change-password',
        title: 'Change Password',
        data: (
          <div className='max-w-sm py-4 mx-auto'>
            <p>Change password</p>
            <ChangePasswordBlock
              userId={user?.id ?? ''}
              resetAccordion={resetAccordion}
            />
          </div>
        ),
      },
    ];

    // Admin-specific accordion item
    const adminItems: AccordionData[] = isAdmin
      ? [
          {
            key: 'admin-section',
            title: 'Admin section',
            data: (
              <div className='w-full py-4 mx-auto'>
                <p>Search for a user to update their details</p>
                <AdminBlock
                  loggedUser={user}
                  protectedUserMail={protectedUserMail}
                  resetAccordion={resetAccordion}
                />
              </div>
            ),
          },
        ]
      : [];

    return [...baseItems, ...adminItems];
  }, [resetAccordion, user, isAdmin]);

  return (
    <AccordionBlock
      accordionData={accordionData}
      accordionValue={accordionValue}
      onAccordionChange={(e) => setAccordionValue(e)}
    />
  );
};
