// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { type CustomSession, UserStatus } from './types';
import { HEADER_OPTIONS } from './utils/const';

const secret = process.env.NEXTAUTH_SECRET;

// This middleware only runs for the paths matching the config.matcher
export async function middleware(request: NextRequest) {
  const session = (await getToken({
    req: request,
    secret,
  })) as unknown as CustomSession['user'];

  const url = request.nextUrl.clone();

  // Redirecting unauthed users
  if (!session) {
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // Redirecting inactive users
  if (
    session.status === UserStatus.INACTIVE ||
    session.status === UserStatus.SUSPENDED
  ) {
    url.pathname = '/inactive-user';
    return NextResponse.redirect(url);
  }

  // Redirecting users from entry page to home page
  if (url.pathname === '/') {
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  // Redirecting users without role access if proceeds
  const accessRoles = HEADER_OPTIONS.find(
    (headerOpt) => headerOpt.href === url.pathname
  )?.roleAccess;
  if (accessRoles && !accessRoles.includes(session.role)) {
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ['/', '/home/:path*'] };
