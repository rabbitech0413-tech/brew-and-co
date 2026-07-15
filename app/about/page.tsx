import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { StoryFounders } from "@/components/about/StoryFounders";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Brew & Co, a coffee shop on Bellenden Road, Peckham.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner eyebrow="Our story" title="About Brew & Co" />
      <div className="mx-auto max-w-brew px-mug py-carafe md:px-pot md:py-urn">
        <StoryFounders />
      </div>
    </>
  );
}
