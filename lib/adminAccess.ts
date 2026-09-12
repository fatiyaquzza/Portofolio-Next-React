import { getIdTokenResult, User } from "firebase/auth";

export async function hasAdminAccess(user: User | null | undefined) {
  if (!user) return false;
  const token = await getIdTokenResult(user, true);
  return token.claims.admin === true;
}
