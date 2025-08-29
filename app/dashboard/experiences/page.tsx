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
  const [showDelete, setShowDelete] = useState<{ id: string; title: string } | null>(null);
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

  const handleDelete = (id: string, title: string) => setShowDelete({ id, title });

  return (
    <div className="min-h-screen flex bg-[#0b0f15] text-white">
      <main className="flex-1 w-full px-4 sm:px-6 md:px-10 py-8">
        <div className="flex flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#61DCA3] to-emerald-500 p-3 rounded-lg">
              <FaUserTie className="text-xl md:text-3xl" />
            </div>
            <h1 className="text:xl md:text-3xl font-bold tracking-tight">Manage Experience</h1>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <FiArrowLeft />
            <span>Back</span>
          </button>
        </div>

        {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg bg-[#232537] text-[#61dca3] font-bold border border-[#61dca3] animate-fade-in text-lg">
            {toast}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#17191f] rounded-2xl p-7 shadow-2xl mb-10 border border-white/10"
        >
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-[#232537] text-white focus:ring-2 focus:ring-[#61dca3] border border-transparent outline-none"
              required
            />
            <input
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-[#232537] text-white focus:ring-2 focus:ring-[#61dca3] border border-transparent outline-none"
              required
            />
            <input
              placeholder="Year (ex: 2021 - 2025)"
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-[#232537] text-white focus:ring-2 focus:ring-[#61dca3] border border-transparent outline-none"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-[#232537] text-white focus:ring-2 focus:ring-[#61dca3] border border-transparent outline-none resize-none lg:col-span-2"
              rows={4}
              required
            />
          </div>

          <div className="lg:col-span-3 flex items-center gap-3">
            <button
              type="submit"
              className="bg-[#61dca3] text-[#0b0f15] px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition"
            >
              {editing ? "Update Experience" : "Add Experience"}
            </button>
            {editing && (
              <button
                type="button"
                className="text-sm text-gray-400 hover:underline"
                onClick={() => {
                  setEditing(null);
                  setForm({ title: "", company: "", year: "", description: "" });
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="overflow-x-auto rounded-2xl bg-[#181a21] p-4 shadow-lg border border-white/10">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3">Title</th>
                <th className="p-3">Company</th>
                <th className="p-3">Year</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-[#232537]/40">
                    <td className="p-3">
                      <div className="h-4 w-48 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                    </td>
                    <td className="p-3">
                      <div className="h-4 w-40 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                    </td>
                    <td className="p-3">
                      <div className="h-4 w-36 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                    </td>
                    <td className="p-3">
                      <div className="h-4 w-64 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                    </td>
                    <td className="p-3">
                      <div className="h-8 w-24 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                    </td>
                  </tr>
                ))
              ) : experiences.length ? (
                experiences.map((exp) => (
                  <tr key={exp.id} className="border-b border-[#232537]/40 hover:bg-[#232537]/30 transition">
                    <td className="p-3 font-bold">{exp.title}</td>
                    <td className="p-3">{exp.company}</td>
                    <td className="p-3">{exp.year}</td>
                    <td className="p-3 max-w-md">
                      <div className="line-clamp-2 text-gray-200">{exp.description}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-4">
                        <button
                          className="text-blue-400 hover:underline font-semibold"
                          onClick={() => handleEdit(exp)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-400 hover:underline font-semibold"
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
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    No experience data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* styles untuk shimmer & toast */}
        <style jsx global>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out; }
        `}</style>

        {/* Modal Delete */}
        {showDelete && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-[#181a21] rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-700">
              <div className="text-5xl mb-4 text-red-500">⚠️</div>
              <h2 className="font-bold text-xl mb-2">Delete Experience?</h2>
              <p className="mb-6 text-gray-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">{showDelete.title}</span>?
                This action is irreversible.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 rounded-lg bg-[#61dca3] text-[#0b0f15] font-bold hover:bg-[#3fc78d] transition"
                  onClick={async () => {
                    await deleteExperience(showDelete.id);
                    setToast("Experience deleted!");
                    setShowDelete(null);
                    const list = await getExperiences();
                    setExperiences(list);
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
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
