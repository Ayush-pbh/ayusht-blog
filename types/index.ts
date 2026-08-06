import type { StaticImageData } from "next/image";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  /**
   * Keeps the post out of the index, sitemap and feeds in production, and out
   * of search engines. The page itself still builds and answers on its URL —
   * see `getAllPosts` in `lib/posts.ts`.
   */
  draft?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  /** Shown on the index and used as the OG published time. */
  date: string;
  /** The live site, if there is one. */
  href?: string;
  coverImage?: string;
};

export type Quote = {
  text: string;
  /** A person. */
  author?: string;
  /** A work, or an unattributed origin like "Serbian proverb". */
  source?: string;
};

export type CollectionItem = {
  title: string;
  author?: string;
  href?: string;
  note?: string;
  /** Gallery only. Shown when the image opens, never on the tile. */
  description?: string;
  /**
   * Thumbnail / OG image. Derived from the href for YouTube links.
   * `gallery` items use a static import so Next knows the real dimensions.
   */
  image?: string | StaticImageData;
};

export type Collection = {
  slug: string;
  title: string;
  /**
   * Tile shape: book covers are portrait, video and article art is landscape,
   * `gallery` keeps each image's own aspect ratio and opens it in a lightbox.
   */
  layout: "portrait" | "landscape" | "gallery";
  items: CollectionItem[];
};
