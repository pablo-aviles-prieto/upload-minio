export const errorMessages = {
  authorizedResource: 'Not Authorized for this resource',
  createUser: 'Error creating the user',
  credentials: 'Check the credentials provided',
  generic: 'Something went wrong. Try again later',
} as const;

export const DEFAULT_CALLBACK_URL = '/home';
export const URL_RECOVER_PASSWORD = `/api/auth/recover-password`;
