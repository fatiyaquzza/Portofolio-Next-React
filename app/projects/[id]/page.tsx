import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { getProject } from "@/lib/firestoreCrud";
import { projectLinks } from "@/lib/content";
import SafeImage from "@/app/components/SafeImage";
import ThemeToggle from "@/app/components/ThemeToggle";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };
const getCachedProject = cache(getProject);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getCachedProject(id);
  if (!project) return { title: "Project not found" };

  const description =
    project.description || `${project.title}, a ${project.type} project by Fatiya Quzza.`;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${id}` },
    openGraph: {
      title: `${project.title} | Fatiya Quzza`,
      description,
      url: `/projects/${id}`,
      images: project.image ? [{ url: project.image, alt: project.title }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getCachedProject(id);
  if (!project) notFound();

  const links = projectLinks(project);
  const tools = project.tools
    .split(/[,;|/]+|\n/g)
    .map((tool) => tool.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-surface-page px-5 py-10 text-ink-heading sm:px-8 md:px-16 lg:px-24">
      <article className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
        <Link
          href="/#project"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-contrast/10 bg-contrast/[0.04] px-4 text-sm font-semibold text-theme-accent transition hover:border-[#8D78FF]/40 hover:bg-contrast/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8D78FF]"
        >
          <IconArrowLeft size={17} aria-hidden="true" />
          Back to projects
        </Link>
        <ThemeToggle />
        </div>

        <header className="mt-10 border-b border-contrast/10 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
            Project · {project.type}
          </p>
          <h1 className="mt-4 max-w-4xl text-balance text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.05em]">
            {project.title}
          </h1>
          {project.role && (
            <p className="mt-5 text-sm text-ink-detail">
              Role: <span className="text-ink-strong">{project.role}</span>
            </p>
          )}
        </header>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-contrast/10 bg-surface-image-placeholder">
          {project.image ? (
            <SafeImage
              src={project.image}
              alt={`${project.title} project preview`}
              eager
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="grid aspect-video place-items-center px-6 text-center text-ink-muted">
              Project image is not available yet.
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <section aria-labelledby="overview-title">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
              Overview
            </p>
            <h2 id="overview-title" className="sr-only">Project overview</h2>
            <p className="mt-4 max-w-3xl whitespace-pre-line text-pretty text-base leading-8 text-ink-description">
              {project.description || "A detailed project overview is being prepared."}
            </p>
          </section>

          <aside className="rounded-2xl border border-contrast/10 bg-contrast/[0.035] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-theme-accent">
              Technology
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li key={tool} className="rounded-full border border-[#8D78FF]/20 bg-[#7257FF]/12 px-3 py-1.5 text-xs text-theme-accent">
                  {tool}
                </li>
              ))}
            </ul>

            {(links.demoUrl || links.repoUrl) && (
              <div className="mt-7 grid gap-3 border-t border-contrast/10 pt-6">
                {links.demoUrl && (
                  <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#7257FF] px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7AAFF] text-white" href={links.demoUrl} target="_blank" rel="noopener noreferrer">
                    <IconExternalLink size={16} aria-hidden="true" /> Live demo
                  </a>
                )}
                {links.repoUrl && (
                  <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-contrast/10 bg-contrast/[0.04] px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7AAFF]" href={links.repoUrl} target="_blank" rel="noopener noreferrer">
                    <IconBrandGithub size={16} aria-hidden="true" /> Repository
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </article>
    </main>
  );
}
