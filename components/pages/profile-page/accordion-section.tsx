'use client';

import { AccordionBlock } from '@/components/accordion/accordion-block';
import { AccordionData } from '@/types/accordion';
import { useState } from 'react';

interface AccordionSectionProps {
  accordionData: AccordionData[];
  userId: string;
}

export const AccordionSection = ({
  accordionData,
  userId,
}: AccordionSectionProps) => {
  const [accordionValue, setAccordionValue] = useState<string>('');

  return (
    <AccordionBlock
      accordionData={accordionData}
      accordionValue={accordionValue}
      onAccordionChange={(e) => setAccordionValue(e)}
      userId={userId}
    />
  );
};
