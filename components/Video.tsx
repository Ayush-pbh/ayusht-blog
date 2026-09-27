import { cn } from "@/lib/utils";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** Path under /public. WebM (VP9) — see `public/images/` for the sources. */
  src: string;
  caption?: string;
  /** Aspect ratio as `width / height`, so the box reserves space before load. */
  ratio?: number;
}

/**
 * Figure's moving-picture sibling. Defaults to a silent, looping, inline clip
 * that behaves like an animated image; pass `controls` and `loop={false}` for
 * something long enough that a reader might want to scrub it.
 */
export default function Video({
  src,
  caption,
  className,
  ratio = 16 / 9,
  autoPlay = true,
  loop = true,
  muted = true,
  ...props
}: VideoProps) {
  return (
    <figure className={cn("my-10", className)}>
      <div className="border border-neutral-200 bg-neutral-100">
        <video
          className="w-full"
          style={{ aspectRatio: ratio }}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          preload="metadata"
          {...props}
        >
          <source src={src} type="video/webm" />
        </video>
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-[58ch] font-sans text-xs leading-relaxed text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
