import { type CustomSession, UserRole } from '@/types';
import { HEADER_OPTIONS } from './const';

export const filteredHeaderOptions = (session: CustomSession) => {
  return HEADER_OPTIONS.filter((opt) => {
    return (
      !opt.roleAccess ||
      opt.roleAccess.includes(session?.user?.role ?? UserRole.USER)
    );
  });
};
