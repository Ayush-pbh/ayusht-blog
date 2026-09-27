"use client";

import { usePathname } from "next/navigation";
import { unstable_ViewTransition as ViewTransition } from "react";
import Nav from "@/components/Nav";
import PostFooter from "@/components/PostFooter";
import SiteFooter from "@/components/SiteFooter";

/**
 * Wraps children in the site's nav-and-measure layout, except on standalone
 * routes which render full-bleed.
 *
 * This exists because waitlist pages are aimed at someone who just scanned
 * a QR code and has about twenty seconds — six navigation links to click
 * instead of the form is a cost, not a feature. Next only allows one root
 * layout per app unless every route moves into a route group, so the branch
 * lives here instead: `children` is still server-rendered and passed through
 * untouched.
 */
const STANDALONE_PREFIXES = ["/waitlist"];

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (STANDALONE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return <>{children}</>;
  }

  /** `/thoughts/<slug>`, but not the `/thoughts` index itself. */
  const article = pathname.startsWith("/thoughts/");

  return (
    /*
     * The page is one spread: masthead in the left column, a single measure of
     * text in the right, and a rule between them that runs the height of the
     * page. The pair is capped and centred so the margin the sidenotes live in
     * survives on a wide screen instead of running off to the right edge.
     */
    <div className="xs:px-8 xs:py-16 mx-auto flex min-h-[100dvh] w-full max-w-[78rem] flex-col px-5 py-8 md:py-24">
      <div className="xs:flex-row flex flex-1 flex-col">
        <Nav />
        <main className="xs:border-l xs:border-neutral-200 xs:pl-8 relative w-full min-w-0 sm:max-w-[38rem] md:pl-14">
          <ViewTransition name="crossfade">
            <article className="prose relative">
              {children}
              {article && <PostFooter />}
            </article>
          </ViewTransition>
          {!article && <SiteFooter />}
        </main>
      </div>
    </div>
  );
}
