import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";

export const metadata: Metadata = {
  title: "Complaints & Feedback",
  description: "Tell Brew & Co about your experience — a complaint, a suggestion, or a compliment.",
};

export default function ComplaintsPage() {
  return (
    <>
      <PageBanner
        eyebrow="We're listening"
        title="Complaints & Feedback"
        description="Something not right, or an idea to make us better? Let us know and we'll get back to you."
      />
      <div className="mx-auto max-w-brew px-mug py-carafe md:px-pot md:py-urn">
        <div className="mx-auto max-w-xl">
          <ComplaintForm />
        </div>
      </div>
    </>
  );
}
