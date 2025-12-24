import { api, isOk } from '@shared/api';
import { User } from '../model/types';
import { apiUrl } from '@shared/lib/api-helper';
import { paths } from '@shared/config/paths';
import { cookies } from 'next/headers';

export const getUserInfo = async () => {
  const cookie = await cookies();
  const token = cookie.get('accessToken')?.value;
  const res = await api.get<User>(apiUrl(paths.users.myInfo), {
    headers: { Cookie: `accessToken=${token}` },
  });
  if (!isOk(res)) return null;

  return res.data;
};
