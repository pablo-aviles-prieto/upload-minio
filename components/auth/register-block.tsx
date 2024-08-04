'use client';

import { type DecodedRegisterJWT } from '@/services/user/tokens';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '../ui/use-toast';
import { RegisterForm } from '../form/invite/register-form';
import { ScrollArea } from '../ui/scroll-area';

interface RegisterUserBlockProps {
  decodedToken: { data?: DecodedRegisterJWT; errorMessage: string | null };
}

export const RegisterUserBlock = ({ decodedToken }: RegisterUserBlockProps) => {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (decodedToken.errorMessage) {
      toast({
        title: 'Invalid token',
        variant: 'destructive',
        description: decodedToken.errorMessage,
      });
      router.push('/auth');
    }
  }, [decodedToken]);

  if (decodedToken.errorMessage || !decodedToken.data) return null;

  // TODO: Check the Uploader name
  return (
    <ScrollArea className='h-[100vh] w-full'>
      <div className='flex flex-col items-center justify-center h-screen max-w-sm mx-auto px-2'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            You&apos;ve been invited to Uploader
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter the credentials to register your account
          </p>
        </div>
        <RegisterForm
          email={decodedToken.data.email}
          role={decodedToken.data.role}
          scopes={decodedToken.data.scopes}
        />
      </div>
    </ScrollArea>
  );
};
