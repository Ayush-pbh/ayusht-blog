export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
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

export type CollectionItem = {
  title: string;
  author?: string;
  href?: string;
  note?: string;
  /** Thumbnail / OG image. Derived from the href for YouTube links. */
  image?: string;
};

export type Collection = {
  slug: string;
  title: string;
  /** Tile shape: book covers are portrait, video and article art is landscape. */
  layout: "portrait" | "landscape";
  items: CollectionItem[];
};
