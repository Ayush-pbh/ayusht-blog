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

const post = getPostBySlug("quantum-measurement-paradox");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        L. Hackermüller, K. Hornberger, B. Brezger, A. Zeilinger and M. Arndt,{" "}
        <InlineLink href="https://arxiv.org/abs/quant-ph/0402146">
          Decoherence of matter waves by thermal emission of radiation
        </InlineLink>
        , Nature 427, 711–714 (2004). For how big these interfering objects have
        since become, see Shayeghi et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/1910.14538">
          Matter-wave interference of a native polypeptide
        </InlineLink>{" "}
        (2019), which did it with the 15-amino-acid antibiotic gramicidin.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Y.-H. Kim, R. Yu, S. P. Kulik, Y. Shih and M. O. Scully,{" "}
        <InlineLink href="https://arxiv.org/abs/quant-ph/9903047">
          A Delayed Choice Quantum Eraser
        </InlineLink>
        , Phys. Rev. Lett. 84, 1 (2000), based on a 1982 proposal by Scully and
        Drühl. The detector layout and the ~8 ns delay are laid out clearly in
        the{" "}
        <InlineLink href="https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser">
          Wikipedia walk-through
        </InlineLink>
        , which also has a section on why there is no retrocausality.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        Sean Carroll,{" "}
        <InlineLink href="https://www.preposterousuniverse.com/blog/2019/09/21/the-notorious-delayed-choice-quantum-eraser/">
          The Notorious Delayed-Choice Quantum Eraser
        </InlineLink>{" "}
        (2019). The clearest account I have found of where the fringes go when
        you stop sorting.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        V. Jacques et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/quant-ph/0610241">
          Experimental realization of Wheeler&apos;s delayed-choice
          GedankenExperiment
        </InlineLink>
        , Science 315, 966 (2007); X.-S. Ma et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/1206.6578">
          Quantum erasure with causally disconnected choice
        </InlineLink>
        , PNAS 110, 1221 (2013), using a 144 km free-space link.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Stanford Encyclopedia of Philosophy,{" "}
        <InlineLink href="https://plato.stanford.edu/entries/qm-copenhagen/">
          Copenhagen Interpretation of Quantum Mechanics
        </InlineLink>
        . The entry is blunt that mind-induced collapse is not Bohr&apos;s view,
        and that &quot;Copenhagen&quot; was never one doctrine.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Stanford Encyclopedia of Philosophy,{" "}
        <InlineLink href="https://plato.stanford.edu/entries/qm-decoherence/">
          The Role of Decoherence in Quantum Mechanics
        </InlineLink>
        ; and W. H. Zurek,{" "}
        <InlineLink href="https://arxiv.org/abs/quant-ph/0306072">
          Decoherence and the transition from quantum to classical — revisited
        </InlineLink>{" "}
        (2003), an update of his 1991 Physics Today article.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        Stanford Encyclopedia of Philosophy,{" "}
        <InlineLink href="https://plato.stanford.edu/entries/qm-manyworlds/">
          Many-Worlds Interpretation of Quantum Mechanics
        </InlineLink>
        , which gives the probability problem a fair and unresolved hearing.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        B. Hensen et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/1508.05949">
          Experimental loophole-free violation of a Bell inequality using
          entangled electron spins separated by 1.3 km
        </InlineLink>
        , Nature 526, 682–686 (2015).
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        Royal Swedish Academy of Sciences,{" "}
        <InlineLink href="https://www.kva.se/en/news/the-nobel-prize-in-physics-2022/">
          The Nobel Prize in Physics 2022
        </InlineLink>
        , awarded to Alain Aspect, John Clauser and Anton Zeilinger.
      </>
    ),
  },
];

export default function QuantumMeasurementParadox() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          The title of this piece is wrong, and I want to be precise about how,
          because the way it is wrong is more interesting than the way it is
          usually told. Nothing in quantum mechanics waits for a person to look.
          Particles do not check whether a grad student is in the room. But
          after you strip the mysticism off, what remains is not tamer. It is a
          result, tested to the point of a Nobel Prize, that the world does not
          carry around pre-written answers to every question you could ask it.
        </p>

        <p>
          Start with the version everyone has heard. Fire electrons one at a
          time at a wall with two slits. Each one lands as a single dot on the
          screen behind, like a particle. But let thousands accumulate and the
          dots arrange themselves into stripes, the signature of a wave that
          went through both slits and interfered with itself. Now put a detector
          at the slits to see which one each electron used. The stripes vanish.
          You get two plain blobs, one behind each slit.
        </p>

        <p>
          The pop-science gloss is that the electron &quot;knows it is being
          watched.&quot; That sentence has done more damage to public
          understanding of physics than any other I can think of, because it
          smuggles in the one ingredient the experiment never needed: a mind.
        </p>

        <H2>The detector does not need to be awake</H2>

        <p>
          Here is what actually kills the stripes, in one line of algebra. Call
          the part of the electron&apos;s wavefunction that goes through slit A{" "}
          <InlineMath math="\psi_A(x)" /> and the part through slit B{" "}
          <InlineMath math="\psi_B(x)" />. With no detector, the probability of
          landing at position <InlineMath math="x" /> is the squared magnitude
          of their sum, and squaring a sum produces a cross term. The cross term
          is the stripes.
        </p>

        <p>
          Now let the electron interact with something on its way through, a
          stray photon, a gas molecule, a detector. That something ends up in
          state <InlineMath math="|m_A\rangle" /> if the electron took slit A
          and <InlineMath math="|m_B\rangle" /> if it took slit B. The pattern
          on the screen becomes:
        </p>

        <BlockMath math="P(x) = |\psi_A(x)|^2 + |\psi_B(x)|^2 + 2\,\mathrm{Re}\!\left[\psi_A^*(x)\,\psi_B(x)\,\langle m_A | m_B \rangle\right]" />

        <p>
          Everything interesting lives in that last factor,{" "}
          <InlineMath math="\langle m_A | m_B \rangle" />, the overlap between
          the two possible states of whatever the electron touched. If the
          marker ends up the same either way, the overlap is 1 and you get full
          stripes. If the two marker states are perfectly distinguishable, the
          overlap is 0 and the stripes are gone. In between, you get washed-out
          stripes. No observer appears anywhere in the equation. What matters is
          whether the path has been <em>recorded</em> in the physical state of
          anything at all, whether or not anyone ever reads the record.
        </p>

        <p>
          This is decoherence, and it is the most underrated idea in the whole
          conversation. The environment is a relentless note-taker. Air
          molecules bounce off things; things emit heat. Every one of those
          interactions writes a little which-path information into the world,
          and once it is written, interference between the alternatives is
          effectively unrecoverable. A cat is not in a visible superposition of
          alive and dead for the same reason a falling glass does not unshatter.
          It is not forbidden. The bookkeeping is just hopeless.
        </p>

        <p>
          My favourite demonstration of this involves no human witness at all.
          In 2004, Markus Arndt&apos;s group in Vienna sent C70 fullerene
          molecules, little footballs of seventy carbon atoms, through an
          interferometer, and heated them on the way.
          <FootnoteLink id={1} /> A hot molecule glows, emitting thermal
          photons. Each photon carries a faint trace of where the molecule was
          when it left. The hotter the molecules, the more photons, the more the
          fringes faded, in good agreement with decoherence theory. The
          molecules were, in effect, observing themselves by giving off light
          into an empty vacuum chamber. That is all &quot;observation&quot; ever
          meant.
        </p>

        <p>
          And the flip side is just as telling. Keep things isolated enough and
          the stripes come back for objects that have no business being wavy.
          The same group has since shown interference with gramicidin, a natural
          antibiotic built from fifteen amino acids. The line between quantum
          and classical is not a size. It is a question of how loudly a thing is
          talking to its surroundings.
        </p>

        <H2>The eraser that erases nothing in the past</H2>

        <p>
          If decoherence were the whole story, the measurement problem would be
          a footnote. The reason it is not is a family of experiments that look,
          at first glance, like the future reaching back to rewrite the past.
          The most famous is the delayed-choice quantum eraser, run by Kim, Yu,
          Kulik, Shih and Scully and published in 2000.
          <FootnoteLink id={2} />
        </p>

        <p>
          The setup, compressed: a photon passes through a double slit and then
          a crystal splits it into an entangled pair. One photon, the signal,
          goes straight to a screen detector called D0. Its twin, the idler,
          takes a longer route, roughly 2.5 metres longer, so it arrives about
          eight nanoseconds after the signal photon has already landed. On that
          longer route, beam splitters send the idler randomly to one of four
          detectors. If it ends up at D3 or D4, its arrival tells you which slit
          the pair came from. If it ends up at D1 or D2, the paths have been
          mixed so that the which-path information is gone. Erased.
        </p>

        <p>
          Here is the result that launched a thousand YouTube thumbnails. Take
          the signal photons whose twins landed at D1 and plot where they hit
          D0: stripes. Do the same for D2: stripes. For D3 and D4: no stripes.
          The idler&apos;s fate was decided after the signal photon was already
          recorded, so it looks as if a later choice determined whether an
          earlier photon behaved like a wave or a particle.
        </p>

        <p>
          Now look at the raw data at D0 without sorting. There are no stripes.
          There never are. D0 alone shows a featureless smear in every run,
          regardless of what happens to the idlers. The stripes only exist
          inside subsets you can carve out after the fact, by matching each
          signal photon to its twin with a coincidence counter, and to do that
          matching you need the idler records, which arrive by ordinary,
          slower-than-light means.
        </p>

        <p>
          The trick that makes it all consistent is that the two
          &quot;erased&quot; patterns are mirror images. If the D1 subset goes
          as <InlineMath math="1 + \cos\phi(x)" />, the D2 subset goes as{" "}
          <InlineMath math="1 - \cos\phi(x)" />, a half-wave shifted, peaks
          where the other has troughs:
        </p>

        <BlockMath math="P_{D1}(x) + P_{D2}(x) \propto \big(1 + \cos\phi(x)\big) + \big(1 - \cos\phi(x)\big) = 2" />

        <p>
          Add them and the stripes cancel into the same blob you started with.
          Sean Carroll&apos;s write-up of this makes the point well: the
          measurement on the idler is not reaching back and changing anything,
          it is choosing which way to slice an entangled state that was always
          there, and some slicings reveal interference.
          <FootnoteLink id={3} /> If you were standing at D0 trying to receive a
          message from the future, you would see nothing until someone mailed
          you the idler logs. At that point the message has arrived the boring
          way.
        </p>

        <p>
          So the retrocausal reading is simply wrong, and I think it is worth
          being impatient about it. But the experiment still teaches something
          real, and the follow-ups sharpen it. In 2007, a team including Alain
          Aspect realised Wheeler&apos;s original delayed-choice thought
          experiment with single photons, choosing whether to open or close the
          interferometer with a quantum random number generator after the photon
          had already entered. In 2013, Anton Zeilinger&apos;s group ran a
          quantum eraser in which the choice to erase or keep which-path
          information was made 144 kilometres away, in a region no signal from
          the interference measurement could have reached in time.
          <FootnoteLink id={4} />
        </p>

        <p>
          What these experiments kill is not causality. They kill the story
          where the photon, at the slits, &quot;decides&quot; to be a particle
          or a wave and carries that decision forward like a label. There was no
          label. &quot;Which slit did it go through?&quot; is not a fact sitting
          quietly in the past waiting for us to read it. It is a question whose
          answer depends on what else in the experiment gets measured, and how.
        </p>

        <H2>Where consciousness snuck in</H2>

        <p>
          If the physics never needed a mind, how did the mind get into the
          story? Not, as is often claimed, through Niels Bohr. Bohr insisted
          that measuring apparatus be described in classical terms so that
          results could be communicated unambiguously, and he treated the
          wavefunction as a symbolic tool rather than a physical thing that
          could collapse. The idea of consciousness as the final link entered
          through John von Neumann&apos;s formal treatment of measurement, which
          pushed the moment of collapse all the way up to the observer&apos;s
          subjective perception, and later through Eugene Wigner, who explicitly
          proposed that the mind causes it. The &quot;Copenhagen
          interpretation&quot; itself was never one coherent doctrine. The label
          was popularised partly by its critics, and Bohr and Heisenberg never
          fully agreed on it.
          <FootnoteLink id={5} />
        </p>

        <p>
          Decoherence made the consciousness reading look not just unnecessary
          but faintly ridiculous. If a heated molecule decoheres in an empty
          vacuum chamber, the boundary between quantum and classical is clearly
          being drawn by physics, not psychology.
        </p>

        <p>
          But decoherence does not finish the job, and this is the part pop
          accounts almost always skip. Decoherence explains why you never see a
          superposition of measurement outcomes. It does not explain why you see{" "}
          <em>an</em> outcome. After the environment has done its note-taking,
          the electron-plus-detector-plus-room is, according to the Schrödinger
          equation, still one big superposition, just one in which the branches
          can no longer interfere. Why you find yourself in one branch, with one
          dot on the screen, is the measurement problem in its honest, narrowed
          form.
          <FootnoteLink id={6} />
        </p>

        <H2>Choosing which bill to pay</H2>

        <p>
          Every interpretation of quantum mechanics is a way of paying for that
          gap. None of them is free, and I distrust anyone who presents their
          favourite as obviously correct.
        </p>

        <p>
          Copenhagen, in its working-physicist form, refuses the question. The
          wavefunction is a tool for predicting measurement results; asking what
          is &quot;really&quot; happening between measurements is a category
          error. This is honestly how most quantum engineering gets done, and it
          works. The bill is that it never tells you where the cut between
          quantum system and classical apparatus goes, or why there should be
          one.
        </p>

        <p>
          Many-Worlds takes the Schrödinger equation at its word and never
          collapses anything. Every outcome happens; decoherence carves the
          universal wavefunction into branches that cannot see each other, and
          you are in one of them. It is the most economical theory on paper: one
          equation, no special measurement rule. The bill is probability. If
          every outcome occurs, what does it mean to say one outcome has a 70%
          chance? There are serious proposals, built on self-locating
          uncertainty or decision theory, and none is accepted as settled.
          <FootnoteLink id={7} />
        </p>

        <p>
          Pilot-wave theory, from de Broglie and Bohm, says the electron always
          has a definite position and is guided by the wave, so it goes through
          exactly one slit while the wave goes through both. The bill is
          explicit nonlocality: the guiding wave connects distant particles
          instantly, even if that connection cannot be used to send signals.
          Objective-collapse theories such as GRW go the other way and modify
          the Schrödinger equation so that superpositions spontaneously
          collapse, rarely for a single particle and overwhelmingly fast for
          anything macroscopic. The bill is new physics that nobody has yet
          seen, though in fairness, that makes them testable in principle, which
          is more than the others can claim.
        </p>

        <p>
          My own position, for whatever an engineer&apos;s position is worth: I
          find Many-Worlds the most intellectually clean and the least
          satisfying, and pilot-wave the most intuitive and the most suspicious.
          I do not think the experiments currently force a choice, and I think
          that is the actual scandal. Not that reality depends on looking, but
          that a century in, we have a theory that predicts everything we
          measure and still disagree about what it describes.
        </p>

        <H2>The part that really is weird</H2>

        <p>
          If I have spent this whole piece deflating the title, here is where it
          earns some of its keep. There is one result that genuinely says the
          world does not hold definite, local answers to questions before you
          ask them, and it is not the double slit. It is Bell&apos;s theorem.
        </p>

        <p>
          The setup: two entangled particles fly apart. Two experimenters, far
          away from each other, each choose one of two measurement settings at
          random and record a result of +1 or −1. Combine the correlations from
          the four setting pairs into a single number:
        </p>

        <BlockMath math="S = E(a,b) - E(a,b') + E(a',b) + E(a',b')" />

        <p>
          If each particle carried its answers with it from the start, a hidden
          instruction sheet saying &quot;if measured at setting a, say +1&quot;,
          and if neither experimenter&apos;s choice could influence the other
          side in time, then a few lines of arithmetic prove that{" "}
          <InlineMath math="|S| \le 2" />. Quantum mechanics predicts values up
          to <InlineMath math="2\sqrt{2} \approx 2.83" />. There is no
          interpretive wiggle room here. It is a number you measure, and it
          either breaks 2 or it does not.
        </p>

        <p>
          It breaks 2. For decades the experiments had loopholes: detectors that
          missed too many particles, or settings chosen close enough in time
          that a signal could, in principle, have leaked across. In 2015 a team
          at Delft closed both at once, entangling electron spins in diamond 1.3
          kilometres apart, and measured <InlineMath math="S = 2.42 \pm 0.20" />{" "}
          over 245 trials, with a p-value of 0.039.
          <FootnoteLink id={8} /> That is not a huge statistical margin on its
          own, but it sits on top of decades of experiments pointing the same
          way. In 2022 the Nobel committee gave the physics prize to Aspect,
          Clauser and Zeilinger for establishing the violation of Bell
          inequalities with entangled photons.
          <FootnoteLink id={9} />
        </p>

        <p>
          What exactly is ruled out? Local hidden variables: the combination of
          &quot;outcomes are fixed in advance&quot; and &quot;nothing travels
          faster than light.&quot; You can keep one. Pilot-wave theory keeps
          definite values and gives up locality. Many-Worlds keeps locality, on
          most readings, and gives up the idea that a measurement has a single
          outcome. There is also a fringe escape route called superdeterminism,
          which says the experimenters&apos; &quot;random&quot; choices were
          correlated with the particles all along; I find it about as satisfying
          as answering a bug report with &quot;works on my machine.&quot;
        </p>

        <p>
          So the honest version of the title is something like:{" "}
          <em>reality does not come with pre-written local answers</em>. That is
          a stranger claim than &quot;reality waits for us to look,&quot; not a
          weaker one. The looking version flatters us; it makes the observer the
          protagonist. The Bell version is indifferent to us entirely. The
          universe was refusing to hold definite local values long before
          anything evolved eyes, and the fullerenes decohering in Vienna did not
          need anyone in the room.
        </p>

        <p>
          If I could rename one variable in physics, it would be
          &quot;observer&quot;. Call it &quot;anything that ends up correlated
          with the system&quot; and half the paradoxes stop sounding like ghost
          stories. The other half, the Bell half, get more interesting, because
          then you can see that they were never about us.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
