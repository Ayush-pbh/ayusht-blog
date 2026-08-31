import type { Project } from "@/types";

export function getAllProjects(): Project[] {
  return [
    {
      slug: "dhun",
      title: "Dhun",
      description:
        "A 1.4 MB native macOS app that turns whatever your music is playing into a floating piece of your desktop — album art, a spinning record, or a full-screen visualizer driven by the actual sound.",
      date: "2026",
      href: "https://github.com/Ayush-pbh/dhun",
    },
    {
      slug: "meeseeks",
      title: "Mr. Meeseeks",
      description:
        "Mention it in any Slack thread and a dedicated Claude agent spins up for that thread alone — its own container, its own memory — then deletes itself when the job is done.",
      date: "2026",
      waitlist: true,
    },
    {
      slug: "silt",
      title: "Silt",
      description:
        "Catches agent failures in production, then turns each one into a test that blocks the next deploy.",
      date: "2026",
      waitlist: true,
    },
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

/**
 * Where the projects index and the sitemap should send someone. Waitlist
 * projects have no project page of their own — the landing page is the page.
 */
export function projectHref(project: Project): string {
  return project.waitlist
    ? `/waitlist/${project.slug}`
    : `/projects/${project.slug}`;
}

export function getProjectBySlug(slug: string): Project {
  const project = getAllProjects().find((project) => project.slug === slug);
  if (!project) {
    throw new Error(`Project with slug ${slug} not found`);
  }
  return project;
}
