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
import { Icons } from '@/components/icons/icons';
import {
  ForgotPasswordFormSchema,
  ForgotPasswordFormValue,
} from '@/schema/forgot-password-schema';

const defaultValues = {
  email: '',
};

type Props = {
  onSubmit: (data: ForgotPasswordFormValue) => Promise<void>;
  isSendingMail: boolean;
};

export const ForgotPasswordForm = ({ onSubmit, isSendingMail }: Props) => {
  const form = useForm<ForgotPasswordFormValue>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues,
  });

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
                  disabled={isSendingMail}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSendingMail} className='w-full !mt-0' type='submit'>
          {isSendingMail && <Icons.clockLoader className='mr-2 w-4 h-4' />}
          {isSendingMail ? 'Sending' : 'Send'} recovery email
        </Button>
      </form>
    </Form>
  );
};
