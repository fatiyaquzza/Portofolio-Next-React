import test from "node:test";
import assert from "node:assert/strict";
import { nextRateLimitWindow } from "../lib/rateLimitWindow.ts";

test("rate-limit windows allow up to the configured limit", () => {
  assert.deepEqual(nextRateLimitWindow(undefined, 1000, 10_000, 5), {
    allowed: true,
    startedAt: 1000,
    count: 1,
  });
  assert.equal(
    nextRateLimitWindow({ startedAt: 1000, count: 4 }, 2000, 10_000, 5).allowed,
    true
  );
  assert.equal(
    nextRateLimitWindow({ startedAt: 1000, count: 5 }, 2000, 10_000, 5).allowed,
    false
  );
});

test("an expired rate-limit window resets safely", () => {
  assert.deepEqual(nextRateLimitWindow({ startedAt: 1000, count: 99 }, 11_000, 10_000, 5), {
    allowed: true,
    startedAt: 11_000,
    count: 1,
  });
});
