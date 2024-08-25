import connectDb from '@/lib/mongoose-config';
import UserModel from '@/models/user/user-model';
import { errorMessages } from '@/utils/const';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req: NextRequest) => {
  const queryEmail = req.nextUrl.searchParams.get('query') || '';

  try {
    await connectDb();

    const tokenNext = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!tokenNext || !tokenNext.id) {
      return NextResponse.json(
        { ok: false, error: errorMessages.relogAcc },
        { status: 400 }
      );
    }

    const users = await UserModel.find(
      queryEmail
        ? {
            email: { $regex: queryEmail, $options: 'i' }, // Case-insensitive regex search
          }
        : {}
    );

    return NextResponse.json(
      {
        ok: true,
        users,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log('ERROR FILTERING THE USERS BY EMAIL', err);
    const errorMessage =
      err instanceof Error ? err.message : errorMessages.filteringUsers;
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
};
