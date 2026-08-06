import type { Collection, CollectionItem } from "@/types";
import paleBlueDot from "@/public/images/gallery/pale-blue-dot.webp";
import bhairaviDevi from "@/public/images/gallery/bhairavi-devi-with-shiva.webp";

/** Pull the video id out of a youtu.be or youtube.com/watch URL. */
function youtubeId(href: string): string | undefined {
  const match = href.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return match?.[1];
}

/** arXiv abs URLs have no useful OG image, so tiles fall back to the paper id. */
export function fallbackLabel(href?: string): string | undefined {
  if (!href) return undefined;
  const arxiv = href.match(/arxiv\.org\/abs\/([\d.v]+)/);
  if (arxiv) return `arXiv:${arxiv[1]}`;
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/**
 * Fills in the thumbnail for YouTube links so video entries only need a title
 * and a URL. An explicit `image` always wins.
 */
function withThumbnails(items: CollectionItem[]): CollectionItem[] {
  return items.map((item) => {
    if (item.image || !item.href) return item;
    const id = youtubeId(item.href);
    return id
      ? { ...item, image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }
      : item;
  });
}

// Adding a category is another object in this array; adding an item is another
// object in `items`. Book covers and article art need an explicit `image`
// (the OG image from the page); YouTube thumbnails are derived from the URL.
//
// Images are the exception: drop the file in `public/images/gallery/`, import
// it at the top of this file, and pass the import as `image`. The static import
// is what gives Next the real width and height, which the masonry grid and the
// lightbox both need. Don't hotlink gallery images — remote hosts have to be
// whitelisted in `next.config.js` and they rot.
const collections: Collection[] = [
  {
    slug: "books",
    title: "Books",
    layout: "portrait",
    items: [
      {
        title: "A Fortunate Universe: Life in a Finely Tuned Cosmos",
        author: "Geraint F. Lewis & Luke A. Barnes",
        href: "https://www.goodreads.com/book/show/27888788-a-fortunate-universe",
        image:
          "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1464129105i/27888788.jpg",
      },
      {
        title: "Einstein for Everyone",
        author: "Robert L. Piccioni",
        href: "https://www.goodreads.com/book/show/15743238-einstein-for-everyone",
        image:
          "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1341824931i/15743238.jpg",
      },
      {
        title: "The Theory of Everything: The Origin and Fate of the Universe",
        author: "Stephen Hawking",
        href: "https://www.goodreads.com/book/show/449573.The_Theory_of_Everything",
        image:
          "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1415359670i/449573.jpg",
      },
      {
        title: "Cosmos",
        author: "Carl Sagan",
        href: "https://www.goodreads.com/book/show/55030.Cosmos",
        image:
          "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1388620656i/55030.jpg",
      },
      {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Nir Eyal",
        href: "https://www.goodreads.com/book/show/22668729-hooked",
        image:
          "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1407112405i/22668729.jpg",
      },
      {
        title: "The Pragmatic Programmer: Your Journey to Mastery",
        author: "Andy Hunt & Dave Thomas",
        href: "https://www.goodreads.com/book/show/45280024-the-pragmatic-programmer",
        image:
          "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1562150630i/45280024.jpg",
      },
      {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        href: "https://www.goodreads.com/book/show/3735293-clean-code",
        image:
          "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg",
      },
    ],
  },
  {
    slug: "videos",
    title: "Videos",
    layout: "landscape",
    items: [
      {
        title: "LLMs Don't Need More Parameters. They Need Loops.",
        author: "NeuroDump",
        href: "https://youtu.be/pDsTcrRVNc0",
      },
      {
        title: "AI Subscription vs H100",
        author: "Caleb Writes Code",
        href: "https://youtu.be/SmYNK0kqaDI",
      },
      {
        title:
          "The spelled-out intro to neural networks and backpropagation: building micrograd",
        author: "Andrej Karpathy",
        href: "https://www.youtube.com/watch?v=VMj-3S1tku0&list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
      },
      {
        title: "Let's build GPT: from scratch, in code, spelled out.",
        author: "Andrej Karpathy",
        href: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
      },
      {
        title:
          "Stanford CS25: V2 — Introduction to Transformers w/ Andrej Karpathy",
        author: "Stanford Online",
        href: "https://www.youtube.com/watch?v=XfpMkf4rD6E",
      },
      {
        title: "Python Plays Grand Theft Auto V",
        author: "sentdex",
        href: "https://www.youtube.com/watch?v=ks4MPfMq8aQ&list=PLQVvvaa0QuDeETZEOy4VdocT7TOjfSA8a",
        note: "Series.",
      },
      {
        title: "Reinforcement Learning with Stable Baselines 3",
        author: "sentdex",
        href: "https://www.youtube.com/watch?v=XbWhJdQgi7E&list=PLQVvvaa0QuDf0O2DWwLZBfJeYY-JOeZB1",
        note: "Series.",
      },
      {
        title:
          "Jensen Huang: NVIDIA — The $4 Trillion Company & the AI Revolution",
        author: "Lex Fridman Podcast #494",
        href: "https://www.youtube.com/watch?v=vif8NQcjVf0",
      },
    ],
  },
  {
    slug: "articles",
    title: "Articles",
    layout: "landscape",
    items: [
      {
        title: "Rewriting Bun in Rust",
        author: "Bun Blog",
        href: "https://bun.com/blog/bun-in-rust",
        image: "https://bun.com/og/blog/bun-in-rust.png",
      },
    ],
  },
  {
    slug: "research-papers",
    title: "Research Papers",
    layout: "landscape",
    items: [
      {
        title:
          "DualPath: Breaking the Storage Bandwidth Bottleneck in Agentic LLM Inference",
        author: "Wu, Chen, Zhong, Huang et al.",
        href: "https://arxiv.org/abs/2602.21548",
      },
      {
        title:
          "Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses",
        author: "Lin, Liu, Pan, Lin et al.",
        href: "https://arxiv.org/abs/2604.25850",
      },
      {
        title: "MemGPT: Towards LLMs as Operating Systems",
        author: "Packer, Wooders, Lin, Fang et al.",
        href: "https://arxiv.org/abs/2310.08560",
      },
    ],
  },
  {
    slug: "images",
    title: "Images",
    layout: "gallery",
    items: [
      {
        title: "Pale Blue Dot",
        author: "Voyager 1, 14 February 1990",
        href: "https://science.nasa.gov/resource/voyager-pale-blue-dot-download/",
        image: paleBlueDot,
        description:
          "Voyager 1 turned around for a last look from 3.7 billion miles out and caught Earth as a crescent 0.12 pixel wide. The beams it appears to hang in are an artifact — sunlight scattered inside the camera, which was pointed too near the Sun. Thirty-four minutes later the cameras were shut off for good. Carl Sagan had argued for years to have the picture taken, and wrote afterwards that everyone you have ever heard of lived out their life on “a mote of dust suspended in a sunbeam” — that every war and every conviction of being at the centre of things happened on that one pixel.",
      },
      {
        title: "The Goddess Bhairavi Devi with Shiva",
        author: "Attributed to Payag, Mughal, c. 1630–35",
        href: "https://www.metmuseum.org/art/collection/search/457743",
        image: bhairaviDevi,
        description:
          "A cremation ground. Bhairavi sits on a corpse in a skirt and garland of skulls; three of her four hands hold instruments of destruction — a severed head, a sword, a trident — while the fourth is raised in blessing. Shiva is the ash-grey figure beside her, attending in the guise of a devotee. What makes it strange is the treatment: a Mughal atelier applying naturalist patience to a tantric subject, every strand of smoke drawn individually, jackals working the margins. The gold border is the same desolate ground, continued.",
      },
    ],
  },
];

export function getAllCollections(): Collection[] {
  return collections.map((collection) => ({
    ...collection,
    items: withThumbnails(collection.items),
  }));
}
