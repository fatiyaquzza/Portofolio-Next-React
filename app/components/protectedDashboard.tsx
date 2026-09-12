"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { hasAdminAccess } from "@/lib/adminAccess";

type AccessState = "idle" | "checking" | "allowed" | "denied" | "error";

export default function ProtectedDashboard({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [state, setState] = useState<AccessState>("idle");
  const [attempt, setAttempt] = useState(0);

  const checkAccess = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    if (!isDashboard) {
      setState("idle");
      return;
    }
    if (user === undefined) {
      setState("checking");
      return;
    }
    if (!user) {
      setState("denied");
      router.replace("/login");
      return;
    }

    let cancelled = false;
    setState("checking");
    hasAdminAccess(user)
      .then(async (allowed) => {
        if (cancelled) return;
        if (allowed) {
          setState("allowed");
          return;
        }
        setState("denied");
        await signOut();
        router.replace("/login");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt, isDashboard, router, signOut, user]);

  if (!isDashboard) return children;
  if (state === "allowed") return children;

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-admin-page px-6 text-foreground">
      <div className="max-w-md text-center" role={state === "error" ? "alert" : "status"}>
        {state === "error" ? (
          <>
            <h1 className="text-2xl font-semibold">Unable to verify access</h1>
            <p className="mt-3 text-sm leading-6 text-ink-secondary">
              Check your connection, then try the admin verification again.
            </p>
            <button
              type="button"
              onClick={checkAccess}
              className="mt-6 min-h-11 rounded-full bg-[#6311E1] px-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B89FF] text-white"
            >
              Try again
            </button>
          </>
        ) : (
          <p>Verifying administrator access…</p>
        )}
      </div>
    </main>
  );
}
