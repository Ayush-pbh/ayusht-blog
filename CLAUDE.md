# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on :3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint (eslint)
npx prettier --write .   # format
```

There is no test framework in this repo. A husky `pre-commit` hook runs `lint-staged`: eslint on JS/TS, prettier on everything else.

## Architecture

Personal blog: Next.js 15 App Router, React 19, Tailwind CSS v4, TypeScript. Deployed at https://ayusht.me.

### Posts are React components, not markdown

There is no MDX/content pipeline. Each post is a hand-written page at `app/thoughts/<slug>/page.tsx` that composes the typography components in `components/`. Post metadata lives separately in the hardcoded array returned by `getAllPosts()` in `lib/posts.ts` (type `Post` in `types/index.ts`).

Adding a post means three coordinated edits:

1. Add an entry to `getAllPosts()` in `lib/posts.ts`.
2. Create `app/thoughts/<slug>/page.tsx`.
3. In that page: `const post = getPostBySlug("<slug>")`, export `generateMetadata` returning `createMetadata(post)`, and render `<BlogJsonLd post={post} />` + `<PostHeader post={post} />` before the body. See `app/thoughts/colophon/page.tsx` as the template.

`app/thoughts/specimen/page.tsx` renders every post component on one page — headings, lists, quotes, code, maths, footnotes/sidenotes, figures, charts, canvas. It is kept `draft: true` deliberately, so it stays out of the index and feeds while remaining live at its URL. Check it after changing anything in `components/`.

`getPostBySlug` **throws** on an unknown slug, so a page whose slug isn't in `lib/posts.ts` fails the build. The slug in `posts.ts` must match the directory name — nothing enforces this.

Because `getAllPosts()` is the single source of truth, adding an entry automatically propagates to the `/thoughts` index, `app/sitemap.ts`, and the three feed routes. It sorts `pinned` posts first, then newest-first by `date`, so the position of an entry in the array does not matter.

`getPostBySlug` also attaches `readingTime`, estimated by `lib/readingTime.ts`, which reads the post's own `page.tsx` at build time and counts the prose left after the code is stripped out. `PostHeader` renders it next to the date. Set `readingTime` explicitly on the post to override the estimate; it is deliberately absent from `getAllPosts()`, so the index and the feeds never trigger a file read.

Articles do not render their own footer — `SiteChrome` appends `components/PostFooter.tsx` on any `/thoughts/<slug>` route, so the X link and the back-links appear on a new post with no extra edit.

`draft: true` on a post keeps it out of all four in production and marks it `noindex`, while the page still builds and answers on its URL. `getAllPosts()` filters drafts; `getPostBySlug()` deliberately does not, so the draft's own page still resolves. Drafts stay visible in `npm run dev` and on Vercel preview deployments.

The README's instruction to put posts in `components/posts/` is stale — that directory does not exist.

### Feeds and metadata

`lib/feedConfig.ts` holds all site-level identity (title, URL, description, author, X handle and profile URL, feed paths, copyright) plus `createFeedOptions()` / `createFeedItems()`. The three routes `app/api/rss`, `app/api/atom`, `app/api/feed` are thin wrappers that differ only in the `feed.rss2()` / `.atom1()` / `.json1()` call and content type. Change site identity in `feedConfig.ts`, not in the routes or `app/layout.tsx`.

`lib/metadata.ts#createMetadata` builds per-post OG **and** Twitter/X card metadata plus a canonical URL, and falls back to the dynamic OG image at `app/api/og/route.tsx` (`@vercel/og`, edge runtime) when a post has no `coverImage`. The X card is stated explicitly rather than left to fall back on OG, so a shared link shows the post's own title and description. Site-wide defaults live in `app/layout.tsx` and read from `feedConfig`.

Post URLs are `/thoughts/<slug>` — hardcoded in `feedConfig.ts`, `metadata.ts`, `sitemap.ts`, and `BlogJsonLd`. `next.config.js` keeps permanent redirects from the old flat URLs.

### Styling

Tailwind v4 with no `tailwind.config` — the design system is CSS in `app/globals.css`: an `@theme` block overrides the `neutral` and `blue` palettes with warm off-white tones, defines the three font vars (Inter sans / Lora serif / JetBrains Mono), and adds an `xs` (32rem) breakpoint and `text-2xs`. The `@layer base` block also styles `rehype-pretty-code` output and KaTeX by attribute selector, so code-block and math appearance is controlled there rather than in the components.

Note `em`/`i`/`q` are globally restyled to serif italic — the nav deliberately uses `<em>` for its links.

Dark mode reverses that same `neutral` ramp, so no component carries a `dark:` variant. It follows `prefers-color-scheme` until `components/ThemeToggle.tsx` (in the nav) writes `data-theme="light" | "dark"` onto `<html>`; a blocking script in `app/layout.tsx` replays the stored choice before first paint. The dark ramp is written twice in `globals.css` — once in the media query, once under `[data-theme="dark"]` — because CSS can't share a declaration list across the two. Edit them together.

Always compose classes with `cn()` from `lib/utils.ts` (clsx + tailwind-merge) so caller `className` props override defaults.

Page transitions use React's `unstable_ViewTransition` in `app/layout.tsx` with the `crossfade` name, animated by the `::view-transition-*` rules in `globals.css`. `experimental.viewTransition` is on in `next.config.js`.

### Component conventions

`components/` holds post building blocks. Server components where possible; `"use client"` only where needed (`Headings`, `Footnotes`, `Nav`, `LineChart`, `ExecuteAnimationScript`).

- `Code.tsx` — `BlockCode`/`InlineCode` are **async server components** that run a unified/remark/rehype-pretty-code pipeline at render time and inject HTML. Pass raw source as the `code` prop and the language as `meta`.
- `Headings.tsx` — `H2`/`H3` auto-generate their `id` from text content in an effect and render a `§` anchor link.
- `Footnotes.tsx` — context-based. Wrap post content in `<FootnotesProvider footnotes={[{id, content}]}>`, place `<FootnoteLink id={n} />` inline, and `<Footnotes />` at the end. Sidenotes render in the margin at `xl` and above.
- `Math.tsx` — `BlockMath`/`InlineMath` render KaTeX to HTML strings.
- `ExecuteAnimationScript.tsx` — runs a string of JS via `new Function(container, requestAnimationFrame, code)` for canvas demos, tracking and cancelling animation frames on unmount.

SVGs in `icons/` are imported as React components via `@svgr/webpack` (configured in `next.config.js`) and re-exported from `icons/index.ts`. Import path alias is `@/*` → repo root.

`components/ui/PostHeader.tsx` is a byte-identical duplicate of `components/PostHeader.tsx`; pages import the top-level one.

Quotes live as data in `lib/quotes.ts`, not as JSX. The page is `force-dynamic` so `getShuffledQuotes()` reorders them on every request.

`lib/collections.ts` drives `/collections`. The `images` collection uses `layout: "gallery"` — masonry tiles that open `components/Lightbox.tsx`. Its images are static imports from `public/images/gallery/`, which is what gives Next the dimensions the masonry and the zoom both need.

`tasks.md` is the author's running backlog of planned posts and features.
