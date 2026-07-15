import { Button } from "@/components/ui/Button";

export function ReserveCta() {
  return (
    <section className="bg-espresso text-crema">
      <div className="mx-auto max-w-brew px-mug py-carafe text-center md:px-pot md:py-urn">
        <h2 className="font-display text-2xl text-crema md:text-3xl">Save a seat.</h2>
        <p className="mx-auto mt-cup max-w-[46ch] font-body text-md text-crema/80">
          Tables go quickly on Friday nights and Saturday mornings — book ahead if you don&rsquo;t
          want to stand.
        </p>
        <div className="mt-pot flex justify-center">
          <Button href="/reservations" tone="onEspresso" fullWidthOnMobile={false}>
            Reserve a table
          </Button>
        </div>
      </div>
    </section>
  );
}
