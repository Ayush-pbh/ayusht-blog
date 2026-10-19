import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import BlockQuote from "@/components/BlockQuote";
import InlineLink from "@/components/InlineLink";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("bronze-age-supply-chain-collapse");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Cargo figures from Mark Cartwright,{" "}
        <InlineLink href="https://www.worldhistory.org/Uluburun_Shipwreck/">
          Uluburun Shipwreck
        </InlineLink>
        , World History Encyclopedia (2017), which summarises the excavation by
        the Institute of Nautical Archaeology under Cemal Pulak. Dates for the
        sinking vary between sources, from about 1330 to 1300 BCE.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Wayne Powell, Michael Frachetti, Cemal Pulak et al.,{" "}
        <InlineLink href="https://profiles.wustl.edu/en/publications/tin-from-uluburun-shipwreck-shows-small-scale-commodity-exchange-/">
          Tin from Uluburun shipwreck shows small-scale commodity exchange
          fueled continental tin supply across Late Bronze Age Eurasia
        </InlineLink>
        , <em>Science Advances</em> 8 (2022), eabq3766.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Daniel Berger, Kai Kaniuth, Gerhard Brügmann and Ernst Pernicka,{" "}
        <InlineLink href="https://www.frontiersin.org/journals/earth-science/articles/10.3389/feart.2023.1211478/full">
          Why Central Asia&apos;s Mushiston is not a source for the Late Bronze
          Age tin ingots from the Uluburun shipwreck
        </InlineLink>
        , <em>Frontiers in Earth Science</em> 11 (2023). They are careful to
        call their own reading not conclusive either.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        Amarna letter EA 35, from the king of Alashiya to the pharaoh; a summary
        and translation are at{" "}
        <InlineLink href="https://ancientegyptonline.co.uk/ea35/">
          Ancient Egypt Online
        </InlineLink>
        . The tablet is in the British Museum.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Sturt Manning et al., &ldquo;Severe multi-year drought coincident with
        Hittite collapse around 1198&ndash;1196 BC&rdquo;, <em>Nature</em>{" "}
        (2023); see the summary at{" "}
        <InlineLink href="https://phys.org/news/2023-02-climate-toppled-hittite-empire.html">
          Phys.org
        </InlineLink>
        . The authors frame the drought as coincident with the collapse, not as
        proof that it caused it.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Yoram Cohen and Eduardo Torrecilla,{" "}
        <InlineLink href="https://cris.tau.ac.il/en/publications/grain-tribute-in-hittite-syria-and-the-fall-of-ugarit/">
          Grain Tribute in Hittite Syria and the Fall of Ugarit
        </InlineLink>
        , <em>Bulletin of ASOR</em> 389 (2023), 65&ndash;73.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        <InlineLink href="https://archaeology.org/issues/july-august-2021/features/ugarit-bronze-age-archive/">
          The Ugarit Archives
        </InlineLink>
        , <em>Archaeology</em>, July/August 2021, on the House of Urtenu tablets
        and the letters from the city&apos;s last years.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        The letter is published in J. Nougayrol et al., <em>Ugaritica V</em>{" "}
        (1968), pp. 87&ndash;90. I am working from the translation quoted in
        Wikipedia&apos;s article on{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Ammurapi">
          Ammurapi
        </InlineLink>
        , not from the edition itself.
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        Joshua J. Mark,{" "}
        <InlineLink href="https://www.worldhistory.org/Sea_Peoples/">
          Sea Peoples
        </InlineLink>
        , World History Encyclopedia (2009), which also covers Merneptah&apos;s
        fight with Libyans and their Sea Peoples allies decades earlier.
      </>
    ),
  },
  {
    id: 10,
    content: (
      <>
        Eric H. Cline,{" "}
        <InlineLink href="https://press.princeton.edu/books/paperback/9780691208015/1177-bc">
          <em>1177 B.C.: The Year Civilization Collapsed</em>
        </InlineLink>
        , revised edition (Princeton University Press, 2021). The book is the
        backbone of everything in this piece that is not a primary text.
      </>
    ),
  },
  {
    id: 11,
    content: (
      <>
        ASML,{" "}
        <InlineLink href="https://www.asml.com/en/products/euv-lithography-systems">
          EUV lithography systems
        </InlineLink>
        ; capacity shares from TrendForce, as reported by Paul van Gerven,{" "}
        <InlineLink href="https://bits-chips.com/article/taiwan-continues-to-dominate-the-leading-edge">
          Taiwan continues to dominate the leading edge
        </InlineLink>
        , Bits&amp;Chips, December 2023. TrendForce expected the share to fall
        towards 60 per cent by 2027 as other regions build.
      </>
    ),
  },
];

export default function BronzeAgeSupplyChainCollapse() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          Some time around 1320 BCE a ship about fifteen metres long went down
          off Uluburun, on the south coast of what is now Turkey, carrying ten
          tonnes of copper and one tonne of tin. Ten to one is the recipe for
          bronze. The ship was not carrying metal so much as a bill of
          materials: enough raw input, already proportioned to spec, to keep a
          palace workshop busy for a very long time. It is the best snapshot we
          have of the network that ran the Late Bronze Age, and it went to the
          bottom more than a century before that network came apart.
        </p>

        <p>
          The title of this piece says supply chains ended civilisations. That
          is the popular version, and I think it is wrong in an interesting way.
          The people who have spent careers on this period do not believe a
          trade disruption brought down the Hittites, the Mycenaean palaces and
          Ugarit in one go. They believe something messier, and much closer to
          how real systems fail. The supply chain is in the story. It just is
          not the villain. It is the wiring.
        </p>

        <H2>A ship that was a parts list</H2>

        <p>
          The Uluburun wreck was excavated over eleven seasons from 1984, in
          more than 22,400 dives. What came up reads like the inventory of a
          whole economy. Roughly 348 copper ingots in the four-handled
          &ldquo;oxhide&rdquo; shape, about ten tonnes in all. Some 120 tin
          ingots, a tonne or so. Perhaps 175 ingots of coloured glass. Around
          150 Canaanite jars of terebinth resin. Ebony logs, an elephant tusk,
          hippopotamus teeth, Baltic amber, an Italian sword, Mycenaean pottery,
          Mesopotamian cylinder seals, and scales and weights suggesting several
          merchants on board.
          <FootnoteLink id={1} />
        </p>

        <p>
          The copper is the easy part. Lead isotope work puts most or all of it
          in Cyprus, the island the texts of the period call Alashiya. Cyprus
          was the Bronze Age equivalent of a large, reliable supplier with one
          dominant product. The tin is the hard part, and it is still being
          argued over.
        </p>

        <p>
          In 2022 a team led by Wayne Powell ran lead isotope, trace element and
          tin isotope analyses on the Uluburun tin and concluded that about a
          third of it came from ores in what are now Uzbekistan and Tajikistan,
          with the remaining two thirds from the Taurus Mountains in Turkey,
          scraped from stream deposits and leftovers of older mining.
          <FootnoteLink id={2} /> A year later Daniel Berger and colleagues
          published a rebuttal with a title that does not hedge: the Central
          Asian deposit at Mushiston, they argued, is chemically wrong for these
          ingots, and at least part of the cargo looks like it shares an origin
          with Bronze Age tin found in Israel and off the coast of Britain.
          South-west England, in their reading, is a very likely source.
          <FootnoteLink id={3} />
        </p>

        <p>
          So the honest answer to &ldquo;where did Bronze Age tin come
          from&rdquo; is: a long way away, from more than one place, and we are
          not sure which. Pick either paper and the conclusion for this argument
          is the same. The metal that defined the age had no source anywhere in
          the core of the system. Every palace from Mycenae to Thebes depended
          on an input that arrived from beyond the edge of its known world,
          through intermediaries it did not control. Powell&apos;s team goes
          further and argues the tin moved through many small regional
          communities rather than being run by great states at all. If they are
          right, the kings were downstream of a supply chain they could not even
          see.
        </p>

        <H2>Bronze is a dependency graph</H2>

        <p>
          Think of the Late Bronze Age Mediterranean as a handful of large
          services and a message bus. Egypt had grain and gold. The Hittites
          held central Anatolia and, through vassals, the coast of Syria. The
          Mycenaean palaces ran redistributive economies out of places like
          Pylos and Mycenae. Cyprus supplied copper. And ports like Ugarit, on
          the Syrian coast, were the routers: merchant houses, scribes who wrote
          in several scripts, ships for hire, and a king who was a Hittite
          vassal but traded with everyone.
        </p>

        <p>
          The interface between the big nodes was the royal letter. Kings called
          each other &ldquo;brother&rdquo;, exchanged gifts that were really
          trade agreements, and complained when deliveries were short. One of
          the Amarna letters, from a king of Alashiya to the pharaoh, is close
          to a vendor apology email. He has sent 500 talents of copper, and he
          is sorry it is so little: the hand of the god Nergal has killed the
          men of his country, and there is not a single copper worker left. He
          would like silver in return, and payment for the timber Egypt has been
          receiving, and while he is at it, a specialist in eagle omens.
          <FootnoteLink id={4} />
        </p>

        <p>
          That letter is a century and a half before the collapse, and nothing
          collapsed because of it. A plague hits the supplier, the shipment
          comes in light, the customer grumbles, the relationship continues. The
          system had shocks all the time, and it absorbed them. That is worth
          holding onto, because the popular story assumes the network was
          brittle by nature. It was not. It survived decades of local disasters.
          What it could not survive was a particular kind of disaster: many at
          once, correlated, landing on nodes that had already spent their slack.
        </p>

        <H2>The slow version of a fast collapse</H2>

        <p>
          The hook for this article says the collapse happened in a single
          generation. It did not, quite. The destructions and abandonments are
          spread across several decades on either side of 1200 BCE, and the
          trouble starts earlier still: the Egyptian king Merneptah was already
          fighting Libyans with Sea Peoples among their allies decades before
          the famous battles. What is true is that the end, once it came, was
          fast at each site and permanent across the system.
        </p>

        <p>
          Start with the weather. Tree rings from juniper timbers at Gordion, in
          central Anatolia, record three consecutive years of severe drought
          around 1198 to 1196 BCE, give or take a few years.
          <FootnoteLink id={5} /> The Hittite heartland was landlocked and
          semi-arid, and it ran on grain. A drought there is not a bad harvest,
          it is an existential event for a state whose army and bureaucracy eat
          what the plateau grows.
        </p>

        <p>
          Then follow the grain. In letters from Hittite officials found in a
          merchant&apos;s house at Ugarit, the empire leans on its vassal for
          grain shipments. Yoram Cohen and Eduardo Torrecilla, reading those
          letters in 2023, argue that Hittite demands probably made
          Ugarit&apos;s own food shortage worse shortly before the city fell.
          <FootnoteLink id={6} /> Ugarit&apos;s last king, Ammurapi, wrote to
          the Egyptian pharaoh that there was a severe hunger in the land.
          <FootnoteLink id={7} /> This is the part that should make any engineer
          sit up. The empire&apos;s answer to stress at the centre was to pull
          resources from the edge, which is exactly what you do when you have no
          reserve, and exactly how you turn one failing node into two.
        </p>

        <p>
          Then the ships. In a letter to the king of Alashiya, Ammurapi
          describes enemy ships burning his towns, and explains why he could do
          nothing about it: his troops and chariots were in the land of Hatti,
          and his ships were in Lukka, on the south-west Anatolian coast. Seven
          enemy ships, he says, did great damage.
          <FootnoteLink id={8} /> Another letter from the archive, probably
          never sent, reports invaders landing a few miles from the city and
          begs the Hittite viceroy at Carchemish for forces and chariots.
          <FootnoteLink id={7} />
        </p>

        <p>
          Read that again as an incident report. The city&apos;s defensive
          capacity had been allocated elsewhere, to serve the larger system. Its
          food was being drawn down by the same system. The attack, when it
          came, was small. Seven ships. A healthy Ugarit with its own fleet at
          home shrugs that off. This Ugarit could not, and nobody resettled the
          site at any scale for centuries.
        </p>

        <p>
          And then Egypt, around 1177 BCE in Eric Cline&apos;s dating, the
          eighth year of Ramesses III, who carved his victory over a coalition
          of Sea Peoples onto the walls of his temple at Medinet Habu. His
          inscription says no land could resist their arms, and names Hatti,
          Carchemish, Arzawa and Alashiya among the fallen.
          <FootnoteLink id={9} /> It is a great line, and it is royal
          propaganda, and it has done a lot of damage to how this period gets
          told. It makes the Sea Peoples the cause. The better reading is that
          they were at least as much a symptom: displaced people on the move
          through a region where states were already failing, finishing off what
          drought, hunger and overextension had started.
        </p>

        <H2>The title is wrong, the hook is half right</H2>

        <p>
          Cline&apos;s book <em>1177 B.C.</em> is the standard modern account,
          and its argument is a systems argument. No single cause is enough.
          Drought, famine, earthquakes, invasion, internal revolt and disrupted
          trade routes all show up in the evidence, and the interdependence of
          the kingdoms is what made the collapse faster and deeper than any one
          of them would have been.
          <FootnoteLink id={10} /> That is not the same claim as &ldquo;a supply
          chain failure ended civilisation&rdquo;, and the difference matters.
        </p>

        <p>
          In the popular version, trade is the cause: the tin stopped, so the
          bronze stopped, so the armies and palaces stopped. There is an old,
          still-argued idea in this family, that tin shortages pushed smiths
          towards iron, and it may hold some truth about what came afterwards.
          But I find no good evidence that a trade interruption started the
          collapse. The evidence points the other way. Trade was the
          transmission mechanism. It is what took a drought in Anatolia and made
          it a famine at Ugarit; what took raiders on the coast and made them a
          crisis for Cyprus; what made every kingdom&apos;s bad decade everyone
          else&apos;s bad decade.
        </p>

        <p>
          Anyone who has run production systems knows this failure mode. It is
          not the single dependency going down. Systems are built to survive
          that, and the Bronze Age one did, repeatedly, as the Alashiya letter
          shows. It is the correlated failure: shocks that would each be
          survivable, arriving together, through a topology where the nodes have
          already lent out their spare capacity. Retries, in this analogy, are
          the Hittite grain demands. Each one is rational for the caller and
          ruinous for the callee.
        </p>

        <p>
          The part of the hook that is fully right is the ending. The
          palace-based world did not degrade, it went dark. In Greece the Linear
          B script, the bookkeeping system of the palaces, fell out of use with
          them. At Ugarit, as Cline put it to <em>Archaeology</em>:
        </p>

        <BlockQuote author="Eric Cline" source="Archaeology, 2021">
          <p>Writing stops, everything stops, and no one comes back.</p>
        </BlockQuote>

        <p>
          That is what interconnection buys you on the way down. A loosely
          coupled world loses a city. A tightly coupled one loses the
          institutions that knew how to rebuild it: the scribes, the merchant
          houses, the shipping relationships, the letters between brothers. The
          recovery takes centuries because the thing that failed was not a
          supplier. It was the protocol.
        </p>

        <H2>Tin, again</H2>

        <p>
          The obvious modern parallel is semiconductors, and it is good enough
          that I want to be careful with it.
        </p>

        <p>
          The shape matches. The most advanced chips depend on extreme
          ultraviolet lithography, a technology ASML describes as unique to
          itself. The light in those machines is made by hitting tiny drops of
          molten tin with a laser, tens of thousands of times a second, which is
          a detail I cannot stop enjoying. And the fabs that use them are
          concentrated: TrendForce put Taiwan at about 68 per cent of global
          capacity at 16 nanometres and below in 2023, and about 80 per cent of
          the processes that use EUV.
          <FootnoteLink id={11} /> A critical input from a single specialised
          source, a manufacturing base concentrated in one exposed place, and
          every large power downstream of both. Mycenae would recognise it.
        </p>

        <p>
          Where the parallel breaks is where most people take it. The lesson of
          1177 is not &ldquo;cut the tin and civilisation falls&rdquo;. The
          Bronze Age system lost cargoes, suppliers and cities for centuries and
          kept running. The lesson is about correlation. The scenario worth
          worrying about is not a single fab outage, which the industry routes
          around badly but survives. It is a fab outage in the same year as a
          shipping crisis, a regional war and a bad harvest somewhere that
          matters, landing on governments and companies that ran their
          inventories to zero because slack looked like waste on a spreadsheet.
          The Bronze Age kings also thought their troops were better used in
          Hatti.
        </p>

        <p>
          There is a version of the semiconductor argument that treats
          diversification as the whole answer, and I think it misses the Ugarit
          lesson. Ugarit was not short of partners. It traded with everyone.
          What it lacked was reserve: ships at home, grain in store, a garrison
          that answered to it. Redundancy across suppliers is one thing. Slack
          inside each node is another, and it is the one that gets optimised
          away first, because in normal years it does nothing at all.
        </p>

        <p>
          The Uluburun ship is the right place to end, because it disproves the
          dramatic version of this story. A tonne of tin and ten of copper, the
          strategic metal of the age, lost in one afternoon on the rocks.
          Presumably some palace went without its bronze that year. And the
          system carried on for another hundred years, until the year when
          everything went wrong at once.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
