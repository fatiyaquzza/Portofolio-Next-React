import { createHash } from "node:crypto";
import { getAdminDb } from "./firebaseAdmin";
import { nextRateLimitWindow } from "./rateLimitWindow";

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

export async function checkContactRateLimit(ip: string) {
  const salt = process.env.RATE_LIMIT_SALT;
  if (!salt) throw new Error("RATE_LIMIT_SALT is missing");

  const db = getAdminDb();
  const now = Date.now();
  const ipHash = createHash("sha256").update(`${salt}:${ip}`).digest("hex");
  const perIp = db.collection("_rateLimits").doc(`contact-ip-${ipHash}`);
  const global = db.collection("_rateLimits").doc("contact-global");

  return db.runTransaction(async (transaction) => {
    const [ipSnap, globalSnap] = await Promise.all([
      transaction.get(perIp),
      transaction.get(global),
    ]);

    const ipState = nextRateLimitWindow(ipSnap.data(), now, FIFTEEN_MINUTES, 5);
    const globalState = nextRateLimitWindow(globalSnap.data(), now, ONE_HOUR, 30);
    if (!ipState.allowed || !globalState.allowed) {
      const blockedUntil = [
        !ipState.allowed ? ipState.startedAt + FIFTEEN_MINUTES : 0,
        !globalState.allowed ? globalState.startedAt + ONE_HOUR : 0,
      ];
      return {
        allowed: false,
        retryAfter: Math.max(
          1,
          Math.ceil((Math.max(...blockedUntil) - now) / 1000)
        ),
      };
    }

    transaction.set(perIp, ipState);
    transaction.set(global, globalState);
    return { allowed: true, retryAfter: 0 };
  });
}
