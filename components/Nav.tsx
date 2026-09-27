"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { feedConfig } from "@/lib/feedConfig";

// media? questions? links?
const links = [
  {
    href: "/",
    text: "about",
  },
  {
    href: "/thoughts",
    text: "thoughts",
  },
  {
    href: "/people",
    text: "people",
  },
  // {
  //   href: "/principles",
  //   text: "principles",
  // },
  {
    href: "/projects",
    text: "projects",
  },
  {
    href: "/quotes",
    text: "quotes",
  },
  {
    href: "/collections",
    text: "collections",
  },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

/**
 * The masthead. A fixed left column on anything wider than `xs`, where it
 * sticks alongside the text; a single ruled band above the page on a phone.
 *
 * Links keep the serif italic they have always had — `em` is restyled globally
 * in `globals.css`, which is why it is the markup here — but the current page
 * is now marked in the accent with a rule in the gutter, so the column reads
 * as a table of contents rather than a list of words.
 */
export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="xs:mb-0 xs:w-44 xs:shrink-0 xs:pr-6 xs:border-none xs:pb-0 relative mb-8 border-b border-neutral-200 pb-5 md:w-56 md:pr-8">
      <div className="xs:sticky xs:top-16 md:top-24">
        <Link
          href="/"
          className="text-label xs:justify-end flex items-baseline font-mono tracking-[0.16em] text-neutral-900 uppercase"
        >
          {feedConfig.siteTitle}
        </Link>

        <menu className="xs:mt-8 xs:flex-col xs:justify-start xs:gap-1.5 xs:text-right mt-5 flex flex-wrap gap-x-5 gap-y-1 text-base leading-5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-active={isActive(pathname, link.href)}
                className="xs:justify-end group data-[active=true]:text-accent relative flex items-center text-neutral-400 transition-colors hover:text-neutral-900"
              >
                <em>{link.text}</em>
                {/* A rule that grows out of the link and stops at the spine,
                    so the current page is marked on the page itself. */}
                <span
                  aria-hidden="true"
                  className="xs:block bg-accent absolute top-1/2 -right-6 hidden h-px w-6 origin-right scale-x-0 transition-transform duration-300 group-data-[active=true]:scale-x-100 md:-right-8 md:w-8"
                />
              </Link>
            </li>
          ))}
        </menu>

        {/* Top-right on a phone, where the masthead is a band; foot of the
            column on anything wider. */}
        <div className="xs:static xs:mt-8 xs:flex xs:justify-end absolute top-0 right-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
