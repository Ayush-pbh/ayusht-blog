import Image from "next/image";
import InlineLink from "@/components/InlineLink";
import IndexList from "@/components/IndexList";
import { feedConfig } from "@/lib/feedConfig";
import { getAllPosts } from "@/lib/posts";
import portrait from "@/public/images/ayush.webp";

const elsewhere = [
  { label: "Twitter", href: feedConfig.xUrl },
  { label: "GitHub", href: "https://github.com/Ayush-pbh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ayushpbh/" },
  { label: "RSS", href: "/api/rss" },
];

export default function Home() {
  const recent = getAllPosts().slice(0, 3);

  return (
    <>
      {/*
        In the margin beside the masthead on a wide screen — the same column
        the sidenotes use, so the photo reads as part of the spread rather than
        as a header. Below xl there is no margin to sit in, so it falls back
        into the flow above the name.
      */}
      <figure className="rise xs:w-36 mb-10 w-32 xl:absolute xl:top-2 xl:left-full xl:mb-0 xl:ml-14 xl:w-56">
        <Image
          src={portrait}
          alt="Ayush Tripathi, seated in an office."
          placeholder="blur"
          /*
            Served exactly as encoded. next/image would otherwise re-compress
            an already-optimised WebP, and a second lossy pass over skin tones
            is visible at this size. The file is 143KB, so there is nothing
            left for the optimiser to win.
          */
          unoptimized
          className="w-full border border-neutral-200"
          priority
        />
      </figure>

      <div className="rise">
        <h1 className="text-title md:text-display font-serif text-neutral-900">
          Ayush Tripathi
        </h1>

        <div className="mt-8 space-y-5">
          <p className="text-lede text-neutral-900">
            I'm a <strong>self-taught engineer</strong> working on AI systems —
            agents, LLM infrastructure, and the <em>unglamorous plumbing</em>{" "}
            that makes them fast and cheap enough to actually ship. Currently
            leading <strong>applied AI</strong> at a startup.
          </p>

          <p>
            Previously a <strong>platform engineer at Medial</strong>. Before
            that I founded <strong>RaayRocket</strong> and{" "}
            <strong>Grey Project Studio</strong>, where I learned product,
            marketing, and growth — <em>mostly by getting them wrong first</em>.
          </p>

          <p>
            I read, make art, and travel. I write here about startups, systems,
            and <em>whatever I'm currently obsessed with</em>.
          </p>
        </div>

        <ul className="text-label mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono uppercase">
          {elsewhere.map((link) => (
            <li key={link.label}>
              <InlineLink
                href={link.href}
                className="hover:text-accent text-neutral-400 no-underline"
              >
                {link.label}
              </InlineLink>
            </li>
          ))}
        </ul>
      </div>

      <section
        className="rise mt-20"
        style={{ "--rise-index": 2 } as React.CSSProperties}
      >
        <h2 className="text-label mb-4 font-mono text-neutral-400 uppercase">
          Recent writing
        </h2>
        <IndexList
          entries={recent.map((post) => ({
            key: post.slug,
            href: `/thoughts/${post.slug}`,
            title: post.title,
            date: post.date,
            badges: post.draft ? ["draft"] : [],
          }))}
        />
      </section>
    </>
  );
}
