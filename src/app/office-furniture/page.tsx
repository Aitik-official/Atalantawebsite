import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Office Furniture | Atlanta Furniture",
  description: "Ergonomic director chairs, executive mesh seating, visitor conference chairs, steel wardrobes, and student study desks.",
};

export default function OfficeFurniturePage() {
  return <CategoryView categorySlug="office-furniture" />;
}
