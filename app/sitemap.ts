import { getAllPosts } from "@/lib/posts";
import { getAllProjects, projectHref } from "@/lib/projects";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ayusht.me";
  const posts = getAllPosts();
  const projects = getAllProjects();

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/thoughts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Early-access projects have no project page — projectHref points the
  // sitemap at the landing page instead, so nothing here 404s.
  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}${projectHref(project)}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postEntries,
    ...projectEntries,
  ];
}
