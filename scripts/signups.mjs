/**
 * Counts and lists signups.
 *
 *   npm run signups              — counts per project
 *   npm run signups pipecat-evals — every row for one project
 *   npm run signups pipecat-evals --csv > out.csv
 */
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const [, , slug, ...flags] = process.argv;
const csv = flags.includes("--csv");

if (!slug) {
  const rows = await sql`
    SELECT project, count(*)::int AS signups, max(created_at) AS latest
    FROM signups GROUP BY project ORDER BY signups DESC
  `;
  if (rows.length === 0) console.log("No signups yet.");
  else console.table(rows);
} else {
  const rows = await sql`
    SELECT email, name, use_case, referrer, created_at
    FROM signups WHERE project = ${slug} ORDER BY created_at DESC
  `;

  if (csv) {
    const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    console.log("email,name,use_case,referrer,created_at");
    for (const r of rows) {
      console.log(
        [r.email, r.name, r.use_case, r.referrer, r.created_at.toISOString()]
          .map(escape)
          .join(","),
      );
    }
  } else {
    console.log(`${rows.length} signup(s) for ${slug}\n`);
    for (const r of rows) {
      console.log(`  ${r.email}${r.name ? `  (${r.name})` : ""}`);
      if (r.use_case) console.log(`    ${r.use_case}`);
    }
  }
}
