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

const post = getPostBySlug("antimatter-factories");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        The conversion factor is 4.184 × 10⁹ joules per ton of TNT, listed as
        exact in the{" "}
        <InlineLink href="https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8">
          NIST Guide to the SI, Appendix B.8
        </InlineLink>
        . It is a convention, not a measurement of any particular explosive.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        The production rate, the one-extra-particle-per-billion asymmetry, and
        the estimate that antihydrogen traps could in principle hold about
        100,000 atoms all come from CERN&apos;s own explainer,{" "}
        <InlineLink href="https://home.cern/science/physics/antimatter">
          “Antimatter”
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Walter Oelert, who led the team that made the first antihydrogen atoms,
        interviewed by Tomasz Rozek in 2005:{" "}
        <InlineLink href="https://cerncourier.com/a/setting-the-record-straight/">
          “Setting the record straight”
        </InlineLink>
        , CERN Courier. The 10¹²-per-day, 10¹⁶-over-50-years and 10⁻¹⁷ mbar
        figures are his.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        CERN,{" "}
        <InlineLink href="https://home.cern/science/accelerators/antiproton-decelerator">
          “The Antiproton Decelerator”
        </InlineLink>
        , which describes the target, the cooling cycles and ELENA&apos;s
        reduction from 5.3 MeV to 0.1 MeV.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        CERN,{" "}
        <InlineLink href="https://home.cern/science/experiments/base">
          “BASE”
        </InlineLink>
        : a reservoir of typically 50–100 antiprotons kept for months, a 600-day
        trapping record, and proton–antiproton comparisons at 16 parts per
        trillion (charge-to-mass) and 1.5 parts per billion (magnetic moment).
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        CERN,{" "}
        <InlineLink href="https://home.cern/base-experiment-cern-succeeds-transporting-antimatter/">
          “BASE experiment at CERN succeeds in transporting antimatter”
        </InlineLink>
        , 24 March 2026; distance from{" "}
        <InlineLink href="https://www.sciencenews.org/article/antimatter-traveled-truck-delivery-cern">
          Science News
        </InlineLink>
        .
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        CERN,{" "}
        <InlineLink href="https://home.cern/science/experiments/alpha">
          “ALPHA”
        </InlineLink>
        . The 2023 free-fall result is summarised by the{" "}
        <InlineLink href="https://science.ubc.ca/news/does-antimatter-fall-or-down-physicists-observe-first-gravitational-free-fall-antimatter">
          University of British Columbia
        </InlineLink>
        , one of the collaborating institutions.
      </>
    ),
  },
];

export default function AntimatterFactories() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          The usual line about antimatter is that a microgram of it would level
          a city, and that CERN makes the stuff every day, as if a lab outside
          Geneva had a vat of doomsday in the basement. The first half is wrong
          by six orders of magnitude, and the second is technically true while
          giving exactly the wrong impression. You can check both with one
          equation and a calculator. The true story is stranger. Antimatter is
          not dangerous because there is a lot of it. It is hard because there
          is almost none, and keeping even a hundred particles alive for a year
          is one of the finest pieces of engineering humans have pulled off.
        </p>

        <H2>Do the arithmetic on the apocalypse</H2>

        <p>
          When a particle meets its antiparticle, the rest mass of both turns
          into other particles and energy. This is the one place in physics
          where <InlineMath math="E = mc^2" /> runs at full efficiency: all of
          the mass goes, not the tenth of a percent you get from fission. So
          take one microgram of antimatter and let it meet one microgram of
          ordinary matter. Two micrograms of mass disappear:
        </p>

        <BlockMath math="E = mc^2 = (2 \times 10^{-9}\ \text{kg}) \times (3.0 \times 10^{8}\ \text{m/s})^2 \approx 1.8 \times 10^{8}\ \text{J}" />

        <p>
          A ton of TNT is defined as 4.184 × 10⁹ joules.
          <FootnoteLink id={1} /> Divide:
        </p>

        <BlockMath math="\frac{1.8 \times 10^{8}\ \text{J}}{4.184 \times 10^{9}\ \text{J/t}} \approx 0.043\ \text{t} \approx 43\ \text{kg of TNT}" />

        <p>
          Forty-three kilograms. That is a serious bomb, the kind that takes the
          front off a building and kills everyone near it. It is not a
          “localised apocalypse” by any definition I would accept, and it is an
          upper bound: it assumes every joule of the annihilation turns into
          blast, which it would not. To get into nuclear-weapon territory you
          need about a gram, a million times more. The microgram myth is off by
          six orders of magnitude, and the reason it survives is that “mass to
          energy” sounds infinite. It isn&apos;t. <InlineMath math="c^2" /> is
          about 9 × 10¹⁶, which is big, and a microgram is 10⁻⁹ kilograms, which
          is small, and when you multiply them the small one wins by more than
          people expect.
        </p>

        <p>
          So the headline on this piece is wrong in the way most antimatter
          headlines are wrong. A microgram is a bad day. But the more
          interesting correction is that nobody has ever had a microgram, and at
          current rates nobody ever will.
        </p>

        <H2>A factory that produces almost nothing</H2>

        <p>
          CERN does call its antiproton facility the Antimatter Factory, and it
          does run routinely. CERN says it delivers about 400 million
          antiprotons an hour.
          <FootnoteLink id={2} /> That sounds like a lot until you weigh it. An
          antiproton has the same mass as a proton, 1.67 × 10⁻²⁷ kg, so a
          microgram is
        </p>

        <BlockMath math="N = \frac{10^{-9}\ \text{kg}}{1.67 \times 10^{-27}\ \text{kg}} \approx 6 \times 10^{17}\ \text{antiprotons}" />

        <p>and at 4 × 10⁸ an hour, that takes</p>

        <BlockMath math="\frac{6 \times 10^{17}}{4 \times 10^{8}\ \text{h}^{-1}} = 1.5 \times 10^{9}\ \text{hours} \approx 170{,}000\ \text{years}" />

        <p>
          of the machine running without a break. Not a production problem you
          solve with a bigger budget. A production problem you solve with a
          different civilisation.
        </p>

        <p>
          Walter Oelert, who led the team that made the first antihydrogen
          atoms, ran a similar calculation in 2005: around 10¹² antiprotons
          produced a day, about 10¹⁶ over fifty years of operation.
          <FootnoteLink id={3} /> His own figure for the mass was “one millionth
          of a milligram” — a nanogram. When I redo it from his inputs I get
          closer to 17 nanograms (10¹⁶ × 1.67 × 10⁻²⁷ kg). Whichever you take,
          the unit is nanograms, over half a century, and nearly all of it was
          annihilated within minutes of being made, because that is what
          experiments do with it. Annihilate all 17 nanograms at once and you
          get about 3 megajoules, less than a kilogram of TNT. Every antiproton
          CERN has ever made, if you could somehow have kept them in one box,
          would add up to a large firework.
        </p>

        <p>
          Oelert&apos;s other point is the one that kills antimatter as a fuel
          or a weapon: making it costs vastly more energy than you get back. The
          antiprotons come from slamming a proton beam from the Proton
          Synchrotron into a block of metal.
          <FootnoteLink id={4} /> The collisions spray out a zoo of secondary
          particles; a small fraction are antiprotons; a smaller fraction of
          those have the right energy and direction to be caught. Everything
          else is heat in a target. As an energy store, antimatter is a battery
          you charge at an efficiency so low it rounds to zero.
        </p>

        <H2>Slowing down something that wants to go fast</H2>

        <p>
          The antiprotons that come off the target are far too hot to keep. They
          are relativistic, sprayed in a spread of directions and energies, and
          the job of the Antiproton Decelerator — a ring of bending and focusing
          magnets installed in 2000 — is to tame them. It uses electric fields
          to brake the beam, and between braking stages it “cools” it: squeezes
          the spread of energies and the wobble of the trajectories so the beam
          stays tight as it slows. Several rounds of cooling and deceleration
          bring the antiprotons down to about a tenth of light speed.
        </p>

        <p>
          That was still too fast for most experiments, which could catch only a
          sliver of what arrived. ELENA, a 30-metre ring coupled to the AD,
          takes the beam from 5.3 MeV down to 0.1 MeV, a factor of fifty, with
          an electron cooler to keep it dense. CERN says this raises the number
          of antiprotons the experiments can trap by a factor of ten to a
          hundred. I find this the most quietly impressive number in the whole
          chain. Not more antimatter: the same antimatter, wasted less.
        </p>

        <H2>How to hold something that can touch nothing</H2>

        <p>
          Here is the constraint that makes the engineering fun. You cannot put
          antimatter in a container, because the container is matter. You cannot
          let it touch a stray gas molecule, because the gas molecule is matter.
          You have to hold it in empty space with fields alone, and the space
          has to be very, very empty.
        </p>

        <p>
          The obvious idea, an electrostatic bowl, does not work.
          Earnshaw&apos;s theorem says that no arrangement of static electric
          fields has a stable point of equilibrium for a charge in free space:
          if the potential curves up in one direction, it must curve down in
          another. The Penning trap cheats by using two kinds of field at once.
          A strong, uniform magnetic field along the trap&apos;s axis makes a
          charged particle circle instead of drifting outwards, at the cyclotron
          frequency
        </p>

        <BlockMath math="f_c = \frac{qB}{2\pi m}" />

        <p>
          which for an antiproton in a one-tesla field works out to (1.60 ×
          10⁻¹⁹ × 1)/(2π × 1.67 × 10⁻²⁷) ≈ 15 MHz. So the magnet holds the
          particle in the radial plane. Along the axis, where the magnet does
          nothing, a set of electrodes makes a shallow electrostatic saddle that
          pushes the particle back toward the middle. The potential is unstable
          radially, exactly as Earnshaw demands, and the magnetic field turns
          that instability into a slow circular drift. Each half of the trap
          covers for the other&apos;s blind spot.
        </p>

        <p>
          Then the vacuum. Oelert quoted a gas pressure of 10⁻¹⁷ millibar for
          CERN&apos;s antimatter traps. Atmospheric pressure is about 1,000
          millibar, so this is twenty orders of magnitude down. You do not get
          there with better pumps alone. You get there with cold: the trap sits
          at liquid-helium temperatures, where nearly every stray atom that
          touches a wall freezes onto it and stays. The cold wall is the pump.
        </p>

        <p>
          The results are absurd in the best way. The BASE experiment keeps a
          reservoir of typically 50 to 100 antiprotons for months, and CERN
          reports a trapping record of 600 days.
          <FootnoteLink id={5} /> A hundred antiprotons weigh about 1.7 × 10⁻²⁵
          kg. That is the inventory: a handful of particles that have outlived
          most houseplants, in a vacuum twenty orders of magnitude below the air
          in your room, held by a magnet in a cryostat. In March 2026 the team
          took 92 of them, disconnected the trap — a roughly one-tonne package
          of superconducting magnet, liquid helium, vacuum chamber and backup
          power — loaded it on a truck and drove it about eight kilometres
          around the CERN site with the experiment still running.
          <FootnoteLink id={6} /> The magnet has to stay below 8.2 K for the
          entire journey. The reason for the trip is my favourite detail in the
          story: the machines of the Antimatter Factory itself produce magnetic
          noise of around a billionth of a tesla, and that is now the thing
          limiting BASE&apos;s precision. The factory is too loud for its own
          products.
        </p>

        <H2>Why you can&apos;t just keep a bigger jar</H2>

        <p>
          Suppose production were free. Could you fill a Penning trap with a
          microgram? No, and the reason has nothing to do with annihilation. A
          microgram of antiprotons is 6 × 10¹⁷ particles, each with charge −1.6
          × 10⁻¹⁹ coulombs, so about 0.096 coulombs of like charge that very
          much does not want to be in one place. Pack it into a ball one
          centimetre in radius and the electrostatic self-energy is
        </p>

        <BlockMath math="U = \frac{3}{5}\frac{kQ^2}{R} = \frac{3}{5} \cdot \frac{(8.99 \times 10^{9})(0.096)^2}{0.01} \approx 5 \times 10^{9}\ \text{J}" />

        <p>
          That is about 27 times the energy you would get by annihilating it.
          The thing that would blow up first is not the antimatter but the
          charge. Penning traps hold plasmas of charged particles, and a plasma
          has a maximum density set by how hard the magnetic field can push back
          against its own repulsion. Bulk storage of antiprotons is not a bigger
          version of what BASE does. It is a different problem.
        </p>

        <p>
          The way around it is to make the antimatter neutral. Put an antiproton
          together with a positron and you get antihydrogen, which has no net
          charge and so no space-charge problem. But it also has no charge for a
          Penning trap to grab. All you have left is the atom&apos;s tiny
          magnetic moment, which a carefully shaped magnetic field can pull on
          only very weakly, so you can only hold atoms that are already
          extraordinarily cold. CERN&apos;s estimate is that current technology
          could in principle store up to about 100,000 antihydrogen atoms this
          way. That is still around 10⁻¹⁹ grams.
        </p>

        <H2>What a few hundred atoms are for</H2>

        <p>
          None of this is about stockpiling. It is about asking antimatter a
          handful of very precise questions. ALPHA, set up in 2005, mixes
          antiprotons and positrons to make antihydrogen and holds it
          magnetically; in 2011 it kept atoms trapped for over sixteen minutes,
          long enough to start shining lasers and microwaves at them.
          <FootnoteLink id={7} /> In 2023 it stood a trap on its end, slowly
          weakened the magnets at top and bottom, and counted which way the
          atoms escaped. About 80 percent went out of the bottom. Antimatter
          falls down. (If you want the long version of why that question is less
          silly than it sounds, I wrote one about{" "}
          <InlineLink href="/thoughts/gravity-is-not-a-force">
            gravity not being a force
          </InlineLink>
          .) BASE, meanwhile, has measured the antiproton&apos;s charge-to-mass
          ratio against the proton&apos;s to 16 parts per trillion and found
          them the same.
        </p>

        <p>
          Which is the point, and the problem. CERN&apos;s own summary of the
          mystery is that the Big Bang should have produced matter and
          antimatter in equal amounts, and that what we live in is the leftover
          of an imbalance of about one extra particle per billion. Everything
          you have ever touched is that rounding error. The matter–antimatter
          differences physicists have actually measured, in the decays of
          certain mesons and baryons, are real but far too small to account for
          it, so the search moves to the places where no one has looked
          carefully enough. Antihydrogen is the cleanest of these: if its
          spectrum, its magnetism or its falling differs from hydrogen&apos;s at
          the tenth decimal place, that is a crack in physics.
        </p>

        <p>
          So far, no crack. I find that more interesting than any number of
          imaginary bombs. The real antimatter story is a factory that makes
          nanograms per lifetime, decelerates them with absurd care, holds a
          hundred of them for more than a year in a near-perfect vacuum, and
          drives them around on a truck because its own hum is too loud — all to
          check whether the universe made a bookkeeping error. It probably did.
          We just haven&apos;t found the line.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
