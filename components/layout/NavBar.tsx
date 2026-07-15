"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FOCUS_ON_ESPRESSO } from "@/components/ui/focusRing";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

/** Navigation Bar (components.md §2). No "Sign in" / "Order now" — Brew & Co
 * has no accounts or online ordering; the one real conversion action is
 * reserving a table. */
export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile panel on route change. Adjusted during render (not in
  // an effect, and not via a ref) to avoid the extra cascading render an
  // effect-based reset would cause — see
  // https://react.dev/learn/you-might-not-need-an-effect.
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-espresso text-crema ${scrolled ? "shadow-card" : ""}`}>
      <div className="mx-auto flex h-20 max-w-brew items-center justify-between px-mug md:px-pot">
        <Link href="/" className={`rounded-sm font-display text-xl text-crema ${FOCUS_ON_ESPRESSO}`}>
          Brew &amp; Co
        </Link>

        <div className="hidden items-center gap-pot md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`roast-underline rounded-sm font-body text-base hover:text-crema ${FOCUS_ON_ESPRESSO} ${
                  active ? "text-crema" : "text-crema/85"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Button href="/reservations" tone="onEspresso" fullWidthOnMobile={false}>
            Reserve a table
          </Button>
        </div>

        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-center rounded-md text-crema md:hidden ${FOCUS_ON_ESPRESSO}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={`grid overflow-hidden border-t border-crema/15 bg-espresso transition-[grid-template-rows] duration-[var(--duration-base)] ease-brew motion-reduce:transition-none md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <div className="flex flex-col gap-mug overflow-hidden px-mug py-pot">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                tabIndex={menuOpen ? undefined : -1}
                className={`rounded-sm font-body text-lg ${FOCUS_ON_ESPRESSO} ${
                  active ? "text-crema" : "text-crema/85"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button href="/reservations" tone="onEspresso" tabIndex={menuOpen ? undefined : -1}>
            Reserve a table
          </Button>
        </div>
      </div>
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
    </svg>
  );
}
