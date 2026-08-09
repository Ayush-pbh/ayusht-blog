"use client";

import { usePathname } from "next/navigation";
import { unstable_ViewTransition as ViewTransition } from "react";
import Nav from "@/components/Nav";

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

  return (
    <div className="xs:flex-row xs:p-6 flex flex-col p-4 pb-12 sm:p-12 md:p-24 md:pb-24">
      <Nav />
      <main className="xs:pl-6 relative w-full min-w-0 text-justify hyphens-auto sm:max-w-2xl sm:pl-8 md:pl-12">
        <div className="xs:block absolute top-0 left-0 hidden h-full border-l border-neutral-200" />
        <ViewTransition name="crossfade">
          <article className="relative">{children}</article>
        </ViewTransition>
      </main>
    </div>
  );
}
