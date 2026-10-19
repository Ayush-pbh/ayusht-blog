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

const post = getPostBySlug("quantum-tunneling-in-biology");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        S. J. Edwards, A. V. Soudackov and S. Hammes-Schiffer,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2880924/">
          Impact of Distal Mutation on Hydrogen Transfer Interface and Substrate
          Conformation in Soybean Lipoxygenase
        </InlineLink>
        , J. Phys. Chem. B 114, 6653 (2010), which gives the wild-type value as
        81 at room temperature, with only modest temperature dependence.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        J. P. Klinman and A. Kohen,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4066974/">
          Hydrogen tunneling links protein dynamics to enzyme catalysis
        </InlineLink>
        , Annual Review of Biochemistry 82 (2013). The semiclassical ceiling,
        the prefactor test, the 3.2 Å versus 0.7 Å gap and the distance-decay
        comparison are all from this review.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        P. J. Hore and H. Mouritsen,{" "}
        <InlineLink href="https://ora.ox.ac.uk/objects/uuid:c1e3c8ca-98b3-4e9d-8efd-0b9ad9b965eb">
          The radical-pair mechanism of magnetoreception
        </InlineLink>
        , Annual Review of Biophysics 45, 299–344 (2016). A tutorial written for
        both biologists and physicists, and careful to call radical pairs the
        leading hypothesis rather than the answer.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        S. Engels et al.,{" "}
        <InlineLink href="https://ora.ox.ac.uk/objects/uuid:5ce377b5-9608-4b88-8f50-3f1476ec6999">
          Anthropogenic electromagnetic noise disrupts magnetic compass
          orientation in a migratory bird
        </InlineLink>
        , Nature 509, 353–356 (2014).
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        J. Xu et al.,{" "}
        <InlineLink href="https://ora.ox.ac.uk/objects/uuid:c1bedca7-c96d-414a-94a2-c9a14aab18fa">
          Magnetic sensitivity of cryptochrome 4 from a migratory songbird
        </InlineLink>
        , Nature 594, 535–540 (2021).
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        Rockefeller University,{" "}
        <InlineLink href="https://www.rockefeller.edu/news/3617-rockefeller-university-scientists-take-on-controversial-and-widely-publicized-vibration-theory-of-smell/">
          Rockefeller University scientists take on controversial and widely
          publicized &quot;vibration theory&quot; of smell
        </InlineLink>{" "}
        (2004), on A. Keller and L. B. Vosshall, Nature Neuroscience 7, 337
        (2004). Then M. I. Franco, L. Turin, A. Mershin and E. M. C. Skoulakis,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3048096/">
          Molecular vibration-sensing component in Drosophila melanogaster
          olfaction
        </InlineLink>
        , PNAS 108, 3797 (2011).
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        E. Block et al.,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4450420/">
          Implausibility of the vibrational theory of olfaction
        </InlineLink>
        , PNAS 112, E2766 (2015). It also summarises the 2013 human study by
        Gane et al. that it was responding to.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        G. S. Engel et al., &quot;Evidence for wavelike energy transfer through
        quantum coherence in photosynthetic systems,&quot; Nature 446, 782–786
        (2007). Then H.-G. Duan et al.,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5559008/">
          Nature does not rely on long-lived electronic quantum coherence for
          photosynthetic energy transfer
        </InlineLink>
        , PNAS 114, 8493 (2017).
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        J. Cao et al.,{" "}
        <InlineLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7124948/">
          Quantum biology revisited
        </InlineLink>
        , Science Advances 6, eaaz4888 (2020). Note the author list: it includes
        several of the people whose spectroscopy built the original case.
      </>
    ),
  },
];

export default function QuantumTunnelingInBiology() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          Replace one hydrogen atom with deuterium, which is the same atom
          carrying one extra neutron, and a particular enzyme in soybeans slows
          down by a factor of about eighty. Not eighty percent. Eighty times.
          Classical chemistry has a perfectly good explanation for why heavier
          isotopes react more slowly, and that explanation runs out of road
          somewhere around seven. The other factor of ten or so is a hydrogen
          nucleus going through a wall instead of over it.
        </p>

        <p>
          That fact is solid, and it is the strongest card quantum biology has.
          The trouble is that it usually gets dealt from the same deck as three
          other claims, about migrating birds, the sense of smell and
          photosynthesis, which are much shakier, and one of which has largely
          collapsed. The headline version folds all four into a single story
          about life secretly exploiting quantum weirdness. I think the useful
          version grades them separately, and the grades are very different.
        </p>

        <p>
          One complaint about the framing first. Nothing here &quot;cheats
          classical physics&quot;. Classical physics was always the
          approximation; the question is only where the approximation stops
          being good enough. Chemistry is quantum mechanics all the way down.
          Every bond in your body is an electron wavefunction. So &quot;is
          biology quantum?&quot; is a non-question. The interesting question is
          narrower: does a specifically quantum effect, one that classical
          intuition gets wrong, change a biological outcome in a way you can
          measure?
        </p>

        <H2>Eighty times slower for one extra neutron</H2>

        <p>
          Tunneling is what happens when a particle finds itself on the far side
          of an energy barrier it did not have the energy to climb. The
          particle&apos;s wavefunction does not stop dead at the wall; it decays
          exponentially inside it, and if the wall is thin enough, some
          amplitude leaks through. The rough WKB estimate of the probability is:
        </p>

        <BlockMath math="T \approx \exp\!\left(-\frac{2d}{\hbar}\sqrt{2m\,(V - E)}\right)" />

        <p>
          The variable that matters is the one inside the square root. Mass{" "}
          <InlineMath math="m" /> sits in the exponent, which is why tunneling
          is a party trick for electrons, routine for hydrogen and fades fast
          for anything heavier. Double the mass, as you do going from hydrogen
          to deuterium, and the exponent grows by a factor of{" "}
          <InlineMath math="\sqrt{2}" />. When the exponent is large, that
          single change can wipe out most of the rate. Tunneling is exquisitely
          sensitive to isotopes. That sensitivity is the fingerprint
          experimentalists look for.
        </p>

        <p>
          The measurement is called a kinetic isotope effect: the rate with
          hydrogen divided by the rate with deuterium. Semiclassical theory,
          which accounts for the fact that a lighter atom sits higher in its
          vibrational well and so has less barrier left to climb, predicts this
          ratio should come in under about 7 at room temperature. Soybean
          lipoxygenase-1, the enzyme from the opening paragraph, has a measured
          value of 81, and it barely changes with temperature.
          <FootnoteLink id={1} />
        </p>

        <p>
          That second detail is the more damning one for the classical picture.
          If the hydrogen were getting over the barrier by thermal energy, a
          warmer enzyme should close the gap between hydrogen and deuterium.
          Instead, in many native enzymes the isotope effect is almost flat
          across temperature, while the reaction itself still speeds up with
          heat. Judith Klinman and Amnon Kohen&apos;s review of the field reads
          this as the signature of a two-step process: slow, temperature
          sensitive protein motions bring the hydrogen donor and acceptor close
          together, and then the hydrogen tunnels across in a step that is
          nearly indifferent to temperature.
          <FootnoteLink id={2} />
        </p>

        <p>
          The geometry is the part I find genuinely beautiful. Crystal
          structures show the donor and acceptor atoms sitting more than 3.2
          ångströms apart. Models of the tunneling step want something closer to
          0.7. The enzyme closes that gap by flexing, sampling conformations
          until it hits one where the hydrogen&apos;s wavefunctions on both
          sides overlap. Hydrogen transfer is far more sensitive to distance
          than electron transfer, by an empirical factor Klinman and Kohen put
          at roughly 23 per ångström against about 1, so a fraction of an
          ångström matters enormously. Seen this way, an enzyme is less a
          lock-and-key than a machine for squeezing a barrier thin.
        </p>

        <p>
          Grade: A. Hydrogen tunneling in enzymes is established, measured
          across many systems, and explains data that nothing classical does.
          The open argument is not whether it happens but how much of an
          enzyme&apos;s overall rate advantage it accounts for, and how tightly
          protein motion is coupled to it. That is a real scientific
          disagreement, not a hype problem.
        </p>

        <H2>The robin&apos;s compass is spin chemistry, not tunneling</H2>

        <p>
          Bird navigation is usually filed under &quot;quantum tunneling in
          biology&quot;, and that is simply the wrong label. The leading
          explanation for the light-dependent magnetic compass of migratory
          songbirds is the radical-pair mechanism, and its quantum ingredient is
          electron spin.
          <FootnoteLink id={3} />
        </p>

        <p>
          The idea runs like this. Light hits a cryptochrome protein in the
          bird&apos;s retina and kicks an electron from one part of the molecule
          to another, leaving two radicals, each with an unpaired electron. The
          two spins start out correlated, and they then oscillate between
          configurations chemists call singlet and triplet. The two
          configurations lead to different chemical products. The oscillation is
          driven mostly by the magnetic nuclei nearby, but the Earth&apos;s
          field nudges it, and how much depends on the molecule&apos;s
          orientation relative to that field. Different orientation, different
          product yield, and in principle a different signal to the brain.
        </p>

        <p>
          The obvious objection is scale. The energy of an electron spin in the
          Earth&apos;s field, roughly 50 microtesla, is about{" "}
          <InlineMath math="\mu_B B \approx 5 \times 10^{-28}" /> joules.
          Thermal energy at body temperature, <InlineMath math="k_B T" />, is
          around <InlineMath math="4 \times 10^{-21}" /> joules, some ten
          million times bigger. Any mechanism that relied on the field shifting
          a thermal equilibrium would be hopeless. The radical-pair mechanism
          dodges this because it never reaches equilibrium. It is a race: the
          spin dynamics play out in the brief window before the radicals react
          or relax, and the field only has to tilt the odds in that window. That
          is a clever escape, and it is also exactly why the spins have to stay
          correlated long enough, which in a warm protein is the hard part.
        </p>

        <p>
          The evidence is suggestive and getting better. In 2014, Henrik
          Mouritsen&apos;s group found that European robins in huts on the
          Oldenburg campus lost their magnetic orientation, and regained it when
          the huts were grounded and screened to cut electromagnetic noise in
          the 50 kHz to 5 MHz range. The tests were double-blind, and adding
          noise back in the screened huts broke the compass again.
          <FootnoteLink id={4} /> The logic, as I understand it, is that noise
          that weak is hard to square with a magnetic-particle sensor and much
          easier to square with fragile spin dynamics. In 2021, a collaboration
          led from Oxford and Oldenburg showed that cryptochrome 4 from the
          robin is magnetically sensitive in the test tube, more so than the
          same protein from chickens and pigeons, neither of which is a night
          migrant, and used targeted mutations to identify four
          flavin-tryptophan radical pairs involved.
          <FootnoteLink id={5} />
        </p>

        <p>
          &quot;In the test tube&quot; is carrying weight in that sentence. No
          one has yet watched this happen inside a living bird&apos;s eye and
          traced the signal to behaviour. Grade: B. A real quantum effect, the
          best candidate mechanism by a wide margin, and still not closed. Also:
          not tunneling.
        </p>

        <H2>The nose that may or may not do spectroscopy</H2>

        <p>
          Smell is where quantum biology gets its most romantic idea, and its
          weakest evidence. The standard theory is shape: an odorant binds to
          receptors whose pockets fit it, in a combinatorial code. The
          alternative, championed by Luca Turin in the 1990s, says receptors
          also read molecular vibrations, using something like inelastic
          electron tunneling spectroscopy. An electron tunnels across the
          receptor only if it can dump exactly the right quantum of energy into
          a vibration of the odorant molecule. Your nose, on this account, is a
          spectrometer.
        </p>

        <p>
          It is a lovely idea and it makes a sharp prediction. Deuterium barely
          changes a molecule&apos;s shape but changes its vibrational
          frequencies a lot. So deuterated and ordinary versions of the same
          odorant should smell different. In 2004 Andreas Keller and Leslie
          Vosshall at Rockefeller ran Turin&apos;s proposed tests on human
          subjects. None of them could tell deuterated acetophenone from the
          ordinary kind, and the other predictions failed too. In 2011 Turin and
          colleagues reported that fruit flies could be trained to tell
          deuterated odorants apart, and even generalised the distinction to an
          unrelated molecule with a vibration near the carbon-deuterium stretch.
          <FootnoteLink id={6} />
        </p>

        <p>
          Then a 2013 study reported that people could discriminate deuterated
          musks, and in 2015 a large team went to the receptor directly. The
          human musk receptor OR5AN1 responded identically to normal and
          deuterated versions of its musk ligands in vitro, as did a mouse thiol
          receptor and several others. They also argued that the proposed
          electron-transfer mechanism would be swamped by vibrations of the
          receptor itself.
          <FootnoteLink id={7} />
        </p>

        <p>
          My read: an animal telling isotopes apart is evidence against a purely
          shape-based model, but it is not evidence for electron tunneling
          specifically. Deuteration changes more than vibrational spectra, and a
          behavioural result sits a long way from a mechanism. The
          receptor-level data cuts against the theory where it should be easiest
          to see. Grade: C, a minority view with an interesting fly result and
          no confirmed mechanism. I would be pleased to be wrong.
        </p>

        <H2>Photosynthesis: the beautiful result that did not survive</H2>

        <p>
          This is the one that made quantum biology famous, and the one where
          honesty matters most. In 2007, Graham Fleming&apos;s group published
          two-dimensional spectroscopy of the Fenna-Matthews-Olson complex, a
          pigment-protein wire in green sulphur bacteria, showing oscillating
          signals they interpreted as long-lived electronic quantum coherence.
          The paper suggested this wavelike transfer could explain the
          system&apos;s efficiency, letting it sample many paths at once to find
          the best one. The measurements were at 77 kelvin, about minus 196 °C.
          <FootnoteLink id={8} /> The story that followed, of plants running
          quantum computations to route sunlight, wrote itself.
        </p>

        <p>
          It did not hold up. In 2017, a team led by R. J. Dwayne Miller
          repeated the measurement on the same complex in water at room
          temperature and found electronic coherence decaying in about 60
          femtoseconds, which is the old, boring, orthodox picture. They
          attributed the longer-lived oscillations to molecular vibrations
          rather than electronic coherence, and concluded there was no hint of a
          functional role.
          <FootnoteLink id={8} /> A 2020 review titled &quot;Quantum biology
          revisited&quot; went further. Its authors, who include several people
          whose experiments built the original case, concluded that the
          coherences between excitons are &quot;too short lived to have any
          functional significance&quot; for energy transfer, and that the
          long-lived signals come from impulsively excited vibrations.
          <FootnoteLink id={9} />
        </p>

        <p>
          I want to be careful not to overcorrect. Quantum mechanics obviously
          matters to photosynthesis. Excitations are delocalised across
          neighbouring pigments, and that delocalisation is quantum. The 2020
          review&apos;s most interesting line of argument is that nature does
          not fight the warm, noisy environment at all. It tunes how the
          excitations couple to that environment, so that dissipation itself
          pushes energy downhill toward the reaction centre. What failed is the
          specific, exciting claim: that long-lived electronic coherence is
          doing functional work. Grade for that claim: it did not pass. Grade
          for the field, for publishing the correction in its own journals with
          its own names on it: excellent.
        </p>

        <H2>Warm and wet is not the same as noisy</H2>

        <p>
          Line the four up and a pattern shows. The claim that survived best,
          enzyme tunneling, is the least exotic: a single light particle
          crossing a fraction of an ångström, a process that needs no long-lived
          coherence between distant parts of a molecule. The claims that
          depended on fragile quantum states persisting in a warm protein are
          the ones that either shrank or stalled. The radical pair is the
          interesting middle case, because it needs spin correlations to last,
          but spins tend to be better shielded from molecular jostling than
          electronic states are, and the mechanism only needs them for the short
          life of the radical pair.
        </p>

        <p>
          That is a more useful heuristic than &quot;life exploits quantum
          weirdness&quot;. Ask what the effect requires to survive, and for how
          long, and whether the biological environment would let it. Short and
          local wins. Long and delocalised mostly loses. And when someone tells
          you biology has figured out how to protect delicate quantum states
          from the heat of a living cell, notice that the most solid example of
          biology using quantum mechanics works the other way round: the enzyme
          uses its thermal motion to set the tunneling up.
        </p>

        <p>
          So yes, some of this is happening inside you right now. Your enzymes
          are moving hydrogen through barriers it cannot climb, and you can
          watch the deuterium slow them down. The rest of the quantum biology
          catalogue deserves a seatbelt.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
