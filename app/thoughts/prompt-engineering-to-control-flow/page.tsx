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

const post = getPostBySlug("prompt-engineering-to-control-flow");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Dex at HumanLayer wrote{" "}
        <InlineLink href="https://github.com/humanlayer/12-factor-agents">
          12-Factor Agents
        </InlineLink>
        . Factor 8 is &ldquo;Own your control flow&rdquo;.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Horace He and Thinking Machines Lab, September 2025.{" "}
        <InlineLink href="https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/">
          Defeating Nondeterminism in LLM Inference
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Anthropic&rsquo;s models overview describes Haiku as the tier for
        classification, extraction and routing.{" "}
        <InlineLink href="https://platform.claude.com/docs/en/about-claude/models/overview">
          Models overview
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        A refusal or a <InlineCode code="max_tokens" /> cut-off can return
        output that does not match the schema.{" "}
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
        Workflow code must make the same calls in the same order given the same
        input; external calls go in Activities, outside the replay path.{" "}
        <InlineLink href="https://docs.temporal.io/workflow-definition">
          Temporal, Workflow Definition
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        David Harel, Science of Computer Programming, 1987. A good short
        introduction, including the wristwatch, is the Recurse Center&rsquo;s{" "}
        <InlineLink href="https://www.recurse.com/blog/59-paper-of-the-week-statecharts-a-visual-formalism-for-complex-systems">
          paper of the week
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Anthropic&rsquo;s distinction between workflows, on predefined code
        paths, and agents, which direct their own process.{" "}
        <InlineLink href="https://www.anthropic.com/engineering/building-effective-agents">
          Building effective agents
        </InlineLink>
        .
      </>
    ),
  },
];

export default function PromptEngineeringToControlFlow() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          The usual diagnosis is that people treat the LLM like a chat buddy,
          and the usual cure is a state machine. I agree with the cure and I
          think the diagnosis is slightly off. Being friendly to the model is
          not the problem. The problem is that in most LLM apps the transcript
          is the program. Where you are in the flow, what has been confirmed,
          what is still missing: all of it lives in a list of messages, and the
          model re-reads that list on every turn to work out what to do next.
        </p>

        <p>
          That is what a state machine replaces. Not the model, and not the
          prompts. It replaces the habit of storing control state in prose and
          asking a probabilistic reader to recover it.
        </p>

        <H2>The transcript is not a database</H2>

        <p>
          Picture a refund assistant built the chat way. The system prompt says:
          ask for the order number, check eligibility, confirm the amount, then
          issue the refund. It works in the demo. Then a real customer gives the
          order number in their first message, before being asked. Another
          changes their mind halfway through confirming. A third pastes two
          order numbers. A fourth says &ldquo;yes&rdquo; to a question the model
          asked three turns ago, not the one it just asked. Every one of these
          is a question about state, and in the chat design every one of them is
          answered by the model reinterpreting the history, slightly differently
          each time.
        </p>

        <p>
          You fix it the way people always fix it: more prompt. A paragraph
          about order numbers given early. A rule about changes of mind. A
          capitalised NEVER about issuing a refund without confirmation. The
          prompt grows into a specification written in a language with no
          compiler, enforced by something that follows it most of the time. You
          cannot test it except by running conversations. You cannot say, with
          certainty, that there is no path to a refund without a yes.
        </p>

        <p>
          12-Factor Agents, from HumanLayer, makes the observation that a lot of
          products sold as AI agents are mostly deterministic code, with LLM
          steps sprinkled in at just the right points, and one of its factors is
          simply: own your control flow.
          <FootnoteLink id={1} /> I would go one step further. If the control
          flow matters, it should exist somewhere other than the model&rsquo;s
          head, in a form you can print out.
        </p>

        <H2>Temperature zero will not save you</H2>

        <p>
          The tempting shortcut is to keep the chat design and make the model
          deterministic. Set temperature to zero, pin the model version, and the
          same history should give the same answer. It does not, and the reason
          is interesting.
        </p>

        <p>
          Thinking Machines ran 1,000 completions of the same prompt at
          temperature zero on Qwen3-235B and got 80 distinct outputs. The first
          divergence appeared at token 103.
          <FootnoteLink id={2} /> Their explanation is not the usual hand-wave
          about floating point and concurrency. It is that common inference
          kernels are not batch-invariant: the numbers your request gets depend
          on how many other requests the server happened to batch it with, and
          that depends on load you cannot see or control. They built
          batch-invariant kernels and got 1,000 identical completions, at a real
          cost in speed.
        </p>

        <p>
          Two lessons there. One: unless you run your own inference stack with
          that kind of care, the same input to a hosted model is not guaranteed
          to produce the same output. Two, and more important: even if it did,
          deterministic is not the same as correct. A model that misreads a
          stale &ldquo;yes&rdquo; the same way every time is reproducibly wrong.
          The determinism you want is not in the model&rsquo;s tokens. It is in
          the consequences, and those you can own completely.
        </p>

        <H2>Models translate, code decides</H2>

        <p>
          The design I keep coming back to splits the app into two kinds of
          step. Probabilistic steps take messy input and translate it into a
          small, closed vocabulary of events: this message means{" "}
          <InlineCode code="want_refund" />, or{" "}
          <InlineCode code="give_order_id" /> with an ID attached, or{" "}
          <InlineCode code="other" />. Deterministic steps take the current
          state and that event and decide what happens. The model is the parser.
          The state machine is the program.
        </p>

        <p>
          Here is the translator. It is a classifier, so it uses the small
          model, which is also the tier Anthropic recommends for classification
          and routing.
          <FootnoteLink id={3} /> The output is constrained to a Pydantic model
          so the result is a value, not a paragraph.
        </p>

        <BlockCode
          meta="python"
          code={`from enum import StrEnum
from typing import Literal
from pydantic import BaseModel
import anthropic

class S(StrEnum):
    START = "start"
    NEED_ORDER = "need_order"
    CHECKING = "checking"
    CONFIRMING = "confirming"
    REFUNDED = "refunded"
    CLOSED = "closed"
    HUMAN = "human"

Kind = Literal["want_refund", "give_order_id", "yes", "no", "other"]

class Intent(BaseModel):
    kind: Kind
    order_id: str | None

client = anthropic.Anthropic()

def interpret(state: S, message: str) -> Intent:
    resp = client.messages.parse(
        model="claude-haiku-5-5",
        max_tokens=1024,
        system=(
            "Classify the customer's latest message as exactly one intent. "
            f"The conversation is in state '{state}'. "
            "Set order_id only if the customer wrote one in this message."
        ),
        messages=[{"role": "user", "content": message}],
        output_format=Intent,
    )
    if resp.stop_reason != "end_turn" or resp.parsed_output is None:
        return Intent(kind="other", order_id=None)
    return resp.parsed_output`}
        />

        <p>
          The <InlineCode code="stop_reason" /> guard is not paranoia.
          Anthropic&rsquo;s docs say plainly that a refusal or a response cut
          off at <InlineCode code="max_tokens" /> can come back not matching the
          schema.
          <FootnoteLink id={4} /> When the translator fails, it fails to{" "}
          <InlineCode code="other" />, which the state machine already knows how
          to handle. That is the general trick: every probabilistic step gets a
          boring, safe default, and the default is a member of the same event
          vocabulary as the success cases.
        </p>

        <p>
          Now the program. The transition table is a dictionary, and{" "}
          <InlineCode code="handle" /> is the only function that changes state:
        </p>

        <BlockCode
          meta="python"
          code={`TRANSITIONS: dict[tuple[S, str], S] = {
    (S.START, "want_refund"): S.NEED_ORDER,
    (S.START, "give_order_id"): S.CHECKING,
    (S.NEED_ORDER, "give_order_id"): S.CHECKING,
    (S.CONFIRMING, "yes"): S.REFUNDED,
    (S.CONFIRMING, "no"): S.CLOSED,
}
TERMINAL = {S.REFUNDED, S.CLOSED, S.HUMAN}
MAX_STRIKES = 3

def step(state: S, kind: str) -> S | None:
    return TRANSITIONS.get((state, kind))  # None: not a valid event here

def handle(convo, message: str) -> str:
    if convo.state in TERMINAL:
        return render_reply(convo)

    intent = interpret(convo.state, message)
    kind = intent.kind
    if kind == "give_order_id" and not intent.order_id:
        kind = "other"

    nxt = step(convo.state, kind)
    if nxt is None:
        convo.strikes += 1
        if convo.strikes >= MAX_STRIKES:
            convo.state = S.HUMAN
        return render_reply(convo)

    convo.strikes = 0
    if intent.order_id:
        convo.order_id = intent.order_id
    convo.state = nxt

    if convo.state is S.CHECKING:  # no model in this state
        ok = eligible(convo.order_id, convo.customer_id)
        convo.state = S.CONFIRMING if ok else S.HUMAN
    if convo.state is S.REFUNDED:
        issue_refund(convo.order_id, idempotency_key=f"refund:{convo.id}")

    return render_reply(convo)  # the model writes words, not decisions`}
        />

        <p>
          Walk the awkward customers through it. The order number in the first
          message is <InlineCode code="(START, give_order_id)" />, an explicit
          row, so it skips straight to checking. The change of mind is{" "}
          <InlineCode code="(CONFIRMING, no)" />. The stale &ldquo;yes&rdquo;
          outside the confirming state has no row, so it is a strike, not a
          refund. Three strikes and a human takes over, which is the failure
          exit every loop in an LLM app needs. The case I have not handled, two
          order numbers in one message, is now a visible gap: the translator
          only has room for one ID, and you can decide deliberately whether to
          widen the schema or treat it as <InlineCode code="other" />.
        </p>

        <p>
          Notice what the model is allowed to do. It classifies one message.
          Then, in <InlineCode code="render_reply" />, it writes the words the
          customer sees, given the state it is handed. It never decides whether
          a refund happens. <InlineCode code="CHECKING" /> has no model in it at
          all, because eligibility is a database question. And the order ID the
          translator extracted still goes through <InlineCode code="eligible" />
          , which should check the order exists and belongs to this customer;
          the reasons that check is not optional are the subject of{" "}
          <InlineLink href="/thoughts/tool-use-vs-hallucination">
            Tool Use vs. Hallucination
          </InlineLink>
          .
        </p>

        <H2>Test the table, evaluate the translator</H2>

        <p>
          The payoff is that the two halves can be checked in completely
          different ways, each suited to what it is. The state machine is
          finite, so you can test it exhaustively. Seven states, five event
          kinds, thirty-five pairs. You can assert properties over all of them,
          and the properties are the sentences you used to write in capitals in
          the prompt:
        </p>

        <BlockCode
          meta="python"
          code={`from itertools import product
from typing import get_args

def test_refund_only_follows_confirmation():
    for state, kind in product(S, get_args(Kind)):
        if step(state, kind) is S.REFUNDED:
            assert (state, kind) == (S.CONFIRMING, "yes")

def test_terminal_states_have_no_exits():
    for state, kind in product(TERMINAL, get_args(Kind)):
        assert step(state, kind) is None`}
        />

        <p>
          That first test is the NEVER from the prompt, turned into something
          that runs in CI in milliseconds and fails loudly if a teammate adds a
          careless row. No conversation simulation, no model calls, no
          flakiness. You will never get that guarantee about a prompt.
        </p>

        <p>
          The translator is the opposite kind of thing. It is a classifier, so
          you evaluate it like one: a few hundred real customer messages, each
          labelled with the state it arrived in and the intent it should map to,
          scored as a confusion matrix. Which mistakes it makes matters more
          than how many. Confusing <InlineCode code="yes" /> with{" "}
          <InlineCode code="other" /> costs the customer an extra turn.
          Confusing <InlineCode code="other" /> with <InlineCode code="yes" />{" "}
          in the confirming state costs you money, and that asymmetry is exactly
          what tells you where to spend prompt effort, examples and model size.
        </p>

        <p>
          None of this is new. Temporal, the workflow engine, requires workflow
          code to be deterministic so it can be replayed from its event history,
          and pushes everything unpredictable, like calls to external services,
          into Activities that run outside the replay path.
          <FootnoteLink id={5} /> Swap &ldquo;Activity&rdquo; for &ldquo;LLM
          node&rdquo; and that is the architecture above. When a flat state
          machine starts sprouting dozens of near-duplicate states, the answer
          is also old: David Harel&rsquo;s statecharts, published in 1987,
          extended plain state diagrams with hierarchy, concurrency and
          communication, and were demonstrated on, of all things, his digital
          wristwatch.
          <FootnoteLink id={6} /> Nested states are how you add &ldquo;the
          customer can ask a shipping question at any point&rdquo; without
          doubling the table.
        </p>

        <H2>Where the state machine is the wrong tool</H2>

        <p>
          It would be dishonest to stop there, because &ldquo;industrial-grade
          reliability&rdquo; oversells what this buys. A state machine does not
          make the model reliable. It makes the model&rsquo;s unreliability
          bounded and legible: a misclassification turns into a strike, a wrong
          transition is impossible rather than unlikely, and every failure lands
          in a state with a name. That is a large improvement, and the kind that
          lets you sleep, but the translator is still wrong some of the time,
          and your eval tells you how often.
        </p>

        <p>
          It also only works when you can enumerate the states. A refund flow,
          an onboarding form, a support triage, a document pipeline: these have
          a shape you can draw before the first user arrives. Open-ended work
          does not. You cannot write the transition table for &ldquo;find out
          why our churn went up&rdquo; or &ldquo;fix this failing test&rdquo;,
          because the steps depend on what each step discovers. That is the line
          Anthropic draws between workflows, which follow predefined code paths,
          and agents, which direct their own process.
          <FootnoteLink id={7} /> Forcing an agentic task into a rigid machine
          gives you a brittle flowchart that is wrong in new and interesting
          ways.
        </p>

        <p>
          The answer, in practice, is to nest them. The outer program is a state
          machine with a small number of coarse states. One of those states can
          contain a real agent loop, with its own tools and a hard budget, and
          it exits through an edge the outer machine defines: done, gave up,
          needs a human. The agent gets freedom where freedom helps and walls
          where the consequences live. When several agents need to share those
          walls, the problems change shape again, into bounded cycles,
          checkpoints and recovery, which is the subject of{" "}
          <InlineLink href="/thoughts/beyond-the-wrapper">
            Beyond the Wrapper
          </InlineLink>
          .
        </p>

        <p>
          What I like about this way of building is that it gives prompts back
          their proper job. A prompt is very good at telling a model what a
          message means. It is a terrible place to keep the rules of a business.
          Once the rules live in a table, the prompt can shrink to the size of
          the actual judgement it asks for, and the sentence you used to shout
          in capitals becomes a test that passes.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
