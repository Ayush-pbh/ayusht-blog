import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import InlineLink from "@/components/InlineLink";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("information-monopoly");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Library of Congress,{" "}
        <InlineLink href="https://www.loc.gov/exhibits/bibles/interactives/gutenberg/index.html">
          “The Gutenberg Bible”
        </InlineLink>
        . The page also points out that movable metal type was in use in Korea
        nearly a century earlier, which is worth remembering whenever someone
        calls Gutenberg’s Bible the first printed book.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        David Luebke,{" "}
        <InlineLink href="https://pages.uoregon.edu/dluebke/WesternCiv102/LutherinPrint.html">
          “The Media Revolution and Reformation”
        </InlineLink>
        , University of Oregon, which charts the editions of Luther’s works by
        year and language. For the full argument see Andrew Pettegree,{" "}
        <em>Brand Luther</em> (2015), and Mark U. Edwards,{" "}
        <em>Printing, Propaganda, and Martin Luther</em> (1994).
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Jared Rubin,{" "}
        <InlineLink href="https://ideas.repec.org/a/tpr/restat/v96y2014i2p270-286.html">
          “Printing and Protestants: An Empirical Test of the Role of Printing
          in the Reformation”
        </InlineLink>
        , <em>Review of Economics and Statistics</em> 96(2), 2014.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        On the charter and the monopoly, see{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Worshipful_Company_of_Stationers_and_Newspaper_Makers">
          the Stationers’ Company
        </InlineLink>
        ; on Rome, see{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Index_Librorum_Prohibitorum">
          the Index Librorum Prohibitorum
        </InlineLink>
        . The Index was not formally abolished until 1966.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Figures from{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Telegraphy_in_the_United_States">
          Telegraphy in the United States
        </InlineLink>
        . Tom Standage’s <em>The Victorian Internet</em> (1998) is the popular
        history.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Menahem Blondheim,{" "}
        <em>
          News over the Wires: The Telegraph and the Flow of Public Information
          in America, 1844–1897
        </em>{" "}
        (Harvard, 1994). There is a good synopsis in Cameron Blevins’s{" "}
        <InlineLink href="https://www.cameronblevins.org/quals/Blondheim_NewsOvertheWires.html">
          reading notes
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Details of the Kingsbury Commitment, the 1956 decree, the 1982
        settlement and the reassembly after 1996 are in{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Bell_System">
          Bell System
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        Tim Wu,{" "}
        <em>The Master Switch: The Rise and Fall of Information Empires</em>{" "}
        (Knopf, 2010). The summary of the Cycle follows Michael J. Faris’s{" "}
        <InlineLink href="https://tcjournal.org/vol1/faris/">review</InlineLink>
        . My objections are my own.
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        US Department of Justice,{" "}
        <InlineLink href="https://www.justice.gov/opa/pr/department-justice-wins-significant-remedies-against-google">
          “Department of Justice Wins Significant Remedies Against Google”
        </InlineLink>
        , 2 September 2025. The quotation from the August 2024 liability opinion
        and the roughly 90 percent share of US search queries are both given
        there.
      </>
    ),
  },
];

export default function InformationMonopoly() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          The comfortable story about information technology goes like this.
          Someone makes it cheaper to copy or move words, the gatekeepers lose
          their grip, power spreads out, and ordinary people get a voice they
          did not have before. Printing broke the Church, the telegraph broke
          distance, the internet broke the media. It is a satisfying story, and
          I think it’s half of one, and the less important half.
        </p>

        <p>
          Every one of these revolutions did shatter an existing monopoly. Every
          one of them then built a new monopoly, usually within a single working
          lifetime, and usually at the exact layer where the new technology had
          a natural bottleneck. The title of this piece says the press, the
          telegraph and the internet shattered power. They did. What they didn’t
          do was keep it shattered.
        </p>

        <H2>The press broke a monopoly on copying, not on authority</H2>

        <p>
          Before movable type in Europe, copying a book was skilled labour, and
          the institutions with the labour, the monasteries and universities,
          decided what got copied. Gutenberg’s Bible, finished in Mainz around
          1455, came out in about 180 copies, some on paper and some on vellum.
          Forty-nine survived into the twentieth century.
          <FootnoteLink id={1} /> A hundred and eighty is not a mass medium.
          What changed was the slope: once the type was set, the next copy cost
          paper and pressman’s time, and within two generations there were
          presses across the German-speaking world.
        </p>

        <p>
          That made Martin Luther possible as a phenomenon, not just as a
          theologian. Until 1518 most of his writing appeared in Latin, for
          other scholars. From 1518 the large majority appeared in German, for
          lay readers, in short works that printers reprinted again and again
          because they sold. Count editions, reprints included, and his lead
          over every other evangelical writer between 1518 and 1525 is
          overwhelming.
          <FootnoteLink id={2} /> Luther and his printers understood something a
          modern growth team would recognise at once: the unit is the pamphlet,
          not the book, and you win on frequency and reprints.
        </p>

        <p>
          The causal claim is where people overreach, and I want to be careful
          with it. “The printing press caused the Reformation” is too strong,
          and “the printing press caused the wars of religion” is much too
          strong. Those wars had dynastic, fiscal and territorial causes that no
          amount of pamphleteering explains. The defensible claim is narrower
          and still striking. Jared Rubin used a city’s distance from Mainz as
          an instrument for how early it got a press. He found that cities with
          at least one press by 1500 were at least 29 percentage points more
          likely to be Protestant by 1600.
          <FootnoteLink id={3} /> Print didn’t make people Protestant. It made
          the movement very hard to contain, because suppressing it now meant
          finding every press and every reprint, not burning one manuscript.
        </p>

        <p>
          And then the old powers rebuilt the gate. Rome published its Index of
          Prohibited Books in 1559 and a revised one in 1564. Catholic
          territories already had local lists before that. England took a more
          elegant route. In 1557 the Crown chartered the Stationers’ Company and
          gave it a monopoly over book production. Members registered titles,
          nobody else could print a registered title, and the Company could
          seize offending books. The state did not need to censor every press if
          it could license a cartel of printers to censor for it.
          <FootnoteLink id={4} /> That monopoly lapsed in 1695. The word
          copyright itself comes out of the Stationers’ register, the right to
          copy a title the guild had entered. Parliament’s Statute of Anne in
          1710 then moved that right from printers to authors. The thing that
          now protects writers started life as a censorship deal between a
          monarchy and a trade guild.
        </p>

        <H2>The telegraph was a single wire, and whoever owned the wire won</H2>

        <p>
          Samuel Morse sent “What hath God wrought” from Washington to Baltimore
          on 24 May 1844. For the first time, information moved faster than the
          thing it described. What followed was a scramble of rival lines and
          regional companies. Western Union itself was born in 1856 out of a
          merger of two of them. The scramble didn’t last.
        </p>

        <p>
          By 1864 Western Union was one of three serious national players. In
          1866 it absorbed the other two, the American Telegraph Company and the
          United States Telegraph Company, and came out with what historians
          call a virtual monopoly. The next year it had 2,600 offices and 85,000
          miles of wire carrying 5.9 million messages. By 1890 it had 19,400
          offices, 679,000 miles of wire and 56 million messages a year.
          <FootnoteLink id={5} /> Jay Gould took control of it through a merger
          in 1881.
        </p>

        <p>
          The engineering detail that explains this matters more than the
          financiers. A telegraph line carries one message at a time. It’s a
          channel, not a commons. Menahem Blondheim’s history of the wire
          services makes the point that the telegraph looked like a great
          equaliser, a way for any town paper to get news as fast as New York.
          It did the opposite. Whoever controlled the line controlled what
          passed over it and in what order.
          <FootnoteLink id={6} />
        </p>

        <p>
          So the news business consolidated around the wire. The New York
          Associated Press, which already dominated the European news coming
          into the port of New York, struck an alliance with Western Union after
          the Civil War. Blondheim describes it as symbiotic: the news cartel
          needed the wire, and the wire company needed the biggest customer in
          news. He calls the result a news monopoly. It was opaque enough that,
          in his account, the AP could cultivate a reputation for neutrality
          while its coverage of the disputed 1876 election leaned towards
          Rutherford B. Hayes.
          <FootnoteLink id={6} /> That is a Victorian story about platform
          neutrality, and it reads uncomfortably well today.
        </p>

        <p>
          The telephone repeated the pattern a generation later. Independent
          phone companies grew up to compete with Bell, and AT&amp;T’s answer
          was to buy them or leave them stranded off its long-distance network.
          In 1913, under antitrust pressure, the company made the Kingsbury
          Commitment: it sold its roughly $30 million stake in Western Union,
          let independents interconnect with its long-distance lines, and agreed
          to stop buying competitors without regulatory approval.
          <FootnoteLink id={7} /> Look at what that bought. AT&amp;T kept the
          monopoly and agreed to behave. By 1940 the Bell System effectively
          owned most American telephone service, from the calls to the handsets.
          A 1956 consent decree followed, then the 1974 antitrust suit, then the
          January 1982 settlement. On 1 January 1984 the Bell System was cut
          into seven regional operating companies. After the 1996
          Telecommunications Act loosened the rules, most of those pieces merged
          back together, and the bulk of the old Bell System now sits inside two
          companies, AT&amp;T and Verizon.
        </p>

        <H2>The Cycle, and what it gets wrong</H2>

        <p>
          Tim Wu gave this pattern a name in <em>The Master Switch</em>: the
          Cycle. A disruptive information technology arrives and breaks a
          settled order. It then centralises into a closed industry that limits
          competition and expression. That industry eventually falls, either to
          the next technology or to the government, and the cycle starts again.
          <FootnoteLink id={8} /> Wu’s question in 2010 was whether the internet
          would go the same way.
        </p>

        <p>I find the Cycle useful and also too tidy, for two reasons.</p>

        <p>
          First, the open phase is shorter than the story implies, and it is not
          the natural state of the technology. Luther’s German pamphlets took
          off in 1518, and Rome had a printed Index by 1559. The American
          telegraph took about twenty years to go from Morse’s demonstration to
          Western Union’s near-monopoly. Nothing about either technology wanted
          to be open. Both were open because the incumbents had not yet worked
          out where the bottleneck was.
        </p>

        <p>
          Second, the monopolies did not fall by themselves. The Stationers’
          monopoly ended when Parliament let the licensing regime lapse in 1695.
          The Bell System was broken up by a court decree. In each case the
          decentralising force was not the new technology alone but the new
          technology plus a state that chose to act. Treating the Cycle as
          something like weather, a thing that happens to markets, lets everyone
          off the hook. It is closer to a control problem: without active
          correction, the system drifts back to concentration, because that is
          where the economies of scale are.
        </p>

        <H2>The internet moved the bottleneck, it didn’t remove it</H2>

        <p>
          The internet was designed in deliberate opposition to the telegraph.
          The core idea of packet switching and end-to-end design is that the
          network is dumb: it moves packets and doesn’t care what is in them,
          and all the intelligence lives at the edges. No single wire to
          capture, no operator deciding what goes first. As an engineer I think
          that design is one of the great achievements of the twentieth century,
          and it did exactly what it promised at the transport layer. The pipes
          stayed largely neutral and commoditised.
        </p>

        <p>
          What the design could not do was stop concentration from moving up the
          stack. If the network won’t give you a chokepoint, you build one at
          the layer where scale compounds: the search index, the default
          setting, the app store, the social graph, the ad auction. These have
          the same property the telegraph line had. Everyone has to pass through
          them, and the owner sets the order.
        </p>

        <p>
          In August 2024, after a nine-week trial, a federal judge in Washington
          ruled that{" "}
          <q>
            Google is a monopolist, and it has acted as one to maintain its
            monopoly
          </q>
          . Google had for years handled about 90 percent of US search queries.
          The remedies, ordered in September 2025, ban Google from exclusive
          contracts for distributing Search, Chrome, Assistant and the Gemini
          app. They also require it to make some of its search index and
          user-interaction data available to rivals and to offer search and
          search-ad syndication.
          <FootnoteLink id={9} />
        </p>

        <p>
          Read those remedies next to the Kingsbury Commitment and the rhyme is
          almost exact. In 1913 the cure for a monopoly network was forced
          interconnection, letting rivals plug into the lines the incumbent had
          built. In 2025 the cure for a monopoly index was forced data sharing,
          letting rivals plug into the index the incumbent had built. More than
          a century apart, the state reached for the same tool, because the
          problem had the same shape. The scarce asset is no longer copper wire.
          It is the accumulated record of what billions of people searched for
          and clicked on. Data that took decades of being the default to collect
          can’t be replicated by a better algorithm and a clever start-up.
        </p>

        <H2>Cheap information was never the threat</H2>

        <p>
          So I think the hook gets the mechanism backwards. Cheap information is
          not what scares an incumbent. Incumbents adapt to cheap information
          all the time. The Stationers turned it into a licensing business,
          Western Union into a tariff, Google into an auction. What actually
          threatens them is a moment when nobody yet controls the new
          bottleneck. Those moments are short. The fight is over who gets to the
          bottleneck first and whether anyone stops them from sitting on it.
        </p>

        <p>
          The honest reading of the history is also less bleak than the cynical
          one. Each re-centralised regime was smaller than the one before, at
          least in what it could forbid. The Stationers could seize a book.
          Western Union could only slow a message or favour a customer. Google
          cannot stop you publishing anything at all. It can only make it hard
          to find. That is real progress, and it was paid for each time by
          people who insisted the gate be kept open after it had broken. The
          press, the wire and the network all spread power around for a while.
          Keeping it spread has always been a political job, not a technical
          one.
        </p>

        <p>
          The same lens works on older systems. A ledger is an information
          technology too, and the merchants who mastered it built empires out of
          who knew what and when. That is the subject of{" "}
          <InlineLink href="/thoughts/the-paper-route">
            The Paper Route
          </InlineLink>
          . And the guano trade, where a nation’s revenue hung on prices quoted
          in London, is in{" "}
          <InlineLink href="/thoughts/the-geopolitics-of-guano">
            The Geopolitics of Guano
          </InlineLink>
          . I’m also watching the same question surface in AI. Whoever ends up
          owning the default model, the one sitting between people and what they
          ask, is building the next switch. I would like us to notice that while
          the gate is still open, rather than after.
        </p>

        <Footnotes />
      </div>
    </FootnotesProvider>
  );
}
