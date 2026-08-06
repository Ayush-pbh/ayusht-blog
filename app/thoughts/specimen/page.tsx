import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2, H3 } from "@/components/Headings";
import { BlockCode, InlineCode } from "@/components/Code";
import { BlockMath, InlineMath } from "@/components/Math";
import { Ul, Ol, Li } from "@/components/List";
import BlockQuote from "@/components/BlockQuote";
import InlineLink from "@/components/InlineLink";
import Figure from "@/components/Figure";
import LineChart from "@/components/LineChart";
import ExecuteAnimationScript from "@/components/ExecuteAnimationScript";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";
import paleBlueDot from "@/public/images/gallery/pale-blue-dot.webp";

const post = getPostBySlug("specimen");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content:
      "Footnote content is a React node, not a string, so it can hold markup — a link, a bit of code, emphasis.",
  },
  {
    id: 2,
    content:
      "At xl and above these render as sidenotes in the margin. Below that they collapse into the numbered list at the end. Widen the window to see the difference.",
  },
];

const chartData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 27 },
  { name: "May", value: 24 },
  { name: "Jun", value: 38 },
];

/** Canvas demo: a ring of dots that traces a slow Lissajous figure. */
const animation = `
const canvas = document.createElement("canvas");
canvas.width = 1200;
canvas.height = 500;
container.appendChild(canvas);

const ctx = canvas.getContext("2d");
const ink = getComputedStyle(document.body).color;
let t = 0;

function frame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = ink;
  for (let i = 0; i < 90; i++) {
    const p = t + i * 0.06;
    const x = canvas.width / 2 + Math.sin(p * 1.1) * 460;
    const y = canvas.height / 2 + Math.sin(p * 1.7) * 190;
    ctx.globalAlpha = 1 - i / 90;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  t += 0.01;
  requestAnimationFrame(frame);
}

frame();
`;

export default function Specimen() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          Every component a post on this site can use, on one page. It is a
          draft on purpose — unlisted, out of the feeds and the sitemap, but
          live at its own URL and visible in <InlineCode code="npm run dev" />.
          When a component changes, this is the page that tells you what broke.
        </p>

        <H2>Text</H2>

        <p>
          Body copy is Inter at <InlineCode code="text-sm" />, justified with
          hyphenation on. This paragraph exists to give it enough length to show
          how it sets: a measure long enough that the justification has
          something to do, and the hyphenation dictionary gets a chance to break
          an inconveniently long word somewhere near the end.
        </p>

        <p>
          Inline styles: <strong>strong is semibold</strong>,{" "}
          <em>em is serif italic</em>, <i>and so is i</i>,{" "}
          <q>and q, which also gets quotation marks</q>. That serif italic is a
          global rule, not a component — which is why the navigation looks the
          way it does. An{" "}
          <InlineLink href="https://ayusht.me">inline link</InlineLink> is
          underlined and darkens on hover; an{" "}
          <InlineLink href="https://en.wikipedia.org/wiki/Colophon_(publishing)">
            external one
          </InlineLink>{" "}
          opens in a new tab automatically.
        </p>

        <H2>Headings</H2>

        <p>
          The page title above is <InlineCode code="H1" />, set by{" "}
          <InlineCode code="PostHeader" />. This section is an{" "}
          <InlineCode code="H2" />. Both generate their own{" "}
          <InlineCode code="id" /> from their text and render a{" "}
          <InlineCode code="§" /> anchor in the left margin — hover the heading
          to see it.
        </p>

        <H3>And this is an H3</H3>

        <p>
          Smaller, same anchor behaviour. Two levels is all a post should
          normally need.
        </p>

        <H2>Lists</H2>

        <Ul>
          <Li>An unordered item.</Li>
          <Li>
            One that nests:
            <Ul>
              <Li>A child item.</Li>
              <Li>Another child.</Li>
            </Ul>
          </Li>
          <Li>A last item, to close the group.</Li>
        </Ul>

        <Ol>
          <Li>Ordered lists count.</Li>
          <Li>They keep counting.</Li>
          <Li>Then they stop.</Li>
        </Ol>

        <H2>Quotes</H2>

        <p>
          A block quote pulls left into the margin and sets in serif italic. It
          takes an author, a source, or both, and the source can carry a link.
        </p>

        <BlockQuote
          author="Edsger W. Dijkstra"
          source="The Humble Programmer"
          href="https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html"
        >
          <p>
            The competent programmer is fully aware of the limited size of his
            own skull.
          </p>
        </BlockQuote>

        <H2>Code</H2>

        <p>
          Inline code like <InlineCode code="getAllPosts()" /> sits in the
          sentence. Block code runs through rehype-pretty-code at render time,
          in an async server component — the highlighting is baked into the HTML
          and no highlighter ships to the browser.
        </p>

        <BlockCode
          meta="ts"
          code={`export function getShuffledQuotes(): Quote[] {
  const shuffled = [...quotes];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}`}
        />

        <p>Another language, to check the theme holds:</p>

        <BlockCode
          meta="css"
          code={`.theme-transition,
.theme-transition * {
  transition:
    background-color 1s ease,
    color 1s ease !important;
}`}
        />

        <H2>Maths</H2>

        <p>
          Inline maths sets on the line — <InlineMath math="e^{i\pi} + 1 = 0" />{" "}
          — and block maths gets its own centred line:
        </p>

        <BlockMath math="\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}" />

        <p>
          Both are KaTeX rendered to an HTML string, so there is no client-side
          maths library either.
        </p>

        <H2>Footnotes and sidenotes</H2>

        <p>
          A footnote link is a superscript number.
          <FootnoteLink id={1} /> The note itself can hold anything a React node
          can hold. On a wide enough screen they leave the bottom of the page
          entirely and set in the right margin instead.
          <FootnoteLink id={2} />
        </p>

        <H2>Figures</H2>

        <Figure
          src={paleBlueDot}
          alt="Earth as a point of light in a band of scattered sunlight"
          caption="Figure: an image with a caption. Takes anything next/image takes."
        />

        <H2>Charts</H2>

        <p>
          Recharts, wrapped so the line picks up the theme&rsquo;s blue and the
          frame picks up the neutral ramp. It is a client component — the one
          place a post pulls real JavaScript.
        </p>

        <LineChart data={chartData} />

        <H2>Canvas</H2>

        <p>
          The escape hatch: a string of JavaScript handed{" "}
          <InlineCode code="container" /> and a tracked{" "}
          <InlineCode code="requestAnimationFrame" />, with every frame
          cancelled on unmount. Anything that can be drawn can go here.
        </p>

        <ExecuteAnimationScript id="specimen-lissajous">
          {animation}
        </ExecuteAnimationScript>

        <p>
          That is the whole vocabulary. If a piece needs something not on this
          page, it needs a new component — and this page is where it should show
          up first.
        </p>

        <Footnotes />
      </div>
    </FootnotesProvider>
  );
}
