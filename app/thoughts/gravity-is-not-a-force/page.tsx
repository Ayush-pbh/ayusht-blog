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

const post = getPostBySlug("gravity-is-not-a-force");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content: (
      <>
        Markus Pössel,{" "}
        <InlineLink href="https://www.einstein-online.info/en/spotlight/equivalence_principle/">
          “The elevator, the rocket, and gravity: the equivalence principle”
        </InlineLink>
        , Einstein Online (Max Planck Institute for Gravitational Physics). It
        is the clearest short treatment I know of, including the point that the
        principle holds exactly only in a vanishingly small region.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        P. Touboul et al.,{" "}
        <InlineLink href="https://arxiv.org/abs/2209.15487v1">
          “MICROSCOPE mission: final results of the test of the Equivalence
          Principle”
        </InlineLink>
        , Physical Review Letters 129, 121102 (2022). The Eötvös parameter for
        the titanium–platinum pair came out at [−1.5 ± 2.3 (stat) ± 1.5 (syst)]
        × 10⁻¹⁵.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        The weak-field limit is in any GR textbook; two free versions are Sean
        Carroll&apos;s{" "}
        <InlineLink href="https://arxiv.org/abs/gr-qc/9712019">
          Lecture Notes on General Relativity
        </InlineLink>{" "}
        (chapter 4) and Viktor Toth&apos;s short note{" "}
        <InlineLink href="https://www.vttoth.com/CMS/physics-notes/312-the-newtonian-limit-in-general-relativity">
          “The Newtonian limit in general relativity”
        </InlineLink>
        . Sign conventions differ between them; the physics does not.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        <InlineLink href="https://physics.aps.org/story/v16/st1">
          “The Weight of Light”
        </InlineLink>
        , Physical Review Focus 16, 1 (2005), on Pound and Rebka&apos;s 1960
        result: within 10 percent of Einstein&apos;s prediction, improved to
        about one percent by 1964.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        Pratap Misra,{" "}
        <InlineLink href="https://www.gpsworld.com/inside-the-box-gps-and-relativity/">
          “Inside the box: GPS and relativity”
        </InlineLink>
        , GPS World (2023). The satellite clocks are set to 10.22999999543 MHz
        before launch so that, seen from the ground, they tick at 10.23 MHz.
      </>
    ),
  },
];

export default function GravityIsNotAForce() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          The pressure you feel on the soles of your feet right now is not
          gravity. It is the floor. Specifically, it is electrons in the floor
          repelling electrons in your shoes, hard enough to push you off the
          path you would otherwise be following through spacetime. General
          relativity says that path — the one you would take if the floor
          vanished — is the natural, unforced one. Falling is what it feels like
          to have no forces on you at all. Standing still is what it feels like
          to be shoved.
        </p>

        <p>
          That is the real content of the slogan “gravity is not a force”, and
          it is a deep idea that the usual picture actively hides. So let me
          start by taking the picture apart.
        </p>

        <H2>The trampoline explains gravity with gravity</H2>

        <p>
          You know the image: a bowling ball sits on a stretched rubber sheet,
          the sheet dips, and a marble rolled past curves in toward the ball.
          Spacetime is curved by mass, the story goes, and things roll along the
          curve.
        </p>

        <p>
          Ask why the marble rolls downhill. Because something is pulling it
          down, toward the floor of the room the trampoline is in. The
          demonstration works only because Earth&apos;s gravity is acting on the
          sheet and the marble. It explains gravity by quietly assuming gravity.
          That alone should disqualify it.
        </p>

        <p>
          The second problem is worse, because it is not a flaw in the prop but
          in the idea it conveys. The sheet is a picture of curved{" "}
          <em>space</em>. Put a marble on it at rest, far enough from any slope,
          and it stays put. But release an apple at rest above the ground and it
          falls. Something has to get a stationary object moving, and curved
          space cannot do that, because a stationary object is not going
          anywhere through space. It is, however, going somewhere through time —
          one second per second, whether it likes it or not. If spacetime is
          curved in the time direction, then an object moving purely through
          time gets tipped, slightly, into moving through space. That tipping is
          the apple falling.
        </p>

        <p>
          So the trampoline leaves out the time part, and for slow objects the
          time part is very nearly the whole thing. I will put a number on “very
          nearly” below. First, the principle that makes all of this possible.
        </p>

        <H2>Falling is what free looks like</H2>

        <p>
          Picture yourself in a windowless lift whose cable has snapped. You let
          go of a pen and it floats beside you. Everything in the lift falls at
          the same rate, so nothing moves relative to anything else, and no
          experiment you can do in that small box tells you that you are near a
          planet at all. Picture the reverse: the same box at rest in deep
          space, pushed by a rocket at 9.81 m/s². The pen falls to the floor
          just as it would on Earth. Gravity and acceleration are, locally,
          indistinguishable.
          <FootnoteLink id={1} />
        </p>

        <p>
          This only works because everything falls the same way regardless of
          what it is made of. That is a checkable fact, not a philosophical
          stance, and it has been checked brutally. The MICROSCOPE satellite
          dropped titanium and platinum test masses around Earth for two and a
          half years, and found their accelerations agreed to around one part in
          10¹⁵.
          <FootnoteLink id={2} /> Contrast electricity: put a proton and an
          electron in the same electric field and they accelerate in opposite
          directions, at rates differing by a factor of nearly two thousand. The
          electric field acts on things according to their charge. Gravity acts
          on everything according to nothing. Its effect depends only on where
          you are and how fast you are going.
        </p>

        <p>
          When an effect depends only on where you are and how you are moving,
          it is a property of the place, not a push on the thing. Einstein took
          that seriously: if every free body follows the same path from the same
          starting point, then the paths are a feature of spacetime itself.
          Those paths are geodesics — the straightest possible lines in a curved
          geometry, the way great circles are the straightest lines on a globe.
          A body with no forces on it follows one:
        </p>

        <BlockMath math="\frac{d^2 x^\mu}{d\tau^2} + \Gamma^\mu_{\alpha\beta}\,\frac{dx^\alpha}{d\tau}\frac{dx^\beta}{d\tau} = 0" />

        <p>
          Read this as “zero acceleration, measured properly”. The first term is
          what you would naively call acceleration; the second, built from the
          Christoffel symbols <InlineMath math="\Gamma" />, corrects for the
          fact that your coordinates are themselves curving. There is no mass on
          the right-hand side and no force. An accelerometer strapped to a body
          on a geodesic reads zero, which is precisely what an astronaut in
          orbit experiences. The ISS is not out of Earth&apos;s gravity; at its
          altitude gravity is still about nine-tenths of what it is on the
          ground. Its crew is weightless because nothing is stopping them from
          falling.
        </p>

        <H2>Most of gravity is time</H2>

        <p>
          The geometry lives in the metric, the rule that turns coordinate
          differences into real intervals of time and distance. Far from any
          black hole, for a weak, slowly changing field like Earth&apos;s, it
          looks like this:
        </p>

        <BlockMath math="ds^2 = -\left(1 + \frac{2\Phi}{c^2}\right)c^2\,dt^2 + \left(1 - \frac{2\Phi}{c^2}\right)\left(dx^2 + dy^2 + dz^2\right)" />

        <p>
          where <InlineMath math="\Phi" /> is exactly the Newtonian
          gravitational potential, <InlineMath math="-GM/r" />. The first term
          says clocks lower in the potential run slower. The second says rulers
          are slightly distorted too. Now feed this into the geodesic equation
          for an object moving slowly, with speed <InlineMath math="v \ll c" />.
          Almost every term drops out, because the object moves through time at
          essentially <InlineMath math="c" /> and through space at a crawl. What
          survives is the piece that comes from the time–time part of the
          metric:
          <FootnoteLink id={3} />
        </p>

        <BlockMath math="\frac{d^2 x^i}{dt^2} \approx -\frac{c^2}{2}\,\partial_i\!\left(\frac{2\Phi}{c^2}\right) = -\partial_i \Phi" />

        <p>
          That is Newton&apos;s law of gravity, recovered with no force in
          sight, purely from the way the rate of time changes with height. The
          spatial part of the curvature does contribute, but suppressed by a
          factor of about <InlineMath math="(v/c)^2" />. For a ball thrown at 10
          m/s, that is{" "}
          <InlineMath math="(10 / 3\times10^8)^2 \approx 10^{-15}" />. So when
          you throw a ball and watch it arc, you are watching, to fifteen
          decimal places, the curvature of time.
        </p>

        <p>And the curvature of time is tiny. At Earth&apos;s surface,</p>

        <BlockMath math="\frac{2\Phi}{c^2} = \frac{2GM}{Rc^2} = \frac{2 \times 3.99\times10^{14}}{6.37\times10^{6} \times 8.99\times10^{16}} \approx 1.4 \times 10^{-9}" />

        <p>
          A clock on the ground runs slow, relative to one far away, by about
          seven parts in ten billion. That small slope in the rate of time,
          spread over the height of a room, is enough to pull everything you own
          toward the floor at 9.8 m/s². There is a reason the effect is so
          powerful despite being so small: you are moving through time very,
          very fast. A second of time is 300,000 km of spacetime in the units
          that matter, and a slight tilt over that distance becomes a large
          sideways drift.
        </p>

        <p>
          The slope has been measured directly. In 1959 Robert Pound and Glen
          Rebka sent gamma rays down a tower at Harvard about 22.5 m tall and
          detected the frequency shift between top and bottom.
          <FootnoteLink id={4} /> The predicted shift is
        </p>

        <BlockMath math="\frac{\Delta f}{f} = \frac{gh}{c^2} = \frac{9.81 \times 22.5}{8.99 \times 10^{16}} \approx 2.5 \times 10^{-15}" />

        <p>
          and they found it, first to ten percent, later to one. You also rely
          on the effect every time you open a map. GPS satellite clocks, higher
          in Earth&apos;s potential, gain about 45 microseconds a day from
          gravity and lose about 7 from their orbital speed, for a net gain of
          about 38.
          <FootnoteLink id={5} /> Light travels about 11 km in 38 microseconds.
          Without correction, the system&apos;s ranging would drift by
          kilometres a day.
        </p>

        <p>
          Where the trampoline&apos;s spatial curvature does matter is for
          things that move fast. Light, crossing space at{" "}
          <InlineMath math="c" />, feels the space part as strongly as the time
          part. Einstein&apos;s 1911 calculation of starlight bending past the
          Sun, done before he had the full theory, effectively included only the
          time part and came out at half the value general relativity gives. So
          the sheet is not wrong; it is the minor half of the story, presented
          as the whole of it, for the one case — slow things like apples,
          planets and you — where it matters least.
        </p>

        <H2>What is left when you fall: tides</H2>

        <p>
          If falling feels like nothing, how can a freely falling observer ever
          detect gravity? Not with one particle. With two.
        </p>

        <p>
          Go back to the snapped lift and hold two pens, one above the other.
          Each follows its own geodesic toward Earth&apos;s centre, and the
          lower one is slightly deeper in the field, so it accelerates slightly
          more. The pens drift apart vertically. Hold them side by side instead
          and their geodesics both point at the centre of the Earth, which means
          they converge. Stretched in one direction, squeezed in the other. That
          is a tide, and it is the one gravitational effect you cannot make
          disappear by choosing to fall. General relativity calls it geodesic
          deviation, and it is governed by the Riemann curvature tensor:
        </p>

        <BlockMath math="\frac{D^2 \xi^\mu}{d\tau^2} = -R^\mu{}_{\nu\rho\sigma}\,u^\nu \xi^\rho u^\sigma" />

        <p>
          Here <InlineMath math="\xi" /> is the separation between neighbouring
          geodesics and <InlineMath math="u" /> is their shared velocity. In the
          Newtonian limit this collapses to something familiar, the second
          derivatives of the potential:
        </p>

        <BlockMath math="\frac{d^2 \xi^i}{dt^2} \approx -\frac{\partial^2 \Phi}{\partial x^i \partial x^j}\,\xi^j" />

        <p>
          This is the right way to say what curvature is. Not a dip in a sheet,
          but the rate at which initially parallel free-fall paths come together
          or spread apart. The Christoffel symbols in the geodesic equation, the
          bits that produce the “force” of gravity, can be set to zero at any
          single point by choosing a falling frame. The Riemann tensor cannot.
          It is the part of gravity that is real in every frame.
        </p>

        <p>
          It is also small enough near Earth to be almost comic. Along the
          vertical, the tidal stretch is <InlineMath math="2GM/r^3" /> per metre
          of separation:
        </p>

        <BlockMath math="\frac{2GM}{R^3} = \frac{2 \times 3.99\times10^{14}}{(6.37\times10^{6})^3} \approx 3.1 \times 10^{-6}\ \text{s}^{-2}" />

        <p>
          For a body two metres tall, that is a difference in acceleration
          between head and feet of about 6 × 10⁻⁶ m/s², less than a millionth of
          the 9.8 m/s² you think of as gravity. That ratio is the most important
          number in this essay. Almost all of what you call “gravity” in
          everyday life is the floor pushing you off a geodesic; the true,
          frame-independent curvature is a millionth of it. Another way to put
          the same number: the curvature radius of spacetime at Earth&apos;s
          surface, roughly <InlineMath math="(GM/R^3c^2)^{-1/2}" />, comes to
          about 2.4 × 10¹¹ m, more than one and a half times the distance to the
          Sun. Locally, spacetime here is very nearly flat. We live on the
          gentlest of slopes and are simply prevented from sliding down it.
        </p>

        <H2>Where the slogan overreaches</H2>

        <p>
          I like “gravity is not a force” as a provocation, but I don&apos;t
          think it should be repeated as a fact without some qualifications,
          because it can make people think physicists who say “gravitational
          force” are confused. They mostly are not.
        </p>

        <p>
          First, Newton is not wrong in any way that matters for most of life.
          The relativistic corrections at Earth&apos;s surface are of order
          10⁻⁹. Bridges, rockets and interplanetary probes are designed with
          Newtonian gravity as a force, and they work. If you are in a frame
          tied to the ground — and engineers nearly always are — treating
          gravity as a force <InlineMath math="F = m\,\nabla\Phi" /> is the
          correct physics in that frame, in the same way centrifugal force is a
          perfectly usable concept on a merry-go-round. “Fictitious” in physics
          means “appears because of your choice of frame”, not “imaginary”.
        </p>

        <p>
          Second, the geometric trick is not unique to gravity, and saying it is
          makes gravity sound more mysterious than it is. Electromagnetism and
          the nuclear forces are also described by mathematical objects called
          connections, close cousins of those Christoffel symbols. What sets
          gravity apart is not that it is geometric but that it is universal.
          Because everything falls the same way — to one part in 10¹⁵ and
          counting — the connection can be built into the geometry of spacetime
          itself, shared by all matter, rather than living in a separate
          internal space that only charged particles feel. A more honest slogan
          would be: gravity is the one interaction so universal that you can
          hide it in the shape of spacetime.
        </p>

        <p>
          Third, at the level of quantum field theory, physicists routinely
          treat weak gravity as an interaction between particles on a nearly
          flat background, mediated by a hypothetical graviton, and that
          description agrees with general relativity where both apply. Whether
          gravity is “really” geometry or “really” a field is not a question the
          current evidence answers. The two pictures are tools that are good at
          different jobs.
        </p>

        <p>
          What survives all the qualifications is the thing I find genuinely
          beautiful. The sensation you have called gravity your whole life is
          the floor holding you back. Gravity itself, the frame-independent
          part, is the faint tendency of things falling side by side to drift
          together or apart. And the pull of the Earth, the thing that keeps the
          Moon in its orbit and your coffee in its cup, is mostly the
          observation that time runs less than one part in a billion slower down
          here than far away, and that everything, always, is moving through
          time.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
