import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllWaitlistProjects, getWaitlistProject } from "@/lib/waitlist";
import { feedConfig } from "@/lib/feedConfig";
import { cn } from "@/lib/utils";
import { Arrow } from "@/icons";
import SignupForm from "./SignupForm";
import { buttonClass } from "./styles";
import type { TerminalLine } from "@/types";

type Params = { params: Promise<{ slug: string }> };

/** Every project in the config becomes a static page at build time. */
export function generateStaticParams() {
  return getAllWaitlistProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getWaitlistProject(slug);
  if (!project) return {};

  const url = `${feedConfig.siteUrl}/waitlist/${project.slug}`;

  return {
    title: project.name,
    description: project.subhead,
    alternates: { canonical: url },
    openGraph: {
      title: project.headline.join(" "),
      description: project.subhead,
      type: "website",
      url,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.name)}`,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
  };
}

/**
 * Renders `backticked` spans in a config string as monospace, so the technical
 * bullets can name identifiers without the config carrying markup.
 */
function WithCode({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={index} className="font-mono text-neutral-800">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

const TERMINAL_TONE: Record<NonNullable<TerminalLine["tone"]>, string> = {
  command: "text-neutral-900",
  fail: "text-neutral-900",
  muted: "text-neutral-400",
  plain: "text-neutral-600",
};

export default async function Waitlist({ params }: Params) {
  const { slug } = await params;
  const project = getWaitlistProject(slug);
  if (!project) notFound();

  const [lead, ...rest] = project.headline;

  return (
    <div className="min-h-dvh">
      {/*
        Deliberately not the site nav, and deliberately not a product menu:
        there is nothing behind Product/Pricing/Docs yet, and an empty menu
        reads as vaporware. One way back to the site, one way to the form.
      */}
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6">
        <span className="text-2xs font-mono tracking-[0.22em] text-neutral-900 uppercase">
          {project.name}
        </span>

        {/* No CTA up here: this header doesn't stick, so a second "join" button
            would only ever be visible next to the one in the hero. */}
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <Arrow className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          <em className="text-xs">ayusht.me</em>
        </Link>
      </header>

      {/* One form on the page, at the bottom. The hero sends people to it
          rather than repeating it — a three-field form asked twice reads as
          two different asks, and only one of them can show the confirmation. */}
      <section className="mx-auto flex w-full max-w-3xl flex-col justify-center px-6 pt-14 pb-24 sm:min-h-[68vh] sm:pt-6">
        {project.eyebrow && (
          <p className="text-2xs mb-5 font-mono tracking-[0.18em] text-neutral-400 uppercase">
            {project.eyebrow}
          </p>
        )}
        <h1 className="max-w-lg text-xl leading-snug font-medium tracking-tight text-neutral-900 sm:text-2xl">
          {lead}
          {rest.map((line) => (
            <span key={line} className="block text-neutral-400">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-md leading-relaxed text-neutral-600">
          {project.subhead}
        </p>

        <div className="mt-9">
          <a href="#waitlist" className={`${buttonClass} inline-block`}>
            {project.cta}
          </a>
        </div>
      </section>

      {/*
        The one place the page slows down. Serif italic rather than a bigger
        size — the same move the rest of the site makes for anything reflective,
        and the reason this reads as a beat and not another section.
      */}
      {project.problem && (
        <section className="mx-auto w-full max-w-xl px-6 py-20 text-center">
          <div className="space-y-5">
            {project.problem.lines.map((line) => (
              <p
                key={line}
                className="font-serif text-base leading-relaxed text-neutral-700 italic"
              >
                {line}
              </p>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-md border-t border-neutral-200 pt-7 text-xs text-neutral-400">
            {project.problem.kicker}
          </p>
        </section>
      )}

      {project.loop && (
        <section className="mx-auto w-full max-w-3xl border-t border-neutral-200 px-6 py-20">
          <p className="text-2xs mb-5 font-mono tracking-[0.18em] text-neutral-400 uppercase">
            {project.loop.eyebrow ?? "The loop"}
          </p>
          <h2 className="font-medium text-neutral-900">
            {project.loop.header}
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-neutral-600">
            {project.loop.intro}
          </p>

          <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {project.loop.steps.map((step, index) => (
              <li key={step.title} className="border-t border-neutral-200 pt-3">
                <span className="text-2xs block font-mono text-neutral-400 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-medium text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          {project.loop.terminal && (
            <figure className="mt-12">
              <pre className="overflow-x-auto border border-neutral-200 bg-neutral-100 px-5 py-4 font-mono text-xs leading-relaxed">
                {project.loop.terminal.lines.map((line, index) => (
                  <span
                    key={index}
                    className={cn(
                      "block",
                      TERMINAL_TONE[line.tone ?? "plain"],
                      line.tone === "fail" && "font-medium",
                    )}
                  >
                    {line.text || " "}
                  </span>
                ))}
              </pre>
              <figcaption className="mt-2.5 text-xs text-neutral-400">
                {project.loop.terminal.caption}
              </figcaption>
            </figure>
          )}
        </section>
      )}

      {project.features && (
        <section className="mx-auto w-full max-w-3xl border-t border-neutral-200 px-6 py-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="border-t border-neutral-200 pt-3"
              >
                <h3 className="font-medium text-neutral-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Deliberately plain: a dense list of facts an engineer can check is
          what buys trust here, so it gets no cards and no icons. */}
      {project.details && (
        <section className="mx-auto w-full max-w-3xl border-t border-neutral-200 px-6 py-20">
          <p className="text-2xs mb-5 font-mono tracking-[0.18em] text-neutral-400 uppercase">
            {project.details.eyebrow ?? "Under the hood"}
          </p>
          <h2 className="font-medium text-neutral-900">
            {project.details.header}
          </h2>

          <ul className="mt-8 space-y-3 border-t border-neutral-200 pt-6">
            {project.details.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-xs leading-relaxed text-neutral-500"
              >
                <span aria-hidden="true" className="text-neutral-300">
                  &mdash;
                </span>
                <span>
                  <WithCode text={item} />
                </span>
              </li>
            ))}
          </ul>

          {project.details.link && (
            <a
              href={project.details.link.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-xs text-neutral-400 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900"
            >
              {project.details.link.label}
            </a>
          )}
        </section>
      )}

      {/* Native <details>: an accordion that costs no JavaScript. */}
      {project.faq && (
        <section className="mx-auto w-full max-w-3xl border-t border-neutral-200 px-6 py-20">
          <p className="text-2xs mb-5 font-mono tracking-[0.18em] text-neutral-400 uppercase">
            Questions
          </p>
          <div className="border-t border-neutral-200">
            {project.faq.map((item) => (
              <details
                key={item.question}
                className="group border-b border-neutral-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-medium text-neutral-900 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-neutral-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-xl pb-4 text-xs leading-relaxed text-neutral-500">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {project.closing && (
        <section
          id="waitlist"
          className="mx-auto w-full max-w-3xl scroll-mt-12 border-t border-neutral-200 px-6 py-20"
        >
          <div className="mx-auto max-w-md text-center">
            <p className="text-2xs mb-5 font-mono tracking-[0.18em] text-neutral-400 uppercase">
              {project.closing.header}
            </p>
            <p className="leading-relaxed text-neutral-600">
              {project.closing.body}
            </p>
          </div>

          {/* Above the form, in a box, not shrunk to fine print underneath it.
              At this stage candour converts better than polish, and it only
              works if people actually read it. */}
          <p className="mx-auto mt-8 max-w-md border border-neutral-200 bg-neutral-100 px-4 py-3 text-xs leading-relaxed text-neutral-500">
            {project.closing.honesty}
          </p>

          <div className="mx-auto mt-5 max-w-md text-left">
            <SignupForm project={project} />
          </div>
        </section>
      )}

      {/*
        Full-bleed, so it reads as ground the page comes to rest on rather than
        an illustration dropped into the column. The file is pre-cropped to
        roughly this aspect — object-cover would otherwise throw away most of
        the pixels we'd be shipping.
      */}
      {project.texture && (
        <div
          aria-hidden="true"
          className="relative h-40 w-full border-t border-neutral-200 sm:h-56"
        >
          <Image
            src={project.texture.src}
            alt={project.texture.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
      )}

      <footer className="mx-auto w-full max-w-3xl px-6 py-9">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-2xs font-mono tracking-[0.22em] text-neutral-400 uppercase">
            {project.name}
          </span>
          {project.contactEmail && (
            <a
              href={`mailto:${project.contactEmail}`}
              className="text-xs text-neutral-400 transition-colors hover:text-neutral-900"
            >
              {project.contactEmail}
            </a>
          )}
        </div>

        {project.finePrint && (
          <p className="text-2xs mt-6 max-w-xl leading-relaxed text-neutral-400">
            {project.finePrint}
          </p>
        )}
      </footer>
    </div>
  );
}
