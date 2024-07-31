'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UploadFormSchema, UploadFormValue } from '@/schema/upload-form-schema';
import { BucketItemFromList } from 'minio';
import { toast } from '@/components/ui/use-toast';
import { BucketComboboxField } from './bucket-combobox-field';
import { InputFileBlock } from './input-file-block';
import { type FilePondInitialFile } from 'filepond';
import { FilePond } from 'react-filepond';
import { URL_PROCESS_FILE } from '@/utils/const';

const defaultValues = {
  bucket: '',
  files: [],
};

type Props = {
  bucketOptions: BucketItemFromList[] | undefined;
};

export const UploadForm = ({ bucketOptions }: Props) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<Array<FilePondInitialFile | File | Blob>>(
    []
  );
  const inputFileRef = useRef<FilePond>(null);

  const form = useForm<UploadFormValue>({
    resolver: zodResolver(UploadFormSchema),
    defaultValues,
  });

  const selectedBucket = form.watch('bucket');
  const processFileUrl = useMemo(
    () => `${URL_PROCESS_FILE}?bucket=${encodeURIComponent(selectedBucket)}`,
    [selectedBucket]
  );

  // TODO: Pass a setter to know the name and url of uploaded files and show them in the UI
  // TODO: Reset the bucket and files values of the form/setter
  const onSubmit = useCallback(
    async (data: UploadFormValue) => {
      setLoading(true);
      if (inputFileRef.current) {
        await inputFileRef.current.processFiles();
      }
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      setLoading(false);
    },
    [inputFileRef, setLoading]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-10 px-2'
      >
        <BucketComboboxField bucketOptions={bucketOptions} form={form} />
        <Controller
          name='files'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? 'text-destructive' : ''}>
                Files
              </FormLabel>
              <FormControl>
                <InputFileBlock
                  files={files}
                  setFiles={(newFiles) => {
                    setFiles(newFiles);
                    field.onChange(newFiles);
                  }}
                  inputFileRef={inputFileRef}
                  fileEndpoint={processFileUrl}
                />
              </FormControl>
              <FormDescription>Upload your files</FormDescription>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button disabled={loading} className='w-full !mt-6' type='submit'>
          Upload
        </Button>
      </form>
    </Form>
  );
};
