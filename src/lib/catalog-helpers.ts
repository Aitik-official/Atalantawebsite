import { categoriesData, navCategories, type NavItem } from "@/data/site";
import type { ProductItem, StoredCategory, StoredSubcategory } from "./catalog-types";

export function slugify(value: string) {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
  return base || "item";
}

export function uniqueSlug(base: string, taken: Iterable<string>) {
  const used = new Set(taken);
  let slug = base || "item";
  const root = slug;
  let n = 2;
  while (used.has(slug)) {
    slug = `${root}-${n}`;
    n += 1;
  }
  return slug;
}

export function parsePrice(value: string | number | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const n = Number(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatPrice(value: number) {
  return `₹${Math.max(0, Math.round(value)).toLocaleString("en-IN")}`;
}

export function seedCategories(): StoredCategory[] {
  return navCategories.map((category) => {
    const extra = categoriesData.find((item) => item.slug === category.categoryKey);
    return {
      id: category.slug,
      name: category.shortName,
      navLabel: category.name,
      shortName: category.shortName,
      slug: category.slug,
      href: category.href,
      categoryKey: category.categoryKey,
      description: extra?.description ?? "",
      image: extra?.image ?? "",
      badge: extra?.badge ?? "",
      subcategories: category.subcategories.map((sub) => ({
        id: `${category.slug}--${sub.slug}`,
        name: toTitle(sub.name),
        slug: sub.slug,
        filterKey: sub.filterKey,
        href: sub.href,
        desc: sub.desc,
      })),
    };
  });
}

export function categoriesToNavItems(categories: StoredCategory[]): NavItem[] {
  const catalogItems: NavItem[] = categories.map((category) => ({
    label: category.navLabel || category.name.toUpperCase(),
    href: category.href,
    slug: category.slug,
    categoryKey: category.categoryKey,
    children: category.subcategories.map((sub) => ({
      label: sub.name.toUpperCase(),
      href: sub.href,
      slug: sub.slug,
    })),
  }));

  return [
    { label: "HOME", href: "/" },
    ...catalogItems,
    { label: "ABOUT US", href: "/about" },
    { label: "TESTIMONIAL", href: "/testimonials" },
    { label: "CONTACT", href: "/contact" },
  ];
}

export function findCategoryBySlug(categories: StoredCategory[], slug: string) {
  const normalized = slug.toLowerCase().replace(/_/g, "-");
  return (
    categories.find(
      (category) =>
        category.slug === normalized ||
        category.categoryKey.toLowerCase().replace(/ /g, "-") === normalized ||
        (normalized === "institutional-furniture" && category.slug === "office-institutional") ||
        (normalized === "waste-mangement" && category.slug === "waste-management"),
    ) || null
  );
}

export function findSubcategoryBySlug(
  categories: StoredCategory[],
  categorySlug: string,
  subSlug: string,
) {
  const category = findCategoryBySlug(categories, categorySlug);
  if (!category) return null;
  const normalizedSub = subSlug.toLowerCase().replace(/_/g, "-");
  return (
    category.subcategories.find(
      (sub) =>
        sub.slug === normalizedSub ||
        sub.name.toLowerCase().replace(/ /g, "-") === normalizedSub ||
        sub.filterKey.toLowerCase().replace(/ /g, "-") === normalizedSub ||
        (normalizedSub === "student-dest" && sub.slug === "student-desk") ||
        (normalizedSub === "dning-tables" && sub.slug === "dining-tables") ||
        (normalizedSub === "ward-robes" && sub.slug === "wardrobes") ||
        (normalizedSub === "ward-robesg" && sub.slug === "wardrobes"),
    ) || null
  );
}

export function filterProductsForCategory(
  products: ProductItem[],
  categories: StoredCategory[],
  categorySlug: string,
  subcategorySlug?: string,
): ProductItem[] {
  const category = findCategoryBySlug(categories, categorySlug);
  if (!category) return [];

  const list = products.filter(
    (product) => product.category.toLowerCase() === category.categoryKey.toLowerCase(),
  );

  if (!subcategorySlug || subcategorySlug === "all") return list;

  const sub = findSubcategoryBySlug(categories, categorySlug, subcategorySlug);
  const target = (sub?.filterKey || subcategorySlug).toLowerCase().trim();
  return list.filter((product) => product.subcategory.toLowerCase().trim() === target);
}

export function normalizeSubcategories(
  parent: Pick<StoredCategory, "href" | "slug">,
  items: CategorySubInput[] = [],
): StoredSubcategory[] {
  const taken = new Set<string>();
  return items
    .map((item) => {
      const name = item.name.trim();
      if (!name) return null;
      const slug = uniqueSlug(slugify(item.slug || name), taken);
      taken.add(slug);
      return {
        id: item.id || `${parent.slug}--${slug}`,
        name,
        slug,
        filterKey: (item.filterKey || name).trim(),
        desc: (item.desc || "").trim(),
        href: item.href || `${parent.href.replace(/\/$/, "")}/${slug}`,
      };
    })
    .filter((item): item is StoredSubcategory => Boolean(item));
}

function toTitle(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

type CategorySubInput = {
  id?: string;
  name: string;
  slug?: string;
  filterKey?: string;
  desc?: string;
  href?: string;
};
