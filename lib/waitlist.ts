import type { WaitlistProject } from "@/types";
import siltTexture from "@/public/images/silt/texture.webp";

/**
 * One object per project — this is the template.
 *
 * Adding a landing page means adding an entry here and nothing else: the route,
 * metadata, OG image, form and database write are all shared. The slug becomes
 * the URL (/waitlist/<slug>) and the value stored in the `project` column, so
 * signups stay countable per project.
 *
 * Every block below `subhead` is optional. Omit them all and the page renders
 * as a hero and a form, which is the right amount of page for an early idea.
 */
const projects: WaitlistProject[] = [
  {
    slug: "meeseeks",
    name: "Mr. Meeseeks",
    eyebrow: "Private beta",
    headline: [
      "Every Slack thread gets its own agent.",
      "Then it deletes itself.",
    ],
    subhead:
      "Mention @meeseeks and a dedicated agent spins up for that thread — its own container, its own memory, its own job. It works until the question is answered, then checkpoints itself and disappears. Reply a week later and the same agent comes back mid-sentence.",
    cta: "Join the waitlist",
    submittingLabel: "Summoning…",
    formNote:
      "Free during the beta. We're onboarding in small batches, and there's no newsletter attached — one email when your access is ready.",
    formFields: "full",
    useCaseHint: "Optional — but it's how we pick the next batch.",
    confirmation:
      "*POOF* — you're on the waitlist. We'll be in touch when your batch opens up.",
    contactEmail: "hello@ayusht.me",

    problem: {
      lines: [
        "You already have an AI bot in Slack.",
        "It's one bot, in every channel, with one memory and no idea which conversation it's in.",
        "Ask it something on Tuesday and it's forgotten by Wednesday.",
      ],
      kicker:
        "That's not an assistant. That's a search box with a personality.",
    },

    loop: {
      eyebrow: "How it works",
      header: "One thread. One agent. One job.",
      intro:
        "The whole lifecycle is the product. An agent is summoned into a single thread, works there, and ends itself when the work is done — without anyone remembering to turn it off.",
      steps: [
        {
          title: "Summon",
          body: "Mention @meeseeks in any thread. A container is created for that thread alone, and the agent greets you in a few seconds.",
        },
        {
          title: "Work",
          body: "It searches, reads and reasons with real tools. Every reply lands back in the thread, and it holds the whole context for follow-ups.",
        },
        {
          title: "Poof",
          body: "When the thread goes quiet it asks if it's still needed. No answer, and it writes a summary, saves its memory, and deletes itself.",
        },
        {
          title: "Resurrect",
          body: "Reply days later. A new container comes up, loads the old agent's memory, and answers like it never left.",
        },
      ],
    },

    features: [
      {
        title: "A thread is an identity, not a session",
        body: "Most bots forget when the process restarts. Here the agent's memory lives outside the machine it runs on, so crashes, restarts and deliberate shutdowns are all the same thing: a nap.",
      },
      {
        title: "One agent per conversation",
        body: "No cross-talk, no leaked context between channels, no shared scratchpad. Three threads means three isolated agents that cannot see each other.",
      },
      {
        title: "It ends itself",
        body: "Idle agents cost money and nobody remembers to turn them off. This one asks, waits, writes a handover note, and shuts down on its own.",
      },
    ],

    details: {
      eyebrow: "Under the hood",
      header: "For the people who'll ask.",
      items: [
        "One Kubernetes pod per Slack thread, `restartPolicy: Never`. Pods are meant to end.",
        "Agent memory — workspace plus the full session transcript — is checkpointed to `S3` and restored on the next summon. A pod is a body, not an identity.",
        "The gateway holds a single Slack `Socket Mode` connection. No public ingress, no inbound webhooks, no URL to attack.",
        "Background checkpoints every five minutes bound worst-case memory loss to five minutes.",
        "Agent pods get temporary credentials via `IRSA`, scoped to their own prefix. No static keys anywhere in the cluster.",
        "The thread-to-pod map isn't stored — it's derived from pod labels, so the gateway can be redeployed mid-conversation without losing a thread.",
      ],
    },

    faq: [
      {
        question: "Does it read my whole Slack workspace?",
        answer:
          "No. An agent only ever sees the one thread it was summoned into. It has no access to other channels, other threads, or your DMs.",
      },
      {
        question: "What can it actually do right now?",
        answer:
          "Research and reasoning: web search, reading pages, working through a question across many turns, and summarising it all at the end. It cannot yet touch code repositories, cloud accounts, or internal systems.",
      },
      {
        question: "What happens to a conversation after the agent shuts down?",
        answer:
          "Its memory is saved, and you get a written summary of the thread. Reply in that thread whenever you like and the same agent resumes with everything intact.",
      },
    ],

    closing: {
      header: "Join the waitlist",
      body: "We're onboarding in small batches so we can actually talk to everyone. Tell us where you'd point one and we'll bump you up the list.",
      honesty:
        "Where this actually is: the full lifecycle — summon, converse, hibernate, resurrect, dismiss — runs on EKS today. Agents can search and read, but they can't touch your repos or your cloud, and there's no dashboard or billing yet. We'd rather show you that than a polished demo of something that doesn't exist.",
    },

    finePrint:
      "Mr. Meeseeks is a fan-named side project and is not affiliated with Adult Swim or Rick and Morty.",
  },
  {
    slug: "silt",
    name: "Silt",
    headline: [
      "Your agent broke last Tuesday.",
      "It'll break the same way next Tuesday.",
    ],
    subhead:
      "Silt catches agent failures in production, then turns each one into a test that blocks the next deploy.",
    cta: "Join the waitlist",
    formNote:
      "We let people in a few at a time. No spam, one email when it's your turn.",
    formFields: "full",
    useCaseHint:
      "Optional — but it's how we decide who to let in next. Teams whose problem we can actually help with go first.",
    confirmation:
      "You're on the waitlist. We'll be in touch when it's your turn.",
    contactEmail: "hello@ayusht.me",

    problem: {
      lines: [
        "You already know your agent hallucinates sometimes.",
        "You find out when a user complains, or when someone scrolls far enough through the traces.",
        "Then you fix it, ship it, and have no idea whether it's actually gone.",
      ],
      kicker:
        "The failures you find in production never become the tests that stop them recurring.",
    },

    texture: {
      src: siltTexture,
      alt: "Fine sediment on a tidal flat, dark and light grains sorted into overlapping fans by running water.",
    },

    loop: {
      header: "One definition. Production and CI.",
      intro:
        "A signal is a check you write once. It runs on live traffic and it runs in your pipeline. Same definition, both places.",
      steps: [
        {
          title: "Signals",
          body: "Describe the behaviour you care about in plain English. It starts watching live traffic immediately.",
        },
        {
          title: "Issues",
          body: "Fires get clustered, deduped and ranked, then land in Slack with the trace attached.",
        },
        {
          title: "Eval set",
          body: "One click turns the issue into a test case. Real traffic, no fixtures to invent.",
        },
        {
          title: "Ship gate",
          body: "Run it in CI against your next prompt change. Non-zero exit if the failure came back.",
        },
      ],
      terminal: {
        lines: [
          {
            text: "$ silt eval run refund-loop --candidate ./prompts/v12",
            tone: "command",
          },
          { text: "", tone: "plain" },
          { text: "  12 cases · 11 passed · 1 regressed", tone: "plain" },
          {
            text: "  ✗ tool_loop fires on case 7 — clean in v11",
            tone: "fail",
          },
          { text: "", tone: "plain" },
          { text: "  exit 1", tone: "muted" },
        ],
        caption: "Your CI already knows what to do with a non-zero exit code.",
      },
    },

    features: [
      {
        title: "No sampling",
        body: "Most tools evaluate a slice of your traffic because checking all of it is expensive. We built the pipeline so you don't have to choose. Failures live in the long tail — that's the part sampling throws away.",
      },
      {
        title: "Bring your own everything",
        body: "OpenTelemetry in, your own model keys for evaluation, your own bucket for old traces. Point your existing exporter at us and change a header.",
      },
      {
        title: "Redacted before it's stored",
        body: "Names, emails and card numbers are replaced at ingest — with stable placeholders, so traces stay readable and gradeable. Your eval sets are safe to commit to a repo.",
      },
    ],

    closing: {
      header: "Join the waitlist",
      body: "We're onboarding a small number of teams running agents in production, a few at a time. Tell us what you're building — that's what we use to work out who to let in next.",
      honesty:
        "It's early. Some of this is built, some is being built with the first teams using it. If you'd rather see it working before joining, ask us for a demo.",
    },
  },
];

export function getAllWaitlistProjects(): WaitlistProject[] {
  return projects;
}

/** Returns undefined rather than throwing so the route can render notFound(). */
export function getWaitlistProject(slug: string): WaitlistProject | undefined {
  return projects.find((project) => project.slug === slug);
}
