import productsJson from "../../data/products.json";
import categoriesJson from "../../data/categories.json";
import enquiriesJson from "../../data/enquiries.json";
import { products as bundledProducts } from "@/data/site";
import { seedCategories } from "./catalog-helpers";
import type { Enquiry, ProductItem, StoredCategory } from "./catalog-types";
import { mediaUrl, withProductMedia } from "./media";
import { normalizeProductColors } from "./product-colors";

export async function readFallbackProducts(): Promise<ProductItem[]> {
  const list = (Array.isArray(productsJson) && productsJson.length
    ? productsJson
    : bundledProducts) as ProductItem[];
  return list.map((product) =>
    withProductMedia({
      ...product,
      colors: normalizeProductColors(product.colors),
    }),
  );
}

export async function readFallbackCategories(): Promise<StoredCategory[]> {
  const list = (Array.isArray(categoriesJson) && categoriesJson.length
    ? categoriesJson
    : seedCategories()) as StoredCategory[];
  return list.map((category) => ({ ...category, image: mediaUrl(category.image) }));
}

export async function readFallbackEnquiries(): Promise<Enquiry[]> {
  return (Array.isArray(enquiriesJson) ? enquiriesJson : []) as Enquiry[];
}
