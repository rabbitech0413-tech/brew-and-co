import { MenuItemCard } from "@/components/ui/MenuItemCard";
import type { Category, MenuItem } from "@/lib/types";

export function MenuSection({ category, items }: { category: Category; items: MenuItem[] }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">{category}</h2>
      <div className="mt-pot grid grid-cols-1 gap-pot sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
