import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import { BlockCode, InlineCode } from "@/components/Code";
import { BlockMath, InlineMath } from "@/components/Math";
import InlineLink from "@/components/InlineLink";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("the-cost-of-autonomy");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Anthropic,{" "}
        <InlineLink href="https://platform.claude.com/docs/en/about-claude/pricing">
          Pricing
        </InlineLink>
        , read October 2026. Sonnet 5.5 is listed at $2 per million input
        tokens, $2.50 for five-minute cache writes, $0.10 for cache hits and $10
        for output. The same page notes that Claude 4.7 and later use a
        tokenizer producing roughly 30% more tokens for the same text, so
        per-token prices do not compare cleanly across model generations.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Anthropic,{" "}
        <InlineLink href="https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching">
          Prompt caching
        </InlineLink>
        , read October 2026. The prefix order, the four-breakpoint limit, the
        20-block lookback, the 512-token minimum on current models, and the
        detail that the five-minute lifetime runs from the start of the request
        all come from this page.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        OpenAI,{" "}
        <InlineLink href="https://developers.openai.com/api/docs/guides/prompt-caching">
          Prompt caching
        </InlineLink>
        , read October 2026: on by default, 1,024-token minimum on GPT-5.6 and
        later, cached reads at 0.1× the input rate, reported in{" "}
        <InlineCode code="usage.input_tokens_details.cached_tokens" />.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        Schroeder et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2502.03771">
          vCache: Verified Semantic Prompt Caching
        </InlineLink>
        . Their argument is that one global similarity threshold carries no
        correctness guarantee and produces unexpected error rates; they learn a
        threshold per cached prompt against a user-set error bound instead.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Singh et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2602.13165">
          Asynchronous Verified Semantic Caching for Tiered LLM Architectures
        </InlineLink>
        , which frames the threshold as a hard tradeoff between missed reuse and
        serving semantically incorrect responses.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Chen, Zaharia and Zou,{" "}
        <InlineLink href="https://arxiv.org/abs/2305.05176">
          FrugalGPT
        </InlineLink>{" "}
        (2023). The headline figure is matching GPT-4 at up to 98% lower cost on
        their benchmarks, with a learned cascade of cheaper models.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Ong et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2406.18665">
          RouteLLM: Learning to Route LLMs with Preference Data
        </InlineLink>{" "}
        (2024), which reports cost reductions of over 2× in some settings
        without hurting response quality.
      </>
    ),
  },
];

export default function TheCostOfAutonomy() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          An agent loop has no memory. Every step, the whole conversation goes
          back over the wire: the system prompt, the tool schemas, every tool
          call the model has made so far and every blob of JSON those calls
          returned. The model reads all of it again, from the top, to decide
          what to do next. That one fact explains most agent bills, and most of
          the slowness. It also takes some air out of the fear that autonomy is
          inherently ruinous. A lot of what gets called the cost of autonomy is
          really the cost of a naive loop, and the loop can be fixed.
        </p>

        <H2>The bill is quadratic, and the loop is why</H2>

        <p>
          Put some numbers on it. Say your agent has a fixed prefix of{" "}
          <InlineMath math="P" /> tokens: system prompt plus tool definitions.
          Each step adds <InlineMath math="d" /> tokens to the context: the
          model&apos;s own tool call, plus whatever the tool sends back. Step{" "}
          <InlineMath math="k" /> sends <InlineMath math="P + (k-1)d" /> tokens
          as input. Over <InlineMath math="N" /> steps, the input you pay for is
        </p>

        <BlockMath math="\sum_{k=1}^{N} \bigl(P + (k-1)d\bigr) = NP + d\,\frac{N(N-1)}{2}" />

        <p>
          The first term is linear and boring. The second is the one that eats
          you. Take a modest coding agent: an 8,000-token prefix, 2,000 tokens
          added per step (a file read here, a test run there), thirty steps to
          finish a task. The context the model ever sees, start to finish, is
          68,000 tokens. The input you are billed for is 1,110,000 tokens. You
          paid to send each token about sixteen times.
        </p>

        <p>
          And it scales the wrong way. Same agent, same per-step growth: at ten
          steps the input bill on Sonnet 5.5, which lists at $2 per million
          input tokens as of October 2026,
          <FootnoteLink id={1} /> is $0.34. At thirty it is $2.22. At sixty it
          is $8.04. Doubling the step count from thirty to sixty multiplies the
          input bill by about 3.6, because the triangle grows with the square.
          This is why demos look cheap and production does not: the demo task
          takes eight steps, and the real one, with the flaky test and the
          second file nobody mentioned, takes fifty.
        </p>

        <p>
          Two things follow, and neither is the one people usually take away.
          The first is that output tokens, the thing everyone watches because
          they are priced five times higher, barely register. In that
          thirty-step run, with a generous 300 output tokens per step, output
          costs nine cents. Input is about 96% of the bill. The second is that
          per-token price is the least interesting lever you have. Halving{" "}
          <InlineMath math="d" /> cuts the input bill from $2.22 to $1.35
          without touching the model. Cutting <InlineMath math="N" />, by doing
          more per step, cuts it faster still. Every serious optimisation is one
          of three moves: fewer steps, smaller deltas, or a cheaper price for
          the bit you re-read. The rest of this piece is about doing them in
          roughly that order of honesty.
        </p>

        <p>
          I want to be fair to the hook, too. The bill arriving is a real event,
          but the scary part is usually the tail, not the mean. A two-dollar
          task that replaces an hour of someone&apos;s afternoon is a bargain.
          What hurts is the task that loops: the agent that keeps re-running a
          failing test, each run appending another wall of stack trace to a
          context that is billed again on every turn. A step cap and a per-task
          token budget are not glamorous, but they are the single most effective
          cost control in this whole article, because they put a hard ceiling on{" "}
          <InlineMath math="N" />, and <InlineMath math="N" /> is squared.
        </p>

        <H2>Prompt caching is the closest thing to a free lunch</H2>

        <p>
          Because the loop re-sends an ever-longer but otherwise identical
          prefix, it is the ideal customer for prompt caching. The provider
          keeps the already-processed prefix around, and when your next request
          starts with exactly the same tokens, you pay a fraction of the input
          rate for that stretch.
        </p>

        <p>
          On Anthropic&apos;s API, as of this writing, a five-minute cache write
          costs 1.25× the base input price, a one-hour write costs 2×, and a hit
          costs 0.1×, dropping to 0.05× on Opus 5.5 and Sonnet 5.5.
          <FootnoteLink id={2} /> You can mark breakpoints by hand with{" "}
          <InlineCode code="cache_control" /> on individual content blocks, up
          to four of them, or put a single <InlineCode code="cache_control" />{" "}
          at the top level of the request and let the breakpoint ride forward as
          the conversation grows, which is exactly what an agent loop wants:
        </p>

        <BlockCode
          meta="json"
          code={`{
  "model": "claude-sonnet-5-5",
  "max_tokens": 2048,
  "cache_control": { "type": "ephemeral" },
  "tools": [ ... ],
  "system": "You are a coding agent ...",
  "messages": [ ... ]
}`}
        />

        <p>
          OpenAI does it without asking. Caching is on by default for supported
          models, kicks in above 1,024 tokens on GPT-5.6 and later, and bills
          cached reads at a tenth of the input rate; you find out whether it
          worked by reading <InlineCode code="cached_tokens" /> in the usage
          block.
          <FootnoteLink id={3} />
        </p>

        <p>
          Run the same thirty-step agent through the arithmetic with automatic
          caching on Sonnet 5.5. Each step reads the previous step&apos;s prompt
          from cache at $0.10 per million and writes only the new{" "}
          <InlineMath math="d" /> tokens at the 1.25× rate. The cost model is
          short enough to show whole:
        </p>

        <BlockCode
          meta="python"
          code={`# Sonnet 5.5 list prices, USD per million tokens (as of Oct 2026)
BASE_IN, WRITE_5M, HIT, OUT = 2.00, 2.50, 0.10, 10.00

def agent_cost(steps, prefix, delta, out_per_step, cached):
    cost = 0.0
    for k in range(1, steps + 1):
        context = prefix + (k - 1) * delta  # everything re-sent this step
        if not cached:
            cost += context * BASE_IN
        elif k == 1:
            cost += context * WRITE_5M  # first request writes the prefix
        else:
            reused = prefix + (k - 2) * delta  # last request's prompt
            cost += reused * HIT + (context - reused) * WRITE_5M
        cost += out_per_step * OUT
    return cost / 1_000_000

agent_cost(30, 8_000, 2_000, 300, cached=False)  # 2.31
agent_cost(30, 8_000, 2_000, 300, cached=True)   # 0.36`}
        />

        <p>
          $2.31 becomes about $0.36. The quadratic term has not gone anywhere.
          It is still there in <InlineCode code="reused * HIT" />, it just costs
          a twentieth as much. Output, the nine cents nobody worried about, is
          now a quarter of the bill.
        </p>

        <p>
          The catch is that a cache hit is all or nothing on an exact prefix,
          and agent frameworks are wonderful at breaking prefixes. Anthropic
          documents the hierarchy plainly: tools, then system, then messages,
          and a change at any level invalidates that level and everything after
          it. Re-order your tool list, and you have invalidated everything.
          Stamp the current time into the system prompt and every call pays the
          write premium on the system prompt and the entire conversation after
          it, while the dashboard cheerfully reports that caching is enabled.
          The same goes for shuffling retrieved documents, or switching thinking
          settings mid-run. Treat the prefix as an append-only log. Anything
          dynamic goes at the end.
        </p>

        <p>
          There is a subtler failure that bites agents specifically. The
          five-minute lifetime is measured from the start of the request that
          last touched the entry, not from when its response finished. An agent
          that kicks off a long build or a slow integration test can easily
          leave the cache idle long enough to expire, and the next step pays the
          write premium on the entire accumulated context. If your tools are
          slow, the one-hour TTL at 2× is often the cheaper option, which is an
          odd thing to say about the more expensive setting, but that is the
          arithmetic. Watch <InlineCode code="cache_read_input_tokens" /> per
          step, not per day. A daily average hides exactly the long runs that
          cost the most.
        </p>

        <H2>Semantic caching answers the question you almost asked</H2>

        <p>
          Prompt caching is exact and boring, which is why it works. Semantic
          caching is the exciting cousin: embed the incoming prompt, find the
          nearest previous prompt, and if the cosine similarity clears a
          threshold, return the stored answer and skip the model entirely. No
          tokens at all. It sounds like the obvious next step, and for agents I
          think it is mostly a trap.
        </p>

        <p>
          The problem is that embedding similarity measures topic, and
          correctness depends on details. &quot;Refund order 4471&quot; and
          &quot;refund order 4417&quot; are, to an embedding model, nearly the
          same sentence. So are &quot;is this migration safe to run on
          staging&quot; and &quot;is this migration safe to run on
          production&quot;. So are a question and its negation. The cache does
          not know it has made a mistake; it returns a confident, well-formatted
          answer to a neighbouring question, and nothing downstream flags it.
        </p>

        <p>
          The research has caught up with this. The vCache authors argue that
          the standard design, one global similarity threshold, gives you no
          correctness guarantee at all and produces error rates you cannot
          predict in advance; their fix is to learn a separate threshold per
          cached entry against an error bound you set.
          <FootnoteLink id={4} /> A follow-up describes the same knob as a hard
          tradeoff: tighten it and you lose safe reuse, loosen it and you serve
          semantically wrong answers.
          <FootnoteLink id={5} /> That is the honest summary. The threshold is
          not a tuning parameter, it is an error budget, and most deployments
          set it once by eyeballing a dozen examples.
        </p>

        <p>
          Agents make this worse in two ways. An agent&apos;s intermediate
          prompts are not standalone questions; they are a question plus a
          state. Two steps that read alike can sit on top of completely
          different files, tool outputs and user permissions, and a cache keyed
          on the visible text throws all of that away. And an agent acts on what
          it gets back. A wrong cached answer in a chatbot is a bad reply; in an
          agent it is a wrong tool call made with full confidence.
        </p>

        <p>
          Where semantic caching earns its keep is the front door: high-volume,
          stateless, low-stakes queries, like FAQ-style support, where you can
          afford to verify. Inside the loop, cache the deterministic things
          exactly instead. Hash the arguments of a pure tool call, a file read
          at a given commit, a schema lookup, a search against a frozen index,
          and reuse the result. That is just memoisation, and memoisation has
          never returned the answer to a different question.
        </p>

        <H2>Forty-five seconds is just thirty round trips</H2>

        <p>
          The latency hook deserves the same treatment as the cost one, because
          the number is less mysterious than it sounds. I have not benchmarked
          anything for this piece, and I would be suspicious of anyone quoting a
          universal per-step latency, since it swings with model, region, load
          and prompt length. But the structure is simple. An agent step is a
          model call followed by a tool call, and the steps are serial: step
          seven cannot start until step six has come back. Thirty steps at a
          second and a half each is forty-five seconds, before any tool does
          anything slow. Nothing exotic required.
        </p>

        <p>
          Each model call has two phases with different costs. Prefill is
          reading the input, and it grows with context length, which is the same
          quadratic shape as the bill, showing up as time. Decode is generating
          the output, token by token, and its cost scales with how much the
          model writes. Prompt caching helps the first: a cached prefix is work
          the provider does not redo. Nothing about caching helps the second.
        </p>

        <p>
          So the latency levers line up almost exactly with the cost levers.
          Fewer steps is the big one. A model that can issue several independent
          tool calls in one turn, read these three files, run these two greps,
          collapses several round trips into one, and you should design tools to
          make that natural rather than forcing a read-think-read-think rhythm.
          Shorter outputs per step help decode, which argues for letting the
          model call tools tersely rather than narrating its plans in prose it
          will then have to re-read. And for anything nobody is waiting on, like
          overnight codebase sweeps or bulk evaluation runs, stop paying for
          interactivity at all: Anthropic&apos;s Batch API is half price on
          input and output, and it stacks with the caching multipliers.
          <FootnoteLink id={1} />
        </p>

        <p>
          The deeper fix is architectural, and it belongs to a different
          argument: a lot of what agents do step by step does not need a model
          deciding it step by step. If the sequence is known, encode it.{" "}
          <InlineLink href="/thoughts/prompt-engineering-to-control-flow">
            Moving from prompts to control flow
          </InlineLink>{" "}
          takes model calls out of the loop entirely, which no caching scheme
          can match.
        </p>

        <H2>Shrink the delta, not the price</H2>

        <p>
          The standard advice for cost is routing: send easy requests to a cheap
          model and hard ones to a frontier model. The research backs the
          general idea. FrugalGPT reported matching GPT-4 at up to 98% lower
          cost on its benchmarks with a learned cascade,
          <FootnoteLink id={6} /> and RouteLLM reported savings of over 2× in
          some settings without hurting quality.
          <FootnoteLink id={7} /> The price spread makes it tempting. Haiku 5.5
          lists at $0.10 per million input tokens for prompts up to 100,000
          tokens, a twentieth of Sonnet 5.5.
          <FootnoteLink id={1} />
        </p>

        <p>
          But routing the <em>agent</em> to a smaller model is where I think
          most teams get it backwards. The expensive part of the loop is the
          planner re-reading a huge context, and the planner is exactly the part
          you least want to downgrade, because a weaker planner takes more
          steps, and steps are squared. Save forty percent on price and lose it
          twice over on <InlineMath math="N" />.
        </p>

        <p>
          The better use of a small model is to attack <InlineMath math="d" />.
          Every tool result that enters the context gets paid for on every
          remaining step. A 6,000-token test log that lands at step five of
          thirty is billed twenty-five more times. Put a small, fast model, or a
          local one, between the tool and the planner, and have it compress the
          observation: the three failing tests and their assertion messages, not
          the full log. The small model reads the 6,000 tokens once, cheaply.
          The frontier model reads 300 tokens, twenty-five times. That is the
          hybrid I would actually ship: the big model plans, the small models
          clean up what it has to read.
        </p>

        <p>
          Local models fit this role better than they fit the planner&apos;s
          chair. Summarising a log, classifying a diff, extracting the fields
          from a messy tool response: these are narrow jobs with checkable
          outputs, and a small model on your own hardware does them with no
          per-token bill and no data leaving the machine. What that looks like
          end to end is in{" "}
          <InlineLink href="/thoughts/local-first-agents">
            local-first agents
          </InlineLink>
          . The hardware is not free, and a laptop model will often be slower
          per token than a hosted one, so the win is in privacy and in the
          marginal cost of the millionth summary, not in wall-clock speed.
        </p>

        <p>
          None of this makes an agent cheap by default. It makes the cost
          legible. Once you can write the bill as{" "}
          <InlineMath math="NP + dN(N-1)/2" />, times a price, you stop arguing
          about which model is cheapest and start asking better questions. Why
          does this task take forty steps? Why is a directory listing two
          thousand tokens? Why did the cache miss on step nineteen? Those have
          answers, and the answers live in your code, not in a provider&apos;s
          pricing page. The wider point, that{" "}
          <InlineLink href="/thoughts/beyond-the-wrapper">
            the value of an agent sits in what you build around the model
          </InlineLink>
          , applies to its economics too. The bill is mostly a measure of how
          carefully you built the loop.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
