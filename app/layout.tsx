import type { Metadata, Viewport } from "next";
import { Newsreader, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { feedConfig } from "@/lib/feedConfig";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  style: ["normal", "italic"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  style: ["normal", "italic"],
});
// The text face. Newsreader ships an optical-size axis; the prose sits at the
// small end of it, which is where its ink traps and tall x-height are tuned.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

// Keeps the mobile browser chrome in step with the page background.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#12110f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(feedConfig.siteUrl),
  title: {
    default: feedConfig.siteTitle,
    template: `%s · ${feedConfig.siteTitle}`,
  },
  description: feedConfig.siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: feedConfig.siteUrl,
    siteName: feedConfig.siteTitle,
    images: [
      {
        url: feedConfig.ogImage,
        width: 1200,
        height: 630,
        alt: feedConfig.siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: feedConfig.siteTitle,
    description: feedConfig.siteDescription,
    site: feedConfig.xHandle,
    creator: feedConfig.xHandle,
  },
  appleWebApp: {
    title: feedConfig.siteTitle,
    statusBarStyle: "black-translucent",
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicon/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon/favicon.svg",
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      url: "/favicon/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning covers the `data-theme` the script below adds:
    // the server can't know the stored choice, so <html> legitimately differs
    // from the SSR output. It only silences this element's own attributes,
    // not anything nested inside it.
    // The font variables are set here rather than on <body> because the
    // `--font-sans` / `--font-serif` tokens in globals.css are declared on
    // :root and point at them. Custom properties substitute per element, so a
    // variable that only exists on <body> is invalid by the time :root
    // resolves the token.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/*
          Applies a stored theme choice before first paint, so an explicit
          light/dark pick never flashes the other one. No stored value leaves
          the attribute off and the system preference in charge.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${feedConfig.siteTitle} RSS Feed`}
          href={feedConfig.feedPaths.rss}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${feedConfig.siteTitle} Atom Feed`}
          href={feedConfig.feedPaths.atom}
        />
        <link
          rel="alternate"
          type="application/json"
          title={`${feedConfig.siteTitle} JSON Feed`}
          href={feedConfig.feedPaths.json}
        />
      </head>
      <body className="text-[0.9375rem] text-neutral-700 antialiased">
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
