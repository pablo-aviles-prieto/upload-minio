import { ResetPasswordBlock } from '@/components/pages/reset-password-page/reset-password-block';
import { verifyRecoveryToken } from '@/services/user/tokens';
import { errorMessages } from '@/utils/const';

type ParamsProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const decodedToken = async (token: string) => {
  try {
    if (!token) throw new Error('No reset token found');
    const decodedTkn = await verifyRecoveryToken(token);
    return { data: decodedTkn, errorMessage: null };
  } catch (err) {
    return {
      errorMessage:
        err instanceof Error ? err.message : errorMessages.resetTokenExpired,
    };
  }
};

export default async function AuthenticationPage({
  searchParams,
}: ParamsProps) {
  const { token } = searchParams;
  const decodedTkn = await decodedToken(token ?? '');

  return <ResetPasswordBlock decodedToken={decodedTkn} />;
}
