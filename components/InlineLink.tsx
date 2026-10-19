import { cn } from "@/lib/utils";
import Link from "next/link";

export default function InlineLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  if (
    !props.target &&
    typeof props.href === "string" &&
    !props.href.startsWith("/")
  ) {
    props.target = "_blank";
  }
  return (
    <Link
      className={cn(
        "hover:text-accent hover:decoration-accent underline decoration-neutral-300 underline-offset-[0.16em] transition-colors motion-safe:transition-[color,text-decoration-color,text-underline-offset] motion-safe:duration-200 motion-safe:hover:underline-offset-[0.26em]",
        className,
      )}
      {...props}
    />
  );
}
