import { cn } from "@/lib/utils";
import InlineLink from "@/components/InlineLink";

interface BlockQuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  author?: string;
  source?: string;
  href?: string;
}

/**
 * A pull quote. It hangs into the gutter so it breaks the measure rather than
 * sitting inside it, and the attribution drops to mono micro-caps, which keeps
 * the voice of the quote and the name of its owner visibly different things.
 */
export default function BlockQuote({
  children,
  className,
  author,
  source,
  href,
  ...props
}: BlockQuoteProps) {
  return (
    <blockquote
      className={cn(
        "xs:pl-6 xs:-ml-6 border-accent text-lede my-10 -ml-4 space-y-4 border-l pl-4 font-serif text-neutral-900 italic sm:-ml-8 sm:pl-8 md:-ml-12 md:pl-12",
        className,
      )}
      {...props}
    >
      {children}
      {(author || source) && (
        <footer className="text-label flex flex-wrap items-center gap-x-2 font-mono text-neutral-400 uppercase not-italic">
          {author && <span>{author}</span>}
          {author && source && (
            <span aria-hidden="true" className="h-px w-4 bg-neutral-300" />
          )}
          {source && !href && <cite className="not-italic">{source}</cite>}
          {source && href && (
            <cite className="not-italic">
              <InlineLink
                className="hover:text-accent no-underline"
                href={href}
              >
                {source}
              </InlineLink>
            </cite>
          )}
        </footer>
      )}
    </blockquote>
  );
}
