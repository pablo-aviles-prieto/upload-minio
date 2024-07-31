import { UserRole } from '@/types';

export const errorMessages = {
  authorizedResource: 'Not Authorized for this resource',
  createUser: 'Error creating the user',
  credentials: 'Check the credentials provided',
  generic: 'Something went wrong. Try again later',
  incorrectData: 'There was an error with the data provided. Try again later',
  registerUser:
    'There was an error registering to the database. Try again later',
  bucketNotSpecified: 'Bucket not specified',
} as const;

export const DEFAULT_CALLBACK_URL = '/home';
export const URL_RECOVER_PASSWORD = `/api/auth/recover-password`;

export enum ThemeOptions {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export const HEADER_OPTIONS = [
  { key: 'home', label: 'Home', icon: '', href: '/home' },
  { key: 'upload', label: 'Upload', icon: '', href: '/home/upload' },
  {
    key: 'invite',
    label: 'Invite',
    icon: '',
    href: '/home/invite',
    roleAccess: [UserRole.ADMIN],
  },
  { key: 'profile', label: 'Profile', icon: '', href: '/home/profile' },
];

export const getEllipsed = 'overflow-hidden text-ellipsis whitespace-nowrap';

export const URL_PROCESS_FILE = `/api/upload/process-file`;
