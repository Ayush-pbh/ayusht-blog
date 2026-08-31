import { PostHeader } from "@/components/PostHeader";
import BlogJsonLd from "@/components/BlogJsonLd";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/posts";
import { H2 } from "@/components/Headings";
import InlineLink from "@/components/InlineLink";
import {
  FootnotesProvider,
  FootnoteLink,
  Footnotes,
} from "@/components/Footnotes";

const post = getPostBySlug("seeing-music");

export async function generateMetadata() {
  return createMetadata(post);
}

const footnotes = [
  {
    id: 1,
    content:
      "Thomas Wilfred called his instrument the Clavilux and his medium Lumia. He performed silent light recitals in concert halls in the 1920s. Nobody remembers, which is its own kind of proof that this impulse keeps having to be reinvented.",
  },
  {
    id: 2,
    content:
      "The technical version of this argument, and the eight scenes that survived it, are written up on the project page. This one is the reason underneath.",
  },
];

export default function SeeingMusic() {
  return (
    <FootnotesProvider footnotes={footnotes}>
      <BlogJsonLd post={post} />
      <PostHeader post={post} />

      <div className="space-y-4">
        <p>
          Music has never been content to stay in the ear. It borrows a body the
          moment it can find one. A foot on a wooden floor. A hand on a table.
          Someone's shoulders in a crowd, moving a half-second before yours do.
          Long before anyone built a spectrum analyser, we were already turning
          sound into something to look at — because hearing alone was never
          quite enough for it.
        </p>

        <p>
          The rooms remember this better than we do. Candles behind coloured
          glass in a temple. A mirror ball, which is only a lamp and a lot of
          small mistakes. Winamp, on a beige computer, at two in the morning.
          Every one of these is the same instinct wearing different clothes:
          give the sound a place to be seen.
        </p>

        <p>
          There is even a small, forgotten art form for it. In the 1920s a man
          named Thomas Wilfred built an instrument that played nothing but
          light, and toured it as seriously as a pianist tours a concerto.
          <FootnoteLink id={1} /> No sound at all. Just slow colour, folding
          over itself, in front of an audience that had bought tickets. It never
          caught on, and it never entirely went away either. It keeps getting
          rebuilt, in every decade, by someone who has just noticed that their
          music has nowhere to look.
        </p>

        <H2>The bar chart problem</H2>

        <p>
          Somewhere along the way, the visualizer became a readout. Bars.
          Columns. A waveform crawling left to right like a hospital monitor.
          These are not pictures of music — they are pictures of{" "}
          <em>measurement</em>. They tell you, faithfully and boringly, how much
          energy sits at 4 kHz. And because they are honest instruments, they
          are entirely deaf to the thing that matters: how the song{" "}
          <em>feels</em> while it is happening to you.
        </p>

        <p>
          Anything that moves in perfect lockstep with the beat stops being
          interesting after about eight bars, because you can predict it.
          Prediction is the death of looking. What holds attention is something
          that has its own life and is merely <em>disturbed</em> by the music —
          a weather system with a song blowing through it. Ink that keeps
          drifting during the quiet part. A flock that was going somewhere
          before the bass arrived and will still be going somewhere after.
        </p>

        <p>
          That was the whole design rule, and I set it before I wrote a line of
          shader code: never a bar chart. The sound is not the subject. The
          sound is the wind.
          <FootnoteLink id={2} />
        </p>

        <H2>Why I built it</H2>

        <p>
          I built <InlineLink href="/projects/dhun">Dhun</InlineLink> — धुन,
          melody — because I wanted my desktop to know what I was listening to.
          Not as a notification. Not as a widget with a progress bar and a
          rounded rectangle. I wanted the album art to just be <em>there</em>, a
          small square of colour floating over my work, changing temperature
          when the song changed, the way a room changes when someone opens a
          curtain.
        </p>

        <p>
          The honest reason is smaller than any of that: I have spent most of my
          working life inside a screen full of text, and I wanted one thing on
          it that was not asking me for anything. A record that spins because a
          record should spin. A wallpaper that is tonight's album instead of a
          mountain I have never visited. Ornament, deliberately — the thing
          software spent twenty years apologising for and quietly removing.
        </p>

        <p>
          There is a specific pleasure in software that is useless in the
          economic sense and indispensable in the daily one. Dhun does not make
          me faster. It cannot be sold — I gave up that right on purpose, in
          exchange for being allowed to adapt other people's beautiful shaders.
          It has no growth curve, no roadmap that ends in a company. It is 1.4
          megabytes of decoration, and I open it every single day.
        </p>

        <H2>Where it goes</H2>

        <p>
          Nowhere in particular, and that is the plan. This is a hobby project
          in the oldest sense: built for an audience of one, extended whenever
          the one gets curious. Half the visualizers I wrote never shipped —
          they were beautiful for a week and then I stopped looking at them, and
          not-looking is the only review that has ever mattered to me. What
          survived is what I still notice on a Tuesday.
        </p>

        <p>
          So I will keep going. More scenes, when a good one arrives. Better
          hands on the controls — an onset detector that hears a snare and not
          just a kick, something that knows the difference between a build and a
          drop. Maybe, eventually, the visualizer becomes the point and the
          player becomes the accessory. I have no idea. That is roughly the
          entire appeal.
        </p>

        <p>
          Sound gets to move through a room and disappear. Everything else on my
          screen is permanent, indexed, and waiting for input. It seems fair to
          let one small square of it be temporary and beautiful and about
          nothing.
        </p>
      </div>

      <Footnotes />
    </FootnotesProvider>
  );
}
