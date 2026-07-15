import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { ReservationForm } from "@/components/reservations/ReservationForm";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book a table at Brew & Co on Bellenden Road, Peckham.",
};

export default function ReservationsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Book ahead"
        title="Reserve a table"
        description="Tables are held for 15 minutes past the booking time. For parties larger than eight, call the shop directly."
      />
      <div className="mx-auto max-w-brew px-mug py-carafe md:px-pot md:py-urn">
        <div className="mx-auto max-w-xl">
          <ReservationForm />
        </div>
      </div>
    </>
  );
}
