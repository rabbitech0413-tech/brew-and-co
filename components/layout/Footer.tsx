import Link from "next/link";
import { subscribeToNewsletter } from "@/app/actions";
import { RoastLine } from "@/components/ui/RoastLine";
import { FOCUS_ON_ESPRESSO } from "@/components/ui/focusRing";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/reservations", label: "Reservations" },
];

/** Footer (components.md §10). */
export function Footer() {
  return (
    <footer className="bg-espresso text-crema">
      <RoastLine className="py-0" />

      <div className="mx-auto grid max-w-brew gap-carafe px-mug py-carafe md:grid-cols-3 md:px-pot md:py-urn">
        <div className="flex flex-col gap-mug">
          <span className="font-display text-xl text-crema">Brew &amp; Co</span>
          <p className="font-body text-sm text-crema/70">
            A neighbourhood coffee shop on Bellenden Road, Peckham — specialty coffee, fresh
            pastries, and light lunches.
          </p>
          <nav className="flex flex-col gap-cup">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`roast-underline w-fit rounded-sm font-body text-sm text-crema/85 hover:text-crema ${FOCUS_ON_ESPRESSO}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-mug">
          <h2 className="font-display text-lg text-crema">Contact</h2>
          <address className="flex flex-col gap-cup font-body text-sm not-italic text-crema/70">
            <span>12 Bellenden Road, Peckham, London SE15</span>
            <a
              href="mailto:hello@brewand.co"
              className={`roast-underline w-fit rounded-sm hover:text-crema ${FOCUS_ON_ESPRESSO}`}
            >
              hello@brewand.co
            </a>
            <a
              href="tel:+442071234567"
              className={`roast-underline w-fit rounded-sm hover:text-crema ${FOCUS_ON_ESPRESSO}`}
            >
              020 7123 4567
            </a>
          </address>
          <dl className="grid grid-cols-[auto_1fr] gap-x-mug gap-y-sip font-mono text-xs text-crema/60">
            <dt>Mon–Fri</dt>
            <dd>6:00–20:00 (open mic Fri from 7pm)</dd>
            <dt>Sat</dt>
            <dd>7:00–21:00 (cupping at 10am)</dd>
            <dt>Sun</dt>
            <dd>8:30–16:00</dd>
          </dl>
        </div>

        <div className="flex flex-col gap-mug">
          <h2 className="font-display text-lg text-crema">Stay in the loop</h2>
          <p className="font-body text-sm text-crema/70">
            New menu items, seasonal beans, and event dates — no more than once a month.
          </p>
          <form action={subscribeToNewsletter} className="flex h-12 gap-0">
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="h-12 w-full rounded-l-md border border-r-0 border-crema/20 bg-espresso-300/40 px-mug font-body text-base text-crema placeholder:text-crema/50 focus-visible:outline-none focus-visible:border-cherry focus-visible:ring-2 focus-visible:ring-cherry/30"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-r-md bg-cherry text-crema transition-colors duration-[var(--duration-fast)] ease-brew hover:bg-cherry-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
            >
              <ArrowIcon />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-crema/15">
        <div className="mx-auto flex max-w-brew flex-col gap-cup px-mug py-mug font-body text-sm text-crema/60 sm:flex-row sm:items-center sm:justify-between md:px-pot">
          <span>&copy; {new Date().getFullYear()} Brew &amp; Co.</span>
          <div className="flex items-center gap-mug">
            <Link
              href="/complaints"
              className={`roast-underline rounded-sm hover:text-crema ${FOCUS_ON_ESPRESSO}`}
            >
              Complaints
            </Link>
            <span>Peckham, London</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
