import InlineLink from "@/components/InlineLink";
import { feedConfig } from "@/lib/feedConfig";

/**
 * The tail of every article. Rendered by `SiteChrome` for `/thoughts/<slug>`
 * rather than by each post, so a new post gets it without a fourth coordinated
 * edit to remember.
 */
export default function PostFooter() {
  return (
    <footer className="mt-20 border-t border-neutral-200 pt-6">
      <p className="max-w-[52ch] font-sans text-xs leading-relaxed text-neutral-500">
        Written by {feedConfig.authorName}. I post the shorter version of all
        this on{" "}
        <InlineLink href={feedConfig.xUrl}>{feedConfig.xHandle}</InlineLink>.
      </p>
      <div className="text-label mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono uppercase">
        <InlineLink
          className="hover:text-accent text-neutral-400 no-underline"
          href={feedConfig.xUrl}
        >
          X
        </InlineLink>
        <InlineLink
          className="hover:text-accent text-neutral-400 no-underline"
          href="/thoughts"
        >
          All thoughts
        </InlineLink>
        <InlineLink
          className="hover:text-accent text-neutral-400 no-underline"
          href={feedConfig.feedPaths.rss}
        >
          RSS
        </InlineLink>
      </div>
    </footer>
  );
}
