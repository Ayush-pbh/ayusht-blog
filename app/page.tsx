import InlineLink from "@/components/InlineLink";
import { H1 } from "@/components/Headings";

export default function Home() {
  return (
    <>
      <div className="space-y-4">
        <H1>Ayush Tripathi</H1>

        <p>
          I'm a <strong>self-taught engineer</strong> working on AI systems —
          agents, LLM infrastructure, and the <em>unglamorous plumbing</em> that
          makes them fast and cheap enough to actually ship. Currently leading{" "}
          <strong>applied AI</strong> at a startup.
        </p>

        <p>
          Previously a <strong>platform engineer at Medial</strong>. Before that
          I founded <strong>RaayRocket</strong> and{" "}
          <strong>Grey Project Studio</strong>, where I learned product,
          marketing, and growth — <em>mostly by getting them wrong first</em>.
        </p>

        <p>
          I read, make art, and travel. I write here about startups, systems,
          and <em>whatever I'm currently obsessed with</em>.
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
