import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import InlineLink from "@/components/InlineLink";
import { InlineCode } from "@/components/Code";
import { Ol, Li } from "@/components/List";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";
import ChartFigure from "@/components/charts/ChartFigure";
import Scatter, { type ScatterPoint } from "@/components/charts/Scatter";
import Dumbbell from "@/components/charts/Dumbbell";
import {
  SNAPSHOT,
  models,
  blended,
  byId,
  cheapestBetter,
  type Model,
} from "./data";

const post = getPostBySlug("gpt-4o-retirement");

export async function generateMetadata() {
  return createMetadata(post);
}

const usd = (v: number) =>
  v >= 1 ? `$${v.toFixed(2)}` : `$${v.toFixed(v < 0.1 ? 3 : 2)}`;
const tick = (v: number) => (v < 1 ? `$${v.toFixed(2)}` : `$${v}`);
const source = (
  <>
    Data: OpenRouter, {SNAPSHOT} · Blended price is 3 parts input to 1 part
    output · ayusht.me
  </>
);

const retiring = models.filter((m) => m.retiring);
const luna = byId("openai/gpt-6-luna");
const gpt4o = byId("openai/gpt-4o");

/** "22×", "3.5×" — whole numbers once the ratio is big enough to be blunt. */
const times = (a: number, b: number) => {
  const r = a / b;
  return `${r >= 10 ? Math.round(r) : r.toFixed(1)}×`;
};

// Labels are placed by hand: three models sit within a few pixels of each
// other at $0.20, and two more share $4.00 exactly.
const qualityLabels: Record<string, Partial<ScatterPoint>> = {
  "openai/gpt-4o": { side: "left" },
  "openai/gpt-4.1": { side: "left" },
  "openai/gpt-4.1-mini": { side: "right" },
  "openai/gpt-4o-mini": { side: "right" },
  "openai/gpt-4.1-nano": { side: "left" },
  "openai/gpt-6-luna": { side: "left", dy: -6 },
  "anthropic/claude-haiku-5.5": { side: "left", dy: 9 },
  "qwen/qwen3.8-flash": { side: "above", dx: 18 },
  "openai/gpt-5.6-luna": { side: "right" },
  "google/gemini-3.1-flash-lite": { side: "below" },
  "google/gemini-3.8-flash": { side: "right" },
  "anthropic/claude-sonnet-5.5": { side: "left", dy: -6 },
  "openai/gpt-6-sol": { side: "left", dy: 9 },
};

const qualityPoints: ScatterPoint[] = models
  .filter((m): m is Model & { gpqa: number } => m.gpqa !== null)
  .map((m) => ({
    key: m.id,
    x: blended(m),
    y: m.gpqa,
    emphasis: m.retiring,
    label: m.name,
    ...qualityLabels[m.id],
    tooltip: `${m.maker} ${m.name}: ${usd(blended(m))}/M blended, GPQA ${m.gpqa}%`,
  }));

// The speed chart has every model; only the ones the text discusses are
// labelled, and the dense middle is left to the tooltips.
const speedLabels: Record<string, Partial<ScatterPoint>> = {
  "openai/gpt-4o": { side: "left" },
  "openai/gpt-4o-mini": { side: "left" },
  "openai/gpt-4.1": { side: "right", dy: -4 },
  "openai/gpt-4.1-mini": { side: "below", dx: 22 },
  "openai/gpt-6-luna": { side: "above" },
  "openai/gpt-5.6-luna": { side: "left" },
  "anthropic/claude-haiku-5.5": { side: "left" },
  "google/gemini-3.1-flash-lite": { side: "right" },
  "z-ai/glm-5.3-flash": { side: "left" },
  "mistralai/mistral-small-2603": { side: "below" },
  "openai/gpt-6-sol": { side: "right" },
  "google/gemini-3.8-flash": { side: "right" },
  "anthropic/claude-sonnet-5.5": { side: "above" },
  "google/gemini-4-argon": { side: "left" },
};

const speedPoints: ScatterPoint[] = models.map((m) => ({
  key: m.id,
  x: m.latency,
  y: m.throughput,
  emphasis: m.retiring,
  label: speedLabels[m.id] ? m.name : undefined,
  ...speedLabels[m.id],
  tooltip: `${m.maker} ${m.name}: ${m.latency}s latency, ${m.throughput} tok/s`,
}));

const billRows = [...retiring]
  .sort((a, b) => blended(b) - blended(a))
  .map((m, i) => ({
    key: m.id,
    label: m.name,
    sublabel: `$${m.input} in · $${m.output} out`,
    from: blended(m),
    to: blended(luna),
    toLabel: i === 0 ? `GPT-6 Luna ${usd(blended(luna))}` : undefined,
    note: `${times(blended(m), blended(luna))} cheaper`,
    tooltip: `${m.name} ${usd(blended(m))}/M → GPT-6 Luna ${usd(blended(luna))}/M`,
  }));

const cell = "border-b border-neutral-200 px-3 py-2.5 text-left align-top";
const head =
  "text-label border-b border-neutral-300 px-3 py-2 text-left font-mono font-normal text-neutral-500 uppercase";

function DataTable({ rows }: { rows: Model[] }) {
  return (
    <table className="w-full min-w-[560px] border-collapse text-[0.8125rem] tabular-nums">
      <thead>
        <tr>
          <th className={head}>Model</th>
          <th className={head}>In / out per 1M</th>
          <th className={head}>Blended</th>
          <th className={head}>GPQA</th>
          <th className={head}>Latency</th>
          <th className={head}>Tok/s</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((m) => (
          <tr key={m.id}>
            <td className={cell}>
              {m.maker} {m.name}
              {m.retiring && (
                <span className="text-label ml-2 font-mono text-neutral-400 uppercase">
                  retiring
                </span>
              )}
            </td>
            <td className={cell}>
              ${m.input} / ${m.output}
            </td>
            <td className={cell}>{usd(blended(m))}</td>
            <td className={cell}>{m.gpqa === null ? "—" : `${m.gpqa}%`}</td>
            <td className={cell}>{m.latency}s</td>
            <td className={cell}>{m.throughput}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        OpenAI,{" "}
        <InlineLink href="https://developers.openai.com/api/docs/deprecations">
          API deprecations
        </InlineLink>
        , entry dated 14 October 2026. It lists the dated snapshots
        (gpt-4o-2024-08-06, gpt-4o-2024-11-20, gpt-4o-mini-2024-07-18,
        gpt-4.1-2025-04-14, gpt-4.1-mini-2025-04-14), says fine-tuned versions
        follow the same schedule, and recommends gpt-6-luna for all four.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Prices from OpenRouter&apos;s public{" "}
        <InlineLink href="https://openrouter.ai/api/v1/models">
          models API
        </InlineLink>
        ; latency, throughput and GPQA from each model&apos;s OpenRouter page,
        e.g.{" "}
        <InlineLink href="https://openrouter.ai/openai/gpt-4o">
          GPT-4o
        </InlineLink>
        , all read on {SNAPSHOT}. Latency is the P50 of the best provider,
        throughput the P50 best across providers. These move week to week; the
        full snapshot is in this post&apos;s source.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Rein et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2311.12022">
          GPQA: A Graduate-Level Google-Proof Q&amp;A Benchmark
        </InlineLink>{" "}
        (2023). The scores here are OpenRouter&apos;s own runs, which it
        describes as each model&apos;s outputs on shared benchmark prompts,
        auto-routed across providers — not the labs&apos; published numbers.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        OpenRouter&apos;s one-week average end-to-end latency, best provider,
        read from the same pages on {SNAPSHOT}. End-to-end time depends on how
        long the answers are, and that depends on the traffic each model happens
        to be serving, so treat it as a hint about verbosity, not a benchmark.
      </>
    ),
  },
];

export default function Gpt4oRetirement() {
  const rows = [...models].sort((a, b) => blended(a) - blended(b));
  const mini = byId("openai/gpt-4o-mini");
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          On 14 January 2027, OpenAI switches off GPT-4o, GPT-4o mini, GPT-4.1
          and GPT-4.1 mini in the API, and OpenRouter goes with it, including
          requests that bring their own OpenAI key.
          <FootnoteLink id={1} /> These were the default models of a whole era
          of LLM apps, so a lot of production code is about to get a deadline.
          The good news is unusually good: OpenAI&apos;s own suggested
          replacement, GPT-6 Luna, costs {times(blended(gpt4o), blended(luna))}{" "}
          less than GPT-4o and scores {Math.round(luna.gpqa! - gpt4o.gpqa!)}{" "}
          points higher on GPQA. The bad news is that &ldquo;cheaper and
          smarter&rdquo; is not the same thing as &ldquo;safe to swap&rdquo;.
        </p>

        <p>
          I pulled the price, speed and benchmark numbers for the four retiring
          models and fourteen of their likely replacements from OpenRouter.
          <FootnoteLink id={2} /> Here is what they say, and what they
          don&apos;t.
        </p>

        <H2>Every retiring model is now beaten on both axes</H2>

        <p>
          This is the chart I&apos;d put in front of anyone who wants to wait
          until December. Price is on a log scale because the spread is two
          orders of magnitude; the retiring models are the four in ink.
        </p>

        <ChartFigure
          title="The retiring models are the most expensive way to get the lowest scores on this chart"
          subtitle="Blended price per million tokens against GPQA Diamond. Up and to the left is better."
          legend={[
            { label: "Retiring 14 Jan 2027", emphasis: true },
            { label: "Alternatives on OpenRouter" },
          ]}
          source={source}
          table={<DataTable rows={rows.filter((m) => m.gpqa !== null)} />}
        >
          <Scatter
            ariaLabel="Scatter plot of blended price against GPQA Diamond score. GPT-4o, GPT-4.1, GPT-4.1 mini and GPT-4o mini score between 43 and 67 percent; most alternatives score between 84 and 96 percent, several at a fraction of the price."
            points={qualityPoints}
            x={{
              domain: [0.1, 10],
              ticks: [0.1, 0.3, 1, 3, 10],
              format: tick,
              label: "Blended price, $ per 1M tokens (log)",
              log: true,
            }}
            y={{
              domain: [40, 100],
              ticks: [40, 50, 60, 70, 80, 90, 100],
              format: (v) => `${v}%`,
              label: "GPQA Diamond",
            }}
            arrow={{
              from: "openai/gpt-4o",
              to: "openai/gpt-6-luna",
              text: [
                `${times(blended(gpt4o), blended(luna))} cheaper,`,
                `+${Math.round(luna.gpqa! - gpt4o.gpqa!)} points`,
              ],
              bend: -0.22,
            }}
          />
        </ChartFigure>

        <p>
          Two things jump out. First, the gap is not subtle. The four retiring
          models score between {mini.gpqa}% and{" "}
          {byId("openai/gpt-4.1-mini").gpqa}% on GPQA Diamond, a set of
          graduate-level science questions written to be hard to look up.
          <FootnoteLink id={3} /> Almost everything else on the chart sits
          between 84% and 96%. Second, the cheap end of the market caught up
          with the expensive end and then passed it. GPT-6 Luna, Claude Haiku
          5.5 and Qwen3.8 Flash cluster around twenty cents per million blended
          tokens, cheaper than GPT-4o mini, at scores GPT-4o never reached.
        </p>

        <p>
          GPQA is a science quiz, and most production traffic is not a science
          quiz. Nobody should pick a model for ticket triage because of its
          organic chemistry. But it is a decent proxy for the thing that
          actually changed over these two years, which is how much reasoning you
          get per dollar, and on that measure the retiring models are not close.
        </p>

        <H2>Speed: mostly better, with one honest exception</H2>

        <p>
          Cost is half the reason people stayed on GPT-4o mini. The other half
          was that it was quick. So here is speed: time to a response on the
          horizontal axis (lower is better), and how fast the model writes once
          it starts on the vertical one (higher is better). The good corner is
          the top left.
        </p>

        <ChartFigure
          title="Most replacements write faster; not all of them start faster"
          subtitle="P50 latency of the best provider against P50 output speed. Up and to the left is better."
          legend={[
            { label: "Retiring 14 Jan 2027", emphasis: true },
            { label: "Alternatives on OpenRouter" },
          ]}
          source={source}
          table={<DataTable rows={rows} />}
        >
          <Scatter
            ariaLabel="Scatter plot of latency against throughput. The retiring models sit at 0.58 to 0.78 seconds and 69 to 95 tokens per second. Gemini 3.1 Flash Lite, GLM 5.3 Flash and Claude Haiku 5.5 reach 179 to 241 tokens per second at under 0.52 seconds."
            points={speedPoints}
            x={{
              domain: [0.2, 3.2],
              ticks: [0.25, 0.5, 1, 2, 3],
              format: (v) => `${v}s`,
              label: "Latency, P50 seconds (log)",
              log: true,
            }}
            y={{
              domain: [0, 260],
              ticks: [0, 50, 100, 150, 200, 250],
              format: (v) => `${v}`,
              label: "Tokens per second",
            }}
          />
        </ChartFigure>

        <p>
          The retiring models are bunched in the middle: around 0.6 to 0.8
          seconds to respond, 70 to 95 tokens a second. Claude Haiku 5.5 and
          GPT-5.6 Luna beat them on both counts, at 0.41 and 0.42 seconds and
          179 and 148 tokens a second. Gemini 3.1 Flash Lite writes at 241
          tokens a second, three and a half times GPT-4o.
        </p>

        <p>
          The exception is the one OpenAI recommends. GPT-6 Luna takes{" "}
          {luna.latency}s to respond against {mini.latency}s for GPT-4o mini, so
          if your product lives or dies on time-to-first-token, a drop-in swap
          to Luna makes it slightly worse. That is a small difference, but it is
          the kind that shows up in a voice agent or an autocomplete box before
          it shows up on a dashboard.
        </p>

        <H2>What it does to the bill</H2>

        <p>
          If you just take OpenAI&apos;s suggestion and move every one of these
          to GPT-6 Luna, this is what happens to the per-token price:
        </p>

        <ChartFigure
          title="Moving to OpenAI's suggested replacement cuts every one of these bills"
          subtitle="Blended price per million tokens today, and on GPT-6 Luna."
          source={source}
        >
          <Dumbbell
            ariaLabel={`Price moving from each retiring model to GPT-6 Luna: ${billRows
              .map(
                (r) => `${r.label} ${usd(r.from)} to ${usd(r.to)}, ${r.note}`,
              )
              .join("; ")}.`}
            rows={billRows}
            domain={[0.1, 10]}
            ticks={[0.1, 0.3, 1, 3, 10]}
            format={tick}
            axisLabel="Blended price, $ per 1M tokens (log)"
          />
        </ChartFigure>

        <p>
          GPT-4o and GPT-4.1 go from dollars to cents. GPT-4o mini is the odd
          one: it was already cheap, so the saving is modest, and the reason to
          move is the {Math.round(luna.gpqa! - mini.gpqa!)}-point jump in
          quality rather than the bill. And Luna is not the only option. Here is
          the cheapest model that matches or beats each retiring one on GPQA{" "}
          <em>and</em> is no slower to respond:
        </p>

        <div className="my-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[0.8125rem] tabular-nums">
            <thead>
              <tr>
                <th className={head}>Retiring</th>
                <th className={head}>Today: price · GPQA · latency</th>
                <th className={head}>OpenAI&apos;s pick</th>
                <th className={head}>Cheapest that beats it on both</th>
              </tr>
            </thead>
            <tbody>
              {[...retiring]
                .sort((a, b) => blended(b) - blended(a))
                .map((m) => {
                  const pick = cheapestBetter(m);
                  return (
                    <tr key={m.id}>
                      <td className={`${cell} font-semibold text-neutral-900`}>
                        {m.name}
                      </td>
                      <td className={cell}>
                        {usd(blended(m))} · {m.gpqa}% · {m.latency}s
                      </td>
                      <td className={cell}>
                        GPT-6 Luna
                        <br />
                        <span className="text-neutral-500">
                          {times(blended(m), blended(luna))} cheaper, +
                          {Math.round(luna.gpqa! - m.gpqa!)} pts
                        </span>
                      </td>
                      <td className={cell}>
                        {pick ? (
                          <>
                            {pick.maker} {pick.name}
                            <br />
                            <span className="text-neutral-500">
                              {times(blended(m), blended(pick))} cheaper, +
                              {Math.round(pick.gpqa! - m.gpqa!)} pts,{" "}
                              {pick.latency}s
                            </span>
                          </>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <H2>Cheaper per token is not cheaper per request</H2>

        <p>
          Here is the part the price chart hides. GPT-6 Luna writes faster than
          GPT-4o mini, {luna.throughput} tokens a second against{" "}
          {mini.throughput}, yet its typical request on OpenRouter takes longer
          from start to finish: {luna.e2e}s against {mini.e2e}s.
          <FootnoteLink id={4} /> A model that writes faster but finishes later
          is writing more. Newer models tend to explain, hedge, format and
          reason out loud in ways the 2024 models didn&apos;t, and every one of
          those tokens is billed.
        </p>

        <p>
          So the per-token saving is real, but your per-request saving could be
          smaller, and on a short-answer workload it could even go the other
          way. The only number that matters is output tokens per request on{" "}
          <em>your</em> traffic, and nobody can chart that for you.
        </p>

        <H2>How I&apos;d actually migrate</H2>

        <p>
          Not by find-and-replace on the model string. These models have had two
          years to become load-bearing, and the prompts written for them quietly
          encode their habits: how terse GPT-4o mini is, how it formats a list,
          what it does when a tool returns an error. A smarter model with
          different habits can break a parser that worked fine with a dumber
          one.
        </p>

        <Ol>
          <Li>
            <strong>Build the golden set first.</strong> A few hundred real
            requests with known-good outputs, scored the way your product scores
            them — exact match for extraction, a rubric for prose. If you
            don&apos;t have this, January is a good excuse to start.
          </Li>
          <Li>
            <strong>Shadow before you switch.</strong> Send live traffic to the
            candidate in parallel, log both answers, compare. Watch three
            numbers: your quality score, output tokens per request, and p95
            latency, not just the median.
          </Li>
          <Li>
            <strong>Pin a dated snapshot.</strong> An alias quietly moves under
            you; a dated snapshot fails loudly on a date you can see coming. Pin
            the exact version, and put its retirement date in your calendar the
            day you adopt it.
          </Li>
          <Li>
            <strong>Cap the output.</strong> Set a sensible{" "}
            <InlineCode code="max_tokens" /> and say how long the answer should
            be in the prompt. Most of the per-request surprise above comes from
            the new models being chattier, and that is the cheapest thing to
            fix.
          </Li>
          <Li>
            <strong>
              Re-test tool calls and structured output explicitly.
            </strong>{" "}
            Schemas, argument formats and refusal behaviour are where model
            swaps break silently. GPT-4o mini was not perfect here either —
            OpenRouter measures a 5.1% tool-call error rate on OpenAI&apos;s own
            endpoint over the past week — so this is a chance to fix it, not
            just to preserve it.
          </Li>
        </Ol>

        <p>
          The deadline is three months away, which is about the right amount of
          time to do this properly and much too little to do it in the last
          week. The irony of this deprecation is that the forced upgrade is, on
          paper, the best deal OpenAI has offered in a while. The work is in
          making sure it is the best deal on your traffic too.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
