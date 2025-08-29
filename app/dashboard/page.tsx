"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { FiTrendingUp } from "react-icons/fi";
import { HiOutlineCube } from "react-icons/hi";

export default function Dashboard() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/login"; // redirect ke halaman login
    } catch (err) {
      alert("Gagal logout, coba lagi.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F15] text-white overflow-hidden">
      {/* --- Dekorasi latar (glows + grid halus) --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-30 animate-float"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(97,132,220,0.65) 0%, rgba(97,132,220,0) 60%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-20 h-[600px] w-[600px] rounded-full blur-3xl opacity-30 animate-float-slow"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, rgba(99,17,225,0.55) 0%, rgba(99,17,225,0) 60%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.15]" />
      </div>

      {/* --- Header --- */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1623]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#6184DC] to-[#6311E1] bg-clip-text text-transparent">
              Admin
            </span>{" "}
            Dashboard
          </h1>
          <nav className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500/15 px-4 py-1.5 text-sm font-medium text-red-300 ring-1 ring-inset ring-red-400/20 transition hover:bg-red-500/25"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* --- Main --- */}
      <main className="relative mx-auto max-w-6xl px-4 py-10">
        {/* Intro/hero kecil */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome, Admin
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Manage portfolio content through the two main modules below.
            </p>
          </div>
        </div>

        {/* Hanya 2 pilihan — ukurannya disesuaikan (kartu besar seimbang) */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Experiences Card */}
          <Link
            href="/dashboard/experiences"
            className="group relative h-56 rounded-2xl border border-white/10 bg-[#101726]/80 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-200 hover:scale-[1.01] hover:border-[#6184DC] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6184DC]/30"
          >
            {/* ring gradient */}
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(120deg, rgba(97,132,220,0.25), rgba(99,17,225,0.25))",
              }}
            />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#6184DC]/15 ring-1 ring-inset ring-[#6184DC]/30">
                  <FiTrendingUp className="text-2xl text-[#89a6ff]" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Manage Experiences</p>
                  <p className="text-xs text-gray-400">
                    Add, edit, and delete experiences.
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-[#6184DC] opacity-90">
                Open →
              </div>
            </div>
          </Link>

          {/* Projects Card */}
          <Link
            href="/dashboard/projects"
            className="group relative h-56 rounded-2xl border border-white/10 bg-[#101726]/80 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-200 hover:scale-[1.01] hover:border-[#6184DC] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6184DC]/30"
          >
            {/* ring gradient */}
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(120deg, rgba(97,132,220,0.25), rgba(99,17,225,0.25))",
              }}
            />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#6184DC]/15 ring-1 ring-inset ring-[#6184DC]/30">
                  <HiOutlineCube className="text-2xl text-[#89a6ff]" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Manage Projects</p>
                  <p className="text-xs text-gray-400">
                    Add, edit, and delete projects.
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-[#6184DC] opacity-90">
                Open →
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* --- Animasi global --- */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 9s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 13s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
