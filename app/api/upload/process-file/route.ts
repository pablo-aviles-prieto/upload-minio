import { errorMessages } from '@/utils/const';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { retrieveMinioClient } from '@/lib/minio-client';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const files: File[] = formData.getAll('files') as File[];
  const selectedBucket = req.nextUrl.searchParams.get('bucket');

  if (!selectedBucket) {
    return NextResponse.json(
      { ok: false, error: errorMessages.bucketNotSpecified },
      { status: 400 }
    );
  }

  const validFiles = files.filter(
    (file) =>
      file &&
      typeof file === 'object' &&
      'size' in file &&
      'type' in file &&
      'name' in file &&
      'lastModified' in file
  );

  try {
    const minioClient = retrieveMinioClient();

    const uploadedFiles = await Promise.all(
      validFiles.map(async (file) => {
        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);
        const fileName = `${uuidv4()}-${file.name}`;
        await minioClient.putObject(
          selectedBucket,
          fileName,
          buffer,
          buffer.length,
          { 'Content-Type': file.type }
        );

        const presignedUrl = await minioClient.presignedGetObject(
          selectedBucket,
          fileName,
          24 * 60 * 60
        ); // URL valid for 24 hours
        return {
          name: file.name,
          url: presignedUrl,
        };
      })
    );

    return NextResponse.json({ ok: true, uploadedFiles }, { status: 200 });
  } catch (error) {
    console.error('Error uploading files to Minio:', error);
    return NextResponse.json(
      { ok: false, error: 'Error uploading files' },
      { status: 500 }
    );
  }

  // console.log('validFiles', validFiles);
  // console.log('selectedBucket', selectedBucket);

  // // TODO: Upload the file to the selected bucket in minio, and return a generated uuid???
  // return NextResponse.json({ ok: true, files: validFiles }, { status: 200 });
};

export const DELETE = async (req: NextRequest) => {
  const fileName = req.nextUrl.searchParams.get('file');

  if (!fileName) {
    return NextResponse.json(
      { ok: false, error: 'File name not provided' },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, fileName }, { status: 200 });
};
