import Image from "next/image";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { RoastIndicator } from "./RoastIndicator";

/**
 * Menu Item Card (components.md §5). No per-item "order" action — Brew & Co
 * doesn't take online orders, and a menu you're browsing in person or on a
 * phone doesn't need one; the price is the card's only call to action.
 */
export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex flex-col gap-cup rounded-lg border border-latte bg-crema-100 p-pot shadow-card transition-[transform,box-shadow] duration-[var(--duration-base)] ease-brew hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        {item.badge ? (
          <span className="absolute left-cup top-cup rounded-sm bg-espresso px-cup py-sip font-body text-xs uppercase tracking-wide text-crema">
            {item.badge}
          </span>
        ) : null}
      </div>

      <h3 className="font-display text-lg text-ink">{item.name}</h3>
      <p className="line-clamp-2 font-body text-sm text-ink-muted">{item.description}</p>

      {item.roast ? <RoastIndicator roast={item.roast} /> : null}

      <span className="mt-auto font-mono text-md text-cherry">{formatPrice(item.price)}</span>
    </article>
  );
}
