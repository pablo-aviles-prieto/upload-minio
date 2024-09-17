'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { HeaderOptions } from './header-options';
import { type CustomSession } from '@/types';
import { Button } from '@/components/ui/button';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  session: CustomSession;
}

export function MobileSidebar({ session }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon'>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side='right' className='!px-0'>
          <SheetDescription className='sr-only'>
            Mobile side drawer
          </SheetDescription>
          <div className='py-4 space-y-4'>
            <div className='px-3 py-2'>
              <div className='inline-flex flex-col gap-y-3'>
                <HeaderOptions session={session} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
