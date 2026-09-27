import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import IndexList from "@/components/IndexList";

const promise =
  "Agent systems in production — architecture, LLM infrastructure, latency and cost, and the lessons that only arrive after something ships.";

export const metadata: Metadata = {
  title: "Thoughts",
  description: promise,
};

export default function Thoughts() {
  const posts = getAllPosts();

  return (
    <div>
      {/*
        Most visitors here arrive from a link on X and have about five seconds
        to decide they are in the right place. One sentence, above the list.
      */}
      <header className="rise mb-10">
        <h1 className="text-title font-serif text-neutral-900">Thoughts</h1>
        <p className="text-lede mt-4 max-w-[46ch] font-serif text-neutral-500">
          {promise}
        </p>
      </header>

      <IndexList
        entries={posts.map((post) => ({
          key: post.slug,
          href: `/thoughts/${post.slug}`,
          title: post.title,
          description: post.description,
          date: post.date,
          badges: [
            ...(post.pinned ? ["pinned"] : []),
            ...(post.draft ? ["draft"] : []),
          ],
        }))}
      />
    </div>
  );
}
