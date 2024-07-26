import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Password must be filled' }),
});

export type LoginUserFormValue = z.infer<typeof LoginUserSchema>;
