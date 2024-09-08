import { UserRole, UserStatus } from '@/types';
import { z } from 'zod';

export const EditUserFormSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    role: z
      .nativeEnum(UserRole)
      .refine((value) => Object.values(UserRole).includes(value), {
        message: 'Select a valid role',
      }),
    buckets: z.array(z.string()).optional(),
    status: z
      .nativeEnum(UserStatus)
      .refine((value) => Object.values(UserStatus).includes(value), {
        message: 'Select a valid status',
      }),
  })
  // Will throw the error if the function returns false
  .refine(
    (data) =>
      data.role === UserRole.ADMIN || (data.buckets && data.buckets.length > 0),
    {
      message: 'At least one bucket is required unless for ADMIN users',
      path: ['buckets'],
    }
  );

export type EditUserFormValue = z.infer<typeof EditUserFormSchema>;
