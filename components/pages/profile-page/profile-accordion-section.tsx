'use client';

import { AccordionBlock } from '@/components/accordion/accordion-block';
import { AccordionData } from '@/types/accordion';
import { useCallback, useMemo, useState } from 'react';
import { ChangePasswordBlock } from './change-password-block';

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
