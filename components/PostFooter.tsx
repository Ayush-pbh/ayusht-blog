import InlineLink from "@/components/InlineLink";
import { feedConfig } from "@/lib/feedConfig";

/**
 * The tail of every article. Rendered by `SiteChrome` for `/thoughts/<slug>`
 * rather than by each post, so a new post gets it without a fourth coordinated
 * edit to remember.
 */
export default function PostFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200 pt-4 text-xs text-neutral-500">
      <p>
        Written by {feedConfig.authorName}. I post the shorter version of all
        this on{" "}
        <InlineLink href={feedConfig.xUrl}>{feedConfig.xHandle}</InlineLink>.
      </p>
      <div className="mt-3 flex flex-wrap gap-4">
        <InlineLink href={feedConfig.xUrl}>X</InlineLink>
        <InlineLink href="/thoughts">All thoughts</InlineLink>
        <InlineLink href={feedConfig.feedPaths.rss}>RSS</InlineLink>
      </div>
    </footer>
  );
}
