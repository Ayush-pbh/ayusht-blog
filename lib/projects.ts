import type { Project } from "@/types";

export function getAllProjects(): Project[] {
  return [
    {
      slug: "postpub",
      title: "PostPub",
      description:
        "A dashboard that makes research retractions legible — retraction rates by country and institution, tracked over time and classified by reason.",
      date: "2025",
      href: "https://postpub.net",
      // 1200x630 crop of the country table, sized for OG cards.
      coverImage: "/images/postpub-og.png",
    },
  ];
}

export function getProjectBySlug(slug: string): Project {
  const project = getAllProjects().find((project) => project.slug === slug);
  if (!project) {
    throw new Error(`Project with slug ${slug} not found`);
  }
  return project;
}
