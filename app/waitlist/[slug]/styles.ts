/**
 * Shared between the server-rendered page and the client form.
 *
 * It lives in its own module rather than in SignupForm because exports from a
 * "use client" file are not plain values on the server — importing this string
 * from there yields a server reference, which renders as a stringified error
 * into the class attribute. It typechecks and builds; it just breaks.
 */
export const buttonClass =
  "border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm whitespace-nowrap text-neutral-50 transition-opacity hover:opacity-80";
