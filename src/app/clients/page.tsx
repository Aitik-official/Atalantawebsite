import type { Metadata } from "next";
import ClientReviews from "@/components/ClientReviews";
import InstitutionalShowcase from "@/components/InstitutionalShowcase";

export const metadata: Metadata = {
  title: "Clientele & Projects | Atlanta Furniture",
  description: "Educational institutions, corporate facilities, and banquet chains supplied by Atlanta Furniture across India.",
};

export default function ClientsPage() {
  return (
    <div>
      <ClientReviews />
      <InstitutionalShowcase />
    </div>
  );
}
