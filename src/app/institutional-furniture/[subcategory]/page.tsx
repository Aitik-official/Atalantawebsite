import { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

interface Props {
  params: Promise<{ subcategory: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  return {
    title: "Institutional Furniture | Atlanta Furniture",
    description: "Explore Atlanta institutional furniture models.",
  };
}

export default async function InstitutionalSubAliasPage({ params }: Props) {
  const { subcategory } = await params;
  return <CategoryView categorySlug="office-institutional" subcategorySlug={subcategory} />;
}
