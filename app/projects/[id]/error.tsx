"use client";

export default function ProjectError({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-surface-page px-6 text-center text-foreground">
      <div role="alert">
        <h1 className="text-3xl font-semibold">Project could not be loaded</h1>
        <p className="mt-3 text-ink-secondary">Check your connection and try again.</p>
        <button type="button" onClick={reset} className="mt-6 min-h-11 rounded-full bg-[#7257FF] px-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7AAFF] text-white">
          Try again
        </button>
      </div>
    </main>
  );
}
