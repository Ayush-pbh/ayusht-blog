import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import { BlockCode } from "@/components/Code";
import InlineLink from "@/components/InlineLink";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("the-paper-route");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Both the Spengler and the Sombart passages are quoted in John Ryan,{" "}
        <InlineLink href="https://www.uowoajournals.org/aabfj/article/id/1454/print/">
          “Historical Note: Did double-entry bookkeeping contribute to economic
          development, specifically the introduction of capitalism?”
        </InlineLink>
        , <em>Australasian Accounting, Business and Finance Journal</em> 8(3),
        2014. Spengler is also where the Goethe line comes from, by way of{" "}
        <em>Wilhelm Meister</em>.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        On Pacioli, the 1494 <em>Summa</em> and the rule about sleep, see{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Luca_Pacioli">
          Luca Pacioli
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        The Farolfi ledger and Cotrugli’s manuscript history are covered in{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Double-entry_bookkeeping">
          Double-entry bookkeeping
        </InlineLink>
        . The same article notes that the claim that Giovanni di Bicci de’
        Medici introduced the method to his bank lacks evidence.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        Mikhail Kuter, Marina Gurskaya and Albert Gurskii,{" "}
        <InlineLink href="https://rio.upo.es/entities/publication/51724bce-ed33-4446-b741-8e692d9acfea/full">
          “Genoa 1340, Double Entry, and ‘Gold Coasting’”
        </InlineLink>
        , <em>De Computis</em> 22(1), 2025. It is a close reconstruction of the
        commune’s 1340 ledger.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Iris Origo, <em>The Merchant of Prato</em> (1957), is the classic book
        built from the archive. For the discovery and the size of the archive,
        see{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Francesco_di_Marco_Datini">
          Francesco di Marco Datini
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Raymond de Roover,{" "}
        <em>The Rise and Decline of the Medici Bank, 1397–1494</em> (1963), is
        still the standard account. The figures here come from the summary in{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Medici_Bank">
          Medici Bank
        </InlineLink>
        , which leans heavily on de Roover.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Christopher Napier,{" "}
        <InlineLink href="https://www.lse.ac.uk/accounting/assets/Documents/news/Christopher-Napier-Basil-Yamey-Historian-of-Accounting.pdf">
          “Basil Yamey: Historian of Accounting”
        </InlineLink>
        , LSE. Yamey’s original paper is “Scientific Bookkeeping and the Rise of
        Capitalism”, <em>Economic History Review</em>, 1949.
      </>
    ),
  },
];

export default function ThePaperRoute() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          In 1922 Oswald Spengler named what he called the decisive event: the
          invention of double-entry bookkeeping by Fra Luca Pacioli in 1494. He
          added, via Goethe, that it was one of the finest discoveries of the
          human intellect, and that its author could be ranked with Columbus and
          Copernicus.
          <FootnoteLink id={1} /> Almost every part of that sentence is wrong.
          Pacioli didn’t invent double entry, 1494 wasn’t the decisive moment,
          and the larger idea behind it, that bookkeeping made capitalism, is a
          thesis a careful economist took apart in 1949. And yet I keep coming
          back to the instinct behind it, because the instinct is right about
          something the details get wrong.
        </p>

        <p>
          The title of this piece makes the strong claim on purpose. The version
          I can defend is smaller and, I think, more interesting: ledgers didn’t
          create the desire for profit, and they didn’t make merchants rational.
          They made trust portable. That was the bottleneck.
        </p>

        <H2>Pacioli wrote the documentation, not the code</H2>

        <p>
          Pacioli was a mathematician and a Franciscan friar. His{" "}
          <em>
            Summa de arithmetica, geometria, proportioni et proportionalita
          </em>
          , printed in Venice in 1494, was a mathematics textbook with a section
          on how Venetian merchants kept their books. It is one of the first
          published descriptions of the method, with journals, ledgers, and
          accounts for assets, liabilities and capital. It is also where you
          will find the most relatable advice in the history of finance: don’t
          go to sleep at night until the debits equal the credits.
          <FootnoteLink id={2} />
        </p>

        <p>
          But Pacioli was documenting a practice that already existed, and had
          for about two centuries. The earliest surviving European records kept
          in full double entry belong to a Florentine firm, Giovannino Farolfi
          &amp; Company, headquartered at Nîmes in southern France. Its ledger
          for 1299–1300 was kept by a merchant named Amatino Manucci.
          <FootnoteLink id={3} /> In 1340 the commune of Genoa kept its treasury
          accounts, the ledger of the <em>massari</em>, in double entry, and
          that ledger is one of the most famous government account books of the
          Middle Ages.
          <FootnoteLink id={4} /> A Ragusan merchant, Benedetto Cotrugli,
          described the system in a treatise written in 1458, more than thirty
          years before Pacioli. His manuscript simply wasn’t printed until 1573,
          and the printer shortened and altered the bookkeeping section.
          <FootnoteLink id={3} />
        </p>

        <p>
          So the man credited with the invention was the one whose book got
          printed first. If you have ever watched credit for a technique go to
          whoever wrote the clearest README, rather than the people who shipped
          it in production for years, you will recognise the pattern. Pacioli
          deserves real credit. Clear documentation is how a practice escapes
          the firm that developed it. But the code was already running in
          Tuscany and Genoa.
        </p>

        <H2>The ledger is a checksum, and a weak one</H2>

        <p>
          Here is the part I find beautiful as an engineer, and it’s also the
          part that gets oversold. Double entry imposes one invariant: every
          transaction is recorded twice, as a debit to one account and an equal
          credit to another, so the sum across all accounts is always zero. In
          code it is almost embarrassingly small:
        </p>

        <BlockCode
          meta="python"
          code={`from collections import defaultdict

ledger = defaultdict(int)  # account -> balance in denari; debits positive

def post(debit: str, credit: str, amount: int) -> None:
    ledger[debit] += amount
    ledger[credit] -= amount

post("cloth", "cash", 120)           # buy cloth for cash
post("cash", "sales", 200)           # sell some of it
post("debtor:Bruges", "sales", 80)   # sell the rest on credit

assert sum(ledger.values()) == 0     # the trial balance`}
        />

        <p>
          That final assertion is the trial balance, and it is a checksum on the
          whole firm. If a clerk records only half of a transaction, or adds a
          column wrong, the books stop summing to zero and you know something is
          broken before you know what. For a merchant with agents in five cities
          and nothing faster than a courier, that is an enormous gift. You can
          audit a stranger’s work without redoing it.
        </p>

        <p>Now look at what the checksum can’t see:</p>

        <BlockCode
          meta="python"
          code={`post("debtor:London", "sales", 80)   # wrong debtor: still balances
post("cash", "sales", 500)           # sale that never happened: still balances
# a sale nobody recorded at all: still balances

assert sum(ledger.values()) == 0     # passes every time`}
        />

        <p>
          A balanced ledger tells you the entries are internally consistent. It
          does not tell you they are true. Post to the wrong account, leave a
          transaction out entirely, or invent one with both sides filled in, and
          the trial balance is perfectly happy. A parity bit has the same
          limitation: it catches a single flipped bit and misses two. Most
          accounting fraud since has lived in that gap. The system detects
          carelessness, not intent.
        </p>

        <p>
          This is basically the argument the economist Basil Yamey made in 1949
          against the idea that double entry created capitalism. The method, he
          argued, looks backward rather than forward. It records what happened
          in an orderly way, which matters more as a business gets complex. But
          it was not designed to tell an owner which ventures would pay. It was
          neither necessary for commercial success (the Dutch East India Company
          seems to have managed without it) nor sufficient (plenty of firms with
          immaculate books went bust).
          <FootnoteLink id={7} />
        </p>

        <H2>Sombart’s beautiful, overreaching idea</H2>

        <p>
          The thesis Yamey was attacking belongs to the German economic
          historian Werner Sombart. Sombart thought double entry was not a
          clerical convenience but the mental model of capitalism itself. In the
          passage Spengler quotes, Sombart says it{" "}
          <q>is born of the same spirit as the system of Galileo and Newton</q>
          , an ordering of the world into pure quantities.
          <FootnoteLink id={1} /> The argument is that once profit becomes a
          single abstract number on a page, separate from any particular bale of
          wool or ship, the idea of capital as a quantity that seeks to grow
          becomes thinkable.
        </p>

        <p>
          I like this idea more than I believe it. The strong form, that
          capitalism could not exist without double entry, fails on Yamey’s
          evidence: big enterprises ran without it, and it was available for
          centuries before anything we would call industrial capitalism
          appeared. But the weak form survives. Bookkeeping changes what its
          users can see. A firm that tracks capital as one number will start
          asking what return that number earns. Tools shape the questions people
          know how to ask. Anyone who has watched a company reorganise itself
          around a dashboard metric has seen the effect in miniature.
        </p>

        <H2>What the archives actually show</H2>

        <p>
          If you want to know what merchants did with paper, as opposed to what
          theorists said about it, the best evidence is the archive of Francesco
          di Marco Datini, a merchant of Prato who died in 1410. In 1870, during
          work on his old house, a stairwell gave up some 500 account books and
          around 150,000 papers.
          <FootnoteLink id={5} /> That is the paper trail of an obsessive. He
          was away from home so much that he and his wife ran their marriage by
          letter for about twenty-seven years. A merchant does not keep 150,000
          papers by accident. My reading is that the account books were the
          summary and the correspondence was the telemetry, the continuous
          stream of reports that made the summary worth trusting.
        </p>

        <p>
          The Medici bank is the better systems case. Giovanni di Bicci de’
          Medici founded it in Florence in 1397 with 10,000 gold florins. Over
          the next decades it opened branches in Rome, Venice, Geneva (later
          Lyon), Avignon, Bruges, London, Milan and Pisa. Each branch was a
          separate partnership. The Florentine parent held the majority stake,
          and the branch manager was a junior partner paid a share of profits
          rather than a salary. Partnerships were reviewed when the books closed
          and renewed if the numbers were good. Historians compare it to a
          modern holding company, and the comparison is fair.
          <FootnoteLink id={6} />
        </p>

        <p>
          Look at what that structure does. It caps the blast radius: a failing
          branch is a failing partnership, not automatically a failing bank. It
          aligns incentives, because the manager eats his own losses. And it
          makes the annual closing of the books the control loop: the moment the
          centre decides whether to renew a branch. None of that works unless
          every branch keeps books the centre can read and trust. The ledger is
          the API between the head office and the edges.
        </p>

        <p>
          The money itself moved on paper too. Church law prohibited usury, so
          the Medici earned most of their income from bills of exchange. Value
          was paid in one city and currency, and repaid in another city and
          currency some time later. The profit sat in the exchange rate and the
          delay, not in a line marked interest.
          <FootnoteLink id={6} /> A bill of exchange is a promise that travels
          further than its signer and is honoured by people who have never met
          him, because his correspondents’ books say he is good for it. That,
          more than the debit-credit symmetry, is the paper route of the title:
          a network of ledgers that let credit move between Florence, Bruges and
          London without moving a single coin.
        </p>

        <H2>Good books did not save the Medici</H2>

        <p>
          The Medici bank is also the cleanest counterexample to the idea that
          accounting is power. This was a bank run on paper, and it failed
          anyway. The London branch lent heavily to Edward IV and others during
          the Wars of the Roses, repayment collapsed, and the branch was wound
          up in 1478 with losses of about 51,533 florins. In Bruges, Tommaso
          Portinari lent to the Burgundian court and sank money into galleys,
          and Bruges together with the inherited London debts cost the bank more
          than 70,000 florins. Lorenzo de’ Medici leaned on his general manager,
          Francesco Sassetti, without checking his work. When the French invaded
          in 1494 and Florence threw the Medici out, the branches were
          dissolved.
          <FootnoteLink id={6} />
        </p>

        <p>
          Assume every one of those losses was recorded correctly, with the
          debits equal to the credits. The ledger can tell you, accurately and
          in two columns, that you have lent a king more than he will ever
          repay. It can’t make you stop. That is Yamey’s point with a body
          count: bookkeeping is an instrument of observation, and observation is
          not judgement.
        </p>

        <p>
          So did ledgers invent capitalism? No. Desire for profit is much older,
          the method is older than its famous textbook, and the people who
          wielded it best still went broke. What double entry and its companions
          really did was narrower and, for my money, more important. Bills of
          exchange, partnership contracts, branch accounts and a continuous
          flood of letters let a merchant trust people he could not see, and
          check their work without being in the room. Commerce at a distance
          became something you could audit. Everything we call finance is built
          on that.
        </p>

        <p>
          The same theme runs through two other pieces here.{" "}
          <InlineLink href="/thoughts/information-monopoly">
            Information Monopoly
          </InlineLink>{" "}
          is about who controls the channels that this kind of information moves
          through, from print to the telegraph to search.{" "}
          <InlineLink href="/thoughts/the-geopolitics-of-guano">
            The Geopolitics of Guano
          </InlineLink>{" "}
          is about a nineteenth-century state that pledged its revenue to London
          creditors against a pile of bird droppings. That story ended the way
          the Medici one did. The books balanced until the asset ran out.
        </p>

        <Footnotes />
      </div>
    </FootnotesProvider>
  );
}
