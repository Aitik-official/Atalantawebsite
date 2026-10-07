import atlantaProducts from "./atlanta-furniture.json";
import { ProductItem } from "./site";

export const allFurnitureProducts: ProductItem[] = atlantaProducts as unknown as ProductItem[];

export function getProductBySlug(slug: string): ProductItem | undefined {
  return allFurnitureProducts.find(
    (p) => p.slug === slug || p.id === slug || p.slug.toLowerCase() === slug.toLowerCase()
  );
}

export function getProductsByCategory(category: string): ProductItem[] {
  if (!category || category.toLowerCase() === "all") return allFurnitureProducts;
  return allFurnitureProducts.filter(
    (p) => p.category.toLowerCase().includes(category.toLowerCase())
  );
}

export function getRelatedProducts(currentId: string, category: string, limit = 4): ProductItem[] {
  return allFurnitureProducts
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}

export function searchProducts(query: string): ProductItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return allFurnitureProducts;
  return allFurnitureProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
