/**
 * Snapshot of OpenRouter on 20 October 2026, the data behind every chart in
 * this post. Kept as data rather than baked into the charts so each figure can
 * be traced back to its source and re-run when the numbers move.
 *
 * - input / output: list price in USD per million tokens (OpenRouter /models).
 * - throughput: tokens per second, P50, best across providers.
 * - latency: seconds, P50, best provider.
 * - gpqa: GPQA Diamond %, OpenRouter's own runs of shared benchmark prompts,
 *   auto-routed. null where OpenRouter had no score.
 * - e2e: end-to-end request seconds, one-week average, best provider. Only
 *   collected for the models the post discusses it for.
 */
export type Model = {
  id: string;
  name: string;
  maker: string;
  retiring: boolean;
  input: number;
  output: number;
  throughput: number;
  latency: number;
  gpqa: number | null;
  e2e: number | null;
};

export const SNAPSHOT = "20 Oct 2026";

export const models: Model[] = [
  {
    id: "z-ai/glm-5.3-flash",
    name: "GLM 5.3 Flash",
    maker: "Z.ai",
    retiring: false,
    input: 0.048,
    output: 0.16,
    throughput: 213,
    latency: 0.34,
    gpqa: null,
    e2e: null,
  },
  {
    id: "deepseek/deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    maker: "DeepSeek",
    retiring: false,
    input: 0.091,
    output: 0.182,
    throughput: 108,
    latency: 0.54,
    gpqa: null,
    e2e: null,
  },
  {
    id: "openai/gpt-4.1-nano",
    name: "GPT-4.1 nano",
    maker: "OpenAI",
    retiring: false,
    input: 0.1,
    output: 0.4,
    throughput: 89,
    latency: 0.79,
    gpqa: 48.1,
    e2e: null,
  },
  {
    id: "openai/gpt-6-luna",
    name: "GPT-6 Luna",
    maker: "OpenAI",
    retiring: false,
    input: 0.1,
    output: 0.5,
    throughput: 103,
    latency: 0.7,
    gpqa: 87.4,
    e2e: 2.08,
  },
  {
    id: "anthropic/claude-haiku-5.5",
    name: "Claude Haiku 5.5",
    maker: "Anthropic",
    retiring: false,
    input: 0.1,
    output: 0.5,
    throughput: 179,
    latency: 0.41,
    gpqa: 86.7,
    e2e: 1.3,
  },
  {
    id: "qwen/qwen3.8-flash",
    name: "Qwen3.8 Flash",
    maker: "Qwen",
    retiring: false,
    input: 0.15,
    output: 0.47,
    throughput: 58,
    latency: 1.02,
    gpqa: 88.6,
    e2e: null,
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o mini",
    maker: "OpenAI",
    retiring: true,
    input: 0.15,
    output: 0.6,
    throughput: 86,
    latency: 0.58,
    gpqa: 42.9,
    e2e: 1.67,
  },
  {
    id: "mistralai/mistral-small-2603",
    name: "Mistral Small 4",
    maker: "Mistral",
    retiring: false,
    input: 0.15,
    output: 0.6,
    throughput: 125,
    latency: 0.25,
    gpqa: null,
    e2e: null,
  },
  {
    id: "openai/gpt-5.6-luna",
    name: "GPT-5.6 Luna",
    maker: "OpenAI",
    retiring: false,
    input: 0.2,
    output: 1.2,
    throughput: 148,
    latency: 0.42,
    gpqa: 88.2,
    e2e: 1.81,
  },
  {
    id: "google/gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    maker: "Google",
    retiring: false,
    input: 0.25,
    output: 1.5,
    throughput: 241,
    latency: 0.51,
    gpqa: 84.5,
    e2e: null,
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 mini",
    maker: "OpenAI",
    retiring: true,
    input: 0.4,
    output: 1.6,
    throughput: 89,
    latency: 0.73,
    gpqa: 66.5,
    e2e: 1.94,
  },
  {
    id: "google/gemini-3.8-flash",
    name: "Gemini 3.8 Flash",
    maker: "Google",
    retiring: false,
    input: 0.825,
    output: 4.125,
    throughput: 123,
    latency: 1.42,
    gpqa: 95.6,
    e2e: null,
  },
  {
    id: "x-ai/grok-4.7",
    name: "Grok 4.7",
    maker: "xAI",
    retiring: false,
    input: 2.0,
    output: 6.0,
    throughput: 72,
    latency: 1.6,
    gpqa: null,
    e2e: null,
  },
  {
    id: "openai/gpt-4.1",
    name: "GPT-4.1",
    maker: "OpenAI",
    retiring: true,
    input: 2.0,
    output: 8.0,
    throughput: 95,
    latency: 0.78,
    gpqa: 64.1,
    e2e: 2.19,
  },
  {
    id: "openai/gpt-6-sol",
    name: "GPT-6 Sol",
    maker: "OpenAI",
    retiring: false,
    input: 2.0,
    output: 10.0,
    throughput: 92,
    latency: 1.47,
    gpqa: 91.9,
    e2e: 3.89,
  },
  {
    id: "anthropic/claude-sonnet-5.5",
    name: "Claude Sonnet 5.5",
    maker: "Anthropic",
    retiring: false,
    input: 2.0,
    output: 10.0,
    throughput: 117,
    latency: 0.97,
    gpqa: 92.4,
    e2e: null,
  },
  {
    id: "google/gemini-4-argon",
    name: "Gemini 4 Argon",
    maker: "Google",
    retiring: false,
    input: 2.0,
    output: 10.0,
    throughput: 51,
    latency: 2.76,
    gpqa: null,
    e2e: null,
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    maker: "OpenAI",
    retiring: true,
    input: 2.5,
    output: 10.0,
    throughput: 69,
    latency: 0.58,
    gpqa: 51,
    e2e: 1.73,
  },
];

/** Three parts input to one part output: the usual blend for chat and agent traffic. */
export const blended = (m: Model) => (3 * m.input + m.output) / 4;

export const byId = (id: string) => {
  const model = models.find((m) => m.id === id);
  if (!model) throw new Error(`No model ${id} in the snapshot`);
  return model;
};

/**
 * The swap rule used in the post: among models with a GPQA score, the
 * cheapest one that scores at least as high AND is no slower to respond.
 */
export function cheapestBetter(old: Model): Model | undefined {
  return models
    .filter(
      (m) =>
        !m.retiring &&
        m.gpqa !== null &&
        old.gpqa !== null &&
        m.gpqa >= old.gpqa &&
        m.latency <= old.latency,
    )
    .sort((a, b) => blended(a) - blended(b))[0];
}
