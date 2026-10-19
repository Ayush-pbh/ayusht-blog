import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import { BlockMath, InlineMath } from "@/components/Math";
import InlineLink from "@/components/InlineLink";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("megaprojects-of-antiquity");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        On the find and the contents of the diary,{" "}
        <InlineLink href="https://www.nationalgeographic.com/premium/article/red-sea-scrolls-pyramids-egypt">
          National Geographic&apos;s account of the Red Sea scrolls
        </InlineLink>
        ; the full story is in Pierre Tallet and Mark Lehner,{" "}
        <em>The Red Sea Scrolls</em> (Thames &amp; Hudson, 2021).
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Hader Sheisha et al.,{" "}
        <InlineLink href="https://cris.haifa.ac.il/en/publications/nile-waterscapes-facilitated-the-construction-of-the-giza-pyramid/">
          Nile waterscapes facilitated the construction of the Giza pyramids
          during the 3rd millennium BCE
        </InlineLink>
        , <em>PNAS</em> 119 (2022), e2202530119.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        A. Fall, B. Weber, M. Pakpour, N. Lenoir, N. Shahidzadeh, J. Fiscina, C.
        Wagner and D. Bonn, &ldquo;Sliding Friction on Wet and Dry Sand&rdquo;,{" "}
        <em>Physical Review Letters</em> 112, 175502 (2014); summaries from{" "}
        <InlineLink href="https://physics.aps.org/articles/v7/s51">
          APS Physics
        </InlineLink>{" "}
        and the{" "}
        <InlineLink href="https://iop.uva.nl/content/news/2014/00/prl-egyptian-pyramids.html">
          University of Amsterdam
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        On Heit el-Ghurab, see AERA&apos;s page on{" "}
        <InlineLink href="https://aeraweb.org/about/our-team/mark-lehner/">
          Mark Lehner
        </InlineLink>
        ; on the barracks, the workers&apos; cemetery and the gang names, Eric
        Betz,{" "}
        <InlineLink href="https://www.discovermagazine.com/who-built-the-egyptian-pyramids-not-slaves-42207">
          Who Built the Egyptian Pyramids? Not Slaves
        </InlineLink>
        , <em>Discover</em> (2021).
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Figures from the site&apos;s own{" "}
        <InlineLink href="https://www.pontdugard.fr/en/history">
          history page
        </InlineLink>
        . The 2.5 cm across the bridge is from M. J. T. Lewis,{" "}
        <em>Surveying Instruments of Greece and Rome</em> (Cambridge, 2001), p.
        187, as cited in Wikipedia&apos;s{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Pont_du_Gard">
          Pont du Gard
        </InlineLink>{" "}
        article, which also gives A. Trevor Hodge&apos;s figures for how
        unevenly the gradient varies along the route.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Vitruvius, <em>De Architectura</em> 8.5&ndash;8.6, in the{" "}
        <InlineLink href="https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Vitruvius/8*.html">
          LacusCurtius translation
        </InlineLink>
        . The text does not repeat the unit after &ldquo;one hundred&rdquo;, and
        the mismatch with real aqueducts has puzzled scholars for a long time.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Etsuo Uchida and Ichita Shimoda, &ldquo;Quarries and transportation
        routes of Angkor monument sandstone blocks&rdquo;,{" "}
        <em>Journal of Archaeological Science</em> (2012); reported by{" "}
        <InlineLink href="https://www.nbcnews.com/id/wbna49642111">
          Live Science via NBC News
        </InlineLink>{" "}
        and{" "}
        <InlineLink href="https://southeastasianarchaeology.com/2012/10/23/canal-highway-for-construction-material-found-in-angkor">
          Southeast Asian Archaeology
        </InlineLink>
        , which give slightly different route lengths.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        Damian Evans et al.,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC1964867">
          A comprehensive archaeological map of the world&apos;s largest
          preindustrial settlement complex at Angkor, Cambodia
        </InlineLink>
        , <em>PNAS</em> 104 (2007), 14277&ndash;14282.
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        Bent Flyvbjerg,{" "}
        <InlineLink href="https://arxiv.org/abs/1409.0003">
          What You Should Know About Megaprojects, and Why: An Overview
        </InlineLink>{" "}
        (2014), published in the <em>Project Management Journal</em>.
      </>
    ),
  },
];

export default function MegaprojectsOfAntiquity() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          The oldest inscribed papyri ever found are not hymns or king lists.
          They are a logbook. In 2013, at Wadi al-Jarf on Egypt&apos;s Red Sea
          coast, a team led by Pierre Tallet pulled out the records of a
          mid-level inspector called Merer, who spent months of Khufu&apos;s
          reign moving limestone by boat from the quarries at Tura to the
          building site at Giza. If you want to know how the Great Pyramid got
          built, the most important primary source we have is, more or less, a
          shift report.
        </p>

        <p>
          That fact should embarrass a whole genre. The pitch for this article
          is that we would still struggle to repeat what the ancients did
          without heavy machinery, and the usual way that pitch gets cashed out
          is mystery: lost techniques, impossible precision, secrets in the
          stone. I think both halves are wrong. A modern contractor with cranes
          and trucks could do it, and what made it hard in the first place was
          not technology anyone has lost. It was food, water, boats, scheduling
          and the patience to survey a line to the centimetre. The monuments are
          what logistics looks like when it is allowed to run for decades.
        </p>

        <H2>A middle manager&apos;s diary</H2>

        <p>
          Merer&apos;s entries are short and repetitive, which is exactly what
          makes them valuable. One of them covers a three-day run: load at Tura,
          overnight at a stop called She-Khufu, arrive at Akhet-Khufu, the name
          for the pyramid site, then back to Tura for the next load. He reports
          to Ankhhaf, Khufu&apos;s half-brother, who carried the title of head
          of all the king&apos;s works. The diary names artificial basins at
          Giza, a Lake of Khufu among them, flooded in the high-water season so
          that boats could come right up to the construction zone. Another set
          of papyri from the same cache records six months spent shipping
          workers, food and copper across the Red Sea.
          <FootnoteLink id={1} />
        </p>

        <p>
          Read that as an operations document and it is startlingly familiar.
          There is a recurring route, a fixed cadence, a named waypoint, a
          reporting line that goes up to the person accountable for the whole
          programme, and a separate supply operation bringing in the copper the
          stonecutters wore down. Wadi al-Jarf itself was a harbour built for
          the Sinai copper runs: a stone jetty, anchors by the hundred, storage
          galleries cut into the hill. Nothing here is mysterious. It is a
          supply chain with a monument at the end of it.
        </p>

        <H2>The river did the lifting</H2>

        <p>
          The single biggest piece of technology at Giza was the Nile. The
          limestone for the casing came from across the river, the granite from
          Aswan far to the south, and both moved by water for the long legs. In
          2022 Hader Sheisha and colleagues used pollen preserved in sediment
          cores to reconstruct eight thousand years of water levels on the Giza
          floodplain. They found that during the reigns of Khufu, Khafre and
          Menkaure, a now-vanished arm of the river they call the Khufu branch
          still stood at roughly 40 per cent of its Holocene maximum, high
          enough to bring boats to the harbour complex below the plateau.
          <FootnoteLink id={2} /> The pyramids sit where they sit partly because
          that is where the barges could reach.
        </p>

        <p>
          For the last few hundred metres, where boats could not go, you drag.
          Here the best-known modern result is a nice piece of physics. In 2014
          Daniel Bonn&apos;s group in Amsterdam put a model sledge on a tray of
          sand and measured the pulling force as they added water. Dry sand
          heaps up in front of the runners. A little water forms capillary
          bridges between the grains, roughly doubles the sand&apos;s stiffness,
          and stops the heap forming; at the right moisture the force needed
          drops by about half. Add too much and the bridges merge and the effect
          goes away.
          <FootnoteLink id={3} />
        </p>

        <p>
          Sliding friction is close enough to linear that the crew size scales
          with it:
        </p>

        <BlockMath math="F = \mu\, m g \quad\Rightarrow\quad \text{haulers} \propto \mu" />

        <p>
          Halve <InlineMath math="\mu" /> and you halve the number of people on
          the rope, which means halving the bread, beer and housing for that
          part of the job. That is the real payoff, and it is a logistics
          payoff, not a mechanical one.
        </p>

        <p>
          Two cautions, because this result gets oversold. The painting that
          inspired it, in the tomb of Djehutihotep, shows a man pouring water in
          front of a sledge carrying a colossal statue, and it dates to the
          Middle Kingdom, centuries after Khufu. It is good evidence that
          Egyptians knew the trick. It is not a photograph of the Great Pyramid
          under construction. And the experiment was a lab model, so the
          &ldquo;half the workers&rdquo; figure is an upper bound on a
          favourable surface, not a measured fact about Giza.
        </p>

        <H2>Who was on the rope</H2>

        <p>
          The most durable myth about the pyramids is that slaves built them. It
          goes back to Herodotus, writing roughly two thousand years after the
          fact, and Hollywood did the rest. The archaeology does not support it.
        </p>

        <p>
          South of the Sphinx, Mark Lehner&apos;s team at AERA has excavated
          about ten acres of a Fourth Dynasty settlement now called Heit
          el-Ghurab: barracks, granaries, bakeries, scribal offices, cattle pens
          and harbour basins. Lehner has come to see it as a major Nile port as
          well as a workers&apos; town. The barracks could sleep 1,600 or more,
          and the rubbish heaps are full of cattle, sheep, goat and fish bones.
          A cemetery for the workers, found in 1990, holds modest tombs with
          goods for the afterlife, right beside the monuments they built. Inside
          the pyramids, work gangs left their names as graffiti: the Followers
          of the Powerful White Crown of Khufu, the Drunkards of Menkaure.
          <FootnoteLink id={4} />
        </p>

        <p>
          Nobody names their crew the Drunkards of Menkaure under the lash. That
          is the name of a team with an identity, a rivalry and probably a
          favourite bar. But I want to be careful not to swing to the opposite
          myth, of happy volunteers. The likeliest model is labour as a form of
          tax, with people rotating through the works for a term, fed and housed
          by the state. That is compulsion. It is not chattel slavery, and the
          difference shows up in exactly the places the evidence lives: the
          rations, the graves, the names.
        </p>

        <p>
          From an engineer&apos;s seat, the interesting thing about the workers
          is not their legal status but the provisioning. Every person on site
          needs bread, which means grain, which means granaries and ovens and
          water and fuel, every day, for years. Whatever the size of the
          workforce, the bakery was as much a part of the build as the ramps.
        </p>

        <H2>A quarter of a metre per kilometre</H2>

        <p>
          Rome is the counterexample to the idea that ancient megaprojects ran
          on muscle alone. Their aqueducts ran on surveying.
        </p>

        <p>
          The aqueduct that fed Nîmes, built around 50 CE, runs about 50
          kilometres from a spring near Uzès, and it delivered 30,000 to 40,000
          cubic metres of water a day by gravity. Its average fall, according to
          the site itself, is 25 centimetres per kilometre. The Pont du Gard,
          the bridge that carries it over the Gardon, stands 49 metres high, and
          across the bridge the channel drops by about 2.5 centimetres.
          <FootnoteLink id={5} /> Put those as ratios:
        </p>

        <BlockMath math="\frac{0.25\ \text{m}}{1000\ \text{m}} = \frac{1}{4000} \qquad\qquad \frac{0.025\ \text{m}}{456\ \text{m}} \approx \frac{1}{18\,000}" />

        <p>
          At the average rate the whole route falls only about twelve and a half
          metres end to end. The gradient is also not uniform; it is steeper in
          some stretches and almost flat in others, which is what you would
          expect from engineers fitting a line to real terrain rather than
          drawing one on a plan.
        </p>

        <p>
          What makes this more impressive is the instrument. Vitruvius describes
          the chorobates, a levelling table about twenty feet long with plumb
          lines down its legs, and, for windy days, a groove cut in the top to
          be filled with water and read like a spirit level. He also recommends
          that an aqueduct fall not less than half a foot in a hundred.
          <FootnoteLink id={6} /> That is one in two hundred. The Nîmes builders
          went twenty times flatter than the textbook. Whether that was
          confidence, necessity forced on them by the terrain, or a corrupt line
          in the manuscript, the outcome is the same: a chain of crews with
          wooden instruments held a slope of a quarter of a metre per kilometre
          across hills and valleys for fifty kilometres.
        </p>

        <p>
          This is the place where &ldquo;we&apos;d struggle to replicate
          it&rdquo; is most wrong, and most interestingly so. A modern survey
          crew with a laser level would do this in an afternoon. The Roman
          achievement was not that the measurement was beyond us. It was that
          they turned a fragile measurement into a repeatable procedure, and ran
          it, segment by segment, through a workforce the site puts at nearly a
          thousand men over about five years. Precision as a process, not a
          talent.
        </p>

        <H2>At Angkor the canal was the crane</H2>

        <p>
          Angkor Wat, built in the twelfth century, holds somewhere between five
          and ten million sandstone blocks by one widely reported estimate, some
          of them up to about a tonne and a half. For a long time the assumed
          route from the quarries was a roundabout river journey of about 90
          kilometres. In 2012 Etsuo Uchida and Ichita Shimoda of Waseda
          University used satellite imagery and fieldwork to trace something
          better: more than fifty quarries along the foot of the Kulen hills,
          linked to the temples by a canal route of roughly 35 kilometres. Some
          of the canal sections still hold water, and stray sandstone blocks
          along the way look like they fell off rafts in transit.
          <FootnoteLink id={7} />
        </p>

        <p>
          The canals were not a one-off. The Greater Angkor Project&apos;s map
          of the region covers nearly 3,000 square kilometres and shows a water
          management network spread over more than 1,000 of them: channels,
          embankments and enormous reservoirs that stored the monsoon and spread
          it across a low-density city.
          <FootnoteLink id={8} /> The temples are the part tourists photograph.
          The hydraulic system is the part that let a city of that size exist at
          all, and that delivered the stone.
        </p>

        <p>
          There is a sting here too. The same paper argues that the scale of
          landscape modification was large enough to cause real damage,
          deforestation, erosion and degraded topsoil, and supports the old
          hypothesis that overexploitation of the landscape played a part in
          Angkor&apos;s decline. The network that built the city also became the
          thing the city could not afford to maintain. Every infrastructure
          engineer has met a smaller version of that problem.
        </p>

        <H2>We could. We would just go over budget</H2>

        <p>
          So could we replicate these projects? Physically, easily. A modern
          contractor would cut the stone with diamond wire, move it by truck,
          set it with a crane and survey it with lasers. Nobody needs a lost
          secret.
        </p>

        <p>
          The harder question is whether we could replicate the coordination,
          and there I think the hook has a point it does not know it is making.
          Bent Flyvbjerg, who has spent a career collecting data on modern
          megaprojects, summarises the pattern as an iron law: over budget, over
          time, over and over again.
          <FootnoteLink id={9} /> Our failures are almost never about the
          physics. They are about estimating, incentives, interfaces between
          contractors, and the long dull work of keeping thousands of people
          supplied and pointed in the same direction. Those are exactly the
          problems Merer, the Nîmes surveyors and the Angkor canal builders were
          solving, without spreadsheets, over decades.
        </p>

        <p>
          They also had advantages no modern project gets, and it would be
          dishonest to skip them. A god-king does not face a planning inquiry. A
          state that can draft labour as tax does not negotiate wages. Time
          horizons of a reign or longer make a twenty-year build normal rather
          than scandalous. Some of what looks like superior coordination was
          simply the absence of anyone allowed to say no.
        </p>

        <p>
          Which is why I keep coming back to Merer. He is the most modern person
          at Giza: a man with a route, a crew, a quota and a boss, writing down
          every trip because someone above him would want to know. The pyramid
          has had four and a half thousand years of people staring at it and
          asking how. His logbook answers in the least romantic way possible.
          Boats, mostly. And someone keeping count.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
