import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { StatRow } from "@/components/ui/StatRow";
import { getMenuItems } from "@/lib/menu";

// Warm, cozy café interior. Source and licence: docs/design/image-sources.json.
const HERO_IMAGE = "/images/hero-cafe-interior.webp";

/** HeroHome (components.md §3a) — homepage-only Hero variant with a background photo. */
export function HeroHome() {
  const itemCount = getMenuItems().length;

  return (
    <section className="relative overflow-hidden bg-espresso py-urn md:py-roastery">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-espresso/85" aria-hidden="true" />

      <div className="relative mx-auto max-w-brew px-mug md:px-pot">
        <div className="max-w-xl">
          <div className="motion-safe:animate-[brew-rise-in_var(--duration-slow)_var(--ease-brew)_both]">
            <h1 className="font-display text-4xl leading-tight text-crema md:text-5xl">
              Coffee worth the <em className="italic">walk</em>.
            </h1>
            <p className="mt-mug max-w-[32ch] font-body text-md text-crema/80">
              Specialty coffee, fresh pastries, and light lunches on Bellenden Road — with live
              music Friday nights and cupping sessions Saturday mornings.
            </p>
          </div>
          <div className="mt-pot flex flex-col gap-cup motion-safe:animate-[brew-rise-in_var(--duration-slow)_var(--ease-brew)_80ms_both] sm:flex-row">
            <Button href="/reservations">Reserve a table</Button>
            <Button href="/menu" variant="secondary" tone="onEspresso">
              View menu
            </Button>
          </div>
          <StatRow
            className="mt-carafe motion-safe:animate-[brew-rise-in_var(--duration-slow)_var(--ease-brew)_160ms_both]"
            stats={[
              { value: String(itemCount), label: "Menu items" },
              { value: "2015", label: "Serving Peckham since" },
              { value: "2", label: "Weekly events" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
