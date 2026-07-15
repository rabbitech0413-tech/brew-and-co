import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { MenuSection } from "@/components/menu/MenuSection";
import { getMenuByCategory } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description: "Espresso, hot drinks, sandwiches, and iced coffee at Brew & Co, Peckham.",
};

export default function MenuPage() {
  const categories = getMenuByCategory();

  return (
    <>
      <PageBanner
        eyebrow="The menu"
        title="What we're pouring"
        description="Everything below is made to order, in small batches, by whoever's on shift. Ask if you want tasting notes on the coffee — we like talking about it."
      />
      <div className="mx-auto max-w-brew px-mug py-carafe md:px-pot md:py-urn">
        <div className="flex flex-col gap-urn">
          {categories.map(({ category, items }) => (
            <MenuSection key={category} category={category} items={items} />
          ))}
        </div>
      </div>
    </>
  );
}
