"use client";
import { useEffect, useRef, useState } from "react";
import {
  addProject,
  deleteProject,
  getProjects,
  ProjectDoc,
  updateProject,
} from "@/lib/firestoreCrud";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUploadCloud } from "react-icons/fi";

export default function ProjectsCRUD() {
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [form, setForm] = useState({
    title: "",
    link: "",
    tools: "",
    type: "",
    image: "",
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.tools || !form.type || !form.link)
      return setToast("Please fill all fields!");

    let imageUrl = form.image || "";
    if (file) imageUrl = await uploadToCloudinary(file);
    const payload = { ...form, image: imageUrl };

    if (editing) {
      await updateProject(editing, payload);
      setToast("Project updated!");
    } else {
      await addProject(payload);
      setToast("Project added!");
    }
    setEditing(null);
    setForm({ title: "", link: "", tools: "", type: "", image: "" });
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    setProjects(await getProjects());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (p: ProjectDoc) => {
    setForm({
      title: p.title,
      link: p.link,
      tools: p.tools,
      type: p.type,
      image: p.image || "",
    });
    setEditing(p.id!);
    setPreview(p.image || null);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#070a11] text-white relative overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(99,17,225,0.25)_0%,rgba(99,17,225,0)_70%),radial-gradient(60%_60%_at_80%_90%,rgba(97,132,220,0.2)_0%,rgba(97,132,220,0)_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.12]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#9fb5ff] via-[#7e89ff] to-[#b58cff] bg-clip-text text-transparent">
                Manage Projects
              </span>
            </h1>
            <p className="mt-1 text-sm text-gray-300/80">
              Create, update, and organize your work portfolio with ease.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="group relative inline-flex items-center gap-2 rounded-xl bg-[#101628] px-4 py-2 font-semibold text-gray-200 ring-1 ring-white/10 transition hover:bg-[#141c2f] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6311E1]/30"
          >
            <FiArrowLeft className="text-lg transition group-hover:-translate-x-0.5" />
            <span>Back</span>
          </button>
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
                {editing ? "Update Project" : "Add Project"}
              </h2>
              <p className="text-xs text-gray-400">
                Please fill in all required fields below.
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
                    link: "",
                    tools: "",
                    type: "",
                    image: "",
                  });
                  setFile(null);
                  setPreview(null);
                  if (fileRef.current) fileRef.current.value = "";
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
            <div className="lg:col-span-2 grid grid-cols-1 gap-6">
              <label className="block">
                <span className="mb-2 block text-sm text-gray-300">Title</span>
                <input
                  placeholder="e.g., Personal Portfolio"
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
                  Link (repo/website)
                </span>
                <input
                  placeholder="https://…"
                  value={form.link}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, link: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#131a2e] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-[#6311E1] outline-none transition placeholder:text-gray-500"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-gray-300">
                  Tools (comma separated)
                </span>
                <input
                  placeholder="Next.js, Tailwind, Firebase"
                  value={form.tools}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tools: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#131a2e] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-[#6311E1] outline-none transition placeholder:text-gray-500"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-gray-300">Type</span>
                <input
                  placeholder="e.g., Website, Mobile App"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#131a2e] text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-[#6311E1] outline-none transition placeholder:text-gray-500"
                  required
                />
              </label>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-4">
              <label
                htmlFor="image"
                className="w-full min-h-[180px] flex flex-col items-center justify-center gap-3 px-4 py-6 bg-[#101628] border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-[#141c2f] transition text-center"
              >
                {preview || form.image ? (
                  <img
                    src={preview || form.image}
                    alt="Preview"
                    className="w-40 h-32 object-cover rounded-xl shadow-lg border border-white/10 bg-white"
                  />
                ) : (
                  <div>
                    <FiUploadCloud className="mx-auto text-3xl text-gray-400 mb-2" />
                    <span className="font-semibold text-gray-200">
                      Drop or click to upload
                    </span>
                    <p className="text-[11px] text-gray-400">
                      PNG, JPG, up to a few MB
                    </p>
                  </div>
                )}
                <input
                  id="image"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                {(file || preview) && (
                  <button
                    type="button"
                    className="text-xs text-red-300 hover:text-red-200 underline mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                      setPreview(null);
                      setForm((f) => ({ ...f, image: "" }));
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                  >
                    Remove
                  </button>
                )}
              </label>

              <button
                type="submit"
                className="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 font-bold text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6311E1]/30 bg-[#6311E1] hover:bg-gradient-to-r from-[#4570de] via-[#4046ec] to-[#5d03e5]"
              >
                <span className="relative">
                  {editing ? "Update Project" : "Add Project"}
                </span>
              </button>
              {editing && (
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:underline"
                  onClick={() => {
                    setEditing(null);
                    setForm({
                      title: "",
                      link: "",
                      tools: "",
                      type: "",
                      image: "",
                    });
                    setFile(null);
                    setPreview(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List */}
        <section className="rounded-2xl border border-white/10 bg-[#0c1222]/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold">Project List</h2>
            <p className="text-xs text-gray-400">
              {loading ? "Loading…" : `${projects.length} item(s)`}
            </p>
          </div>

          <div className="overflow-auto">
            <table className="w-full text-left min-w-[880px]">
              <thead className="sticky top-0 bg-[#0c1222]/95 backdrop-blur">
                <tr className="border-b border-white/10">
                  {["Image", "Title", "Type", "Tools", "Link", "Actions"].map(
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
                        <div className="h-14 w-20 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-4 w-40 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-4 w-24 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-4 w-56 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-4 w-64 rounded shimmer" />
                      </td>
                      <td className="p-3">
                        <div className="h-8 w-24 rounded shimmer" />
                      </td>
                    </tr>
                  ))
                ) : projects.length ? (
                  projects.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-white/10 hover:bg-white/[0.04] transition"
                    >
                      <td className="p-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-20 h-14 object-cover rounded border border-white/10 bg-white"
                        />
                      </td>
                      <td className="p-3 text-sm text-gray-100">{p.title}</td>
                      <td className="p-3 text-gray-300 text-sm">{p.type}</td>
                      <td className="p-3 text-gray-300 text-sm">
                        <div className="max-w-xs truncate" title={p.tools}>
                          {p.tools}
                        </div>
                      </td>
                      <td className="p-3">
                        <a
                          href={p.link}
                          target="_blank"
                          className="text-[#9d5cff] underline underline-offset-2 break-all hover:opacity-90 text-sm"
                        >
                          Link
                        </a>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm  text-[#cdbaff] ring-1 ring-[#6d57ff]/30 hover:bg-[#6311E1]/30 bg-[#141a2b] transition"
                            onClick={() => handleEdit(p)}
                          >
                            Edit
                          </button>
                          <button
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-[#ffb3c6] ring-1 ring-[#ff8aa8]/30 hover:bg-[#1f1420] transition"
                            onClick={() =>
                              setShowDelete({ id: p.id!, title: p.title })
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16">
                      <div className="flex flex-col items-center justify-center text-center gap-3">
                        <div className="h-16 w-16 rounded-2xl grid place-items-center bg-white/5 ring-1 ring-white/10">
                          🗂️
                        </div>
                        <p className="text-gray-300 font-semibold">
                          No project data yet.
                        </p>
                        <p className="text-sm text-gray-400 max-w-sm">
                          Add your first project using the form above. It will
                          appear here once saved.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Global styles */}
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
                Delete Project?
              </h2>
              <p className="mb-6 text-gray-300 text-center">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">
                  {showDelete.title}
                </span>
                ?
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  className="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-2.5 font-bold text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6311E1]/30"
                  onClick={async () => {
                    await deleteProject(showDelete.id);
                    setProjects(await getProjects());
                    setShowDelete(null);
                    setToast("Project deleted!");
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
      </div>
    </div>
  );
}
