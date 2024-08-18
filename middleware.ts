export { default } from 'next-auth/middleware';

// TODO: Change this middleware to a custom one so the user
// only access to the /home/paths... if the status is active
export const config = { matcher: ['/home/:path*'] };
