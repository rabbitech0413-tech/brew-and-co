import { RoastLine } from "./RoastLine";

interface PageBannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/**
 * Page Banner (components.md §12) — flat header for /menu and /about, kept
 * deliberately shorter/simpler than Hero so Hero stays the homepage's one
 * thesis statement.
 */
export function PageBanner({ eyebrow, title, description }: PageBannerProps) {
  return (
    <header className="bg-espresso text-crema">
      <div className="mx-auto max-w-brew px-mug py-carafe md:px-pot md:py-urn">
        {eyebrow ? (
          <p className="mb-cup font-mono text-xs uppercase tracking-wide text-gold">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-3xl text-crema md:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-mug max-w-[60ch] font-body text-md text-crema/80">{description}</p>
        ) : null}
      </div>
      <RoastLine className="py-0" />
    </header>
  );
}
