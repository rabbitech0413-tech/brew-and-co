import type { InputHTMLAttributes } from "react";

export type FormInputTone = "onCrema" | "onEspresso";

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  name: string;
  error?: string;
  tone?: FormInputTone;
  className?: string;
}

/** Newsletter / Form Input base pattern (components.md §8). */
export function FormInput({
  label,
  name,
  error,
  tone = "onCrema",
  className = "",
  id,
  ...rest
}: FormInputProps) {
  const inputId = id ?? name;
  const errorId = `${inputId}-error`;

  const toneClasses =
    tone === "onEspresso"
      ? "bg-espresso-300/40 text-crema border-crema/20 placeholder:text-crema/50"
      : "bg-crema-100 text-ink border-latte placeholder:text-ink-muted";

  return (
    <div className={`flex flex-col gap-sip ${className}`}>
      <label
        htmlFor={inputId}
        className={`font-body text-sm ${tone === "onEspresso" ? "text-crema" : "text-ink"}`}
      >
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          "h-12 rounded-md border px-mug font-body text-base",
          toneClasses,
          error ? "border-cherry" : "",
          "focus-visible:outline-none focus-visible:border-cherry focus-visible:ring-2 focus-visible:ring-cherry/30",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
      {error ? (
        <p id={errorId} className="font-body text-sm text-cherry">
          {error}
        </p>
      ) : null}
    </div>
  );
}
