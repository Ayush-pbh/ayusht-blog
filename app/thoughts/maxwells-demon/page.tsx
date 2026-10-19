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

const post = getPostBySlug("maxwells-demon");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        A good modern history and review is Juan M. R. Parrondo,{" "}
        <InlineLink href="https://arxiv.org/abs/2306.12447">
          “Thermodynamics of Information”
        </InlineLink>{" "}
        (2023), which starts from Maxwell&apos;s 1867 thought experiment and
        works forward to the non-equilibrium treatment used today.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Rolf Landauer, “Irreversibility and Heat Generation in the Computing
        Process”, IBM Journal of Research and Development 5, 183–191 (1961). His
        own phrasing was a heat generation “of the order of kT” per irreversible
        function; the ln 2 is the precise version for one bit.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Charles H. Bennett,{" "}
        <InlineLink href="https://arxiv.org/abs/physics/0210005">
          “Notes on Landauer&apos;s principle, Reversible Computation and
          Maxwell&apos;s Demon”
        </InlineLink>
        , Studies in History and Philosophy of Modern Physics 34 (2003). He
        answers the critics directly and concedes the principle is, in essence,
        a restatement of the second law.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        A. Bérut et al., “Experimental verification of Landauer&apos;s principle
        linking information and thermodynamics”, Nature 483, 187–189 (2012). The
        bead size, trap and the fit ⟨Q⟩ = ln 2 + B/τ with B ≈ 8.15 kT·s are from
        the authors&apos; longer write-up,{" "}
        <InlineLink href="https://ar5iv.labs.arxiv.org/html/1503.06537">
          “Information and thermodynamics: experimental verification of
          Landauer&apos;s erasure principle”
        </InlineLink>{" "}
        (Bérut, Petrosyan and Ciliberto, 2015).
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        J. V. Koski, V. F. Maisi, J. P. Pekola and D. V. Averin,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4183300">
          “Experimental realization of a Szilard engine with a single electron”
        </InlineLink>
        , PNAS 111, 13786 (2014).
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        J. Hong, B. Lambson, S. Dhuey and J. Bokor,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4795654">
          “Experimental test of Landauer&apos;s principle in single-bit
          operations on nanomagnetic memory bits”
        </InlineLink>
        , Science Advances 2, e1501492 (2016).
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Anson Ho, Ege Erdil and Tamay Besiroglu,{" "}
        <InlineLink href="https://arxiv.org/html/2312.08595">
          “Limits to the Energy Efficiency of CMOS Microprocessors”
        </InlineLink>{" "}
        (2023), Table I. The authors note the figures vary with hardware and
        task; the ratios to kT ln 2 are my arithmetic.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        Michael P. Frank,{" "}
        <InlineLink href="https://arxiv.org/abs/1803.02789">
          “Back to the Future: The Case for Reversible Computing”
        </InlineLink>{" "}
        (2018).
      </>
    ),
  },
];

export default function MaxwellsDemon() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          Deleting a bit has a price, paid in heat, and the price is set by the
          temperature of the room. At 300 kelvin it is about 2.9 × 10⁻²¹ joules
          per bit. Nobody chose that number. It falls out of the second law of
          thermodynamics, it has been measured on a glass bead and a single
          electron and a nanomagnet, and it is the reason a nineteenth-century
          thought experiment about a tiny doorman took a hundred years to
          resolve. It is also a number your laptop exceeds by somewhere between
          four and nine orders of magnitude, which is the part of the story I
          think gets told least honestly.
        </p>

        <H2>A doorman who breaks the second law</H2>

        <p>
          In 1867 James Clerk Maxwell, in a letter to his friend Peter Tait,
          described a way to beat the second law.
          <FootnoteLink id={1} /> Take a box of gas at one temperature and put a
          wall down the middle with a small door. Station a “finite being” at
          the door — Maxwell&apos;s phrase; Kelvin later called it a demon — who
          watches the molecules coming. Fast ones heading left, open the door.
          Slow ones heading right, open the door. Everything else, keep it shut.
          After a while the left side is hot and the right side is cold, and you
          can run a heat engine off the difference. No work has been done on the
          gas. The door is frictionless. Entropy has gone down.
        </p>

        <p>
          The second law is the most trusted statement in physics, so everyone
          assumed there was a catch, and the history of the next century is a
          series of people locating it in the wrong place. One early,
          influential answer was that the demon has to see the molecules, seeing
          means bouncing light off them, and the light costs energy. That turns
          out to be a fact about one way of measuring, not a law. The real catch
          is subtler and much stranger. It is not in looking. It is in
          forgetting.
        </p>

        <H2>One molecule, one bit, one piston</H2>

        <p>
          Leo Szilard stripped the problem down in 1929. Forget a whole gas;
          take one molecule in a box at temperature <InlineMath math="T" />.
          Slide a partition into the middle. The molecule is now on the left or
          on the right — one bit of information, if you look. Once you know
          which side, turn the partition into a piston and let the molecule push
          it outward, isothermally, drawing heat from the surroundings, until it
          fills the whole box again. The work it does is the ideal-gas integral
          for one molecule:
        </p>

        <BlockMath math="W = \int_{V/2}^{V} \frac{kT}{V'}\,dV' = kT \ln 2" />

        <p>
          Then repeat. Each cycle turns <InlineMath math="kT \ln 2" /> of heat
          from a single reservoir into work, which is exactly what the second
          law forbids. The only thing you spent was one bit of knowledge per
          cycle. Szilard&apos;s engine is the demon reduced to its accounting:
          one bit is worth <InlineMath math="kT \ln 2" /> of work, at most, and
          if the bit is free, so is the energy.
        </p>

        <p>
          This is the first place where I find the subject genuinely
          disorienting. The ln 2 is not a coincidence or a fudge. It is the
          logarithm of the number of possibilities you ruled out by looking.
          Knowledge of which half of a box a molecule is in has a definite
          exchange rate with joules, and that rate is set by nothing but
          temperature.
        </p>

        <H2>The bill comes due when you forget</H2>

        <p>
          The resolution took two people and about twenty years. In 1961 Rolf
          Landauer, at IBM, argued that any logically irreversible operation —
          one where you cannot reconstruct the input from the output — must dump
          a minimum amount of heat into the environment.
          <FootnoteLink id={2} /> The canonical example is erasure: “reset this
          bit to 0, whatever it was”. Before, the bit could have been in two
          states; after, it is in one. Its entropy has dropped by{" "}
          <InlineMath math="k \ln 2" />. The second law says total entropy
          cannot fall, so at least that much has to go somewhere else, and for a
          memory in contact with surroundings at temperature{" "}
          <InlineMath math="T" />, that means heat:
        </p>

        <BlockMath math="Q \geq kT \ln 2 = (1.38 \times 10^{-23}\ \text{J/K})(300\ \text{K})(0.693) \approx 2.9 \times 10^{-21}\ \text{J}" />

        <p>
          That is about 0.018 electronvolts. In 1982 Charles Bennett used this
          to put the demon away.
          <FootnoteLink id={3} /> He showed that the measurement step can, in
          principle, be done reversibly, with no minimum cost at all — which is
          why the light-costs-energy story was a red herring. But a demon that
          keeps sorting must keep recording, and a finite memory fills up. To
          carry on, it has to erase old records, and each erasure pays at least{" "}
          <InlineMath math="kT \ln 2" />, exactly cancelling the work Szilard
          extracted. The second law survives. The demon does not get caught
          looking. It gets caught clearing its cache.
        </p>

        <p>
          I want to be honest about the status of this, because the clean
          version is usually presented as more settled than it is.
          Landauer&apos;s principle has had serious critics, mainly philosophers
          of physics who argue the standard derivations either assume what they
          set out to prove or are trivially true. Bennett&apos;s own response
          concedes that the principle is, at bottom, a restatement of the second
          law and defends it on the grounds that it is a useful one. I think he
          is right, and I also think “restatement of the second law” is a more
          accurate tagline than the breathless “information is physical”, which
          tends to suggest that every act of knowing has a price. It does not.
          Measuring can be free. Copying onto a blank can be free. The
          unavoidable cost is in destroying the distinction between two states.
        </p>

        <H2>Weighing a single bit</H2>

        <p>
          For decades this was all on paper, because 10⁻²¹ joules is far too
          small to measure in anything resembling a computer. Then experimenters
          built memories that were nothing but the bit.
        </p>

        <p>
          In 2012 Antoine Bérut and colleagues trapped a single silica bead, two
          micrometres across, in water, in a double-well potential made by
          flicking a laser between two spots about a micrometre apart.
          <FootnoteLink id={4} /> Left well is 0, right well is 1. To erase,
          they lowered the barrier between the wells, gently pushed the bead
          toward one side by tilting the potential, and raised the barrier
          again, so that whatever its starting state, it ended in the same well.
          Tracking the bead&apos;s position let them compute the heat
          dissipated, trajectory by trajectory. The average approached{" "}
          <InlineMath math="kT \ln 2" /> as the erasure was done more slowly,
          and their data fitted
        </p>

        <BlockMath math="\langle Q \rangle \approx kT\left(\ln 2 + \frac{B}{\tau}\right), \quad B \approx 8.15\ \text{s}" />

        <p>
          where <InlineMath math="\tau" /> is how long the erasure took. Put in
          numbers and you can see the speed tax. At{" "}
          <InlineMath math="\tau = 5" /> s the expected heat is about 0.69 +
          1.63 ≈ 2.3 kT, more than three times the floor. At 40 s it is 0.69 +
          0.20 ≈ 0.9 kT. The Landauer limit is only reached in the limit of
          infinitely slow operation. Fast forgetting costs extra, and this bead,
          which takes seconds to forget one bit, is still paying a visible
          premium.
        </p>

        <p>
          The inverse experiment — getting work out of information — came in
          2014, when Jonne Koski and colleagues in Finland built a Szilard
          engine out of a single electron in a tiny metal box at around 0.1
          kelvin.
          <FootnoteLink id={5} /> Measuring where the electron sat and adjusting
          a voltage in response, they extracted an average of about 0.75{" "}
          <InlineMath math="kT \ln 2" /> per cycle. At 0.1 K, that is under
          10⁻²⁴ joules. A demon, built on purpose, running at three-quarters
          efficiency.
        </p>

        <p>
          And in 2016 a Berkeley group did it with something closer to real
          storage: nanomagnets, the same physics as a hard-drive bit, reset at
          room temperature.
          <FootnoteLink id={6} /> They measured (4.2 ± 0.9) zeptojoules
          dissipated, about (1.0 ± 0.22) kT, against a Landauer limit of 2.8 zJ,
          and reported it as consistent with the bound within their
          uncertainties. That is the minimum price, paid on a bit you could
          plausibly build a memory out of.
        </p>

        <H2>Your laptop is not paying the Landauer price</H2>

        <p>
          Here is where the popular version goes wrong. Landauer&apos;s limit is
          often mentioned as if it were the reason computers get hot, or the
          wall chips are about to hit. Neither is close to true. Take the
          figures from a 2023 survey of CMOS energy costs and divide each by 2.9
          × 10⁻²¹ J:
          <FootnoteLink id={7} />
        </p>

        <BlockMath math="\begin{aligned} \text{switching a CMOS gate } (10^{-16}\text{–}10^{-13}\ \text{J}) &\approx 3\times10^{4}\text{–}3\times10^{7}\ kT\ln 2 \\ \text{one fp16 operation } (1.5\times10^{-13}\ \text{J}) &\approx 5\times10^{7}\ kT\ln 2 \\ \text{one bit of DRAM access } (5\times10^{-12}\ \text{J}) &\approx 2\times10^{9}\ kT\ln 2 \end{aligned}" />

        <p>
          Real hardware sits four to nine orders of magnitude above the floor,
          depending on what you count. For scale: at the Landauer limit, wiping
          an entire terabyte, 8 × 10¹² bits, would cost about 2 × 10⁻⁸ joules.
          Reading about 600 bytes out of DRAM costs more than that.
        </p>

        <p>
          More to the point, almost none of a chip&apos;s heat is the Landauer
          cost at all. A CMOS gate dissipates energy because it charges and
          discharges the capacitance of its transistors and wires every time it
          switches, and that loss happens whether or not the operation is
          logically reversible. An inverter, which loses no information, heats
          up roughly as much as an AND gate, which does. Wires are worse than
          logic: on the same table, moving a bit across a chip costs more than
          switching a gate. The heat coming off your GPU is overwhelmingly the
          cost of shoving charge around quickly, not the thermodynamic price of
          forgetting.
        </p>

        <p>
          So Landauer&apos;s principle is a floor, not a forecast. The same
          survey estimates that conventional CMOS has maybe a couple of
          hundred-fold efficiency left before it hits its own practical limits,
          and those limits sit well above <InlineMath math="kT \ln 2" />,
          because reliable bits need energy barriers tall enough that heat does
          not flip them at random. Getting down to the true floor would require
          computing reversibly, never discarding information, and doing it
          slowly — which is what the reversible-computing people have argued for
          decades.
          <FootnoteLink id={8} /> It is a real research programme. It is not
          what is in your pocket.
        </p>

        <p>
          None of that makes the principle less remarkable. A thought experiment
          about sorting molecules, a one-molecule engine, and an argument about
          resetting memory converge on a single expression,{" "}
          <InlineMath math="kT \ln 2" />, and then a glass bead in a laser beam
          confirms it to within error bars. What I would push back on is the
          idea that the number explains anything about the machines we use. It
          tells you that forgetting can never be free. It says almost nothing
          about why forgetting, in practice, is a hundred million times more
          expensive than it needs to be. That gap is an engineering problem, and
          a much more interesting one than the demon.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
