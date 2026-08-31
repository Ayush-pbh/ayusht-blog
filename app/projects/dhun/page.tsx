import { PostHeader } from "@/components/PostHeader";
import { H2 } from "@/components/Headings";
import InlineLink from "@/components/InlineLink";
import Figure from "@/components/Figure";
import Video from "@/components/Video";
import { BlockCode, InlineCode } from "@/components/Code";
import { Ul, Ol, Li } from "@/components/List";
import { createMetadata } from "@/lib/metadata";
import { getProjectBySlug } from "@/lib/projects";
import screenshot from "@/public/images/dhun/dhun-ss.png";

const project = getProjectBySlug("dhun");

export async function generateMetadata() {
  return createMetadata(project, "/projects");
}

export default function Dhun() {
  return (
    <>
      <PostHeader post={project} />

      <div className="space-y-4">
        <p>
          <strong>Dhun</strong> (धुन — Hindi for <em>melody</em>) is a tiny
          native macOS app that turns whatever your music app is playing into a
          living piece of your desktop. At its smallest it is a borderless
          square of album art floating on your screen. At its biggest it is a
          full-screen visualizer that reacts to the actual sound coming out of
          your speakers.
        </p>

        <p>
          It is 100% Swift — AppKit, SwiftUI and Metal. No Electron, no
          JavaScript, no web views. The whole app is about{" "}
          <strong>1.4 MB</strong>, which is roughly the rounding error on an
          Electron app's installer. It needs macOS 13 or later and a music app
          it can talk to — Spotify or Apple Music. It is not affiliated with or
          endorsed by either.
        </p>

        <Figure
          className="mx-auto max-w-[379px]"
          src={screenshot}
          alt="Dhun's floating album-art square on a macOS desktop, with its hover control pill visible underneath."
          caption="The whole app, most of the time: one square, no window chrome, no menu bar item shouting for attention."
        />

        <H2>What it does</H2>

        <p>
          <strong>It puts the album art on your desktop.</strong> Not in a
          window — there is no window. Just a square of cover art you can drag
          anywhere and forget about. Double-click it to jump to your music app,
          right-click for a quick menu, and if you throw it across the screen it
          keeps going and bounces off the edges, because someone had to write
          that physics and it may as well be fun. You can also make it
          click-through, so it is purely decorative and your cursor passes
          straight through it, or invisible to screen sharing, so your taste in
          music stays out of the standup.
        </p>

        <p>
          <strong>It can be a record instead.</strong> Flip on the vinyl look
          and the square becomes a spinning record — actually spinning, actually
          stopping when you hit pause. It runs at 33⅓ RPM by default, and
          because the slider had to have ends, it goes from a 5 RPM crawl to a
          78 RPM shellac panic. Five duotone colour schemes, or “Album colors”,
          which paints the grooves from the cover itself.
        </p>

        <p>
          <strong>It reads the colours off every cover.</strong> Dhun looks at
          each new piece of art, works out the handful of colours that actually
          define it, and then uses them everywhere else — the glow around the
          square, the vinyl tint, the wallpaper, the visualizers. Change the
          song and the whole desktop quietly changes temperature with it.
        </p>

        <p>
          <strong>It can take over your wallpaper.</strong> Every track change
          sets the desktop to the current album art: centred on a blurred
          version of itself, cropped edge to edge, or reduced to a gradient of
          its own colours. Or go further and put a <em>spinning record</em> on
          the desktop, rendered above the wallpaper but below your icons — so
          your files sit on top of a moving turntable, which is either
          delightful or a productivity crime, depending on your week.
        </p>

        <p>
          <strong>It uses the notch for something.</strong> Slide your pointer
          up to the camera notch and it expands into a little island with the
          artwork, a progress bar and playback controls. The notch was going to
          sit there being a notch anyway.
        </p>

        <p>
          <strong>And it has a full-screen mode.</strong> Ambient mode fills the
          display with a now-playing scene — the cover, big type, and behind it
          either a slow drifting blur or one of the visualizers below. Click or
          hit Esc to come back to real life.
        </p>

        <p>
          Every single thing in that list is a switch. None of it is on by
          default and all of it lives in a normal Settings window (⌘,), because
          an app that redecorates your desktop without asking is a virus with a
          nice colour palette.
        </p>

        <Video
          src="/images/dhun/app-intro.webm"
          ratio={1440 / 810}
          caption="A walk through the app: the square, the vinyl, the wallpaper modes, the notch island, and ambient mode."
          controls
          autoPlay={false}
          loop={false}
          muted={false}
        />

        <H2>The visualizers</H2>

        <p>
          The headline of v1.1 is eight full-screen generative scenes, rendered
          in Metal, in ambient mode. One design rule was set on day one and
          never bent: <strong>never a bar chart</strong>. No equalizer bars, no
          spectrum columns, no bouncing waveform. Music visualizers stopped
          being interesting the day they became a readout.
        </p>

        <p>
          Instead the sound is a set of hands on the controls. Bass shoves large
          masses around, mids stir up turbulence, highs add the fine flicker,
          and every scene keeps living during the quiet bits rather than
          collapsing into a flat line.
        </p>

        <Ul>
          <Li>
            <strong>Ambience Plasma</strong> — energy clouds and tendrils, in
            open homage to the Windows Media Player era. Original.
          </Li>
          <Li>
            <strong>Ink in Water</strong> — ink blooms that bleed into their own
            previous frames, so the picture slowly remembers the song. Original.
          </Li>
          <Li>
            <strong>Murmuration</strong> — a flock of 14,000 birds with trails,
            simulated on the GPU. Original.
          </Li>
          <Li>
            <strong>Movement</strong> — the spectrum bent into a breathing ring
            of light and then smeared into drifting paint. Original.
          </Li>
          <Li>
            <strong>Volumetric Explosion</strong> — explosions that go off only
            on real bass hits, and never repeat themselves. Adapted from
            “Volumetric explosion” by Duke.
          </Li>
          <Li>
            <strong>MoonWalk</strong> — a moonlit flight that speeds up and
            slows with the music, without ever teleporting. Adapted from Nikos
            Papadopoulos (4rknova).
          </Li>
          <Li>
            <strong>Cloud Canal</strong> — a drifting tunnel of cloud.
            Deliberately deaf to the music; only its colours follow along.
            Adapted from Stéphane Cuillerdier (Aiekick).
          </Li>
          <Li>
            <strong>Calm Flow</strong> — serene isoline flow, also deliberately
            unreactive. Adapted from Sebastien Durand.
          </Li>
        </Ul>

        <p>
          Each scene takes one of five colour moods, or the live palette of
          whatever is playing. A <em>React to sound</em> switch turns the
          reaction off — and with it, all audio capture. There is also a debug
          overlay with the raw waveform, the real frame rate, and buttons to hop
          between scenes, which exists for reasons that become clear two
          sections down.
        </p>

        <H2>How it hears the music</H2>

        <p>
          macOS has no public “what is this app playing” audio API, which is a
          problem when the entire point is reacting to what an app is playing.
          The route around it:
        </p>

        <Ol>
          <Li>
            <strong>ScreenCaptureKit</strong> captures system audio, filtered to
            the music app's own process. The API insists on also giving you
            video, so Dhun asks for a <strong>2×2 pixel</strong> stream at one
            frame per second and throws every frame away — about as close to
            free as Apple will let you get. The microphone is never touched. If
            the filtered stream comes back silent, because the audio is
            travelling via some helper process, a watchdog gives up after three
            seconds and captures the whole display instead.
          </Li>
          <Li>
            An FFT through Accelerate's vDSP — 1024 samples, Hann window —
            reduces the sound to 48 log-spaced bands from about 45 Hz to 16 kHz.
          </Li>
          <Li>
            Those bands become four smoothed signals — bass, mid, high, overall
            level — each with its own attack and decay, so bass is slow and
            heavy and highs are twitchy. On top sits a{" "}
            <strong>bass-onset detector</strong>: bass jumping above its own
            long-run average, as a ratio rather than a threshold, so it still
            fires on EDM masters compressed to within an inch of their lives. A
            cooldown makes sure one drop is one event. That is what sets off the
            explosions.
          </Li>
          <Li>
            A single Metal view then renders three different ways: plain
            fragment shaders, ping-pong feedback for the scenes that eat their
            own past, and a compute-driven particle system for the flock. The
            expensive raymarchers quietly render at lower resolution and scale
            up.
          </Li>
        </Ol>

        <p>
          Track titles, artwork and the playback controls come the boring old
          way: Apple events, which is to say AppleScript, which is to say the
          most durable API on the platform.
        </p>

        <H2>Three things that went sideways</H2>

        <p>
          <strong>The permission saga.</strong> The visualizers need macOS's
          Screen &amp; System Audio Recording permission. For a while, the
          waveform went flat after every single rebuild. The reason: macOS ties
          a permission grant to the app's code signature, ad-hoc signatures
          change on every build, so every rebuild was quietly revoking the grant
          — and macOS does not ask twice after a denial. The fix was a local
          self-signed “Dhun Dev” certificate so the signature stops changing;
          the repo ships <InlineCode code="scripts/make-signing-cert.sh" /> to
          make one. The debug overlay was born during this, purely to answer “is
          any sound arriving at all, or am I debugging a beautiful picture of
          silence?”
        </p>

        <p>
          <strong>The license pivot.</strong> v1.0 shipped under MIT. But the
          best visualizer material in the world lives on Shadertoy, and
          Shadertoy's default license is CC BY-NC-SA 3.0, which MIT distribution
          cannot legally absorb. So the whole project moved to{" "}
          <strong>CC BY-NC-SA 4.0</strong>, with attribution in the source, the
          README and the app's About tab. The trade is permanent: Dhun can never
          be sold while those shaders are in it. Picking a worse license on
          purpose was the price of beautiful things. (v1.0 stays MIT — that
          grant cannot be taken back.)
        </p>

        <p>
          <strong>The Gatekeeper problem.</strong> Dhun is not notarized, which
          costs $99 a year, so a DMG downloaded in a browser gets the “Apple
          could not verify this app” dialog — and macOS Sequoia removed the old
          right-click-to-open escape hatch. The workaround is a one-liner.
          Browsers stamp downloads with a quarantine flag;{" "}
          <InlineCode code="curl" /> does not, so an app installed this way just
          opens. It is exactly the trick Homebrew plays on itself.
        </p>

        <BlockCode
          code={`curl -fsSL https://raw.githubusercontent.com/Ayush-pbh/dhun/main/install.sh | sh`}
          meta="bash"
        />

        <p>
          There is a Homebrew tap as well —{" "}
          <InlineCode code="brew install --cask ayush-pbh/tap/dhun" />. Worth
          being honest about it: Homebrew 6 removed the{" "}
          <InlineCode code="--no-quarantine" /> flag, so brew installs of
          unnotarized apps now hit the same dialog. The tap buys you{" "}
          <InlineCode code="brew upgrade" />, not a quieter install. Getting
          into the official cask repo requires “notability”, which is measured
          in GitHub stars — about 75 of them.
        </p>

        <H2>Curation by murder</H2>

        <p>
          Far more visualizers were built than shipped. Nebula, Ferrofluid,
          Aurora, Warp Field, Butterfly (album art warped by the spectrum, with
          mirrored wings), Gilled (a reaction-diffusion simulation fed by bass
          hits), Dream and an early Ambience ring were all finished, played
          against real music, and cut. The eight that shipped are survivors of a
          taste filter, not entries on a feature list.
        </p>

        <H2>By the numbers</H2>

        <Ul>
          <Li>
            ~1.4 MB to download, against ~100 MB where Electron apps start
          </Li>
          <Li>100% Swift, zero JavaScript</Li>
          <Li>8 visualizers shipped, about 7 more built and deleted</Li>
          <Li>14,000 birds in the flock</Li>
          <Li>1024 samples in, 48 bands out, 60 frames a second</Li>
          <Li>
            2×2 pixels — the video stream nobody wanted but the API demanded
          </Li>
          <Li>
            2 releases: v1.0.0, the square-and-vinyl era, then v1.1.0, the
            visualizer era
          </Li>
        </Ul>

        <p>
          Dhun was built with{" "}
          <InlineLink href="https://claude.com/claude-code">
            Claude Code
          </InlineLink>{" "}
          doing the typing, and me doing the arguing about what was worth
          keeping.
        </p>

        <Video
          src="/images/dhun/bounce.webm"
          ratio={1276 / 718}
          caption="Throw it and it keeps going. Strictly speaking, nobody asked for this."
        />
      </div>

      <hr />

      <div className="flex flex-wrap gap-4 text-xs">
        <InlineLink href="https://github.com/Ayush-pbh/dhun">
          Source on GitHub
        </InlineLink>
        <InlineLink href="https://github.com/Ayush-pbh/dhun/releases/tag/v1.1.0">
          Download v1.1.0
        </InlineLink>
      </div>
    </>
  );
}
