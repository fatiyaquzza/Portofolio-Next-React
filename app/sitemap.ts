import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/firestoreCrud";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: "https://www.fatiya.dev", changeFrequency: "monthly", priority: 1 },
  ];
  try {
    const projects = await getProjects();
    routes.push(
      ...projects
        .filter((project) => project.id)
        .map((project) => ({
          url: `https://www.fatiya.dev/projects/${project.id}`,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
    );
  } catch {
    // Keep the homepage discoverable when Firestore is temporarily unavailable.
  }
  return routes;
}
