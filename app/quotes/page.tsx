import type { Metadata } from "next";
import BlockQuote from "@/components/BlockQuote";
import { getShuffledQuotes } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Quotes",
  description: "A collection of my favorite quotes, gathered over time.",
};

// Opting out of static generation is what makes the shuffle land on every
// refresh — otherwise the order would be frozen at build time.
export const dynamic = "force-dynamic";

export default function Quotes() {
  const quotes = getShuffledQuotes();

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <BlockQuote
          key={quote.text}
          author={quote.author}
          source={quote.source}
        >
          <p>{quote.text}</p>
        </BlockQuote>
      ))}
    </div>
  );
}
