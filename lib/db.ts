import { neon } from "@neondatabase/serverless";

/**
 * Lazy on purpose. `neon()` throws when DATABASE_URL is missing, and Next
 * evaluates top-level module code during `next build` — so calling it at import
 * time would break any build that runs without the env var (a fresh clone, CI
 * without secrets). Resolving it per call keeps the failure at request time,
 * where it belongs.
 *
 * Deliberately not a Proxy wrapper: those break libraries that introspect the
 * client object.
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}
