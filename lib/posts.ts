import type { Post } from "@/types";
import { estimateReadingTime } from "@/lib/readingTime";

/**
 * Drafts are visible while you're working (`npm run dev`) and on Vercel preview
 * deployments, so a branch URL is enough to share a piece for feedback. Only a
 * production build hides them.
 */
const showDrafts =
  process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";

const posts: Post[] = [
  //{
  //  slug: "ai-is-inevitable",
  //  title: "AI is Inevitable",
  //  description:
  //    "The economic era we know is ending. This is a natural cycle that all things go through, celebrate what we had and prepare yourself for a new reality. A reality where AI has no boundaries.",
  //  date: "May 21, 2025",
  //},

  {
    slug: "beyond-the-wrapper",
    title: "Beyond the Wrapper: Building Fault-Tolerant Multi-Agent Swarms",
    description:
      "A chain of prompts can't loop; a graph can. Most multi-agent failures are distributed-systems bugs, and the fix is bounded cycles, error edges, checkpoints and idempotent side effects. Often the right number of agents is one.",
    date: "Oct 20, 2026",
    tag: "Tech",
  },
  {
    slug: "the-cost-of-autonomy",
    title:
      "The Cost of Autonomy: Token Economics and Latency Bottlenecks in Production Agents",
    description:
      "Agent loops re-send their whole context on every step, so the bill grows with the square of the step count. The arithmetic, what prompt caching does to it, and why semantic caching is a trap inside the loop.",
    date: "Oct 20, 2026",
    tag: "Tech",
  },
  {
    slug: "local-first-agents",
    title: "Local-First Agents: Running Ollama, Llama 3, and AST Parsing",
    description:
      "A background refactoring daemon on a laptop: a local Ollama tool loop, a JSON schema the model must answer in, and Python's ast doing every edit. The model decides what to change; the tree does the typing.",
    date: "Oct 20, 2026",
    tag: "Tech",
  },
  {
    slug: "tool-use-vs-hallucination",
    title:
      "Tool Use vs. Hallucination: Why Function Calling is the Weakest Link in Modern AI Agents",
    description:
      "Broken JSON and made-up function names are mostly a solved problem now. What's left is worse: valid calls that are wrong. Grammars guarantee shape, not meaning, so the real work is semantic validation and fallbacks.",
    date: "Oct 20, 2026",
    tag: "Tech",
  },
  {
    slug: "prompt-engineering-to-control-flow",
    title:
      "From Prompt Engineering to Control Flow: Designing Deterministic State Machines for LLM Apps",
    description:
      "The bug isn't treating the model like a chat buddy; it's letting the transcript be the program. Let the model turn messages into events, let a state machine decide what happens, and test the table rather than the prompt.",
    date: "Oct 20, 2026",
    tag: "Tech",
  },
  {
    slug: "quantum-measurement-paradox",
    title:
      "The Quantum Measurement Paradox: Why Reality Doesn't Exist Until We Look at It",
    description:
      "Nothing in quantum mechanics waits for you to look, and the delayed-choice eraser doesn't rewrite the past. What survives, Bell's theorem, is stranger than the myth.",
    date: "Oct 20, 2026",
    tag: "Physics",
  },
  {
    slug: "antimatter-factories",
    title:
      "Antimatter Factories: How We Make, Trap, and Lose the Universe's Most Dangerous Substance",
    description:
      "A microgram of antimatter would make a 43-kilogram-of-TNT bang, not an apocalypse, and CERN has made nanograms in half a century. The real feat is keeping a hundred antiprotons alive for a year.",
    date: "Oct 20, 2026",
    tag: "Physics",
  },
  {
    slug: "gravity-is-not-a-force",
    title:
      "Gravity is Not a Force: Rethinking General Relativity Without the Rubber Sheet Metaphor",
    description:
      "What you feel as weight is the floor pushing you off a geodesic. For slow objects gravity is almost entirely the curvature of time, and the part you can't make vanish by falling is a millionth of g.",
    date: "Oct 20, 2026",
    tag: "Physics",
  },
  {
    slug: "maxwells-demon",
    title:
      "The Maxwell's Demon Problem: Information Theory Meets Thermodynamics at the Nanoscale",
    description:
      "Forgetting one bit costs at least kT ln 2, about 2.9 × 10⁻²¹ J at room temperature. It's been measured on a bead, an electron and a nanomagnet, and your laptop pays 10⁴ to 10⁹ times that for reasons unrelated to it.",
    date: "Oct 20, 2026",
    tag: "Physics",
  },
  {
    slug: "quantum-tunneling-in-biology",
    title:
      "Quantum Tunneling in Biology: How Enzymes and Photosynthesis Cheat Classical Physics",
    description:
      "Enzymes really do tunnel hydrogen through barriers. Birds probably use spin chemistry, smell-by-vibration is still a long shot, and the famous photosynthesis coherence didn't hold up.",
    date: "Oct 20, 2026",
    tag: "Physics",
  },
  {
    slug: "mapping-the-invisible",
    title:
      "Mapping the Invisible: What Multi-Wavelength Astronomy Reveals About the Cosmos",
    description:
      "Visible light is one octave out of about forty. The best of multi-wavelength astronomy isn't the pretty composites, it's what turns up when two bands disagree, and the ageing telescopes that make that possible.",
    date: "Oct 20, 2026",
    tag: "Space",
  },
  {
    slug: "the-fermi-paradox-is-wrong",
    title:
      "The Fermi Paradox is Wrong: Why We Don't Hear Aliens Because They're Post-Biological",
    description:
      "Minds that outgrow biology have little reason to broadcast, which explains the radio silence. They still have to dump heat, though, and the infrared sky is quiet too.",
    date: "Oct 20, 2026",
    tag: "Space",
  },
  {
    slug: "rogue-planets",
    title:
      "Rogue Planets: The Billions of Wandering Worlds Floating Through Interstellar Space",
    description:
      "Microlensing hints at trillions of planets with no star, give or take a factor of five. How they get thrown out, how you weigh something that never shines, and whether one could keep an ocean warm.",
    date: "Oct 20, 2026",
    tag: "Space",
  },
  {
    slug: "titan-and-enceladus",
    title:
      "Titan and Enceladus: Why the Outer Solar System Is Our Best Bet for Alien Microbes",
    description:
      "Enceladus sprays its ocean into space, Titan is a chemistry lab, and Mars has the best clue with no ride home. Why a second genesis in Saturn's moons would teach us more than a Martian fossil.",
    date: "Oct 20, 2026",
    tag: "Space",
  },
  {
    slug: "the-ultimate-fate-of-the-cosmos",
    title:
      "The Ultimate Fate of the Cosmos: Heat Death, the Big Rip, and Vacuum Decay",
    description:
      "Heat death, the Big Rip and vacuum decay all hinge on a couple of measured numbers. New DESI data hint that dark energy is weakening, which makes the most violent ending less likely.",
    date: "Oct 20, 2026",
    tag: "Space",
  },
  {
    slug: "bronze-age-supply-chain-collapse",
    title:
      "Supply Chain Collapses That Ended Civilizations: Lessons from the Late Bronze Age",
    description:
      "The Bronze Age world didn't fall because the tin stopped. Drought, hunger and raiders hit a tightly coupled system with no slack left, and trade spread every failure to every kingdom.",
    date: "Oct 20, 2026",
    tag: "History",
  },
  {
    slug: "the-geopolitics-of-guano",
    title:
      "The Geopolitics of Guano: How Bird Poop Sparked Wars and Built Modern Agriculture",
    description:
      "Peru ran a state on bird droppings, Spain seized them as a hostage, and Chile fought for what replaced them. The dependency ended in a chemistry lab, not on a battlefield.",
    date: "Oct 20, 2026",
    tag: "History",
  },
  {
    slug: "information-monopoly",
    title:
      "Information Monopoly: How the Printing Press, Telegraph, and Internet Shattered Power",
    description:
      "The press, the telegraph and the internet each broke an information monopoly, then built a new one at the bottleneck. Keeping power spread out has always been a political job, not a technical one.",
    date: "Oct 20, 2026",
    tag: "History",
  },
  {
    slug: "megaprojects-of-antiquity",
    title:
      "Megaprojects of Antiquity: The Logistics of Moving Millions of Tons Without Steel",
    description:
      "No lost secrets: the Pyramids, the Nîmes aqueduct and Angkor were built with boats, bread, careful surveying and decades of patient logistics, and the hard part then was the same as now.",
    date: "Oct 20, 2026",
    tag: "History",
  },
  {
    slug: "the-paper-route",
    title:
      "The Paper Route: How Bureaucracy, Ledgers, and Double-Entry Bookkeeping Invented Capitalism",
    description:
      "Pacioli didn't invent double entry, and ledgers didn't invent capitalism. What they did was make trust portable: a checksum on commerce that catches carelessness but not bad judgement.",
    date: "Oct 20, 2026",
    tag: "History",
  },
  {
    slug: "seeing-music",
    title: "Seeing Music",
    description:
      "Music has always wanted a body — a dancer, a lamp, a spinning record. On why I built Dhun, and why I will keep building it for an audience of one.",
    date: "Aug 31, 2026",
    tag: "Art",
  },
  {
    slug: "colophon",
    title: "Colophon",
    description:
      "How this site is built, and why it is built the way it is: posts as React components, a design system that is one colour ramp, and dark mode without a single dark: variant.",
    date: "Aug 7, 2026",
    tag: "Tech",
  },
  {
    slug: "specimen",
    title: "Specimen",
    description:
      "Every component a post on this site can use, on one page. Kept as a draft so it stays out of the index and the feeds.",
    date: "Aug 7, 2026",
    draft: true,
  },
];

/**
 * Newest first, with `pinned` posts floated above the rest. Sorting here rather
 * than relying on the order of the array above means the list, the sitemap and
 * the feeds cannot drift apart, and a new entry can go anywhere in the array.
 */
function byPinnedThenNewest(a: Post, b: Post): number {
  if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/**
 * The public list — what feeds `/thoughts`, `app/sitemap.ts` and the three feed
 * routes. Drafts drop out of all four at once in production.
 */
export function getAllPosts(): Post[] {
  const visible = showDrafts ? posts : posts.filter((post) => !post.draft);
  return [...visible].sort(byPinnedThenNewest);
}

/**
 * Looks through drafts as well, so a draft's own page still builds and answers
 * on its URL in production — it is unlisted, not unreachable. `createMetadata`
 * marks drafts `noindex` so nothing links them into search results.
 */
export function getPostBySlug(slug: string): Post {
  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }
  // Copied, not mutated: the array above is shared with `getAllPosts`, and
  // reading time is only wanted on the article page itself.
  return {
    ...post,
    readingTime: post.readingTime ?? estimateReadingTime(slug),
  };
}
