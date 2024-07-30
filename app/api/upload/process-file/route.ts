import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const formDataEntries = Object.fromEntries(formData);
  const files: File[] = formData.getAll('files') as File[];

  const validFiles = files.filter(
    (file) =>
      file &&
      typeof file === 'object' &&
      'size' in file &&
      'type' in file &&
      'name' in file &&
      'lastModified' in file
  );

  console.log('formDataEntries', formDataEntries);
  console.log('validFiles', validFiles);

  return NextResponse.json({ ok: true, files: validFiles }, { status: 200 });
};

export const DELETE = async (req: NextRequest) => {
  const queryParams = req.nextUrl.searchParams;
  const fileName = queryParams.get('file');
  console.log('queryParams', queryParams);
  console.log('fileName', fileName);

  if (!fileName) {
    return NextResponse.json(
      { ok: false, error: 'File name not provided' },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, fileName }, { status: 200 });
};
