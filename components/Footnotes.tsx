"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Ol, Li } from "@/components/List";

interface Footnote {
  id: number;
  content: ReactNode;
}

interface FootnotesContextType {
  footnotes: Footnote[];
}

const FootnotesContext = createContext<FootnotesContextType | undefined>(
  undefined,
);

// Provider component
export function FootnotesProvider({
  children,
  footnotes,
}: {
  children: ReactNode;
  footnotes: Footnote[];
}) {
  return (
    <FootnotesContext.Provider value={{ footnotes }}>
      {children}
    </FootnotesContext.Provider>
  );
}

// Hook for consuming context
function useFootnotes() {
  const context = useContext(FootnotesContext);
  if (context === undefined) {
    throw new Error("useFootnotes must be used within a FootnotesProvider");
  }
  return context;
}

// Component for inline footnote links
export function FootnoteLink({ id }: { id: number }) {
  const { footnotes } = useFootnotes();
  const footnote = footnotes.find((f) => f.id === id);

  if (!footnote) return null;

  return (
    <span>
      <sup>
        <a
          id={`s${id}`}
          href={`#f${id}`}
          className="hover:text-accent font-mono text-[0.7em] text-neutral-400 tabular-nums transition-colors"
        >
          [{id}]
        </a>
      </sup>
      <span className="absolute left-full ml-14 hidden w-60 -translate-y-5 text-left font-sans text-xs leading-relaxed text-neutral-500 xl:block">
        <span className="absolute top-0 -translate-x-full pr-2 font-mono text-[0.7rem] text-neutral-400 tabular-nums select-none">
          {footnote.id}.
        </span>{" "}
        <span>{footnote.content}</span>
      </span>
    </span>
  );
}

// Component for footnotes list at bottom of page
export function Footnotes() {
  const { footnotes } = useFootnotes();
  const [activeFootnote, setActiveFootnote] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    setActiveFootnote(hash);

    const handleHashChange = () => {
      setActiveFootnote(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      <hr />
      <Ol className="space-y-3 font-sans text-xs leading-relaxed text-neutral-500">
        {footnotes
          .sort((a, b) => a.id - b.id)
          .map((footnote) => (
            <Li
              key={footnote.id}
              id={`f${footnote.id}`}
              data-footnote-id={`${footnote.id}. `}
              data-active={activeFootnote === `#f${footnote.id}`}
              className={
                "pl-1 marker:font-mono marker:text-[0.7rem] marker:text-neutral-400 marker:content-[attr(data-footnote-id)] data-[active=true]:text-neutral-900"
              }
            >
              <a
                href={`#s${footnote.id}`}
                className="hover:text-accent mr-1.5 font-mono text-neutral-300 transition-colors"
              >
                ^
              </a>
              {footnote.content}
            </Li>
          ))}
      </Ol>
    </>
  );
}
