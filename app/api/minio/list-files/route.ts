import { retrieveMinioClient } from '@/lib/minio-client';
import { errorMessages } from '@/utils/const';
import { NextRequest, NextResponse } from 'next/server';
import { BucketItem, BucketStream } from 'minio';

async function* minioToIterator(stream: BucketStream<BucketItem>) {
  for await (const obj of stream) {
    yield new TextEncoder().encode(JSON.stringify(obj) + '\n');
  }
}

export const GET = async (req: NextRequest) => {
  const bucketName = req.nextUrl.searchParams.get('bucketName');

  if (!bucketName) {
    return NextResponse.json(
      { ok: false, error: errorMessages.bucketNotSpecified },
      { status: 400 }
    );
  }

  try {
    const minioClient = retrieveMinioClient();
    const stream = minioClient.listObjectsV2(bucketName, '', true, '');

    const iterator = minioToIterator(stream);
    const readableStream = new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next();

        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    console.error('Error uploading files to Minio:', err);
    return NextResponse.json(
      { ok: false, error: 'Error retrieving the files from the bucket' },
      { status: 500 }
    );
  }
};
