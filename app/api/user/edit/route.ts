import connectDb from '@/lib/mongoose-config';
import UserModel, { User } from '@/models/user/user-model';
import { errorMessages } from '@/utils/const';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {
  EditUserFormSchema,
  EditUserFormValue,
} from '@/schema/edit-user-form-schema';
import { z } from 'zod';

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as EditUserFormValue;

  try {
    EditUserFormSchema.parse(data);
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

    const { email, role, status, buckets } = data;
    const updateData = {
      role,
      status,
      scopes: buckets,
    };

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      updateData,
      { new: true } // Ensures that the updated document is returned
    ).lean();

    return NextResponse.json(
      {
        ok: true,
        updatedUser,
        message: `User ${updatedUser?.email} successfully updated`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log('ERROR UPDATING USER', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: errorMessages.incorrectData },
        { status: 400 }
      );
    }

    const errorMessage =
      err instanceof Error ? err.message : errorMessages.updatingUser;
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
};
