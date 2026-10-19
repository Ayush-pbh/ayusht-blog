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

const post = getPostBySlug("the-geopolitics-of-guano");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Millard Fillmore, First Annual Message, 2 December 1850,{" "}
        <InlineLink href="https://www.presidency.ucsb.edu/documents/first-annual-message-7">
          The American Presidency Project
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Matthew Wills,{" "}
        <InlineLink href="https://daily.jstor.org/golden-age-of-guano/">
          “Are We Entering a New Golden Age of Guano?”
        </InlineLink>
        , JSTOR Daily, 2016. It draws on Weymouth T. Jordan on the American
        “guano gospel”, Catalina Vizcarra on Peru as a debtor state, and
        Christina Duffy Burnett on the Guano Islands Act. Gregory Cushman’s{" "}
        <em>Guano and the Opening of the Pacific World</em> (Cambridge, 2013) is
        the full-length treatment.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        On the dates and on Spain’s motives, the{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Chincha_Islands_War">
          Chincha Islands War
        </InlineLink>{" "}
        summary is a reasonable starting point. It also gives the much-repeated
        estimate that the islands supplied almost 60 percent of Peru’s
        government revenue. Treat that figure as an order of magnitude, not as
        an audit.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        48 U.S.C. § 1411, from the act of 18 August 1856,{" "}
        <InlineLink href="https://www.law.cornell.edu/uscode/text/48/1411">
          Cornell Legal Information Institute
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        <em>Jones v. United States</em>, 137 U.S. 202 (1890),{" "}
        <InlineLink href="https://www.law.cornell.edu/supremecourt/text/137/202">
          full opinion
        </InlineLink>
        . The facts about the island’s population and the date of the killing
        come from the evidence recited in the opinion.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        The causes, the dates and the Gibbs capital are summarised, with
        references to the historiography, in{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/War_of_the_Pacific">
          War of the Pacific
        </InlineLink>
        . Historians still argue over how much weight Chilean economic crisis
        and elite interests should carry.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        William Crookes,{" "}
        <InlineLink href="https://archive.org/details/cu31924013911908">
          <em>The Wheat Problem</em>
        </InlineLink>
        , the presidential address to the British Association at Bristol, 7
        September 1898, reprinted in a later revised edition.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        Vaclav Smil,{" "}
        <InlineLink href="https://home.cc.umanitoba.ca/~vsmil/pdf_pubs/nature7.pdf">
          “Detonator of the population explosion”
        </InlineLink>
        , <em>Nature</em> 400, 415 (1999). The Nobel Foundation’s entries for{" "}
        <InlineLink href="https://www.nobelprize.org/prizes/chemistry/1918/haber/facts/">
          Haber (1918)
        </InlineLink>{" "}
        and{" "}
        <InlineLink href="https://www.nobelprize.org/prizes/chemistry/1931/bosch/facts/">
          Bosch (1931)
        </InlineLink>{" "}
        give the prize details.
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        <InlineLink href="https://www.sciencehistory.org/education/scientific-biographies/fritz-haber/">
          Fritz Haber
        </InlineLink>
        , Science History Institute.
      </>
    ),
  },
];

export default function GeopoliticsOfGuano() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          For about thirty years in the middle of the nineteenth century, one of
          the most strategically important places on earth was three small
          islands off the coast of Peru. They are rainless and treeless, and
          they were buried under mounds of bird droppings as much as 150 feet
          high. Governments wrote that stuff into presidential addresses. Navies
          sailed to take it. The United States passed a law that let any citizen
          annex a rock on its behalf if the rock was covered in it.
        </p>

        <p>
          The usual way to tell this story is as a comedy: the world went to war
          over poop. That framing gets two things wrong. It undersells how
          serious the problem underneath was. And it oversells the wars, which
          were mostly about other things, with guano as the reason they were
          worth fighting. What the guano age actually shows is what happens when
          an entire civilisation’s food supply hangs on a single non-renewable
          deposit in someone else’s territory. That situation ended in a lab in
          Karlsruhe rather than on a battlefield, and I think it is the more
          interesting ending.
        </p>

        <H2>A nitrogen problem pretending to be a farming fad</H2>

        <p>
          Crops need nitrogen in a form they can use, and there is never enough
          of it. The air is almost four-fifths nitrogen, but it is locked in a
          triple bond that plants cannot break, so for all of agricultural
          history the supply came from slow biology: legumes, manure, rotation,
          letting a field rest. Every farm was capped by its own nitrogen
          budget.
        </p>

        <p>
          Peruvian guano broke the cap. The coast is so arid that nothing washes
          the nitrogen out of the droppings. Tens of millions of cormorants,
          boobies and pelicans living off the small fish of that coast had been
          piling it up for centuries. People in the Andes had known what it was
          worth for a very long time: the word comes from the Quechua{" "}
          <em>wanu</em>, and the Inca are said to have made killing the birds a
          capital crime. Europe and North America caught on in the 1840s, and
          the response was less a market than a mania. American growers in the
          South talked about a “guano gospel”.
          <FootnoteLink id={2} />
        </p>

        <p>
          By December 1850 it had reached the State of the Union. Millard
          Fillmore told Congress that Peruvian guano had become{" "}
          <q>
            so desirable an article to the agricultural interest of the United
            States
          </q>{" "}
          that the government had a duty to get it imported at a reasonable
          price.
          <FootnoteLink id={1} /> That is a head of state telling his
          legislature that the price of a fertiliser is a national-interest
          problem. Swap the noun and the sentence could be about oil in 1973 or
          rare earths today.
        </p>

        <p>
          From a systems point of view, guano had every property of a dangerous
          dependency. It was concentrated, with the best deposits on a handful
          of islands. It was finite: birds lay it down over centuries and ships
          carried it off in a few decades. And it was controlled by one seller
          who ran it as a state monopoly.
        </p>

        <H2>The state that ran on a stockpile</H2>

        <p>
          Peru used the guano as collateral for a state. The government owned
          the deposits, sold the product through foreign merchant houses, and
          borrowed in London against the future revenue, so heavily that
          London’s banks ended up effectively controlling the trade. The
          economist Catalina Vizcarra has described Peru as an oddly reliable
          debtor: it kept pledging guano income to foreign creditors while it
          went through fourteen changes of government between 1850 and 1875.
          <FootnoteLink id={2} /> Governments came and went, and the debt
          service kept running, because the guano was the one thing in the
          country that worked.
        </p>

        <p>
          Revenue that comes out of the ground instead of out of a taxed
          population has a familiar shape. It frees the state from needing the
          consent of its citizens, it invites borrowing against the next decade,
          and it goes to pieces when the deposit runs out. All three happened.
          Exports fell from about 575,000 tons in 1869 to under 350,000 tons by
          1873, and the Chincha deposits were essentially gone by 1874.
        </p>

        <p>
          I don’t want to tell the next part as a fun fact, because it is the
          part the comedy version leaves out. Somebody had to dig, by hand,
          through ancient mounds of ammonia-reeking dung under a desert sun. The
          work fell largely to Chinese indentured labourers, the “coolies” of
          the period’s own vocabulary, some of them kidnapped and others
          recruited with stories that they were going to California. Many killed
          themselves rather than go on.
          <FootnoteLink id={2} /> In the 1860s, ships from Peru raided
          Polynesian islands for labour, and some small islands lost a large
          share of their people. You will find precise death tolls for the
          Chincha workforce quoted all over the internet. The ones I could trace
          lead back to a single nineteenth-century encyclopaedia entry, so I am
          not repeating them. The conditions are documented well enough without
          a number I can’t stand behind.
        </p>

        <p>
          An editorial irony was noticed even at the time: American Southern
          papers publicised the slave-like conditions on the Chinchas while
          running no such reports about slavery at home.
          <FootnoteLink id={2} /> People find it easy to see coercion in a
          supply chain when it isn’t their own.
        </p>

        <H2>Which wars were actually about guano</H2>

        <p>So did guano spark wars? Partly, and the details matter.</p>

        <p>
          <strong>The Chincha Islands War (1864–1866)</strong> is the one with
          guano in its name, and even that one did not start over guano. It
          started over a brawl. On 4 August 1863, a fight at the Talambo
          hacienda in northern Peru left a Spaniard dead. Spain, under a
          government keen to recover some imperial standing, rolled that
          together with unpaid debts from the independence era and demanded
          satisfaction. On 14 April 1864 a Spanish squadron seized the Chincha
          Islands.
          <FootnoteLink id={3} />
        </p>

        <p>
          Look at the choice of target. Spain did not invade Lima. It took the
          one asset that, by the common estimate, produced something like 60
          percent of the Peruvian state’s revenue. That isn’t a war for guano.
          It is a war fought <em>with</em> guano, the islands held hostage the
          way you would seize a debtor’s bank account instead of his house. It
          worked, briefly. Peru’s president signed the Vivanco–Pareja treaty in
          January 1865, the Peruvian Congress refused to ratify it, and he was
          overthrown. The conflict then spread. Chile declared war on Spain in
          September 1865, and Spanish ships bombarded Valparaíso on 31 March
          1866 and fought the batteries at Callao on 2 May. Both sides claimed
          Callao as a victory, and the final peace treaties were not signed
          until 1879 to 1885. Guano was the leverage, and pride and old debts
          were the cause.
        </p>

        <p>
          <strong>The War of the Pacific (1879–1884)</strong> is the bigger and
          bloodier one, and that war was about nitrates, the mineral successor
          to guano. The Atacama desert, on the borders of Peru, Bolivia and
          Chile, is full of caliche, an ore rich in sodium nitrate, which is
          useful both as fertiliser and as an ingredient of explosives. The
          trigger was a tax. An 1874 treaty set the border and promised Chilean
          companies in Bolivian territory 25 years without new taxes. Bolivia
          then imposed a ten-centavo tax on the Chilean-owned nitrate company at
          Antofagasta, and in the dispute that followed it seized the company’s
          property and set it for auction. Chile occupied Antofagasta on 14
          February 1879, the day of the auction. Peru was tied to Bolivia by a
          secret alliance from 1873, and it was drawn in.
          <FootnoteLink id={6} />
        </p>

        <p>
          This is where the threads join, and it is the strongest version of the
          headline’s claim. Peru was in the nitrate business in the first place{" "}
          <em>because</em> its guano revenue was collapsing. To replace it, Lima
          created a nitrate sales monopoly and, in 1875, expropriated the
          nitrate works in its own province of Tarapacá. Guano’s decline pushed
          the Peruvian state into nitrates, and that put it on a collision
          course with Chilean companies backed by British money. The London
          house of Antony Gibbs &amp; Sons had supplied roughly a third of the
          capital of the Chilean nitrate firm that preceded the Antofagasta
          company, and it also held shares in Peruvian nitrate works. The City
          had money on both sides. Chile won comprehensively. Lima was occupied
          in January 1881. The Treaty of Ancón (20 October 1883) gave Chile
          Tarapacá, and the 1884 truce cost Bolivia its coastline, which it has
          never got back.
        </p>

        <p>
          So the honest tally is one war that used guano as a hostage and one
          war over the commodity that replaced it, started in part by guano’s
          exhaustion. Neither was simply fought over bird droppings, and both
          make sense only once you see that for half a century the Pacific coast
          of South America was where the industrial world bought its nitrogen.
        </p>

        <H2>Annexation by paperwork</H2>

        <p>
          The United States answered the Peruvian monopoly with one of the
          strangest statutes in its code. The Guano Islands Act of 1856, which
          William Seward introduced in the Senate, says that when a citizen
          finds guano on an island{" "}
          <q>not within the lawful jurisdiction of any other government</q> and
          takes peaceable possession, the island may, at the President’s
          discretion, <q>be considered as appertaining to the United States</q>.
          <FootnoteLink id={4} />
        </p>

        <p>
          “Appertaining” is doing heroic work in that sentence. It is not
          annexation, it is not statehood, and it doesn’t even quite make the
          island a territory. More than seventy islands were eventually claimed
          under the Act, and the State Department itself concluded in 1932 that
          no one knew what the Act really meant.
          <FootnoteLink id={2} /> It was imperial expansion as a software
          licence: the company gets the rights, the sovereign keeps deniability,
          and the terms are vague enough to mean whatever Washington needs them
          to mean later.
        </p>

        <p>
          The vagueness was tested on Navassa, a Caribbean island off Haiti that
          Haiti also claimed. On 14 September 1889 the island was worked by the
          Navassa Phosphate Company, and the evidence recited by the Supreme
          Court counts 137 Black labourers working under company officers. The
          workers rose against their overseers, and five of the overseers were
          killed. A labourer named Henry Jones was tried in the federal court in
          Maryland for one of the killings and appealed on the obvious ground:
          what right did a US court have over an island that the US had never
          properly annexed?
          <FootnoteLink id={5} />
        </p>

        <p>
          The Court refused to look. Who is sovereign over a territory, Justice
          Gray wrote, is <q>not a judicial, but a political, question</q>, and
          the executive’s determination binds the judges. The President said
          Navassa appertained, so it did. Three workers were condemned to death,
          and President Harrison commuted the sentences after public criticism
          of conditions on the island.
          <FootnoteLink id={2} /> The legal manoeuvre outlived the fertiliser
          trade by a long way. Christina Duffy Burnett’s reading is that it
          helped set the stage for how the United States took and governed the
          Philippines, Puerto Rico and Guam a decade later.
        </p>

        <H2>The chemist steps in</H2>

        <p>
          By the 1890s the anxious people had moved on from guano to the Chilean
          nitrate beds, and done the arithmetic. On 7 September 1898, William
          Crookes used his presidential address to the British Association in
          Bristol to warn that the wheat-eating world was heading for a nitrogen
          famine. Guano, he said, was so near exhaustion it could be dismissed
          from consideration, and cautious local estimates gave the Chilean
          nitrate fields twenty to thirty years at the then export rate of over
          a million tons a year. His way out was not a navy. He predicted that{" "}
          <q>the chemist will step in and postpone the day of famine</q>.
          <FootnoteLink id={7} />
        </p>

        <p>
          He was right, and quickly. In July 1909 Fritz Haber demonstrated a
          bench apparatus at Karlsruhe that combined nitrogen from the air with
          hydrogen over a catalyst at high pressure and dripped out liquid
          ammonia for about five hours straight. Scaling that up was another
          matter. BASF’s head of research was horrified at the idea of running a
          plant at a hundred atmospheres, having just watched an autoclave at
          seven blow apart. Carl Bosch, who was running the company’s nitrogen
          work, answered with a line I love for its engineer’s confidence: he
          knew exactly what the steel industry could do, and{" "}
          <q>It should be risked.</q> Commercial ammonia production began on 9
          September 1913, four years and two months after the lab demonstration.
          <FootnoteLink id={8} />
        </p>

        <p>
          Then came the dark joke. Within a year the process was strategic in
          exactly the sense guano had been. When the war began, the British
          blockade cut Germany off from Chilean nitrate, and synthetic ammonia
          is generally credited with keeping Germany supplied with both
          fertiliser and munitions.
          <FootnoteLink id={9} /> Haber himself went on to run the German gas
          programme and oversaw the first chlorine attack at Ypres in 1915. He
          received the 1918 Nobel Prize in Chemistry for the synthesis of
          ammonia from its elements, and Bosch shared the 1931 prize for
          high-pressure methods.
        </p>

        <p>
          The geopolitical consequence is the part I find most clarifying. Once
          nitrogen could be made from air plus energy, there was nothing left to
          seize. You cannot hold a hostage that every industrial country can
          manufacture at home. The Chilean nitrate fields, which Chile had
          fought a war to win, were now competing with a factory that could be
          built anywhere there was coal, steel and engineers. Vaclav Smil’s
          estimate is the one usually quoted for what was at stake: without
          Haber–Bosch,{" "}
          <q>almost two-fifths of the world’s population would not be here</q>
          .<FootnoteLink id={8} />
        </p>

        <H2>Dependencies end in labs, not on islands</H2>

        <p>
          The lesson I draw is not that commodities cause wars. Plenty of wars
          happen without commodities, and the guano wars needed Spanish pride
          and a Bolivian tax bill to get going. The lesson is narrower and more
          useful: a strategic dependency on a concentrated natural deposit is a
          temporary condition, and what ends it is almost always substitution
          rather than conquest. Spain held the Chinchas for months and got
          nothing lasting. Chile won the nitrate war outright and saw the prize
          made obsolete by a high-pressure reactor in the Rhineland. The
          countries that actually escaped the nitrogen bottleneck did it with
          catalysts, not cruisers.
        </p>

        <p>
          Substitution has its own costs, and they are worth naming. Haber–Bosch
          swapped a geographic chokepoint for an energy one: most of the
          hydrogen now comes from natural gas, so the world’s food supply is now
          tied to gas prices instead of bird colonies. That is a better problem
          to have, and still a problem. And the people who paid for the old
          system, Chinese labourers on the Chinchas and the workers on Navassa,
          got nothing back when it ended. Their labour simply stopped being
          needed.
        </p>

        <p>
          Guano also belongs to a wider pattern on this site. The commodity was
          only half the machinery. The other half was paper: merchant contracts,
          London bond issues, a revenue stream pledged across fourteen
          governments, and an island annexed by one ambiguous participle. If you
          want the older history of how ledgers and credit let merchants move
          value across distance, that is{" "}
          <InlineLink href="/thoughts/the-paper-route">
            The Paper Route
          </InlineLink>
          . And if you want what happens to whoever controls the wires the
          prices travel over, that is{" "}
          <InlineLink href="/thoughts/information-monopoly">
            Information Monopoly
          </InlineLink>
          . The birds are still out there, though not many of them. Peru went on
          mining guano for its own farms in the twentieth century, the fish the
          birds eat have thinned out too, and an estimated 60 million seabirds
          have become about 4 million. The deposit that frightened presidents
          now amounts to something like 12,000 tons a year.
        </p>

        <Footnotes />
      </div>
    </FootnotesProvider>
  );
}
