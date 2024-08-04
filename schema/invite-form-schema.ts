import { UserRole } from '@/types';
import { z } from 'zod';

export const InviteFormSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  role: z.nativeEnum(UserRole).optional(),
  buckets: z
    .array(z.string())
    .min(1, { message: 'At least one bucket is required' }),
});

export type InviteFormValue = z.infer<typeof InviteFormSchema>;
