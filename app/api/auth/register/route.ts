import { hash } from 'bcrypt';
import connectDb from '@/lib/mongoose-config';
import UserModel from '@/models/user/user-model';
import { bcryptSalt } from '@/utils/gen-bcrypt-salt';
import { errorMessages, ThemeOptions } from '@/utils/const';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole, UserStatus } from '@/types';
import { RegisterAPIUserSchema } from '@/schema/register-form-user-schema';
import { z } from 'zod';

type ReqObjI = {
  email: string;
  password: string;
  role?: UserRole;
  scopes?: string[];
  theme?: ThemeOptions;
  status?: UserStatus;
};

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as ReqObjI;

  try {
    RegisterAPIUserSchema.parse(data);
    await connectDb();

    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: errorMessages.credentials },
        { status: 400 }
      );
    }

    const salt = await bcryptSalt();
    const hashedPassword = await hash(data.password, salt);

    const newUser = new UserModel({ ...data, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json(
      { ok: true, createdUser: savedUser },
      { status: 201 }
    );
  } catch (err) {
    console.log('ERROR REGISTERING THE USER', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: errorMessages.credentials },
        { status: 400 }
      );
    }
    const errorMessage =
      err instanceof Error ? err.message : errorMessages.registerUser;
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
};
