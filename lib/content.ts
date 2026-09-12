export type TimestampLike = { toMillis(): number };

export type ProjectType = "Website" | "Mobile App";

export type Experience = {
  id?: string;
  title: string;
  company: string;
  year: string;
  description: string;
  order?: number;
  createdAt?: TimestampLike;
};

export type ProjectDoc = {
  id?: string;
  title: string;
  image: string;
  link: string;
  tools: string;
  type: ProjectType;
  description: string;
  role?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  createdAt?: TimestampLike;
};

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const optionalText = (value: unknown) => {
  const normalized = text(value);
  return normalized || undefined;
};

const timestamp = (value: unknown): TimestampLike | undefined =>
  typeof value === "object" &&
  value !== null &&
  "toMillis" in value &&
  typeof value.toMillis === "function"
    ? (value as TimestampLike)
    : undefined;

export function isSafeHttpUrl(value: string | undefined): value is string {
  if (!value || value === "#") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function parseExperience(id: string, data: Record<string, unknown>): Experience | null {
  const title = text(data.title);
  const company = text(data.company);
  const year = text(data.year);
  const description = text(data.description);
  if (!title || !company || !year || !description) return null;

  return {
    id,
    title,
    company,
    year,
    description,
    order:
      typeof data.order === "number" && Number.isFinite(data.order)
        ? data.order
        : undefined,
    createdAt: timestamp(data.createdAt),
  };
}

export function sortExperiences(rows: Experience[]) {
  return [...rows].sort((a, b) => {
    const aHasOrder = Number.isFinite(a.order);
    const bHasOrder = Number.isFinite(b.order);
    if (aHasOrder !== bHasOrder) return aHasOrder ? -1 : 1;
    if (aHasOrder && bHasOrder && a.order !== b.order) return a.order! - b.order!;

    const byCreatedAt = (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0);
    return byCreatedAt || (a.id ?? "").localeCompare(b.id ?? "");
  });
}

export function parseProject(id: string, data: Record<string, unknown>): ProjectDoc | null {
  const title = text(data.title);
  const tools = text(data.tools);
  const type = data.type === "Website" || data.type === "Mobile App" ? data.type : null;
  if (!title || !tools || !type) return null;

  const legacyLink = optionalText(data.link);

  return {
    id,
    title,
    image: text(data.image),
    link: legacyLink ?? "",
    tools,
    type,
    description: text(data.description),
    role: optionalText(data.role),
    demoUrl: optionalText(data.demoUrl),
    repoUrl: optionalText(data.repoUrl),
    featured: data.featured === true,
    createdAt: timestamp(data.createdAt),
  };
}

export function projectLinks(project: ProjectDoc) {
  const demoUrl = isSafeHttpUrl(project.demoUrl) ? project.demoUrl : undefined;
  const repoUrl = isSafeHttpUrl(project.repoUrl) ? project.repoUrl : undefined;
  if (demoUrl || repoUrl || !isSafeHttpUrl(project.link)) return { demoUrl, repoUrl };
  return project.link.toLowerCase().includes("github.com")
    ? { demoUrl, repoUrl: project.link }
    : { demoUrl: project.link, repoUrl };
}

export function sortProjects(rows: ProjectDoc[]) {
  return [...rows].sort((a, b) => {
    const byCreatedAt = (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0);
    return byCreatedAt || (a.id ?? "").localeCompare(b.id ?? "");
  });
}
