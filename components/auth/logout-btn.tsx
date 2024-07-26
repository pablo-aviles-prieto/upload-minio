'use client';

import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

export const LogoutBtn = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};
