"use client";
import ThemeToggle from "@/app/components/ThemeToggle";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUploadCloud } from "react-icons/fi";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import SafeImage from "@/app/components/SafeImage";
import { projectLinks, type ProjectType } from "@/lib/content";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  addProject,
  deleteProject,
  getProjects,
  ProjectDoc,
  updateProject,
} from "@/lib/firestoreCrud";

type FormState = {
  title: string;
  type: ProjectType;
  tools: string;
  description: string;
  role: string;
  demoUrl: string;
  repoUrl: string;
  image: string;
  featured: boolean;
};

const emptyForm: FormState = {
  title: "",
  type: "Website",
  tools: "",
  description: "",
  role: "",
  demoUrl: "",
  repoUrl: "",
  image: "",
  featured: false,
};

const fieldClass =
  "w-full rounded-xl bg-surface-panel px-4 py-3 text-foreground ring-1 ring-inset ring-contrast/10 outline-none transition placeholder:text-ink-secondary focus:ring-2 focus:ring-[#8D78FF] disabled:opacity-60";

export default function ProjectsCRUD() {
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<ProjectDoc | null>(null);
  const [busy, setBusy] = useState<"upload" | "save" | "delete" | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const operationRef = useRef(false);
  const router = useRouter();

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      setProjects(await getProjects());
    } catch {
      setMessage({ tone: "error", text: "Projects could not be loaded. Try again." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => void loadProjects(), [loadProjects]);
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const resetForm = () => {
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (operationRef.current) return;
    operationRef.current = true;
    setMessage(null);
    setBusy(file ? "upload" : "save");

    try {
      let image = form.image;
      if (file) {
        image = await uploadToCloudinary(file);
        setBusy("save");
      }
      if (!image) throw new Error("Project image is required.");
      const payload = {
        ...form,
        title: form.title.trim(),
        type: form.type,
        tools: form.tools.trim(),
        description: form.description.trim(),
        role: form.role.trim(),
        demoUrl: form.demoUrl.trim(),
        repoUrl: form.repoUrl.trim(),
        image,
        link: form.demoUrl.trim() || form.repoUrl.trim(),
      };

      if (editing) await updateProject(editing, payload);
      else await addProject(payload);

      resetForm();
      setMessage({ tone: "success", text: editing ? "Project updated." : "Project added." });
      try {
        setProjects(await getProjects());
      } catch {
        setMessage({ tone: "error", text: "Saved, but the list could not be refreshed." });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Project could not be saved.",
      });
    } finally {
      operationRef.current = false;
      setBusy(null);
    }
  };

  const handleEdit = (project: ProjectDoc) => {
    const links = projectLinks(project);
    setForm({
      title: project.title,
      type: project.type,
      tools: project.tools,
      description: project.description || "",
      role: project.role || "",
      demoUrl: links.demoUrl || "",
      repoUrl: links.repoUrl || "",
      image: project.image,
      featured: project.featured,
    });
    setEditing(project.id || null);
    setFile(null);
    setPreview(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async () => {
    if (!deleting?.id || operationRef.current) return;
    operationRef.current = true;
    setBusy("delete");
    setMessage(null);
    try {
      await deleteProject(deleting.id);
      setProjects((items) => items.filter((item) => item.id !== deleting.id));
      setDeleting(null);
      setMessage({ tone: "success", text: "Project deleted." });
    } catch {
      setMessage({ tone: "error", text: "Project could not be deleted." });
    } finally {
      operationRef.current = false;
      setBusy(null);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-deep px-4 py-10 text-foreground sm:px-6 md:px-10">
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Manage Projects</h1>
            <p className="mt-2 text-sm text-ink-secondary">Publish complete, accurate portfolio case summaries.</p>
          </div>
          <button type="button" onClick={() => router.push("/dashboard")} className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl bg-surface-input px-4 font-semibold ring-1 ring-contrast/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8D78FF]">
            <FiArrowLeft aria-hidden="true" /> Back
          </button>
          <ThemeToggle />
        </header>

        {message && (
          <div role={message.tone === "error" ? "alert" : "status"} className={`mb-6 rounded-xl border px-4 py-3 text-sm ${message.tone === "error" ? "border-red-400/30 bg-red-400/10 text-red-800 dark:text-red-100" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-800 dark:text-emerald-100"}`}>
            {message.text}
          </div>
        )}

        <section className="mb-10 overflow-hidden rounded-2xl border border-contrast/10 bg-surface-admin-card/80">
          <div className="flex items-center justify-between border-b border-contrast/10 px-6 py-4">
            <div>
              <h2 className="text-lg font-bold">{editing ? "Update Project" : "Add Project"}</h2>
              <p className="mt-1 text-xs text-ink-secondary">Required fields are marked with an asterisk.</p>
            </div>
            {editing && <button type="button" onClick={resetForm} disabled={busy !== null} className="text-sm text-theme-accent underline underline-offset-4">Cancel edit</button>}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 p-6 lg:grid-cols-3">
            <div className="grid gap-5 lg:col-span-2 md:grid-cols-2">
              <Field label="Title *"><input required maxLength={160} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={fieldClass} /></Field>
              <Field label="Type *">
                <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as ProjectType })} className={fieldClass}>
                  <option value="Website">Website</option><option value="Mobile App">Mobile App</option>
                </select>
              </Field>
              <Field label="Your role"><input maxLength={300} placeholder="Full-stack developer" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={fieldClass} /></Field>
              <div className="md:col-span-2"><Field label="Technology *"><input required maxLength={1000} placeholder="Next.js, Tailwind CSS, Firebase" value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })} className={fieldClass} /></Field></div>
              <Field label="Live demo URL"><input type="url" maxLength={2048} placeholder="https://…" value={form.demoUrl} onChange={(e) => setForm({ ...form, demoUrl: e.target.value })} className={fieldClass} /></Field>
              <Field label="Repository URL"><input type="url" maxLength={2048} placeholder="https://github.com/…" value={form.repoUrl} onChange={(e) => setForm({ ...form, repoUrl: e.target.value })} className={fieldClass} /></Field>
              <div className="md:col-span-2"><Field label="Description *"><textarea required maxLength={5000} rows={6} placeholder="What the project does, the problem it solves, and your contribution." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${fieldClass} resize-y`} /></Field></div>
              <label className="md:col-span-2 flex cursor-pointer items-start gap-3 rounded-xl border border-contrast/10 bg-surface-input p-4">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="mt-1 h-4 w-4 accent-[#7257FF]" />
                <span><span className="block text-sm font-semibold text-ink-strong">Featured project</span><span className="mt-1 block text-xs leading-5 text-ink-secondary">Featuring this project automatically removes the featured status from the previous selection.</span></span>
              </label>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="project-image" className="flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-contrast/15 bg-surface-input p-5 text-center transition hover:bg-surface-input-hover focus-within:ring-2 focus-within:ring-[#8D78FF]">
                {preview || form.image ? <SafeImage src={preview || form.image} alt="Project image preview" className="aspect-video w-full rounded-xl object-cover" /> : <><FiUploadCloud className="text-3xl text-theme-accent" aria-hidden="true" /><span className="font-semibold">Choose project image</span><span className="text-xs text-ink-secondary">JPG, PNG, or WebP · max 5 MB</span></>}
                <input id="project-image" ref={fileRef} type="file" required={!form.image} accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>
              {(preview || form.image) && <button type="button" disabled={busy !== null} onClick={() => { setFile(null); setPreview(null); setForm({ ...form, image: "" }); if (fileRef.current) fileRef.current.value = ""; }} className="min-h-11 rounded-xl border border-red-400/25 text-sm text-red-800 dark:text-red-200">Remove image</button>}
              <button type="submit" disabled={busy !== null} className="min-h-12 rounded-xl bg-[#6311E1] px-6 font-bold transition hover:bg-[#7257FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7AAFF] disabled:cursor-wait disabled:opacity-60 text-white">
                {busy === "upload" ? "Uploading…" : busy === "save" ? "Saving…" : editing ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-contrast/10 bg-surface-admin-card/80">
          <div className="flex items-center justify-between border-b border-contrast/10 px-6 py-4">
            <h2 className="text-lg font-bold">Project List</h2>
            <button type="button" onClick={loadProjects} disabled={loading || busy !== null} className="text-sm text-theme-accent disabled:opacity-50">{loading ? "Loading…" : `${projects.length} projects · Refresh`}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <caption className="sr-only">Projects available in the portfolio</caption>
              <thead><tr className="border-b border-contrast/10 text-xs uppercase tracking-wider text-ink-secondary"><th className="p-4">Project</th><th className="p-4">Featured</th><th className="p-4">Technology</th><th className="p-4">Links</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {!loading && projects.map((project) => {
                  const links = projectLinks(project);
                  return <tr key={project.id} className="border-b border-contrast/10 align-top last:border-0">
                    <td className="p-4"><p className="font-semibold">{project.title}</p><p className="mt-1 text-xs text-ink-secondary">{project.type}</p></td>
                    <td className="p-4 text-ink-soft">{project.featured ? "Yes" : "No"}</td>
                    <td className="max-w-xs p-4 text-ink-soft">{project.tools}</td>
                    <td className="p-4 text-theme-accent">{links.demoUrl ? "Demo " : ""}{links.repoUrl ? "Repository" : ""}{!links.demoUrl && !links.repoUrl ? "—" : ""}</td>
                    <td className="p-4"><div className="flex gap-2"><button type="button" onClick={() => handleEdit(project)} disabled={busy !== null} className="min-h-10 rounded-lg bg-surface-raised px-4 text-theme-accent">Edit</button><button type="button" onClick={() => setDeleting(project)} disabled={busy !== null} className="min-h-10 rounded-lg border border-red-400/25 px-4 text-red-800 dark:text-red-200">Delete</button></div></td>
                  </tr>;
                })}
                {!loading && projects.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-ink-secondary">No project data yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {deleting && <ConfirmDialog title="Delete project?" description={<>Delete <strong>{deleting.title}</strong> permanently?</>} busy={busy === "delete"} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />}
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm text-ink-soft">{label}</span>{children}</label>;
}
