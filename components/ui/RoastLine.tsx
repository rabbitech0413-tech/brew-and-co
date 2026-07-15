/**
 * The Roast Line section divider (components.md §4). Only for true section
 * boundaries — never inside a card or between paragraphs, at most once per
 * transition.
 */
export function RoastLine({ className = "" }: { className?: string }) {
  return (
    <div className={`py-carafe ${className}`}>
      <div className="mx-auto max-w-brew px-mug md:px-pot">
        <div className="roast-line" role="presentation" />
      </div>
    </div>
  );
}
