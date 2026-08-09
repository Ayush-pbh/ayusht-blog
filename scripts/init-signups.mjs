/**
 * Creates the signups table. Idempotent — safe to re-run.
 *
 *   npm run db:init
 *
 * Node does not auto-load .env.local the way Next does, so the npm script
 * sources it first.
 */
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS signups (
    id          bigserial PRIMARY KEY,
    project     text        NOT NULL,
    email       text        NOT NULL,
    name        text,
    use_case    text,
    referrer    text,
    created_at  timestamptz NOT NULL DEFAULT now()
  )
`;

// One row per person per project. Signing up twice is not an error — the
// insert is written as ON CONFLICT DO NOTHING, which needs this constraint.
await sql`
  CREATE UNIQUE INDEX IF NOT EXISTS signups_project_email_idx
    ON signups (project, lower(email))
`;

// The dashboard query is "how many for this project, newest first".
await sql`
  CREATE INDEX IF NOT EXISTS signups_project_created_idx
    ON signups (project, created_at DESC)
`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM signups`;
console.log(`signups table ready — ${count} row(s)`);
