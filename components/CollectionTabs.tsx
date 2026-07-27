"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fallbackLabel } from "@/lib/collections";
import type { Collection, CollectionItem } from "@/types";

/** Shown for links that expose no OG image of their own (arXiv, mostly). */
const FALLBACK_IMAGE = "/images/pale-blue-dot.webp";

function Tile({
  item,
  layout,
}: {
  item: CollectionItem;
  layout: Collection["layout"];
}) {
  const portrait = layout === "portrait";

  return (
    <a
      href={item.href}
      target={item.href?.startsWith("/") ? undefined : "_blank"}
      className="group block space-y-2 text-left"
    >
      <div
        className={cn(
          "relative overflow-hidden border border-neutral-200 bg-neutral-100 transition-colors group-hover:border-neutral-900",
          portrait ? "aspect-2/3" : "aspect-video",
        )}
      >
        <Image
          src={item.image || FALLBACK_IMAGE}
          alt=""
          fill
          sizes={
            portrait
              ? "(max-width: 32rem) 33vw, 160px"
              : "(max-width: 32rem) 100vw, 320px"
          }
          className="object-cover"
        />
        {!item.image && (
          <span className="text-2xs absolute inset-0 flex items-center justify-center p-2 text-center font-mono text-neutral-100">
            {fallbackLabel(item.href)}
          </span>
        )}
      </div>

      <div className="space-y-0.5">
        <h3 className="text-xs leading-snug text-neutral-800 transition-colors group-hover:text-neutral-900">
          {item.title}
        </h3>
        {item.author && (
          <p className="text-2xs text-neutral-500">{item.author}</p>
        )}
        {item.note && <p className="text-2xs text-neutral-400">{item.note}</p>}
      </div>
    </a>
  );
}

export default function CollectionTabs({
  collections,
}: {
  collections: Collection[];
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const last = collections.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  const current = collections[active];

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Collections"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-4 border-b border-neutral-200 pb-2"
      >
        {collections.map((collection, index) => (
          <button
            key={collection.slug}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            id={`tab-${collection.slug}`}
            aria-selected={index === active}
            aria-controls={`panel-${collection.slug}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            data-active={index === active}
            className="cursor-pointer text-neutral-400 transition-colors hover:text-neutral-900 data-[active=true]:text-neutral-900"
          >
            <em>{collection.title.toLowerCase()}</em>
            <span className="text-2xs ml-1 align-super tabular-nums">
              {collection.items.length}
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${current.slug}`}
        aria-labelledby={`tab-${current.slug}`}
        className={cn(
          "grid gap-x-4 gap-y-6",
          current.layout === "portrait"
            ? "grid-cols-3 sm:grid-cols-4"
            : "xs:grid-cols-2 grid-cols-1",
        )}
      >
        {current.items.map((item) => (
          <Tile key={item.title} item={item} layout={current.layout} />
        ))}
      </div>
    </div>
  );
}
