'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadFormSchema, UploadFormValue } from '@/schema/upload-form-schema';
import { BucketItemFromList } from 'minio';
import { toast } from '@/components/ui/use-toast';
import { BucketComboboxField } from './bucket-combobox-field';

const defaultValues = {
  bucket: '',
};

type Props = {
  bucketOptions: BucketItemFromList[] | undefined;
};

export const UploadForm = ({ bucketOptions }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<UploadFormValue>({
    resolver: zodResolver(UploadFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: UploadFormValue) => {
    console.log('data', data);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <BucketComboboxField bucketOptions={bucketOptions} form={form} />
        <Button disabled={loading} className='w-full !mt-6' type='submit'>
          Upload
        </Button>
      </form>
    </Form>
  );
};
