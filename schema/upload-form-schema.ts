import { z } from 'zod';

export const UploadFormSchema = z.object({
  bucket: z.string({
    required_error: 'Please select a bucket',
  }),
});

export type UploadFormValue = z.infer<typeof UploadFormSchema>;
