'use client';

import { AccordionBlock } from '@/components/accordion/accordion-block';
import { AccordionData } from '@/types/accordion';
import { useCallback, useMemo, useState } from 'react';
import { ChangePasswordBlock } from './change-password-block';
import { AdminBlock } from './admin-block';

interface AccordionSectionProps {
  userId: string;
}

export const ProfileAccordionSection = ({ userId }: AccordionSectionProps) => {
  const [accordionValue, setAccordionValue] = useState<string>('');

  const resetAccordion = useCallback(
    () => setAccordionValue(''),
    [setAccordionValue]
  );

  const accordionData: AccordionData[] = useMemo(
    () => [
      {
        key: 'change-password',
        title: 'Change Password',
        data: (
          <div className='max-w-sm py-4 mx-auto'>
            <p>Change password</p>
            <ChangePasswordBlock
              userId={userId}
              resetAccordion={resetAccordion}
            />
          </div>
        ),
      },
      {
        key: 'admin-section',
        title: 'Admin section',
        data: (
          <div className='max-w-sm py-4 mx-auto'>
            <p>Admin section</p>
            <AdminBlock />
            {/* 
              TODO: Add an input to search for users by email to change 
              their role, scopes and status (maybe after searching for the user
              it might open the accordion with the options to be changed).
              The user must be searched by a concrete email, not a part of it!
            */}
          </div>
        ),
      },
    ],
    [resetAccordion, userId]
  );

  return (
    <AccordionBlock
      accordionData={accordionData}
      accordionValue={accordionValue}
      onAccordionChange={(e) => setAccordionValue(e)}
    />
  );
};
