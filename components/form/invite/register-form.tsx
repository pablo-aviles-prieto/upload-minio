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
import { UserStatus, type UserRole } from '@/types';
import {
  DEFAULT_CALLBACK_URL,
  errorMessages,
  ThemeOptions,
  URL_REGISTER_USER,
} from '@/utils/const';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ShowPasswordBlock } from '../auth/show-password-block';
import { useToast } from '@/components/ui/use-toast';
import { useFetch } from '@/hooks/use-fetch';
import {
  RegisterFormUserSchema,
  RegisterFormUserValue,
} from '@/schema/register-form-user-schema';
import { User } from '@/models';
import { Icons } from '@/components/icons/icons';

interface RegisterFormProps {
  email: string;
  role: UserRole;
  scopes: string[];
}

interface ResponseUser {
  ok: boolean;
  error?: string;
  createdUser?: User;
}

export const RegisterForm = ({ email, role, scopes }: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { fetchPetition } = useFetch();
  const router = useRouter();

  const defaultValues = {
    email,
    password: '',
    confirmPassword: '',
    role,
    scopes,
    status: UserStatus.ACTIVE,
    theme: ThemeOptions.SYSTEM,
  };

  const form = useForm<RegisterFormUserValue>({
    resolver: zodResolver(RegisterFormUserSchema),
    defaultValues,
  });

  const { trigger } = form;

  const onSubmit = async (data: RegisterFormUserValue) => {
    setLoading(true);
    const { update, id: toastId } = toast({
      title: 'Signing up...',
      description: 'Please wait while we create your account.',
      variant: 'default',
    });
    const displayRegisterErrorToast = (errorDescription: string) => {
      update({
        id: toastId,
        title: 'Signup Failed',
        description: errorDescription,
        variant: 'destructive',
      });
    };
    const parsedData = {
      email: data.email,
      password: data.password,
      role: data.role,
      scopes: data.scopes,
      status: data.status,
      theme: data.theme,
    };
    try {
      const registerResponse = await fetchPetition<ResponseUser>({
        url: URL_REGISTER_USER,
        method: 'POST',
        body: parsedData,
      });
      if (!registerResponse.ok) {
        displayRegisterErrorToast(
          registerResponse.error ?? errorMessages.generic
        );
        setLoading(false);
        return;
      }

      const loginResponse = await signIn('user-pw', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (loginResponse?.ok && registerResponse.createdUser) {
        update({
          id: toastId,
          title: '✅ Signup Successful',
          description: `Your email ${registerResponse.createdUser.email} has been registered`,
          variant: 'success',
        });
        router.push(DEFAULT_CALLBACK_URL);
      } else {
        displayRegisterErrorToast(
          registerResponse.error ?? errorMessages.generic
        );
      }
    } catch (err) {
      const errorString =
        err instanceof Error ? err.message : errorMessages.generic;
      displayRegisterErrorToast(errorString);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    disabled={loading}
                    {...field}
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
                    disabled={loading}
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
        <Button disabled={loading} className='w-full !mt-4' type='submit'>
          <Icons.userPlus className='mr-1 w-4 h-4' /> Register
        </Button>
      </form>
    </Form>
  );
};
