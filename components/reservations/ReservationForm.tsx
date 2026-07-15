"use client";

import { useActionState } from "react";
import { createReservation, type ReservationFormState } from "@/app/reservations/actions";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

const initialState: ReservationFormState = { status: "idle" };

export function ReservationForm() {
  const [state, formAction, pending] = useActionState(createReservation, initialState);

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
        label="Party size"
        name="partySize"
        type="number"
        min={1}
        max={12}
        defaultValue={2}
        required
        error={state.fieldErrors?.partySize}
      />
      <div className="grid grid-cols-1 gap-pot sm:grid-cols-2">
        <FormInput label="Date" name="date" type="date" required error={state.fieldErrors?.date} />
        <FormInput label="Time" name="time" type="time" required error={state.fieldErrors?.time} />
      </div>

      <Button type="submit" disabled={pending} fullWidthOnMobile={false} className="self-start">
        {pending ? "Booking…" : "Confirm reservation"}
      </Button>
    </form>
  );
}
