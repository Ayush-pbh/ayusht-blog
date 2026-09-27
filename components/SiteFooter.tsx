import InlineLink from "@/components/InlineLink";
import { feedConfig } from "@/lib/feedConfig";

/**
 * The tail of every non-article page. Articles get `PostFooter` instead, which
 * says more; this one only has to close the page and hand back the feeds.
 */
export default function SiteFooter() {
  return (
    <footer className="text-label mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-neutral-200 pt-5 font-mono text-neutral-400 uppercase">
      <span>{feedConfig.copyright}</span>
      <span className="flex gap-4">
        <InlineLink className="no-underline" href={feedConfig.feedPaths.rss}>
          RSS
        </InlineLink>
        <InlineLink className="no-underline" href={feedConfig.xUrl}>
          X
        </InlineLink>
      </span>
    </footer>
  );
}
