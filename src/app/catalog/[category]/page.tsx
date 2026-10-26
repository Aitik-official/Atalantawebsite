import CategoryView from "@/components/CategoryView";

export const dynamic = "force-dynamic";

export default async function CatalogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CategoryView categorySlug={category} />;
}
