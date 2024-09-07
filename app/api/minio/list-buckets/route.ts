import { NextResponse } from 'next/server';
import { listAllBuckets } from '@/services/minio/list-all-buckets';

export const GET = async () => {
  try {
    const buckets = await listAllBuckets();
    if (!buckets) throw new Error();

    return NextResponse.json({ ok: true, buckets }, { status: 200 });
  } catch (err) {
    console.error('Error retrieving the buckets:', err);
    return NextResponse.json(
      { ok: false, error: 'Error retrieving the buckets list' },
      { status: 500 }
    );
  }
};
