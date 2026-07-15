export type Category = "Espresso" | "Hot Drinks" | "Sandwiches" | "Iced Coffee";
export type Badge = "Popular" | "House Favorite" | null;
export type RoastLevel = "Light" | "Medium" | "Dark" | null;

export interface MenuItem {
  slug: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  badge: Badge;
  roast: RoastLevel;
  image: string;
  imageAlt: string;
}

export interface RecurringEvent {
  slug: "open-mic-night" | "coffee-cupping";
  name: string;
  description: string;
  dayOfWeek: number; // Date#getDay(): 5 = Friday, 6 = Saturday
  startTime: { hour: number; minute: number };
  endTime: { hour: number; minute: number };
}

export interface UpcomingEvent extends RecurringEvent {
  date: Date;
  endDate: Date;
}
