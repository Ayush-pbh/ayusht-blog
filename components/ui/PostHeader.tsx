import type { Post, Project } from "@/types";
import { H1 } from "@/components/Headings";

/**
 * The head of an article. The title takes the display size and the metadata
 * drops beneath it in mono micro-caps, so a long title can set on two lines
 * without the date being pushed off the measure.
 */
export function PostHeader({ post }: { post: Post | Project }) {
  const draft = "draft" in post && post.draft;
  const readingTime = "readingTime" in post ? post.readingTime : undefined;

  return (
    <header className="rise mb-12 border-b border-neutral-200 pb-6">
      <H1 className="mb-0">{post.title}</H1>

      <p className="text-label mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-neutral-400 uppercase">
        {draft && (
          <span className="border border-neutral-300 px-1.5 py-0.5 text-neutral-500">
            draft
          </span>
        )}
        <time className="tabular-nums">{post.date}</time>
        {readingTime && (
          <>
            <span aria-hidden="true" className="h-px w-4 bg-neutral-300" />
            <span className="tabular-nums">{readingTime} min</span>
          </>
        )}
      </p>
    </header>
  );
}
