import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getSubcategoryBySlug, getCategoryBySlug } from "@/data/site";

interface Props {
  params: Promise<{ subcategory: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  const sub = getSubcategoryBySlug("plastic-furniture", subcategory);
  const cat = getCategoryBySlug("plastic-furniture");
  const title = sub ? `${sub.name} | Atlanta ${cat?.shortName}` : "Plastic Furniture | Atlanta Furniture";
  return {
    title,
    description: sub?.desc || "Explore Atlanta virgin polymer furniture models.",
  };
}

export default async function PlasticSubcategoryPage({ params }: Props) {
  const { subcategory } = await params;
  return <CategoryView categorySlug="plastic-furniture" subcategorySlug={subcategory} />;
}
