import { getProducts } from "@/lib/catalog";
import type { ProductItem } from "./site";

export async function getAllFurnitureProducts(): Promise<ProductItem[]> {
  return getProducts();
}

export async function getProductBySlug(slug: string): Promise<ProductItem | undefined> {
  const products = await getProducts();
  return products.find(
    (p) => p.slug === slug || p.id === slug || p.slug.toLowerCase() === slug.toLowerCase(),
  );
}

export async function getProductsByCategory(category: string): Promise<ProductItem[]> {
  const products = await getProducts();
  if (!category || category.toLowerCase() === "all") return products;
  return products.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
}

export async function getRelatedProducts(
  currentId: string,
  category: string,
  limit = 4,
): Promise<ProductItem[]> {
  const products = await getProducts();
  return products.filter((p) => p.id !== currentId && p.category === category).slice(0, limit);
}

export async function searchProducts(query: string): Promise<ProductItem[]> {
  const products = await getProducts();
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  );
}
