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

const post = getPostBySlug("mapping-the-invisible");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        R. Gispert, G. Lagache and J.-L. Puget,{" "}
        <InlineLink href="https://arxiv.org/abs/astro-ph/0005554">
          Implications of the cosmic infrared background for light production
          and the star formation history in the Universe
        </InlineLink>
        , A&amp;A (2000). The abstract puts dust-reemitted power at about 1 to
        2.6 times the optical/near-IR background, against roughly 30% measured
        locally. The fractions in the text are my arithmetic on their range.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        NASA,{" "}
        <InlineLink href="https://science.nasa.gov/missions/webb/nasa-webb-pushes-boundaries-of-observable-universe-closer-to-big-bang">
          NASA Webb Pushes Boundaries of Observable Universe Closer to Big Bang
        </InlineLink>{" "}
        (January 2026). MoM-z14, redshift 14.44, confirmed with NIRSpec, about
        280 million years after the Big Bang.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Chandra X-ray Center,{" "}
        <InlineLink href="https://chandra.harvard.edu/press/24_releases/press_010824.html">
          NASA Telescopes Chase Down &ldquo;Green Monster&rdquo; in Star&rsquo;s
          Debris
        </InlineLink>{" "}
        (January 2024).
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        J. Vink et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2401.02491">
          X-ray diagnostics of Cassiopeia A&rsquo;s &ldquo;Green Monster&rdquo;:
          evidence for dense shocked circumstellar plasma
        </InlineLink>
        , ApJL 964, L11 (2024). The blueshift of about −2,300 km/s is what puts
        the structure on the near side of the remnant.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Chandra X-ray Center,{" "}
        <InlineLink href="https://chandra.harvard.edu/photo/2006/1e0657/">
          1E 0657-56: NASA Finds Direct Proof of Dark Matter
        </InlineLink>
        . &ldquo;Direct proof&rdquo; is the press office talking; the paper
        behind it is more careful, but the separation of gas and mass is the
        result.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        The Event Horizon Telescope Collaboration,{" "}
        <InlineLink href="https://arxiv.org/abs/1906.11238">
          First M87 Event Horizon Telescope Results. I. The Shadow of the
          Supermassive Black Hole
        </InlineLink>
        , ApJL 875, L1 (2019): a ring of 42 ± 3 μas at 1.3 mm, and a mass of
        (6.5 ± 0.7) × 10⁹ suns.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        MIT News,{" "}
        <InlineLink href="https://news.mit.edu/2022/first-supermassive-black-hole-sagitarrius-0512">
          Astronomers reveal first image of the black hole at the heart of our
          galaxy
        </InlineLink>{" "}
        (May 2022). Eight observatories, about five petabytes of data across
        both targets.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        The EHT MWL Science Working Group et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2104.06855">
          Broadband Multi-wavelength Properties of M87 during the 2017 Event
          Horizon Telescope Campaign
        </InlineLink>
        , ApJL 911, L11 (2021). The author list alone, with Fermi-LAT, H.E.S.S.,
        MAGIC and VERITAS beside the EHT, makes the point.
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        P. Slane,{" "}
        <InlineLink href="https://cxc.cfa.harvard.edu/cdo/cuc/cuc_file26/may6/Slane_CUC_May2026.pdf">
          Director&rsquo;s report to the Chandra Users&rsquo; Committee
        </InlineLink>{" "}
        (6 May 2026). FY26 set at $63M, $11M below full-mission cost; a
        transition to a reduced &ldquo;minimum-cost mission&rdquo; sometime in
        2027; the FY27 request &ldquo;makes no mention at all about
        Chandra.&rdquo; Fiscal 2027 began on 1 October and I have not seen a
        settled number for it.
      </>
    ),
  },
];

export default function MappingTheInvisible() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          Human eyes see from roughly 380 to 750 nanometres. That is a factor of
          two in wavelength, one octave, and astronomers now work across
          something like forty of them, from radio waves a metre long to gamma
          rays far smaller than an atom. If the electromagnetic spectrum were a
          piano with forty octaves, we were born hearing one key&rsquo;s worth
          of it and spent most of history assuming that was the song.
        </p>

        <p>
          That is the usual pitch for multi-wavelength astronomy, and it is half
          right. The &ldquo;sliver&rdquo; framing is true on a log scale and
          misleading on an energy scale: the Sun pours a large share of its
          output into exactly the octave we see, which is not a coincidence
          given whose eyes evolved under it. What makes the other thirty-nine
          octaves matter is not that there is more light out there. It is that
          every band answers a different question, and the interesting answers
          only show up when you hold two of them up against each other.
        </p>

        <p>
          I think the pretty composite images, the ones with X-rays painted
          purple over infrared painted orange, are the least interesting product
          of this whole enterprise. They are a UI. The real product is the join.
        </p>

        <H2>Most of the starlight ever made was eaten by dust</H2>

        <p>
          Start with the strongest version of the &ldquo;drowning in light we
          can&rsquo;t see&rdquo; claim, because there is one, and it is better
          than the slogan.
        </p>

        <p>
          Galaxies are dusty. Dust grains absorb ultraviolet and visible
          starlight, warm up a little, and re-radiate that energy in the far
          infrared. Add up that glow across the whole sky and the history of the
          universe and you get the cosmic infrared background. In 2000, Gispert,
          Lagache and Puget estimated that the dust-reemitted part carries about
          1 to 2.6 times as much power as the optical and near-infrared
          background combined.
          <FootnoteLink id={1} /> Do the division and somewhere between half and
          nearly three-quarters of all the energy stars have ever put out
          reaches us as far-infrared glow from dust, not as starlight. Locally
          the ratio is about 30%, which tells you the early universe was a much
          smokier place than the one outside your window.
        </p>

        <p>
          So the honest version of the hook is this: an optical telescope does
          not see a sliver of the cosmos, it sees a censored copy. The most
          violent star formation happens inside the densest dust, which means
          the regions with the most going on are precisely the ones that hide
          best from visible light.
        </p>

        <p>
          The second reason to go infrared is the expansion of space, and it is
          where the arithmetic gets fun. In January 2026 NASA confirmed a galaxy
          called MoM-z14 at a redshift of 14.44, seen about 280 million years
          after the Big Bang.
          <FootnoteLink id={2} /> Redshift <InlineMath math="z" /> stretches
          every wavelength by a factor of <InlineMath math="1+z" />, so here by
          about 15.4. Hydrogen&rsquo;s Lyman-alpha line, emitted at 121.6
          nanometres in the far ultraviolet, arrives at roughly 1.88 microns
          &mdash; more than twice as far into the infrared as the reddest light
          your eye can register. The galaxy was blazing in ultraviolet. By the
          time that light reaches us it is invisible heat. JWST is not an
          infrared telescope because infrared is exotic; it is one because the
          early universe has been redshifted out of the visible entirely.
        </p>

        <H2>A green monster, settled by a second opinion</H2>

        <p>
          My favourite recent example of the join is small and almost comic.
          Cassiopeia A is the remnant of a star whose explosion became visible
          from Earth about 340 years ago. When JWST&rsquo;s mid-infrared
          instrument imaged it in 2023, the team found a large, strange loop
          crossing the central cavity and nicknamed it the Green Monster, after
          the wall at Fenway Park.
          <FootnoteLink id={3} />
        </p>

        <p>
          The infrared data alone could not say what it was. Its position
          suggested stellar debris from the explosion. Its infrared properties
          suggested something else: circumstellar material, gas the star had
          shed before it died. Two readings of one instrument, pointing in
          different directions.
        </p>

        <p>
          Chandra had been watching Cas A in X-rays for decades, so the archive
          already held the answer. Shock waves in the remnant heat gas to tens
          of millions of degrees, and at those temperatures the X-ray spectrum
          is a chemical fingerprint. The debris from deep inside the star is
          rich in silicon and iron. The Green Monster was not: its X-ray
          spectrum matched the filaments along the outer blast wave, where the
          shock is ploughing into gas around the star. Its spectrum was also
          blueshifted by roughly 2,300 km/s, which places it on the near side of
          the remnant, moving towards us.
          <FootnoteLink id={4} /> Jacco Vink, who led the X-ray analysis, put it
          plainly: &ldquo;Chandra helped us clinch the case.&rdquo;
        </p>

        <p>
          As an engineer this is the part I love, because it is exactly how you
          debug a distributed system. One log stream gives you an anomaly and
          two plausible stories. You do not stare harder at the same log. You go
          find a second source with independent failure modes and correlate on a
          shared key &mdash; here, position on the sky. The infrared told you
          there was something. The X-rays told you what it was made of and which
          way it was moving. Neither alone settles it.
        </p>

        <H2>The Bullet Cluster is a join that found a missing column</H2>

        <p>
          The grander version of the same move is the Bullet Cluster, about 3.8
          billion light years away: two clusters of galaxies that passed through
          each other.
          <FootnoteLink id={5} />
        </p>

        <p>
          Chandra sees the hot gas between the galaxies, which holds most of the
          ordinary matter in a cluster. When the clusters collided, the gas
          clouds hit each other, felt drag, and slowed down, leaving two glowing
          X-ray blobs stalled near the middle. Separately, astronomers mapped
          where the mass is by gravitational lensing, measuring how the cluster
          bends light from galaxies far behind it. That map is not an image in
          any band. It is inferred from distortions in an optical image.
        </p>

        <p>
          Lay the two maps over each other and they disagree. Most of the mass
          is not where most of the ordinary matter is. It sailed straight
          through the collision with the galaxies, while the gas got stuck. If
          you believed the hot gas dominated the mass, as some alternatives to
          dark matter would like, this picture should not exist.
        </p>

        <p>
          In database terms, you joined the X-ray table with the lensing table
          on sky position and found rows that only exist on one side. Neither
          table contains dark matter. The mismatch does. That, to me, is the
          deepest thing multi-wavelength astronomy has to say: sometimes the
          object you are looking for does not shine in any band, and the only
          way to see it is as a disagreement between bands that do.
        </p>

        <H2>The &ldquo;Earth-sized telescope&rdquo; is mostly missing</H2>

        <p>
          Then there is the Event Horizon Telescope, which gets described
          everywhere as an Earth-sized telescope. It deserves the awe and not
          quite the description.
        </p>

        <p>
          The physics of resolution is unforgiving. The finest angle a telescope
          can separate scales with wavelength over aperture:
        </p>

        <BlockMath math="\theta \approx \frac{\lambda}{D} = \frac{1.3\times10^{-3}\ \text{m}}{1.27\times10^{7}\ \text{m}} \approx 1.0\times10^{-10}\ \text{rad} \approx 21\ \mu\text{as}" />

        <p>
          That is 1.3-millimetre radio waves across the diameter of the Earth,
          and it lands close to the roughly 20 microarcseconds the collaboration
          quotes. To feel that number: the human eye resolves about one
          arcminute, which makes this roughly three million times sharper. The
          ring around M87&rsquo;s black hole came out at 42 ± 3 microarcseconds,
          around a mass of about 6.5 billion suns.
          <FootnoteLink id={6} /> At the Moon&rsquo;s distance, an angle of 42
          microarcseconds spans about eight centimetres. The EHT photographed
          something that, on the sky, is the size of a doughnut sitting on the
          lunar surface.
        </p>

        <p>
          But there is no Earth-sized dish. There are eight observatories,
          spread from Hawaii to Spain to the South Pole, each recording radio
          waves against an atomic clock, with the recordings shipped and
          correlated later.
          <FootnoteLink id={7} /> Each pair of stations samples one spatial
          frequency of the image at a time, and the Earth&rsquo;s rotation
          sweeps those samples across the sky over a night. A real dish of that
          size would collect every spatial frequency at once. The EHT collects a
          sparse scatter of them and leaves enormous holes, and the image is a
          reconstruction that has to fill those holes with assumptions about
          what images are likely to look like.
        </p>

        <p>
          This is not a scandal; it is how all interferometry works, and the
          collaboration spent years stress-testing its reconstructions. It does
          mean the right mental model is closer to compressed sensing than to a
          camera. When the picture you are looking at is barely twice the
          instrument&rsquo;s resolution, you should hold it a little more
          loosely than the headlines did. The thing to trust most is the
          ring&rsquo;s size, which the data constrains directly, rather than the
          exact shape of every bright knot.
        </p>

        <p>
          And Sagittarius A*, our own galaxy&rsquo;s black hole, is harder
          still. It is about four million solar masses and 27,000 light years
          away. Because it is so much smaller than M87*, the gas around it
          orbits fast enough that the source changes over minutes, during an
          observation built on the assumption that the source holds still.
          <FootnoteLink id={7} /> Imaging it at all is a small miracle of
          statistics.
        </p>

        <p>
          What I like is that even the EHT is not really a single-band story.
          During the 2017 campaign, the M87 observations were joined by
          telescopes across the spectrum, from radio arrays to gamma-ray
          observatories, to build the most complete simultaneous spectrum of the
          jet ever taken. The paper&rsquo;s conclusion was that no simple
          one-zone model fits it; you need a structured jet.
          <FootnoteLink id={8} /> The ring is the photograph everyone has seen.
          The join is where the physics came out.
        </p>

        <H2>We keep building new eyes and starving the old ones</H2>

        <p>
          Here is the opinion I actually came to write. Multi-wavelength
          astronomy is a property of a fleet, not of any single telescope, and
          fleets are fragile in a way no individual mission is. The join only
          works if the tables overlap: same patch of sky, often the same months,
          sometimes the same hour. A brilliant new infrared telescope with no
          working X-ray partner is a database with a foreign key pointing at a
          dropped table.
        </p>

        <p>
          Which is why Chandra&rsquo;s budget story bothers me more than it
          probably should. Chandra launched in 1999 and is still the sharpest
          X-ray eye we have. NASA&rsquo;s 2025 budget request proposed cuts deep
          enough that the community spent two years fighting what looked like a
          slow shutdown. As of the Chandra director&rsquo;s report in May 2026,
          Congress had held the line for fiscal 2026 at $63 million, $11 million
          short of what full operations cost, with the observatory working
          normally apart from an anomaly on one detector and a planned drop to a
          reduced &ldquo;minimum-cost mission&rdquo; sometime in 2027. The 2027
          request did not mention Chandra at all.
          <FootnoteLink id={9} />
        </p>

        <p>
          I understand the logic of retiring old hardware. In software, keeping
          a legacy service alive forever is how you end up with a codebase
          nobody can move. But the Green Monster is a neat counterexample: the
          answer to a 2023 question from the newest telescope in space was
          sitting in decades of archived data from a 1999 one. Old instruments
          are not only legacy. They are the baseline that makes new anomalies
          legible. Lose the X-ray eye and every future infrared surprise gets
          one fewer second opinion.
        </p>

        <p>
          So when you see the next composite image, purple and orange and
          impossibly detailed, look at it the way you would look at a dashboard.
          The colours are arbitrary. The alignment is the result. And the
          instruments that made it are a shared, aging piece of infrastructure
          that somebody has to keep paying for, long after the launch-day photos
          stop trending.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
