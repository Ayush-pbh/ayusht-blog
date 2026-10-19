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

const post = getPostBySlug("rogue-planets");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        T. Sumi et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2303.08280">
          Free-Floating Planet Mass Function from MOA-II 9-year Survey towards
          the Galactic Bulge
        </InlineLink>
        , AJ (2023). Six events shorter than half a day; the shortest, 0.057 ±
        0.016 days.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Caltech,{" "}
        <InlineLink href="https://lindecenter.caltech.edu/news/many-life-bearing-planets-could-exist-interstellar-space-according-caltech-planetary-science">
          Many life-bearing planets could exist in interstellar space
        </InlineLink>
        , on D. J. Stevenson, &ldquo;Life-sustaining planets in interstellar
        space?&rdquo;, Nature 400, 32 (1999).
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        N. Miret-Roig et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2112.11999">
          A rich population of free-floating planets in the Upper Scorpius young
          stellar association
        </InlineLink>
        , Nature Astronomy (2021). Between 70 and 170 candidates, depending on
        the age assumed for the region.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        S. Dong et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2601.00057">
          A free-floating-planet microlensing event caused by a Saturn-mass
          object
        </InlineLink>
        , Science (2026). The mass is 0.219 (+0.075/−0.046) Jupiter masses, and
        the authors are careful to say &ldquo;unbound or on a very wide
        orbit.&rdquo;
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        P. Mróz et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/1707.07634">
          No large population of unbound or wide-orbit Jupiter-mass planets
        </InlineLink>
        , Nature 548, 183 (2017). The 95% upper limit is 0.25 such planets per
        main-sequence star.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Leiden University,{" "}
        <InlineLink href="https://www.universiteitleiden.nl/en/news/2025/07/large-double-planets-without-a-star-dont-actually-exist">
          Large double planets without a star don&rsquo;t actually exist
        </InlineLink>{" "}
        (July 2025), on S. Portegies Zwart and E. Hochart, &ldquo;Why wide
        Jupiter-mass binary objects cannot form,&rdquo; Nature Astronomy (2025).
        Kevin Luhman&rsquo;s 2024 reanalysis had separately suggested many of
        the pairs are background sources.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        D. S. Abbot and E. R. Switzer,{" "}
        <InlineLink href="https://arxiv.org/abs/1102.1108">
          The Steppenwolf: A proposal for a habitable planet in interstellar
          space
        </InlineLink>
        , ApJL 735, L27 (2011).
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        The Planetary Society,{" "}
        <InlineLink href="https://www.planetary.org/articles/the-nancy-grace-roman-space-telescope-launch">
          The Nancy Grace Roman Space Telescope has launched
        </InlineLink>{" "}
        (August 2026): Falcon Heavy from Kennedy, bound for L2, science
        operations expected from early 2027 after about 90 days of
        commissioning.
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        W. DeRocco et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2505.00092">
          Prospects for Reconstructing the Free-floating Planet Mass Function at
          the Population Level with the Nancy Grace Roman Space Telescope
        </InlineLink>
        , AJ 172, 7 (2026).
      </>
    ),
  },
];

export default function RoguePlanets() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          The shortest event in the MOA survey&rsquo;s nine years of data lasted
          0.057 days. Call it an hour and twenty minutes. For that long, a star
          in the crowded middle of the galaxy got a little brighter and then
          went back to normal, and that blip is, in its entirety, the evidence
          for a planet nobody will ever see.
          <FootnoteLink id={1} /> No light from the planet itself. No host star.
          Just a brief bend in someone else&rsquo;s starlight, caused by a world
          drifting between us and it.
        </p>

        <p>
          Rogue planets are a lovely subject because the romance and the
          statistics pull in opposite directions. The romance says the galaxy is
          full of orphaned Earths sailing through the dark. The statistics say:
          probably, possibly, by a factor of a few in either direction, and we
          cannot yet tell most of them apart from planets on very wide orbits. I
          think both are worth taking seriously. But if you only remember one
          number from this piece, make it the error bar.
        </p>

        <H2>How to lose a planet</H2>

        <p>
          Young planetary systems are not the orderly clockwork of a school
          diagram. They are crowded, and giant planets in them tug on each other
          and on everything smaller. Run that forward for a few million years
          and close encounters become likely. Most end with a nudge. Some end
          with one body flung inward and another thrown out entirely, with more
          than enough speed to escape its star forever. Planet&ndash;planet
          scattering is a slingshot with no one aiming it.
        </p>

        <p>
          Our own solar system almost certainly did this. In 1999 David
          Stevenson pointed out that, during planet formation, some Earth-sized
          embryos would have either collided with Jupiter or passed close enough
          to be ejected from the solar system by its gravity.
          <FootnoteLink id={2} /> Some fraction of the raw material that could
          have been extra rocky planets here is now somewhere out between the
          stars.
        </p>

        <p>
          There is a second, quieter way to make a planet-mass object with no
          star, and it is why &ldquo;orphan&rdquo; is not always the right word.
          Stars form when clouds of gas collapse, and nothing in principle stops
          a small enough clump from collapsing into something planet-sized on
          its own. Those objects were never anyone&rsquo;s children. In 2021 a
          team led by Núria Miret-Roig found between 70 and 170 free-floating
          planet candidates in the young Upper Scorpius and Ophiuchus region, up
          to seven times more than cloud-collapse models predict.
          <FootnoteLink id={3} /> Their reading was that ejection probably
          contributes about as much as collapse, which in turn means
          instabilities that throw out giant planets must be common in the first
          ten million years of a system&rsquo;s life.
        </p>

        <p>
          Note how they were found, too, because it quietly undercuts the other
          half of the hook. Those planets are only a few million years old and
          still warm from formation, glowing in the infrared. They were imaged
          directly. &ldquo;Total darkness&rdquo; is true of an old rogue in
          visible light. A young one is a faint ember, and that ember is how we
          count them.
        </p>

        <H2>Weighing something that doesn&rsquo;t shine</H2>

        <p>
          Old rogues are cold, so direct imaging fails and you need
          gravitational microlensing. The idea comes straight from general
          relativity: mass bends light, so an object passing almost exactly in
          front of a background star acts like a lens and briefly magnifies it.
          The size of the effect is set by the Einstein radius,
        </p>

        <BlockMath math="\theta_E = \sqrt{\frac{4GM}{c^2}\,\frac{D_S - D_L}{D_L\,D_S}}" />

        <p>
          where <InlineMath math="M" /> is the lens mass and{" "}
          <InlineMath math="D_L" />, <InlineMath math="D_S" /> are the distances
          to lens and source. The event lasts as long as it takes the lens to
          drift across that angle, so its duration scales with{" "}
          <InlineMath math="\sqrt{M}" />. That square root does a lot of work. A
          Jupiter-mass lens produces events lasting a day or two. Earth is 318
          times lighter, so divide by about 18 and an Earth-mass lens gives you
          a couple of hours. That is why surveys like OGLE and MOA point at the
          galactic bulge, where the density of background stars is highest, and
          sample it many times a night. A planet&rsquo;s whole signal can come
          and go between two coffee breaks.
        </p>

        <p>
          The catch is that a single light curve cannot separate mass from
          distance and speed. A light, nearby object and a heavier, more distant
          one moving differently can produce the same blip. For years every
          free-floating planet mass was therefore a statistical inference, not a
          measurement. That changed in January 2026, when a team led by Subo
          Dong published an event seen from the ground and from Gaia, more than
          a million kilometres from Earth. Two vantage points see the lensing at
          slightly different times, which is a parallax, which breaks the
          degeneracy. The object came out at about 0.22 Jupiter masses, roughly
          Saturn.
          <FootnoteLink id={4} /> It is the first rogue planet anyone has
          actually weighed. The paper still says unbound <em>or</em> on a very
          wide orbit, because microlensing cannot rule out a star far enough
          away that it never shows up in the light curve.
        </p>

        <H2>
          The real number has an error bar you could drive a galaxy through
        </H2>

        <p>
          So, how many? The best-known figure comes from Sumi and colleagues in
          2023: 21 free-floating or very-wide-orbit planets per star, with an
          uncertainty of +23 and −13, for masses between a third of an Earth and
          about twenty Jupiters.
          <FootnoteLink id={1} /> Put plainly, the range runs from about 8 to 44
          per star. The same analysis has them outnumbering planets in wide
          bound orbits by about nineteen to one, with most of the count at the
          low-mass end.
        </p>

        <p>
          Now multiply. The Milky Way&rsquo;s star count is usually quoted in
          the low hundreds of billions. Take 200 billion as a round number and
          Sumi&rsquo;s range gives somewhere roughly 1.6 to 9 trillion objects.
          So the title is, if anything, too modest &mdash; provided you remember
          that the extrapolation rests on a few short-timescale events in one
          direction of the sky, and a mass function fitted through them.
        </p>

        <p>
          The history here is a good reason for humility. In 2011, an earlier
          MOA analysis suggested Jupiter-mass rogues were nearly twice as common
          as stars, which made headlines. In 2017 Przemek Mróz and the OGLE team
          went back with a sample about six times larger, found no excess of the
          one-to-two-day events that such a population would produce, and set a
          95% upper limit of 0.25 Jupiter-mass rogues per star.
          <FootnoteLink id={5} /> The dramatic number did not survive more data.
          What did survive is the hint of very short events, the Earth-mass
          ones, and that is what the current estimates are built on.
        </p>

        <p>
          The same pattern played out with JWST in Orion. In 2023 JWST images
          turned up forty apparent Jupiter-mass binary objects, pairs of planets
          orbiting each other with no star at all, which would be very hard to
          explain by ejection. Within two years the claim was under heavy fire:
          one reanalysis argued many were background objects, and simulations
          argued such wide pairs could not form in the first place. Nobody yet
          knows what the forty double dots are.
          <FootnoteLink id={6} /> I don&rsquo;t have a horse in this race. I
          just notice that in this field, the extraordinary per-star numbers
          keep shrinking on contact, and the boring short-blip ones keep
          holding.
        </p>

        <H2>An ocean with no sun</H2>

        <p>
          The question everyone actually wants answered is whether any of these
          places could hold liquid water. The surprising answer from the
          theorists is: plausibly yes, without any sunlight at all.
        </p>

        <p>
          Stevenson&rsquo;s 1999 argument goes like this. An Earth-sized embryo
          ejected early might keep a thick envelope of the primordial hydrogen
          it formed in. Without a star, its internal radioactive heat alone
          would leave it radiating like a body at about 30 kelvin. But molecular
          hydrogen under enough pressure absorbs far-infrared light, so a deep
          enough hydrogen blanket traps that trickle of heat the way a
          greenhouse traps sunlight, only more effectively. Under it, the
          surface could sit near Earth-like temperatures, with oceans at
          pressures like those at the bottom of ours. He estimated a body would
          need at least about half an Earth mass to hold such an atmosphere.
          <FootnoteLink id={2} />
        </p>

        <p>
          The other route is the one we already know works in our solar system:
          a lid of ice. Dorian Abbot and Eric Switzer worked out in 2011 what it
          would take for geothermal heat alone to keep an ocean liquid under a
          frozen shell on a rogue planet. With Earth-like composition, about 3.5
          Earth masses. With ten times Earth&rsquo;s water fraction or a thick
          insulating atmosphere, as little as 0.3.
          <FootnoteLink id={7} /> The ice is the insulation. The rock&rsquo;s
          own decaying uranium, thorium and potassium are the furnace.
        </p>

        <p>
          My honest take is that this is good physics and zero data. Both models
          are self-consistent; neither has an observed example, and microlensing
          will never give us one, because a lensing event tells you a mass and
          maybe a distance and then the object is gone forever. Abbot and
          Switzer note you could only characterise such a world if one wandered
          within about a thousand AU of the Sun. The interesting implication is
          the one about life&rsquo;s energy budget. Every habitable-zone
          calculation assumes the energy comes from a star. These models say a
          planet can carry its own, slowly, for billions of years, as long as it
          is wrapped up well enough. That is not evidence that anything lives
          out there. It is a reminder that &ldquo;the habitable zone&rdquo; is a
          statement about one energy source, not about habitability.
        </p>

        <H2>Roman is about to replace the guesswork with a census</H2>

        <p>
          The Nancy Grace Roman Space Telescope lifted off on a Falcon Heavy on
          30 August 2026, bound for the Sun&ndash;Earth L2 point, with science
          operations expected to begin in early 2027.
          <FootnoteLink id={8} /> Among other things, it will stare at the
          galactic bulge from space for months at a stretch, without weather,
          daylight, or the atmosphere smearing the stars together, and catch
          microlensing events that ground surveys miss.
        </p>

        <p>
          The forecasts are specific enough to be falsified, which is the best
          thing a forecast can be. Sumi&rsquo;s mass function predicts Roman
          should find about 988 free-floating planets down to the mass of Mars,
          with the error bar again running from roughly 400 to about 2,800. A
          2026 study by DeRocco and colleagues expects &ldquo;several
          hundred&rdquo; detections, enough to improve abundance estimates by
          orders of magnitude below Earth&rsquo;s mass and tell competing mass
          distributions apart.
          <FootnoteLink id={9} /> If the census lands anywhere near the
          forecast, most of the galaxy&rsquo;s planets don&rsquo;t have suns. If
          it comes in far below, that is the sentence to retract.
        </p>

        <p>
          Either answer changes how ordinary our arrangement looks. We tend to
          picture planets as things that belong to stars, because every planet
          we have ever stood near does. It may turn out that the typical planet
          in the Milky Way is small, cold, a little warm inside, and alone, and
          that a world circling a star in a stable orbit is the exception that
          happened to produce someone to ask.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
