"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as seedProducts } from "@/data/site";
import { withProductMedia } from "@/lib/media";
import {
  categoriesToNavItems,
  filterProductsForCategory,
  findCategoryBySlug,
  findSubcategoryBySlug,
  seedCategories,
} from "@/lib/catalog-helpers";
import type { ProductItem, StoredCategory } from "@/lib/catalog-types";

type CatalogContextValue = {
  products: ProductItem[];
  categories: StoredCategory[];
  ready: boolean;
  navItems: ReturnType<typeof categoriesToNavItems>;
  findCategory: (slug: string) => StoredCategory | null;
  findSubcategory: (
    categorySlug: string,
    subSlug: string,
  ) => ReturnType<typeof findSubcategoryBySlug>;
  productsFor: (categorySlug: string, subcategorySlug?: string) => ProductItem[];
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductItem[]>(() =>
    seedProducts.map((product) => withProductMedia(product)),
  );
  const [categories, setCategories] = useState<StoredCategory[]>(() => seedCategories());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/catalog")
      .then((response) => response.json())
      .then((data) => {
        if (cancelled || !data?.ok) return;
        if (Array.isArray(data.products)) setProducts(data.products);
        if (Array.isArray(data.categories)) setCategories(data.categories);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<CatalogContextValue>(
    () => ({
      products,
      categories,
      ready,
      navItems: categoriesToNavItems(categories),
      findCategory: (slug) => findCategoryBySlug(categories, slug),
      findSubcategory: (categorySlug, subSlug) =>
        findSubcategoryBySlug(categories, categorySlug, subSlug),
      productsFor: (categorySlug, subcategorySlug) =>
        filterProductsForCategory(products, categories, categorySlug, subcategorySlug),
    }),
    [products, categories, ready],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return value;
}
