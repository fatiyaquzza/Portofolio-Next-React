"use client";
import { useEffect, useRef, useState } from "react";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
  Experience,
} from "../../../lib/firestoreCrud";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";

export default function ExperienceCRUD() {
  const [showDelete, setShowDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    year: "",
    description: "",
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    getExperiences()
      .then(setExperiences)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.year || !form.description) {
      setToast("Please fill all fields!");
      return;
    }
    if (editing) {
      await updateExperience(editing, form);
      setToast("Experience updated!");
      setEditing(null);
    } else {
      await addExperience(form);
      setToast("Experience added!");
    }
    setForm({ title: "", company: "", year: "", description: "" });
    const list = await getExperiences();
    setExperiences(list);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (exp: Experience) => {
    setForm({
      title: exp.title,
      company: exp.company,
      year: exp.year,
      description: exp.description,
    });
    setEditing(exp.id!);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string, title: string) =>
    setShowDelete({ id, title });

  return (
    <div className="min-h-screen bg-[#070a11] text-white relative overflow-hidden">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(99,17,225,0.25)_0%,rgba(99,17,225,0)_70%),radial-gradient(60%_60%_at_80%_90%,rgba(97,132,220,0.2)_0%,rgba(97,132,220,0)_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.12]" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-10 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-[#1a1630]/70 ring-1 ring-inset ring-[#6311E1]/40 shadow-[0_10px_30px_rgba(99,17,225,0.25)]">
              <FaUserTie className="text-2xl text-[#c7b7ff]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-[#9fb5ff] via-[#7e89ff] to-[#b58cff] bg-clip-text text-transparent">
                  Manage Experience
                </span>
              </h1>
              <p className="mt-1 text-sm text-gray-300/80">
                Manage your work experience—add, change, or delete.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {editing && (
              <span className="rounded-full bg-amber-400/10 text-amber-300 text-xs font-semibold px-3 py-1 ring-1 ring-amber-300/20">
                Editing mode
              </span>
            )}
            <button
              onClick={() => router.push("/dashboard")}
              className="group relative inline-flex items-center gap-2 rounded-xl bg-[#101628] px-4 py-2 font-semibold text-gray-200 ring-1 ring-white/10 transition hover:bg-[#141c2f] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6311E1]/30"
            >
              <FiArrowLeft className="text-lg transition group-hover:-translate-x-0.5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl bg-[#0f1424]/95 text-[#e7deff] font-semibold ring-1 ring-[#6311E1]/40 animate-fade-in text-sm backdrop-blur">
            {toast}
          </div>
        )}

        {/* Form */}
        <section className="rounded-2xl border border-white/10 bg-[#0c1222]/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold">
                {editing ? "Update Experience" : "Add Experience"}
              </h2>
              <p className="text-xs text-gray-400">
                Fill in all the following fields correctly.
              </p>
            </div>
            {editing && (
              <button
                type="button"
                className="text-xs text-gray-300/90 hover:text-white underline underline-offset-4"
                onClick={() => {
                  setEditing(null);
                  setForm({
                    title: "",
                    company: "",
                    year: "",
                    description: "",
                  });
                }}
              >
                Cancel edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <label className="block">
                <span className="mb-2 block text-sm text-gray-300">Title</span>
                <input
                  placeholder="e.g., Frontend Developer"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#131a2e] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-[#6311E1] outline-none transition placeholder:text-gray-500"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-gray-300">
                  Company
                </span>
                <input
                  placeholder="e.g., PT Teknologi Nusantara"
                  value={form.company}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, company: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#131a2e] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-[#6311E1] outline-none transition placeholder:text-gray-500"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-gray-300">Year</span>
                <input
                  placeholder="2021 - 2025"
                  value={form.year}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, year: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#131a2e] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-[#6311E1] outline-none transition placeholder:text-gray-500"
                  required
                />
              </label>
              <label className="block lg:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Description</span>
                  <span className="text-[11px] text-gray-400">
                    {form.description.length} chars
                  </span>
                </div>
                <textarea
                  placeholder="Ringkas tanggung jawab, proyek kunci, dan capaian."
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#131a2e] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-[#6311E1] outline-none transition resize-none min-h-[120px] placeholder:text-gray-500"
                  rows={4}
                  required
                />
              </label>
            </div>

            <div className="lg:col-span-3 flex items-center gap-3">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 font-bold text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6311E1]/30 bg-[#6311E1] hover:bg-gradient-to-r from-[#4570de] via-[#4046ec] to-[#5d03e5]"
              >
                <span className="relative">
                  {editing ? "Update Experience" : "Add Experience"}
                </span>
              </button>
            </div>
          </form>
        </section>

        {/* List */}
        <section className="rounded-2xl border border-white/10 bg-[#0c1222]/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Experience List</h2>
            <p className="text-xs text-gray-400">
              {loading ? "Loading…" : `${experiences.length} item(s)`}
            </p>
          </div>

          <div className="overflow-auto">
            <table className="w-full text-left min-w-[760px]">
              <thead className="sticky top-0 bg-[#0c1222]/95 backdrop-blur">
                <tr className="border-b border-white/10">
                  {["Title", "Company", "Year", "Description", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="p-3 text-[12px] uppercase tracking-wider text-gray-300/90"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="border-b border-[#232537]/40">
                      <td className="p-3">
                        <div className="h-4 w-48 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-4 w-40 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-4 w-36 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-4 w-64 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-8 w-24 rounded shimmer" />
                      </td>
                    </tr>
                  ))
                ) : experiences.length ? (
                  experiences.map((exp) => (
                    <tr
                      key={exp.id}
                      className="border-b border-white/10 hover:bg-white/[0.04] transition"
                    >
                      <td className="p-3 text-gray-100 text-sm">{exp.title}</td>
                      <td className="p-3 text-gray-300 text-sm">
                        {exp.company}
                      </td>
                      <td className="p-3 text-gray-300 text-sm">{exp.year}</td>
                      <td className="p-3 max-w-md">
                        <div className="line-clamp-2 text-gray-300 text-sm">
                          {exp.description}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm  text-[#cdbaff] ring-1 ring-[#6d57ff]/30 hover:bg-[#6311E1]/30 bg-[#141a2b] transition"
                            onClick={() => handleEdit(exp)}
                          >
                            Edit
                          </button>
                          <button
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm  text-[#ffb3c6] ring-1 ring-[#ff8aa8]/30 hover:bg-[#1f1420] transition"
                            onClick={() => handleDelete(exp.id!, exp.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-16">
                      <div className="flex flex-col items-center justify-center text-center gap-3">
                        <div className="h-16 w-16 rounded-2xl grid place-items-center bg-white/5 ring-1 ring-white/10">
                          🗂️
                        </div>
                        <p className="text-gray-300 font-semibold">
                          No experience data yet.
                        </p>
                        <p className="text-sm text-gray-400 max-w-sm">
                          Tambahkan pengalaman pertama Anda melalui formulir di
                          atas. Data akan tampil di sini.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* styles for shimmer & toast */}
        <style jsx global>{`
          .shimmer {
            background: linear-gradient(
              90deg,
              #141c2b 25%,
              #1b2538 50%,
              #141c2b 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.6s infinite;
          }
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.25s ease-out;
          }
        `}</style>

        {/* Delete Modal */}
        {showDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 animate-fade-in p-4">
            <div className="w-full sm:max-w-sm rounded-2xl border border-white/10 bg-[#0c1222]/95 shadow-2xl p-6">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-[#1a1630] ring-1 ring-inset ring-[#6311E1]/40">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="font-bold text-xl mb-2 text-center">
                Delete Experience?
              </h2>
              <p className="mb-6 text-gray-300 text-center">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">
                  {showDelete.title}
                </span>
                ? This action is irreversible.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  className="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-2.5 font-bold text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6311E1]/30"
                  onClick={async () => {
                    await deleteExperience(showDelete.id);
                    setToast("Experience deleted!");
                    setShowDelete(null);
                    const list = await getExperiences();
                    setExperiences(list);
                  }}
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6184DC] via-[#5a5ee7] to-[#6311E1]" />
                  <span className="absolute inset-[2px] rounded-[10px] bg-[#0b1120]/80 backdrop-blur" />
                  <span className="relative">Yes, Delete</span>
                </button>
                <button
                  className="px-6 py-2.5 rounded-xl bg-[#101628] text-gray-200 ring-1 ring-inset ring-white/10 hover:bg-[#141c2f] transition"
                  onClick={() => setShowDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
