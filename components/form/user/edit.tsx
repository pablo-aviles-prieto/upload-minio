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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  EditUserFormSchema,
  EditUserFormValue,
} from '@/schema/edit-user-form-schema';
import { User } from '@/models';
import { UserRole, UserStatus } from '@/types';
import { ACCESS_TO_ALL_SCOPES } from '@/utils/const';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { MultipleBucketComboboxField } from '../invite/multiple-bucket-combobox-field';
import { BucketItemFromList } from 'minio';
import { useMemo } from 'react';

type Props = {
  onSubmit: (data: EditUserFormValue) => Promise<void>;
  isEditingUser: boolean;
  userData: User;
  bucketOptions: BucketItemFromList[] | undefined;
};

export const EditUserForm = ({
  onSubmit,
  isEditingUser,
  userData,
  bucketOptions,
}: Props) => {
  // TODO: Ensure that the buckets have the correct scopes assigned
  const defaultValues = {
    email: userData.email,
    role: userData.role,
    buckets: userData.scopes,
    status: userData.status,
  };

  const form = useForm<EditUserFormValue>({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues,
  });

  const role = form.watch('role');

  const parsedBucketOptions = useMemo(() => {
    if (!bucketOptions) return [];
    return [
      { name: ACCESS_TO_ALL_SCOPES, creationDate: new Date() },
      ...bucketOptions,
    ];
  }, [bucketOptions]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full !space-y-2 px-1'
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
                  disabled
                  {...field}
                />
              </FormControl>
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
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value === UserRole.ADMIN) {
                    form.setValue('buckets', [ACCESS_TO_ALL_SCOPES]);
                  }
                }}
                defaultValue={field.value}
                disabled={isEditingUser}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <MultipleBucketComboboxField
          bucketOptions={parsedBucketOptions}
          form={form}
          disabled={role === UserRole.ADMIN || isEditingUser}
        />
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isEditingUser}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select the status of the user' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(UserStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {capitalizeFirstLetter(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            disabled={isEditingUser}
            className='w-full mt-2'
            type='submit'
          >
            {isEditingUser ? 'Editing' : 'Edit'} user
          </Button>
        </div>
      </form>
    </Form>
  );
};
