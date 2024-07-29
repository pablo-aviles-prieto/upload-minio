'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BucketItemFromList } from 'minio';
import { useState, useEffect, useRef, useCallback } from 'react';

interface ComboboxFieldProps {
  bucketOptions: BucketItemFromList[] | undefined;
  form: UseFormReturn<any, any, undefined>;
}

const WIDTH = 'w-full';

export const BucketComboboxField = ({
  bucketOptions,
  form,
}: ComboboxFieldProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState<string>('auto');
  const triggerRef = useRef<HTMLButtonElement>(null);

  const updatePopoverWidth = useCallback(() => {
    if (triggerRef.current) {
      setPopoverWidth(`${triggerRef.current.offsetWidth}px`);
    }
  }, [triggerRef.current]);

  useEffect(() => {
    updatePopoverWidth();
    window.addEventListener('resize', updatePopoverWidth);
    return () => {
      window.removeEventListener('resize', updatePopoverWidth);
    };
  }, [updatePopoverWidth]);

  const handleSelect = (bucketName: string) => {
    form.setValue('bucket', bucketName);
    setPopoverOpen(false);
  };

  return (
    <FormField
      control={form.control}
      name='bucket'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Bucket</FormLabel>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    `${WIDTH} justify-between`,
                    !field.value && 'text-muted-foreground'
                  )}
                  ref={triggerRef}
                >
                  {field.value
                    ? bucketOptions?.find(
                        (bucket) => bucket.name === field.value
                      )?.name
                    : 'Select bucket'}
                  <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent style={{ width: popoverWidth }} className='p-0'>
              <Command>
                <CommandInput placeholder='Search bucket...' className='h-9' />
                <CommandList>
                  <CommandEmpty>No bucket found.</CommandEmpty>
                  <CommandGroup>
                    {bucketOptions?.map((bucket) => (
                      <CommandItem
                        value={bucket.name}
                        key={bucket.name}
                        onSelect={() => handleSelect(bucket.name)}
                      >
                        {bucket.name}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            bucket.name === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            Select the bucket where the file will be uploaded
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
