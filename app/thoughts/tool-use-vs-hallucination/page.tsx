import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import { BlockCode, InlineCode } from "@/components/Code";
import InlineLink from "@/components/InlineLink";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("tool-use-vs-hallucination");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Brandon T. Willard and Rémi Louf, 2023. The paper behind Outlines.{" "}
        <InlineLink href="https://arxiv.org/abs/2307.09702">
          Efficient Guided Generation for Large Language Models
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        The guarantees listed are that tool input follows the schema and the
        tool name is always valid.{" "}
        <InlineLink href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use">
          Anthropic, Strict tool use
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        OpenAI requires <InlineCode code="additionalProperties: false" /> and
        every field marked required in strict mode; Responses tries to normalise
        schemas into strict mode and falls back to non-strict when it cannot.{" "}
        <InlineLink href="https://developers.openai.com/api/docs/guides/function-calling">
          OpenAI, Function calling
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        The refusal, <InlineCode code="max_tokens" />, enum-casing and
        unsupported-constraint caveats are all in the limitations section of{" "}
        <InlineLink href="https://platform.claude.com/docs/en/build-with-claude/structured-outputs">
          Anthropic, Structured outputs
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Including the note that unsupported schema features are skipped
        silently, and the advice to validate output anyway.{" "}
        <InlineLink href="https://github.com/ggml-org/llama.cpp/blob/master/grammars/README.md">
          llama.cpp, GBNF Guide
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Park, Wang, Berg-Kirkpatrick, Polikarpova and D&rsquo;Antoni, 2024.{" "}
        <InlineLink href="https://arxiv.org/abs/2405.21047">
          Grammar-Aligned Decoding
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        The relevance-detection category and the interest-rate example are both
        from the original{" "}
        <InlineLink href="https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html">
          Berkeley Function Calling Leaderboard
        </InlineLink>{" "}
        write-up.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        Tam et al., 2024,{" "}
        <InlineLink href="https://arxiv.org/abs/2408.02442">
          Let Me Speak Freely?
        </InlineLink>
        , and the reply from Will Kurt at .txt,{" "}
        <InlineLink href="https://blog.dottxt.ai/say-what-you-mean.html">
          Say What You Mean
        </InlineLink>
        , which argues the structured and unstructured runs were given different
        prompts.
      </>
    ),
  },
];

export default function ToolUseVsHallucination() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          Function calling is the weakest link in an agent, but not for the
          reason people usually give. The standard complaint is that models
          break the JSON, invent parameter types and call functions that do not
          exist. In late 2026 those are mostly solved problems, solved at the
          decoding layer, and you can switch the fix on with one field. What is
          left after the fix is worse: calls that are perfectly valid and
          completely wrong.
        </p>

        <p>
          That is the argument of this piece. Syntax is now something you can
          very nearly guarantee. Meaning is not, and no grammar will give it to
          you. The interesting engineering is everything that happens between
          &ldquo;the model emitted a well-formed call&rdquo; and &ldquo;we did
          something to a customer&rsquo;s account&rdquo;.
        </p>

        <H2>The syntax problem is solved, mostly</H2>

        <p>
          The mechanism is simple enough to hold in your head. At every decoding
          step the model produces a score for each token in its vocabulary.
          Constrained decoding keeps track of where you are in a grammar, works
          out which tokens could legally come next, and masks the rest before
          sampling. If the grammar says the next thing must be a digit, the
          model cannot emit a quote mark, however much it wants to. Willard and
          Louf showed in 2023 that you can compile a regular expression or
          grammar into a finite-state machine indexed against the vocabulary, so
          the mask is cheap to compute.
          <FootnoteLink id={1} /> That paper became Outlines, and the same idea,
          in various implementations, now sits under every major
          provider&rsquo;s structured-output mode.
        </p>

        <p>
          The guarantees are real. Anthropic&rsquo;s strict tool use promises
          that tool inputs follow the schema and that the tool name is always
          one you provided.
          <FootnoteLink id={2} /> Their own example is the right one: a booking
          tool needs <InlineCode code="passengers: int" />, and without strict
          mode you might get <InlineCode code={`"two"`} />. With it you get{" "}
          <InlineCode code="2" />. OpenAI&rsquo;s strict mode does the same job
          with stricter schema rules, and the Responses API now tries to put
          your schema into strict mode for you.
          <FootnoteLink id={3} /> On your own hardware, llama.cpp has done this
          for years through GBNF grammars and a JSON-Schema-to-grammar
          converter.
        </p>

        <p>
          So the hook of this article, models calling non-existent functions, is
          now a configuration bug. If your agent can still call{" "}
          <InlineCode code="get_user_detials" />, you did not turn on strict
          mode.
        </p>

        <p>
          &ldquo;Mostly&rdquo; is doing work in that heading, though, and the
          fine print is worth reading slowly. Anthropic&rsquo;s structured
          outputs page says schema compliance is guaranteed in most cases, and
          then lists the others. A refusal takes precedence over the schema. A
          response cut off by <InlineCode code="max_tokens" /> may be
          incomplete. String enums are not guaranteed to keep their
          capitalisation. Numeric bounds like <InlineCode code="minimum" /> are
          not supported by the API at all, so a strict schema cannot stop a
          negative refund.
          <FootnoteLink id={4} /> llama.cpp&rsquo;s converter is blunter: it
          skips unsupported schema features silently and tells you to validate
          the output anyway.
          <FootnoteLink id={5} />
        </p>

        <p>
          Anthropic&rsquo;s strict-mode page also says there is no need to
          validate and retry tool calls. I disagree, and their own limitations
          section is the reason. Treat syntactic validity as a very good prior,
          not a proof, and keep the parse step.
        </p>

        <H2>A grammar can force an answer, not a correct one</H2>

        <p>
          Here is the part that I think gets missed. Constraining the decoder
          does not make the model more correct. It moves probability mass. When
          the model&rsquo;s preferred next token is illegal, the mask removes it
          and the sampler picks from what remains. If the model was about to
          reach for a tool you never defined, the constraint does not make it
          realise its mistake. It makes it pick the nearest legal tool, and the
          output looks exactly as confident as a good call.
        </p>

        <p>
          You have not removed the hallucination. You have converted a loud
          failure, a parse error you would have caught, into a quiet one that
          passes every check you own. There is research on this. Grammar-Aligned
          Decoding (Park et al.) shows that standard constrained decoding
          distorts the model&rsquo;s distribution: outputs are grammatical, but
          they turn up with probabilities that do not match what the model
          actually believes given the grammar.
          <FootnoteLink id={6} />
        </p>

        <p>
          The most dangerous version is a grammar with no way out. The Berkeley
          Function Calling Leaderboard has a category for exactly this,
          relevance detection: cases where none of the provided functions apply,
          and the correct output is no call at all.
          <FootnoteLink id={7} /> If every path through your grammar ends in a
          tool call, you have made that correct answer impossible to emit. The
          fix is to give the model a legitimate exit and make it a first-class
          branch:
        </p>

        <BlockCode
          meta="txt"
          code={String.raw`root     ::= lookup | refund | abstain

lookup   ::= "{\"tool\": \"get_order\", \"order_id\": " order-id "}"
refund   ::= "{\"tool\": \"issue_refund\", \"order_id\": " order-id ", \"amount_cents\": " cents "}"
abstain  ::= "{\"tool\": \"none\", \"reason\": " text "}"

order-id ::= "\"ord_" [a-z0-9]{12} "\""
cents    ::= [1-9] [0-9]{0,6}
text     ::= "\"" [^"\\\n]{1,200} "\""`}
        />

        <p>
          This is GBNF, the grammar format llama.cpp accepts through{" "}
          <InlineCode code="--grammar-file" /> or the{" "}
          <InlineCode code="grammar" /> field on its server. It guarantees an
          order ID has the right shape, the amount is a positive integer of
          bounded length, and the reason is a single-line string. Look at what
          it cannot say. It cannot say the order exists. It cannot say the order
          belongs to the person asking. And <InlineCode code="cents" /> will
          happily accept 9,999,999 for a forty-dollar order. The grammar knows
          the language. It knows nothing about the world.
        </p>

        <p>
          A note on the abstain branch: models will use it more if the prompt
          tells them it exists and when to use it. A schema is not instructions.
          llama.cpp even points out that a JSON schema used for output
          constraint is not injected into the prompt, so you have to describe
          the expected structure yourself.
          <FootnoteLink id={5} />
        </p>

        <p>
          There is also a running argument about whether constraints hurt
          reasoning. A 2024 paper, Let Me Speak Freely?, reported a significant
          decline in reasoning under format restrictions; the .txt team re-ran
          it and argued the drop came from mismatched prompts, and that
          structured generation scored as well or better once the prompts
          matched.
          <FootnoteLink id={8} /> I do not think that question is closed, and I
          would not stake a design on either side. The practical hedge works
          either way: let the model think in free text first, and constrain only
          the call itself.
        </p>

        <H2>Validate meaning, not shape</H2>

        <p>
          The Berkeley write-up has a lovely example of the semantic failure.
          Given a 5% interest rate in the question, one model passed it as{" "}
          <InlineCode code="5" /> and another as <InlineCode code="0.05" />.
          <FootnoteLink id={7} /> Both are valid numbers. Both type-check. One
          of them is a hundred times wrong. No schema catches that, because the
          schema does not know which convention the function uses unless you
          tell it, and even then the model can ignore the description.
        </p>

        <p>
          So the second layer checks arguments against the state of the world,
          in code, before anything runs. I parse with Pydantic, using a
          discriminated union so the tool name selects the argument model:
        </p>

        <BlockCode
          meta="python"
          code={`from typing import Annotated, Literal, Union
from pydantic import BaseModel, Field, TypeAdapter, ValidationError

OrderId = Annotated[str, Field(pattern=r"^ord_[a-z0-9]{12}$")]

class GetOrder(BaseModel):
    tool: Literal["get_order"]
    order_id: OrderId

class IssueRefund(BaseModel):
    tool: Literal["issue_refund"]
    order_id: OrderId
    amount_cents: int = Field(gt=0)

class Abstain(BaseModel):
    tool: Literal["none"]
    reason: str

ToolCall = TypeAdapter(
    Annotated[Union[GetOrder, IssueRefund, Abstain], Field(discriminator="tool")]
)

def semantic_errors(call, session) -> list[str]:
    errors = []
    if isinstance(call, (GetOrder, IssueRefund)):
        # provenance: the user typed this ID, or a tool returned it
        if call.order_id not in session.seen_ids:
            errors.append(f"{call.order_id} has not appeared in this conversation")
    if isinstance(call, IssueRefund):
        order = session.orders.get(call.order_id)
        if order is None:
            errors.append("order not loaded; call get_order first")
        elif order.customer_id != session.customer_id:
            errors.append("order belongs to a different customer")
        elif call.amount_cents > order.total_cents - order.refunded_cents:
            errors.append("amount exceeds the refundable balance")
    return errors`}
        />

        <p>
          The <InlineCode code="gt=0" /> on the amount is the check the provider
          schema could not enforce, now enforced on your side. Pydantic does
          both jobs, so the same model can reject a call from a provider that
          ignored a constraint and from a local model whose grammar never had
          it.
        </p>

        <p>
          The provenance check is the one I would add first if I could only add
          one. Models are good at producing identifiers that look exactly like
          the identifiers around them, which is the whole problem: a
          hallucinated <InlineCode code="ord_" /> ID matches your regex,
          satisfies the grammar, and points at nothing, or worse, at somebody
          else&rsquo;s order. Keeping a set of IDs the conversation has actually
          seen (typed by the user, or returned by a previous tool) and rejecting
          any argument that is not in it closes the gap that constrained
          decoding leaves wide open. It costs a set lookup.
        </p>

        <H2>Fall back like you mean it</H2>

        <p>
          Once a call fails validation, the question is what the system does
          next, and this is where most agent loops get sloppy. The usual pattern
          is to paste the error into the transcript and let the model try again,
          as many times as it likes. That turns one bad call into a retry storm,
          and since the same context tends to produce the same mistake, it often
          does not converge. I prefer a short, fixed ladder that lives in code:
        </p>

        <BlockCode
          meta="python"
          code={`def dispatch(raw: str, session, attempt: int = 0):
    try:
        call = ToolCall.validate_json(raw)
    except ValidationError as e:
        if attempt == 0:
            return Reprompt(e.errors(include_url=False))
        return Handoff("unparseable tool call")

    if isinstance(call, Abstain):
        return AskUser(call.reason)

    problems = semantic_errors(call, session)
    if problems:
        return Reprompt(problems) if attempt == 0 else Handoff("; ".join(problems))

    if isinstance(call, IssueRefund):
        return Confirm(call)  # irreversible: a person says yes first
    return Execute(call)`}
        />

        <p>
          <InlineCode code="Reprompt" />, <InlineCode code="Handoff" /> and the
          rest are small result types of your own; the caller decides what each
          one means in your product. The shape is the point. One retry with a
          specific, machine-written reason. After that, a person, not another
          attempt. Abstention is a success path that becomes a question to the
          user, not an error. Reversible, read-only calls run immediately.
          Irreversible calls always stop for confirmation, however valid they
          are, because validity was never the thing that made them safe.
        </p>

        <p>
          Two more habits help more than any prompt tweak. Keep the tool list
          short for each step, since a model choosing between three tools has
          fewer ways to choose wrong than one choosing between forty; the
          state-machine approach in{" "}
          <InlineLink href="/thoughts/prompt-engineering-to-control-flow">
            From Prompt Engineering to Control Flow
          </InlineLink>{" "}
          is mostly a principled way of doing that. And make every executed side
          effect idempotent, so that the retry you did not plan for, from a
          network blip or a resumed run, cannot refund someone twice. I go
          further into resumption in{" "}
          <InlineLink href="/thoughts/beyond-the-wrapper">
            Beyond the Wrapper
          </InlineLink>
          .
        </p>

        <H2>What &ldquo;deterministic&rdquo; can honestly mean</H2>

        <p>
          You will see the promise of 100 percent deterministic tool execution
          in a lot of vendor copy. I do not think it is achievable, and I think
          wanting it leads people to the wrong fix. The model&rsquo;s choice of
          tool and arguments is a sample from a distribution. You can shape that
          distribution and you can constrain its support, but the decision is
          still a guess, and a guess that is right 98% of the time is wrong
          roughly once in every fifty calls, all of them well-formed.
        </p>

        <p>
          What you can make deterministic is everything around the guess. You
          can guarantee, near enough, that every call parses. You can guarantee,
          absolutely, that no call reaches an executor without passing your
          validator, that no unknown function ever runs, that no refund exceeds
          the balance, that no ID appears from thin air, that irreversible
          actions wait for a human, and that every effect is logged and
          idempotent. Those are properties of your code, and code can actually
          have properties.
        </p>

        <p>
          The rate at which the model picks the right tool with the right
          arguments is a different kind of thing. It is a number you measure
          with evals on your own traffic and watch over time, the way you watch
          an error rate. Function calling is the weakest link because it is the
          exact point where a probabilistic system gets to touch the world.
          Strengthening it does not mean making the model certain. It means
          making sure that when the model is wrong, it is wrong inside a box you
          built, and the box says no.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
