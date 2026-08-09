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
  /**
   * Not built yet — gathering a waitlist. The projects index and the sitemap
   * point at `/waitlist/<slug>` instead of a project page, and no
   * `app/projects/<slug>/page.tsx` should exist. The slug must match an entry
   * in `lib/waitlist.ts`.
   */
  waitlist?: boolean;
};

/** A line in the terminal block. `tone` drives colour, not content. */
export type TerminalLine = {
  text: string;
  tone?: "command" | "muted" | "fail" | "plain";
};

export type WaitlistProject = {
  /** URL segment, and the value stored in the `project` column. */
  slug: string;
  /** Short name — wordmark, tab title, confirmation email. */
  name: string;
  /** Mono kicker above the headline — status, stack, whatever earns trust. */
  eyebrow?: string;
  /** One entry per line. Line two onwards sets muted, which makes the beat. */
  headline: string[];
  subhead: string;
  cta: string;
  /** Button text while the form is in flight. Defaults to "Sending…". */
  submittingLabel?: string;
  confirmation: string;
  /** Microcopy under the email field. */
  formNote?: string;
  /**
   * Email alone converts best on a cold landing page. "full" adds name and use
   * case — worth the friction when the answers decide who gets let in.
   */
  formFields?: "email" | "full";
  /** Why the use-case box is worth filling in. Shown under that field. */
  useCaseHint?: string;
  contactEmail?: string;

  // Everything below is optional. A project with none of it renders as a plain
  // hero and form — which is all an early idea needs.

  /** A beat, not a section: a few lines and a closing observation. */
  problem?: { lines: string[]; kicker: string };

  /**
   * A full-bleed band above the footer — the ground the page comes to rest on.
   * Static import so Next has the dimensions; pre-crop the file to a wide strip
   * rather than relying on object-cover to discard the rest.
   */
  texture?: { src: StaticImageData; alt: string };

  /** The mechanism. Steps, and optionally a terminal transcript under them. */
  loop?: {
    /** Mono section label. Defaults to "The loop". */
    eyebrow?: string;
    header: string;
    intro: string;
    steps: { title: string; body: string }[];
    terminal?: { lines: TerminalLine[]; caption: string };
  };

  /** Objections answered without an FAQ. Three is the number. */
  features?: { title: string; body: string }[];

  /**
   * The unglamorous technical section — the plainness is the credibility.
   * `items` may wrap identifiers in `backticks`, which render as mono.
   */
  details?: {
    eyebrow?: string;
    header: string;
    items: string[];
    link?: { label: string; href: string };
  };

  /** Native <details>, so it costs no JavaScript. */
  faq?: { question: string; answer: string }[];

  closing?: { header: string; body: string; honesty: string };

  /** Legal or disclaiming line in the footer. */
  finePrint?: string;
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
