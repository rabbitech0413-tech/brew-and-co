import { HeroHome } from "@/components/home/HeroHome";
import { PopularItems } from "@/components/home/PopularItems";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { ReserveCta } from "@/components/home/ReserveCta";
import { RoastLine } from "@/components/ui/RoastLine";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <HeroHome />
      <RoastLine />
      <PopularItems />
      <RoastLine />
      <UpcomingEvents />
      <RoastLine />
      <ReserveCta />
    </>
  );
}
