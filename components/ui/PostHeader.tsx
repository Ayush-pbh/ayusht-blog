import Image from "next/image";
import Link from "next/link";
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
  const tag = "tag" in post ? post.tag : undefined;
  // Only posts get the cover set on the page. Projects carry `coverImage` too,
  // but theirs is an OG crop of a screenshot the page already shows, so it
  // stays in the card. `readingTime` is the tell: `getPostBySlug` always sets
  // the key, and nothing builds a Project with it.
  const cover = "readingTime" in post ? post.coverImage : undefined;
  const coverAlt = "coverAlt" in post ? post.coverAlt : undefined;

  return (
    <>
      <header className="rise mb-12 border-b border-neutral-200 pb-6">
        <H1 className="mb-0">{post.title}</H1>

        <p className="text-label mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-neutral-400 uppercase">
          {draft && (
            <span className="border border-neutral-300 px-1.5 py-0.5 text-neutral-500">
              draft
            </span>
          )}
          {tag && (
            <>
              <Link
                href={`/thoughts?tag=${tag.toLowerCase()}`}
                className="hover:text-accent text-neutral-500 transition-colors"
              >
                {tag}
              </Link>
              <span aria-hidden="true" className="h-px w-4 bg-neutral-300" />
            </>
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
      {cover && (
        <figure className="rise -mt-4 mb-12">
          <Image
            src={cover}
            alt={coverAlt ?? ""}
            width={1200}
            height={630}
            priority
            /*
            The grain and halftone are the point of these illustrations, and a
            second lossy pass by the optimiser smears exactly that. They are
            encoded for the web before they are committed.
          */
            unoptimized
            className="w-full border border-neutral-200"
          />
        </figure>
      )}
    </>
  );
}
