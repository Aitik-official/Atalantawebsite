import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Waste Management Solutions | Atlanta Furniture",
  description: "UV stabilized HDPE mobile commercial waste bins with rubber wheels (80L, 100L, 120L, 240L) for industrial and residential sanitation.",
};

export default function WasteManagementPage() {
  return <CategoryView categorySlug="waste-management" />;
}
