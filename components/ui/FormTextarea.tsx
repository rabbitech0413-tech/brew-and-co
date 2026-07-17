import type { TextareaHTMLAttributes } from "react";
import type { FormInputTone } from "./FormInput";

interface FormTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  name: string;
  error?: string;
  tone?: FormInputTone;
  className?: string;
}

/** Multi-line sibling of FormInput (components.md §8) — same label/error/tone
 * pattern, but a <textarea> for longer free text (e.g. complaint message). */
export function FormTextarea({
  label,
  name,
  error,
  tone = "onCrema",
  className = "",
  id,
  rows = 5,
  ...rest
}: FormTextareaProps) {
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
      <textarea
        id={inputId}
        name={name}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          "rounded-md border px-mug py-mug font-body text-base resize-y",
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
