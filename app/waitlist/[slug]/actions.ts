"use server";

import { headers } from "next/headers";
import { getSql } from "@/lib/db";
import { getWaitlistProject } from "@/lib/waitlist";

export type SignupState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/**
 * Deliberately permissive. The point is to catch a typo like "foo@gmail" or a
 * pasted sentence, not to adjudicate RFC 5322 — a regex strict enough to reject
 * every invalid address also rejects real ones, and a bounced confirmation
 * email is a cheaper way to learn the address was wrong.
 */
function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export async function signUp(
  _previous: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const slug = String(formData.get("project") ?? "");
  const project = getWaitlistProject(slug);
  if (!project) {
    return { status: "error", message: "Unknown project." };
  }

  // Honeypot: a field hidden from people and irresistible to naive bots. A
  // filled value means we quietly report success and write nothing.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: project.confirmation };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .slice(0, 254);
  const name = String(formData.get("name") ?? "")
    .trim()
    .slice(0, 120);
  const useCase = String(formData.get("useCase") ?? "")
    .trim()
    .slice(0, 2000);

  if (!looksLikeEmail(email)) {
    return { status: "error", message: "That email doesn't look right." };
  }

  // Where the signup came from, so an event QR can be told apart from a link
  // someone shared. Never the full URL — no query strings, no personal data.
  const referrer = (await headers()).get("referer")?.split("?")[0] ?? null;

  try {
    const sql = getSql();
    // Signing up twice is not an error worth showing a human. The unique index
    // on (project, lower(email)) makes the second attempt a no-op.
    await sql`
      INSERT INTO signups (project, email, name, use_case, referrer)
      VALUES (${slug}, ${email}, ${name || null}, ${useCase || null}, ${referrer})
      ON CONFLICT DO NOTHING
    `;
  } catch (error) {
    console.error("signup failed", error);
    return {
      status: "error",
      message: "Something broke on my end. Try again in a moment?",
    };
  }

  return { status: "success", message: project.confirmation };
}
