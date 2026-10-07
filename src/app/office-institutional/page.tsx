import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Office & Institutional Furniture | Atlanta Furniture",
  description: "Heavy-duty CRCA dual student benches, computer tables, student desks, corporate office desks, storage lockers, and hostel beds.",
};

export default function OfficeInstitutionalPage() {
  return <CategoryView categorySlug="office-institutional" />;
}
