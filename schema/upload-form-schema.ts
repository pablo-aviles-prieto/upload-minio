import { z } from 'zod';

export const UploadFormSchema = z.object({
  bucket: z.string().min(1, {
    message: 'Please select a bucket',
  }),
  files: z.array(z.any()).min(1, { message: 'At least one file is required' }),
});

export type UploadFormValue = z.infer<typeof UploadFormSchema>;
