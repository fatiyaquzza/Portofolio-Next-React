"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { hasAdminAccess } from "@/lib/adminAccess";

export default function ProtectedDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAccess, setCheckingAccess] = useState(false);

  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (!isDashboard) {
      setCheckingAccess(false);
      return;
    }

    if (user === undefined) {
      setCheckingAccess(true);
      return;
    }

    let cancelled = false;
    setCheckingAccess(true);

    if (!user) {
      router.replace("/login");
      setCheckingAccess(false);
      return undefined;
    }

    (async () => {
      const isAdmin = await hasAdminAccess(user);
      if (!cancelled && !isAdmin) {
        await signOut();
        router.replace("/login");
      }
      if (!cancelled) {
        setCheckingAccess(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isDashboard, router, signOut]);

  if (isDashboard && (user === undefined || checkingAccess)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F15] text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
