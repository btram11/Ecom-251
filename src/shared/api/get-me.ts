// src/shared/api/get-me.ts
import { environment } from "../../../environment";

export type MeResponse = {
  id: string;
  name: string;
  picture?: string;
};

export async function getMe(): Promise<MeResponse | null> {
  const res = await fetch(
    `${environment.SERVICE_URL}/api/auth/me`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
