/**
 * Focus ring classes for plain interactive elements (links, icon buttons)
 * that aren't already using <Button>. Default Tailwind ring-offset-color is
 * white, which reads as a stray halo on this system's espresso surfaces —
 * these match the offset to the surface instead (style-guide §9: visible
 * focus ring on both light and dark surfaces).
 */
export const FOCUS_ON_ESPRESSO =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry focus-visible:ring-offset-2 focus-visible:ring-offset-espresso";

export const FOCUS_ON_CREMA =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry focus-visible:ring-offset-2 focus-visible:ring-offset-crema";
