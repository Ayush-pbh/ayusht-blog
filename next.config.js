/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/understanding-the-power-of-lisp",
        destination: "/thoughts/understanding-the-power-of-lisp",
        permanent: true,
      },
      {
        source: "/building-this-website",
        destination: "/thoughts/building-this-website",
        permanent: true,
      },
      {
        source: "/object-collisions-with-canvas",
        destination: "/thoughts/simulating-object-collisions",
        permanent: true,
      },
    ];
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      // Goodreads book covers
      { protocol: "https", hostname: "m.media-amazon.com" },
      // YouTube thumbnails
      { protocol: "https", hostname: "i.ytimg.com" },
      // Article OG images
      { protocol: "https", hostname: "bun.com" },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
