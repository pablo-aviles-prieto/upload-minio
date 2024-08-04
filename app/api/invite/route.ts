import { CustomError } from '@/errors/custom-error';
import connectDb from '@/lib/mongoose-config';
import UserModel from '@/models/user/user-model';
import { InviteFormSchema } from '@/schema/invite-form-schema';
import { handleRegisterUserMail } from '@/services/mail/register-user-mail';
import { generateRegisterToken } from '@/services/user/tokens';
import { UserRole } from '@/types';
import { errorMessages } from '@/utils/const';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

type ReqObj = {
  email: string;
  role: UserRole;
  buckets: string[];
};

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as ReqObj;

  try {
    InviteFormSchema.parse(data);
    await connectDb();

    const existingUser = await UserModel.findOne({ email: data.email });

    if (!existingUser) {
      const parsedObj = {
        email: data.email,
        role: data.role,
        scopes: data.buckets,
      };
      const token = await generateRegisterToken(parsedObj);
      await handleRegisterUserMail({
        token,
        receiverMail: data.email,
      });
    }

    return NextResponse.json(
      {
        ok: true,
        message:
          'If the email is not already registered, instructions will be sent shortly.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.log('ERROR INVITING USER', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: errorMessages.incorrectData },
        { status: 400 }
      );
    }
    if (err instanceof CustomError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.statusCode }
      );
    }
    const errorMessage =
      err instanceof Error ? err.message : errorMessages.inviteUser;
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
};
