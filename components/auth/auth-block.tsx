'use client';

import { useSearchParams } from 'next/navigation';
import { LoginForm } from '../form/login-form';
import { DEFAULT_CALLBACK_URL } from '@/utils/const';
import { ForgotPasswordModal } from '../modal/forgot-password-modal';
import { useState } from 'react';

export const AuthBlock = () => {
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <>
      <ForgotPasswordModal
        isOpen={openForgotPasswordModal}
        onClose={() => setOpenForgotPasswordModal(false)}
      />
      <div className='max-w-sm mx-auto'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Access to your account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your credentials below to login
          </p>
        </div>
        <LoginForm
          callbackUrl={callbackUrl ?? DEFAULT_CALLBACK_URL}
          setOpenForgotPasswordModal={setOpenForgotPasswordModal}
        />
      </div>
    </>
  );
};
