import type { Metadata } from "next";
import CollectionTabs from "@/components/CollectionTabs";
import { getAllCollections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Books, videos, articles, research papers, and images worth returning to.",
};

export default function Collections() {
  const collections = getAllCollections();

  return (
    <div>
      <header className="rise mb-10">
        <h1 className="text-title font-serif text-neutral-900">Collections</h1>
        <p className="text-lede mt-4 max-w-[46ch] font-serif text-neutral-500">
          Things worth returning to.
        </p>
      </header>
      <CollectionTabs collections={collections} />
    </div>
  );
}
