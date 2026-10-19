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

const post = getPostBySlug("beyond-the-wrapper");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Anthropic, December 2024. Workflows run on predefined code paths; agents
        direct their own process and tool use.{" "}
        <InlineLink href="https://www.anthropic.com/engineering/building-effective-agents">
          Building effective agents
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Anthropic, June 2025. The 15× figure, the 90.2% result, the early
        subagent sprawl and the resume-from-error design all come from{" "}
        <InlineLink href="https://www.anthropic.com/engineering/multi-agent-research-system">
          How we built our multi-agent research system
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Cemri et al., 2025. Fourteen failure modes in three groups (system
        design, inter-agent misalignment, task verification), from more than
        1,600 annotated traces across seven frameworks.{" "}
        <InlineLink href="https://arxiv.org/abs/2503.13657">
          Why Do Multi-Agent LLM Systems Fail?
        </InlineLink>
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        The limit counts super-steps, not node calls, and has defaulted to 1000
        since LangGraph 1.0.6.{" "}
        <InlineLink href="https://docs.langchain.com/oss/python/langgraph/graph-api">
          LangGraph Graph API
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Node-level <InlineCode code="error_handler" /> and per-node timeouts
        need <InlineCode code="langgraph>=1.2" />. The handler only runs once
        the retry policy is exhausted.{" "}
        <InlineLink href="https://docs.langchain.com/oss/python/langgraph/fault-tolerance">
          LangGraph fault tolerance
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Durability modes <InlineCode code="exit" />, <InlineCode code="async" />{" "}
        and <InlineCode code="sync" />, and the pending-writes behaviour, are
        described in{" "}
        <InlineLink href="https://docs.langchain.com/oss/python/langgraph/checkpointers">
          LangGraph checkpointers
        </InlineLink>
        .
      </>
    ),
  },
];

export default function BeyondTheWrapper() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          A chain of prompts cannot loop. Prompt A feeds prompt B feeds prompt
          C, and then it stops, because that is what a chain is. So when people
          say that chaining LLM calls leads to endless loops, they are
          describing something else: the moment they let the model decide what
          happens next. That is not a chain any more. It is a cyclic graph, and
          they built it without any of the machinery that makes cycles safe.
        </p>

        <p>
          I think this distinction is the whole game, and almost every
          &ldquo;multi-agent swarm&rdquo; I see written up skips it. The swarm
          gets drawn as a cluster of friendly boxes with names like Planner,
          Researcher and Critic, arrows running between them in both directions,
          and the reliability story is a paragraph about better prompts. But a
          system where several processes pass messages, retry on failure, and
          share state is a distributed system. Its failures are
          distributed-systems failures: unbounded retries, lost state on crash,
          duplicated side effects, two components each assuming the other one
          checked. None of those are fixed by a better system prompt.
        </p>

        <H2>The loop is in the graph, not the model</H2>

        <p>
          Context drift, the other half of the complaint, is real, and its
          source is more specific than people think. Every time one agent hands
          work to another, it hands over a summary. The summary is written by a
          model that has decided what matters, and the receiving agent cannot
          see what was left out. Do that four times and the fourth agent is
          working on a paraphrase of a paraphrase of the original request.
          Nobody hallucinated. Information simply leaked out at every hop, the
          way detail leaks out of a photocopy of a photocopy.
        </p>

        <p>
          The loop and the drift share a cause. In both cases the control
          structure of the program lives inside text the model produces. Who
          goes next, whether the work is finished, what the task even was: all
          of it is carried in natural language and re-derived on every turn.
          Anthropic&rsquo;s own taxonomy draws the line well. Workflows are LLMs
          and tools orchestrated through predefined code paths; agents direct
          their own process.
          <FootnoteLink id={1} /> Most production systems I would trust are
          workflows with a few agentic pockets, and the pockets are where the
          bugs live.
        </p>

        <p>
          So the move is not to make the agents smarter. It is to pull the
          control structure out of the transcript and into the program, where
          you can read it, bound it, test it and resume it. I wrote about the
          single-agent version of this idea in{" "}
          <InlineLink href="/thoughts/prompt-engineering-to-control-flow">
            From Prompt Engineering to Control Flow
          </InlineLink>
          . This piece is about what happens when there are several of them and
          they are allowed to cycle.
        </p>

        <H2>Most swarms should be one agent</H2>

        <p>
          Before the engineering, the uncomfortable part. The best public case
          for multi-agent systems is Anthropic&rsquo;s write-up of their
          research feature, and it is unusually honest about the price. Their
          multi-agent setup beat a single Opus agent by 90.2% on an internal
          research eval. It also burned roughly fifteen times the tokens of a
          plain chat, against about four times for a single agent.
          <FootnoteLink id={2} /> They say plainly that the approach suits
          broad, parallel work like research, and is a poor fit where every
          agent needs the same context or where there are many dependencies
          between agents. They name most coding tasks as an example of the bad
          fit.
        </p>

        <p>
          That is the strongest argument for swarms, made by people who shipped
          one, and it comes with a fifteen-fold bill and a list of places it
          doesn&rsquo;t work. The academic picture is less kind. A Berkeley-led
          study annotated more than 1,600 traces from seven popular multi-agent
          frameworks, sorted the failures into fourteen modes, and opened by
          observing that performance gains over single agents on popular
          benchmarks are often minimal.
          <FootnoteLink id={3} /> Their categories read like a post-mortem
          checklist: agents disobeying their role specification, agents
          withholding information from each other, agents unaware of when they
          are supposed to stop, nobody verifying the result before declaring
          victory.
        </p>

        <p>
          Here is my rule of thumb. A second agent earns its place when it gets
          something the first one cannot have: a clean context window for a
          large, separable chunk of reading, a different set of tools, or
          different permissions. Parallel read-only fan-out (go look at these
          twelve sources and report back) is the good case. What does not earn
          its place is a second agent that differs from the first only in its
          system prompt. A &ldquo;Critic&rdquo; that is the same model, with the
          same tools, reading the same context, told to be skeptical, is
          role-play. Sometimes useful role-play. But you could get the same
          effect from one agent and a checklist, and the checklist does not cost
          you a handoff.
        </p>

        <p>
          The word &ldquo;swarm&rdquo; does a lot of damage here. Swarms in
          nature work because each unit is cheap, local and dumb, and the
          behaviour emerges from many of them. LLM agents are the opposite: each
          one is expensive, each one sees a lot, and you very much do not want
          emergent behaviour from the thing issuing refunds. What you actually
          want is closer to a small team with a manager who keeps the minutes.
          So that is what I will build.
        </p>

        <H2>Bound every cycle in state, not in the prompt</H2>

        <p>
          The most common loop in agent systems is the writer–critic cycle. One
          node drafts, another reviews, and if the review fails the draft goes
          back. It is a reasonable pattern. It is also an infinite loop the
          moment the critic has standards the writer can&rsquo;t meet, which is
          often, because the writer and critic are frequently the same model and
          disagree with themselves in perfectly stable ways.
        </p>

        <p>
          &ldquo;Stop after three attempts&rdquo; in the prompt is not a bound.
          It is a suggestion to something that cannot count reliably across
          turns. The bound has to be an integer in your state, checked by code.
          Here is the shape in LangGraph, which is a reasonable choice because
          it makes the graph explicit and ships the persistence primitives this
          needs:
        </p>

        <BlockCode
          meta="python"
          code={`from typing import Literal
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.types import Command, RetryPolicy
from langgraph.errors import NodeError
from langgraph.checkpoint.memory import InMemorySaver

MAX_REVISIONS = 3

class State(TypedDict, total=False):
    task: str
    draft: str
    passed: bool
    feedback: str
    revisions: int
    failure: str

def write(state: State) -> Command[Literal["review"]]:
    draft = call_writer(state["task"], state.get("feedback", ""))  # your LLM call
    return Command(
        update={"draft": draft, "revisions": state.get("revisions", 0) + 1},
        goto="review",
    )

def review(state: State) -> dict:
    passed, feedback = run_checks(state["draft"])  # tests first, LLM judge last
    return {"passed": passed, "feedback": feedback}

def route(state: State) -> Literal["write", "publish", "escalate"]:
    if state["passed"]:
        return "publish"
    if state["revisions"] >= MAX_REVISIONS:
        return "escalate"
    return "write"

def on_write_failure(state: State, error: NodeError) -> Command:
    return Command(update={"failure": f"{error.node}: {error.error}"},
                   goto="escalate")`}
        />

        <p>
          Three details matter more than they look. The revision counter is
          incremented by the writer node in code, so it cannot be argued with.
          The routing function is plain Python reading plain fields, so the
          decision to stop is not delegated to anyone&rsquo;s judgement. And
          there is an explicit <InlineCode code="escalate" /> exit. A bounded
          loop with no failure exit just turns an infinite loop into a silent
          one, where the third bad draft gets published because the counter ran
          out.
        </p>

        <p>
          Notice also that <InlineCode code="write" /> routes onward with{" "}
          <InlineCode code="Command(goto=...)" /> rather than a static edge.
          That is deliberate. LangGraph&rsquo;s docs are clear that a{" "}
          <InlineCode code="Command" /> only adds dynamic edges and that static
          edges still execute, so if the writer had a static edge to the
          reviewer, I would not want to bet on what happens when its error
          handler also says &ldquo;go to escalate&rdquo;. Keep each node&rsquo;s
          exits in one place.
        </p>

        <p>
          Then there is the framework&rsquo;s own circuit breaker. LangGraph
          raises <InlineCode code="GraphRecursionError" /> when a run exceeds
          its recursion limit, and since 1.0.6 that limit defaults to a thousand
          super-steps.
          <FootnoteLink id={4} /> A thousand steps of a model with tools is a
          very large number. It is a backstop against a runaway process, not a
          policy, and you should set it per run to something just above the
          longest legitimate path through your graph. Your state counter is the
          policy. The recursion limit is the fuse.
        </p>

        <H2>Errors are edges</H2>

        <p>
          There are two kinds of failure in an agent graph, and they want
          opposite treatment. Transient failures (a timeout, a rate limit, a
          connection reset) should be retried with backoff, invisibly, a small
          fixed number of times. Logical failures (the draft is wrong, the tool
          returned nothing useful, the model refused) must never be retried
          blindly, because the same input will usually produce the same wrong
          answer, just more expensively.
        </p>

        <p>
          The naive design handles both the same way: wrap the LLM call in a
          try/except and loop. The better design makes logical failure a state
          the graph can route on, and leaves retries for the plumbing. LangGraph
          1.2 split these cleanly. A <InlineCode code="RetryPolicy" /> on a node
          retries it, and a node-level error handler runs only after those
          retries are exhausted, receiving the failed node&rsquo;s name and
          exception and returning a <InlineCode code="Command" /> that says
          where to go.
          <FootnoteLink id={5} />
        </p>

        <BlockCode
          meta="python"
          code={`builder = StateGraph(State)
builder.add_node(
    "write",
    write,
    retry_policy=RetryPolicy(max_attempts=3, retry_on=TimeoutError),
    error_handler=on_write_failure,
)
builder.add_node("review", review)
builder.add_node("publish", publish)    # your side effect
builder.add_node("escalate", escalate)  # page a human, open a ticket
builder.add_edge(START, "write")
builder.add_conditional_edges("review", route)
builder.add_edge("publish", END)
builder.add_edge("escalate", END)

graph = builder.compile(checkpointer=InMemorySaver())  # PostgresSaver in prod`}
        />

        <p>
          Retrying only on <InlineCode code="TimeoutError" /> is a choice, and I
          think the right default. If the writer raises because the model
          returned something unparseable, I do not want three more identical
          attempts; I want the graph to go to <InlineCode code="escalate" />{" "}
          with the reason recorded in state. Where a malformed tool call is the
          problem, the fix belongs in the decoding and validation layer, which I
          take apart in{" "}
          <InlineLink href="/thoughts/tool-use-vs-hallucination">
            Tool Use vs. Hallucination
          </InlineLink>
          , not in a retry loop.
        </p>

        <p>
          The reviewer deserves its own warning. If your check is another LLM
          call, your loop now terminates on the opinion of a model. That is
          sometimes the best you can do, but put every deterministic check you
          can think of in front of it: does it compile, do the tests pass, does
          the JSON validate, are the cited URLs real. An LLM judge at the end of
          a stack of cheap, certain checks is fine. An LLM judge as the only
          exit condition is how you get a cycle that converges on whatever the
          two models happen to agree on.
        </p>

        <H2>Checkpoint like you expect to crash</H2>

        <p>
          A long-running agent will be interrupted. Deploys, OOM kills, a
          provider outage forty minutes into a task. Anthropic&rsquo;s team
          found that restarting from scratch was too expensive and built their
          system to resume from where the agent was when the error occurred.
          They also deploy with rainbow deployments, keeping old and new
          versions running side by side, because a deploy can land on agents
          that are mid-task.
          <FootnoteLink id={2} /> That last detail is the one I would put on a
          poster. A web request lasts a few hundred milliseconds. An agent run
          can outlive your release cycle.
        </p>

        <p>
          In LangGraph the unit of resumption is a thread, and the checkpointer
          persists the graph&rsquo;s state per super-step. You choose how
          eagerly: <InlineCode code="exit" /> writes only when the run ends,{" "}
          <InlineCode code="async" /> writes while the next step runs, and{" "}
          <InlineCode code="sync" /> writes before the next step starts. If a
          node fails partway through a super-step, the writes from its siblings
          that finished are kept, so they are not re-run on resume.
          <FootnoteLink id={6} />
        </p>

        <BlockCode
          meta="python"
          code={`config = {
    "configurable": {"thread_id": "ticket-4812"},
    "recursion_limit": 12,  # longest real path is 2 * MAX_REVISIONS + 1
}
graph.invoke({"task": task, "revisions": 0}, config, durability="sync")

# after a crash or a deploy: same thread_id, no new input
graph.invoke(None, config, durability="sync")`}
        />

        <p>
          For anything that touches the outside world, use{" "}
          <InlineCode code="sync" /> and pay the latency. The failure you are
          protecting against is not losing a draft. It is resuming from a
          checkpoint taken before a side effect that actually happened, and
          doing it twice.
        </p>

        <p>
          Which brings up the thing checkpoints cannot do for you. Resuming a
          graph replays from the last saved step, and if your{" "}
          <InlineCode code="publish" /> node sent the email but crashed before
          its checkpoint landed, the resumed run will send it again. The fix is
          boring and old: every side effect carries an idempotency key derived
          from something stable, like the thread ID plus the node name, and the
          receiving system refuses duplicates. Payments people have done this
          for years. Agent people mostly have not, because a demo never crashes
          halfway through.
        </p>

        <p>
          Put it together and the shape of a fault-tolerant multi-agent system
          is not very agentic at all. It is a graph you can draw on a
          whiteboard, with integer bounds on every cycle, a failure exit from
          every node that can fail, retries reserved for transient errors, state
          persisted before anything irreversible, and idempotent effects at the
          edges. The models live inside the nodes, doing the parts that need
          judgement. They do not get to decide whether the loop continues, and
          they do not hold the only copy of what the task was.
        </p>

        <p>
          If that sounds like it drains the magic out, I would push back gently:
          it moves the magic to where it is useful. A model asked to write a
          good draft, inside a structure that guarantees the draft will be
          checked, bounded and recoverable, is doing the thing it is actually
          good at. A model asked to also be the scheduler, the retry policy and
          the source of truth is being asked to be a distributed system. It is
          not one, and neither is a swarm of them.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
