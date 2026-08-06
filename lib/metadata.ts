import type { Metadata } from "next";
import type { Post, Project } from "@/types";
import { feedConfig } from "@/lib/feedConfig";

/**
 * Builds OG metadata for a post or a project. `basePath` is the route segment
 * the item lives under, so a project shares this helper without pretending to
 * live at /thoughts.
 */
export function createMetadata(
  item: Post | Project,
  basePath: string = "/thoughts",
): Metadata {
  const draft = "draft" in item && item.draft;

  return {
    title: item.title,
    description: item.description,
    // Unlisted, not unreachable: the page answers on its URL, but nothing
    // should pull it into search results before it is finished.
    ...(draft && { robots: { index: false, follow: false } }),
    openGraph: {
      title: item.title,
      description: item.description,
      type: "article",
      publishedTime: item.date,
      url: `${feedConfig.siteUrl}${basePath}/${item.slug}`,
      images: [
        {
          url:
            item.coverImage ||
            `/api/og?title=${encodeURIComponent(item.title)}`,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
  };
}
