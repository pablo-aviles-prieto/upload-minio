'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BucketItemFromList } from 'minio';
import { useToast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';
import { InviteFormSchema, InviteFormValue } from '@/schema/invite-form-schema';
import { UserRole } from '@/types';
import { MultipleBucketComboboxField } from './multiple-bucket-combobox-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { Input } from '@/components/ui/input';

const defaultValues = {
  buckets: [],
  email: '',
  role: UserRole.USER,
};

interface UploadFormProps {
  bucketOptions: BucketItemFromList[] | undefined;
}

export const InviteForm = ({ bucketOptions }: UploadFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<InviteFormValue>({
    resolver: zodResolver(InviteFormSchema),
    defaultValues,
  });

  const submitHandler = useCallback(
    async (data: InviteFormValue) => {
      setLoading(true);
      console.log('data', data);

      setLoading(false);
    },
    [setLoading]
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className='w-full space-y-6'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email...'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The email that will receive the invite
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(UserRole).map((role) => (
                      <SelectItem key={role} value={role}>
                        {capitalizeFirstLetter(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Which role will be assign to the new user
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <MultipleBucketComboboxField
            bucketOptions={bucketOptions}
            form={form}
          />
          <Button disabled={loading} className='w-full !mt-6' type='submit'>
            <Icons.userPlus className='mr-1 w-4 h-4' /> Invite
          </Button>
        </form>
      </Form>
    </>
  );
};
