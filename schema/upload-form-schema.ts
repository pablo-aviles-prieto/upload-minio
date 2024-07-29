import { z } from 'zod';

export const UploadFormSchema = z.object({
  bucket: z.string().min(1, {
    message: 'Please select a bucket',
  }),
  name: z.string().min(1, { message: 'Name is required' }),
});

export type UploadFormValue = z.infer<typeof UploadFormSchema>;
