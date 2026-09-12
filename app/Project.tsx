"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import SafeImage from "@/app/components/SafeImage";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconBrandGithub,
  IconCode,
  IconExternalLink,
  IconFolderOpen,
  IconPhoto,
} from "@tabler/icons-react";
import {
  SiAndroid,
  SiAxios,
  SiBootstrap,
  SiCloudinary,
  SiCodeigniter,
  SiCss3,
  SiDart,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFigma,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiJson,
  SiJsonwebtokens,
  SiKotlin,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedux,
  SiSupabase,
  SiStreamlit,
  SiTailwindcss,
  SiTensorflow,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
  SiXampp,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { getProjects, ProjectDoc } from "../lib/firestoreCrud";
import { projectLinks } from "../lib/content";

type ProjectFilter = "all" | "web" | "mobile";

const gridProjectsPerPage = 6;

const projectFilters: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "--all" },
  { value: "web", label: "--web" },
  { value: "mobile", label: "--mobile" },
];

type ToolMeta = {
  Icon: IconType;
  color: string;
};

const toolIcons: Record<string, ToolMeta> = {
  android: { Icon: SiAndroid, color: "#3DDC84" },
  api: { Icon: SiPostman, color: "#FF6C37" },
  axios: { Icon: SiAxios, color: "#5A29E4" },
  bootstrap: { Icon: SiBootstrap, color: "#7952B3" },
  ci: { Icon: SiCodeigniter, color: "#EF4223" },
  cloudinary: { Icon: SiCloudinary, color: "#3448C5" },
  codeigniter: { Icon: SiCodeigniter, color: "#EF4223" },
  css: { Icon: SiCss3, color: "#1572B6" },
  css3: { Icon: SiCss3, color: "#1572B6" },
  dart: { Icon: SiDart, color: "#0175C2" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  expo: { Icon: SiExpo, color: "#F8FAFC" },
  express: { Icon: SiExpress, color: "#F8FAFC" },
  "express.js": { Icon: SiExpress, color: "#F8FAFC" },
  expressjs: { Icon: SiExpress, color: "#F8FAFC" },
  firebase: { Icon: SiFirebase, color: "#FFCA28" },
  figma: { Icon: SiFigma, color: "#F24E1E" },
  flutter: { Icon: SiFlutter, color: "#02569B" },
  framer: { Icon: SiFramer, color: "#8AA2FF" },
  "framer motion": { Icon: SiFramer, color: "#8AA2FF" },
  git: { Icon: SiGit, color: "#F05032" },
  github: { Icon: SiGithub, color: "#F8FAFC" },
  html: { Icon: SiHtml5, color: "#E34F26" },
  html5: { Icon: SiHtml5, color: "#E34F26" },
  java: { Icon: SiOpenjdk, color: "#F89820" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  jquery: { Icon: SiJquery, color: "#0769AD" },
  json: { Icon: SiJson, color: "#F8FAFC" },
  jwt: { Icon: SiJsonwebtokens, color: "#D63AFF" },
  kotlin: { Icon: SiKotlin, color: "#A97BFF" },
  laravel: { Icon: SiLaravel, color: "#FF2D20" },
  js: { Icon: SiJavascript, color: "#F7DF1E" },
  "js native": { Icon: SiJavascript, color: "#F7DF1E" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  mysql: { Icon: SiMysql, color: "#4479A1" },
  netlify: { Icon: SiNetlify, color: "#00C7B7" },
  next: { Icon: SiNextdotjs, color: "#F8FAFC" },
  "next js": { Icon: SiNextdotjs, color: "#F8FAFC" },
  "next.js": { Icon: SiNextdotjs, color: "#F8FAFC" },
  nextjs: { Icon: SiNextdotjs, color: "#F8FAFC" },
  node: { Icon: SiNodedotjs, color: "#5FA04E" },
  "node js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E" },
  npm: { Icon: SiNpm, color: "#CB3837" },
  php: { Icon: SiPhp, color: "#777BB4" },
  postgresql: { Icon: SiPostgresql, color: "#4169E1" },
  postgres: { Icon: SiPostgresql, color: "#4169E1" },
  postman: { Icon: SiPostman, color: "#FF6C37" },
  prisma: { Icon: SiPrisma, color: "#F8FAFC" },
  python: { Icon: SiPython, color: "#FFD43B" },
  react: { Icon: SiReact, color: "#61DAFB" },
  "react js": { Icon: SiReact, color: "#61DAFB" },
  "react.js": { Icon: SiReact, color: "#61DAFB" },
  reactjs: { Icon: SiReact, color: "#61DAFB" },
  "react native": { Icon: SiReact, color: "#61DAFB" },
  redux: { Icon: SiRedux, color: "#764ABC" },
  supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  streamlit: { Icon: SiStreamlit, color: "#FF4B4B" },
  tailwind: { Icon: SiTailwindcss, color: "#38BDF8" },
  "tailwind css": { Icon: SiTailwindcss, color: "#38BDF8" },
  "tailwind-css": { Icon: SiTailwindcss, color: "#38BDF8" },
  tailwindcss: { Icon: SiTailwindcss, color: "#38BDF8" },
  tensorflow: { Icon: SiTensorflow, color: "#FF6F00" },
  three: { Icon: SiThreedotjs, color: "#F8FAFC" },
  "three.js": { Icon: SiThreedotjs, color: "#F8FAFC" },
  threejs: { Icon: SiThreedotjs, color: "#F8FAFC" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  ts: { Icon: SiTypescript, color: "#3178C6" },
  vercel: { Icon: SiVercel, color: "#F8FAFC" },
  vite: { Icon: SiVite, color: "#B469FF" },
  xampp: { Icon: SiXampp, color: "#FB7A24" },
};

const splitTools = (tools: string) =>
  tools
    .split(/[,;|/]+|\n/g)
    .map((tool) => tool.trim())
    .filter(Boolean);

const normalizeTool = (tool: string) =>
  tool
    .toLowerCase()
    .trim()
    .replace(/[()]/g, "")
    .replace(/\s+/g, " ");

const compactTool = (tool: string) => normalizeTool(tool).replace(/[\s._-]/g, "");

const getToolMeta = (tool: string) => {
  const normalized = normalizeTool(tool);
  const compact = compactTool(tool);

  return toolIcons[normalized] ?? toolIcons[compact];
};

const isFeaturedProject = (project: ProjectDoc) => project.featured;

const getProjectPlatform = (project: ProjectDoc): Exclude<ProjectFilter, "all"> =>
  project.type === "Mobile App" ? "mobile" : "web";

const getFilterLabel = (filter: ProjectFilter) =>
  projectFilters.find((item) => item.value === filter)?.label ?? "--all";

function ToolBadge({ name }: { name: string }) {
  const meta = getToolMeta(name);

  return (
    <span
      title={name}
      className="theme-shadow inline-flex h-9 max-w-full items-center gap-2 rounded-full border border-contrast/10 bg-contrast/[0.055] px-3 text-ink-badge shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8D78FF]/35 hover:bg-[#7257FF]/16"
    >
      {meta ? (
        <meta.Icon
          className="technology-icon h-4 w-4 shrink-0"
          style={{ color: meta.color }}
          aria-hidden="true"
        />
      ) : (
        <IconCode
          className="h-4 w-4 shrink-0 text-theme-accent"
          stroke={1.7}
          aria-hidden="true"
        />
      )}
      <span className="max-w-36 truncate text-xs font-medium">{name}</span>
    </span>
  );
}

function ProjectSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[28px] border border-contrast/10 bg-contrast/[0.035] p-3"
        >
          <div className="h-56 rounded-[22px] bg-gradient-to-r from-surface-skeleton via-surface-skeleton-highlight to-surface-skeleton bg-[length:220%_100%] animate-[project-shimmer_1.6s_infinite]" />
          <div className="px-2 pb-2 pt-5">
            <div className="h-4 w-20 rounded-full bg-gradient-to-r from-surface-skeleton via-surface-skeleton-highlight to-surface-skeleton bg-[length:220%_100%] animate-[project-shimmer_1.6s_infinite]" />
            <div className="mt-4 h-7 w-3/4 rounded-full bg-gradient-to-r from-surface-skeleton via-surface-skeleton-highlight to-surface-skeleton bg-[length:220%_100%] animate-[project-shimmer_1.6s_infinite]" />
            <div className="mt-5 flex gap-2">
              {Array.from({ length: 4 }).map((_, toolIndex) => (
                <div
                  key={toolIndex}
                  className="h-9 w-9 rounded-full bg-gradient-to-r from-surface-skeleton via-surface-skeleton-highlight to-surface-skeleton bg-[length:220%_100%] animate-[project-shimmer_1.6s_infinite]"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectDoc; index: number }) {
  const tools = splitTools(project.tools);
  const detailHref = project.id ? `/projects/${project.id}` : undefined;
  const links = projectLinks(project);
  const externalUrl = links.demoUrl || links.repoUrl;
  const externalLabel = links.demoUrl ? "Preview" : "GitHub";
  const ExternalIcon = links.demoUrl ? IconExternalLink : IconBrandGithub;

  return (
    <article
      data-aos="fade-up"
      data-aos-duration="750"
      data-aos-delay={(index % gridProjectsPerPage) * 65}
      className="theme-shadow project-card group relative overflow-hidden rounded-[28px] border border-contrast/10 bg-contrast/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(10,4,35,0.22)] backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:border-[#8D78FF]/40 hover:bg-contrast/[0.055]"
      style={{ animationDelay: `${(index % 5) * 0.45}s` }}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#7257FF]/18 blur-[90px] transition duration-500 group-hover:bg-[#8D78FF]/25"
        aria-hidden="true"
      />
      <div
        className="project-shine pointer-events-none absolute inset-y-0 -left-2 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-700 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[22px] border border-contrast/10 bg-surface-page">
        {project.image ? (
          <SafeImage
            src={project.image}
            alt={`${project.title} project preview`}
            className="h-56 w-full object-cover transition duration-700 group-hover:scale-[1.045] sm:h-64"
          />
        ) : (
          <div className="flex h-56 w-full items-center justify-center bg-surface-image-placeholder text-ink-muted sm:h-64">
            <IconPhoto size={32} stroke={1.5} aria-hidden="true" />
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E18]/88 via-[#0E0E18]/12 to-transparent opacity-90"
          aria-hidden="true"
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#131320]/70 px-3 py-1.5 text-[11px] font-medium text-[#D8D1FF] backdrop-blur-xl">
          {project.type}
        </div>
      </div>

      <div className="relative px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-foreground sm:text-2xl">
            {project.title}
          </h3>
          <span
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-contrast/10 bg-contrast/[0.045] text-theme-accent transition duration-300 group-hover:rotate-12 group-hover:border-[#8D78FF]/35 group-hover:bg-[#7257FF]/20"
            aria-hidden="true"
          >
            <IconArrowUpRight size={17} stroke={1.7} />
          </span>
        </div>

        {tools.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tools.slice(0, 4).map((tool) => (
              <ToolBadge key={`${project.title}-${tool}`} name={tool} />
            ))}
            {tools.length > 4 && (
              <span
                title={tools.slice(4).join(", ")}
                aria-label={`${tools.length - 4} more technologies: ${tools.slice(4).join(", ")}`}
                className="inline-flex h-9 items-center rounded-full border border-[#8D78FF]/20 bg-[#7257FF]/12 px-3 text-xs font-semibold text-theme-accent"
              >
                +{tools.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {detailHref && <a
            href={detailHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#8D78FF]/25 bg-[#7257FF]/18 px-4 py-2.5 text-sm font-semibold text-foreground transition duration-300 hover:border-[#B7AAFF]/45 hover:bg-[#7257FF]/28 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/25 active:translate-y-px"
          >
            View detail
            <IconArrowRight size={16} stroke={1.7} aria-hidden="true" />
          </a>}
          {externalUrl && <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-contrast/10 bg-contrast/[0.045] px-4 py-2.5 text-sm font-semibold text-ink-strong transition duration-300 hover:border-[#8D78FF]/35 hover:bg-contrast/[0.07] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/20 active:translate-y-px"
          >
            <ExternalIcon size={16} stroke={1.7} aria-hidden="true" />
            {externalLabel}
          </a>}
        </div>
      </div>
    </article>
  );
}

function FeaturedProject({ project }: { project: ProjectDoc }) {
  const tools = splitTools(project.tools);
  const detailHref = project.id ? `/projects/${project.id}` : undefined;
  const links = projectLinks(project);
  const externalUrl = links.demoUrl || links.repoUrl;
  const externalLabel = links.demoUrl ? "Preview" : "GitHub";
  const ExternalIcon = links.demoUrl ? IconExternalLink : IconBrandGithub;

  return (
    <article
      data-aos="fade-up"
      data-aos-duration="800"
      className="theme-shadow group relative overflow-hidden rounded-[30px] border border-[#8D78FF]/20 bg-surface-featured/76 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_34px_110px_rgba(10,4,35,0.34)] backdrop-blur-xl lg:p-4"
    >
      <div
        className="pointer-events-none absolute -left-28 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#7257FF]/24 blur-[110px] transition duration-700 group-hover:bg-[#8D78FF]/30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#2B0780]/28 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)] lg:items-stretch">
        <div className="relative min-h-72 overflow-hidden rounded-[24px] border border-contrast/10 bg-surface-page sm:min-h-[26rem] lg:min-h-[30rem]">
          {project.image ? (
            <SafeImage
              src={project.image}
              alt={`${project.title} flagship project preview`}
              eager
              className="h-full min-h-72 w-full object-cover transition duration-700 group-hover:scale-[1.025] sm:min-h-[26rem] lg:min-h-[30rem]"
            />
          ) : (
            <div className="flex h-full min-h-72 w-full items-center justify-center bg-surface-image-placeholder text-ink-muted sm:min-h-[26rem] lg:min-h-[30rem]">
              <IconPhoto size={40} stroke={1.5} aria-hidden="true" />
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B15]/86 via-transparent to-[#0B0B15]/12"
            aria-hidden="true"
          />
        </div>

        <div className="relative flex flex-col justify-center px-2 pb-3 pt-1 sm:px-4 lg:px-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-theme-accent">
            FLAGSHIP PROJECT
          </p>
          <h3 className="mt-4 text-[clamp(2.75rem,6vw,5.75rem)] font-bold leading-[0.94] tracking-[-0.04em] text-foreground">
            {project.title}
          </h3>
          <p className="mt-6 max-w-xl text-pretty text-sm leading-7 text-ink-description md:text-[15px]">
            {project.description || "Explore the project details, technology, and available links."}
          </p>

          {tools.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2.5">
              {tools.slice(0, 4).map((tool) => (
                <ToolBadge key={`featured-${project.title}-${tool}`} name={tool} />
              ))}
              {tools.length > 4 && (
                <span
                  title={tools.slice(4).join(", ")}
                  aria-label={`${tools.length - 4} more technologies: ${tools.slice(4).join(", ")}`}
                  className="inline-flex h-9 items-center rounded-full border border-[#8D78FF]/20 bg-[#7257FF]/12 px-3 text-xs font-semibold text-theme-accent"
                >
                  +{tools.length - 4} more
                </span>
              )}
            </div>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-md">
            {detailHref && <a
              href={detailHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#8D78FF]/30 bg-[#7257FF]/24 px-5 py-3 text-sm font-semibold text-foreground transition duration-300 hover:border-[#B7AAFF]/50 hover:bg-[#7257FF]/34 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/25 active:translate-y-px"
            >
              View detail
              <IconArrowRight size={16} stroke={1.7} aria-hidden="true" />
            </a>}
            {externalUrl && <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-contrast/10 bg-contrast/[0.045] px-5 py-3 text-sm font-semibold text-ink-strong transition duration-300 hover:border-[#8D78FF]/35 hover:bg-contrast/[0.07] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/20 active:translate-y-px"
            >
              <ExternalIcon size={16} stroke={1.7} aria-hidden="true" />
              {externalLabel}
            </a>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Project() {
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [loadError, setLoadError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  const featuredProject = useMemo(
    () => projects.find((project) => isFeaturedProject(project)),
    [projects]
  );
  const archiveProjects = useMemo(
    () => projects.filter((project) => !isFeaturedProject(project)),
    [projects]
  );
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return archiveProjects;
    }

    return archiveProjects.filter(
      (project) => getProjectPlatform(project) === activeFilter
    );
  }, [activeFilter, archiveProjects]);

  const totalPages = Math.ceil(filteredProjects.length / gridProjectsPerPage);
  const indexOfLast = currentPage * gridProjectsPerPage;
  const indexOfFirst = indexOfLast - gridProjectsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const paginate = (page: number) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  const prevPage = () => setCurrentPage((page) => Math.max(page - 1, 1));

  return (
    <section
      id="project"
      className="relative overflow-hidden bg-surface-section px-5 py-24 font-sans sm:px-8 md:px-16 md:py-32 lg:px-24 xl:px-32"
    >
      <style jsx global>{`
        @keyframes project-shimmer {
          0% {
            background-position: 220% 0;
          }
          100% {
            background-position: -220% 0;
          }
        }

        @keyframes project-card-drift {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes project-shine-pass {
          0% {
            transform: translateX(-160%) skewX(-12deg);
          }
          100% {
            transform: translateX(560%) skewX(-12deg);
          }
        }

        @keyframes project-halo-pulse {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 0.82;
            transform: scale(1.08);
          }
        }

        .project-card {
          animation: project-card-drift 8s ease-in-out infinite;
        }

        .project-card:hover {
          animation-play-state: paused;
        }

        .project-card:hover .project-shine {
          animation: project-shine-pass 1.05s ease forwards;
        }

        .project-halo {
          animation: project-halo-pulse 9s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .project-card,
          .project-halo,
          .project-card:hover .project-shine {
            animation: none;
          }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]"
        aria-hidden="true"
      />
      <div
        className="project-halo pointer-events-none absolute -left-48 top-20 h-[34rem] w-[34rem] rounded-full bg-[#7257FF]/18 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="project-halo pointer-events-none absolute -right-56 bottom-24 h-[32rem] w-[32rem] rounded-full bg-[#2B0780]/24 blur-[150px] [animation-delay:2.4s]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface-page to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div
          data-aos="fade-down"
          data-aos-duration="700"
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
            Projects
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2.65rem,5.6vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-foreground">
            Selected work, built with care.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-7 text-ink-secondary md:text-[15px]">
            A closer look at web and mobile products I have designed,
            developed, and shipped using modern frontend and full-stack tools.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="750"
          className="mx-auto mt-12 max-w-4xl border-y border-contrast/10 py-4 sm:mt-14"
        >
          <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-ink-secondary sm:flex-row sm:gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-contrast/10 bg-contrast/[0.045] text-theme-accent">
              <IconFolderOpen size={18} stroke={1.6} aria-hidden="true" />
            </span>
            <span>
              {loading
                ? "Loading project archive"
                : `${archiveProjects.length} archive project${
                    archiveProjects.length === 1 ? "" : "s"
                  }${featuredProject ? " plus 1 flagship" : ""}`}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-[#8D78FF]/70 sm:block" />
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              Showing 6 per page
            </span>
          </div>
        </div>

        {!loading && featuredProject && (
          <div className="mt-12 sm:mt-16">
            <FeaturedProject project={featuredProject} />
          </div>
        )}

        {!loading && archiveProjects.length > 0 && (
          <div
            data-aos="fade-up"
            data-aos-duration="650"
            className="mt-12 flex flex-col gap-4 border-t border-contrast/10 pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono text-xs text-theme-accent">
                filter projects {getFilterLabel(activeFilter)}
              </p>
              <p className="mt-2 text-sm text-ink-secondary">
                {filteredProjects.length} result
                {filteredProjects.length === 1 ? "" : "s"} in this view
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    className={`min-h-10 rounded-full border px-4 font-mono text-xs font-semibold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/20 active:translate-y-px ${
                      isActive
                        ? "border-[#8D78FF]/50 bg-[#7257FF]/24 text-foreground shadow-[0_0_28px_rgba(114,87,255,0.28)]"
                        : "border-contrast/10 bg-contrast/[0.04] text-ink-secondary hover:border-[#8D78FF]/35 hover:bg-contrast/[0.07] hover:text-theme-accent"
                    }`}
                    aria-pressed={isActive}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 sm:mt-10">
          {loading ? (
            <ProjectSkeleton />
          ) : loadError ? (
            <div role="alert" className="rounded-[28px] border border-red-400/20 bg-red-400/[0.06] px-6 py-14 text-center text-red-800 dark:text-red-100">
              Projects could not be loaded. Please refresh the page and try again.
            </div>
          ) : currentItems.length > 0 ? (
            <motion.div
              layout
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {currentItems.map((project, index) => (
                  <motion.div
                    key={project.id ?? `${project.title}-${index}`}
                    layout
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 18 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion ? undefined : { opacity: 0, y: -12 }
                    }
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              className="rounded-[28px] border border-contrast/10 bg-contrast/[0.035] px-6 py-14 text-center backdrop-blur-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-contrast/10 bg-contrast/[0.045] text-theme-accent">
                <IconFolderOpen size={24} stroke={1.6} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                No projects found
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-ink-secondary">
                Try another project type or add more projects from the
                dashboard.
              </p>
            </div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-contrast/10 bg-contrast/[0.045] px-4 text-sm font-semibold text-foreground transition hover:border-[#8D78FF]/35 hover:bg-contrast/[0.07] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/20 disabled:pointer-events-none disabled:opacity-40"
            >
              <IconArrowLeft size={16} stroke={1.7} aria-hidden="true" />
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                type="button"
                onClick={() => paginate(index + 1)}
                className={`h-11 min-w-11 rounded-full px-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/20 ${
                  currentPage === index + 1
                    ? "bg-[#7257FF] text-white shadow-[0_0_28px_rgba(114,87,255,0.35)]"
                    : "border border-contrast/10 bg-contrast/[0.045] text-theme-accent hover:border-[#8D78FF]/35 hover:bg-contrast/[0.07]"
                }`}
                aria-label={`Go to project page ${index + 1}`}
                aria-current={currentPage === index + 1 ? "page" : undefined}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-contrast/10 bg-contrast/[0.045] px-4 text-sm font-semibold text-foreground transition hover:border-[#8D78FF]/35 hover:bg-contrast/[0.07] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/20 disabled:pointer-events-none disabled:opacity-40"
            >
              Next
              <IconArrowRight size={16} stroke={1.7} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
