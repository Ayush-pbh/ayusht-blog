"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
}

function useHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    setActiveHeading(hash);

    const handleHashChange = () => {
      setActiveHeading(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (headingRef.current && !headingRef.current.id) {
      const text = headingRef.current.textContent || "";
      headingRef.current.id = generateId(text);
    }
  }, []);

  return { headingRef, activeHeading };
}

function HeadingLink({
  id,
  active,
  children,
}: {
  id?: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <a href={`#${id}`} className="group">
      <span
        data-active={active}
        className="xs:pr-3 hover:text-accent data-[active=true]:text-accent absolute top-1 -translate-x-full pr-2 font-mono text-xs text-neutral-300 opacity-0 transition-all group-hover:opacity-100 data-[active=true]:opacity-100"
        aria-label="Copy link to section"
      >
        §
      </span>
      {children}
    </a>
  );
}

export function H1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { headingRef } = useHeading();

  return (
    <h1
      ref={headingRef}
      className={cn(
        "text-title md:text-display mb-8 text-left font-serif text-neutral-900",
        // `text-wrap: balance` keeps a two-line title from leaving one orphan
        // word on the second line, which is what a display size exposes.
        "text-balance",
        className,
      )}
      {...props}
    >
      {props.children}
    </h1>
  );
}

export function H2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { headingRef, activeHeading } = useHeading();

  return (
    <h2
      ref={headingRef}
      className={cn(
        "relative mt-14 mb-3 text-left font-serif text-[1.375rem] leading-snug text-neutral-900",
        className,
      )}
      {...props}
    >
      <HeadingLink
        id={headingRef.current?.id}
        active={activeHeading === `#${headingRef.current?.id}`}
      >
        {props.children}
      </HeadingLink>
    </h2>
  );
}

export function H3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { headingRef, activeHeading } = useHeading();

  return (
    <h3
      ref={headingRef}
      className={cn(
        "relative mt-10 mb-2 text-left font-serif text-[1.0625rem] font-medium text-neutral-900 italic",
        className,
      )}
      {...props}
    >
      <HeadingLink
        id={headingRef.current?.id}
        active={activeHeading === `#${headingRef.current?.id}`}
      >
        {props.children}
      </HeadingLink>
    </h3>
  );
}
