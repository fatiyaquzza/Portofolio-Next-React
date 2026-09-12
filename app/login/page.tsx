"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";
import { hasAdminAccess } from "@/lib/adminAccess";
import ThemeToggle from "@/app/components/ThemeToggle";

/**
 * Catatan: Fungsionalitas TIDAK diubah — hanya styling/markup.
 * Warna & nuansa diselaraskan dengan halaman lain (dark navy, biru #6184DC, ungu #6311E1).
 */
export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    (async () => {
      try {
        const isAdmin = await hasAdminAccess(user);
        if (!cancelled && isAdmin) router.replace("/dashboard");
      } catch {
        if (!cancelled) setError("Admin access could not be verified. Please try again.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, router]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const isAdmin = await hasAdminAccess(result.user);

      if (!isAdmin) {
        await signOut(auth);
        setError("This Google account does not have administrator access.");
        return;
      }
      router.replace("/dashboard");
    } catch {
      setError("Login failed or was cancelled. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-admin-page">
      <div className="absolute right-6 top-6 z-20"><ThemeToggle /></div>
      {/* --- Dekorasi Latar --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* kabut gradien biru-ungu */}
        <div
          className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-35 animate-float-slow"
          style={{
            background:
              "radial-gradient( circle at 30% 30%, rgba(97,132,220,0.6) 0%, rgba(97,132,220,0) 60%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-[620px] w-[620px] rounded-full blur-3xl opacity-35 animate-float"
          style={{
            background:
              "radial-gradient( circle at 70% 70%, rgba(99,17,225,0.55) 0%, rgba(99,17,225,0) 60%)",
          }}
        />
        {/* garis vertikal halus seperti timeline */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#20064A] via-[#2B0780] to-[#6311E1] opacity-20" />
      </div>

      {/* --- Card Login --- */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-[22px] p-px bg-gradient-to-b from-[#6184DC33] via-[#6311E133] to-transparent">
          <div className="theme-shadow rounded-[21px] bg-surface-section/80 backdrop-blur-xl shadow-2xl border border-contrast/5">
            {/* header */}
            <div className="px-7 pt-7 pb-4 text-center">
              <h1 className="theme-shadow text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#6184DC] to-[#6311E1] drop-shadow-md">
                Admin Login
              </h1>
              <p className="mt-3 text-[13px] text-ink-secondary">
                Administrator-only access. Make sure to use a registered Google
                account.
              </p>
            </div>

            {/* tombol */}
            <div className="px-7 pb-7">
              {error && <p role="alert" className="mb-4 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-800 dark:text-red-100">{error}</p>}
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className={`group relative flex w-full items-center justify-center gap-3 rounded-xl py-3.5 px-6 text-base font-semibold text-foreground focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6184DC]/30 transition-transform duration-200 ${
                  loading
                    ? "cursor-not-allowed"
                    : "hover:scale-[1.02] active:scale-100"
                }`}
              >
                {/* gradient ring */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6184DC] via-[#5a5ee7] to-[#6311E1]" />
                <span className="absolute inset-[2px] rounded-[10px] bg-surface-inset/80 backdrop-blur-xl" />
                <span className="relative flex items-center gap-3">
                  <FcGoogle className="text-2xl" />
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <FaSpinner className="animate-spin" />
                      Login...
                    </span>
                  ) : (
                    <span>Login with Google</span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* footnote mini */}
        <div className="mt-6 text-center text-[11px] text-ink-secondary">
          Only configured administrator accounts can continue.
        </div>
      </div>

      {/* --- Global Animations --- */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.01);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) translateX(4px) scale(1.02);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
