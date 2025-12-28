import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import { Ul, Ol, Li } from "@/components/List";
import InlineLink from "@/components/InlineLink";

const post = getPostBySlug("test-blog");

export async function generateMetadata() {
  return createMetadata(post);
}

export default function WhyIFoundedCelest() {
  return (
    <>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />
      <div className="space-y-4">
        <p>Just a test blog page.</p>
      </div>
    </>
  );
}
