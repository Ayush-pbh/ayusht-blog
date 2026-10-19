import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import InlineLink from "@/components/InlineLink";
import { BlockMath, InlineMath } from "@/components/Math";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("the-fermi-paradox-is-wrong");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Fermi died in 1954 without writing his version down. The account comes
        from his lunch companions, collected decades later by Eric Jones:{" "}
        <InlineLink href="https://www.osti.gov/biblio/5746675">
          &ldquo;Where is everybody.&rdquo; An account of Fermi&rsquo;s question
        </InlineLink>
        , Los Alamos report LA-10311-MS (1985). A readable retelling, including
        York&rsquo;s recollection that Fermi thought we should have been visited
        long ago, is Paul Patton&rsquo;s{" "}
        <InlineLink href="https://www.universetoday.com/articles/beyond-fermis-paradox-i-a-lunchtime-conversation-enrico-fermi-and-extraterrestrial-intelligence">
          Beyond Fermi&rsquo;s Paradox I
        </InlineLink>{" "}
        at Universe Today.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Susan Schneider, interviewed about the paper she wrote for a NASA and
        Library of Congress volume on astrobiology:{" "}
        <InlineLink href="https://today.uconn.edu/2015/02/philosopher-ponders-alien-minds-for-nasa">
          Philosopher Ponders &lsquo;Alien Minds&rsquo; for NASA
        </InlineLink>
        , UConn Today (2015).
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Solar luminosity of 3.828 × 10<sup>26</sup> W from NASA&rsquo;s{" "}
        <InlineLink href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html">
          Sun Fact Sheet
        </InlineLink>
        . The rest is Landauer&rsquo;s bound, the Stefan&ndash;Boltzmann law and
        Wien&rsquo;s law, done on the back of an envelope. Real computers sit
        many orders of magnitude above the Landauer floor, which only makes the
        heat problem worse.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        Griffith, Wright et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/1504.03418">
          The Ĝ Infrared Search for Extraterrestrial Civilizations with Large
          Energy Supplies. III
        </InlineLink>
        , ApJS 217, 25 (2015). The framing of why waste heat is the thing to
        look for is in paper I:{" "}
        <InlineLink href="https://arxiv.org/abs/1408.1133">
          Wright, Mullan, Sigurðsson &amp; Povich (2014)
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Suazo, Zackrisson et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2405.02927">
          Project Hephaistos II: Dyson sphere candidates from Gaia DR3, 2MASS,
          and WISE
        </InlineLink>
        , MNRAS (2024). The first rebuttal is Ren, Garrett &amp; Siemion,{" "}
        <InlineLink href="https://arxiv.org/abs/2405.14921">
          Background Contamination of the Project Hephaistos Dyson Sphere
          Candidates
        </InlineLink>{" "}
        (2024); the 2026 follow-up, with the Hephaistos authors on it, is Ren et
        al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2607.03619">
          Archival Diagnostics for Potential Background Contaminants of Project
          Hephaistos Dyson Sphere Candidates
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Boyajian et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/1801.00732">
          The First Post-Kepler Brightness Dips of KIC 8462852
        </InlineLink>
        , ApJL (2018). The dips were deeper in blue than in red, which is what
        fine dust does and what a solid panel does not.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Sandberg, Armstrong &amp; Ćirković,{" "}
        <InlineLink href="https://arxiv.org/abs/1705.03394">
          That is not dead which can eternal lie: the aestivation hypothesis for
          resolving Fermi&rsquo;s paradox
        </InlineLink>{" "}
        (2017).
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        Bennett, Hanson &amp; Riedel,{" "}
        <InlineLink href="https://arxiv.org/abs/1902.06730">
          Comment on &lsquo;The aestivation hypothesis for resolving
          Fermi&rsquo;s paradox&rsquo;
        </InlineLink>
        , Foundations of Physics 49, 820 (2019).
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        Sandberg, Drexler &amp; Ord,{" "}
        <InlineLink href="https://arxiv.org/abs/1806.02404">
          Dissolving the Fermi Paradox
        </InlineLink>{" "}
        (2018).
      </>
    ),
  },
];

export default function FermiParadoxIsWrong() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          Every time someone points a radio telescope at a star and hears
          nothing, there is a quiet assumption riding along: that whoever is out
          there is still the kind of creature that would want to shout. A
          warm-blooded thing, roughly our size, living on a planet, building
          transmitters for the same reasons we did. I think that assumption is
          almost certainly wrong, and that a lot of the gloom around the Fermi
          paradox comes from it.
        </p>

        <p>
          I should be careful about what I&rsquo;m claiming, though, because the
          title writes a cheque the physics only partly cashes. My argument is
          that the <em>radio</em> version of the paradox is malformed, and that
          post-biological intelligence explains the silence on those frequencies
          well. What it does not do, on its own, is explain the deeper version
          of Fermi&rsquo;s question. That part is harder, and the most
          interesting thing about the post-biological idea is how precisely it
          tells you where it should fail.
        </p>

        <H2>Fermi was asking about visitors, not broadcasts</H2>

        <p>
          The original question was a lunch remark at Los Alamos in the summer
          of 1950. Fermi, Teller, Konopinski and York had been joking about a
          New Yorker cartoon and the recent wave of flying saucer reports, and
          Fermi asked, more or less, where everybody was.
          <FootnoteLink id={1} /> The point, as York remembered it, was that if
          civilisations were common and interstellar travel possible, Earth
          ought to have been visited, repeatedly, a long time ago.
        </p>

        <p>
          Notice what&rsquo;s missing from that. Nothing about radio. The
          question is about expansion and footprints: given billions of years
          and billions of stars, why hasn&rsquo;t anyone spread far enough to
          reach us? The radio framing came later, with SETI, and it quietly
          narrowed the question to something much weaker. &ldquo;Why
          haven&rsquo;t we picked up a narrowband signal from the few thousand
          stars we&rsquo;ve looked at closely?&rdquo; is a question with a
          hundred boring answers. &ldquo;Why is the galaxy not visibly
          used?&rdquo; is the one that bites.
        </p>

        <p>
          Holding those two apart matters, because the post-biological argument
          demolishes the first and makes the second sharper.
        </p>

        <H2>The radio era is a rounding error</H2>

        <p>
          Here is the arithmetic that convinced me. Earth is about 4.5 billion
          years old. Humans have been able to transmit radio for a bit over a
          century. And we are already, within that same century, building
          machines that do a serious fraction of our thinking. Whatever happens
          next, the phase of our history in which we are biological,
          technological and broadcasting looks short. Call it a few centuries to
          be generous. Against 4.5 billion years, that&rsquo;s less than one
          part in ten million of the planet&rsquo;s history.
        </p>

        <p>
          Now apply it to everyone else. The philosopher Susan Schneider, in a
          paper written for a NASA and Library of Congress volume on
          astrobiology, makes the point that we are young: many planets are
          billions of years older than ours, so any civilisation we meet is
          likely to be far older than us. She calls us &ldquo;galactic
          babies&rdquo;, and argues that the most advanced civilisations
          &ldquo;will likely be post biological.&rdquo;
          <FootnoteLink id={2} /> If even a fraction of those older
          civilisations did what we seem to be in the middle of doing, then the
          odds of catching one during its brief radio-using, flesh-based window
          are terrible. You&rsquo;re looking for a species in the one century
          when it happened to resemble you.
        </p>

        <p>
          As an engineer, the framing I keep coming back to is the bootloader.
          Biology is a fantastic way to get from chemistry to the first
          general-purpose computer, and a terrible platform to run anything on
          afterwards. It needs a narrow temperature band, liquid water, a
          planet&rsquo;s worth of shielding, and it thinks with nerve signals
          slow enough that a copper wire would find them embarrassing. Nobody
          ships the bootloader as the product. I don&rsquo;t see why
          evolution&rsquo;s output would be the exception, once something on the
          planet can design its own substrate.
        </p>

        <p>
          And a mind running on engineered hardware has much less reason to
          broadcast. Our radio leakage is mostly an accident of a particular
          technology stack: high-power, omnidirectional transmitters for TV and
          radar. Plenty of that already looks like a phase, with more and more
          traffic moving over cable, fibre and tight beams. Nobody designs a
          network to spray its traffic into space if they can help it.
        </p>

        <H2>Thinking costs heat, and heat is visible</H2>

        <p>
          This is where the argument either becomes physics or stays science
          fiction, so let&rsquo;s do the physics. Computation is not free.
          Landauer&rsquo;s principle puts a floor on the energy needed to erase
          one bit of information at temperature <InlineMath math="T" />:
        </p>

        <BlockMath math="E_{\min} = k_B T \ln 2" />

        <p>
          At room temperature, 300 K, that&rsquo;s about 2.9 × 10
          <sup>&minus;21</sup> joules per bit. Small. But a post-biological
          civilisation is, almost by definition, one whose main activity is
          computation, and anything that wants more of it eventually wants more
          energy. The biggest energy source in any star system is the star. The
          Sun puts out 3.8 × 10<sup>26</sup> watts. If you captured all of it
          and computed at the Landauer limit at room temperature, you could
          erase roughly 10<sup>47</sup> bits per second.
          <FootnoteLink id={3} /> That&rsquo;s the size of the prize. It&rsquo;s
          the reason Freeman Dyson&rsquo;s old idea of a shell or swarm of
          collectors around a star refuses to die.
        </p>

        <p>
          But energy in means heat out. Conservation doesn&rsquo;t care how
          clever your architecture is. A swarm that absorbs the Sun&rsquo;s
          whole output has to re-radiate the same 3.8 × 10<sup>26</sup> watts.
          Using the Stefan&ndash;Boltzmann law, a shell radiating that much at a
          comfortable 300 K would need a radius of about 1.7 times the
          Earth&ndash;Sun distance. And Wien&rsquo;s law says a 300 K surface
          glows brightest at around 10 micrometres, deep in the mid-infrared.
        </p>

        <p>
          So the post-biological hypothesis makes a prediction, and it is not
          &ldquo;silence&rdquo;. It&rsquo;s the opposite: a star that looks
          oddly dim in visible light and oddly bright in the infrared, glowing
          like a radiator. A civilisation can stop talking. It cannot stop
          obeying the second law. You can turn off a radio transmitter. You
          cannot turn off your heat sink.
        </p>

        <H2>We went looking for the waste heat</H2>

        <p>
          This is the part of the story I wish more people knew, because the
          searches have actually been done, and they&rsquo;re much stronger than
          listening for beeps.
        </p>

        <p>
          The Ĝ (G-HAT) project at Penn State used the WISE infrared survey to
          look at about 100,000 galaxies for the mid-infrared glow you&rsquo;d
          expect if someone were reprocessing a galaxy&rsquo;s starlight on a
          galactic scale. None of them hosts a civilisation turning more than 85
          percent of its starlight into mid-infrared waste heat; only about
          fifty are even bright enough in the infrared to allow more than half.
          <FootnoteLink id={4} /> Arp 220, which astronomers already know as a
          dusty collision between two galaxies, is one of those fifty. That is a
          strong result. It rules out entire galaxies that have been fully put
          to work, across a sample a thousand times bigger than anything
          searched before.
        </p>

        <p>
          At the scale of single stars, Project Hephaistos sifted about five
          million stars in Gaia, 2MASS and WISE data for partial Dyson spheres,
          and in 2024 reported seven candidates, all small red M dwarfs with an
          infrared excess that ordinary explanations didn&rsquo;t easily cover.
          <FootnoteLink id={5} /> Within weeks, Ren, Garrett and Siemion pointed
          out that three of them sat close to radio sources, and argued that
          hot, dust-obscured galaxies far in the background could be
          contaminating the infrared light. A larger 2026 study, which includes
          several of the original Hephaistos authors, found clear background
          contamination in two candidates and suggestive signs in others.
        </p>

        <p>
          I find this genuinely encouraging, and not because it found aliens.
          It&rsquo;s that the process worked: a falsifiable technosignature, a
          pipeline, candidates, a rebuttal, and follow-up with both sides on the
          paper. Tabby&rsquo;s star went the same way. Its strange dips in
          brightness set off a wave of megastructure speculation, and by 2018
          the observations showed the dimming was stronger in blue light than
          red, which is what fine dust does and a solid structure doesn&rsquo;t.
          <FootnoteLink id={6} />
        </p>

        <p>
          Put it together and the honest summary is uncomfortable for my side:
          the infrared sky looks pretty quiet too. Post-biology explains the
          radio silence. It doesn&rsquo;t, by itself, explain the infrared
          silence. If anything it turns the infrared silence into a sharper
          puzzle, because computing minds should want energy more than
          biological ones do.
        </p>

        <H2>The quiet option, and why I only half buy it</H2>

        <p>
          There is a clever escape, and it&rsquo;s the reason I think this line
          of argument deserves more attention than it gets. In 2017 Anders
          Sandberg, Stuart Armstrong and Milan Ćirković proposed the aestivation
          hypothesis.
          <FootnoteLink id={7} /> Look at the Landauer bound again: the cost of
          erasing a bit scales with temperature. Today the cosmic background
          sits at about 2.7 K, a hundred times colder than room temperature, and
          it keeps cooling as the universe expands. A civilisation that cared
          mostly about total computation would get far more of it by waiting.
          Sandberg and colleagues estimate a gain of around 10
          <sup>30</sup> by holding out for the far future. So the most advanced
          minds might gather their resources and then go dormant, like animals
          sleeping through a hot summer. That&rsquo;s what aestivation means. On
          that view the galaxy looks empty because its owners are asleep.
        </p>

        <p>
          I love this idea because it&rsquo;s the first Fermi answer that comes
          from thermodynamics instead of sociology. It&rsquo;s also probably
          wrong, and the reason is worth knowing. In 2019 Charles Bennett, Robin
          Hanson and Jess Riedel pointed out that the argument assumes waste
          entropy can only be dumped into the cosmic background.
          <FootnoteLink id={8} /> But the universe today is full of things that
          are far from maximum entropy, and those can absorb a computer&rsquo;s
          entropy at the same efficient rate now as later. If you can pay your
          entropy bill today at no extra cost, the case for waiting collapses.
          The engineering version: you don&rsquo;t need a colder room if you
          have a heat sink with spare capacity sitting right there.
        </p>

        <p>
          There&rsquo;s a deeper problem, too, which no hypothesis about
          motivation fully escapes. For the silence to hold, essentially{" "}
          <em>every</em> civilisation has to choose quiet, forever. Jason Wright
          and colleagues call the failure to take this seriously the
          &ldquo;monocultural fallacy&rdquo;
          <FootnoteLink id={4} />: it&rsquo;s easy to explain why a typical
          alien wouldn&rsquo;t expand, much harder to explain why none ever
          does. One restless faction, one self-copying probe, one mind that
          values computation <em>now</em>, and the galaxy fills up. Their paper
          estimates that the galaxy could be crossed in under a billion years,
          which is a small slice of its age.
        </p>

        <p>
          This is where the post-biological story cuts against itself. Machines
          make Fermi&rsquo;s original problem worse, not better. A mind that can
          pause itself, copy itself, and survive centuries of cold vacuum is
          exactly the kind of thing that crosses interstellar space easily. If
          post-biological minds are the norm, the question &ldquo;why
          haven&rsquo;t they reached us?&rdquo; becomes more pointed, not less.
        </p>

        <H2>What &ldquo;wrong&rdquo; can honestly mean</H2>

        <p>
          So what&rsquo;s left of the title? There are two defensible senses in
          which the Fermi paradox is wrong, and one I don&rsquo;t think holds.
        </p>

        <p>
          The first is mine: the popular paradox, &ldquo;they should be talking
          and they aren&rsquo;t&rdquo;, rests on a bad assumption about what
          intelligence turns into. If minds go post-biological quickly, radio
          silence isn&rsquo;t surprising at all. I hold that with some
          confidence. It&rsquo;s cheap to believe, because it only needs other
          civilisations to do roughly what ours appears to be doing.
        </p>

        <p>
          The second is the stronger, colder one, from Sandberg again, this time
          with Eric Drexler and Toby Ord. Their 2018 paper argues that the
          paradox comes from plugging single best-guess numbers into Drake-style
          equations whose terms are uncertain across many orders of magnitude.
          <FootnoteLink id={9} /> Carry that uncertainty through properly and
          there&rsquo;s a substantial chance we are alone in the observable
          universe. If so, an empty sky is not a contradiction that needs
          explaining. It&rsquo;s just one of the likely outcomes. In that sense
          there is no paradox, only a question we can&rsquo;t answer yet.
          Honestly, this is the better argument, and it doesn&rsquo;t need
          aliens of any kind.
        </p>

        <p>
          The sense that doesn&rsquo;t hold is the one the headline tempts you
          towards: that we&rsquo;ve explained the empty sky because the aliens
          became computers. We haven&rsquo;t. Post-biology tells you not to
          expect chatter. It also tells you to expect heat and expansion, and so
          far the heat searches have come back clean at the scale of whole
          galaxies, with a handful of single-star candidates that keep turning
          out to be distant dusty galaxies in the background.
        </p>

        <p>
          What I take from all this is mostly a change in where to look.
          I&rsquo;d spend less effort on the thinly spread hope that someone is
          signalling us. I&rsquo;d spend more on the one signature no
          civilisation can opt out of, whatever its substrate: thermodynamics.
          Biology was optional. Waste heat isn&rsquo;t. If the galaxy has
          inhabitants who think in silicon or something stranger, they are still
          running on an energy budget, and every energy budget shows up
          somewhere as warm.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
