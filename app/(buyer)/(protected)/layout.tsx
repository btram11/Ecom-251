import Link from "next/link";
import { isValid } from "@shared/lib/auth/check-auth";
import { RequireLogin } from "@pages/require-login";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated } = await isValid();

  if (!authenticated) return <RequireLogin />;

  return <>{children}</>;
}
