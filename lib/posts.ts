import type { Post } from "@/types";

/**
 * Drafts are visible while you're working (`npm run dev`) and on Vercel preview
 * deployments, so a branch URL is enough to share a piece for feedback. Only a
 * production build hides them.
 */
const showDrafts =
  process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";

const posts: Post[] = [
  //{
  //  slug: "ai-is-inevitable",
  //  title: "AI is Inevitable",
  //  description:
  //    "The economic era we know is ending. This is a natural cycle that all things go through, celebrate what we had and prepare yourself for a new reality. A reality where AI has no boundaries.",
  //  date: "May 21, 2025",
  //},

  {
    slug: "colophon",
    title: "Colophon",
    description:
      "How this site is built, and why it is built the way it is: posts as React components, a design system that is one colour ramp, and dark mode without a single dark: variant.",
    date: "Aug 7, 2026",
  },
  {
    slug: "specimen",
    title: "Specimen",
    description:
      "Every component a post on this site can use, on one page. Kept as a draft so it stays out of the index and the feeds.",
    date: "Aug 7, 2026",
    draft: true,
  },
];

/**
 * The public list — what feeds `/thoughts`, `app/sitemap.ts` and the three feed
 * routes. Drafts drop out of all four at once in production.
 */
export function getAllPosts(): Post[] {
  return showDrafts ? posts : posts.filter((post) => !post.draft);
}

/**
 * Looks through drafts as well, so a draft's own page still builds and answers
 * on its URL in production — it is unlisted, not unreachable. `createMetadata`
 * marks drafts `noindex` so nothing links them into search results.
 */
export function getPostBySlug(slug: string): Post {
  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }
  return post;
}
