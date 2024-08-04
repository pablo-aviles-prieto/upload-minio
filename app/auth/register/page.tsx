import { RegisterUserBlock } from '@/components/auth/register-block';
import { verifyRegisterToken } from '@/services/user/tokens';
import { errorMessages } from '@/utils/const';

type ParamsProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const decodedToken = async (token: string) => {
  try {
    const decodedTkn = await verifyRegisterToken(token);
    return { data: decodedTkn, errorMessage: null };
  } catch (err) {
    return {
      errorMessage:
        err instanceof Error ? err.message : errorMessages.registerTokenExpired,
    };
  }
};

export default async function AuthenticationPage({
  searchParams,
}: ParamsProps) {
  const { token } = searchParams;
  const decodedTkn = await decodedToken(token ?? '');

  return <RegisterUserBlock decodedToken={decodedTkn} />;
}
