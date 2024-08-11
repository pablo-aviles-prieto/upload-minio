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
import { useToast } from '@/components/ui/use-toast';
import { BucketComboboxField } from './bucket-combobox-field';
import { InputFileBlock } from './input-file-block';
import { type FilePondInitialFile } from 'filepond';
import { FilePond } from 'react-filepond';
import { errorMessages, FILE_MAX_SIZE, URL_PROCESS_FILE } from '@/utils/const';
import { UserRole, type CustomSession, type UploadedFiles } from '@/types';
import { Icons } from '@/components/icons/icons';
import { UploadedFilesCard } from '@/components/cards/uploaded-files-card';
import { parseBucketOptions } from '@/utils/parse-bucket-options';

const defaultValues = {
  bucket: '',
  files: [],
};

interface UploadFormProps {
  bucketOptions: BucketItemFromList[] | undefined;
  userData: CustomSession['user'];
}

export const UploadForm = ({ bucketOptions, userData }: UploadFormProps) => {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles[]>([]);
  const [files, setFiles] = useState<Array<FilePondInitialFile | File | Blob>>(
    []
  );
  const inputFileRef = useRef<FilePond>(null);
  const { toast } = useToast();

  const form = useForm<UploadFormValue>({
    resolver: zodResolver(UploadFormSchema),
    defaultValues,
  });

  const parsedBucketOptions = parseBucketOptions({
    bucketOptions: bucketOptions ?? [],
    scopes: userData?.scopes ?? [],
    role: userData?.role ?? UserRole.TRIAL,
  });

  const formFiles = form.watch('files'); // Watch for changes in files
  const selectedBucket = form.watch('bucket');
  const processFileUrl = useMemo(
    () => `${URL_PROCESS_FILE}?bucket=${encodeURIComponent(selectedBucket)}`,
    [selectedBucket]
  );

  const uploadNewFilesHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setFiles([]);
      setUploadedFiles([]);
      // TODO: Instead of resetting, navigate to the file page passing the bucket to see the files?
      form.reset(defaultValues, {
        keepTouched: false,
        keepDirty: false,
        keepErrors: false,
        keepValues: false,
        keepIsSubmitted: false,
        keepIsValid: false,
        keepSubmitCount: false,
      });
    },
    [setFiles, setUploadedFiles, form]
  );

  const submitHandler = useCallback(
    async (data: UploadFormValue) => {
      setLoading(true);

      const oversizedFiles = formFiles.filter((file) => {
        if (file instanceof File) {
          return file.size > FILE_MAX_SIZE;
        }
        return false;
      });

      if (oversizedFiles.length > 0) {
        toast({
          title: errorMessages.genericFileErrorTitle,
          description: `One or more files exceed the size limit of 10MB.`,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (inputFileRef.current) {
        await inputFileRef.current.processFiles();
      }

      toast({
        title: 'Files successfully uploaded',
        description: `You can see the details of the ${data.files.length} file(s) uploaded`,
        variant: 'success',
      });
      setLoading(false);
    },
    [inputFileRef, setLoading, toast, formFiles]
  );

  return (
    <>
      {uploadedFiles.length > 0 && (
        <div className='w-full'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            {uploadedFiles.map((file) => (
              <li key={file.name}>
                <UploadedFilesCard
                  key={file.name}
                  fileName={file.name}
                  fileUrl={file.url}
                  fileSize={file.size}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className='w-full space-y-6'
        >
          <BucketComboboxField
            bucketOptions={parsedBucketOptions}
            form={form}
          />
          <Controller
            name='files'
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={fieldState.error ? 'text-destructive' : ''}
                >
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
                    setUploadedFiles={setUploadedFiles}
                  />
                </FormControl>
                <FormDescription>Upload your files</FormDescription>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          {uploadedFiles.length > 0 ? (
            <Button
              disabled={loading}
              className='w-full !mt-6'
              type='button'
              onClick={uploadNewFilesHandler}
            >
              <Icons.fileUp className='mr-1 w-5 h-5' /> Upload new files
            </Button>
          ) : (
            <Button disabled={loading} className='w-full !mt-6' type='submit'>
              <Icons.cloudUpload className='mr-1 w-5 h-5' /> Upload
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
