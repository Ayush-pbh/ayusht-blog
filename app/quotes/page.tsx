import type { Metadata } from "next";
import BlockQuote from "@/components/BlockQuote";

export const metadata: Metadata = {
  title: "Quotes",
  description: "A collection of my favorite quotes, gathered over time.",
};

export default function Quotes() {
  return (
    <div className="space-y-4">
      <BlockQuote source="Serbian proverb">
        <p>
          Be humble for you are made of earth. Be noble for you are made of
          stars.
        </p>
      </BlockQuote>
    </div>
  );
}
