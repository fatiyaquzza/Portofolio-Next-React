import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function adminApp() {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin environment is incomplete");
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

export const getAdminAuth = () => getAuth(adminApp());
export const getAdminDb = () => getFirestore(adminApp());

export async function requireAdmin(request: Request) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  try {
    const token = await getAdminAuth().verifyIdToken(header.slice(7), true);
    return token.admin === true ? token : null;
  } catch {
    return null;
  }
}
