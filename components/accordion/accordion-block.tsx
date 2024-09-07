import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { AccordionData } from '@/types';

interface AccordionBlockProps {
  accordionData: AccordionData[];
  accordionValue: string;
  onAccordionChange: (value: string) => void;
}

export const AccordionBlock = ({
  accordionData,
  accordionValue,
  onAccordionChange,
}: AccordionBlockProps) => {
  return (
    <Accordion
      onValueChange={onAccordionChange}
      type='single'
      collapsible
      className='w-full'
      value={accordionValue}
    >
      {accordionData.map((accordion) => (
        <AccordionItem key={accordion.key} value={accordion.key}>
          <AccordionTrigger>{accordion.title}</AccordionTrigger>
          <AccordionContent>{accordion.data}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
