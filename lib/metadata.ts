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
  const url = `${feedConfig.siteUrl}${basePath}/${item.slug}`;
  // Falls back to the dynamic card at /api/og, which renders the title.
  const image =
    item.coverImage || `/api/og?title=${encodeURIComponent(item.title)}`;

  return {
    title: item.title,
    description: item.description,
    // Unlisted, not unreachable: the page answers on its URL, but nothing
    // should pull it into search results before it is finished.
    ...(draft && { robots: { index: false, follow: false } }),
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description: item.description,
      type: "article",
      publishedTime: item.date,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: item.title }],
    },
    // Stated per page rather than left to fall back on openGraph, so an X card
    // shows this title and description instead of the site-wide ones.
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      site: feedConfig.xHandle,
      creator: feedConfig.xHandle,
      images: [image],
    },
  };
}
