import type { Post } from "@/types";

export function getAllPosts(): Post[] {
  return [
    //{
    //  slug: "ai-is-inevitable",
    //  title: "AI is Inevitable",
    //  description:
    //    "The economic era we know is ending. This is a natural cycle that all things go through, celebrate what we had and prepare yourself for a new reality. A reality where AI has no boundaries.",
    //  date: "May 21, 2025",
    //},

    {
      slug: "test-blog",
      title: "Test Blog",
      description: "Just a test blog page.",
      date: "Dec 28, 2025",
    },
  ];
}

export function getPostBySlug(slug: string): Post {
  const post = getAllPosts().find((post) => post.slug === slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }
  return post;
}
