import { UserRole, UserStatus } from '@/types';
import { ThemeOptions } from '@/utils/const';
import { z } from 'zod';

export const RegisterFormUserSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/, { message: 'Password must include a lowercase letter' })
      .regex(/[A-Z]/, { message: 'Password must include an uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must include a number' })
      .regex(/[\W_]+/, { message: 'Password must include a symbol' }),
    confirmPassword: z.string(),
    role: z.nativeEnum(UserRole).optional(),
    scopes: z.array(z.string()).optional(),
    status: z.nativeEnum(UserStatus).optional(),
    theme: z.nativeEnum(ThemeOptions).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ['confirmPassword'],
  });

export type RegisterFormUserValue = z.infer<typeof RegisterFormUserSchema>;

export const RegisterAPIUserSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Password must include a lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must include an uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must include a number' })
    .regex(/[\W_]+/, { message: 'Password must include a symbol' }),
  role: z.nativeEnum(UserRole).optional(),
  scopes: z.array(z.string()).optional(),
  theme: z.nativeEnum(ThemeOptions).optional(),
  status: z.nativeEnum(UserStatus).optional(),
});

export type RegisterAPIUserValue = z.infer<typeof RegisterAPIUserSchema>;
