"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { signUp, type SignupState } from "./actions";
import { buttonClass } from "./styles";
import type { WaitlistProject } from "@/types";

const initialState: SignupState = { status: "idle" };

// text-sm rather than a landing-page size: the whole site sets body copy at
// text-sm, and a 16px field next to 14px copy is the tell that a page was
// designed somewhere else.
const fieldClass =
  "w-full border border-neutral-300 bg-transparent px-3 py-2 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none";

function Submit({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${buttonClass} shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-50`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

/**
 * The page's only form — the hero links down to it. ids still come from useId
 * rather than string literals so a second instance stays safe to add.
 */
export default function SignupForm({ project }: { project: WaitlistProject }) {
  const [state, formAction] = useActionState(signUp, initialState);
  const uid = useId();
  const emailOnly = project.formFields !== "full";

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border border-neutral-300 px-4 py-6 text-center"
      >
        <p className="font-serif text-base italic">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="project" value={project.slug} />

      {/* Honeypot. Hidden from people, tempting to bots — see actions.ts. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {!emailOnly && (
        <div className="space-y-1">
          <label
            htmlFor={`${uid}-name`}
            className="text-2xs block text-neutral-500"
          >
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            className={fieldClass}
            placeholder="Ada Lovelace"
          />
        </div>
      )}

      <div className={emailOnly ? "flex gap-2" : "space-y-1"}>
        {/* In the one-field layout the placeholder carries the label; in the
            full form it would be the only unlabelled field. */}
        <label
          htmlFor={`${uid}-email`}
          className={emailOnly ? "sr-only" : "text-2xs block text-neutral-500"}
        >
          Email
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className={fieldClass}
        />
        {emailOnly && (
          <Submit
            label={project.cta}
            pendingLabel={project.submittingLabel ?? "Sending…"}
          />
        )}
      </div>

      {!emailOnly && (
        <div className="space-y-1">
          <label
            htmlFor={`${uid}-useCase`}
            className="text-2xs block text-neutral-500"
          >
            What are you building?{" "}
            <span className="text-neutral-400">(optional)</span>
          </label>
          <textarea
            id={`${uid}-useCase`}
            name="useCase"
            rows={3}
            className={`${fieldClass} resize-none`}
            placeholder="A sentence is plenty."
            aria-describedby={
              project.useCaseHint ? `${uid}-useCaseHint` : undefined
            }
          />
          {project.useCaseHint && (
            <p id={`${uid}-useCaseHint`} className="text-2xs text-neutral-400">
              {project.useCaseHint}
            </p>
          )}
        </div>
      )}

      {state.status === "error" && (
        <p role="alert" className="text-2xs text-neutral-900">
          {state.message}
        </p>
      )}

      {!emailOnly && (
        <Submit
          label={project.cta}
          pendingLabel={project.submittingLabel ?? "Sending…"}
        />
      )}

      {project.formNote && (
        <p className="text-2xs text-neutral-400">{project.formNote}</p>
      )}
    </form>
  );
}
