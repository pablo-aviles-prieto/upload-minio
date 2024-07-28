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

interface ComboboxFieldProps {
  bucketOptions: BucketItemFromList[] | undefined;
  form: UseFormReturn<any, any, undefined>;
}

const WIDTH = 'w-[36rem]';

export const BucketComboboxField = ({
  bucketOptions,
  form,
}: ComboboxFieldProps) => {
  return (
    <FormField
      control={form.control}
      name='bucket'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Bucket</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    `${WIDTH} justify-between`,
                    !field.value && 'text-muted-foreground'
                  )}
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
            <PopoverContent className={`${WIDTH} p-0`}>
              <Command>
                <CommandInput
                  placeholder='Search framework...'
                  className='h-9'
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {bucketOptions?.map((bucket) => (
                      <CommandItem
                        value={bucket.name}
                        key={bucket.name}
                        onSelect={() => {
                          form.setValue('bucket', bucket.name);
                        }}
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
