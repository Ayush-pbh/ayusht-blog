import type { Metadata } from "next";
import BlockQuote from "@/components/BlockQuote";
import { getShuffledQuotes } from "@/lib/quotes";

const promise = "A collection of my favorite quotes, gathered over time.";

export const metadata: Metadata = {
  title: "Quotes",
  description: promise,
};

// Opting out of static generation is what makes the shuffle land on every
// refresh — otherwise the order would be frozen at build time.
export const dynamic = "force-dynamic";

export default function Quotes() {
  const quotes = getShuffledQuotes();

  return (
    <div>
      <header className="rise mb-10">
        <h1 className="text-title font-serif text-neutral-900">Quotes</h1>
        <p className="text-lede mt-4 max-w-[46ch] font-serif text-neutral-500">
          {promise}
        </p>
      </header>

      <div>
        {quotes.map((quote, index) => (
          <BlockQuote
            key={quote.text}
            author={quote.author}
            source={quote.source}
            className="rise"
            style={{ "--rise-index": index + 1 } as React.CSSProperties}
          >
            <p>{quote.text}</p>
          </BlockQuote>
        ))}
      </div>
    </div>
  );
}
