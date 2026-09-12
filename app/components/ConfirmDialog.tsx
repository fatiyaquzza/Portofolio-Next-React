"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

type Props = {
  title: string;
  description: React.ReactNode;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({ title, description, busy, onCancel, onConfirm }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
      opener?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onCancel();
      }}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      className="theme-shadow m-auto w-[min(92vw,25rem)] rounded-2xl border border-contrast/10 bg-surface-admin-card p-6 text-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <AlertTriangle className="mx-auto h-12 w-12 text-amber-800 dark:text-amber-300" aria-hidden="true" />
      <h2 id="confirm-title" className="mt-4 text-center text-xl font-bold">{title}</h2>
      <div id="confirm-description" className="mt-2 text-center text-sm leading-6 text-ink-soft">
        {description}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onConfirm}
          disabled={busy}
          autoFocus
          className="min-h-11 rounded-xl bg-red-600 px-5 font-semibold transition hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 disabled:cursor-wait disabled:opacity-60 text-white"
        >
          {busy ? "Deleting…" : "Delete"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="min-h-11 rounded-xl bg-surface-button px-5 font-semibold transition hover:bg-surface-button-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B89FF] disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
