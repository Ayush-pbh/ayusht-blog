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

const post = getPostBySlug("the-ultimate-fate-of-the-cosmos");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Fred Adams &amp; Gregory Laughlin,{" "}
        <InlineLink href="https://arxiv.org/abs/astro-ph/9701131">
          A Dying Universe: The Long Term Fate and Evolution of Astrophysical
          Objects
        </InlineLink>
        , Reviews of Modern Physics 69 (1997). The era boundaries and the
        black-hole evaporation scaling, roughly 10<sup>83</sup> years for a
        million-solar-mass hole and growing as the cube of the mass, are theirs.
        Their proton lifetime of about 10<sup>37</sup> years is an assumption,
        not a measurement.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Robert Caldwell, Marc Kamionkowski &amp; Nevin Weinberg,{" "}
        <InlineLink href="https://arxiv.org/abs/astro-ph/0302506">
          Phantom Energy and Cosmic Doomsday
        </InlineLink>{" "}
        (2003). The 22-billion-year figure is from their text for w =
        &minus;3/2; their table uses slightly different inputs and gives a later
        date. The order of the destruction is the same either way.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        DESI Collaboration,{" "}
        <InlineLink href="https://arxiv.org/abs/2503.14738">
          DESI DR2 Results II: Measurements of Baryon Acoustic Oscillations and
          Cosmological Constraints
        </InlineLink>
        , Phys. Rev. D 112, 083515 (2025).
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        Popovic et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2511.07517">
          The Dark Energy Survey Supernova Program: A Reanalysis of Cosmology
          Results and Evidence for Evolving Dark Energy with an Updated Type Ia
          Supernova Calibration
        </InlineLink>
        , MNRAS (2026).
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        DESI Collaboration,{" "}
        <InlineLink href="https://arxiv.org/abs/2607.27410">
          DESI DR2 Results IV: Alcock-Paczyński Measurements from the Lyman
          Alpha Forest and Cosmological Constraints
        </InlineLink>{" "}
        (July 2026), and the collaboration&rsquo;s own summary,{" "}
        <InlineLink href="https://www.desi.lbl.gov/2026/07/30/new-desi-dr2-lyman-alpha-results-shed-light-on-dark-energy/">
          New DESI DR2 Lyman-alpha Results Shed Light on Dark Energy
        </InlineLink>
        . On the full survey&rsquo;s timing:{" "}
        <InlineLink href="https://www.desi.lbl.gov/2026/04/15/desi-reaches-mapping-milestone-surpassing-expectations/">
          DESI Reaches Mapping Milestone
        </InlineLink>{" "}
        (April 2026).
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Hoang Nhan Luu, Yu-Cheng Qiu &amp; S.-H. Henry Tye,{" "}
        <InlineLink href="https://arxiv.org/abs/2506.24011">
          The Lifespan of our Universe
        </InlineLink>{" "}
        (2025), accepted by JCAP. The 33 billion years is a total lifespan, so
        it counts the 13.8 billion already gone.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Degrassi et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/1205.6497">
          Higgs mass and vacuum stability in the Standard Model at NNLO
        </InlineLink>{" "}
        (2012), which excluded absolute stability at 98% confidence for a Higgs
        lighter than 126 GeV.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        The wall reaches nearly the speed of light almost at once, because the
        energy released by the true vacuum dwarfs the barrier it tunnelled
        through. See{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/False_vacuum">
          &ldquo;False vacuum&rdquo;
        </InlineLink>
        , following Sidney Coleman &amp; Frank De Luccia, &ldquo;Gravitational
        effects on and of vacuum decay&rdquo;, Physical Review D 21, 3305
        (1980).
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        Anders Andreassen, William Frost &amp; Matthew Schwartz,{" "}
        <InlineLink href="https://arxiv.org/abs/1707.08124">
          Scale Invariant Instantons and the Complete Lifetime of the Standard
          Model
        </InlineLink>
        , Phys. Rev. D 97, 056006 (2018). Most of the spread comes from the
        measured top quark mass and the strong coupling constant.
      </>
    ),
  },
];

export default function UltimateFateOfTheCosmos() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          For almost thirty years, the story of how the universe ends has had a
          villain: dark energy, the thing making cosmic expansion speed up. The
          popular version says the acceleration is winning and every ending on
          offer is horrible. The first half of that was the safe bet until the
          last two years of data. Now I think the most interesting fact in
          cosmology is that the acceleration might be easing off. I also think
          &ldquo;horrible&rdquo; is the wrong emotion for all of it.
        </p>

        <p>
          There are three main candidate endings. The universe runs down, it
          gets torn apart, or the vacuum itself collapses into something else.
          What decides between them comes down to two numbers. One describes how
          dark energy behaves as space stretches. The other is the mass of the
          Higgs boson. Both have moved in interesting ways recently.
        </p>

        <H2>The default ending is a very long cooldown</H2>

        <p>
          Start with the boring one, because it&rsquo;s the baseline and
          it&rsquo;s less boring than its name. Heat death is not the universe
          getting hot. It&rsquo;s the universe running out of differences. Every
          useful process, from a star burning to a cell dividing, runs on a
          gradient: something hot next to something cold, something concentrated
          next to something spread out. Entropy is the measure of how far those
          gradients have been used up. Heat death is the state where
          there&rsquo;s nothing left to run downhill.
        </p>

        <p>
          The best map of how we get there is still a 1997 paper by Fred Adams
          and Gregory Laughlin, which splits the future into eras by powers of
          ten.
          <FootnoteLink id={1} /> Stars keep forming and shining until roughly
          10<sup>14</sup> years. Then comes the Degenerate Era, out to about 10
          <sup>30</sup> years, a universe of white dwarfs, neutron stars and
          brown dwarfs slowly cooling. If protons decay, which nobody has seen
          happen, they take ordinary matter with them, and the Black Hole Era
          runs from about 10<sup>38</sup> to 10<sup>100</sup> years. Black holes
          are the last things with any structure, and even they leak away
          through Hawking radiation. A black hole the mass of the Sun takes
          about 10<sup>65</sup> years to evaporate. One as heavy as a whole
          galaxy, 10<sup>11</sup> Suns, takes about 10<sup>98</sup>. After that
          is the Dark Era: photons, neutrinos, a few stray particles and almost
          unimaginable amounts of empty space.
        </p>

        <p>
          Numbers like these stop meaning anything to the human brain at around
          the third exponent, so here&rsquo;s a way to feel them. Squash the
          entire 13.8-billion-year history of the universe so far into a single
          day. On that clock, stars keep shining for about another twenty years.
          The Degenerate Era then lasts about 2 × 10<sup>17</sup> years, ten
          million times longer than the real universe has existed. And the last
          black holes evaporate after about 10<sup>87</sup> years. Even after
          compressing all of cosmic history into one day, the universe&rsquo;s
          remaining lifespan is still a number with no everyday comparison.
        </p>

        <H2>One parameter decides whether it rips</H2>

        <p>
          Heat death assumes dark energy behaves like Einstein&rsquo;s
          cosmological constant: a fixed energy density for every cubic metre of
          space, forever. Cosmologists describe dark energy by its ratio of
          pressure to energy density, a number called <InlineMath math="w" />:
        </p>

        <BlockMath math="p = w\,\rho c^2 \qquad\Rightarrow\qquad \rho \propto a^{-3(1+w)}" />

        <p>
          Here <InlineMath math="a" /> is the scale factor, the size of the
          universe relative to today. The second equation is the one worth
          staring at. Ordinary matter has <InlineMath math="w = 0" />, so its
          density falls as <InlineMath math="a^{-3}" />: double the size, divide
          by eight. Anything with <InlineMath math="w < -1/3" /> speeds up the
          expansion. Exactly <InlineMath math="w = -1" /> makes the exponent
          zero: the density stays the same no matter how much space grows.
          That&rsquo;s the cosmological constant, and it gives a universe that
          accelerates gently forever while everything in it cools off.
        </p>

        <p>
          Now push <InlineMath math="w" /> below &minus;1. The exponent turns
          positive, and the <em>more</em> space expands, the <em>denser</em> the
          dark energy gets. Physicists call this phantom energy, and in 2003
          Robert Caldwell, Marc Kamionkowski and Nevin Weinberg worked out what
          it does.
          <FootnoteLink id={2} /> The density runs away to infinity in a finite
          time, and on the way there it overpowers every force holding anything
          together. They gave a neat approximation for how long we&rsquo;d have:
        </p>

        <BlockMath math="t_{\text{rip}} - t_0 \approx \frac{2}{3}\,|1+w|^{-1}\,H_0^{-1}\,(1-\Omega_m)^{-1/2}" />

        <p>
          Plug in their example of <InlineMath math="w = -3/2" />, a Hubble time{" "}
          <InlineMath math="H_0^{-1}" /> of about 14 billion years, and matter
          making up 30 percent of the total. You get 4/3 × 14 × 1.2, or roughly
          22 billion years. The order of events is what makes the Big Rip
          famous. The Milky Way comes apart about 60 million years before the
          end. The Solar System lets go of its planets about three months
          before. The Earth explodes about half an hour before. Atoms come apart
          in the final 10<sup>&minus;19</sup> of a second.
        </p>

        <p>
          That&rsquo;s the scariest ending, and its whole case rests on one
          inequality: <InlineMath math="w" /> has to stay below &minus;1. So the
          obvious question is what the measurements say.
        </p>

        <H2>DESI says the accelerator may be easing off</H2>

        <p>
          The Dark Energy Spectroscopic Instrument maps the positions of
          galaxies and quasars to measure baryon acoustic oscillations, a frozen
          ripple from the early universe with a known physical size. Seen at
          different distances, it works as a ruler for how the expansion has
          changed over time. In March 2025, using its first three years of data
          on more than 14 million objects, DESI reported something nobody
          expected. A dark energy that changes over time fit better than a
          cosmological constant, at 3.1σ combining DESI with the cosmic
          microwave background. Adding supernova measurements, it rose to
          between 2.8σ and 4.2σ, depending on which supernova catalogue was
          used.
          <FootnoteLink id={3} />
        </p>

        <p>
          The models usually fitted to this write dark energy&rsquo;s behaviour
          as a simple straight-line function of the scale factor:
        </p>

        <BlockMath math="w(a) = w_0 + w_a\,(1 - a)" />

        <p>
          The preferred region has <InlineMath math="w_0 > -1" /> and{" "}
          <InlineMath math="w_a < 0" />. Here&rsquo;s what that means in plain
          terms. Take the fit from the recalibrated Dark Energy Survey
          supernovae combined with DESI and the CMB:{" "}
          <InlineMath math="w_0 = -0.803" />, <InlineMath math="w_a = -0.72" />.
          <FootnoteLink id={4} /> Today, <InlineMath math="w" /> sits above
          &minus;1. In the distant past it was around &minus;1.5, phantom
          territory. Dark energy, on this reading, was once stronger and has
          been weakening. That&rsquo;s the reverse of what a Big Rip needs. If
          it holds, the acceleration isn&rsquo;t winning. It&rsquo;s tiring.
        </p>

        <p>
          Now the caveats, and they&rsquo;re serious. First, 3σ is not
          discovery. Physics uses 5σ for a reason, and 3σ results have a long
          record of fading away. Second, the most dramatic number has already
          come down. The 4.2σ figure came from the Dark Energy Survey&rsquo;s
          five-year supernova sample. When that team recalibrated their data,
          with better cross-calibration against white dwarfs, a retrained
          light-curve model and a fixed numerical approximation, the
          significance dropped to 3.2σ. The authors described the result as
          equivalent to odds of about 5 to 1, and called it only a weak
          preference. Third, in July 2026 DESI published a new analysis of the
          Lyman-alpha forest, the absorption patterns in quasar light. Its
          central value moves <em>back toward</em> the cosmological constant,
          and the preference for evolving dark energy is now 2.7σ with the CMB,
          3.2σ with supernovae too.
          <FootnoteLink id={5} /> The full five-year survey, which already
          counts more than 47 million galaxies and quasars, is due to report on
          dark energy in 2027.
        </p>

        <p>
          And a caveat people skip: <InlineMath math="w_0 + w_a(1-a)" /> is a
          fitting function, not a law of nature. It&rsquo;s a straight line
          drawn through data at redshifts we can see. Taken literally into the
          future, the fit above puts <InlineMath math="w" /> above &minus;1/3 by
          the time the universe has doubled in size, which would switch the
          acceleration off. That&rsquo;s a fun calculation and a meaningless
          forecast. You don&rsquo;t predict the next decade of a stock from a
          line through the last one.
        </p>

        <p>
          Some theorists have gone further anyway. Hoang Nhan Luu, Yu-Cheng Qiu
          and Henry Tye fit the DES and DESI data with a model in which an
          ultralight field sits on top of a <em>negative</em> cosmological
          constant. In that model the expansion eventually reverses into a Big
          Crunch, and their benchmark gives the universe a total lifespan of
          about 33 billion years.
          <FootnoteLink id={6} /> That&rsquo;s one model with loose parameters,
          not a forecast. It still shows how much a few sigma can rearrange the
          options. The ending that sounded most like science fiction, the
          crunch, is back on the table. The ending that sounded most dramatic,
          the rip, is the one the new data push hardest against.
        </p>

        <H2>The ending that needs no dark energy at all</H2>

        <p>
          The third candidate doesn&rsquo;t care about any of this. Vacuum decay
          comes from the Higgs field, and it&rsquo;s the one ending particle
          physics hands you rather than cosmology.
        </p>

        <p>
          The Higgs field has a potential, a curve of energy against field
          strength, and our universe sits in a valley of it. The question is
          whether that valley is the lowest point anywhere, or just a dip on a
          hillside with a deeper valley somewhere at enormous field values. The
          answer depends on how the Higgs self-coupling changes with energy.
          That in turn depends sensitively on two measured masses: the Higgs, at
          about 125 GeV, and the top quark. When the Higgs was found, a 2012
          analysis excluded full stability at 98 percent confidence for Higgs
          masses below 126 GeV.
          <FootnoteLink id={7} /> We appear to live right next to the boundary,
          on the metastable side. Our vacuum isn&rsquo;t the bottom. It&rsquo;s
          a ledge.
        </p>

        <p>
          A ledge can be left by quantum tunnelling. Somewhere, at some moment,
          a small region tunnels into the lower state. It forms a bubble of true
          vacuum, which grows at close to the speed of light and rewrites the
          laws of particle physics inside it.
          <FootnoteLink id={8} /> Nothing could see it coming, because the
          warning would travel no faster than the wall. In 2018 Anders
          Andreassen, William Frost and Matthew Schwartz did what they called
          the first complete calculation of the lifetime. Their answer was 10
          <sup>139</sup> years, with a 95 percent lower bound of 10
          <sup>58</sup>.
          <FootnoteLink id={9} />
        </p>

        <p>
          Two things are worth saying about that. First, it assumes the Standard
          Model holds all the way up to very high energies, with no new
          particles in between. Any new physics could stabilise the vacuum or
          make it worse, and we have no idea which. Second, look at the number.
          10<sup>139</sup> years is 10<sup>39</sup> times longer than the whole
          Black Hole Era. If the estimate is right, vacuum decay isn&rsquo;t the
          thing that ends the universe. It&rsquo;s the thing that cleans up a
          universe that ended long before.
        </p>

        <H2>Terrifying is the wrong word</H2>

        <p>
          Which brings me to the hook I don&rsquo;t accept. I get why these
          endings are pitched as terrifying. Earth exploding half an hour before
          the Rip is a great image. But fear is a response to a threat, and a
          threat needs someone who could plausibly face it. Take even the most
          aggressive scenario on the board, the one current data disfavour. It
          plays out over more than twenty billion years, several times longer
          than the Earth has existed. The others play out on timescales where
          &ldquo;long&rdquo; stops being a useful word.
        </p>

        <p>
          What I actually feel reading this material is closer to vertigo, the
          good kind. A big part of that is the method. We are working out the
          last chapter of everything from the size of a ripple in galaxy
          positions, the brightness of a couple of thousand exploding stars, and
          the mass of one particle, measured at CERN to a fraction of a percent.
          The difference between a gentle fade and a violent rip comes down to
          whether one number sits a little above or below &minus;1. And that
          number moved this year, because someone re-checked a calibration
          against white dwarfs.
        </p>

        <p>
          The real story of 2025 and 2026 isn&rsquo;t that the ending got
          scarier. It&rsquo;s that the ending stopped being settled. For twenty
          years the answer was a cosmological constant and a slow fade, and that
          made a good enough story that it started to feel like fact. Now
          there&rsquo;s a 3σ crack in it that could close up in 2027 or widen
          into the biggest result about dark energy since 1998. I&rsquo;d rather
          live in the universe where that question is open than in one where we
          already knew.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
