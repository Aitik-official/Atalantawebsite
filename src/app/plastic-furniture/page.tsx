import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Plastic Furniture | Atlanta Furniture",
  description: "Browse 100% virgin polymer plastic chairs, dining tables, stools, and party hall banquet seating from Atlanta Furniture.",
};

export default function PlasticFurniturePage() {
  return <CategoryView categorySlug="plastic-furniture" />;
}
