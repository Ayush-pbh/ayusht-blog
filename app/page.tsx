import InlineLink from "@/components/InlineLink";
import { H1 } from "@/components/Headings";

export default function Home() {
  return (
    <>
      <div className="space-y-4">
        <H1>Ayush Tripathi</H1>

        <p>
          I build products and write about startups, SaaS, and growth. I love
          reading, making art, and traveling. I am a curious individual, excited
          by new learnings, and passionate about helping others grow.
        </p>

        <p>
          I'm a self-taught engineer, ex-Medial Platform Engineer, and I founded
          as few startups RaayRocket and GreyProjectStudios, learning about
          product development, marketing, and growth along the way. Currently I
          am working on AI ML Implementations at a startup in Stealth Mode(
          Launching Soon! ).
        </p>
      </div>
      <hr />
      <div className="flex flex-wrap gap-4 text-xs">
        <InlineLink href="https://x.com/ayushthought">Twitter</InlineLink>
        <InlineLink href="https://github.com/Ayush-pbh">GitHub</InlineLink>
        <InlineLink href="https://www.linkedin.com/in/ayushpbh/">
          LinkedIn
        </InlineLink>
        <InlineLink href="/api/rss">RSS</InlineLink>
      </div>
    </>
  );
}
