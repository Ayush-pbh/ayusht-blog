import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface FigureProps extends Omit<ImageProps, "alt"> {
  alt: string;
  caption?: string;
  imgClassName?: string;
}

export default function Figure({
  alt,
  caption,
  className,
  imgClassName,
  ...props
}: FigureProps) {
  return (
    <figure className={cn("my-10", className)}>
      <div className="border border-neutral-200 bg-neutral-100">
        <Image alt={alt} className={cn("w-full", imgClassName)} {...props} />
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-[58ch] font-sans text-xs leading-relaxed text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
