import type { Quote } from "@/types";

// Order here doesn't matter — the page shuffles on every request.
const quotes: Quote[] = [
  {
    text: "Be humble for you are made of earth. Be noble for you are made of stars.",
    source: "Serbian proverb",
  },
  {
    text: "I question therefore I am.",
    author: "Ayush",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    source: "SICP",
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    text: "There are two ways of constructing a software design: one way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.",
    author: "C. A. R. Hoare",
  },
  {
    text: "Debugging is twice as hard as writing the code in the first place. So if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    author: "Brian Kernighan",
  },
  {
    text: "The most damaging phrase in the language is: we’ve always done it this way.",
    author: "Grace Hopper",
  },
  {
    text: "Startups rarely die in mid keystroke. So keep typing!",
    author: "Paul Graham",
  },
  {
    text: "It’s better to have 100 people love you than a million people just kind of like you.",
    author: "Brian Chesky",
  },
  {
    text: "If you are not embarrassed by the first version of your product, you’ve launched too late.",
    author: "Reid Hoffman",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
    author: "Richard Feynman",
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
  },
  {
    text: "Everything can be taken from a man but one thing: the last of the human freedoms — to choose one’s attitude in any given set of circumstances.",
    author: "Viktor Frankl",
    source: "Man's Search for Meaning",
  },
  {
    text: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
    author: "Albert Camus",
  },
  {
    text: "Tell me, what is it you plan to do with your one wild and precious life?",
    author: "Mary Oliver",
    source: "The Summer Day",
  },
  {
    text: "Art is not what you see, but what you make others see.",
    author: "Edgar Degas",
  },
  {
    text: "Every child is an artist. The problem is how to remain an artist once we grow up.",
    author: "Pablo Picasso",
  },
  {
    text: "A poem is never finished, only abandoned.",
    author: "Paul Valéry",
  },
];

/**
 * A fresh shuffle per call (Fisher-Yates, on a copy). The quotes page is
 * `force-dynamic` so this runs per request rather than once at build time.
 */
export function getShuffledQuotes(): Quote[] {
  const shuffled = [...quotes];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
