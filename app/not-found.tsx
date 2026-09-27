import InlineLink from "@/components/InlineLink";

export default function NotFound() {
  return (
    <>
      <div className="rise">
        <p className="text-label font-mono text-neutral-400 uppercase">404</p>
        <h1 className="text-title md:text-display mt-4 font-serif text-neutral-900">
          Page Not Found
        </h1>
        <p className="text-lede mt-6 max-w-[46ch] font-serif text-neutral-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="text-label mt-8 font-mono uppercase">
          <InlineLink
            className="hover:text-accent text-neutral-400 no-underline"
            href="/"
          >
            Return Home
          </InlineLink>
        </div>
      </div>
    </>
  );
}
