import { genSalt } from 'bcrypt';

const { BCRYPT_SALT } = process.env;

export const bcryptSalt = async () => genSalt(Number(BCRYPT_SALT));
