"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

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
    <div className="min-h-screen bg-[#0b0f15] text-white">
      <header className="sticky top-0 z-50 bg-[#0f1623]/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <nav className="text-sm text-gray-300 flex items-center gap-5">
            <Link href="/dashboard/experiences" className="hover:text-white">
              Experiences
            </Link>
            <Link href="/dashboard/projects" className="hover:text-white">
              Projects
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/experiences"
            className="bg-[#0f1623] rounded-2xl p-6 border border-white/10 hover:border-[#61dca3] transition"
          >
            <p className="text-lg font-semibold mb-2">Kelola Experiences</p>
            <p className="text-gray-400 text-sm">
              Tambah, edit, hapus pengalaman.
            </p>
          </Link>

          <Link
            href="/dashboard/projects"
            className="bg-[#0f1623] rounded-2xl p-6 border border-white/10 hover:border-[#61dca3] transition"
          >
            <p className="text-lg font-semibold mb-2">Kelola Projects</p>
            <p className="text-gray-400 text-sm">
              Tambah, edit, hapus project portfolio.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
