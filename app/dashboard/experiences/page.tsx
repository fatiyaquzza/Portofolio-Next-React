"use client";
import ThemeToggle from "@/app/components/ThemeToggle";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import {
  addExperience,
  deleteExperience,
  Experience,
  getExperiences,
  updateExperience,
} from "@/lib/firestoreCrud";

type FormState = {
  title: string;
  company: string;
  year: string;
  description: string;
  order: string;
};

const emptyForm: FormState = { title: "", company: "", year: "", description: "", order: "" };
const fieldClass = "w-full rounded-xl bg-surface-panel px-4 py-3 text-foreground ring-1 ring-inset ring-contrast/10 outline-none transition placeholder:text-ink-secondary focus:ring-2 focus:ring-[#8D78FF] disabled:opacity-60";

export default function ExperienceCRUD() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<"save" | "delete" | null>(null);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const operationRef = useRef(false);
  const router = useRouter();

  const loadExperiences = useCallback(async () => {
    setLoading(true);
    try {
      setExperiences(await getExperiences());
    } catch {
      setMessage({ tone: "error", text: "Experiences could not be loaded. Try again." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => void loadExperiences(), [loadExperiences]);

  const resetForm = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (operationRef.current) return;
    operationRef.current = true;
    setBusy("save");
    setMessage(null);
    try {
      const payload = {
        title: form.title.trim(),
        company: form.company.trim(),
        year: form.year.trim(),
        description: form.description.trim(),
      };
      if (editing) {
        await updateExperience(editing, {
          ...payload,
          order: form.order === "" ? null : Number(form.order),
        });
      } else {
        await addExperience({
          ...payload,
          ...(form.order === "" ? {} : { order: Number(form.order) }),
        });
      }

      resetForm();
      setMessage({ tone: "success", text: editing ? "Experience updated." : "Experience added." });
      try {
        setExperiences(await getExperiences());
      } catch {
        setMessage({ tone: "error", text: "Saved, but the list could not be refreshed." });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setMessage({ tone: "error", text: "Experience could not be saved." });
    } finally {
      operationRef.current = false;
      setBusy(null);
    }
  };

  const handleEdit = (experience: Experience) => {
    setForm({
      title: experience.title,
      company: experience.company,
      year: experience.year,
      description: experience.description,
      order: experience.order === undefined ? "" : String(experience.order),
    });
    setEditing(experience.id || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async () => {
    if (!deleting?.id || operationRef.current) return;
    operationRef.current = true;
    setBusy("delete");
    setMessage(null);
    try {
      await deleteExperience(deleting.id);
      setExperiences((items) => items.filter((item) => item.id !== deleting.id));
      setDeleting(null);
      setMessage({ tone: "success", text: "Experience deleted." });
    } catch {
      setMessage({ tone: "error", text: "Experience could not be deleted." });
    } finally {
      operationRef.current = false;
      setBusy(null);
    }
  };

  return (
    <main className="min-h-screen bg-surface-deep px-4 py-10 text-foreground sm:px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Manage Experience</h1>
            <p className="mt-2 text-sm text-ink-secondary">Use order 1 for the first item, 2 for the next, and so on.</p>
          </div>
          <button type="button" onClick={() => router.push("/dashboard")} className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl bg-surface-input px-4 font-semibold ring-1 ring-contrast/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8D78FF]"><FiArrowLeft aria-hidden="true" /> Back</button>
          <ThemeToggle />
        </header>

        {message && <div role={message.tone === "error" ? "alert" : "status"} className={`mb-6 rounded-xl border px-4 py-3 text-sm ${message.tone === "error" ? "border-red-400/30 bg-red-400/10 text-red-800 dark:text-red-100" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-800 dark:text-emerald-100"}`}>{message.text}</div>}

        <section className="mb-10 overflow-hidden rounded-2xl border border-contrast/10 bg-surface-admin-card/80">
          <div className="flex items-center justify-between border-b border-contrast/10 px-6 py-4">
            <div><h2 className="text-lg font-bold">{editing ? "Update Experience" : "Add Experience"}</h2><p className="mt-1 text-xs text-ink-secondary">Required fields are marked with an asterisk.</p></div>
            {editing && <button type="button" onClick={resetForm} disabled={busy !== null} className="text-sm text-theme-accent underline underline-offset-4">Cancel edit</button>}
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5 p-6 md:grid-cols-2">
            <Field label="Title *"><input required maxLength={160} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={fieldClass} /></Field>
            <Field label="Company *"><input required maxLength={160} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={fieldClass} /></Field>
            <Field label="Period *"><input required maxLength={80} placeholder="Sep 2024 – Feb 2025" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className={fieldClass} /></Field>
            <Field label="Display order"><input type="number" min="0" max="9999" step="1" placeholder="Items without an order appear last" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={fieldClass} /></Field>
            <div className="md:col-span-2"><Field label="Description *"><textarea required maxLength={3000} rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${fieldClass} resize-y`} /></Field></div>
            <button type="submit" disabled={busy !== null} className="min-h-12 rounded-xl bg-[#6311E1] px-6 font-bold transition hover:bg-[#7257FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7AAFF] disabled:cursor-wait disabled:opacity-60 text-white">{busy === "save" ? "Saving…" : editing ? "Update Experience" : "Add Experience"}</button>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-contrast/10 bg-surface-admin-card/80">
          <div className="flex items-center justify-between border-b border-contrast/10 px-6 py-4"><h2 className="text-lg font-bold">Experience List</h2><button type="button" onClick={loadExperiences} disabled={loading || busy !== null} className="text-sm text-theme-accent disabled:opacity-50">{loading ? "Loading…" : `${experiences.length} items · Refresh`}</button></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <caption className="sr-only">Experiences in their public display order</caption>
              <thead><tr className="border-b border-contrast/10 text-xs uppercase tracking-wider text-ink-secondary"><th className="p-4">Order</th><th className="p-4">Title</th><th className="p-4">Company</th><th className="p-4">Period</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {!loading && experiences.map((experience) => <tr key={experience.id} className="border-b border-contrast/10 last:border-0"><td className="p-4 text-ink-soft">{experience.order ?? "—"}</td><td className="p-4 font-semibold">{experience.title}</td><td className="p-4 text-ink-soft">{experience.company}</td><td className="p-4 text-ink-soft">{experience.year}</td><td className="p-4"><div className="flex gap-2"><button type="button" onClick={() => handleEdit(experience)} disabled={busy !== null} className="min-h-10 rounded-lg bg-surface-raised px-4 text-theme-accent">Edit</button><button type="button" onClick={() => setDeleting(experience)} disabled={busy !== null} className="min-h-10 rounded-lg border border-red-400/25 px-4 text-red-800 dark:text-red-200">Delete</button></div></td></tr>)}
                {!loading && experiences.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-ink-secondary">No experience data yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {deleting && <ConfirmDialog title="Delete experience?" description={<>Delete <strong>{deleting.title}</strong> permanently?</>} busy={busy === "delete"} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />}
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm text-ink-soft">{label}</span>{children}</label>;
}
