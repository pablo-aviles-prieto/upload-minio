import { CustomError } from '@/errors/custom-error';
import { UserRole } from '@/types';
import { errorMessages } from '@/utils/const';
import { decode, encode } from 'next-auth/jwt';

interface RegisterTokenPayload {
  email: string;
  role: UserRole;
  scopes: string[];
}

export interface DecodedRegisterJWT extends RegisterTokenPayload {
  iat: number;
  exp: number;
  jti: string;
}

export const generateRegisterToken = async (payload: RegisterTokenPayload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret key is not defined');
  }

  return encode({
    token: { ...payload },
    secret,
    maxAge: 3600,
  });
};

export const verifyRegisterToken = async (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret key is not defined');
  }

  try {
    const decodedToken = (await decode({
      token,
      secret,
    })) as unknown as DecodedRegisterJWT;

    // Check if the token has expired
    if (decodedToken && Date.now() >= decodedToken.exp * 1000) {
      throw new CustomError(errorMessages.registerTokenExpired, 401);
    }

    return decodedToken;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('"exp" claim timestamp check failed')
    ) {
      throw new CustomError(errorMessages.registerTokenExpired, 401);
    }
    throw error;
  }
};
