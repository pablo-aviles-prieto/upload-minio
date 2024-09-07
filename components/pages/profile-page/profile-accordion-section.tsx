'use client';

import { AccordionBlock } from '@/components/accordion/accordion-block';
import { AccordionData } from '@/types';
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
          <div className='w-full py-4 mx-auto'>
            <p>Search for a user to update their details</p>
            <AdminBlock />
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
