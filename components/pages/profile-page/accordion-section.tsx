'use client';

import { AccordionBlock } from '@/components/accordion/accordion-block';
import { AccordionData } from '@/types/accordion';
import { useCallback, useMemo, useState } from 'react';
import { ChangePasswordBlock } from './change-password-block';

interface AccordionSectionProps {
  userId: string;
}

export const AccordionSection = ({ userId }: AccordionSectionProps) => {
  const [accordionValue, setAccordionValue] = useState<string>('');

  const resetAccordion = useCallback(
    () => setAccordionValue(''),
    [setAccordionValue]
  );

  // TODO: Finish accordion
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
        key: 'change-password2',
        title: 'Change Password2',
        data: (
          <div className='max-w-sm py-4 mx-auto'>
            <p>Whatevah</p>
          </div>
        ),
      },
    ],
    [resetAccordion]
  );

  return (
    <AccordionBlock
      accordionData={accordionData}
      accordionValue={accordionValue}
      onAccordionChange={(e) => setAccordionValue(e)}
    />
  );
};
