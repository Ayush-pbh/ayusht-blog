import type { Post, Project } from "@/types";
import { H1 } from "@/components/Headings";

export function PostHeader({ post }: { post: Post | Project }) {
  const draft = "draft" in post && post.draft;
  const readingTime = "readingTime" in post ? post.readingTime : undefined;

  return (
    <header className="mb-8 flex justify-between">
      <H1 className="mb-0">{post.title}</H1>
      <div className="ml-2 flex items-baseline gap-2 whitespace-nowrap">
        {draft && (
          <span className="text-2xs border border-neutral-300 px-1 font-mono text-neutral-400 uppercase">
            draft
          </span>
        )}
        <time className="text-neutral-500">{post.date}</time>
        {readingTime && (
          <span className="text-2xs font-mono text-neutral-400 uppercase">
            {readingTime} min
          </span>
        )}
      </div>
    </header>
  );
}
