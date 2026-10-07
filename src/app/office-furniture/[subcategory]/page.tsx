import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getSubcategoryBySlug, getCategoryBySlug } from "@/data/site";

interface Props {
  params: Promise<{ subcategory: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  const sub = getSubcategoryBySlug("office-furniture", subcategory);
  const cat = getCategoryBySlug("office-furniture");
  const title = sub ? `${sub.name} | Atlanta ${cat?.shortName}` : "Office Furniture | Atlanta Furniture";
  return {
    title,
    description: sub?.desc || "Explore Atlanta certified ergonomic office furniture.",
  };
}

export default async function OfficeSubcategoryPage({ params }: Props) {
  const { subcategory } = await params;
  return <CategoryView categorySlug="office-furniture" subcategorySlug={subcategory} />;
}
