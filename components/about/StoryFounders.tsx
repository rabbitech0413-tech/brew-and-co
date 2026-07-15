import Image from "next/image";

// Warm counter/barista shot. Source and licence: docs/design/image-sources.json.
const FOUNDERS_IMAGE = "/images/about/founders.webp";

export function StoryFounders() {
  return (
    <section className="grid grid-cols-1 gap-carafe lg:grid-cols-2 lg:items-center">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-md -rotate-2 overflow-hidden rounded-lg border border-crema-100 shadow-card lg:mx-0">
        <Image
          src={FOUNDERS_IMAGE}
          alt="Maya and Tom behind the counter at Brew & Co"
          fill
          sizes="(min-width: 1024px) 420px, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-mug">
        <h2 className="font-display text-2xl text-ink md:text-3xl">
          Started by two people who wanted a good reason to sit down
        </h2>
        <div className="flex flex-col gap-mug font-body text-md text-ink-muted">
          <p>
            Maya Ellison spent her mornings behind the counter of a bakery in Bermondsey. Tom
            Okafor pulled shots at a small roastery in Bristol before moving to London. They met
            at a weekend cupping session at Borough Market in 2014, and kept noticing the same
            thing: Peckham&rsquo;s high street had bakeries and pubs, but nowhere to sit with a
            coffee after nine in the morning.
          </p>
          <p>
            They opened Brew &amp; Co in 2015, in a converted shopfront on Bellenden Road, with
            twelve seats and a secondhand espresso machine they fixed themselves. The Friday open
            mic and Saturday cupping sessions weren&rsquo;t part of a plan — they grew out of
            regulars asking to taste new bags before they went on the shelf, and a couple of them
            asking if they could bring a guitar.
          </p>
          <p>
            Ten years on, it&rsquo;s still Maya and Tom most mornings, and the machine still needs
            the occasional fix.
          </p>
        </div>
      </div>
    </section>
  );
}
