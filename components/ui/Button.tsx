import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
/** Which surface the button sits on — only affects secondary/ghost coloring; primary works on both. */
export type ButtonTone = "onCrema" | "onEspresso";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  icon?: ReactNode;
  iconPosition?: "leading" | "trailing";
  /** Full width below `sm`, inline from `sm` up — the documented default. */
  fullWidthOnMobile?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = ButtonOwnProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = ButtonOwnProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const BASE =
  "inline-flex items-center justify-center gap-cup h-11 px-pot rounded-md font-body text-base font-medium " +
  "transition-colors duration-[var(--duration-fast)] ease-brew " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry focus-visible:ring-offset-2 " +
  "active:translate-y-px disabled:cursor-not-allowed disabled:active:translate-y-0";

// Default ring-offset-color is white, which reads as a stray halo on the
// espresso surfaces this system uses for nav/hero/footer — match the offset
// to whichever surface the button actually sits on instead.
function toneRingOffsetClass(tone: ButtonTone): string {
  return tone === "onEspresso" ? "focus-visible:ring-offset-espresso" : "focus-visible:ring-offset-crema";
}

function variantClasses(variant: ButtonVariant, tone: ButtonTone): string {
  if (variant === "primary") {
    return (
      "bg-cherry text-crema border-b-2 border-transparent " +
      "hover:bg-cherry-700 hover:border-gold " +
      "disabled:bg-cherry-300 disabled:text-crema/70 disabled:hover:bg-cherry-300 disabled:hover:border-transparent"
    );
  }
  if (variant === "secondary") {
    return tone === "onEspresso"
      ? "border border-crema/60 text-crema hover:bg-crema/10 disabled:border-crema/25 disabled:text-crema/40"
      : "border border-espresso text-espresso hover:bg-espresso/5 disabled:border-ink-muted/40 disabled:text-ink-muted/60";
  }
  // ghost
  return tone === "onEspresso"
    ? "text-crema roast-underline disabled:text-crema/40"
    : "text-cherry roast-underline disabled:text-cherry-300";
}

export function Button({
  variant = "primary",
  tone = "onCrema",
  icon,
  iconPosition = "leading",
  fullWidthOnMobile = true,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    BASE,
    variantClasses(variant, tone),
    toneRingOffsetClass(tone),
    fullWidthOnMobile ? "w-full sm:w-auto" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "leading" ? <span aria-hidden="true">{icon}</span> : null}
      {children}
      {icon && iconPosition === "trailing" ? <span aria-hidden="true">{icon}</span> : null}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof ButtonOwnProps | "href">;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
