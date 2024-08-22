'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordFormSchema,
  ResetPasswordFormValue,
} from '@/schema/reset-password-schema';
import { ShowPasswordBlock } from './show-password-block';
import { useState } from 'react';
import { Icons } from '@/components/icons/icons';

type Props = {
  onSubmit: (data: ResetPasswordFormValue) => Promise<void>;
  isLoading: boolean;
  userId: string;
};

export const ResetPasswordForm = ({ onSubmit, isLoading, userId }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const defaultValues = {
    password: '',
    confirmPassword: '',
    userId,
  };

  const form = useForm<ResetPasswordFormValue>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues,
  });

  const { trigger } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full !space-y-2 px-1'
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password...'
                    disabled={isLoading}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger(field.name);
                    }}
                  />
                  <ShowPasswordBlock
                    showPassword={showPassword}
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm the password...'
                    disabled={isLoading}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger(field.name);
                    }}
                  />
                  <ShowPasswordBlock
                    showPassword={showConfirmPassword}
                    onClick={() =>
                      setShowConfirmPassword((prevState) => !prevState)
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className='w-full !mt-0' type='submit'>
          {isLoading && <Icons.clockLoader className='mr-2 w-4 h-4' />}
          {isLoading ? 'Changing' : 'Change'} password
        </Button>
      </form>
    </Form>
  );
};
