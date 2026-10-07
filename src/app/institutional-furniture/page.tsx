import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Institutional Furniture | Atlanta Furniture",
  description: "Institutional benches, desks, computer tables, storage cupboards, and hostel beds.",
};

export default function InstitutionalAliasPage() {
  return <CategoryView categorySlug="office-institutional" />;
}
