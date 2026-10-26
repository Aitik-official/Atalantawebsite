import CategoryView from "@/components/CategoryView";

export const dynamic = "force-dynamic";

export default async function CatalogSubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;
  return <CategoryView categorySlug={category} subcategorySlug={subcategory} />;
}
