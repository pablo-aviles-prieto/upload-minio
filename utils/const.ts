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
  fileSizeExceeded: 'File size exceeds the maximum allowed limit (10MB)',
  genericFileErrorTitle: 'There was an error uploading the file',
  tryAgain: `Please, try again later`,
  inviteUser: 'There was an error inviting the user. Try again later',
  registerTokenExpired: 'The invitation link has expired',
  relogAcc: 'Something happened, please relog into your account',
  updatingTheme:
    'There was an error updating the theme on database. Try again later',
} as const;

export const DEFAULT_CALLBACK_URL = '/home';
export const URL_RECOVER_PASSWORD = `/api/auth/recover-password`;
export const URL_INVITE_USER = `/api/invite`;
export const URL_REGISTER_USER = `/api/auth/register`;
export const URL_PROCESS_FILE = `/api/minio/upload/process-file`;
export const URL_LIST_FILES = `/api/minio/list-files`;
export const URL_CHANGE_PREFERENCES = `/api/user/change-preferences`;

export const ACCESS_TO_ALL_SCOPES = 'All';

export enum ThemeOptions {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

// TODO: Add icons to the header opts
export const HEADER_OPTIONS = [
  { key: 'home', label: 'Home', icon: '', href: '/home' },
  { key: 'upload', label: 'Upload', icon: '', href: '/home/upload' },
  { key: 'files', label: 'Files', icon: '', href: '/home/files' },
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

export const FILE_MAX_SIZE = 10 * 1024 * 1024; // 10MB

export const HEADER_HEIGHT = '64px';

export const IMAGE_EXTENSIONS = [
  'bmp',
  'gif',
  'jpeg',
  'JPEG',
  'jpg',
  'JPG',
  'png',
  'svg',
  'tif',
  'tiff',
];
