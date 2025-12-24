import { cookies } from 'next/headers';
import { apiUrl } from '../api-helper';
import { paths } from '@shared/config/paths';

export async function isValid() {
  const cookie = await cookies();
  const token = cookie.get('accessToken')?.value;
  if (!token) return { authenticated: false as const };

  const res = await fetch(apiUrl(paths.auth.me), {
    method: 'GET',
    headers: { Cookie: `accessToken=${token}` },
    next: { revalidate: 30 },
  });

  if (!res.ok) return { authenticated: false as const };
  return { authenticated: true as const };
}
