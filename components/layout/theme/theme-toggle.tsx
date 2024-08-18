'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';
import { useSession } from 'next-auth/react';
import type { CustomSession, UpdateUserPreferencesResponse } from '@/types';
import { useEffect } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { useToast } from '@/components/ui/use-toast';
import { ThemeOptions, URL_CHANGE_PREFERENCES } from '@/utils/const';
import { getValuesFromEnum } from '@/utils/get-values-from-enum';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { data, update } = useSession();
  const session = data as CustomSession;
  const { fetchPetition } = useFetch();
  const { toast } = useToast();

  const themeOptions = getValuesFromEnum(ThemeOptions);

  useEffect(() => {
    if (session?.user?.theme) {
      setTheme(session.user.theme);
    }
  }, [session]);

  const changeTheme = async (themeName: string) => {
    setTheme(themeName);
    await update({ theme: themeName });
    const response = await fetchPetition<UpdateUserPreferencesResponse>({
      method: 'POST',
      url: URL_CHANGE_PREFERENCES,
      body: { theme: themeName },
    });
    if (response.error) {
      toast({
        title: 'Error updating preferences',
        description: response.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {themeOptions.map((themeOpt) => (
          <DropdownMenuItem
            key={themeOpt.key}
            onClick={() => changeTheme(themeOpt.key)}
          >
            {capitalizeFirstLetter(themeOpt.key)}{' '}
            {theme === themeOpt.key && (
              <Check className='w-[22px] h-[22px] pl-2' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
