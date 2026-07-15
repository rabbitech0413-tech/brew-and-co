import Link from "next/link";
import { MenuItemCard } from "@/components/ui/MenuItemCard";
import { FOCUS_ON_CREMA } from "@/components/ui/focusRing";
import { getPopularItems } from "@/lib/menu";

export function PopularItems() {
  const items = getPopularItems();

  return (
    <section className="mx-auto max-w-brew px-mug md:px-pot">
      <div className="flex items-baseline justify-between gap-mug">
        <h2 className="font-display text-2xl text-ink">Popular right now</h2>
        <Link
          href="/menu"
          className={`roast-underline w-fit shrink-0 rounded-sm font-body text-base text-cherry ${FOCUS_ON_CREMA}`}
        >
          View full menu
        </Link>
      </div>
      <div className="mt-pot grid grid-cols-1 gap-pot sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
