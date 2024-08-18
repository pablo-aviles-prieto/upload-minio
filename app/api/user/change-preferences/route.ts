import connectDb from '@/lib/mongoose-config';
import UserModel, { User } from '@/models/user/user-model';
import { errorMessages } from '@/utils/const';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

type ReqObjI = Partial<User>;

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as ReqObjI;

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

    const updatedUser = await UserModel.findByIdAndUpdate(
      tokenNext.id,
      data
    ).lean();

    return NextResponse.json(
      {
        ok: true,
        updatedUser,
        message: 'Preferences successfully updated',
      },
      { status: 200 }
    );
  } catch (err) {
    console.log('ERROR UPDATING PREFERNECES', err);
    const errorMessage =
      err instanceof Error ? err.message : errorMessages.updatingTheme;
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
};
