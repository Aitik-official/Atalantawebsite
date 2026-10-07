import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getSubcategoryBySlug, getCategoryBySlug } from "@/data/site";

interface Props {
  params: Promise<{ subcategory: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  const sub = getSubcategoryBySlug("office-institutional", subcategory);
  const cat = getCategoryBySlug("office-institutional");
  const title = sub ? `${sub.name} | Atlanta ${cat?.shortName}` : "Office & Institutional Furniture | Atlanta Furniture";
  return {
    title,
    description: sub?.desc || "Explore Atlanta institutional benches, desks, lockers, and beds.",
  };
}

export default async function InstitutionalSubcategoryPage({ params }: Props) {
  const { subcategory } = await params;
  return <CategoryView categorySlug="office-institutional" subcategorySlug={subcategory} />;
}
