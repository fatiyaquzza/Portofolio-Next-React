type StoredRateLimit = { startedAt?: unknown; count?: unknown } | undefined;

export function nextRateLimitWindow(
  data: StoredRateLimit,
  now: number,
  windowMs: number,
  limit: number
) {
  const startedAt = typeof data?.startedAt === "number" ? data.startedAt : now;
  const expired = now - startedAt >= windowMs;
  const count = expired ? 0 : typeof data?.count === "number" ? data.count : 0;
  return {
    allowed: count < limit,
    startedAt: expired ? now : startedAt,
    count: count + 1,
  };
}
