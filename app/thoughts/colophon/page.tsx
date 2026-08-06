import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import { BlockCode, InlineCode } from "@/components/Code";
import { Ul, Li } from "@/components/List";
import InlineLink from "@/components/InlineLink";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("colophon");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content:
      "The cost is real: there is no draft folder full of .md files I could move to another engine in an afternoon. I decided I would rather have the ceiling than the exit.",
  },
  {
    id: 2,
    content:
      "Reading offsetWidth forces the browser to flush style, which is normally the thing you are told never to do. Here it is the entire point.",
  },
];

export default function Colophon() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          This site is a Next.js app on the App Router, React 19, Tailwind CSS
          v4, TypeScript, deployed on Vercel. That sentence describes about
          forty thousand other sites, so it is not the interesting part. The
          interesting part is the handful of places where I chose the harder
          thing on purpose.
        </p>

        <H2>Posts are React components</H2>

        <p>
          There is no MDX here, and no content pipeline. Every post is a
          hand-written page at{" "}
          <InlineCode code="app/thoughts/<slug>/page.tsx" /> that imports the
          typography components and composes them. This one included — the
          paragraph you are reading is a <InlineCode code="<p>" /> inside a
          server component.
        </p>

        <p>
          Markdown is a lossy format for what I want to do. The moment a piece
          needs a chart, an animation, a diagram that responds to hover, or a
          sidenote that sits in the margin at wide viewports and folds inline on
          a phone, markdown starts needing escape hatches, and MDX is mostly a
          machine for providing them. If the escape hatch is where the work
          happens, the format is not earning its place. So I removed the format.
          <FootnoteLink id={1} />
        </p>

        <p>
          Metadata lives separately, in a hardcoded array in{" "}
          <InlineCode code="lib/posts.ts" />, and that array is the single
          source of truth. Add an entry and the post appears on the index, in
          the sitemap, and in all three feeds at once. Forget to add it and the
          page throws at build time, because <InlineCode code="getPostBySlug" />{" "}
          does not tolerate an unknown slug. Both of those are deliberate: I
          wanted the failure to be loud and early rather than a page quietly
          missing from the feed for six months.
        </p>

        <H2>The design system is one colour ramp</H2>

        <p>
          There is no <InlineCode code="tailwind.config" /> file. Tailwind v4
          lets the design system live in CSS, so all of it is an{" "}
          <InlineCode code="@theme" /> block in{" "}
          <InlineCode code="app/globals.css" /> that overrides the default{" "}
          <InlineCode code="neutral" /> palette with warm off-white tones, sets
          three font variables, and adds one extra breakpoint.
        </p>

        <p>
          The whole site is expressed in that single ramp: <em>50</em> is the
          page background, <em>900</em> is the strongest text, and every border,
          surface and muted label is a step in between. Nothing on this site is
          blue because it is a link or grey because it is secondary — it is a
          number on one scale, and the scale is semantic.
        </p>

        <p>
          Which buys something specific. Dark mode is not a second theme. It is
          the same ramp, reversed:
        </p>

        <BlockCode
          meta="css"
          code={`@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-neutral-50: #13120f;   /* was #faf9f5 */
    --color-neutral-900: #f5f2ec;  /* was #1f1e1d */
    /* ...nine more */
  }
}`}
        />

        <p>
          Eleven lines, and every surface, border and piece of text on the site
          inverts at once. There is not one <InlineCode code="dark:" /> variant
          in the codebase. No component knows what theme it is in, and none of
          them should have to. The constraint that makes this work is that the
          ramp has to stay honest — the day I reach for a colour because it
          looks nice in light mode is the day the whole thing needs auditing.
        </p>

        <H2>Where the toggle gets awkward</H2>

        <p>
          Following the system preference is free. Letting a reader override it
          is where the cost shows up, and it shows up in three places at once.
        </p>

        <Ul>
          <Li>
            The choice lives in <InlineCode code="localStorage" />, which the
            server cannot see. So a blocking inline script applies it before
            first paint, and <InlineCode code="<html>" /> carries{" "}
            <InlineCode code="suppressHydrationWarning" /> — the server-client
            mismatch is real and intended.
          </Li>
          <Li>
            The dark ramp is now written twice: once in the media query, once
            under <InlineCode code='[data-theme="dark"]' />. CSS cannot share a
            declaration list across a media query and a selector, so the
            duplication is structural rather than sloppy.
          </Li>
          <Li>
            The 1s crossfade only applies while switching. A global{" "}
            <InlineCode code="* { transition: color 1s }" /> would also animate
            colours on first paint and stretch every hover to a full second.
          </Li>
        </Ul>

        <p>
          That last one has a trap in it worth writing down. CSS resolves a
          transition against the style in effect <em>before</em> the change. Add
          the transition class and flip the theme in the same tick and the
          browser sees no-transition-then-new-colour, and snaps. So:
        </p>

        <BlockCode
          meta="ts"
          code={`root.classList.add("theme-transition");
void root.offsetWidth; // force a style flush — deleting this kills the fade
root.dataset.theme = chosen;`}
        />

        <p>
          A line that looks exactly like dead code and is holding up the entire
          effect.
          <FootnoteLink id={2} />
        </p>

        <H2>Everything else</H2>

        <p>
          Code blocks run through{" "}
          <InlineLink href="https://rehype-pretty-code.netlify.app/">
            rehype-pretty-code
          </InlineLink>{" "}
          at render time, inside async server components — the highlighting is
          done before the HTML leaves the server, so there is no syntax
          highlighter in the bundle. Shiki emits both themes and the dark one is
          swapped in by CSS custom property, which is the one place the
          reversed-ramp trick does not reach on its own.
        </p>

        <p>
          Footnotes are context-based, so a note can be a React node rather than
          a string, and they render as sidenotes in the margin above{" "}
          <InlineCode code="xl" />. Math is KaTeX rendered to HTML at build.
          Headings generate their own anchors from their text. Page transitions
          use React&rsquo;s <InlineCode code="unstable_ViewTransition" />, which
          is exactly as unstable as the name promises. Open Graph images are
          generated per-post at the edge. There are three feeds — RSS, Atom and
          JSON — because it costs one file each and I would rather someone read
          this in whatever they already use.
        </p>

        <p>
          The fonts are Inter for text, Lora for anything italic or quoted, and
          JetBrains Mono for code. The italic serif is doing more work than it
          looks like: <InlineCode code="em" />, <InlineCode code="i" /> and{" "}
          <InlineCode code="q" /> are globally restyled, which is why the
          navigation reads the way it does.
        </p>

        <H2>What it does not have</H2>

        <p>
          No comments, no analytics beyond page counts, no cookie banner because
          there are no cookies to consent to, no newsletter box asking for your
          email before you have read a sentence, no share buttons. Everything on
          this site loads because it is part of the writing.
        </p>

        <p>
          The whole thing is a few hundred kilobytes and one person&rsquo;s
          opinions. If something here is broken or wrong, I would like to know.
        </p>

        <Footnotes />
      </div>
    </FootnotesProvider>
  );
}
