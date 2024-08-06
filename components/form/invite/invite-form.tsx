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
import { useCallback, useMemo, useState } from 'react';
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
import { useFetch } from '@/hooks/use-fetch';
import { ACCESS_TO_ALL_SCOPES, URL_INVITE_USER } from '@/utils/const';

const defaultValues = {
  buckets: [],
  email: '',
  role: UserRole.USER,
};

interface UploadFormProps {
  bucketOptions: BucketItemFromList[] | undefined;
}

interface ResponseRegisterMail {
  ok: boolean;
  error?: string;
  message?: string;
}

export const InviteForm = ({ bucketOptions }: UploadFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { fetchPetition } = useFetch();

  const form = useForm<InviteFormValue>({
    resolver: zodResolver(InviteFormSchema),
    defaultValues,
  });

  const parsedBucketOptions = useMemo(() => {
    if (!bucketOptions) return [];
    return [
      { name: ACCESS_TO_ALL_SCOPES, creationDate: new Date() },
      ...bucketOptions,
    ];
  }, [bucketOptions]);

  const submitHandler = useCallback(
    async (data: InviteFormValue) => {
      setLoading(true);
      const { update, id: toastId } = toast({
        title: 'Processing...',
        description: 'Please wait while the data is being processed',
        variant: 'default',
      });
      const response = await fetchPetition<ResponseRegisterMail>({
        url: URL_INVITE_USER,
        method: 'POST',
        body: data,
      });

      if (response.error) {
        update({
          id: toastId,
          title: 'Error registering the user',
          description: response.error,
          variant: 'destructive',
        });
      } else if (response.message) {
        update({
          id: toastId,
          title: 'User registered successfully',
          description: response.message,
          variant: 'success',
        });
      }

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
            bucketOptions={parsedBucketOptions}
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
