import { getIdTokenResult, User } from "firebase/auth";

export async function hasAdminAccess(user: User | null | undefined) {
  if (!user) return false;

  const token = await getIdTokenResult(user, true);
  if (token.claims.admin === true) return true;

  const adminUid = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID;
  return Boolean(adminUid && user.uid === adminUid);
}
