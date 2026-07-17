"use client";

import { useActionState } from "react";
import { submitComplaint, type ComplaintFormState } from "@/app/complaints/actions";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { Button } from "@/components/ui/Button";

const initialState: ComplaintFormState = { status: "idle" };

const TYPE_OPTIONS = ["Complaint", "Suggestion", "Compliment"] as const;

export function ComplaintForm() {
  const [state, formAction, pending] = useActionState(submitComplaint, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-latte bg-crema-100 p-pot">
        <p className="font-display text-lg text-ink">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-pot">
      {state.status === "error" && state.message ? (
        <p role="alert" className="font-body text-sm text-cherry">
          {state.message}
        </p>
      ) : null}

      <FormInput
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        required
        error={state.fieldErrors?.name}
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={state.fieldErrors?.email}
      />

      <div className="flex flex-col gap-sip">
        <label htmlFor="type" className="font-body text-sm text-ink">
          Category
        </label>
        <select
          id="type"
          name="type"
          defaultValue="Complaint"
          aria-invalid={state.fieldErrors?.type ? true : undefined}
          aria-describedby={state.fieldErrors?.type ? "type-error" : undefined}
          className={[
            "h-12 rounded-md border px-mug font-body text-base bg-crema-100 text-ink border-latte",
            state.fieldErrors?.type ? "border-cherry" : "",
            "focus-visible:outline-none focus-visible:border-cherry focus-visible:ring-2 focus-visible:ring-cherry/30",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {TYPE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {state.fieldErrors?.type ? (
          <p id="type-error" className="font-body text-sm text-cherry">
            {state.fieldErrors.type}
          </p>
        ) : null}
      </div>

      <FormTextarea
        label="Message"
        name="message"
        required
        error={state.fieldErrors?.message}
      />

      <Button type="submit" disabled={pending} fullWidthOnMobile={false} className="self-start">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
