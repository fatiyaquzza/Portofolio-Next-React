import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-surface-page px-6 text-center text-foreground">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-theme-accent">404</p>
        <h1 className="mt-3 text-3xl font-bold">Project not found</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-ink-detail">
          The project may have been removed or the link is no longer valid.
        </p>
        <Link href="/#project" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#7257FF] px-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7AAFF] text-white">
          Browse projects
        </Link>
      </div>
    </main>
  );
}
