import fs from "node:fs";
import path from "node:path";
import { parseCSVRecords } from "./csv";
import type { Badge, Category, MenuItem, RoastLevel } from "./types";

const CATEGORY_ORDER: Category[] = ["Espresso", "Hot Drinks", "Sandwiches", "Iced Coffee"];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toBadge(value: string): Badge {
  return value === "Popular" || value === "House Favorite" ? value : null;
}

function toRoast(value: string): RoastLevel {
  return value === "Light" || value === "Medium" || value === "Dark" ? value : null;
}

let cachedItems: MenuItem[] | null = null;

export function getMenuItems(): MenuItem[] {
  if (cachedItems) return cachedItems;

  const csvPath = path.join(process.cwd(), "docs/design/menu-items.csv");
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const records = parseCSVRecords(csvText);

  cachedItems = records.map((record) => ({
    slug: slugify(record.name),
    category: record.category as Category,
    name: record.name,
    description: record.description,
    price: Number(record.price.replace(/[^0-9.]/g, "")),
    badge: toBadge(record.badge),
    roast: toRoast(record.roast),
    image: record.image,
    imageAlt: record.alt,
  }));

  return cachedItems;
}

export function getMenuByCategory(): { category: Category; items: MenuItem[] }[] {
  const items = getMenuItems();
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  }));
}

/** First "Popular"-badged item per category, in CSV order, capped at `limit`. */
export function getPopularItems(limit = 3): MenuItem[] {
  const seenCategories = new Set<Category>();
  const result: MenuItem[] = [];

  for (const item of getMenuItems()) {
    if (item.badge !== "Popular" || seenCategories.has(item.category)) continue;
    seenCategories.add(item.category);
    result.push(item);
    if (result.length === limit) break;
  }

  return result;
}
