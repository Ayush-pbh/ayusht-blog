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

const post = getPostBySlug("local-first-agents");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Ollama library pages, read October 2026:{" "}
        <InlineLink href="https://ollama.com/library/llama3">llama3</InlineLink>{" "}
        (8B and 70B, 8K context, text only, no tools tag, last updated two years
        ago) and{" "}
        <InlineLink href="https://ollama.com/library/llama3.1">
          llama3.1
        </InlineLink>{" "}
        (tools tag, 128K context, the 8B weighing 4.9 GB).
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        <InlineLink href="https://ollama.com/library/qwen3.8">
          qwen3.8 on Ollama
        </InlineLink>
        : a 27B model, 18 GB, 256K context, tagged for tools, thinking and
        vision. The{" "}
        <InlineLink href="https://ollama.com/search?c=tools">
          tools-capable model list
        </InlineLink>{" "}
        is also where you can see how many entries are now cloud-hosted and
        priced per token.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Ollama,{" "}
        <InlineLink href="https://github.com/ollama/ollama/blob/main/docs/api.md">
          API reference
        </InlineLink>{" "}
        (the copy on GitHub notes the docs are moving to docs.ollama.com). It
        documents <InlineCode code="tools" />, <InlineCode code="format" />,{" "}
        <InlineCode code="keep_alive" /> with its five-minute default, and tool
        results sent back as <InlineCode code='role: "tool"' /> with a{" "}
        <InlineCode code="tool_name" />.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        Ollama,{" "}
        <InlineLink href="https://docs.ollama.com/capabilities/tool-calling">
          Tool calling
        </InlineLink>
        . The docs suggest telling the model it is in a loop and may make
        several calls. The Python client builds the tool schema from the
        function&apos;s type hints and Google-style docstring, per the{" "}
        <InlineLink href="https://github.com/ollama/ollama-python/blob/main/ollama/_client.py">
          client source
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Ollama,{" "}
        <InlineLink href="https://docs.ollama.com/capabilities/structured-outputs">
          Structured outputs
        </InlineLink>
        : pass a JSON schema as <InlineCode code="format" />, also put the
        schema in the prompt, lower the temperature, validate with Pydantic. The
        same page notes that Ollama&apos;s cloud does not support structured
        outputs.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Python documentation,{" "}
        <InlineLink href="https://docs.python.org/3/library/ast.html">
          ast — Abstract Syntax Trees
        </InlineLink>
        . On positions: <InlineCode code="col_offset" /> and{" "}
        <InlineCode code="end_col_offset" /> are UTF-8 byte offsets. On{" "}
        <InlineCode code="ast.unparse" />: the output will not necessarily equal
        the original code.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        LibCST,{" "}
        <InlineLink href="https://libcst.readthedocs.io/en/latest/why_libcst.html">
          Why LibCST?
        </InlineLink>{" "}
        — it keeps the whitespace and comments an AST throws away, at the cost
        of a more complex tree and slower parsing.
      </>
    ),
  },
];

export default function LocalFirstAgents() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          The usual way to build a coding agent is to give a model a file and
          ask for the file back, changed. That works when the model is huge and
          you are paying someone else to run it. On a laptop, with an
          eight-billion-parameter model, it is the wrong design, and not because
          the small model is stupid. It is the wrong design because it asks the
          model to do two jobs at once: decide what should change, and then
          retype everything correctly, including the thousands of tokens that
          should not change at all. Split those jobs apart, give the second one
          to a parser, and a model that fits in five gigabytes of RAM becomes a
          perfectly reasonable background refactoring daemon.
        </p>

        <p>
          That is what this piece builds: a local tool-calling loop against
          Ollama, a JSON schema the model has to answer in, and Python&apos;s{" "}
          <InlineCode code="ast" /> module doing every actual edit. The model
          proposes. The tree disposes.
        </p>

        <H2>Llama 3 is the wrong Llama for this</H2>

        <p>
          The title says Llama 3, so I should be straight about it. The original{" "}
          <InlineCode code="llama3" /> on Ollama is two years old, comes with an
          8K context window, and carries no tools tag in the library, which
          means no native tool calling through Ollama&apos;s API. What people
          usually mean when they say &quot;Llama 3&quot; for agent work is{" "}
          <InlineCode code="llama3.1" />: same family, tagged for tools, 128K
          context, and the 8B build is a 4.9 GB download.
          <FootnoteLink id={1} /> That is what the code below uses.
        </p>

        <p>
          It is not the strongest local model you could pick. Llama 3.1 was last
          updated a year ago, and Ollama&apos;s library now lists a crowd of
          newer tool-capable models; Qwen3.8, for example, is a 27B model at 18
          GB with a 256K context and a thinking mode.
          <FootnoteLink id={2} /> If you have the memory, use it, or whatever
          has replaced it by the time you read this. The model name is one
          constant.
        </p>

        <p>
          But I chose the older, smaller one on purpose, because the design
          should not need a clever model. If the agent only works with a
          frontier-class model behind it, then the model is carrying weight the
          architecture should carry. In what follows, the model never writes a
          line of code. It reads functions, forms an opinion, and fills in a
          small form. A 2024-era 8B model can do that.
        </p>

        <p>
          One more thing worth checking before you call anything
          &quot;local&quot;: a fair share of the tools-capable models in
          Ollama&apos;s catalogue are now cloud-hosted and priced per token, and
          served through the same CLI. Pulling a tag does not guarantee the
          weights are on your disk, so look at what you pulled. The cloud
          variants also behave differently: the structured-output feature this
          design leans on is documented as unsupported on Ollama&apos;s cloud.
          <FootnoteLink id={5} />
        </p>

        <H2>The model reads through a parser</H2>

        <p>
          Start with the tools. A coding agent&apos;s first instinct is to read
          whole files into context, which on a small model with a modest context
          budget is how you lose the plot by step three. Instead, give it two
          read-only tools that look at code the way a compiler does: a table of
          contents, and the exact source of one function.
        </p>

        <BlockCode
          meta="python"
          code={`import ast
import pathlib


def find_function(tree: ast.AST, name: str):
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and node.name == name:
            return node
    raise LookupError(f"no function named {name}")


def list_functions(path: str) -> str:
    """List every function defined in a Python file.

    Args:
      path: Path to a .py file

    Returns:
      One line per function with its name, line range and parameters
    """
    tree = ast.parse(pathlib.Path(path).read_text())
    rows = []
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            params = ", ".join(a.arg for a in node.args.args)
            rows.append(f"{node.name}({params}) lines {node.lineno}-{node.end_lineno}")
    return "\\n".join(rows) or "no functions"


def show_function(path: str, name: str) -> str:
    """Return the exact source of one function.

    Args:
      path: Path to a .py file
      name: Name of the function

    Returns:
      The function's source code
    """
    src = pathlib.Path(path).read_text()
    try:
        return ast.get_source_segment(src, find_function(ast.parse(src), name)) or ""
    except LookupError as e:
        return str(e)`}
        />

        <p>
          The docstrings are not decoration. Ollama&apos;s Python client accepts
          plain functions in <InlineCode code="tools" /> and builds the JSON
          schema the model sees from the type hints and a Google-style
          docstring, so the <InlineCode code="Args:" /> block is literally the
          tool description.
          <FootnoteLink
            id={4}
          /> <InlineCode code="ast.get_source_segment" /> returns the original
          text of the node, comments inside the body and all, so what the model
          reads is exactly what is on disk.
        </p>

        <p>
          The loop itself is the one Ollama documents.
          <FootnoteLink id={3} /> Call <InlineCode code="chat" /> with the
          history and the tools, append the reply, and if it contains tool
          calls, run each one and append the result as a message with{" "}
          <InlineCode code='role: "tool"' />. Stop when the model answers in
          prose. Arguments arrive as a parsed dict, not a JSON string, so they
          splat straight into the function:
        </p>

        <BlockCode
          meta="python"
          code={`from ollama import chat

MODEL = "llama3.1:8b"  # swap for a newer tool-capable model if you have the RAM
TOOLS = {f.__name__: f for f in (list_functions, show_function)}

SYSTEM = (
    "You review one Python file for unclear local variable names. "
    "You are in a loop: call tools as many times as you need, then reply "
    "with short notes on which locals in which functions deserve better names."
)


def investigate(path: str, max_steps: int = 8) -> str:
    messages = [
        {"role": "system", "content": SYSTEM},
        {"role": "user", "content": f"Review {path}."},
    ]
    for _ in range(max_steps):
        resp = chat(
            model=MODEL,
            messages=messages,
            tools=list(TOOLS.values()),
            options={"temperature": 0},
            keep_alive="30m",
        )
        messages.append(resp.message)
        if not resp.message.tool_calls:
            return resp.message.content
        for call in resp.message.tool_calls:
            fn = TOOLS.get(call.function.name)
            try:
                out = fn(**call.function.arguments) if fn else "unknown tool"
            except Exception as e:  # a bad argument is feedback, not a crash
                out = f"error: {e}"
            messages.append(
                {"role": "tool", "tool_name": call.function.name, "content": out}
            )
    return "step limit reached"`}
        />

        <p>
          Three details matter more than they look. The system prompt tells the
          model it is in a loop, which Ollama&apos;s own docs recommend, because
          a small model that thinks it gets one shot tends to answer before it
          has looked. The loop handles every entry in{" "}
          <InlineCode code="tool_calls" />, because a model can ask for several
          at once, and the docs only bless taking the first for models that
          never do. And <InlineCode code="keep_alive" /> is set explicitly.
          Ollama unloads an idle model after five minutes by default, and a
          daemon that wakes up on every save would otherwise pay the cost of
          loading weights from disk on a large share of its runs.
        </p>

        <p>
          The <InlineCode code="max_steps" /> cap is not paranoia. Every step
          re-sends the whole conversation, and the cost of that grows faster
          than the step count does. Locally that bill is paid in seconds of
          prefill instead of dollars, but it is the same curve; the arithmetic
          is in{" "}
          <InlineLink href="/thoughts/the-cost-of-autonomy">
            the cost of autonomy
          </InlineLink>
          .
        </p>

        <H2>A form, not a diff</H2>

        <p>
          When the investigation finishes, the model has an opinion in prose.
          Prose is useless to a program. The next call turns the opinion into a
          structure, and the structure is deliberately narrow: a list of
          renames, each naming a function, an old name, a new name and a reason.
          Not &quot;edits&quot;. Not a patch. A form with four fields.
        </p>

        <BlockCode
          meta="python"
          code={`import json
from pydantic import BaseModel


class Rename(BaseModel):
    function: str
    old: str
    new: str
    reason: str


class Plan(BaseModel):
    renames: list[Rename]


def plan(path: str, notes: str) -> Plan:
    schema = Plan.model_json_schema()
    prompt = (
        f"File: {path}\\nFunctions:\\n{list_functions(path)}\\n\\nNotes:\\n{notes}\\n\\n"
        f"Return the renames worth making as JSON matching {json.dumps(schema)}. "
        "Only rename variables assigned inside the function. Empty list is fine."
    )
    resp = chat(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        format=schema,
        options={"temperature": 0},
        keep_alive="30m",
    )
    return Plan.model_validate_json(resp.message.content)`}
        />

        <p>
          Passing a JSON schema as <InlineCode code="format" /> is Ollama&apos;s
          structured-outputs feature: the schema shapes what the model is
          allowed to emit, and the result comes back as a JSON string in{" "}
          <InlineCode code="message.content" />. The docs give the same three
          pieces of advice I would: put the schema in the prompt as well, turn
          the temperature down, and validate with the same Pydantic model you
          generated the schema from.
          <FootnoteLink id={5} /> I would not assume every JSON Schema keyword
          is enforced during generation, which is why{" "}
          <InlineCode code="model_validate_json" /> is there.
        </p>

        <p>
          I keep the planning call separate from the tool loop, with a fresh and
          short context, for a boring reason: it is easier to reason about one
          call that has one job. The loop explores; this call commits. That
          split, where the model&apos;s free-form output is caught by a schema
          before it can reach anything that acts, is a cousin of the argument
          for{" "}
          <InlineLink href="/thoughts/prompt-engineering-to-control-flow">
            replacing prompt chains with real control flow
          </InlineLink>
          .
        </p>

        <p>
          And notice what the schema does not contain: code. There is no field
          where the model could write the new function body. A valid plan can
          still be a bad idea, a rename to a worse name, a variable that does
          not exist, but it cannot be a typo in line 212 that nobody asked for.
          Whatever goes wrong goes wrong in a small, inspectable place.
        </p>

        <H2>The tree does the typing</H2>

        <p>
          Now the edit. The obvious move with <InlineCode code="ast" /> is to
          parse the file, rename nodes with a{" "}
          <InlineCode code="NodeTransformer" />, and write the result out with{" "}
          <InlineCode code="ast.unparse" />. Do not do that to a file a person
          maintains. An AST is abstract in exactly the sense that matters here:
          comments and formatting are not in it, so unparsing gives you code
          that does the same thing and looks like somebody else wrote it. The
          Python docs only promise the output will not necessarily equal the
          original.
          <FootnoteLink id={6} /> LibCST exists precisely because a plain AST
          cannot reprint the source it came from.
          <FootnoteLink id={7} />
        </p>

        <p>
          So use the AST for what it is good at, finding things exactly, and
          then edit the original text at the positions it reports. Every{" "}
          <InlineCode code="ast.Name" /> carries a line, a start column and an
          end column. Splice the new name in at those spans, from the last one
          backwards so the earlier offsets stay valid, and the rest of the file,
          comments, blank lines, odd spacing, comes through byte for byte.
        </p>

        <BlockCode
          meta="python"
          code={`import io
import tokenize


class Refused(Exception):
    pass


def rename_local(src: str, func: str, old: str, new: str) -> str:
    fn = find_function(ast.parse(src), func)
    names = [n for n in ast.walk(fn) if isinstance(n, ast.Name)]
    params = {a.arg for a in ast.walk(fn.args) if isinstance(a, ast.arg)}

    if not new.isidentifier():
        raise Refused(f"{new!r} is not an identifier")
    if old in params:
        raise Refused("parameters are part of the signature")
    if not any(n.id == old and isinstance(n.ctx, ast.Store) for n in names):
        raise Refused(f"{old} is not assigned inside {func}")
    if new in params or any(n.id == new for n in names):
        raise Refused(f"{new} is already used in {func}")
    if any(isinstance(n, (ast.Global, ast.Nonlocal)) for n in ast.walk(fn)):
        raise Refused("global/nonlocal makes scope non-obvious")

    # col offsets are UTF-8 byte offsets, so splice bytes, last edit first
    lines = [line.encode() for line in src.splitlines(keepends=True)]
    for n in sorted((n for n in names if n.id == old),
                    key=lambda n: (n.lineno, n.col_offset), reverse=True):
        line = lines[n.lineno - 1]
        assert line[n.col_offset:n.end_col_offset] == old.encode()
        lines[n.lineno - 1] = line[:n.col_offset] + new.encode() + line[n.end_col_offset:]
    out = b"".join(lines).decode()

    # if the old name survives as a token, it was used in a form that is not
    # an ast.Name (except-as, keyword argument, attribute). Refuse.
    body = "".join(out.splitlines(keepends=True)[fn.lineno - 1:fn.end_lineno])
    toks = tokenize.generate_tokens(io.StringIO(body).readline)
    if any(t.type == tokenize.NAME and t.string == old for t in toks):
        raise Refused(f"{old} appears in a form the AST rename does not cover")
    ast.parse(out)
    return out`}
        />

        <p>
          Most of this function is reasons to say no, and that is the point.
          Each guard encodes a fact about Python scoping that the model does not
          need to know. A parameter is part of the function&apos;s signature;
          renaming it breaks every caller that passes it by keyword, so it is
          off the table. A name that is only read inside the function, never
          assigned, belongs to someone else, a global, a builtin or an enclosing
          function, and renaming it here would point it at nothing. A new name
          that is already in use would merge two variables into one. With those
          excluded, renaming every occurrence of a locally assigned name inside
          the function is a safe, mechanical operation, which is exactly the
          kind of thing you want a program doing rather than a sampler.
        </p>

        <p>
          The byte detail is the kind of bug that would otherwise ship. The docs
          are explicit that column offsets are UTF-8 byte offsets, not character
          indices.
          <FootnoteLink id={6} /> Slice a Python <InlineCode code="str" /> with
          them and everything works until a line contains{" "}
          <InlineCode code="café" /> before the variable, and then the splice
          lands one byte off. Encoding each line first makes the offsets mean
          what they say.
        </p>

        <p>
          The final tokenizer pass is a belt over the braces. Some places a name
          can appear are not <InlineCode code="ast.Name" /> nodes at all: the
          target of <InlineCode code="except Exception as err" /> is a plain
          string on the handler, and so is the keyword in{" "}
          <InlineCode code="dict(val=val)" />. A rename that touched the Names
          and missed those would leave the function subtly broken. So after
          splicing, the code tokenizes the function and refuses if the old name
          survives anywhere. Run against a scratch file with both of those
          traps, plus a parameter, a global and a name collision, it turns down
          all five, and the plain renames go through with the comments
          untouched.
        </p>

        <H2>A daemon that proposes and never commits</H2>

        <p>
          The last piece is the background process: notice when a file changes,
          run the loop, and leave the result where you can see it. It writes a
          unified diff into a <InlineCode code=".refactor/" /> directory instead
          of touching the file. A background process rewriting files under an
          open editor is a reliable way to lose work and trust in the same
          afternoon.
        </p>

        <BlockCode
          meta="python"
          code={`import difflib
import time


def propose(path: pathlib.Path, out_dir=pathlib.Path(".refactor")) -> None:
    src = path.read_text()
    new = src
    for r in plan(str(path), investigate(str(path))).renames:
        try:
            new = rename_local(new, r.function, r.old, r.new)
        except (Refused, LookupError) as e:
            print(f"skip {r.function}:{r.old} -> {r.new}: {e}")
    if new != src:
        out_dir.mkdir(exist_ok=True)
        diff = difflib.unified_diff(
            src.splitlines(keepends=True), new.splitlines(keepends=True),
            fromfile=str(path), tofile=str(path),
        )
        (out_dir / f"{path.stem}.diff").write_text("".join(diff))


def watch(root: str = ".", every: float = 2.0) -> None:
    seen: dict[pathlib.Path, float] = {}
    while True:
        for path in pathlib.Path(root).rglob("*.py"):
            mtime = path.stat().st_mtime
            if seen.setdefault(path, mtime) != mtime:
                seen[path] = mtime
                try:
                    propose(path)
                except Exception as e:  # half-saved file, flaky model: log, move on
                    print(f"{path}: {e}")
        time.sleep(every)`}
        />

        <p>
          It polls modification times with the standard library rather than
          using a file-watching package, which is crude and fine for a single
          project. Point <InlineCode code="root" /> at your source directory
          rather than the repo root, or it will cheerfully review your
          virtualenv. The broad <InlineCode code="except" /> in the watcher is
          deliberate: a file saved halfway through an edit will not parse, and
          the right response to a syntax error in a background tool is to wait
          for the next save, not to die.
        </p>

        <p>
          Renaming locals is a small job, and that is a feature of the
          walkthrough rather than a limit of the idea. The pattern generalises
          to anything you can express as a typed operation over a tree: add a
          missing return annotation, convert a <InlineCode code="%" /> format
          string, delete an unused import. For each one, the model&apos;s
          vocabulary is a schema, and the edit is a function you can test
          without a model in the room. That last part is what I like most. The
          scary component in this system, the one that samples, cannot do
          anything the deterministic part has not already agreed to. It is the
          same reason{" "}
          <InlineLink href="/thoughts/tool-use-vs-hallucination">
            tools beat a model&apos;s memory
          </InlineLink>{" "}
          for facts: you move the part that has to be exactly right onto
          something that cannot be creative about it.
        </p>

        <p>
          Which brings it back to the hook, which I only half agree with. You do
          not need a cloud API to have something useful living in your terminal.
          But what lives there is not an automated developer. It is a reviewer
          with good eyesight and very small hands, and that is the version I
          would actually leave running.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
