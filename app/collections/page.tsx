import type { Metadata } from "next";
import { H1 } from "@/components/Headings";
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
    <div className="space-y-4">
      <H1>Collections</H1>
      <p>Things worth returning to.</p>
      <CollectionTabs collections={collections} />
    </div>
  );
}
