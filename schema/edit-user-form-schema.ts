import { UserRole, UserStatus } from '@/types';
import { z } from 'zod';

export const EditUserFormSchema = z.object({
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
});

export type EditUserFormValue = z.infer<typeof EditUserFormSchema>;
