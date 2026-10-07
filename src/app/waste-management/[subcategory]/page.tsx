import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getSubcategoryBySlug, getCategoryBySlug } from "@/data/site";

interface Props {
  params: Promise<{ subcategory: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  const sub = getSubcategoryBySlug("waste-management", subcategory);
  const cat = getCategoryBySlug("waste-management");
  const title = sub ? `${sub.name} | Atlanta ${cat?.shortName}` : "Waste Management | Atlanta Furniture";
  return {
    title,
    description: sub?.desc || "Explore Atlanta heavy-duty mobile commercial waste dustbins.",
  };
}

export default async function WasteSubcategoryPage({ params }: Props) {
  const { subcategory } = await params;
  return <CategoryView categorySlug="waste-management" subcategorySlug={subcategory} />;
}
