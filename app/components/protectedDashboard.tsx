"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ADMIN_EMAIL = "fatiyaquzzaaa@gmail.com";

export default function ProtectedDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (!isDashboard) return;            // halaman publik → skip guard
    if (user === undefined) return;      // masih loading state

    if (!user) {
      // belum login → lempar ke /login
      router.replace("/login");
      return;
    }

    if (user.email !== ADMIN_EMAIL) {
      // login tapi bukan admin → paksa logout lalu ke /login
      (async () => {
        await signOut();
        router.replace("/login");
      })();
    }
  }, [user, isDashboard, router, signOut]);

  // Tahan render konten dashboard saat loading / proses cek
  if (isDashboard && user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F15] text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
